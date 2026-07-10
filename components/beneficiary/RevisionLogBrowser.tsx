"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { ArrowUpRight, GitCompare, Loader2, RefreshCw, Search } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import TablePagination from "@/components/ui/TablePagination";
import { cn } from "@/lib/utils";
import { diffSnapshots, type RequestSnapshot } from "@/lib/request-revision";
import { RevisionDiffTable } from "@/components/beneficiary/RequestRevisionHistory";

type RevisionLogEntry = {
  id: number;
  requestId: number;
  requestNo: string;
  companyNameEn: string;
  companyNameKh: string | null;
  editedByName: string;
  editedByRole: string;
  previousData: RequestSnapshot;
  newData: RequestSnapshot;
  createdAt: string;
};

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  const date = `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return `${date} ${time}`;
}

export default function RevisionLogBrowser({ fetchUrl, requestLinkBase }: { fetchUrl: string; requestLinkBase: string }) {
  const tr = useTranslations("beneficiary.revisions");
  const tf = useTranslations("beneficiary.request");
  const searchParams = useSearchParams();
  const requestIdFilter = searchParams.get("requestId");

  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  const [rows, setRows] = useState<RevisionLogEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchRevisions() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ q: appliedQuery, page: String(page), limit: String(limit) });
        if (requestIdFilter) params.set("requestId", requestIdFilter);
        const res = await fetch(`${fetchUrl}?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to load revisions.");
        const json = await res.json();
        if (cancelled) return;
        setRows(json.data);
        setTotal(json.total);
        setSelectedId((prev) => {
          if (prev && json.data.some((r: RevisionLogEntry) => r.id === prev)) return prev;
          return json.data[0]?.id ?? null;
        });
      } catch {
        if (!cancelled) setError(tr("loadError"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRevisions();
    return () => {
      cancelled = true;
    };
  }, [fetchUrl, appliedQuery, requestIdFilter, page, retryToken, tr]);

  const handleSearch = () => {
    setAppliedQuery(query.trim());
    setPage(1);
  };

  const handleReset = () => {
    setQuery("");
    setAppliedQuery("");
    setPage(1);
  };

  const selected = rows.find((r) => r.id === selectedId) ?? null;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-slate-600 mb-1">{tr("searchLabel")}</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder={tr("searchPlaceholder")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {tr("reset")}
            </button>
            <button
              onClick={handleSearch}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
              {tr("search")}
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
            {tr("retry")}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4 items-start">
        {/* Commit list */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-16 text-center">
              <Loader2 className="h-5 w-5 animate-spin text-slate-400 inline-block" />
            </div>
          ) : rows.length === 0 ? (
            <EmptyState message={tr("empty")} />
          ) : (
            <ul className="divide-y divide-slate-100 max-h-[70vh] overflow-y-auto">
              {rows.map((r) => {
                const isSelected = r.id === selectedId;
                const changedCount = diffSnapshots(r.previousData, r.newData).length;
                return (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(r.id)}
                      className={cn(
                        "w-full text-left px-4 py-3 transition-colors",
                        isSelected ? "bg-blue-50 border-l-2 border-blue-600" : "hover:bg-slate-50 border-l-2 border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <GitCompare className={cn("h-3.5 w-3.5 flex-shrink-0", isSelected ? "text-blue-600" : "text-slate-400")} />
                        <p className="text-sm font-medium text-slate-800 truncate">{r.companyNameEn}</p>
                      </div>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">{r.requestNo}</p>
                      <p className="text-xs text-slate-500 mt-1">{r.editedByName} · {formatDateTime(r.createdAt)}</p>
                      <p className="text-xs text-blue-600 mt-1">{tr("fieldsChanged", { count: changedCount })}</p>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          <TablePagination page={page} total={total} limit={limit} onPageChange={setPage} />
        </div>

        {/* Diff panel */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm min-h-[300px]">
          {selected ? (
            <div>
              <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-slate-100">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800">
                    {selected.companyNameEn}
                    {selected.companyNameKh ? ` · ${selected.companyNameKh}` : ""}
                  </p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{selected.requestNo}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {tr("editedBy", { name: selected.editedByName, date: formatDateTime(selected.createdAt) })}
                  </p>
                </div>
                <Link
                  href={`${requestLinkBase}/${selected.requestId}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  {tr("viewRequest")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="p-5">
                <RevisionDiffTable diffs={diffSnapshots(selected.previousData, selected.newData)} tf={tf} tr={tr} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center gap-2 py-16">
              <GitCompare className="h-8 w-8 text-slate-300" />
              <p className="text-sm text-slate-500">{tr("selectPrompt")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
