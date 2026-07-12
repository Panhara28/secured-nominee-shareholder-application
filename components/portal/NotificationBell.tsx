"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link } from "@/lib/navigation";
import { Bell, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { notify, requestNotificationPermission } from "@/lib/browser-notifications";
import { notifyStatusStyle } from "@/lib/notification-status";

type NotifyRow = { id: number; requestNo: string; companyNameEn: string; companyNameKh: string | null; status: string; updatedAt: string; seen: boolean };

function NotificationRows({
  rows,
  emptyLabel,
  tr,
  onNavigate,
}: {
  rows: NotifyRow[];
  emptyLabel: string;
  tr: ReturnType<typeof useTranslations>;
  onNavigate: () => void;
}) {
  if (rows.length === 0) {
    return <p className="px-4 py-6 text-center text-sm text-slate-400">{emptyLabel}</p>;
  }
  return (
    <ul className="divide-y divide-slate-100">
      {rows.map((r) => {
        const style = notifyStatusStyle(r.status);
        const Icon = style.icon;
        return (
          <li key={r.id}>
            <Link
              href={`/portal/beneficiary/all-requests/${r.id}`}
              onClick={onNavigate}
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
  );
}

export default function NotificationBell() {
  const t = useTranslations("portal.notifications");
  const tr = useTranslations("beneficiary.allRequests");
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<NotifyRow[]>([]);
  const [unseenCount, setUnseenCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const knownKeys = useRef<Set<string> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchNotifications() {
      try {
        const res = await fetch("/api/portal/notifications");
        if (!res.ok || cancelled) return;
        const json = await res.json();
        if (cancelled) return;
        const newRows: NotifyRow[] = json.data;

        // Keyed by id+status (not just id) so a request re-notifies when its
        // status changes — e.g. seen once as IN_REVIEW, then again as APPROVED.
        if (knownKeys.current === null) {
          // First load — seed silently so existing unseen items don't all pop at once.
          knownKeys.current = new Set(newRows.map((r) => `${r.id}:${r.status}`));
        } else {
          for (const row of newRows) {
            const key = `${row.id}:${row.status}`;
            if (!knownKeys.current.has(key)) {
              knownKeys.current.add(key);
              const body = tr(`status.${row.status}` as Parameters<typeof tr>[0]);
              // OS-level popup (best-effort — depends on browser/OS permission state)
              notify(row.companyNameEn, { body, tag: `request-${row.id}` });
              // In-app toast (always visible while the tab is open, regardless of
              // Notification permission), color-coded to match the status.
              const style = notifyStatusStyle(row.status);
              const Icon = style.icon;
              toast(row.companyNameEn, {
                description: body,
                icon: <Icon className={cn("h-4 w-4", style.iconColor)} />,
                style: { borderLeft: `4px solid ${style.accent}` },
              });
            }
          }
        }

        setRows(newRows);
        setUnseenCount(json.unseenCount);
      } catch {
        // silently ignore — notifications are non-critical
      }
    }

    fetchNotifications();
    // Fallback poll in case the SSE connection drops and doesn't reconnect in time.
    const interval = setInterval(fetchNotifications, 30_000);

    // Real-time push: the server notifies this stream the instant a relevant
    // status change happens, and we just re-run the same fetch immediately.
    const source = new EventSource("/api/portal/notifications/stream");
    source.onmessage = () => fetchNotifications();

    return () => {
      cancelled = true;
      clearInterval(interval);
      source.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    // Browsers require a genuine user gesture to show the permission prompt
    // (a request fired on mount is silently ignored/shown as a muted icon by
    // Chrome's abusive-notification-permission heuristics) — so ask on the
    // user's first click anywhere on the page instead.
    function handleFirstClick() {
      requestNotificationPermission();
      document.removeEventListener("click", handleFirstClick);
    }
    document.addEventListener("click", handleFirstClick);
    return () => document.removeEventListener("click", handleFirstClick);
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

      {/* Desktop: anchored dropdown */}
      {open && (
        <div className="hidden sm:block absolute right-0 mt-2 w-80 max-w-[90vw] rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden z-40">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-800">{t("title")}</p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            <NotificationRows rows={rows} emptyLabel={t("empty")} tr={tr} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Mobile: slide-in drawer from the right */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity sm:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm bg-white shadow-xl flex flex-col transition-transform duration-300 sm:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <p className="text-sm font-semibold text-slate-800">{t("title")}</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <NotificationRows rows={rows} emptyLabel={t("empty")} tr={tr} onNavigate={() => setOpen(false)} />
        </div>
      </div>
    </div>
  );
}
