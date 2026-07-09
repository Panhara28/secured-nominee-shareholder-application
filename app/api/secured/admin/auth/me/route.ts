import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      username: true,
      fullName: true,
      email: true,
      role: true,
      staffRole: {
        select: {
          id: true,
          name: true,
          permissions: {
            select: {
              create: true,
              read: true,
              update: true,
              delete: true,
              module: { select: { name: true } },
            },
          },
        },
      },
    },
  });

  if (!user) {
    return Response.json({ error: "User not found." }, { status: 404 });
  }

  const permissions = Object.fromEntries(
    (user.staffRole?.permissions ?? []).map((p) => [
      p.module.name,
      { create: p.create, read: p.read, update: p.update, delete: p.delete },
    ])
  );

  return Response.json({
    id: user.id,
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    staffRoleName: user.staffRole?.name ?? null,
    permissions,
  });
}
