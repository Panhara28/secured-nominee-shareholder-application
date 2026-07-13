import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { logRequestEvent } from "@/lib/request-log";
import { logActivity, type ActivityAction } from "@/lib/activity-log";
import { emitUserNotification } from "@/lib/notification-events";

type Props = { params: Promise<{ id: string }> };

function generateCertificateNo(): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `BO-${num}`;
}

async function generateUniqueCertificateNo(): Promise<string> {
  let certificateNo = generateCertificateNo();
  while (await prisma.beneficiaryRequest.findUnique({ where: { certificateNo } })) {
    certificateNo = generateCertificateNo();
  }
  return certificateNo;
}

function serialize(record: NonNullable<Awaited<ReturnType<typeof loadRecord>>>) {
  return {
    ...record,
    shIdDocNames: JSON.parse(record.shIdDocNames) as string[],
    ownerIdDocNames: JSON.parse(record.ownerIdDocNames) as string[],
    shareholderContractDocNames: JSON.parse(record.shareholderContractDocNames) as string[],
    otherDocNames: JSON.parse(record.otherDocNames) as string[],
    revisions: record.revisions.map((r) => ({
      ...r,
      previousData: JSON.parse(r.previousData),
      newData: JSON.parse(r.newData),
    })),
  };
}

function loadRecord(id: number) {
  return prisma.beneficiaryRequest.findUnique({
    where: { id },
    include: {
      user: { select: { fullName: true, username: true } },
      logs: { orderBy: { createdAt: "desc" } },
      revisions: { where: { approvedAt: { not: null } }, orderBy: { createdAt: "desc" } },
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
  if (body?.action !== "approve" && body?.action !== "reject" && body?.action !== "return") {
    return Response.json({ error: "Unsupported action." }, { status: 400 });
  }

  const reason = body.reason?.trim();
  if (body.action === "reject" && !reason) {
    return Response.json({ error: "A rejection reason is required." }, { status: 400 });
  }
  if (body.action === "return" && !reason) {
    return Response.json({ error: "A return reason is required." }, { status: 400 });
  }

  const record = await prisma.beneficiaryRequest.findUnique({ where: { id } });
  if (!record) {
    return Response.json({ error: "Request not found." }, { status: 404 });
  }
  if (record.status !== "PENDING" && record.status !== "IN_REVIEW" && record.status !== "UPDATE_REQUESTED") {
    return Response.json({ error: "Only requests awaiting review can be approved, rejected, or returned." }, { status: 400 });
  }

  const statusByAction = { approve: "APPROVED", reject: "REJECTED", return: "RETURNED" } as const;
  const logActionByAction = { approve: "APPROVED", reject: "REJECTED", return: "RETURNED" } as const;
  const activityActionByAction: Record<string, ActivityAction> = {
    approve: "REQUEST_APPROVED",
    reject: "REQUEST_REJECTED",
    return: "REQUEST_RETURNED",
  };

  const certificateNo = body.action === "approve" ? await generateUniqueCertificateNo() : undefined;

  await prisma.beneficiaryRequest.update({
    where: { id },
    data: {
      status: statusByAction[body.action],
      rejectionReason: body.action === "reject" || body.action === "return" ? reason : null,
      ...(body.action === "approve" ? { certificateNo, approvedAt: new Date() } : {}),
    },
  });

  if (body.action === "approve") {
    await prisma.requestRevision.updateMany({
      where: { requestId: id, approvedAt: null },
      data: { approvedAt: new Date() },
    });
  }
  emitUserNotification(record.userId);

  const actorUser = await prisma.user.findUnique({ where: { id: session.userId }, select: { fullName: true, role: true } });
  if (actorUser) {
    const actorInfo = { id: session.userId, role: actorUser.role, fullName: actorUser.fullName };
    await logRequestEvent(
      id,
      logActionByAction[body.action],
      actorInfo,
      body.action === "reject" || body.action === "return" ? reason : undefined
    );
    await logActivity({
      action: activityActionByAction[body.action],
      entityType: "BeneficiaryRequest",
      entityId: id,
      actor: actorInfo,
      note: body.action === "reject" || body.action === "return" ? reason : record.requestNo,
    });
  }

  const updated = await loadRecord(id);
  return Response.json(serialize(updated!));
}
