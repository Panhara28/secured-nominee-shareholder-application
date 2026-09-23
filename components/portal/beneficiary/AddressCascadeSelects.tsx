"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { AddressLevel, AddressOption } from "@/lib/gazetteer";

// Province → District → Commune → Village dropdowns, cascading like the MOC
// business-registration address form: picking a level clears the ones below
// it and loads their options from /api/address. The form still stores the
// Khmer names (not codes) so existing requests, the admin view and revision
// diffs keep working unchanged; codes are recovered by matching names.

export type AddressField = "province" | "district" | "commune" | "village";
export type AddressValues = Record<AddressField, string>;

const FIELDS: { field: AddressField; level: AddressLevel }[] = [
  { field: "province", level: "provinces" },
  { field: "district", level: "districts" },
  { field: "commune", level: "communes" },
  { field: "village", level: "villages" },
];

const optionCache = new Map<string, Promise<AddressOption[]>>();

function fetchOptions(level: AddressLevel, parent: string): Promise<AddressOption[]> {
  const key = `${level}:${parent}`;
  let pending = optionCache.get(key);
  if (!pending) {
    pending = fetch(`/api/address/${level}?parent=${encodeURIComponent(parent)}`)
      .then((res) => (res.ok ? (res.json() as Promise<AddressOption[]>) : []))
      .catch(() => []);
    // Don't cache failures, so a later render can retry.
    pending.then((rows) => { if (rows.length === 0) optionCache.delete(key); });
    optionCache.set(key, pending);
  }
  return pending;
}

// Older data spells some names with the ្ត (ta) subscript where the
// gazetteer uses ្ដ (da), e.g. កណ្តាល / កណ្ដាល — treat them as equal.
const normalize = (s: string) => s.replace(/្ដ/g, "្ត").trim();

function findByName(options: AddressOption[], name: string) {
  const n = normalize(name);
  return n ? options.find((o) => normalize(o.nameKh) === n) : undefined;
}

export default function AddressCascadeSelects({
  values,
  onChange,
  onBlur,
  labels,
  className,
  error,
}: {
  values: AddressValues;
  onChange: (patch: Partial<AddressValues>) => void;
  onBlur: (field: AddressField) => void;
  labels: Record<AddressField, string>;
  className: (field: AddressField) => string;
  error: (field: AddressField) => string;
}) {
  const t = useTranslations("beneficiary.request");
  const locale = useLocale();
  const [options, setOptions] = useState<Record<AddressField, AddressOption[]>>({
    province: [], district: [], commune: [], village: [],
  });

  // Resolve each level's code from the stored name within its parent's list.
  const matched: Partial<Record<AddressField, AddressOption>> = {};
  for (const { field } of FIELDS) matched[field] = findByName(options[field], values[field]);
  const parentCode = (i: number) => (i === 0 ? "" : matched[FIELDS[i - 1].field]?.code);

  const parents = FIELDS.map((_, i) => parentCode(i) ?? "").join("|");
  useEffect(() => {
    let cancelled = false;
    FIELDS.forEach(({ field, level }, i) => {
      const parent = parentCode(i);
      if (parent === undefined) {
        setOptions((prev) => (prev[field].length ? { ...prev, [field]: [] } : prev));
        return;
      }
      fetchOptions(level, parent).then((rows) => {
        if (!cancelled) setOptions((prev) => ({ ...prev, [field]: rows }));
      });
    });
    return () => { cancelled = true; };
    // parentCode is derived from `parents`, which is the real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parents]);

  const label = (o: AddressOption) => (locale === "km" ? o.nameKh : o.nameEn);

  return (
    <>
      {FIELDS.map(({ field }, i) => {
        const parentMissing = i > 0 && !values[FIELDS[i - 1].field];
        // A saved value that isn't in the gazetteer (free text entered before
        // these became dropdowns) stays visible until the user re-picks it.
        const legacy = values[field] && !matched[field] ? values[field] : "";
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {labels[field]} <span className="text-red-500">*</span>
            </label>
            <select
              value={matched[field]?.nameKh ?? values[field]}
              disabled={parentMissing}
              onChange={(e) => {
                const patch: Partial<AddressValues> = { [field]: e.target.value };
                for (const below of FIELDS.slice(i + 1)) patch[below.field] = "";
                onChange(patch);
              }}
              onBlur={() => onBlur(field)}
              className={cn(className(field), "bg-white disabled:bg-slate-100 disabled:cursor-not-allowed")}
            >
              <option value="">{t("select")}</option>
              {legacy && <option value={legacy}>{legacy}</option>}
              {options[field].map((o) => (
                <option key={o.code} value={o.nameKh}>{label(o)}</option>
              ))}
            </select>
            {error(field) && <p className="mt-1 text-xs text-red-600">{error(field)}</p>}
          </div>
        );
      })}
    </>
  );
}
