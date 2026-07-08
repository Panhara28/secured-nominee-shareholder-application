import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as {
    fullName?: string;
    email?: string;
    username?: string;
    password?: string;
  } | null;

  const fullName = body?.fullName?.trim();
  const email = body?.email?.trim().toLowerCase();
  const username = body?.username?.trim();
  const password = body?.password;

  if (!fullName || !email || !username || !password) {
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

  const user = await prisma.user.create({
    data: { fullName, email, username, passwordHash, role: "SHAREHOLDER" },
    select: { id: true, username: true, fullName: true, email: true },
  });

  return Response.json(user, { status: 201 });
}
