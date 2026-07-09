import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { logRequestEvent } from "@/lib/request-log";

type Props = { params: Promise<{ id: string }> };

function serialize(record: NonNullable<Awaited<ReturnType<typeof loadRecord>>>) {
  return {
    ...record,
    shIdDocNames: JSON.parse(record.shIdDocNames) as string[],
    ownerIdDocNames: JSON.parse(record.ownerIdDocNames) as string[],
    shareholderContractDocNames: JSON.parse(record.shareholderContractDocNames) as string[],
    otherDocNames: JSON.parse(record.otherDocNames) as string[],
  };
}

function loadRecord(id: number) {
  return prisma.beneficiaryRequest.findUnique({
    where: { id },
    include: {
      user: { select: { fullName: true, username: true } },
      logs: { orderBy: { createdAt: "desc" } },
    },
  });
}

export async function GET(_request: Request, { params }: Props) {
  const session = await requireAdmin();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    return Response.json({ error: "Invalid request id." }, { status: 400 });
  }

  const record = await loadRecord(id);
  if (!record) {
    return Response.json({ error: "Request not found." }, { status: 404 });
  }

  return Response.json(serialize(record));
}

export async function PATCH(request: Request, { params }: Props) {
  const session = await requireAdmin();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    return Response.json({ error: "Invalid request id." }, { status: 400 });
  }

  const body = await request.json().catch(() => null) as { action?: string; reason?: string } | null;
  if (body?.action !== "approve" && body?.action !== "reject") {
    return Response.json({ error: "Unsupported action." }, { status: 400 });
  }

  const reason = body.reason?.trim();
  if (body.action === "reject" && !reason) {
    return Response.json({ error: "A rejection reason is required." }, { status: 400 });
  }

  const record = await prisma.beneficiaryRequest.findUnique({ where: { id } });
  if (!record) {
    return Response.json({ error: "Request not found." }, { status: 404 });
  }
  if (record.status !== "PENDING" && record.status !== "IN_REVIEW") {
    return Response.json({ error: "Only requests awaiting review can be approved or rejected." }, { status: 400 });
  }

  await prisma.beneficiaryRequest.update({
    where: { id },
    data: {
      status: body.action === "approve" ? "APPROVED" : "REJECTED",
      rejectionReason: body.action === "reject" ? reason : null,
    },
  });

  const actorUser = await prisma.user.findUnique({ where: { id: session.userId }, select: { fullName: true, role: true } });
  if (actorUser) {
    await logRequestEvent(
      id,
      body.action === "approve" ? "APPROVED" : "REJECTED",
      { id: session.userId, role: actorUser.role, fullName: actorUser.fullName },
      body.action === "reject" ? reason : undefined
    );
  }

  const updated = await loadRecord(id);
  return Response.json(serialize(updated!));
}
