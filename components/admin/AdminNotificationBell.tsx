"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Bell, GitCompare, TimerReset } from "lucide-react";
import { cn } from "@/lib/utils";

type PendingRow = { id: number; requestNo: string; companyNameEn: string; companyNameKh: string | null; status: string };

const NOTIFY_STATUSES = ["PENDING", "UPDATE_REQUESTED"] as const;

const STATUS_STYLES: Record<string, { icon: React.ElementType; iconBg: string; iconColor: string; textColor: string; noticeKey: string }> = {
  PENDING: { icon: TimerReset, iconBg: "bg-blue-50", iconColor: "text-blue-600", textColor: "text-blue-600", noticeKey: "pendingNotice" },
  UPDATE_REQUESTED: { icon: GitCompare, iconBg: "bg-teal-50", iconColor: "text-teal-600", textColor: "text-teal-600", noticeKey: "updateRequestedNotice" },
};

export default function AdminNotificationBell() {
  const t = useTranslations("admin.notifications");
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<PendingRow[]>([]);
  const [total, setTotal] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAwaitingReview() {
      try {
        const fetchStatus = (status: string) => {
          const params = new URLSearchParams({ status, sortKey: "submittedAt", sortDir: "desc", page: "1", limit: "10" });
          return fetch(`/api/secured/admin/requests?${params.toString()}`).then((res) => (res.ok ? res.json() : null));
        };

        const results = await Promise.all(NOTIFY_STATUSES.map((status) => fetchStatus(status)));
        if (cancelled) return;

        const merged: PendingRow[] = results.flatMap((r) => r?.data ?? []);
        setRows(merged.slice(0, 10));
        setTotal(results.reduce((sum, r) => sum + (r?.total ?? 0), 0));
      } catch {
        // silently ignore — notifications are non-critical
      }
    }

    fetchAwaitingReview();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative h-9 w-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
      >
        <Bell className="h-5 w-5" />
        {total > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-500 ring-2 ring-white text-[10px] font-semibold text-white flex items-center justify-center">
            {total > 99 ? "99+" : total}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-[90vw] rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden z-40">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-800">{t("title")}</p>
          </div>
          {rows.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-slate-400">{t("empty")}</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto divide-y divide-slate-100">
              {rows.map((r) => {
                const style = STATUS_STYLES[r.status] ?? STATUS_STYLES.PENDING;
                const Icon = style.icon;
                return (
                  <li key={r.id}>
                    <Link
                      href={`/secured/admin/requests/${r.id}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                      )}
                    >
                      <div className={cn("h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", style.iconBg)}>
                        <Icon className={cn("h-4 w-4", style.iconColor)} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{r.companyNameEn}</p>
                        <p className="text-xs text-slate-500 font-mono">{r.requestNo}</p>
                        <p className={cn("text-xs mt-0.5", style.textColor)}>{t(style.noticeKey as Parameters<typeof t>[0])}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
