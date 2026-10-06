"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  diffSnapshots, isArrayField,
  type RequestSnapshot, type RevisionFieldName, type FieldDiff,
} from "@/lib/request-revision";

export type RequestRevisionEntry = {
  id: number;
  editedByName: string;
  editedByRole: string;
  previousData: RequestSnapshot;
  newData: RequestSnapshot;
  updateType?: string | null;
  createdAt: string;
  approvedAt?: string | null;
};

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  const date = `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return `${date} ${time}`;
}

const FIELD_SECTIONS: { section: "company" | "shareholder" | "owner" | "agreement"; fields: RevisionFieldName[] }[] = [
  {
    section: "company",
    fields: [
      "companyNameKh", "companyNameEn", "registrationNo", "registrationDate",
      "companyProvince", "companyDistrict", "companyCommune", "companyVillage", "companyStreet", "companyHouse",
      "companyPhone", "companyOfficePhone", "companyEmail",
    ],
  },
  { section: "shareholder", fields: ["nomineeShareholders"] },
  { section: "owner", fields: ["beneficialOwners"] },
  { section: "agreement", fields: ["agreements"] },
];

const FIELD_LABEL_KEYS: Record<RevisionFieldName, string> = {
  companyNameKh: "companyNameKh", companyNameEn: "companyNameEn", registrationNo: "registrationNo",
  registrationDate: "registrationDate", companyProvince: "province", companyDistrict: "district",
  companyCommune: "commune", companyVillage: "village", companyStreet: "street", companyHouse: "houseNo",
  companyPhone: "companyPhone", companyOfficePhone: "companyOfficePhone", companyEmail: "companyEmail",
  nomineeShareholders: "nomineeGroupTitle", beneficialOwners: "ownerGroupTitle", agreements: "agreementGroupTitle",
};

const FIELD_LABEL_NAMESPACE: Record<string, "request" | "revisions"> = {
  companyNameKh: "request", companyNameEn: "request", registrationNo: "request", registrationDate: "request",
  province: "request", district: "request", commune: "request", village: "request", street: "request", houseNo: "request",
  companyPhone: "request", companyOfficePhone: "request", companyEmail: "request",
  nomineeGroupTitle: "request", ownerGroupTitle: "request", agreementGroupTitle: "request",
};

function DiffValue({ value, tr }: { value: FieldDiff["previous"]; tr: ReturnType<typeof useTranslations> }) {
  if (value === null || value === "") return <span className="text-slate-400">-</span>;
  if (typeof value === "boolean") return <span>{value ? tr("yes") : tr("no")}</span>;
  return <span className="break-words">{value}</span>;
}

// Parses one repeatable-entry array field's JSON blob (see revision-snapshot.ts
// on the API side); falls back to an empty list for malformed/empty input.
function parseEntries(value: FieldDiff["previous"]): Record<string, unknown>[] {
  if (typeof value !== "string" || !value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as Record<string, unknown>[]) : [];
  } catch {
    return [];
  }
}

function entryLabel(e: Record<string, unknown>, field: RevisionFieldName): string {
  if (field === "agreements") {
    return e.agreementDate ? `${e.agreementDate}` : "-";
  }
  return `${e.firstNameEn ?? ""} ${e.lastNameEn ?? ""}`.trim() || "-";
}

// Entries carry no stable id in the snapshot, so "added"/"removed" is
// whole-entry-value diffing rather than per-field diffing within one entry.
function ArrayDiffValue({ entries, sign, field }: { entries: Record<string, unknown>[]; sign: "+" | "-"; field: RevisionFieldName }) {
  if (entries.length === 0) return <span className="text-slate-400">-</span>;
  return (
    <ul className="space-y-0.5">
      {entries.map((e, i) => (
        <li key={i} className="flex items-center gap-1 truncate">
          <span className={cn("font-bold", sign === "+" ? "text-green-500" : "text-red-500")}>{sign}</span>
          {entryLabel(e, field)}
        </li>
      ))}
    </ul>
  );
}

export function RevisionDiffTable({ diffs, tf, tr }: { diffs: FieldDiff[]; tf: ReturnType<typeof useTranslations>; tr: ReturnType<typeof useTranslations> }) {
  const bySection = FIELD_SECTIONS.map((s) => ({
    section: s.section,
    rows: diffs.filter((d) => s.fields.includes(d.field)),
  })).filter((s) => s.rows.length > 0);

  if (bySection.length === 0) {
    return <p className="text-sm text-slate-400 px-3 py-2">{tr("noFieldChanges")}</p>;
  }

  return (
    <div className="space-y-4">
      {bySection.map(({ section, rows }) => (
        <div key={section}>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            {tr(`sections.${section}` as Parameters<typeof tr>[0])}
          </p>
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-3 py-1.5 text-left text-xs font-semibold text-slate-600 whitespace-nowrap">{tr("field")}</th>
                  <th className="px-3 py-1.5 text-left text-xs font-semibold text-slate-600">{tr("columnPrevious")}</th>
                  <th className="px-3 py-1.5 text-left text-xs font-semibold text-slate-600">{tr("columnNew")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((d) => {
                  const labelKey = FIELD_LABEL_KEYS[d.field];
                  const ns = FIELD_LABEL_NAMESPACE[labelKey] ?? "revisions";
                  const label = ns === "request" ? tf(labelKey as Parameters<typeof tf>[0]) : tr(`fields.${labelKey}` as Parameters<typeof tr>[0]);
                  const arrayField = isArrayField(d.field);
                  const prevEntries = arrayField ? parseEntries(d.previous) : [];
                  const nextEntries = arrayField ? parseEntries(d.next) : [];
                  const prevKeys = prevEntries.map((e) => JSON.stringify(e));
                  const nextKeys = nextEntries.map((e) => JSON.stringify(e));
                  const removed = prevEntries.filter((_, i) => !nextKeys.includes(prevKeys[i]));
                  const added = nextEntries.filter((_, i) => !prevKeys.includes(nextKeys[i]));
                  return (
                    <tr key={d.field} className="border-b border-slate-100 last:border-b-0">
                      <td className="px-3 py-2 text-slate-700 font-medium whitespace-nowrap align-top">{label}</td>
                      {arrayField ? (
                        <>
                          <td className="px-3 py-2 align-top max-w-[240px]"><ArrayDiffValue entries={removed} sign="-" field={d.field} /></td>
                          <td className="px-3 py-2 align-top max-w-[240px]"><ArrayDiffValue entries={added} sign="+" field={d.field} /></td>
                        </>
                      ) : (
                        <>
                          <td className="px-3 py-2 text-slate-600 align-top max-w-[200px]"><DiffValue value={d.previous} tr={tr} /></td>
                          <td className="px-3 py-2 text-slate-800 align-top max-w-[200px]"><DiffValue value={d.next} tr={tr} /></td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RequestRevisionHistory({ revisions = [] }: { revisions?: RequestRevisionEntry[] }) {
  const tr = useTranslations("beneficiary.revisions");
  const tf = useTranslations("beneficiary.request");
  const tu = useTranslations("requestTypes");
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (revisions.length === 0) {
    return <p className="text-sm text-slate-400">{tr("empty")}</p>;
  }

  return (
    <ul className="space-y-3">
      {revisions.map((entry) => {
        const isOpen = expanded.has(entry.id);
        const diffs = diffSnapshots(entry.previousData, entry.newData);
        return (
          <li key={entry.id} className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggle(entry.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 bg-white hover:bg-slate-50 transition-colors text-left"
            >
              <div className="h-8 w-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                <Pencil className="h-4 w-4 text-amber-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-800">
                  {tr("editedBy", { name: entry.editedByName, date: formatDateTime(entry.createdAt) })}
                </p>
                {entry.updateType && (
                  <p className="text-xs text-amber-700">{tu(entry.updateType as Parameters<typeof tu>[0])}</p>
                )}
              </div>
              <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform duration-200 flex-shrink-0", isOpen && "rotate-180")} />
            </button>
            {isOpen && (
              <div className="px-3 py-3 bg-slate-50 border-t border-slate-200">
                <RevisionDiffTable diffs={diffs} tf={tf} tr={tr} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

// While a request is UPDATE_REQUESTED: what the applicant changed, i.e. the
// latest not-yet-approved revision (revisions come newest first).
export function PendingUpdateChanges({ revisions }: { revisions: RequestRevisionEntry[] }) {
  const tr = useTranslations("beneficiary.revisions");
  const tf = useTranslations("beneficiary.request");
  const pending = revisions.find((r) => !r.approvedAt);
  if (!pending) return null;
  return (
    <div className="bg-white rounded-xl border border-amber-200 shadow-sm">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-amber-100 bg-amber-50/60 rounded-t-xl">
        <Pencil className="h-4 w-4 text-amber-600" />
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-700">{tr("pendingChangesTitle")}</h3>
          <p className="text-xs text-slate-500">{tr("pendingChangesHint")}</p>
        </div>
      </div>
      <div className="p-5">
        <RevisionDiffTable diffs={diffSnapshots(pending.previousData, pending.newData)} tf={tf} tr={tr} />
      </div>
    </div>
  );
}
