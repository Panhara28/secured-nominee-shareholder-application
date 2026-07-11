"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/lib/navigation";
import { ArrowDown, ArrowUp, ArrowUpDown, CheckCircle2, Eye, FileEdit, Loader2, Pencil, Plus, RefreshCw, RotateCcw, Search, ShieldCheck, TimerReset, XCircle } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";
import TablePagination from "@/components/ui/TablePagination";
import { cn } from "@/lib/utils";

function formatDate(iso: string): string {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}

const STATUS_OPTIONS = ["DRAFT", "PENDING", "IN_REVIEW", "APPROVED", "REJECTED", "RETURNED", "UPDATE_REQUESTED"];

type SortKey = "requestNo" | "companyNameEn" | "submittedAt" | "status";
type SortDir = "asc" | "desc";

type RequestRow = {
  id: number;
  requestNo: string;
  companyNameKh: string | null;
  companyNameEn: string;
  ownerNameEn: string;
  shareholderNameEn: string;
  submittedAt: string;
  status: string;
};

type Summary = { drafted: number; inReview: number; verifying: number; approved: number; rejected: number; returned: number };

export default function AllRequestsList() {
  const t = useTranslations("beneficiary.allRequests");
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStatus = (searchParams.get("status") ?? "").toUpperCase();

  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [status, setStatus] = useState(STATUS_OPTIONS.includes(initialStatus) ? initialStatus : "");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("submittedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const limit = 10;

  const [rows, setRows] = useState<RequestRow[]>([]);
  const [total, setTotal] = useState(0);
  const [summary, setSummary] = useState<Summary>({ drafted: 0, inReview: 0, verifying: 0, approved: 0, rejected: 0, returned: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchRequests() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          q: appliedQuery,
          status,
          sortKey,
          sortDir,
          page: String(page),
          limit: String(limit),
        });
        const res = await fetch(`/api/portal/beneficiary/requests?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to load requests.");
        const json = await res.json();
        if (cancelled) return;
        setRows(json.data);
        setTotal(json.total);
        setSummary(json.summary);
      } catch {
        if (!cancelled) setError(t("loadError"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRequests();
    return () => {
      cancelled = true;
    };
  }, [appliedQuery, status, page, sortKey, sortDir, retryToken, t]);

  const handleSearch = () => {
    setAppliedQuery(query);
    setPage(1);
  };

  const handleReset = () => {
    setQuery("");
    setAppliedQuery("");
    setStatus("");
    setPage(1);
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ArrowUpDown className="h-3 w-3 text-slate-400" />;
    return sortDir === "asc" ? (
      <ArrowUp className="h-3 w-3 text-blue-600" />
    ) : (
      <ArrowDown className="h-3 w-3 text-blue-600" />
    );
  };

  const SortableHeader = ({ column, label }: { column: SortKey; label: string }) => (
    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">
      <button
        type="button"
        onClick={() => toggleSort(column)}
        className="inline-flex items-center gap-1 hover:text-slate-800 transition-colors"
      >
        {label}
        <SortIcon column={column} />
      </button>
    </th>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-800">{t("pageTitle")}</h1>
        <Link
          href="/portal/beneficiary/request"
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          {t("newRequest")}
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <FileEdit className="h-5 w-5 text-slate-500" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 truncate">{t("summary.drafted")}</p>
            <p className="text-xl font-semibold text-slate-800">{summary.drafted}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <TimerReset className="h-5 w-5 text-blue-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 truncate">{t("summary.inReview")}</p>
            <p className="text-xl font-semibold text-slate-800">{summary.inReview}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="h-5 w-5 text-purple-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 truncate">{t("summary.verifying")}</p>
            <p className="text-xl font-semibold text-slate-800">{summary.verifying}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 truncate">{t("summary.approved")}</p>
            <p className="text-xl font-semibold text-slate-800">{summary.approved}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
            <XCircle className="h-5 w-5 text-red-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 truncate">{t("summary.rejected")}</p>
            <p className="text-xl font-semibold text-slate-800">{summary.rejected}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
            <RotateCcw className="h-5 w-5 text-orange-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 truncate">{t("summary.returned")}</p>
            <p className="text-xl font-semibold text-slate-800">{summary.returned}</p>
          </div>
        </div>
      </div>

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
            <label className="block text-xs font-medium text-slate-600 mb-1">{t("statusLabel")}</label>
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">{t("statusAll")}</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {t(`status.${s}` as Parameters<typeof t>[0])}
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
                <SortableHeader column="requestNo" label={t("col.requestNo")} />
                <SortableHeader column="companyNameEn" label={t("col.company")} />
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">
                  {t("col.owner")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">
                  {t("col.shareholder")}
                </th>
                <SortableHeader column="submittedAt" label={t("col.submittedAt")} />
                <SortableHeader column="status" label={t("col.status")} />
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">
                  {t("col.action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <Loader2 className="h-5 w-5 animate-spin text-slate-400 inline-block" />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <EmptyState message={t("empty")} />
                  </td>
                </tr>
              ) : (
                rows.map((req) => (
                  <tr key={req.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-slate-700">{req.requestNo}</td>
                    <td className="px-4 py-3 text-slate-800">
                      <div>{req.companyNameEn}</div>
                      {req.companyNameKh && (
                        <div className="text-xs text-slate-400">{req.companyNameKh}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{req.ownerNameEn}</td>
                    <td className="px-4 py-3 text-slate-700">{req.shareholderNameEn}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{formatDate(req.submittedAt)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={req.status} label={t(`status.${req.status}` as Parameters<typeof t>[0])} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => router.push(`/portal/beneficiary/all-requests/${req.id}`)}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                          )}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          {t("view")}
                        </button>
                        {req.status === "APPROVED" && (
                          <button
                            onClick={() => router.push(`/portal/beneficiary/all-requests/${req.id}/edit`)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100 transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            {t("requestUpdate")}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <TablePagination page={page} total={total} limit={limit} onPageChange={setPage} />
      </div>
    </div>
  );
}
