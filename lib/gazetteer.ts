// Cambodian administrative divisions (province → district → commune →
// village), copied from the MOC business-registration API's seed data
// (business-registration-old-api/src/models/seeding/*.seeding.ts, active rows
// only). Codes are hierarchical: a district code starts with its province
// code (2 digits), a commune with its district (4), a village with its
// commune (6). Server-only — the ~800KB JSON is served in slices through
// /api/address rather than bundled into the client.
import data from "@/lib/data/cambodia-gazetteer.json";

export type AddressLevel = "provinces" | "districts" | "communes" | "villages";
export type AddressOption = { code: string; nameKh: string; nameEn: string };

type Row = [code: string, nameKh: string, nameEn: string];

const LEVELS: Record<AddressLevel, { rows: Row[]; parentLength: number }> = {
  provinces: { rows: data.provinces as Row[], parentLength: 0 },
  districts: { rows: data.districts as Row[], parentLength: 2 },
  communes: { rows: data.communes as Row[], parentLength: 4 },
  villages: { rows: data.villages as Row[], parentLength: 6 },
};

export function isAddressLevel(value: string): value is AddressLevel {
  return value in LEVELS;
}

export function listAddressOptions(level: AddressLevel, parentCode = ""): AddressOption[] {
  const { rows, parentLength } = LEVELS[level];
  if (parentLength > 0 && parentCode.length !== parentLength) return [];
  return rows
    .filter(([code]) => code.slice(0, parentLength) === parentCode)
    // A handful of villages in the source data have no Khmer name.
    .map(([code, nameKh, nameEn]) => ({ code, nameKh: nameKh || nameEn, nameEn: nameEn || nameKh }));
}
