"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Eye, Loader2, Pencil, Search } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";

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

function formatDate(iso: string): string {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}

export default function RequestToUpdateSearch() {
  const t = useTranslations("portal.requestUpdate");
  const tr = useTranslations("beneficiary.allRequests");

  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [rows, setRows] = useState<RequestRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!appliedQuery) return;
    let cancelled = false;

    async function fetchResults() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          q: appliedQuery,
          status: "APPROVED",
          sortKey: "submittedAt",
          sortDir: "desc",
          page: "1",
          limit: "20",
        });
        const res = await fetch(`/api/portal/beneficiary/requests?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to search requests.");
        const json = await res.json();
        if (cancelled) return;
        setRows(json.data);
        setSearched(true);
      } catch {
        if (!cancelled) setError(tr("loadError"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchResults();
    return () => {
      cancelled = true;
    };
  }, [appliedQuery, tr]);

  const handleSearch = () => {
    setAppliedQuery(query.trim());
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <label className="block text-xs font-medium text-slate-600 mb-1">{t("searchLabel")}</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder={t("searchPlaceholder")}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Search className="h-3.5 w-3.5" />
            {t("search")}
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-400">{t("searchHint")}</p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-16 text-center">
          <Loader2 className="h-5 w-5 animate-spin text-slate-400 inline-block" />
        </div>
      ) : searched ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">{tr("col.requestNo")}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">{tr("col.company")}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">{tr("col.status")}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">{tr("col.submittedAt")}</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">{tr("col.action")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={5}>
                      <EmptyState message={t("noResults")} />
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => (
                    <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-slate-700">{r.requestNo}</td>
                      <td className="px-4 py-3 text-slate-800">
                        <div>{r.companyNameEn}</div>
                        {r.companyNameKh && <div className="text-xs text-slate-400">{r.companyNameKh}</div>}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={r.status} label={tr(`status.${r.status}` as Parameters<typeof tr>[0])} />
                      </td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{formatDate(r.submittedAt)}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/portal/beneficiary/all-requests/${r.id}`}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            {tr("view")}
                          </Link>
                          <Link
                            href={`/portal/beneficiary/all-requests/${r.id}/edit`}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            {t("update")}
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-16 flex flex-col items-center justify-center text-center gap-2">
          <Search className="h-8 w-8 text-slate-300" />
          <p className="text-sm text-slate-500">{t("searchPrompt")}</p>
        </div>
      )}
    </div>
  );
}
