import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

type Props = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Props) {
  const session = await requireAdmin();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    return Response.json({ error: "Invalid user id." }, { status: 400 });
  }

  const record = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullName: true,
      email: true,
      username: true,
      phoneNumber: true,
      isActive: true,
      createdAt: true,
      role: true,
      staffRole: {
        select: {
          name: true,
          description: true,
          permissions: {
            select: {
              create: true,
              read: true,
              update: true,
              delete: true,
              module: { select: { name: true, label: true } },
            },
          },
        },
      },
    },
  });

  if (!record || record.role !== "ADMIN") {
    return Response.json({ error: "User not found." }, { status: 404 });
  }

  return Response.json(record);
}
