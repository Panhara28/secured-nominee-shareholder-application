import { prisma } from "@/lib/prisma";
import { clearSessionCookie, getSession } from "@/lib/auth";
import { logActivity } from "@/lib/activity-log";

export async function POST() {
  const session = await getSession();
  await clearSessionCookie();

  if (session) {
    const user = await prisma.user.findUnique({ where: { id: session.userId }, select: { fullName: true, role: true } });
    if (user) {
      await logActivity({
        action: "LOGOUT",
        entityType: "User",
        entityId: session.userId,
        actor: { id: session.userId, role: user.role, fullName: user.fullName },
      });
    }
  }

  return Response.json({ ok: true });
}
