"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Bell, GitCompare, TimerReset, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { notify, requestNotificationPermission } from "@/lib/browser-notifications";

type PendingRequestRow = {
  kind: "request";
  id: number;
  requestNo: string;
  companyNameEn: string;
  companyNameKh: string | null;
  status: string;
};
type PendingUserRow = {
  kind: "user";
  id: number;
  fullName: string;
  companyName: string | null;
};
type PendingRow = PendingRequestRow | PendingUserRow;

const NOTIFY_STATUSES = ["PENDING", "UPDATE_REQUESTED"] as const;

const STATUS_STYLES: Record<string, { icon: React.ElementType; iconBg: string; iconColor: string; textColor: string; noticeKey: string }> = {
  PENDING: { icon: TimerReset, iconBg: "bg-blue-50", iconColor: "text-blue-600", textColor: "text-blue-600", noticeKey: "pendingNotice" },
  UPDATE_REQUESTED: { icon: GitCompare, iconBg: "bg-teal-50", iconColor: "text-teal-600", textColor: "text-teal-600", noticeKey: "updateRequestedNotice" },
  USER: { icon: UserPlus, iconBg: "bg-amber-50", iconColor: "text-amber-600", textColor: "text-amber-600", noticeKey: "userPendingNotice" },
};

export default function AdminNotificationBell() {
  const t = useTranslations("admin.notifications");
  const t2 = useTranslations("beneficiary.allRequests");
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<PendingRow[]>([]);
  const [total, setTotal] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const knownKeys = useRef<Set<string> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAwaitingReview() {
      try {
        const fetchStatus = (status: string) => {
          const params = new URLSearchParams({ status, sortKey: "submittedAt", sortDir: "desc", page: "1", limit: "10" });
          return fetch(`/api/secured/admin/requests?${params.toString()}`).then((res) => (res.ok ? res.json() : null));
        };
        const fetchPendingUsers = () => {
          const params = new URLSearchParams({ status: "PENDING", sortKey: "createdAt", sortDir: "desc", page: "1", limit: "10" });
          return fetch(`/api/secured/admin/users?${params.toString()}`).then((res) => (res.ok ? res.json() : null));
        };

        const [requestResults, userResult] = await Promise.all([
          Promise.all(NOTIFY_STATUSES.map((status) => fetchStatus(status))),
          fetchPendingUsers(),
        ]);
        if (cancelled) return;

        const requestRows: PendingRow[] = requestResults.flatMap(
          (r) => (r?.data ?? []).map((d: Omit<PendingRequestRow, "kind">) => ({ kind: "request" as const, ...d }))
        );
        const userRows: PendingRow[] = (userResult?.data ?? []).map(
          (u: { id: number; fullName: string; companyName: string | null }) => ({ kind: "user" as const, ...u })
        );
        const newRows = [...userRows, ...requestRows].slice(0, 10);
        // Keyed by id+status (not just id) for request rows so a request re-notifies
        // when its status changes — e.g. seen once as PENDING, then again as UPDATE_REQUESTED.
        const keyOf = (row: PendingRow) => (row.kind === "request" ? `request-${row.id}:${row.status}` : `user-${row.id}`);

        if (knownKeys.current === null) {
          // First load — seed silently so existing pending items don't all pop at once.
          knownKeys.current = new Set(newRows.map(keyOf));
        } else {
          for (const row of newRows) {
            const key = keyOf(row);
            if (!knownKeys.current.has(key)) {
              knownKeys.current.add(key);
              if (row.kind === "user") {
                notify(row.fullName, { body: t(STATUS_STYLES.USER.noticeKey as Parameters<typeof t>[0]), tag: key });
              } else {
                notify(row.companyNameEn, { body: t2(`status.${row.status}` as Parameters<typeof t2>[0]), tag: key });
              }
            }
          }
        }

        setRows(newRows);
        setTotal(
          requestResults.reduce((sum, r) => sum + (r?.total ?? 0), 0) + (userResult?.total ?? 0)
        );
      } catch {
        // silently ignore — notifications are non-critical
      }
    }

    fetchAwaitingReview();
    // Fallback poll in case the SSE connection drops and doesn't reconnect in time.
    const interval = setInterval(fetchAwaitingReview, 30_000);

    // Real-time push: the server notifies this stream the instant a shareholder
    // submits/edits a request, and we just re-run the same fetch immediately.
    const source = new EventSource("/api/secured/admin/notifications/stream");
    source.onmessage = () => fetchAwaitingReview();

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
                if (r.kind === "user") {
                  const style = STATUS_STYLES.USER;
                  const Icon = style.icon;
                  return (
                    <li key={`user-${r.id}`}>
                      <Link
                        href={`/secured/admin/users/${r.id}`}
                        onClick={() => setOpen(false)}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", style.iconBg)}>
                          <Icon className={cn("h-4 w-4", style.iconColor)} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">{r.fullName}</p>
                          <p className="text-xs text-slate-500 truncate">{r.companyName ?? "-"}</p>
                          <p className={cn("text-xs mt-0.5", style.textColor)}>{t(style.noticeKey as Parameters<typeof t>[0])}</p>
                        </div>
                      </Link>
                    </li>
                  );
                }

                const style = STATUS_STYLES[r.status] ?? STATUS_STYLES.PENDING;
                const Icon = style.icon;
                return (
                  <li key={`request-${r.id}`}>
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
