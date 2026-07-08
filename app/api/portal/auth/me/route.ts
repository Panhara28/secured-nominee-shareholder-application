import { prisma } from "@/lib/prisma";
import { requireShareholder } from "@/lib/auth";

export async function GET() {
  const session = await requireShareholder();
  if (!session) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, username: true, fullName: true, email: true, role: true },
  });

  if (!user) {
    return Response.json({ error: "User not found." }, { status: 404 });
  }

  return Response.json(user);
}
