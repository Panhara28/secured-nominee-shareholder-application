import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import type { Prisma } from "@/lib/generated/prisma";

const SORTABLE_FIELDS = ["fullName", "username", "createdAt"] as const;
type SortKey = (typeof SORTABLE_FIELDS)[number];

export async function GET(request: Request) {
  const session = await requireAdmin();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const sortKeyParam = searchParams.get("sortKey");
  const sortKey: SortKey = SORTABLE_FIELDS.includes(sortKeyParam as SortKey) ? (sortKeyParam as SortKey) : "createdAt";
  const sortDir = searchParams.get("sortDir") === "asc" ? "asc" : "desc";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit")) || 10);

  const where: Prisma.UserWhereInput = {
    role: "ADMIN",
    ...(q && {
      OR: [
        { fullName: { contains: q } },
        { username: { contains: q } },
        { email: { contains: q } },
      ],
    }),
  };

  const [records, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { [sortKey]: sortDir },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        fullName: true,
        email: true,
        username: true,
        isActive: true,
        createdAt: true,
        staffRole: { select: { name: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  const data = records.map((r) => ({
    id: r.id,
    fullName: r.fullName,
    email: r.email,
    username: r.username,
    isActive: r.isActive,
    createdAt: r.createdAt,
    staffRoleName: r.staffRole?.name ?? null,
  }));

  return Response.json({ data, total, page, limit });
}
