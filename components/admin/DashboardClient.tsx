"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Users, FileText, FileEdit, CheckCircle2, XCircle, TimerReset, ShieldCheck, RotateCcw, Loader2 } from "lucide-react";
import { Link } from "@/lib/navigation";
import StatusBadge from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = ["DRAFT", "PENDING", "IN_REVIEW", "APPROVED", "REJECTED", "RETURNED", "UPDATE_REQUESTED"];

type Summary = { drafted: number; request: number; inReview: number; approved: number; rejected: number; returned: number };
type RecentRow = { id: number; requestNo: string; companyNameEn: string; status: string; submittedAt: string };
type RecentUserRow = {
  id: number;
  fullName: string;
  companyName: string | null;
  email: string;
  username: string;
  isActive: boolean;
  status?: "PENDING" | "RETURNED" | "ACTIVE";
  createdAt: string;
};

type Props = {
  totalShareholders: number;
  totalRequests: number;
  summary: Summary;
  recent: RecentRow[];
  recentUsers: RecentUserRow[];
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}

export default function DashboardClient({ totalShareholders, totalRequests, summary, recent: initialRecent, recentUsers: initialRecentUsers }: Props) {
  const t = useTranslations("admin.dashboard");
  const tr = useTranslations("beneficiary.allRequests");
  const tu = useTranslations("admin.users");

  const [status, setStatus] = useState("PENDING");
  const [recent, setRecent] = useState<RecentRow[]>(initialRecent);
  const [loading, setLoading] = useState(false);

  const [userStatus, setUserStatus] = useState("PENDING");
  const [recentUsers, setRecentUsers] = useState<RecentUserRow[]>(initialRecentUsers);
  const [usersLoading, setUsersLoading] = useState(false);

  const [stats, setStats] = useState({ totalShareholders, totalRequests, summary });

  // Shared by both channels below so the dashboard only ever holds one
  // connection per channel — opening a separate EventSource per consumer
  // adds up fast and risks hitting the browser's per-origin connection cap.
  async function fetchStats() {
    try {
      const res = await fetch("/api/secured/admin/dashboard/stats");
      if (!res.ok) return;
      const json = await res.json();
      setStats({ totalShareholders: json.totalShareholders, totalRequests: json.totalRequests, summary: json.summary });
    } catch {
      // silently ignore — the previous values remain visible
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function fetchRecent() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          status,
          sortKey: "submittedAt",
          sortDir: "desc",
          page: "1",
          limit: "5",
        });
        const res = await fetch(`/api/secured/admin/requests?${params.toString()}`);
        if (!res.ok) return;
        const json = await res.json();
        if (cancelled) return;
        setRecent(json.data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRecent();

    // Real-time: refetch the instant a shareholder submits/edits a request.
    // Also refreshes the top stat cards, sharing this one connection instead
    // of opening a second one just for that.
    const source = new EventSource("/api/secured/admin/notifications/stream");
    source.onmessage = () => {
      fetchRecent();
      fetchStats();
    };

    return () => {
      cancelled = true;
      source.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    let cancelled = false;

    async function fetchRecentUsers() {
      setUsersLoading(true);
      try {
        const params = new URLSearchParams({
          status: userStatus,
          sortKey: "createdAt",
          sortDir: "desc",
          page: "1",
          limit: "5",
        });
        const res = await fetch(`/api/secured/admin/users?${params.toString()}`);
        if (!res.ok) return;
        const json = await res.json();
        if (cancelled) return;
        setRecentUsers(json.data);
      } finally {
        if (!cancelled) setUsersLoading(false);
      }
    }

    fetchRecentUsers();

    // Real-time: refetch the instant a registration is approved/rejected/returned.
    // Also refreshes the top stat cards, sharing this one connection instead
    // of opening a second one just for that.
    const source = new EventSource("/api/secured/admin/users/stream");
    source.onmessage = () => {
      fetchRecentUsers();
      fetchStats();
    };

    return () => {
      cancelled = true;
      source.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStatus]);

  const topCards = [
    { label: t("totalShareholders"), value: stats.totalShareholders, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: t("totalRequests"), value: stats.totalRequests, icon: FileText, color: "text-slate-600", bg: "bg-slate-100" },
  ];

  const bottomCards = [
    { label: t("drafted"), value: stats.summary.drafted, icon: FileEdit, color: "text-slate-500", bg: "bg-slate-100" },
    { label: t("request"), value: stats.summary.request, icon: TimerReset, color: "text-blue-600", bg: "bg-blue-50" },
    { label: t("inReview"), value: stats.summary.inReview, icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50" },
    { label: t("approved"), value: stats.summary.approved, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
    { label: t("rejected"), value: stats.summary.rejected, icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
    { label: t("returned"), value: stats.summary.returned, icon: RotateCcw, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-800">{t("pageTitle")}</h1>

      <div className="grid grid-cols-2 gap-4">
        {topCards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-4 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`h-5 w-5 ${c.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 truncate">{c.label}</p>
                <p className="text-xl font-semibold text-slate-800">{c.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {bottomCards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-4 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`h-5 w-5 ${c.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 truncate">{c.label}</p>
                <p className="text-xl font-semibold text-slate-800">{c.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700">
              {t("recentRequests")}
            </h3>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">{tr("statusAll")}</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {tr(`status.${s}` as Parameters<typeof tr>[0])}
                </option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">{tr("col.requestNo")}</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">{tr("col.company")}</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">{tr("col.status")}</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">{tr("col.submittedAt")}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center">
                      <Loader2 className="h-5 w-5 animate-spin text-slate-400 inline-block" />
                    </td>
                  </tr>
                ) : recent.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-sm text-slate-400">{tr("empty")}</td>
                  </tr>
                ) : (
                  recent.map((r) => (
                    <tr key={r.id} className="border-b border-slate-100">
                      <td className="px-4 py-2.5 font-mono text-xs text-slate-700">{r.requestNo}</td>
                      <td className="px-4 py-2.5 text-slate-800">{r.companyNameEn}</td>
                      <td className="px-4 py-2.5">
                        <StatusBadge status={r.status} label={tr(`status.${r.status}` as Parameters<typeof tr>[0])} />
                      </td>
                      <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">{formatDate(r.submittedAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700">
              {t("recentUsers")}
            </h3>
            <select
              value={userStatus}
              onChange={(e) => setUserStatus(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">{tu("statusAll")}</option>
              <option value="PENDING">{tu("statusPending")}</option>
              <option value="RETURNED">{tu("statusReturned")}</option>
              <option value="ACTIVE">{tu("statusActive")}</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">{tu("col.name")}</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">{tu("col.company")}</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">{tu("col.status")}</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">{tu("col.registeredAt")}</th>
                </tr>
              </thead>
              <tbody>
                {usersLoading ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center">
                      <Loader2 className="h-5 w-5 animate-spin text-slate-400 inline-block" />
                    </td>
                  </tr>
                ) : recentUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-sm text-slate-400">{tu("empty")}</td>
                  </tr>
                ) : (
                  recentUsers.map((u) => {
                    const status = u.status ?? (u.isActive ? "ACTIVE" : "PENDING");
                    return (
                      <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-2.5 text-slate-800">
                          <Link href={`/secured/admin/users/${u.id}`} className="hover:underline">
                            {u.fullName}
                          </Link>
                        </td>
                        <td className="px-4 py-2.5 text-slate-700">{u.companyName ?? "-"}</td>
                        <td className="px-4 py-2.5">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                              status === "ACTIVE"
                                ? "bg-green-50 text-green-700"
                                : status === "RETURNED"
                                  ? "bg-orange-50 text-orange-700"
                                  : "bg-amber-50 text-amber-700"
                            )}
                          >
                            {status === "ACTIVE" ? tu("statusActive") : status === "RETURNED" ? tu("statusReturned") : tu("statusPending")}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">{formatDate(u.createdAt)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
