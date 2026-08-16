"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Calendar, CheckCircle2, Download, FileEdit, FileSpreadsheet,
  Loader2, RefreshCw, RotateCcw, ShieldCheck, TimerReset, XCircle,
} from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";

type Period = "daily" | "weekly" | "monthly" | "yearly" | "custom";

type Summary = {
  drafted: number;
  inReview: number;
  verifying: number;
  approved: number;
  rejected: number;
  returned: number;
  updateRequested: number;
};

type ReportRow = {
  id: number;
  requestNo: string;
  companyNameKh: string | null;
  companyNameEn: string;
  ownerNameEn: string;
  shareholderNameEn: string;
  submittedByName: string;
  submittedByUsername: string;
  submittedAt: string;
  status: string;
};

type ReportData = {
  period: Period;
  from: string;
  to: string;
  total: number;
  summary: Summary;
  breakdown: { date: string; count: number }[];
  data: ReportRow[];
};

function formatDate(iso: string): string {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}

function toInputDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

const EMPTY_SUMMARY: Summary = {
  drafted: 0, inReview: 0, verifying: 0, approved: 0, rejected: 0, returned: 0, updateRequested: 0,
};

const STATUS_OPTIONS = ["DRAFT", "PENDING", "IN_REVIEW", "APPROVED", "REJECTED", "RETURNED", "UPDATE_REQUESTED"];

export default function AdminReportsList() {
  const t = useTranslations("admin.reports");
  const ta = useTranslations("beneficiary.allRequests");

  const today = toInputDate(new Date());
  const [period, setPeriod] = useState<Period>("monthly");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [status, setStatus] = useState("");

  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const buildParams = () => {
    const params = new URLSearchParams({ period });
    if (period === "custom") {
      params.set("startDate", startDate);
      params.set("endDate", endDate);
    }
    if (status) {
      params.set("status", status);
    }
    return params;
  };

  useEffect(() => {
    if (period === "custom" && (!startDate || !endDate)) return;

    let cancelled = false;
    async function fetchReport() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/secured/admin/requests/report?${buildParams().toString()}`);
        if (!res.ok) throw new Error("Failed to load report.");
        const json = await res.json();
        if (cancelled) return;
        setReport(json);
      } catch {
        if (!cancelled) setError(t("loadError"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchReport();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, startDate, endDate, status, retryToken]);

  const handleDownload = async () => {
    if (period === "custom" && (!startDate || !endDate)) return;
    setDownloading(true);
    try {
      const res = await fetch(`/api/secured/admin/requests/report/export?${buildParams().toString()}`);
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const disposition = res.headers.get("content-disposition") ?? "";
      const match = disposition.match(/filename="?([^"]+)"?/);
      a.download = match ? match[1] : `nominee-shareholder-report-${period}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError(t("downloadError"));
    } finally {
      setDownloading(false);
    }
  };

  const summary = report?.summary ?? EMPTY_SUMMARY;
  const rows = report?.data ?? [];

  const periodOptions: { value: Period; label: string }[] = [
    { value: "daily", label: t("period.daily") },
    { value: "weekly", label: t("period.weekly") },
    { value: "monthly", label: t("period.monthly") },
    { value: "yearly", label: t("period.yearly") },
    { value: "custom", label: t("period.custom") },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-semibold text-slate-800">{t("pageTitle")}</h1>
        <button
          onClick={handleDownload}
          disabled={downloading || loading || (period === "custom" && (!startDate || !endDate))}
          className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {downloading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <FileSpreadsheet className="h-3.5 w-3.5" />
          )}
          {downloading ? t("downloading") : t("downloadExcel")}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="min-w-[220px]">
            <label className="block text-xs font-medium text-slate-600 mb-1">{t("periodLabel")}</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as Period)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {periodOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="min-w-[200px]">
            <label className="block text-xs font-medium text-slate-600 mb-1">{ta("statusLabel")}</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">{ta("statusAll")}</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {ta(`status.${s}` as Parameters<typeof ta>[0])}
                </option>
              ))}
            </select>
          </div>

          {period === "custom" && (
            <>
              <div className="min-w-[160px]">
                <label className="block text-xs font-medium text-slate-600 mb-1">{t("startDate")}</label>
                <input
                  type="date"
                  value={startDate}
                  max={endDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="min-w-[160px]">
                <label className="block text-xs font-medium text-slate-600 mb-1">{t("endDate")}</label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {report && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 pb-2">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(report.from)} &ndash; {formatDate(report.to)}
            </div>
          )}
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
            {ta("retry")}
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <FileEdit className="h-5 w-5 text-slate-500" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 leading-tight">{ta("summary.drafted")}</p>
            <p className="text-xl font-semibold text-slate-800">{summary.drafted}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <TimerReset className="h-5 w-5 text-blue-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 leading-tight">{ta("summary.inReview")}</p>
            <p className="text-xl font-semibold text-slate-800">{summary.inReview}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="h-5 w-5 text-purple-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 leading-tight">{ta("summary.verifying")}</p>
            <p className="text-xl font-semibold text-slate-800">{summary.verifying}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 leading-tight">{ta("summary.approved")}</p>
            <p className="text-xl font-semibold text-slate-800">{summary.approved}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
            <XCircle className="h-5 w-5 text-red-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 leading-tight">{ta("summary.rejected")}</p>
            <p className="text-xl font-semibold text-slate-800">{summary.rejected}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
            <RotateCcw className="h-5 w-5 text-orange-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 leading-tight">{ta("summary.returned")}</p>
            <p className="text-xl font-semibold text-slate-800">{summary.returned}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-3 col-span-2 sm:col-span-1">
          <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
            <FileSpreadsheet className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 leading-tight">{t("totalRequests")}</p>
            <p className="text-xl font-semibold text-slate-800">{report?.total ?? 0}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">{ta("col.requestNo")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">{ta("col.company")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">{ta("col.owner")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">{ta("col.submittedAt")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">{ta("col.status")}</th>
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
                    <EmptyState message={ta("empty")} />
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
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{formatDate(req.submittedAt)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={req.status} label={ta(`status.${req.status}` as Parameters<typeof ta>[0])} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
