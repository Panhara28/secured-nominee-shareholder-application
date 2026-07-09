import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const [totalShareholders, totalRequests, statusGroups, recent] = await Promise.all([
    prisma.user.count({ where: { role: "SHAREHOLDER" } }),
    prisma.beneficiaryRequest.count(),
    prisma.beneficiaryRequest.groupBy({ by: ["status"], _count: true }),
    prisma.beneficiaryRequest.findMany({
      orderBy: { submittedAt: "desc" },
      take: 5,
      select: {
        id: true,
        requestNo: true,
        companyNameEn: true,
        status: true,
        submittedAt: true,
      },
    }),
  ]);

  const summary = { drafted: 0, request: 0, approved: 0, rejected: 0 };
  for (const g of statusGroups) {
    if (g.status === "DRAFT") summary.drafted = g._count;
    else if (g.status === "PENDING") summary.request = g._count;
    else if (g.status === "APPROVED") summary.approved = g._count;
    else if (g.status === "REJECTED") summary.rejected = g._count;
  }

  return Response.json({ totalShareholders, totalRequests, summary, recent });
}
