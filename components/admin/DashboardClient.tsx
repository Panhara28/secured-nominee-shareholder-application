"use client";

import { useTranslations } from "next-intl";
import { Users, FileText, FileEdit, CheckCircle2, XCircle, TimerReset } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";

type Summary = { drafted: number; request: number; approved: number; rejected: number };
type RecentRow = { id: number; requestNo: string; companyNameEn: string; status: string; submittedAt: string };

type Props = {
  totalShareholders: number;
  totalRequests: number;
  summary: Summary;
  recent: RecentRow[];
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}

export default function DashboardClient({ totalShareholders, totalRequests, summary, recent }: Props) {
  const t = useTranslations("admin.dashboard");
  const tr = useTranslations("beneficiary.allRequests");

  const cards = [
    { label: t("totalShareholders"), value: totalShareholders, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: t("totalRequests"), value: totalRequests, icon: FileText, color: "text-slate-600", bg: "bg-slate-100" },
    { label: t("drafted"), value: summary.drafted, icon: FileEdit, color: "text-slate-500", bg: "bg-slate-100" },
    { label: t("request"), value: summary.request, icon: TimerReset, color: "text-blue-600", bg: "bg-blue-50" },
    { label: t("approved"), value: summary.approved, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
    { label: t("rejected"), value: summary.rejected, icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-800">{t("pageTitle")}</h1>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {cards.map((c) => {
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
          <h3 className="text-sm font-semibold text-slate-700 px-5 py-3.5 border-b border-slate-100">
            {t("recentRequests")}
          </h3>
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
                {recent.length === 0 ? (
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
    </div>
  );
}
