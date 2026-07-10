import { prisma } from "@/lib/prisma";
import { verifyPassword, setSessionCookie } from "@/lib/auth";
import { logActivity } from "@/lib/activity-log";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { username?: string; password?: string } | null;
  const username = body?.username?.trim();
  const password = body?.password;

  if (!username || !password) {
    return Response.json({ error: "Username and password are required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || user.role !== "ADMIN" || !user.isActive || !verifyPassword(password, user.passwordHash)) {
    return Response.json({ error: "Invalid username or password." }, { status: 401 });
  }

  await setSessionCookie(user.id, user.role);
  await logActivity({
    action: "LOGIN",
    entityType: "User",
    entityId: user.id,
    actor: { id: user.id, role: user.role, fullName: user.fullName },
  });

  return Response.json({
    id: user.id,
    username: user.username,
    fullName: user.fullName,
    email: user.email,
  });
}
