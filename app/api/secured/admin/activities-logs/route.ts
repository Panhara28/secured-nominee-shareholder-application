import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import type { Prisma } from "@/lib/generated/prisma";

const ACTION_VALUES = [
  "LOGIN",
  "LOGOUT",
  "REGISTER",
  "PASSWORD_RESET_REQUESTED",
  "PASSWORD_RESET",
  "REQUEST_CREATED",
  "REQUEST_SUBMITTED",
  "REQUEST_EDITED",
  "REQUEST_APPROVED",
  "REQUEST_REJECTED",
  "REQUEST_RETURNED",
  "REQUEST_VERIFIED",
] as const;

export async function GET(request: Request) {
  const session = await requireAdmin();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const actionParam = searchParams.get("action");
  const action = (ACTION_VALUES as readonly string[]).includes(actionParam ?? "") ? actionParam! : undefined;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit")) || 20);

  const where: Prisma.ActivityLogWhereInput = {
    ...(action && { action }),
    ...(q && {
      OR: [
        { actorName: { contains: q } },
        { note: { contains: q } },
        { entityType: { contains: q } },
      ],
    }),
  };

  const [records, total] = await Promise.all([
    prisma.activityLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.activityLog.count({ where }),
  ]);

  const data = records.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }));

  return Response.json({ data, total, page, limit });
}
