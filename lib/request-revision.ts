// Mirrors REVISION_FIELDS in secured-nominee-shareholder-api's
// src/revisions/revision-snapshot.ts: company fields stay flat scalars,
// while Section 2 (nominee shareholders / beneficial owners / agreements) is
// repeatable and snapshotted as a single JSON-stringified array per group —
// a change anywhere in the array shows as one changed field rather than a
// per-scalar diff.
export const REVISION_FIELDS = [
  "companyNameKh", "companyNameEn", "registrationNo", "registrationDate",
  "companyProvince", "companyDistrict", "companyCommune", "companyVillage", "companyStreet", "companyHouse",
  "companyPhone", "companyOfficePhone", "companyEmail",
  "nomineeShareholders", "beneficialOwners", "agreements",
] as const;

export type RevisionFieldName = (typeof REVISION_FIELDS)[number];
export type RequestSnapshot = Record<RevisionFieldName, string | boolean | string[] | null>;

const ARRAY_FIELDS = new Set<RevisionFieldName>(["nomineeShareholders", "beneficialOwners", "agreements"]);

export type FieldDiff = { field: RevisionFieldName; previous: string | boolean | string[] | null; next: string | boolean | string[] | null };

export function diffSnapshots(previous: RequestSnapshot, next: RequestSnapshot): FieldDiff[] {
  const diffs: FieldDiff[] = [];
  for (const field of REVISION_FIELDS) {
    const a = previous[field];
    const b = next[field];
    if (a !== b) diffs.push({ field, previous: a, next: b });
  }
  return diffs;
}

// The nomineeShareholders/beneficialOwners/agreements fields hold a
// JSON-stringified array of entries rather than a single scalar value, so
// the diff UI renders them as a list summary instead of a plain before/after
// string (mirrors the old isDocNameField special-casing for doc arrays).
export function isArrayField(field: RevisionFieldName): boolean {
  return ARRAY_FIELDS.has(field);
}
