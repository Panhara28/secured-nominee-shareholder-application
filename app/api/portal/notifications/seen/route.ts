import { prisma } from "@/lib/prisma";
import { requireShareholder } from "@/lib/auth";

export async function PATCH() {
  const session = await requireShareholder();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.user.update({
    where: { id: session.userId },
    data: { notificationsSeenAt: new Date() },
  });

  return Response.json({ ok: true });
}
