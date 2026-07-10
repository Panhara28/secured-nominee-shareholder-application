import { useTranslations } from "next-intl";
import { CheckCircle2, FileEdit, Pencil, RotateCcw, TimerReset, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ActivityLogEntry = {
  id: number;
  action: "CREATED" | "SUBMITTED" | "APPROVED" | "REJECTED" | "RETURNED" | "EDITED";
  actorName: string;
  actorRole: string;
  note: string | null;
  createdAt: string;
};

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  const date = `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return `${date} ${time}`;
}

const ICONS: Record<ActivityLogEntry["action"], React.ElementType> = {
  CREATED: FileEdit,
  SUBMITTED: TimerReset,
  APPROVED: CheckCircle2,
  REJECTED: XCircle,
  RETURNED: RotateCcw,
  EDITED: Pencil,
};

const ICON_STYLES: Record<ActivityLogEntry["action"], string> = {
  CREATED: "bg-slate-100 text-slate-500",
  SUBMITTED: "bg-blue-50 text-blue-600",
  APPROVED: "bg-green-50 text-green-600",
  REJECTED: "bg-red-50 text-red-600",
  RETURNED: "bg-orange-50 text-orange-600",
  EDITED: "bg-amber-50 text-amber-600",
};

export default function RequestActivityLog({ logs = [] }: { logs?: ActivityLogEntry[] }) {
  const t = useTranslations("beneficiary.allRequests");

  if (logs.length === 0) {
    return <p className="text-sm text-slate-400">{t("log.empty")}</p>;
  }

  return (
    <ul className="space-y-4">
      {logs.map((entry, i) => {
        const Icon = ICONS[entry.action];
        return (
          <li key={entry.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={cn("h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0", ICON_STYLES[entry.action])}>
                <Icon className="h-4 w-4" />
              </div>
              {i < logs.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-1" />}
            </div>
            <div className="pb-4 min-w-0">
              <p className="text-sm font-medium text-slate-800">
                {t(`log.actions.${entry.action}` as Parameters<typeof t>[0])}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {t("log.by", { name: entry.actorName })} · {formatDateTime(entry.createdAt)}
              </p>
              {entry.note && (
                <p className="mt-1.5 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                  {entry.note}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
