import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/activity-log";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { email?: string } | null;
  const email = body?.email?.trim().toLowerCase();

  if (!email) {
    return Response.json({ error: "Email is required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.role !== "SHAREHOLDER") {
    return Response.json({ error: "No account found with that email." }, { status: 404 });
  }

  const token = randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken: token, resetTokenExpiry: expiry },
  });

  await logActivity({
    action: "PASSWORD_RESET_REQUESTED",
    entityType: "User",
    entityId: user.id,
    actor: { id: user.id, role: user.role, fullName: user.fullName },
  });

  // Simulation: return the reset link directly (no email sent)
  const resetLink = `http://localhost:3000/en/portal/reset-password?token=${token}`;

  return Response.json({ resetLink });
}
