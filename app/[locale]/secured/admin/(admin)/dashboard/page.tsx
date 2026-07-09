import { setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import DashboardClient from "@/components/admin/DashboardClient";

type Props = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [totalShareholders, totalRequests, statusGroups, recent] = await Promise.all([
    prisma.user.count({ where: { role: "SHAREHOLDER" } }),
    prisma.beneficiaryRequest.count(),
    prisma.beneficiaryRequest.groupBy({ by: ["status"], _count: true }),
    prisma.beneficiaryRequest.findMany({
      orderBy: { submittedAt: "desc" },
      take: 5,
      select: { id: true, requestNo: true, companyNameEn: true, status: true, submittedAt: true },
    }),
  ]);

  const summary = { drafted: 0, request: 0, inReview: 0, approved: 0, rejected: 0 };
  for (const g of statusGroups) {
    if (g.status === "DRAFT") summary.drafted = g._count;
    else if (g.status === "PENDING") summary.request = g._count;
    else if (g.status === "IN_REVIEW") summary.inReview = g._count;
    else if (g.status === "APPROVED") summary.approved = g._count;
    else if (g.status === "REJECTED") summary.rejected = g._count;
  }

  const recentSerialized = recent.map((r) => ({ ...r, submittedAt: r.submittedAt.toISOString() }));

  return (
    <DashboardClient
      totalShareholders={totalShareholders}
      totalRequests={totalRequests}
      summary={summary}
      recent={recentSerialized}
    />
  );
}
