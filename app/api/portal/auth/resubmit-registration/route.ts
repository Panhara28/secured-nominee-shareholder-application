import { prisma } from "@/lib/prisma";
import { requireShareholder } from "@/lib/auth";
import { logActivity } from "@/lib/activity-log";
import { emitAdminUsersNotification } from "@/lib/notification-events";

export async function PATCH(request: Request) {
  const session = await requireShareholder();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const record = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!record || record.role !== "SHAREHOLDER") {
    return Response.json({ error: "User not found." }, { status: 404 });
  }
  if (record.isActive || !record.registrationReturnReason) {
    return Response.json({ error: "This account has no returned registration to correct." }, { status: 400 });
  }

  const body = await request.json().catch(() => null) as {
    companyName?: string; lastName?: string; firstName?: string; email?: string;
  } | null;

  const companyName = body?.companyName?.trim();
  const lastName = body?.lastName?.trim();
  const firstName = body?.firstName?.trim();
  const email = body?.email?.trim().toLowerCase();

  if (!companyName || !lastName || !firstName || !email) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }

  if (email !== record.email) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return Response.json({ error: "Email is already registered." }, { status: 409 });
    }
  }

  const fullName = `${lastName} ${firstName}`.trim();

  const updated = await prisma.user.update({
    where: { id: session.userId },
    data: {
      companyName,
      lastName,
      firstName,
      email,
      fullName,
      registrationReturnReason: null,
      registrationReturnedAt: null,
    },
  });

  await logActivity({
    action: "REGISTRATION_RESUBMITTED",
    entityType: "User",
    entityId: updated.id,
    actor: { id: updated.id, role: "SHAREHOLDER", fullName: updated.fullName },
  });

  emitAdminUsersNotification();
  return Response.json({ id: updated.id, fullName: updated.fullName, isActive: updated.isActive });
}
