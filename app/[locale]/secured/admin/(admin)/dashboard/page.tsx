import { setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import DashboardClient from "@/components/admin/DashboardClient";

type Props = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [totalShareholders, totalRequests, statusGroups, recent, recentUsers] = await Promise.all([
    prisma.user.count({ where: { role: "SHAREHOLDER" } }),
    prisma.beneficiaryRequest.count(),
    prisma.beneficiaryRequest.groupBy({ by: ["status"], _count: true }),
    prisma.beneficiaryRequest.findMany({
      orderBy: { submittedAt: "desc" },
      take: 5,
      select: { id: true, requestNo: true, companyNameEn: true, status: true, submittedAt: true },
    }),
    prisma.user.findMany({
      where: { role: "SHAREHOLDER", isActive: false },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, fullName: true, companyName: true, email: true, username: true, isActive: true, createdAt: true },
    }),
  ]);

  const summary = { drafted: 0, request: 0, inReview: 0, approved: 0, rejected: 0, returned: 0, updateRequested: 0 };
  for (const g of statusGroups) {
    if (g.status === "DRAFT") summary.drafted = g._count;
    else if (g.status === "PENDING") summary.request = g._count;
    else if (g.status === "IN_REVIEW") summary.inReview = g._count;
    else if (g.status === "APPROVED") summary.approved = g._count;
    else if (g.status === "REJECTED") summary.rejected = g._count;
    else if (g.status === "RETURNED") summary.returned = g._count;
    else if (g.status === "UPDATE_REQUESTED") summary.updateRequested = g._count;
  }

  const recentSerialized = recent.map((r) => ({ ...r, submittedAt: r.submittedAt.toISOString() }));
  const recentUsersSerialized = recentUsers.map((u) => ({ ...u, createdAt: u.createdAt.toISOString() }));

  return (
    <DashboardClient
      totalShareholders={totalShareholders}
      totalRequests={totalRequests}
      summary={summary}
      recent={recentSerialized}
      recentUsers={recentUsersSerialized}
    />
  );
}
