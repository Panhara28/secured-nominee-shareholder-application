"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowDown, ArrowUp, ArrowUpDown, Eye, Loader2,
  RotateCcw, Search, RefreshCw, ShieldCheck,
} from "lucide-react";
import { useRouter } from "@/lib/navigation";
import EmptyState from "@/components/ui/EmptyState";
import TablePagination from "@/components/ui/TablePagination";
import { cn } from "@/lib/utils";

function formatDate(iso: string): string {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}

type SortKey = "fullName" | "username" | "createdAt";
type SortDir = "asc" | "desc";

type InternalUserRow = {
  id: number;
  fullName: string;
  email: string;
  username: string;
  isActive: boolean;
  createdAt: string;
  staffRoleName: string | null;
};

export default function AdminInternalUsersList() {
  const t = useTranslations("admin.internalUsers");
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const limit = 10;

  const [rows, setRows] = useState<InternalUserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchUsers() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          q: appliedQuery,
          sortKey,
          sortDir,
          page: String(page),
          limit: String(limit),
        });
        const res = await fetch(`/api/secured/admin/internal-users?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to load internal users.");
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

    fetchUsers();
    return () => {
      cancelled = true;
    };
  }, [appliedQuery, page, sortKey, sortDir, retryToken, t]);

  const handleSearch = () => {
    setAppliedQuery(query);
    setPage(1);
  };

  const handleReset = () => {
    setQuery("");
    setAppliedQuery("");
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

  const sortableHeader = (column: SortKey, label: string) => (
    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">
      <button
        type="button"
        onClick={() => toggleSort(column)}
        className="inline-flex items-center gap-1 hover:text-slate-800 transition-colors"
      >
        {label}
        {sortKey !== column ? (
          <ArrowUpDown className="h-3 w-3 text-slate-400" />
        ) : sortDir === "asc" ? (
          <ArrowUp className="h-3 w-3 text-blue-600" />
        ) : (
          <ArrowDown className="h-3 w-3 text-blue-600" />
        )}
      </button>
    </th>
  );

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
                {sortableHeader("fullName", t("col.name"))}
                {sortableHeader("username", t("col.contact"))}
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">
                  {t("col.role")}
                </th>
                {sortableHeader("createdAt", t("col.createdAt"))}
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">
                  {t("col.status")}
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">
                  {t("col.action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <Loader2 className="h-5 w-5 animate-spin text-slate-400 inline-block" />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <EmptyState message={t("empty")} />
                  </td>
                </tr>
              ) : (
                rows.map((u) => (
                  <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-800">{u.fullName}</td>
                    <td className="px-4 py-3 text-slate-700">
                      <div>{u.email}</div>
                      <div className="text-xs text-slate-400">@{u.username}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      <div className="inline-flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-purple-500" />
                        {u.staffRoleName ?? t("noRole")}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{formatDate(u.createdAt)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                          u.isActive ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-600"
                        )}
                      >
                        {u.isActive ? t("statusActive") : t("statusInactive")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => router.push(`/secured/admin/internal-users/${u.id}`)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        {t("view")}
                      </button>
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
