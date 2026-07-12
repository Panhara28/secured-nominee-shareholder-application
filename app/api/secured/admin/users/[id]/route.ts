import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { logActivity } from "@/lib/activity-log";
import { emitAdminUsersNotification, emitUserNotification } from "@/lib/notification-events";

type Props = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Props) {
  const session = await requireAdmin();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    return Response.json({ error: "Invalid user id." }, { status: 400 });
  }

  const record = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullName: true,
      companyName: true,
      firstName: true,
      lastName: true,
      email: true,
      username: true,
      phoneNumber: true,
      isActive: true,
      registrationReturnReason: true,
      registrationReturnedAt: true,
      createdAt: true,
      role: true,
    },
  });

  if (!record || record.role !== "SHAREHOLDER") {
    return Response.json({ error: "User not found." }, { status: 404 });
  }

  return Response.json(record);
}

export async function PATCH(request: Request, { params }: Props) {
  const session = await requireAdmin();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    return Response.json({ error: "Invalid user id." }, { status: 400 });
  }

  const body = await request.json().catch(() => null) as { action?: string; reason?: string } | null;
  const action = body?.action;
  if (action !== "approve" && action !== "reject" && action !== "return") {
    return Response.json({ error: "Action must be 'approve', 'reject', or 'return'." }, { status: 400 });
  }

  const record = await prisma.user.findUnique({ where: { id } });
  if (!record || record.role !== "SHAREHOLDER") {
    return Response.json({ error: "User not found." }, { status: 404 });
  }

  const actorUser = await prisma.user.findUnique({ where: { id: session.userId }, select: { fullName: true, role: true } });

  if (action === "approve") {
    const updated = await prisma.user.update({
      where: { id },
      data: { isActive: true, registrationReturnReason: null, registrationReturnedAt: null },
    });
    if (actorUser) {
      await logActivity({
        action: "USER_APPROVED",
        entityType: "User",
        entityId: id,
        actor: { id: session.userId, role: actorUser.role, fullName: actorUser.fullName },
        note: `Approved registration for ${record.fullName}`,
      });
    }
    emitAdminUsersNotification();
    emitUserNotification(id);
    return Response.json({ id: updated.id, isActive: updated.isActive });
  }

  if (action === "return") {
    const reason = body?.reason?.trim();
    if (!reason) {
      return Response.json({ error: "A reason is required to return a registration." }, { status: 400 });
    }
    const updated = await prisma.user.update({
      where: { id },
      data: { isActive: false, registrationReturnReason: reason, registrationReturnedAt: new Date() },
    });
    if (actorUser) {
      await logActivity({
        action: "USER_RETURNED",
        entityType: "User",
        entityId: id,
        actor: { id: session.userId, role: actorUser.role, fullName: actorUser.fullName },
        note: `Returned registration for ${record.fullName}: ${reason}`,
      });
    }
    emitAdminUsersNotification();
    emitUserNotification(id);
    return Response.json({ id: updated.id, isActive: updated.isActive, registrationReturnReason: updated.registrationReturnReason });
  }

  emitUserNotification(id);
  await prisma.user.delete({ where: { id } });
  if (actorUser) {
    await logActivity({
      action: "USER_REJECTED",
      entityType: "User",
      entityId: id,
      actor: { id: session.userId, role: actorUser.role, fullName: actorUser.fullName },
      note: `Rejected registration for ${record.fullName}`,
    });
  }
  emitAdminUsersNotification();
  return Response.json({ id, deleted: true });
}
