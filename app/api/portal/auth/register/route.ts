import { prisma } from "@/lib/prisma";
import { hashPassword, setSessionCookie } from "@/lib/auth";
import { logActivity } from "@/lib/activity-log";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as {
    companyName?: string;
    lastName?: string;
    firstName?: string;
    email?: string;
    username?: string;
    password?: string;
  } | null;

  const companyName = body?.companyName?.trim();
  const lastName = body?.lastName?.trim();
  const firstName = body?.firstName?.trim();
  const email = body?.email?.trim().toLowerCase();
  const username = body?.username?.trim();
  const password = body?.password;

  if (!companyName || !lastName || !firstName || !email || !username || !password) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }

  if (password.length < 6) {
    return Response.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }

  const existing = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });

  if (existing) {
    if (existing.username === username) {
      return Response.json({ error: "Username is already taken." }, { status: 409 });
    }
    return Response.json({ error: "Email is already registered." }, { status: 409 });
  }

  const passwordHash = hashPassword(password);
  const fullName = `${lastName} ${firstName}`.trim();

  const user = await prisma.user.create({
    data: { fullName, companyName, lastName, firstName, email, username, passwordHash, role: "SHAREHOLDER", isActive: false },
    select: { id: true, username: true, fullName: true, email: true },
  });

  await logActivity({
    action: "REGISTER",
    entityType: "User",
    entityId: user.id,
    actor: { id: user.id, role: "SHAREHOLDER", fullName: user.fullName },
  });

  await setSessionCookie(user.id, "SHAREHOLDER");

  return Response.json(user, { status: 201 });
}
