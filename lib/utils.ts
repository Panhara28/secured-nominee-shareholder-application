import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitReasonItems(reason: string): string[] {
  if (reason.includes("\n")) return reason.split("\n").map((s) => s.trim()).filter(Boolean);
  if (reason.includes("; ")) return reason.split("; ").map((s) => s.trim()).filter(Boolean);
  return [reason];
}
