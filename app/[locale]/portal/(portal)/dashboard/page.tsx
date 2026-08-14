import type { Metadata } from "next";
import { cookies } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { redirect, Link } from "@/lib/navigation";
import { AlertTriangle, CheckCircle2, FileEdit, GitCompare, RotateCcw, ShieldCheck, TimerReset, XCircle } from "lucide-react";
import DashboardRequestsTable from "@/components/portal/DashboardRequestsTable";

export const metadata: Metadata = {
  title: "Dashboard — Secured Nominee Shareholder",
  description: "View your request summary, status breakdown, and recent activity.",
};

export const dynamic = "force-dynamic";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8080";

type Props = { params: Promise<{ locale: string }> };

type PortalMe = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: string;
};

type RequestRow = {
  id: number;
  requestNo: string;
  companyNameKh: string | null;
  companyNameEn: string;
  status: string;
  submittedAt: string;
};

// Matches BeneficiaryRequestsService.buildListSummary in the NestJS API —
// the PENDING count is keyed `inReview` and the IN_REVIEW count is keyed
// `verifying` (there is no `request` key, unlike the admin dashboard-stats
// endpoint's summary shape).
type Summary = {
  drafted: number;
  inReview: number;
  verifying: number;
  approved: number;
  rejected: number;
  returned: number;
  updateRequested: number;
};

type PortalRequestsListResponse = {
  data: RequestRow[];
  total: number;
  page: number;
  limit: number;
  summary: Summary;
};

async function fetchJson<T>(path: string, cookieHeader: string): Promise<T | null> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    cache: "no-store",
  });
  if (!res.ok) return null;
  return (await res.json()) as T;
}

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const cookieHeader = (await cookies()).toString();

  const [me, approvedRequests] = await Promise.all([
    fetchJson<PortalMe>("/portal/auth/me", cookieHeader),
    // The summary object returned here reflects this shareholder's totals
    // across ALL statuses (not just the APPROVED filter applied to `data`),
    // so it doubles as the source for both the stat tiles and the returned-
    // request warning banner below — no separate call is needed for those.
    fetchJson<PortalRequestsListResponse>(
      "/portal/beneficiary/requests?status=APPROVED&sortKey=submittedAt&sortDir=desc&page=1&limit=10",
      cookieHeader,
    ),
  ]);
  if (!me) return redirect({ href: "/portal/login", locale });

  const t = await getTranslations("portal.dashboard");

  const approvedRequestsSerialized = approvedRequests?.data ?? [];
  const summary: Summary = approvedRequests?.summary ?? {
    drafted: 0,
    inReview: 0,
    verifying: 0,
    approved: 0,
    rejected: 0,
    returned: 0,
    updateRequested: 0,
  };

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
      value: summary.inReview,
      icon: TimerReset,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: t("inReviewLabel"),
      value: summary.verifying,
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
      {summary.returned > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 px-5 py-4">
          <AlertTriangle className="h-4.5 w-4.5 text-orange-600 flex-shrink-0" />
          <p className="text-sm font-medium text-orange-800 flex-1">
            {t("returnedWarningTitle", { count: summary.returned })}
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
            <h1 className="text-xl font-bold">{me.fullName}</h1>
          </div>
        </div>
        <p className="text-blue-200/80 text-sm">
          Secured Nominee Shareholder Portal — Simulation Mode
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7 gap-4">
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
              <div className="min-w-0">
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 break-words">{stat.label}</p>
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
