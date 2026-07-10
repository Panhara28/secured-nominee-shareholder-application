import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import type { Prisma } from "@/lib/generated/prisma";

const SORTABLE_FIELDS = ["requestNo", "companyNameEn", "submittedAt", "status"] as const;
type SortKey = (typeof SORTABLE_FIELDS)[number];

const STATUS_VALUES = ["DRAFT", "PENDING", "IN_REVIEW", "APPROVED", "REJECTED", "RETURNED", "UPDATE_REQUESTED"] as const;
type StatusValue = (typeof STATUS_VALUES)[number];

export async function GET(request: Request) {
  const session = await requireAdmin();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const statusParam = searchParams.get("status");
  const statuses = (statusParam?.split(",") ?? []).filter((s): s is StatusValue =>
    STATUS_VALUES.includes(s as StatusValue)
  );
  const sortKeyParam = searchParams.get("sortKey");
  const sortKey: SortKey = SORTABLE_FIELDS.includes(sortKeyParam as SortKey) ? (sortKeyParam as SortKey) : "submittedAt";
  const sortDir = searchParams.get("sortDir") === "asc" ? "asc" : "desc";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit")) || 10);

  const where: Prisma.BeneficiaryRequestWhereInput = {
    ...(statuses.length === 1 && { status: statuses[0] }),
    ...(statuses.length > 1 && { status: { in: statuses } }),
    ...(q && {
      OR: [
        { companyNameKh: { contains: q } },
        { companyNameEn: { contains: q } },
        { requestNo: { contains: q } },
        { ownerFirstNameEn: { contains: q } },
        { ownerLastNameEn: { contains: q } },
        { registrationNo: { contains: q } },
        { user: { fullName: { contains: q } } },
        { user: { username: { contains: q } } },
      ],
    }),
  };

  const [records, total, groups] = await Promise.all([
    prisma.beneficiaryRequest.findMany({
      where,
      orderBy: { [sortKey]: sortDir },
      skip: (page - 1) * limit,
      take: limit,
      include: { user: { select: { fullName: true, username: true } } },
    }),
    prisma.beneficiaryRequest.count({ where }),
    prisma.beneficiaryRequest.groupBy({ by: ["status"], _count: true }),
  ]);

  const summary = { drafted: 0, request: 0, inReview: 0, approved: 0, rejected: 0, returned: 0, updateRequested: 0 };
  for (const g of groups) {
    if (g.status === "DRAFT") summary.drafted = g._count;
    else if (g.status === "PENDING") summary.request = g._count;
    else if (g.status === "IN_REVIEW") summary.inReview = g._count;
    else if (g.status === "APPROVED") summary.approved = g._count;
    else if (g.status === "REJECTED") summary.rejected = g._count;
    else if (g.status === "RETURNED") summary.returned = g._count;
    else if (g.status === "UPDATE_REQUESTED") summary.updateRequested = g._count;
  }

  const data = records.map((r) => ({
    id: r.id,
    requestNo: r.requestNo,
    companyNameKh: r.companyNameKh,
    companyNameEn: r.companyNameEn,
    ownerNameEn: `${r.ownerFirstNameEn} ${r.ownerLastNameEn}`.trim(),
    shareholderNameEn: `${r.shFirstNameEn} ${r.shLastNameEn}`.trim(),
    submittedByName: r.user.fullName,
    submittedByUsername: r.user.username,
    submittedAt: r.submittedAt,
    status: r.status,
  }));

  return Response.json({ data, total, page, limit, summary });
}
