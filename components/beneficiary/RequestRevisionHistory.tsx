"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  diffSnapshots, isDocNameField,
  type RequestSnapshot, type RevisionFieldName, type FieldDiff,
} from "@/lib/request-revision";

export type RequestRevisionEntry = {
  id: number;
  editedByName: string;
  editedByRole: string;
  previousData: RequestSnapshot;
  newData: RequestSnapshot;
  createdAt: string;
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
  {
    section: "shareholder",
    fields: [
      "shLastNameKh", "shFirstNameKh", "shLastNameEn", "shFirstNameEn", "shDob", "shNationality", "shGender",
      "shIdCard", "shIdIssuedDate", "shIdExpiredDate", "shEmail", "shPhone", "shPhotoName", "shIdDocNames",
    ],
  },
  {
    section: "owner",
    fields: [
      "ownerLastNameKh", "ownerFirstNameKh", "ownerLastNameEn", "ownerFirstNameEn", "ownerDob", "ownerNationality", "ownerGender",
      "ownerIdCard", "ownerIdIssuedDate", "ownerIdExpiredDate", "ownerEmail", "ownerPhone", "ownerPhotoName", "ownerIdDocNames",
      "shareAmount",
    ],
  },
  {
    section: "agreement",
    fields: ["shareholderContractDocNames", "otherDocNames", "consentAgreed"],
  },
];

const FIELD_LABEL_KEYS: Record<RevisionFieldName, string> = {
  companyNameKh: "companyNameKh", companyNameEn: "companyNameEn", registrationNo: "registrationNo",
  registrationDate: "registrationDate", companyProvince: "province", companyDistrict: "district",
  companyCommune: "commune", companyVillage: "village", companyStreet: "street", companyHouse: "houseNo",
  companyPhone: "companyPhone", companyOfficePhone: "companyOfficePhone", companyEmail: "companyEmail",
  shLastNameKh: "lastNameKh", shFirstNameKh: "firstNameKh", shLastNameEn: "lastNameEn", shFirstNameEn: "firstNameEn",
  shDob: "dob", shNationality: "nationality", shGender: "gender", shIdCard: "idCard",
  shIdIssuedDate: "issueDate", shIdExpiredDate: "expiryDate", shEmail: "email", shPhone: "phone",
  shPhotoName: "photo", shIdDocNames: "idDocuments",
  ownerLastNameKh: "lastNameKh", ownerFirstNameKh: "firstNameKh", ownerLastNameEn: "lastNameEn", ownerFirstNameEn: "firstNameEn",
  ownerDob: "dob", ownerNationality: "nationality", ownerGender: "gender", ownerIdCard: "idCard",
  ownerIdIssuedDate: "issueDate", ownerIdExpiredDate: "expiryDate", ownerEmail: "email", ownerPhone: "phone",
  ownerPhotoName: "photo", ownerIdDocNames: "idDocuments", shareAmount: "shareAmount",
  shareholderContractDocNames: "contractDocuments", otherDocNames: "otherDocuments", consentAgreed: "consentAgreed",
};

const FIELD_LABEL_NAMESPACE: Record<string, "request" | "revisions"> = {
  companyNameKh: "request", companyNameEn: "request", registrationNo: "request", registrationDate: "request",
  province: "request", district: "request", commune: "request", village: "request", street: "request", houseNo: "request",
  companyPhone: "request", companyOfficePhone: "request", companyEmail: "request",
  lastNameKh: "request", firstNameKh: "request", lastNameEn: "request", firstNameEn: "request",
  dob: "request", nationality: "request", gender: "request", idCard: "request",
  issueDate: "request", expiryDate: "request", email: "request", phone: "request", shareAmount: "request",
  photo: "revisions", idDocuments: "revisions", contractDocuments: "revisions", otherDocuments: "revisions", consentAgreed: "revisions",
};

function DiffValue({ value, tr }: { value: FieldDiff["previous"]; tr: ReturnType<typeof useTranslations> }) {
  if (value === null || value === "") return <span className="text-slate-400">-</span>;
  if (typeof value === "boolean") return <span>{value ? tr("yes") : tr("no")}</span>;
  return <span>{value}</span>;
}

function DocDiffValue({ names, sign }: { names: string[]; sign: "+" | "-" }) {
  if (names.length === 0) return <span className="text-slate-400">-</span>;
  return (
    <ul className="space-y-0.5">
      {names.map((n, i) => (
        <li key={i} className="flex items-center gap-1 truncate">
          <span className={cn("font-bold", sign === "+" ? "text-green-500" : "text-red-500")}>{sign}</span>
          {n}
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
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-1.5 text-left text-xs font-semibold text-slate-600">{tr("field")}</th>
                <th className="px-3 py-1.5 text-left text-xs font-semibold text-slate-600">{tr("columnPrevious")}</th>
                <th className="px-3 py-1.5 text-left text-xs font-semibold text-slate-600">{tr("columnNew")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((d) => {
                const labelKey = FIELD_LABEL_KEYS[d.field];
                const ns = FIELD_LABEL_NAMESPACE[labelKey] ?? "revisions";
                const label = ns === "request" ? tf(labelKey as Parameters<typeof tf>[0]) : tr(`fields.${labelKey}` as Parameters<typeof tr>[0]);
                const docField = isDocNameField(d.field);
                return (
                  <tr key={d.field} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-3 py-2 text-slate-700 font-medium whitespace-nowrap align-top">{label}</td>
                    {docField ? (
                      <>
                        <td className="px-3 py-2 align-top">
                          <DocDiffValue
                            names={(d.previous as string[]).filter((n) => !(d.next as string[]).includes(n))}
                            sign="-"
                          />
                        </td>
                        <td className="px-3 py-2 align-top">
                          <DocDiffValue
                            names={(d.next as string[]).filter((n) => !(d.previous as string[]).includes(n))}
                            sign="+"
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-3 py-2 text-slate-600 align-top"><DiffValue value={d.previous} tr={tr} /></td>
                        <td className="px-3 py-2 text-slate-800 align-top"><DiffValue value={d.next} tr={tr} /></td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default function RequestRevisionHistory({ revisions = [] }: { revisions?: RequestRevisionEntry[] }) {
  const tr = useTranslations("beneficiary.revisions");
  const tf = useTranslations("beneficiary.request");
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
