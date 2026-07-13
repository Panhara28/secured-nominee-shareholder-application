import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { requireShareholder } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, Link } from "@/lib/navigation";
import { AlertTriangle, CheckCircle2, FileEdit, GitCompare, RotateCcw, ShieldCheck, TimerReset, XCircle } from "lucide-react";
import DashboardRequestsTable from "@/components/portal/DashboardRequestsTable";

export const metadata: Metadata = {
  title: "Dashboard — Secured Nominee Shareholder",
};

type Props = { params: Promise<{ locale: string }> };

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await requireShareholder();
  if (!session) return redirect({ href: "/portal/login", locale });

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { fullName: true, email: true, createdAt: true },
  });
  if (!user) return redirect({ href: "/portal/login", locale });

  const t = await getTranslations("portal.dashboard");

  const approvedRequests = await prisma.beneficiaryRequest.findMany({
    where: { userId: session.userId, status: "APPROVED" },
    orderBy: { submittedAt: "desc" },
    select: { id: true, requestNo: true, companyNameEn: true, companyNameKh: true, status: true, submittedAt: true },
  });
  const approvedRequestsSerialized = approvedRequests.map((r) => ({ ...r, submittedAt: r.submittedAt.toISOString() }));

  const returnedRequests = await prisma.beneficiaryRequest.findMany({
    where: { userId: session.userId, status: "RETURNED" },
    orderBy: { submittedAt: "desc" },
    select: { id: true, requestNo: true, companyNameEn: true },
  });

  const statusGroups = await prisma.beneficiaryRequest.groupBy({
    by: ["status"],
    where: { userId: session.userId },
    _count: true,
  });

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

  const stats = [
    {
      label: t("draftedLabel"),
      value: summary.drafted,
      icon: FileEdit,
      color: "text-slate-500",
      bg: "bg-slate-100",
    },
    {
      label: t("requestLabel"),
      value: summary.request,
      icon: TimerReset,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: t("inReviewLabel"),
      value: summary.inReview,
      icon: ShieldCheck,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: t("approvedLabel"),
      value: summary.approved,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: t("rejectedLabel"),
      value: summary.rejected,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: t("returnedLabel"),
      value: summary.returned,
      icon: RotateCcw,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: t("updateRequestedLabel"),
      value: summary.updateRequested,
      icon: GitCompare,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Returned request warning */}
      {returnedRequests.length > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 px-5 py-4">
          <AlertTriangle className="h-4.5 w-4.5 text-orange-600 flex-shrink-0" />
          <p className="text-sm font-medium text-orange-800 flex-1">
            {t("returnedWarningTitle", { count: returnedRequests.length })}
          </p>
          <Link
            href={{ pathname: "/portal/beneficiary/all-requests", query: { status: "RETURNED" } }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 transition-colors flex-shrink-0"
          >
            {t("returnedWarningAction")}
          </Link>
        </div>
      )}

      {/* Welcome header */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-blue-200" />
          </div>
          <div>
            <p className="text-blue-200 text-sm">{t("welcome")}</p>
            <h1 className="text-xl font-bold">{user.fullName}</h1>
          </div>
        </div>
        <p className="text-blue-200/80 text-sm">
          Secured Nominee Shareholder Portal — Simulation Mode
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm"
            >
              <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* All Requests */}
      <DashboardRequestsTable initialRequests={approvedRequestsSerialized} />
    </div>
  );
}
