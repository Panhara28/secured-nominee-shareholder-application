import type { ElementType } from "react";
import { CheckCircle2, GitCompare, RotateCcw, ShieldCheck, TimerReset, UserPlus, XCircle } from "lucide-react";

export type NotifyStatusKey = "PENDING" | "IN_REVIEW" | "APPROVED" | "REJECTED" | "RETURNED" | "UPDATE_REQUESTED" | "USER";

type StatusStyle = {
  icon: ElementType;
  iconBg: string;
  iconColor: string;
  textColor: string;
  /** Hex accent used for the toast's left border — kept as a plain hex since
   * sonner's `style` prop takes inline CSS, not Tailwind classes. */
  accent: string;
};

export const NOTIFY_STATUS_STYLES: Record<NotifyStatusKey, StatusStyle> = {
  PENDING: { icon: TimerReset, iconBg: "bg-blue-50", iconColor: "text-blue-600", textColor: "text-blue-600", accent: "#2563eb" },
  IN_REVIEW: { icon: ShieldCheck, iconBg: "bg-purple-50", iconColor: "text-purple-600", textColor: "text-purple-600", accent: "#9333ea" },
  APPROVED: { icon: CheckCircle2, iconBg: "bg-green-50", iconColor: "text-green-600", textColor: "text-green-600", accent: "#16a34a" },
  REJECTED: { icon: XCircle, iconBg: "bg-red-50", iconColor: "text-red-600", textColor: "text-red-600", accent: "#dc2626" },
  RETURNED: { icon: RotateCcw, iconBg: "bg-orange-50", iconColor: "text-orange-600", textColor: "text-orange-600", accent: "#ea580c" },
  UPDATE_REQUESTED: { icon: GitCompare, iconBg: "bg-teal-50", iconColor: "text-teal-600", textColor: "text-teal-600", accent: "#0d9488" },
  USER: { icon: UserPlus, iconBg: "bg-amber-50", iconColor: "text-amber-600", textColor: "text-amber-600", accent: "#d97706" },
};

export function notifyStatusStyle(status: string): StatusStyle {
  return NOTIFY_STATUS_STYLES[status as NotifyStatusKey] ?? NOTIFY_STATUS_STYLES.PENDING;
}
