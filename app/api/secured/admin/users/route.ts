import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import type { Prisma } from "@/lib/generated/prisma";

const SORTABLE_FIELDS = ["fullName", "companyName", "createdAt", "isActive"] as const;
type SortKey = (typeof SORTABLE_FIELDS)[number];

export async function GET(request: Request) {
  const session = await requireAdmin();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const statusParam = searchParams.get("status");
  const sortKeyParam = searchParams.get("sortKey");
  const sortKey: SortKey = SORTABLE_FIELDS.includes(sortKeyParam as SortKey) ? (sortKeyParam as SortKey) : "createdAt";
  const sortDir = searchParams.get("sortDir") === "asc" ? "asc" : "desc";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit")) || 10);

  const where: Prisma.UserWhereInput = {
    role: "SHAREHOLDER",
    ...(statusParam === "PENDING" && { isActive: false, registrationReturnReason: null }),
    ...(statusParam === "RETURNED" && { isActive: false, registrationReturnReason: { not: null } }),
    ...(statusParam === "ACTIVE" && { isActive: true }),
    ...(q && {
      OR: [
        { fullName: { contains: q } },
        { companyName: { contains: q } },
        { username: { contains: q } },
        { email: { contains: q } },
      ],
    }),
  };

  const [records, total, pending, returned, active] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { [sortKey]: sortDir },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        fullName: true,
        companyName: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        isActive: true,
        registrationReturnReason: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where }),
    prisma.user.count({ where: { role: "SHAREHOLDER", isActive: false, registrationReturnReason: null } }),
    prisma.user.count({ where: { role: "SHAREHOLDER", isActive: false, registrationReturnReason: { not: null } } }),
    prisma.user.count({ where: { role: "SHAREHOLDER", isActive: true } }),
  ]);

  const data = records.map((r) => ({
    ...r,
    status: r.isActive ? "ACTIVE" : r.registrationReturnReason ? "RETURNED" : "PENDING",
  }));

  return Response.json({ data, total, page, limit, summary: { pending, returned, active } });
}
