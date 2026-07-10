"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Bell, RotateCcw, ShieldCheck, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type NotifyRow = { id: number; requestNo: string; companyNameEn: string; companyNameKh: string | null; status: string; updatedAt: string; seen: boolean };

const STATUS_STYLES: Record<string, { icon: React.ElementType; iconBg: string; iconColor: string; textColor: string }> = {
  RETURNED: { icon: RotateCcw, iconBg: "bg-orange-50", iconColor: "text-orange-600", textColor: "text-orange-600" },
  REJECTED: { icon: XCircle, iconBg: "bg-red-50", iconColor: "text-red-600", textColor: "text-red-600" },
  IN_REVIEW: { icon: ShieldCheck, iconBg: "bg-purple-50", iconColor: "text-purple-600", textColor: "text-purple-600" },
};

export default function NotificationBell() {
  const t = useTranslations("portal.notifications");
  const tr = useTranslations("beneficiary.allRequests");
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<NotifyRow[]>([]);
  const [unseenCount, setUnseenCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchNotifications() {
      try {
        const res = await fetch("/api/portal/notifications");
        if (!res.ok || cancelled) return;
        const json = await res.json();
        if (cancelled) return;
        setRows(json.data);
        setUnseenCount(json.unseenCount);
      } catch {
        // silently ignore — notifications are non-critical
      }
    }

    fetchNotifications();
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

  const handleOpen = () => {
    setOpen((v) => {
      const next = !v;
      if (next && unseenCount > 0) {
        setUnseenCount(0);
        setRows((prev) => prev.map((r) => ({ ...r, seen: true })));
        fetch("/api/portal/notifications/seen", { method: "PATCH" }).catch(() => {});
      }
      return next;
    });
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={handleOpen}
        className="relative h-9 w-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
      >
        <Bell className="h-5 w-5" />
        {unseenCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-orange-500 ring-2 ring-white text-[10px] font-semibold text-white flex items-center justify-center">
            {unseenCount > 99 ? "99+" : unseenCount}
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
                const style = STATUS_STYLES[r.status] ?? STATUS_STYLES.RETURNED;
                const Icon = style.icon;
                return (
                  <li key={r.id}>
                    <Link
                      href={`/portal/beneficiary/all-requests/${r.id}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors",
                        !r.seen && "bg-slate-50/60"
                      )}
                    >
                      <div className={cn("h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", style.iconBg)}>
                        <Icon className={cn("h-4 w-4", style.iconColor)} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-800 truncate">{r.companyNameEn}</p>
                        <p className="text-xs text-slate-500 font-mono">{r.requestNo}</p>
                        <p className={cn("text-xs mt-0.5", style.textColor)}>
                          {tr(`status.${r.status}` as Parameters<typeof tr>[0])}
                        </p>
                      </div>
                      {!r.seen && <span className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />}
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
