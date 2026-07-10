import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { logActivity } from "@/lib/activity-log";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as {
    token?: string;
    newPassword?: string;
  } | null;

  const token = body?.token?.trim();
  const newPassword = body?.newPassword;

  if (!token || !newPassword) {
    return Response.json({ error: "Token and new password are required." }, { status: 400 });
  }

  if (newPassword.length < 6) {
    return Response.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: { resetToken: token },
  });

  if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
    return Response.json({ error: "Invalid or expired reset token." }, { status: 400 });
  }

  const passwordHash = hashPassword(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash, resetToken: null, resetTokenExpiry: null },
  });

  await logActivity({
    action: "PASSWORD_RESET",
    entityType: "User",
    entityId: user.id,
    actor: { id: user.id, role: user.role, fullName: user.fullName },
  });

  return Response.json({ ok: true });
}
