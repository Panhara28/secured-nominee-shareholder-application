import type { BeneficiaryRequest } from "@/lib/generated/prisma";

export const REVISION_FIELDS = [
  "companyNameKh", "companyNameEn", "registrationNo", "registrationDate",
  "companyProvince", "companyDistrict", "companyCommune", "companyVillage", "companyStreet", "companyHouse",
  "companyPhone", "companyOfficePhone", "companyEmail",
  "shLastNameKh", "shFirstNameKh", "shLastNameEn", "shFirstNameEn", "shDob", "shBecameDate", "shNationality", "shGender",
  "shIdCard", "shIdIssuedDate", "shIdExpiredDate", "shEmail", "shPhone", "shPhotoName", "shIdDocNames",
  "ownerLastNameKh", "ownerFirstNameKh", "ownerLastNameEn", "ownerFirstNameEn", "ownerDob", "ownerBecameDate", "ownerNationality", "ownerGender",
  "ownerIdCard", "ownerIdIssuedDate", "ownerIdExpiredDate", "ownerEmail", "ownerPhone", "ownerPhotoName", "ownerIdDocNames",
  "shareAmount",
  "shareholderContractDocNames", "otherDocNames", "consentAgreed",
] as const;

export type RevisionFieldName = (typeof REVISION_FIELDS)[number];
export type RequestSnapshot = Record<RevisionFieldName, string | boolean | string[] | null>;

const DATE_FIELDS = new Set<RevisionFieldName>([
  "registrationDate", "shDob", "shBecameDate", "shIdIssuedDate", "shIdExpiredDate",
  "ownerDob", "ownerBecameDate", "ownerIdIssuedDate", "ownerIdExpiredDate",
]);

const DOC_NAME_FIELDS = new Set<RevisionFieldName>([
  "shIdDocNames", "ownerIdDocNames", "shareholderContractDocNames", "otherDocNames",
]);

export function toRequestSnapshot(record: BeneficiaryRequest): RequestSnapshot {
  const out = {} as RequestSnapshot;
  for (const field of REVISION_FIELDS) {
    const value = record[field] as unknown;
    if (value === null || value === undefined) {
      out[field] = null;
    } else if (DATE_FIELDS.has(field)) {
      out[field] = (value as Date).toISOString().slice(0, 10);
    } else if (DOC_NAME_FIELDS.has(field)) {
      out[field] = JSON.parse(value as string) as string[];
    } else {
      out[field] = value as string | boolean;
    }
  }
  return out;
}

export type FieldDiff = { field: RevisionFieldName; previous: string | boolean | string[] | null; next: string | boolean | string[] | null };

export function diffSnapshots(previous: RequestSnapshot, next: RequestSnapshot): FieldDiff[] {
  const diffs: FieldDiff[] = [];
  for (const field of REVISION_FIELDS) {
    const a = previous[field];
    const b = next[field];
    const changed = DOC_NAME_FIELDS.has(field)
      ? JSON.stringify(a) !== JSON.stringify(b)
      : a !== b;
    if (changed) diffs.push({ field, previous: a, next: b });
  }
  return diffs;
}

export function isDocNameField(field: RevisionFieldName): boolean {
  return DOC_NAME_FIELDS.has(field);
}
