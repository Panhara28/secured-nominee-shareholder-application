import { prisma } from "@/lib/prisma";
import type { Role } from "@/lib/generated/prisma";

export type ActivityAction =
  | "LOGIN"
  | "LOGOUT"
  | "REGISTER"
  | "PASSWORD_RESET_REQUESTED"
  | "PASSWORD_RESET"
  | "REQUEST_CREATED"
  | "REQUEST_SUBMITTED"
  | "REQUEST_EDITED"
  | "REQUEST_APPROVED"
  | "REQUEST_REJECTED"
  | "REQUEST_RETURNED"
  | "REQUEST_VERIFIED"
  | "NOTIFICATIONS_SEEN";

export async function logActivity(params: {
  action: ActivityAction;
  entityType?: string;
  entityId?: number;
  actor?: { id: number; role: Role; fullName: string } | null;
  note?: string;
}) {
  try {
    await prisma.activityLog.create({
      data: {
        action: params.action,
        entityType: params.entityType ?? null,
        entityId: params.entityId ?? null,
        actorUserId: params.actor?.id ?? null,
        actorRole: params.actor?.role ?? null,
        actorName: params.actor?.fullName ?? null,
        note: params.note ?? null,
      },
    });
  } catch {
    // logging must never break the calling mutation
  }
}
