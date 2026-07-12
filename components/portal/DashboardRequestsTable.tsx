"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Eye, Loader2 } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";

const STATUS_OPTIONS = ["DRAFT", "PENDING", "IN_REVIEW", "APPROVED", "REJECTED", "RETURNED", "UPDATE_REQUESTED"];

type RequestRow = {
  id: number;
  requestNo: string;
  companyNameKh: string | null;
  companyNameEn: string;
  status: string;
  submittedAt: string;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}

export default function DashboardRequestsTable({ initialRequests }: { initialRequests: RequestRow[] }) {
  const t = useTranslations("portal.dashboard");
  const tr = useTranslations("beneficiary.allRequests");

  const [status, setStatus] = useState("APPROVED");
  const [rows, setRows] = useState<RequestRow[]>(initialRequests);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchRows() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          status,
          sortKey: "submittedAt",
          sortDir: "desc",
          page: "1",
          limit: "10",
        });
        const res = await fetch(`/api/portal/beneficiary/requests?${params.toString()}`);
        if (!res.ok) return;
        const json = await res.json();
        if (cancelled) return;
        setRows(json.data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRows();

    // Real-time: refetch the instant one of this shareholder's requests changes status.
    const source = new EventSource("/api/portal/notifications/stream");
    source.onmessage = () => fetchRows();

    return () => {
      cancelled = true;
      source.close();
    };
  }, [status]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">{t("allRequestsTitle")}</h2>
        <div className="flex items-center gap-3">
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
          <Link
            href="/portal/beneficiary/all-requests"
            className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">{tr("col.requestNo")}</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">{tr("col.company")}</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">{tr("col.status")}</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">{tr("col.submittedAt")}</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-slate-600 uppercase tracking-wide">{tr("col.action")}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-10 text-center">
                  <Loader2 className="h-5 w-5 animate-spin text-slate-400 inline-block" />
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-sm text-slate-400">{tr("empty")}</td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-b border-slate-100">
                  <td className="px-4 py-2.5 font-mono text-xs text-slate-700">{r.requestNo}</td>
                  <td className="px-4 py-2.5 text-slate-800">
                    <div>{r.companyNameEn}</div>
                    {r.companyNameKh && <div className="text-xs text-slate-400">{r.companyNameKh}</div>}
                  </td>
                  <td className="px-4 py-2.5">
                    <StatusBadge status={r.status} label={tr(`status.${r.status}` as Parameters<typeof tr>[0])} />
                  </td>
                  <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">{formatDate(r.submittedAt)}</td>
                  <td className="px-4 py-2.5 text-center">
                    <Link
                      href={`/portal/beneficiary/all-requests/${r.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      {tr("view")}
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
