import { prisma } from "@/lib/prisma";
import type { Role } from "@/lib/generated/prisma";

type LogAction = "CREATED" | "SUBMITTED" | "APPROVED" | "REJECTED" | "RETURNED" | "EDITED";

export async function logRequestEvent(
  requestId: number,
  action: LogAction,
  actor: { id: number; role: Role; fullName: string },
  note?: string
) {
  await prisma.requestLog.create({
    data: {
      requestId,
      action,
      actorUserId: actor.id,
      actorRole: actor.role,
      actorName: actor.fullName,
      note: note ?? null,
    },
  });
}
