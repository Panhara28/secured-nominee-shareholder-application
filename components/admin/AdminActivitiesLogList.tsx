"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  LogIn, LogOut, UserPlus, KeyRound, KeyRoundIcon, FileEdit, Send, Pencil,
  CheckCircle2, XCircle, RotateCcw, ShieldCheck, Loader2, RefreshCw, Search, UserCheck, UserX,
} from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import TablePagination from "@/components/ui/TablePagination";
import { cn } from "@/lib/utils";

const ACTION_OPTIONS = [
  "LOGIN", "LOGOUT", "REGISTER", "PASSWORD_RESET_REQUESTED", "PASSWORD_RESET",
  "REQUEST_CREATED", "REQUEST_SUBMITTED", "REQUEST_EDITED",
  "REQUEST_APPROVED", "REQUEST_REJECTED", "REQUEST_RETURNED", "REQUEST_VERIFIED",
  "USER_APPROVED", "USER_REJECTED", "USER_VERIFIED", "USER_RETURNED", "REGISTRATION_RESUBMITTED",
];

const ACTION_META: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  LOGIN: { icon: LogIn, color: "text-blue-600", bg: "bg-blue-50" },
  LOGOUT: { icon: LogOut, color: "text-slate-500", bg: "bg-slate-100" },
  REGISTER: { icon: UserPlus, color: "text-blue-600", bg: "bg-blue-50" },
  PASSWORD_RESET_REQUESTED: { icon: KeyRound, color: "text-amber-600", bg: "bg-amber-50" },
  PASSWORD_RESET: { icon: KeyRoundIcon, color: "text-amber-600", bg: "bg-amber-50" },
  REQUEST_CREATED: { icon: FileEdit, color: "text-slate-600", bg: "bg-slate-100" },
  REQUEST_SUBMITTED: { icon: Send, color: "text-blue-600", bg: "bg-blue-50" },
  REQUEST_EDITED: { icon: Pencil, color: "text-amber-600", bg: "bg-amber-50" },
  REQUEST_APPROVED: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  REQUEST_REJECTED: { icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
  REQUEST_RETURNED: { icon: RotateCcw, color: "text-orange-600", bg: "bg-orange-50" },
  REQUEST_VERIFIED: { icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50" },
  USER_APPROVED: { icon: UserCheck, color: "text-green-600", bg: "bg-green-50" },
  USER_REJECTED: { icon: UserX, color: "text-red-600", bg: "bg-red-50" },
  USER_VERIFIED: { icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50" },
  USER_RETURNED: { icon: RotateCcw, color: "text-orange-600", bg: "bg-orange-50" },
  REGISTRATION_RESUBMITTED: { icon: Send, color: "text-blue-600", bg: "bg-blue-50" },
};

type LogRow = {
  id: number;
  action: string;
  entityType: string | null;
  entityId: number | null;
  actorUserId: number | null;
  actorRole: string | null;
  actorName: string | null;
  note: string | null;
  createdAt: string;
};

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  const date = `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return `${date} ${time}`;
}

export default function AdminActivitiesLogList() {
  const t = useTranslations("admin.activitiesLogs");

  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [action, setAction] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  const [rows, setRows] = useState<LogRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchLogs(showLoading = true) {
      if (showLoading) setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          q: appliedQuery,
          action,
          page: String(page),
          limit: String(limit),
        });
        const res = await fetch(`/api/secured/admin/activities-logs?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to load activity logs.");
        const json = await res.json();
        if (cancelled) return;
        setRows(json.data);
        setTotal(json.total);
      } catch {
        if (!cancelled) setError(t("loadError"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchLogs();

    // Real-time: refetch the instant any new activity is logged, instead of
    // waiting for a manual refresh. Skip the loading spinner for these quiet
    // background refreshes so the table doesn't flicker.
    const source = new EventSource("/api/secured/admin/activities-logs/stream");
    source.onmessage = () => fetchLogs(false);

    return () => {
      cancelled = true;
      source.close();
    };
  }, [appliedQuery, action, page, retryToken, t]);

  const handleSearch = () => {
    setAppliedQuery(query);
    setPage(1);
  };

  const handleReset = () => {
    setQuery("");
    setAppliedQuery("");
    setAction("");
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-800">{t("pageTitle")}</h1>
      <p className="text-sm text-slate-500">{t("pageSubtitle")}</p>

      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-slate-600 mb-1">{t("searchLabel")}</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-slate-600 mb-1">{t("actionLabel")}</label>
            <select
              value={action}
              onChange={(e) => { setAction(e.target.value); setPage(1); }}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">{t("actionAll")}</option>
              {ACTION_OPTIONS.map((a) => (
                <option key={a} value={a}>
                  {t(`action.${a}` as Parameters<typeof t>[0])}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t("reset")}
            </button>
            <button
              onClick={handleSearch}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
              {t("search")}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 flex items-center justify-between">
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={() => setRetryToken((n) => n + 1)}
            className="inline-flex items-center gap-1 text-sm font-medium text-red-700 underline hover:no-underline"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {t("retry")}
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">{t("col.action")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">{t("col.actor")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">{t("col.entity")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">{t("col.note")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">{t("col.when")}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <Loader2 className="h-5 w-5 animate-spin text-slate-400 inline-block" />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <EmptyState message={t("empty")} />
                  </td>
                </tr>
              ) : (
                rows.map((log) => {
                  const meta = ACTION_META[log.action] ?? { icon: FileEdit, color: "text-slate-500", bg: "bg-slate-100" };
                  const Icon = meta.icon;
                  return (
                    <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0", meta.bg)}>
                            <Icon className={cn("h-3.5 w-3.5", meta.color)} />
                          </div>
                          <span className="text-slate-800 font-medium whitespace-nowrap">
                            {t(`action.${log.action}` as Parameters<typeof t>[0])}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {log.actorName ? (
                          <>
                            <div>{log.actorName}</div>
                            {log.actorRole && <div className="text-xs text-slate-400">{log.actorRole}</div>}
                          </>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                        {log.entityType ? `${log.entityType}${log.entityId ? ` #${log.entityId}` : ""}` : "-"}
                      </td>
                      <td className="px-4 py-3 text-slate-600 max-w-xs truncate" title={log.note ?? undefined}>
                        {log.note ?? "-"}
                      </td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDateTime(log.createdAt)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <TablePagination page={page} total={total} limit={limit} onPageChange={setPage} />
      </div>
    </div>
  );
}
