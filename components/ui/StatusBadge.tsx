import { cn } from "@/lib/utils";

type Status = "DRAFT" | "PENDING" | "IN_REVIEW" | "APPROVED" | "REJECTED" | "RETURNED" | "UPDATE_REQUESTED" | string;

const STYLES: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  PENDING: "bg-blue-100 text-blue-800",
  IN_REVIEW: "bg-purple-100 text-purple-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  RETURNED: "bg-orange-100 text-orange-800",
  UPDATE_REQUESTED: "bg-teal-100 text-teal-800",
};

export default function StatusBadge({ status, label }: { status: Status; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        STYLES[status] ?? "bg-gray-100 text-gray-700"
      )}
    >
      {label ?? status}
    </span>
  );
}
