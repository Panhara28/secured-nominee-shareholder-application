"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft, Check, Eye, FileText, Loader2, Paperclip, Plus, RotateCcw, Save, Send, Sparkles, Trash2, Upload, X, XCircle } from "lucide-react";
import { toast } from "sonner";
import { cn, splitReasonItems } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SearchableSelect from "@/components/ui/SearchableSelect";
import { COUNTRIES } from "@/lib/countries";
import AddressCascadeSelects, { type AddressField } from "@/components/portal/beneficiary/AddressCascadeSelects";
import { UPDATE_TYPE_BY_STEP } from "@/lib/update-sections";

function StepTabs({
  steps,
  activeStep,
  onChange,
  trailing,
}: {
  steps: { number: number; title: string; disabled: boolean; flagged?: boolean; onRemove?: () => void; removeLabel?: string }[];
  activeStep: number;
  onChange: (step: number) => void;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-center overflow-x-auto border-b border-slate-200">
      {steps.map((s) => {
        const isActive = s.number === activeStep;
        return (
          <div
            key={s.number}
            className={cn(
              "relative flex items-center gap-1.5 whitespace-nowrap border-b-2 -mb-px transition-colors pr-2",
              s.disabled
                ? "border-transparent text-slate-300"
                : isActive
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            )}
          >
            <button
              type="button"
              onClick={() => !s.disabled && onChange(s.number)}
              disabled={s.disabled}
              className={cn(
                "flex items-center gap-2 py-3 pl-5 text-sm font-medium",
                s.disabled && "cursor-not-allowed"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold",
                  s.disabled ? "bg-slate-100 text-slate-300" : isActive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                )}
              >
                {s.number}
              </span>
              {s.title}
              {s.flagged && (
                <span className="h-2 w-2 rounded-full bg-orange-500 flex-shrink-0" />
              )}
            </button>
            {s.onRemove && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); s.onRemove!(); }}
                title={s.removeLabel}
                className="text-slate-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        );
      })}
      {trailing && <div className="flex-shrink-0 px-3">{trailing}</div>}
    </div>
  );
}

function StepPanel({
  stepNumber,
  activeStep,
  children,
}: {
  stepNumber: number;
  activeStep: number;
  children: React.ReactNode;
}) {
  if (stepNumber !== activeStep) return null;
  return <div className="bg-white px-5 py-5">{children}</div>;
}

// Best-effort guess at which step(s) a RETURNED request's free-text
// rejection reason relates to. Section 2 (nominee/owner/agreement) is now
// repeatable, so per-field orange highlighting only applies to the flat
// Company step below — for Section 2 we just point at the right group via
// the returned banner instead of highlighting a specific array entry.
function guessReturnSteps(reason: string): number[] {
  const text = reason.toLowerCase();
  const steps = new Set<number>();
  if (
    text.includes("registration") ||
    text.includes("business registry") ||
    text.includes("company email") ||
    text.includes("company phone") ||
    text.includes("company address") ||
    text.includes("addresses could not be cross-verified")
  ) {
    steps.add(1);
  }
  const mentionsShareholder = text.includes("shareholder") || text.includes("nominee");
  const mentionsOwner = text.includes("beneficial owner") || text.includes("beneficiary owner") || text.includes(" owner");
  if (mentionsShareholder) steps.add(2);
  if (mentionsOwner) steps.add(3);
  const mentionsPersonDetail =
    text.includes("id card") ||
    text.includes("passport") ||
    text.includes("id number") ||
    text.includes("id issue") ||
    text.includes("issuing province") ||
    text.includes("date of birth") ||
    text.includes("dob") ||
    (!text.includes("company") && (text.includes("email") || text.includes("phone")));
  if (mentionsPersonDetail && !mentionsShareholder && !mentionsOwner) {
    steps.add(2);
    steps.add(3);
  }
  if (steps.size === 0) steps.add(1);
  return [...steps].sort((a, b) => a - b);
}

function guessCompanyFlaggedFields(reason: string): string[] {
  const text = reason.toLowerCase();
  const fields: string[] = [];
  if (text.includes("registration") || text.includes("business registry")) fields.push("registrationNo");
  if (text.includes("company email")) fields.push("companyEmail");
  if (text.includes("company phone")) fields.push("companyPhone");
  if (text.includes("company address") || text.includes("addresses could not be cross-verified")) {
    fields.push("companyProvince", "companyDistrict", "companyCommune", "companyVillage", "companyStreet", "companyHouse");
  }
  return fields;
}

// Item 30/31 validation helpers, shared across the company step and every
// repeatable Section 2 entry.
const KHMER_NAME_REGEX = /^[ក-៿᧠-᧿\s]+$/;
const LATIN_NAME_REGEX = /^[A-Za-z\s.'-]+$/;
const PHONE_REGEX = /^[0-9\s]{8,12}$/;

function isValidKhmerName(v: string): boolean {
  return !v || KHMER_NAME_REGEX.test(v);
}
function isValidLatinName(v: string): boolean {
  return !v || LATIN_NAME_REGEX.test(v);
}
function isValidPhone(v: string): boolean {
  return !v || PHONE_REGEX.test(v);
}
function isFutureDate(v: string): boolean {
  if (!v) return false;
  return new Date(v) > new Date();
}
// Both the nominee shareholder and the beneficial owner must be adults —
// the date picker itself is capped at this date (via `max`) so a future
// date can't be picked, and this re-checks on blur/paste for the same rule.
function maxDobFor18(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 18);
  return d.toISOString().slice(0, 10);
}
function isUnder18(v: string): boolean {
  if (!v) return false;
  return v > maxDobFor18();
}
function isValidBecameDate(became: string, dob: string): boolean {
  if (!became) return true;
  if (isFutureDate(became)) return false;
  if (dob && became < dob) return false;
  return true;
}
function isValidIdDateRange(issued: string, expired: string): boolean {
  if (!issued || !expired) return true;
  return issued < expired;
}

// Real province → district → commune → village chains from the gazetteer, so
// demo-filled addresses line up with the cascading dropdowns.
const DEMO_ADDRESSES = [
  { companyProvince: "ភ្នំពេញ", companyDistrict: "ចំការមន", companyCommune: "ទន្លេបាសាក់", companyVillage: "ភូមិ ១" },
  { companyProvince: "សៀមរាប", companyDistrict: "អង្គរជុំ", companyCommune: "ចារឈូក", companyVillage: "ប្រាសាទ" },
  { companyProvince: "ព្រះសីហនុ", companyDistrict: "ព្រះសីហនុ", companyCommune: "លេខ១", companyVillage: "ភូមិ១" },
];

const ADDRESS_FORM_KEYS: Record<AddressField, "companyProvince" | "companyDistrict" | "companyCommune" | "companyVillage"> = {
  province: "companyProvince", district: "companyDistrict", commune: "companyCommune", village: "companyVillage",
};

type CompanyData = {
  companyNameKh: string; companyNameEn: string; registrationNo: string; registrationDate: string;
  companyProvince: string; companyDistrict: string; companyCommune: string; companyVillage: string;
  companyStreet: string; companyHouse: string; companyPhone: string; companyOfficePhone: string; companyEmail: string;
};

const EMPTY_COMPANY: CompanyData = {
  companyNameKh: "", companyNameEn: "", registrationNo: "", registrationDate: "",
  companyProvince: "", companyDistrict: "", companyCommune: "", companyVillage: "",
  companyStreet: "", companyHouse: "", companyPhone: "", companyOfficePhone: "", companyEmail: "",
};

const COMPANY_REQUIRED: (keyof CompanyData)[] = [
  "companyNameEn", "registrationNo", "registrationDate",
  "companyProvince", "companyDistrict", "companyCommune", "companyVillage", "companyStreet", "companyHouse",
  "companyPhone", "companyEmail",
];

// `file` is the raw picked File, kept in memory only, until it's uploaded to
// the real Document/Media backend once a requestId (and, for Section 2, the
// entity's own id) exists. `url` is either a local preview blob (while
// `file` is still pending) or a real `/api/portal/documents/:id/download`
// link once `documentId` is set.
type UploadedDoc = { name: string; url?: string; file?: File; documentId?: number };

// Matches the API's DocumentCategory enum (prisma/schema.prisma).
type DocCategory = "SH_PHOTO" | "SH_ID_DOC" | "OWNER_PHOTO" | "OWNER_ID_DOC" | "SHAREHOLDER_CONTRACT" | "OTHER";

type UploadEntity = { nomineeShareholderId?: number; beneficialOwnerId?: number; agreementId?: number };

async function uploadDocument(
  requestId: string,
  category: DocCategory,
  file: File,
  entity?: UploadEntity,
): Promise<{ documentId: number; filename: string }> {
  const formData = new FormData();
  formData.append("requestId", requestId);
  formData.append("category", category);
  formData.append("file", file);
  if (entity?.nomineeShareholderId) formData.append("nomineeShareholderId", String(entity.nomineeShareholderId));
  if (entity?.beneficialOwnerId) formData.append("beneficialOwnerId", String(entity.beneficialOwnerId));
  if (entity?.agreementId) formData.append("agreementId", String(entity.agreementId));
  const res = await fetch("/api/portal/documents/upload", { method: "POST", body: formData });
  if (!res.ok) throw new Error("Document upload failed.");
  const data = await res.json();
  return { documentId: data.document.id as number, filename: data.document.media.filename as string };
}

function documentDownloadUrl(documentId: number): string {
  return `/api/portal/documents/${documentId}/download`;
}

// One repeatable nominee shareholder / beneficial owner entry (Section 2).
// `id` is the real server-side row id once known (undefined for a
// not-yet-saved new entry); `localKey` is a stable React key independent of
// that, since a brand-new entry has no id yet.
type PersonEntry = {
  localKey: string;
  id?: number;
  lastNameKh: string; firstNameKh: string; lastNameEn: string; firstNameEn: string;
  dob: string; becameDate: string; nationality: string; gender: string;
  idType: "ID" | "PASSPORT"; idCard: string; idIssuedDate: string; idExpiredDate: string;
  email: string; phone: string;
  photoDocId: number | null; photo: string | null; photoFile: File | null; photoName: string | null;
  idDocs: UploadedDoc[];
};
type OwnerEntry = PersonEntry & { shareAmount: string };
type AgreementEntryUI = {
  localKey: string;
  id?: number;
  agreementDate: string;
  consentAgreed: boolean;
  contractDocs: UploadedDoc[];
  supportingDocs: UploadedDoc[];
};

let localKeySeq = 0;
function nextLocalKey(prefix: string): string {
  localKeySeq += 1;
  return `${prefix}-${localKeySeq}-${Math.random().toString(36).slice(2, 8)}`;
}

function emptyPerson(): PersonEntry {
  return {
    localKey: nextLocalKey("nominee"),
    lastNameKh: "", firstNameKh: "", lastNameEn: "", firstNameEn: "",
    dob: "", becameDate: "", nationality: "", gender: "",
    idType: "ID", idCard: "", idIssuedDate: "", idExpiredDate: "",
    email: "", phone: "",
    photoDocId: null, photo: null, photoFile: null, photoName: null,
    idDocs: [],
  };
}
function emptyOwner(): OwnerEntry {
  return { ...emptyPerson(), localKey: nextLocalKey("owner"), shareAmount: "" };
}
function emptyAgreement(): AgreementEntryUI {
  return { localKey: nextLocalKey("agreement"), agreementDate: "", consentAgreed: false, contractDocs: [], supportingDocs: [] };
}

const NOMINEE_REQUIRED: (keyof PersonEntry)[] = ["lastNameEn", "firstNameEn", "dob", "becameDate", "nationality", "gender"];
const OWNER_REQUIRED: (keyof OwnerEntry)[] = [...NOMINEE_REQUIRED, "shareAmount"];

function isPersonEntryValid<T extends PersonEntry>(e: T, required: (keyof T)[], requireIdDoc: boolean): boolean {
  return (
    required.every((f) => !!e[f]) &&
    isValidKhmerName(e.lastNameKh) &&
    isValidKhmerName(e.firstNameKh) &&
    isValidLatinName(e.lastNameEn) &&
    isValidLatinName(e.firstNameEn) &&
    !isFutureDate(e.dob) &&
    !isUnder18(e.dob) &&
    isValidBecameDate(e.becameDate, e.dob) &&
    isValidIdDateRange(e.idIssuedDate, e.idExpiredDate) &&
    isValidPhone(e.phone) &&
    (!requireIdDoc || e.idDocs.length > 0)
  );
}
function isAgreementEntryValid(a: AgreementEntryUI, requireDocs: boolean): boolean {
  return !!a.agreementDate && a.consentAgreed === true && (!requireDocs || a.contractDocs.length > 0);
}

// Item 42: in-progress form state persisted to sessionStorage so a language
// switch (which remounts this component) doesn't lose what the user typed.
// Raw `File`/photo-file objects aren't serializable, so persisted entries
// never carry one.
type PersistedDoc = Omit<UploadedDoc, "file">;
type PersistedPerson = Omit<PersonEntry, "photoFile" | "idDocs"> & { idDocs: PersistedDoc[] };
type PersistedOwner = Omit<OwnerEntry, "photoFile" | "idDocs"> & { idDocs: PersistedDoc[] };
type PersistedAgreement = Omit<AgreementEntryUI, "contractDocs" | "supportingDocs"> & {
  contractDocs: PersistedDoc[];
  supportingDocs: PersistedDoc[];
};
type PersistedDraft = {
  company: CompanyData;
  nominees: PersistedPerson[];
  owners: PersistedOwner[];
  agreements: PersistedAgreement[];
  activeStep: number;
};

function readPersistedDraft(storageKey: string): PersistedDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as PersistedDraft) : null;
  } catch {
    return null;
  }
}

const FAKE_FIRST_KH = ["សុខា", "ដារា", "សុភា", "វិចិត្រ", "ចន្ថា"];
const FAKE_LAST_KH = ["ចាន់", "សាន", "គឹម", "លី", "អ៊ូច"];
const FAKE_FIRST_EN = ["Sokha", "Dara", "Sophea", "Vichet", "Chantha"];
const FAKE_LAST_EN = ["Chan", "San", "Kim", "Ly", "Ouch"];
const NATIONALITIES = ["KH", "CN", "TH", "VN"];
const GENDERS = ["M", "F"];

const FAKE_COMPANIES: { en: string; kh: string }[] = [
  { en: "Mekong Trading Co., Ltd.", kh: "ក្រុមហ៊ុន ពាណិជ្ជកម្មមេគង្គ ម.ក" },
  { en: "Angkor Star Enterprise Co., Ltd.", kh: "ក្រុមហ៊ុន សហគ្រាសផ្កាយអង្គរ ម.ក" },
  { en: "Golden Delta Holdings Co., Ltd.", kh: "ក្រុមហ៊ុន ហូលឌីងសុវណ្ណដែលតា ម.ក" },
  { en: "Chenla Import Export Co., Ltd.", kh: "ក្រុមហ៊ុន នាំចេញនាំចូលចេនឡា ម.ក" },
  { en: "Sokha Business Group Co., Ltd.", kh: "ក្រុមហ៊ុន សុខាប៊ីស្សនេសក្រុប ម.ក" },
  { en: "Bayon Construction Materials Co., Ltd.", kh: "ក្រុមហ៊ុន សំណង់បាយ័ន ម.ក" },
  { en: "Battambang Rice Milling Co., Ltd.", kh: "ក្រុមហ៊ុន កិនស្រូវបាត់ដំបង ម.ក" },
  { en: "Kampong Cham Rubber Plantation Co., Ltd.", kh: "ក្រុមហ៊ុន ដាំកៅស៊ូកំពង់ចាម ម.ក" },
];

function randomOf<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomDigits(len: number): string {
  let s = "";
  for (let i = 0; i < len; i++) s += Math.floor(Math.random() * 10);
  return s;
}
function randomDateBetween(startYear: number, endYear: number): string {
  const year = startYear + Math.floor(Math.random() * (endYear - startYear + 1));
  const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, "0");
  const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Auto-fill needs real files (not just placeholder names) so that submitting
// the fake-filled form actually uploads documents — the API rejects submit
// without real SH_ID_DOC/OWNER_ID_DOC/SHAREHOLDER_CONTRACT uploads, and its
// upload validator sniffs the real "%PDF-" signature, so a plain text blob
// wouldn't pass either.
function makeFakePdfFile(name: string): File {
  const content = "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 200 200]>>endobj\ntrailer<</Size 4/Root 1 0 R>>\n%%EOF";
  return new File([content], name, { type: "application/pdf" });
}

const FAKE_PROFILE_PHOTO = "/profile-manager.jpg";

// The photo needs a real file as well: with only the preview URL it shows in
// the form but is never uploaded, so the saved request has no photo.
async function loadFakePhotoFile(): Promise<File | null> {
  try {
    const res = await fetch(FAKE_PROFILE_PHOTO);
    if (!res.ok) return null;
    return new File([await res.blob()], "profile-manager.jpg", { type: "image/jpeg" });
  } catch {
    return null;
  }
}
const FAKE_ID_DOC_NAME = "sample_passport.pdf";
const FAKE_CONTRACT_DOC_NAME = "Nominee shareholder agreement KHM.pdf";
const FAKE_OTHER_DOC_NAME = "This is  other documents.pdf";

function fakePersonFields() {
  return {
    lastNameKh: randomOf(FAKE_LAST_KH), firstNameKh: randomOf(FAKE_FIRST_KH),
    lastNameEn: randomOf(FAKE_LAST_EN), firstNameEn: randomOf(FAKE_FIRST_EN),
    dob: randomDateBetween(1970, 2000), becameDate: randomDateBetween(2018, 2026),
    nationality: randomOf(NATIONALITIES), gender: randomOf(GENDERS),
    idCard: randomDigits(9), idIssuedDate: randomDateBetween(2018, 2023), idExpiredDate: randomDateBetween(2026, 2033),
    email: `${randomOf(FAKE_FIRST_EN).toLowerCase()}.${randomOf(FAKE_LAST_EN).toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`,
    phone: `${Math.floor(Math.random() * 90) + 10} ${randomDigits(3)} ${randomDigits(3)}`,
  };
}

function generateFakeCompany(): CompanyData {
  const company = randomOf(FAKE_COMPANIES);
  const emailSlug = company.en.toLowerCase().replace(/[^a-z0-9]/g, "");
  return {
    companyNameKh: company.kh,
    companyNameEn: company.en,
    registrationNo: `CO-${randomDigits(5)}`,
    registrationDate: randomDateBetween(2015, 2024),
    ...randomOf(DEMO_ADDRESSES),
    companyStreet: `ផ្លូវលេខ ${randomDigits(2)}`,
    companyHouse: `#${randomDigits(3)}`,
    companyPhone: `${Math.floor(Math.random() * 90) + 10} ${randomDigits(3)} ${randomDigits(3)}`,
    companyOfficePhone: `${Math.floor(Math.random() * 90) + 10} ${randomDigits(3)} ${randomDigits(3)}`,
    companyEmail: `${emailSlug}@example.com`,
  };
}

function PersonFields({
  t,
  idPrefix,
  value,
  onChange,
  touched,
  setTouched,
  requiredFields,
  becameDateLabelKey,
  extraContent,
}: {
  t: ReturnType<typeof useTranslations>;
  idPrefix: string;
  value: PersonEntry;
  onChange: (patch: Partial<PersonEntry>) => void;
  touched: Record<string, boolean>;
  setTouched: (patch: Record<string, boolean>) => void;
  requiredFields: readonly string[];
  becameDateLabelKey: "shBecameDate" | "becameDate";
  extraContent?: React.ReactNode;
}) {
  const tk = (f: string) => `${idPrefix}.${f}`;
  const fieldError = (f: keyof PersonEntry): string => {
    if (!touched[tk(f as string)]) return "";
    const val = (value[f] as string) ?? "";
    if (!val) return requiredFields.includes(f) ? t("required") : "";
    if ((f === "lastNameKh" || f === "firstNameKh") && !isValidKhmerName(val)) return t("invalidNameKh");
    if ((f === "lastNameEn" || f === "firstNameEn") && !isValidLatinName(val)) return t("invalidNameEn");
    if (f === "dob" && isFutureDate(val)) return t("invalidDobFuture");
    if (f === "dob" && isUnder18(val)) return t("invalidDobUnder18");
    if (f === "becameDate" && !isValidBecameDate(val, value.dob)) return t("invalidBecameDate");
    if (f === "idExpiredDate" && !isValidIdDateRange(value.idIssuedDate, val)) return t("invalidIdDates");
    if (f === "phone" && !isValidPhone(val)) return t("invalidPhone");
    return "";
  };
  const inputCls = (f: keyof PersonEntry) =>
    cn(
      "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
      fieldError(f) ? "border-red-400" : "border-slate-300",
    );

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-6">
        {/* Names */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(["lastNameKh", "firstNameKh", "lastNameEn", "firstNameEn"] as const).map((f) => {
            const isRequired = requiredFields.includes(f);
            return (
              <div key={f}>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t(f)}
                  {isRequired && <span className="text-red-500 ml-0.5">*</span>}
                </label>
                <input
                  type="text"
                  value={value[f] ?? ""}
                  onChange={(e) => onChange({ [f]: e.target.value })}
                  onBlur={() => setTouched({ [tk(f)]: true })}
                  className={inputCls(f)}
                />
                {fieldError(f) && <p className="mt-1 text-xs text-red-600">{fieldError(f)}</p>}
              </div>
            );
          })}
        </div>

        {/* Photo — moved to the right side (item 10) */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className="h-44 w-36 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-300 overflow-hidden">
            {value.photo ? (
              <img src={value.photo} alt="person" className="h-full w-full object-cover" />
            ) : (
              <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            )}
          </div>
          <label className="w-full inline-flex items-center justify-center gap-1.5 cursor-pointer rounded-lg bg-blue-500 py-1.5 text-xs font-medium text-white hover:bg-blue-600 transition-colors">
            <Upload className="h-3.5 w-3.5" />
            {t("uploadPhoto")}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onChange({ photo: URL.createObjectURL(f), photoName: f.name, photoFile: f });
              }}
            />
          </label>
        </div>
      </div>

      {/* DOB / Nationality / Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("dob")} <span className="text-red-500">*</span></label>
          <input type="date" max={maxDobFor18()} value={value.dob} onChange={(e) => onChange({ dob: e.target.value })} onBlur={() => setTouched({ [tk("dob")]: true })} className={inputCls("dob")} />
          {fieldError("dob") && <p className="mt-1 text-xs text-red-600">{fieldError("dob")}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("nationality")} <span className="text-red-500">*</span></label>
          <SearchableSelect
            value={value.nationality}
            onChange={(code) => onChange({ nationality: code })}
            onBlur={() => setTouched({ [tk("nationality")]: true })}
            options={COUNTRIES}
            placeholder={t("select")}
            className={cn(inputCls("nationality"), "bg-white")}
          />
          {fieldError("nationality") && <p className="mt-1 text-xs text-red-600">{fieldError("nationality")}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("gender")} <span className="text-red-500">*</span></label>
          <select value={value.gender} onChange={(e) => onChange({ gender: e.target.value })} onBlur={() => setTouched({ [tk("gender")]: true })} className={cn(inputCls("gender"), "bg-white")}>
            <option value="">{t("select")}</option>
            <option value="M">{t("genderMale")}</option>
            <option value="F">{t("genderFemale")}</option>
          </select>
          {fieldError("gender") && <p className="mt-1 text-xs text-red-600">{fieldError("gender")}</p>}
        </div>
      </div>

      {/* ID Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <div className="mb-1.5 flex items-center gap-4">
            <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
              <input type="radio" name={tk("idType")} value="ID" checked={value.idType === "ID"} onChange={() => onChange({ idType: "ID" })} className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500" />
              {t("idTypeId")}
            </label>
            <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
              <input type="radio" name={tk("idType")} value="PASSPORT" checked={value.idType === "PASSPORT"} onChange={() => onChange({ idType: "PASSPORT" })} className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500" />
              {t("idTypePassport")}
            </label>
          </div>
          <input
            type="text"
            value={value.idCard}
            onChange={(e) => onChange({ idCard: e.target.value })}
            placeholder={value.idType === "PASSPORT" ? t("passportPlaceholder") : t("idCardPlaceholder")}
            className={inputCls("idCard")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("issueDate")}</label>
          <input type="date" value={value.idIssuedDate} onChange={(e) => onChange({ idIssuedDate: e.target.value })} onBlur={() => setTouched({ [tk("idIssuedDate")]: true })} className={inputCls("idIssuedDate")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("expiryDate")}</label>
          <input type="date" value={value.idExpiredDate} onChange={(e) => onChange({ idExpiredDate: e.target.value })} onBlur={() => setTouched({ [tk("idExpiredDate")]: true })} className={inputCls("idExpiredDate")} />
          {fieldError("idExpiredDate") && <p className="mt-1 text-xs text-red-600">{fieldError("idExpiredDate")}</p>}
        </div>
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("email")}</label>
          <input type="email" value={value.email} onChange={(e) => onChange({ email: e.target.value })} placeholder="email@example.com" className={inputCls("email")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("phone")}</label>
          <div className={cn("flex items-center gap-2 rounded-lg border px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-blue-500", fieldError("phone") ? "border-red-400" : "border-slate-300")}>
            <span className="text-base leading-none">🇰🇭</span>
            <span className="text-slate-400 text-xs">+855</span>
            <input type="tel" value={value.phone} onChange={(e) => onChange({ phone: e.target.value })} onBlur={() => setTouched({ [tk("phone")]: true })} placeholder="23 756 789" className="flex-1 outline-none text-sm bg-transparent" />
          </div>
          {fieldError("phone") && <p className="mt-1 text-xs text-red-600">{fieldError("phone")}</p>}
        </div>
      </div>

      {/* Date of Becoming — moved directly above the ID document upload (item 11) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t(becameDateLabelKey)} <span className="text-red-500">*</span>
          </label>
          <input type="date" value={value.becameDate} onChange={(e) => onChange({ becameDate: e.target.value })} onBlur={() => setTouched({ [tk("becameDate")]: true })} className={inputCls("becameDate")} />
          {fieldError("becameDate") && <p className="mt-1 text-xs text-red-600">{fieldError("becameDate")}</p>}
        </div>
      </div>

      {extraContent}

      {/* ID Document upload */}
      <div>
        <p className="text-sm font-semibold text-slate-700 mb-2">{t("idDocLabel")}</p>
        <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-slate-700">{t("idDocLabel")} <span className="text-red-500">*</span></p>
              <p className="text-xs text-slate-400 mt-0.5">{t("idDocHint")}</p>
              {value.idDocs.length > 0 ? (
                <ul className="mt-1 space-y-0.5">
                  {value.idDocs.map((d, i) => (
                    <li key={i} className="flex items-center gap-1 text-xs text-slate-500">
                      {d.url ? (
                        <a href={d.url} target="_blank" rel="noreferrer" className="truncate text-blue-500 hover:text-blue-700 hover:underline" title={t("preview")}>
                          {d.name}
                        </a>
                      ) : (
                        <span className="truncate">{d.name}</span>
                      )}
                      {d.url && (
                        <a href={d.url} target="_blank" rel="noreferrer" className="ml-1 text-blue-500 hover:text-blue-700" title={t("preview")}>
                          <Eye className="h-3 w-3" />
                        </a>
                      )}
                      <button type="button" onClick={() => onChange({ idDocs: value.idDocs.filter((_, idx) => idx !== i) })} className="ml-1 text-red-400 hover:text-red-600"><X className="h-3 w-3" /></button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-xs text-red-600">{t("requiredDoc")}</p>
              )}
            </div>
          </div>
          <label className="inline-flex items-center gap-1.5 cursor-pointer flex-shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Paperclip className="h-3.5 w-3.5" />
            {t("attach")}
            <input type="file" accept=".pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) onChange({ idDocs: [...value.idDocs, { name: f.name, url: URL.createObjectURL(f), file: f }] }); e.target.value = ""; }} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}

function AgreementFields({
  t,
  idPrefix,
  value,
  onChange,
  touched,
  setTouched,
}: {
  t: ReturnType<typeof useTranslations>;
  idPrefix: string;
  value: AgreementEntryUI;
  onChange: (patch: Partial<AgreementEntryUI>) => void;
  touched: Record<string, boolean>;
  setTouched: (patch: Record<string, boolean>) => void;
}) {
  const tk = (f: string) => `${idPrefix}.${f}`;
  const dateError = !value.agreementDate && touched[tk("agreementDate")] ? t("required") : "";
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-sm text-slate-700">{t("shareholderContractLabel")} <span className="text-red-500">*</span></p>
            <p className="text-xs text-slate-400 mt-0.5">{t("supportingDocHint")}</p>
            {value.contractDocs.length > 0 ? (
              <ul className="mt-1 space-y-0.5">
                {value.contractDocs.map((d, i) => (
                  <li key={i} className="flex items-center gap-1 text-xs text-slate-500">
                    {d.url ? (
                      <a href={d.url} target="_blank" rel="noreferrer" className="truncate text-blue-500 hover:text-blue-700 hover:underline" title={t("preview")}>{d.name}</a>
                    ) : (
                      <span className="truncate">{d.name}</span>
                    )}
                    {d.url && <a href={d.url} target="_blank" rel="noreferrer" className="ml-1 text-blue-500 hover:text-blue-700" title={t("preview")}><Eye className="h-3 w-3" /></a>}
                    <button type="button" onClick={() => onChange({ contractDocs: value.contractDocs.filter((_, idx) => idx !== i) })} className="ml-1 text-red-400 hover:text-red-600"><X className="h-3 w-3" /></button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-xs text-red-600">{t("requiredDoc")}</p>
            )}
          </div>
        </div>
        <label className="inline-flex items-center gap-1.5 cursor-pointer flex-shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Paperclip className="h-3.5 w-3.5" />
          {t("attach")}
          <input type="file" accept=".pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) onChange({ contractDocs: [...value.contractDocs, { name: f.name, url: URL.createObjectURL(f), file: f }] }); e.target.value = ""; }} className="hidden" />
        </label>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-sm text-slate-700">{t("otherDocsLabel")}</p>
            <p className="text-xs text-slate-400 mt-0.5">{t("supportingDocHint")}</p>
            {value.supportingDocs.length > 0 && (
              <ul className="mt-1 space-y-0.5">
                {value.supportingDocs.map((d, i) => (
                  <li key={i} className="flex items-center gap-1 text-xs text-slate-500">
                    {d.url ? (
                      <a href={d.url} target="_blank" rel="noreferrer" className="truncate text-blue-500 hover:text-blue-700 hover:underline" title={t("preview")}>{d.name}</a>
                    ) : (
                      <span className="truncate">{d.name}</span>
                    )}
                    {d.url && <a href={d.url} target="_blank" rel="noreferrer" className="ml-1 text-blue-500 hover:text-blue-700" title={t("preview")}><Eye className="h-3 w-3" /></a>}
                    <button type="button" onClick={() => onChange({ supportingDocs: value.supportingDocs.filter((_, idx) => idx !== i) })} className="ml-1 text-red-400 hover:text-red-600"><X className="h-3 w-3" /></button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <label className="inline-flex items-center gap-1.5 cursor-pointer flex-shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Paperclip className="h-3.5 w-3.5" />
          {t("attach")}
          <input type="file" accept=".pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) onChange({ supportingDocs: [...value.supportingDocs, { name: f.name, url: URL.createObjectURL(f), file: f }] }); e.target.value = ""; }} className="hidden" />
        </label>
      </div>

      <div>
        <div className="inline-flex flex-col w-full sm:w-auto">
          <label className="block text-sm font-medium text-slate-700 mb-1 whitespace-nowrap">{t("agreementDate")} <span className="text-red-500">*</span></label>
          <input type="date" value={value.agreementDate} onChange={(e) => onChange({ agreementDate: e.target.value })} onBlur={() => setTouched({ [tk("agreementDate")]: true })} className={cn("w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-full", dateError ? "border-red-400" : "border-slate-300")} />
          {dateError && <p className="mt-1 text-xs text-red-600">{dateError}</p>}
        </div>
      </div>

      <div className="pt-2 border-t border-slate-200">
        <label className="flex items-start gap-3 cursor-pointer pt-4">
          <input
            type="checkbox"
            checked={value.consentAgreed}
            onChange={(e) => { onChange({ consentAgreed: e.target.checked }); setTouched({ [tk("consentAgreed")]: true }); }}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 accent-blue-600"
          />
          <span className="text-sm text-slate-700">{t("consentText")}</span>
        </label>
        {touched[tk("consentAgreed")] && !value.consentAgreed && (
          <p className="mt-2 text-xs text-red-600">{t("consentRequired")}</p>
        )}
      </div>
    </div>
  );
}

function GroupHeader({ title, onAdd, addLabel }: { title: string; onAdd?: () => void; addLabel?: string }) {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 pt-5 first:border-t-0 first:pt-0">
      <p className="text-sm font-bold text-blue-700 uppercase tracking-wide">{title}</p>
      {onAdd && (
        <button type="button" onClick={onAdd} className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors">
          <Plus className="h-3.5 w-3.5" />
          {addLabel}
        </button>
      )}
    </div>
  );
}

function EntryCard({ index, onRemove, removeLabel, canRemove, children }: { index: number; onRemove: () => void; removeLabel: string; canRemove: boolean; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-100 px-2 text-xs font-semibold text-blue-700">{index + 1}</span>
        {canRemove && (
          <button type="button" onClick={onRemove} className="inline-flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700">
            <Trash2 className="h-3.5 w-3.5" />
            {removeLabel}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

// A single-entry group's card (no index badge / remove button) — used for the
// per-set panels below, where "add another" happens at the whole-set (tab)
// level rather than per group.
function PlainCard({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 space-y-4">{children}</div>;
}

// Every DTO-relevant scalar field of one repeatable entry, used both to build
// the API payload and to diff against a loaded snapshot (sectionOnly mode).
function toApiPerson(e: PersonEntry) {
  return {
    ...(e.id ? { id: e.id } : {}),
    lastNameKh: e.lastNameKh || undefined,
    firstNameKh: e.firstNameKh || undefined,
    lastNameEn: e.lastNameEn,
    firstNameEn: e.firstNameEn,
    dob: e.dob,
    becameDate: e.becameDate,
    nationality: e.nationality,
    gender: e.gender,
    idCard: e.idCard || undefined,
    idIssuedDate: e.idIssuedDate || undefined,
    idExpiredDate: e.idExpiredDate || undefined,
    email: e.email || undefined,
    phone: e.phone || undefined,
  };
}
function toApiOwner(e: OwnerEntry) {
  return { ...toApiPerson(e), shareAmount: e.shareAmount };
}
function toApiAgreement(a: AgreementEntryUI) {
  return {
    ...(a.id ? { id: a.id } : {}),
    agreementDate: a.agreementDate || undefined,
    consentAgreed: a.consentAgreed,
  };
}

// Step 3 — read-only summary of everything entered, shown before the request
// can be submitted.
function previewDate(value: string): string {
  const [y, m, d] = value.split("-");
  return y && m && d ? `${d}-${m}-${y}` : "-";
}

function PreviewField({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-slate-800 break-words">{value || "-"}</p>
    </div>
  );
}

function PreviewDocs({ label, docs }: { label: string; docs: UploadedDoc[] }) {
  return (
    <div>
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      {docs.length === 0 ? (
        <p className="text-sm font-medium text-slate-800">-</p>
      ) : (
        <ul className="space-y-1">
          {docs.map((d, i) => (
            <li key={`${d.name}-${i}`} className="flex items-center gap-1.5 text-sm text-slate-800 min-w-0">
              <FileText className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
              {d.url ? (
                <a href={d.url} target="_blank" rel="noreferrer" className="truncate text-blue-600 hover:underline">{d.name}</a>
              ) : (
                <span className="truncate">{d.name}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PreviewPerson({
  t,
  title,
  becameLabel,
  person,
  shareAmount,
}: {
  t: ReturnType<typeof useTranslations>;
  title: string;
  becameLabel: string;
  person: PersonEntry;
  shareAmount?: string;
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-3">{title}</h4>
      <div className="flex items-start gap-6">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <PreviewField label={t("lastNameKh")} value={person.lastNameKh} />
          <PreviewField label={t("firstNameKh")} value={person.firstNameKh} />
          <PreviewField label={t("dob")} value={previewDate(person.dob)} />
          <PreviewField label={t("lastNameEn")} value={person.lastNameEn} />
          <PreviewField label={t("firstNameEn")} value={person.firstNameEn} />
          <PreviewField label={t("gender")} value={person.gender === "M" ? t("genderMale") : person.gender === "F" ? t("genderFemale") : ""} />
          <PreviewField label={t("nationality")} value={COUNTRIES.find((c) => c.code === person.nationality)?.name ?? person.nationality} />
          <PreviewField label={person.idType === "PASSPORT" ? t("idTypePassport") : t("idTypeId")} value={person.idCard} />
          <PreviewField label={becameLabel} value={previewDate(person.becameDate)} />
          <PreviewField label={t("issueDate")} value={previewDate(person.idIssuedDate)} />
          <PreviewField label={t("expiryDate")} value={previewDate(person.idExpiredDate)} />
          <PreviewField label={t("phone")} value={person.phone} />
          <PreviewField label={t("email")} value={person.email} />
          {shareAmount !== undefined && <PreviewField label={t("shareAmount")} value={shareAmount} />}
          <PreviewDocs label={t("idDocLabel")} docs={person.idDocs} />
        </div>
        <div className="flex-shrink-0 w-28 h-36 border-2 border-blue-300 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
          {person.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={person.photo} alt={person.photoName ?? "photo"} className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-slate-400">-</span>
          )}
        </div>
      </div>
    </div>
  );
}

function RequestPreview({
  t,
  company,
  nominees,
  owners,
  agreements,
}: {
  t: ReturnType<typeof useTranslations>;
  company: CompanyData;
  nominees: PersonEntry[];
  owners: OwnerEntry[];
  agreements: AgreementEntryUI[];
}) {
  const address = [company.companyHouse, company.companyStreet, company.companyVillage, company.companyCommune, company.companyDistrict, company.companyProvince]
    .filter(Boolean)
    .join(", ");
  return (
    <div className="space-y-6">
      <p className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">{t("previewHint")}</p>

      <section>
        <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">1. {t("step1Title")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <PreviewField label={t("companyNameEn")} value={company.companyNameEn} />
          <PreviewField label={t("companyNameKh")} value={company.companyNameKh} />
          <PreviewField label={t("registrationNo")} value={company.registrationNo} />
          <PreviewField label={t("registrationDate")} value={previewDate(company.registrationDate)} />
          <PreviewField label={t("addressLabel")} value={address} />
          <PreviewField label={t("companyPhone")} value={company.companyPhone} />
          <PreviewField label={t("companyOfficePhone")} value={company.companyOfficePhone} />
          <PreviewField label={t("companyEmail")} value={company.companyEmail} />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">2. {t("step2CombinedTitle")}</h3>
        <div className="space-y-6">
          {nominees.map((nominee, i) => {
            const owner = owners[i];
            const agreement = agreements[i];
            return (
              <div key={nominee.localKey} className="rounded-xl border border-slate-200 p-4 space-y-5">
                {nominees.length > 1 && (
                  <p className="text-sm font-semibold text-slate-700">{t("agreementTabTitle", { number: i + 1 })}</p>
                )}
                <PreviewPerson t={t} title={t("nomineeGroupTitle")} becameLabel={t("shBecameDate")} person={nominee} />
                {owner && (
                  <PreviewPerson t={t} title={t("ownerGroupTitle")} becameLabel={t("becameDate")} person={owner} shareAmount={owner.shareAmount} />
                )}
                {agreement && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-3">{t("agreementGroupTitle")}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <PreviewField label={t("agreementDate")} value={previewDate(agreement.agreementDate)} />
                      <PreviewDocs label={t("shareholderContractLabel")} docs={agreement.contractDocs} />
                      <PreviewDocs label={t("otherDocsLabel")} docs={agreement.supportingDocs} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <p className="flex items-start gap-2 text-sm text-slate-700">
        <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-600" />
        {t("consentText")}
      </p>
    </div>
  );
}

// `sectionOnly` (1-4): the detail page's per-section "Request To Update"
// buttons open just that step, without the step tabs or Previous/Next. Steps
// 2/3/4 all live inside the merged Section 2 panel; `sectionOnly` there
// restricts which one of the three repeatable groups is shown.
export default function BeneficiaryRequestForm({ editId, sectionOnly }: { editId?: string; sectionOnly?: number } = {}) {
  const t = useTranslations("beneficiary.request");
  const router = useRouter();
  const pathname = usePathname() ?? "/en";
  const locale = pathname.split("/")[1] || "en";

  const storageKey = `beneficiary-request-draft:${editId ?? "new"}`;
  const clearPersisted = () => {
    try {
      sessionStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  };

  // Lazy-initializing state from sessionStorage would make the very first
  // client render differ from the server-rendered HTML (server never has
  // access to it), causing a hydration mismatch. So every field below starts
  // at its plain server-safe default and the persisted draft, if any, is
  // applied in an effect after mount instead (see the restore effect below).
  const [company, setCompany] = useState<CompanyData>(EMPTY_COMPANY);
  const [nominees, setNominees] = useState<PersonEntry[]>([emptyPerson()]);
  const [owners, setOwners] = useState<OwnerEntry[]>([emptyOwner()]);
  const [agreements, setAgreements] = useState<AgreementEntryUI[]>([emptyAgreement()]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(!!editId);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [notAllowed, setNotAllowed] = useState(false);
  const [activeStep, setActiveStep] = useState(sectionOnly ? (sectionOnly === 1 ? 1 : 2) : 1);
  // Which "Agreement N" set is shown inside the (always single) "2. Nominee
  // Shareholder Agreement" tab — a sub-tab bar nested inside that one tab,
  // not separate top-level tabs.
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [draftRestored, setDraftRestored] = useState(!editId ? false : true);
  const [returnReason, setReturnReason] = useState<string | null>(null);
  const [returnSteps, setReturnSteps] = useState<number[]>([]);
  const [companyFlaggedFields, setCompanyFlaggedFields] = useState<string[]>([]);
  const [loadedStatus, setLoadedStatus] = useState<string | null>(null);
  // Snapshot of the approved section being updated (sectionOnly mode), to
  // refuse an update that changes nothing.
  const [originalSection, setOriginalSection] = useState<{
    company: CompanyData;
    nominees: ReturnType<typeof toApiPerson>[];
    owners: ReturnType<typeof toApiOwner>[];
    agreements: ReturnType<typeof toApiAgreement>[];
  } | null>(null);

  const GROUP_BY_STEP: Record<number, "nominee" | "owner" | "agreement"> = { 2: "nominee", 3: "owner", 4: "agreement" };
  const visibleGroups: ("nominee" | "owner" | "agreement")[] =
    sectionOnly && sectionOnly !== 1 ? [GROUP_BY_STEP[sectionOnly]] : ["nominee", "owner", "agreement"];

  // Main (non-sectionOnly) flow: the single "2. Nominee Shareholder Agreement"
  // tab contains a nested sub-tab bar — "Agreement 1", "Agreement 2", ... —
  // each one a full { nominee, owner, agreement } trio, added/removed
  // together via "Add More Agreement". The three arrays are always kept the
  // same length by addSet/removeSet below.
  const setCount = nominees.length;
  const isSetValid = (i: number) =>
    isPersonEntryValid(nominees[i], NOMINEE_REQUIRED, true) &&
    isPersonEntryValid(owners[i], OWNER_REQUIRED, true) &&
    isAgreementEntryValid(agreements[i], true);
  const addSet = () => {
    setNominees((p) => [...p, emptyPerson()]);
    setOwners((p) => [...p, emptyOwner()]);
    setAgreements((p) => [...p, emptyAgreement()]);
    setActiveSetIndex(setCount);
  };
  const removeSet = (i: number) => {
    setNominees((p) => p.filter((_, idx) => idx !== i));
    setOwners((p) => p.filter((_, idx) => idx !== i));
    setAgreements((p) => p.filter((_, idx) => idx !== i));
    setActiveSetIndex((s) => Math.min(s, Math.max(0, setCount - 2)));
  };

  // Runs once after mount to apply any sessionStorage draft.
  useEffect(() => {
    if (editId) return;
    const persistedDraft = readPersistedDraft(storageKey);
    if (persistedDraft) {
      setCompany((c) => ({ ...c, ...persistedDraft.company }));
      if (persistedDraft.nominees?.length) setNominees(persistedDraft.nominees.map((n) => ({ ...n, photoFile: null })));
      if (persistedDraft.owners?.length) setOwners(persistedDraft.owners.map((o) => ({ ...o, photoFile: null })));
      if (persistedDraft.agreements?.length) setAgreements(persistedDraft.agreements);
      setActiveStep(Math.min(2, persistedDraft.activeStep ?? (sectionOnly ? (sectionOnly === 1 ? 1 : 2) : 1)));
    }
    setDraftRestored(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the persisted snapshot in sync with in-progress edits.
  const stripDoc = (docs: UploadedDoc[]): PersistedDoc[] => docs.map((d) => ({ name: d.name, url: d.url, documentId: d.documentId }));
  useEffect(() => {
    if (!draftRestored) return;
    if (editId && loading) return;
    try {
      const snapshot: PersistedDraft = {
        company,
        nominees: nominees.map((n) => ({ ...n, photoFile: undefined, idDocs: stripDoc(n.idDocs) }) as PersistedPerson),
        owners: owners.map((o) => ({ ...o, photoFile: undefined, idDocs: stripDoc(o.idDocs) }) as PersistedOwner),
        agreements: agreements.map((a) => ({ ...a, contractDocs: stripDoc(a.contractDocs), supportingDocs: stripDoc(a.supportingDocs) })),
        activeStep,
      };
      sessionStorage.setItem(storageKey, JSON.stringify(snapshot));
    } catch {
      // ignore (e.g. private browsing storage quota)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company, nominees, owners, agreements, activeStep, editId, loading, draftRestored]);

  useEffect(() => {
    if (!editId) return;
    let cancelled = false;

    type ApiDocument = { id: number; category: DocCategory; media: { filename: string }; nomineeShareholderId?: number | null; beneficialOwnerId?: number | null; agreementId?: number | null };
    type ApiPerson = { id: number; lastNameKh?: string; firstNameKh?: string; lastNameEn: string; firstNameEn: string; dob: string; becameDate: string; nationality: string; gender: string; idCard?: string; idIssuedDate?: string | null; idExpiredDate?: string | null; email?: string; phone?: string };
    type ApiOwner = ApiPerson & { shareAmount: string };
    type ApiAgreement = { id: number; agreementDate: string | null; consentAgreed: boolean };

    async function loadExisting() {
      try {
        const res = await fetch(`/api/portal/beneficiary/requests/${editId}`);
        if (cancelled) return;
        if (!res.ok) {
          setLoadError(t("editLoadError"));
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await res.json();
        if (
          sectionOnly
            ? data.status !== "APPROVED"
            : data.status !== "APPROVED" && data.status !== "RETURNED" && data.status !== "DRAFT"
        ) {
          setNotAllowed(true);
          return;
        }
        setLoadedStatus(data.status);
        const dateOnly = (iso: string | null | undefined) => (iso ? iso.slice(0, 10) : "");

        const mappedCompany: CompanyData = {
          companyNameKh: data.companyNameKh ?? "", companyNameEn: data.companyNameEn ?? "",
          registrationNo: data.registrationNo ?? "", registrationDate: dateOnly(data.registrationDate),
          companyProvince: data.companyProvince ?? "", companyDistrict: data.companyDistrict ?? "",
          companyCommune: data.companyCommune ?? "", companyVillage: data.companyVillage ?? "",
          companyStreet: data.companyStreet ?? "", companyHouse: data.companyHouse ?? "",
          companyPhone: data.companyPhone ?? "", companyOfficePhone: data.companyOfficePhone ?? "",
          companyEmail: data.companyEmail ?? "",
        };

        const documents = (data.documents ?? []) as ApiDocument[];
        const toPerson = (e: ApiPerson, photoCat: DocCategory, idCat: DocCategory): PersonEntry => {
          const idDocs = documents
            .filter((d) => d.category === idCat && (photoCat === "SH_PHOTO" ? d.nomineeShareholderId === e.id : d.beneficialOwnerId === e.id))
            .map((d) => ({ name: d.media.filename, documentId: d.id, url: documentDownloadUrl(d.id) }));
          const photoDoc = documents.find((d) => d.category === photoCat && (photoCat === "SH_PHOTO" ? d.nomineeShareholderId === e.id : d.beneficialOwnerId === e.id));
          return {
            localKey: `p-${e.id}`,
            id: e.id,
            lastNameKh: e.lastNameKh ?? "", firstNameKh: e.firstNameKh ?? "",
            lastNameEn: e.lastNameEn ?? "", firstNameEn: e.firstNameEn ?? "",
            dob: dateOnly(e.dob), becameDate: dateOnly(e.becameDate), nationality: e.nationality ?? "", gender: e.gender ?? "",
            idType: "ID", idCard: e.idCard ?? "", idIssuedDate: dateOnly(e.idIssuedDate), idExpiredDate: dateOnly(e.idExpiredDate),
            email: e.email ?? "", phone: e.phone ?? "",
            photoDocId: photoDoc?.id ?? null, photo: photoDoc ? documentDownloadUrl(photoDoc.id) : null, photoFile: null, photoName: photoDoc?.media.filename ?? null,
            idDocs,
          };
        };
        const mappedNominees: PersonEntry[] = ((data.nomineeShareholders ?? []) as ApiPerson[]).map((e) => toPerson(e, "SH_PHOTO", "SH_ID_DOC"));
        const mappedOwners: OwnerEntry[] = ((data.beneficialOwners ?? []) as ApiOwner[]).map((e) => ({ ...toPerson(e, "OWNER_PHOTO", "OWNER_ID_DOC"), shareAmount: e.shareAmount ?? "" }));
        const mappedAgreements: AgreementEntryUI[] = ((data.agreements ?? []) as ApiAgreement[]).map((a) => ({
          localKey: `a-${a.id}`,
          id: a.id,
          agreementDate: dateOnly(a.agreementDate),
          consentAgreed: !!a.consentAgreed,
          contractDocs: documents.filter((d) => d.category === "SHAREHOLDER_CONTRACT" && d.agreementId === a.id).map((d) => ({ name: d.media.filename, documentId: d.id, url: documentDownloadUrl(d.id) })),
          supportingDocs: documents.filter((d) => d.category === "OTHER" && d.agreementId === a.id).map((d) => ({ name: d.media.filename, documentId: d.id, url: documentDownloadUrl(d.id) })),
        }));

        if (data.status === "RETURNED" && data.rejectionReason) {
          setReturnReason(data.rejectionReason);
          const steps = guessReturnSteps(data.rejectionReason);
          setReturnSteps(steps);
          if (steps.length > 0) {
            setActiveStep(steps[0] === 1 ? 1 : 2);
            if (steps.includes(1)) setCompanyFlaggedFields(guessCompanyFlaggedFields(data.rejectionReason));
          }
        }

        if (sectionOnly) {
          setOriginalSection({
            company: mappedCompany,
            nominees: mappedNominees.map(toApiPerson),
            owners: mappedOwners.map(toApiOwner),
            agreements: mappedAgreements.map(toApiAgreement),
          });
        }

        // If a language switch remounted this page mid-edit, restore the
        // in-progress (unsaved) edits over the freshly-fetched server data
        // (item 42).
        const saved = readPersistedDraft(storageKey);
        setCompany(saved ? { ...mappedCompany, ...saved.company } : mappedCompany);
        setNominees(saved?.nominees?.length ? saved.nominees.map((n) => ({ ...n, photoFile: null })) : mappedNominees.length ? mappedNominees : [emptyPerson()]);
        setOwners(saved?.owners?.length ? saved.owners.map((o) => ({ ...o, photoFile: null })) : mappedOwners.length ? mappedOwners : [emptyOwner()]);
        setAgreements(saved?.agreements?.length ? saved.agreements : mappedAgreements.length ? mappedAgreements : [emptyAgreement()]);
        if (saved?.activeStep && !sectionOnly) setActiveStep(Math.min(2, saved.activeStep));
      } catch {
        if (!cancelled) setLoadError(t("editLoadError"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadExisting();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId]);

  const setCompanyPatch = (patch: Partial<CompanyData>) => setCompany((p) => ({ ...p, ...patch }));
  const setTouchedPatch = (patch: Record<string, boolean>) => setTouched((p) => ({ ...p, ...patch }));

  const patchEntry = <T,>(setList: React.Dispatch<React.SetStateAction<T[]>>, idx: number, patch: Partial<T>) =>
    setList((prev) => prev.map((e, i) => (i === idx ? { ...e, ...patch } : e)));

  // Fills the company step and every agreement set with fake data. A new
  // request is topped up to two sets, so the multi-agreement flow gets
  // exercised; existing sets are filled in place and never dropped, which
  // would leave `activeSetIndex` pointing at a tab that no longer exists.
  const fillFakeData = () => {
    const fakeDoc = (name: string): UploadedDoc => {
      const file = makeFakePdfFile(name);
      return { name: file.name, url: URL.createObjectURL(file), file };
    };
    const fakePerson = () => ({
      ...fakePersonFields(),
      idType: "ID" as const,
      photo: FAKE_PROFILE_PHOTO,
      photoName: "profile-manager.jpg",
      photoFile: null,
      photoDocId: null,
      idDocs: [fakeDoc(FAKE_ID_DOC_NAME)],
    });
    const fillSets = <T,>(make: () => T, fake: () => Partial<T>) => (prev: T[]) => {
      const count = Math.max(prev.length, editId ? 1 : 2);
      return Array.from({ length: count }, (_, i) => ({ ...(prev[i] ?? make()), ...fake() }));
    };

    setCompany(generateFakeCompany());
    setNominees(fillSets<PersonEntry>(emptyPerson, fakePerson));
    setOwners(
      fillSets<OwnerEntry>(emptyOwner, () => ({ ...fakePerson(), shareAmount: String(Math.floor(Math.random() * 9000) + 1000) })),
    );
    setAgreements(
      fillSets<AgreementEntryUI>(emptyAgreement, () => ({
        agreementDate: randomDateBetween(2024, 2026),
        consentAgreed: true,
        contractDocs: [fakeDoc(FAKE_CONTRACT_DOC_NAME)],
        supportingDocs: [fakeDoc(FAKE_OTHER_DOC_NAME)],
      })),
    );
    // The photo file is attached once loaded, so a slow request can't hold up
    // the fill itself; skipped where the user has swapped the photo meanwhile.
    void loadFakePhotoFile().then((photoFile) => {
      if (!photoFile) return;
      const attach = <T extends PersonEntry>(entries: T[]) =>
        entries.map((e) => (e.photo === FAKE_PROFILE_PHOTO && !e.photoFile ? { ...e, photoFile } : e));
      setNominees(attach);
      setOwners(attach);
    });
  };

  const companyFieldError = (key: keyof CompanyData) => {
    if (!touched[key]) return "";
    const val = company[key];
    if (!val) return t("required");
    if ((key === "companyPhone" || key === "companyOfficePhone") && !isValidPhone(val)) return t("invalidPhone");
    return "";
  };
  const companyInputCls = (key: keyof CompanyData) =>
    cn(
      "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
      companyFieldError(key)
        ? "border-red-400"
        : companyFlaggedFields.includes(key)
        ? "border-orange-400 ring-2 ring-orange-100"
        : "border-slate-300",
    );

  const isCompanyStepComplete =
    COMPANY_REQUIRED.every((k) => !!company[k]) && isValidPhone(company.companyPhone) && isValidPhone(company.companyOfficePhone);

  const isSectionTwoComplete = () => {
    if (sectionOnly && sectionOnly !== 1) {
      const nomineesOk = (visibleGroups.includes("nominee") ? nominees.length > 0 && nominees.every((n) => isPersonEntryValid(n, NOMINEE_REQUIRED, true)) : true);
      const ownersOk = (visibleGroups.includes("owner") ? owners.length > 0 && owners.every((o) => isPersonEntryValid(o, OWNER_REQUIRED, true)) : true);
      const agreementsOk = (visibleGroups.includes("agreement") ? agreements.length > 0 && agreements.every((a) => isAgreementEntryValid(a, true)) : true);
      return nomineesOk && ownersOk && agreementsOk;
    }
    return setCount > 0 && Array.from({ length: setCount }, (_, i) => i).every(isSetValid);
  };

  // In single-section mode a problem in another step can't be shown on this
  // page, so say so instead of silently switching to a hidden step.
  const focusStep = (step: number) => {
    const target = step === 1 ? 1 : 2;
    if (sectionOnly && target !== (sectionOnly === 1 ? 1 : 2)) {
      toast.error(t("otherSectionIncomplete", { section: t(`step${step}Title` as "step1Title") }));
      return;
    }
    if (!sectionOnly && target === 2) {
      const firstInvalid = Array.from({ length: setCount }, (_, i) => i).find((i) => !isSetValid(i));
      if (firstInvalid !== undefined) setActiveSetIndex(firstInvalid);
      setActiveStep(2);
      return;
    }
    setActiveStep(target);
  };

  const sectionHasChanges = () => {
    if (!sectionOnly || !originalSection) return true;
    if (sectionOnly === 1) return JSON.stringify(company) !== JSON.stringify(originalSection.company);
    if (sectionOnly === 2) {
      return (
        JSON.stringify(nominees.map(toApiPerson)) !== JSON.stringify(originalSection.nominees) ||
        nominees.some((n) => n.photoFile || n.idDocs.some((d) => d.file))
      );
    }
    if (sectionOnly === 3) {
      return (
        JSON.stringify(owners.map(toApiOwner)) !== JSON.stringify(originalSection.owners) ||
        owners.some((o) => o.photoFile || o.idDocs.some((d) => d.file))
      );
    }
    if (sectionOnly === 4) {
      return (
        JSON.stringify(agreements.map(toApiAgreement)) !== JSON.stringify(originalSection.agreements) ||
        agreements.some((a) => a.contractDocs.some((d) => d.file) || a.supportingDocs.some((d) => d.file))
      );
    }
    return true;
  };

  const isApprovedUpdate = !!editId && loadedStatus === "APPROVED";

  const validateAndFocusStep = () => {
    if (!sectionHasChanges()) {
      toast.error(t("noChanges", { section: t(`step${sectionOnly}Title` as "step1Title") }));
      return false;
    }
    const companyTouch: Record<string, boolean> = {};
    COMPANY_REQUIRED.forEach((k) => (companyTouch[k] = true));
    setTouched((p) => ({ ...p, ...companyTouch }));
    if (!isCompanyStepComplete) {
      focusStep(1);
      return false;
    }
    if (!isSectionTwoComplete()) {
      focusStep(2);
      return false;
    }
    return true;
  };

  const saveRequest = async (asDraft = false): Promise<{ id: string; detail: Record<string, unknown> } | null> => {
    const url = editId ? `/api/portal/beneficiary/requests/${editId}` : "/api/portal/beneficiary/requests";
    const payload = {
      ...company,
      ...(visibleGroups.includes("nominee") && { nomineeShareholders: nominees.map(toApiPerson) }),
      ...(visibleGroups.includes("owner") && { beneficialOwners: owners.map(toApiOwner) }),
      ...(visibleGroups.includes("agreement") && { agreements: agreements.map(toApiAgreement) }),
      ...(editId && { action: asDraft && isApprovedUpdate ? "draft" : "edit" }),
      ...(sectionOnly && isApprovedUpdate && { updateType: UPDATE_TYPE_BY_STEP[sectionOnly] }),
    };
    const res = await fetch(url, {
      method: editId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: t("submitError") }));
      const message = err.error ?? t("submitError");
      setSubmitError(message);
      toast.error(message);
      return null;
    }

    const saved = await res.json();
    return { id: String(editId ?? saved.id), detail: saved };
  };

  // Item 39: upload any locally-picked-but-not-yet-uploaded files now that we
  // have a real requestId (and, for Section 2, the entity's own real id) to
  // attach them to. New entries created via a "Save Drafted" on an already
  // APPROVED request don't get a real id until the draft is actually
  // applied/submitted (they live inside pendingUpdate JSON until then), so
  // their documents can't be tagged yet — the user re-attaches after that
  // point, matching the constraint of the pendingUpdate design.
  const uploadPendingDocuments = async (requestId: string, detail: Record<string, unknown>) => {
    const uploadArray = async (docs: UploadedDoc[], category: DocCategory, entity: UploadEntity): Promise<UploadedDoc[]> =>
      Promise.all(
        docs.map(async (d) => {
          if (!d.file || d.documentId) return d;
          try {
            const { documentId } = await uploadDocument(requestId, category, d.file, entity);
            return { name: d.name, documentId, url: documentDownloadUrl(documentId) };
          } catch {
            toast.error(t("submitError"));
            return d;
          }
        }),
      );
    const uploadPhoto = async (file: File | null, category: DocCategory, entity: UploadEntity) => {
      if (!file) return null;
      try {
        const { documentId } = await uploadDocument(requestId, category, file, entity);
        return { photoDocId: documentId, photo: documentDownloadUrl(documentId), photoFile: null as File | null };
      } catch {
        toast.error(t("submitError"));
        return null;
      }
    };

    // Everything uploads at once: each file is stored remotely and a single
    // upload can take many seconds, so one after another the submit crawls.
    const uploadNominees = async () => {
      if (!visibleGroups.includes("nominee")) return;
      const detailNominees = (detail.nomineeShareholders as { id: number }[] | undefined) ?? [];
      const next = await Promise.all(
        nominees.map(async (n, i) => {
          const entityId = n.id ?? detailNominees[i]?.id;
          if (!entityId) return n;
          const entity: UploadEntity = { nomineeShareholderId: entityId };
          const [idDocs, photoPatch] = await Promise.all([
            uploadArray(n.idDocs, "SH_ID_DOC", entity),
            uploadPhoto(n.photoFile, "SH_PHOTO", entity),
          ]);
          return { ...n, id: entityId, idDocs, ...(photoPatch ?? {}) };
        }),
      );
      setNominees(next);
    };
    const uploadOwners = async () => {
      if (!visibleGroups.includes("owner")) return;
      const detailOwners = (detail.beneficialOwners as { id: number }[] | undefined) ?? [];
      const next = await Promise.all(
        owners.map(async (o, i) => {
          const entityId = o.id ?? detailOwners[i]?.id;
          if (!entityId) return o;
          const entity: UploadEntity = { beneficialOwnerId: entityId };
          const [idDocs, photoPatch] = await Promise.all([
            uploadArray(o.idDocs, "OWNER_ID_DOC", entity),
            uploadPhoto(o.photoFile, "OWNER_PHOTO", entity),
          ]);
          return { ...o, id: entityId, idDocs, ...(photoPatch ?? {}) };
        }),
      );
      setOwners(next);
    };
    const uploadAgreements = async () => {
      if (!visibleGroups.includes("agreement")) return;
      const detailAgreements = (detail.agreements as { id: number }[] | undefined) ?? [];
      const next = await Promise.all(
        agreements.map(async (a, i) => {
          const entityId = a.id ?? detailAgreements[i]?.id;
          if (!entityId) return a;
          const entity: UploadEntity = { agreementId: entityId };
          const [contractDocs, supportingDocs] = await Promise.all([
            uploadArray(a.contractDocs, "SHAREHOLDER_CONTRACT", entity),
            uploadArray(a.supportingDocs, "OTHER", entity),
          ]);
          return { ...a, id: entityId, contractDocs, supportingDocs };
        }),
      );
      setAgreements(next);
    };
    await Promise.all([uploadNominees(), uploadOwners(), uploadAgreements()]);
  };

  // Step 3 (Preview) is the only place a full request can be submitted from,
  // and it only opens once every step is complete.
  const goToPreview = () => {
    if (!validateAndFocusStep()) return;
    setActiveStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAndFocusStep()) return;

    setSubmitError(null);
    setSubmitting(true);
    try {
      const result = await saveRequest(true);
      if (!result) return;
      await uploadPendingDocuments(result.id, result.detail);
      clearPersisted();
      toast.success(editId ? t("draftUpdated") : t("draftSaved"));
      router.push(editId ? `/${locale}/portal/beneficiary/all-requests/${result.id}` : `/${locale}/portal/beneficiary/all-requests`);
    } catch {
      setSubmitError(t("submitError"));
      toast.error(t("submitError"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAndFocusStep()) return;

    setSubmitError(null);
    setSubmitting(true);
    try {
      const result = await saveRequest();
      if (!result) return;
      await uploadPendingDocuments(result.id, result.detail);

      // A brand-new request or a continued draft (item 37) both still need
      // the separate "submit" transition (DRAFT -> PENDING). Editing an
      // already-reviewed (APPROVED/RETURNED) request transitions status as
      // part of saveRequest() itself, so no extra submit call there.
      if (!editId || loadedStatus === "DRAFT") {
        const submitRes = await fetch(`/api/portal/beneficiary/requests/${result.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "submit" }),
        });
        if (!submitRes.ok) {
          const err = await submitRes.json().catch(() => ({ error: t("submitError") }));
          const message = err.error ?? t("submitError");
          setSubmitError(message);
          toast.error(message);
          return;
        }
      }

      clearPersisted();
      toast.success(t("requestSubmitted"));
      router.push(`/${locale}/portal/beneficiary/all-requests/${result.id}`);
    } catch {
      setSubmitError(t("submitError"));
      toast.error(t("submitError"));
    } finally {
      setSubmitting(false);
    }
  };

  if (editId && loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-16 text-center">
        <Loader2 className="h-5 w-5 animate-spin text-slate-400 inline-block" />
      </div>
    );
  }

  if (editId && (loadError || notAllowed)) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-16 text-center text-slate-400 text-sm">
        {loadError ?? t("editNotAllowed")}
      </div>
    );
  }

  const allConsentAgreed = agreements.length > 0 && agreements.every((a) => a.consentAgreed);

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <Button type="button" onClick={() => router.back()} className="mb-2 bg-blue-600 text-white hover:bg-blue-700 h-8 px-3 text-xs">
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("backToList")}
          </Button>
          {!editId && (
            <button
              type="button"
              onClick={fillFakeData}
              className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Auto-fill fake data
            </button>
          )}
        </div>
        <h1 className="text-lg font-semibold text-slate-800">
          {sectionOnly
            ? t("updateSectionTitle", { section: t(`step${sectionOnly}Title` as "step1Title") })
            : editId
              ? t("editRequestTitle")
              : t("pageTitle")}
        </h1>
      </div>

      {returnReason && (
        <div className="flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50 px-5 py-4">
          <RotateCcw className="h-4.5 w-4.5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-orange-800">{t("returnReasonBannerTitle")}</p>
            <ol className="mt-0.5 text-sm text-orange-700 list-decimal list-inside space-y-0.5">
              {splitReasonItems(returnReason).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ol>
            {returnSteps.length > 0 && (
              <p className="mt-1.5 text-xs text-orange-600">
                {t("returnReasonStepHint", {
                  step: returnSteps.map((s) => t(`step${s}Title` as "step1Title")).join(" / "),
                })}
              </p>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSaveDraft} className="space-y-4">

        <div className="rounded-xl border border-slate-200 shadow-sm overflow-hidden bg-white">
          {!sectionOnly && (
          <StepTabs
            steps={[
              { number: 1, title: t("step1Title"), disabled: false, flagged: returnSteps.includes(1) },
              { number: 2, title: t("step2CombinedTitle"), disabled: false, flagged: returnSteps.some((s) => s > 1) },
              { number: 3, title: t("preview"), disabled: false },
            ]}
            activeStep={activeStep}
            onChange={(step) => (step === 3 ? goToPreview() : setActiveStep(step))}
          />
          )}

        {/* Step 1 — Company Information */}
        <StepPanel stepNumber={1} activeStep={activeStep}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t("companyNameKh")}</label>
              <input type="text" value={company.companyNameKh} onChange={(e) => setCompanyPatch({ companyNameKh: e.target.value })} placeholder="ឈ្មោះក្រុមហ៊ុន" className={companyInputCls("companyNameKh")} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t("companyNameEn")} <span className="text-red-500">*</span></label>
              <input type="text" value={company.companyNameEn} onChange={(e) => setCompanyPatch({ companyNameEn: e.target.value })} onBlur={() => setTouchedPatch({ companyNameEn: true })} placeholder="Company Name" className={companyInputCls("companyNameEn")} />
              {companyFieldError("companyNameEn") && <p className="mt-1 text-xs text-red-600">{companyFieldError("companyNameEn")}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t("registrationNo")} <span className="text-red-500">*</span></label>
              <input type="text" value={company.registrationNo} onChange={(e) => setCompanyPatch({ registrationNo: e.target.value })} onBlur={() => setTouchedPatch({ registrationNo: true })} placeholder="e.g. CO-20001" className={companyInputCls("registrationNo")} />
              {companyFieldError("registrationNo") && <p className="mt-1 text-xs text-red-600">{companyFieldError("registrationNo")}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t("registrationDate")} <span className="text-red-500">*</span></label>
              <input type="date" value={company.registrationDate} onChange={(e) => setCompanyPatch({ registrationDate: e.target.value })} onBlur={() => setTouchedPatch({ registrationDate: true })} className={companyInputCls("registrationDate")} />
              {companyFieldError("registrationDate") && <p className="mt-1 text-xs text-red-600">{companyFieldError("registrationDate")}</p>}
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-slate-200">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-3">{t("addressLabel")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AddressCascadeSelects
                values={{ province: company.companyProvince, district: company.companyDistrict, commune: company.companyCommune, village: company.companyVillage }}
                onChange={(patch) => setCompanyPatch(Object.fromEntries(Object.entries(patch).map(([k, v]) => [ADDRESS_FORM_KEYS[k as AddressField], v])))}
                onBlur={(f) => setTouchedPatch({ [ADDRESS_FORM_KEYS[f]]: true })}
                labels={{ province: t("province"), district: t("district"), commune: t("commune"), village: t("village") }}
                className={(f) => companyInputCls(ADDRESS_FORM_KEYS[f])}
                error={(f) => companyFieldError(ADDRESS_FORM_KEYS[f])}
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("street")} <span className="text-red-500">*</span></label>
                <input type="text" value={company.companyStreet} onChange={(e) => setCompanyPatch({ companyStreet: e.target.value })} onBlur={() => setTouchedPatch({ companyStreet: true })} className={companyInputCls("companyStreet")} />
                {companyFieldError("companyStreet") && <p className="mt-1 text-xs text-red-600">{companyFieldError("companyStreet")}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("houseNo")} <span className="text-red-500">*</span></label>
                <input type="text" value={company.companyHouse} onChange={(e) => setCompanyPatch({ companyHouse: e.target.value })} onBlur={() => setTouchedPatch({ companyHouse: true })} className={companyInputCls("companyHouse")} />
                {companyFieldError("companyHouse") && <p className="mt-1 text-xs text-red-600">{companyFieldError("companyHouse")}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("companyPhone")} <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="text-base leading-none">🇰🇭</span>
                  <span className="text-slate-400 text-xs">+855</span>
                  <input type="tel" value={company.companyPhone} onChange={(e) => setCompanyPatch({ companyPhone: e.target.value })} onBlur={() => setTouchedPatch({ companyPhone: true })} placeholder="23 756 789" className="flex-1 outline-none text-sm bg-transparent" />
                </div>
                {companyFieldError("companyPhone") && <p className="mt-1 text-xs text-red-600">{companyFieldError("companyPhone")}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("companyOfficePhone")}</label>
                <div className={cn("flex items-center gap-2 rounded-lg border px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-blue-500", companyFieldError("companyOfficePhone") ? "border-red-400" : "border-slate-300")}>
                  <span className="text-base leading-none">🇰🇭</span>
                  <span className="text-slate-400 text-xs">+855</span>
                  <input type="tel" value={company.companyOfficePhone} onChange={(e) => setCompanyPatch({ companyOfficePhone: e.target.value })} onBlur={() => setTouchedPatch({ companyOfficePhone: true })} placeholder="23 756 789" className="flex-1 outline-none text-sm bg-transparent" />
                </div>
                {companyFieldError("companyOfficePhone") && <p className="mt-1 text-xs text-red-600">{companyFieldError("companyOfficePhone")}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("companyEmail")} <span className="text-red-500">*</span></label>
                <input type="email" value={company.companyEmail} onChange={(e) => setCompanyPatch({ companyEmail: e.target.value })} onBlur={() => setTouchedPatch({ companyEmail: true })} placeholder="email@example.com" className={companyInputCls("companyEmail")} />
                {companyFieldError("companyEmail") && <p className="mt-1 text-xs text-red-600">{companyFieldError("companyEmail")}</p>}
              </div>
            </div>
          </div>
        </StepPanel>

        {/* Step 2+ — sectionOnly (per-section update-request page): one repeatable group. */}
        {sectionOnly && sectionOnly !== 1 && (
        <StepPanel stepNumber={2} activeStep={activeStep}>
          <div className="space-y-6">
            {visibleGroups.includes("nominee") && (
              <div className="space-y-4">
                <GroupHeader title={t("nomineeGroupTitle")} onAdd={() => setNominees((p) => [...p, emptyPerson()])} addLabel={t("addNominee")} />
                {nominees.map((n, idx) => (
                  <EntryCard key={n.localKey} index={idx} canRemove={nominees.length > 1} removeLabel={t("removeEntry")} onRemove={() => setNominees((p) => p.filter((_, i) => i !== idx))}>
                    <PersonFields
                      t={t}
                      idPrefix={`nominee.${idx}`}
                      value={n}
                      onChange={(patch) => patchEntry(setNominees, idx, patch)}
                      touched={touched}
                      setTouched={setTouchedPatch}
                      requiredFields={NOMINEE_REQUIRED}
                      becameDateLabelKey="shBecameDate"
                    />
                  </EntryCard>
                ))}
              </div>
            )}

            {visibleGroups.includes("owner") && (
              <div className="space-y-4">
                <GroupHeader title={t("ownerGroupTitle")} onAdd={() => setOwners((p) => [...p, emptyOwner()])} addLabel={t("addOwner")} />
                {owners.map((o, idx) => (
                  <EntryCard key={o.localKey} index={idx} canRemove={owners.length > 1} removeLabel={t("removeEntry")} onRemove={() => setOwners((p) => p.filter((_, i) => i !== idx))}>
                    <PersonFields
                      t={t}
                      idPrefix={`owner.${idx}`}
                      value={o}
                      onChange={(patch) => patchEntry(setOwners, idx, patch)}
                      touched={touched}
                      setTouched={setTouchedPatch}
                      requiredFields={OWNER_REQUIRED}
                      becameDateLabelKey="becameDate"
                      extraContent={
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              {t("shareAmount")} <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={o.shareAmount}
                              onChange={(e) => patchEntry(setOwners, idx, { shareAmount: e.target.value })}
                              onBlur={() => setTouchedPatch({ [`owner.${idx}.shareAmount`]: true })}
                              placeholder="e.g. 1000"
                              className={cn("w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500", touched[`owner.${idx}.shareAmount`] && !o.shareAmount ? "border-red-400" : "border-slate-300")}
                            />
                            {touched[`owner.${idx}.shareAmount`] && !o.shareAmount && <p className="mt-1 text-xs text-red-600">{t("required")}</p>}
                          </div>
                        </div>
                      }
                    />
                  </EntryCard>
                ))}
              </div>
            )}

            {visibleGroups.includes("agreement") && (
              <div className="space-y-4">
                <GroupHeader title={t("agreementGroupTitle")} onAdd={() => setAgreements((p) => [...p, emptyAgreement()])} addLabel={t("addAgreement")} />
                {agreements.map((a, idx) => (
                  <EntryCard key={a.localKey} index={idx} canRemove={agreements.length > 1} removeLabel={t("removeEntry")} onRemove={() => setAgreements((p) => p.filter((_, i) => i !== idx))}>
                    <AgreementFields
                      t={t}
                      idPrefix={`agreement.${idx}`}
                      value={a}
                      onChange={(patch) => patchEntry(setAgreements, idx, patch)}
                      touched={touched}
                      setTouched={setTouchedPatch}
                    />
                  </EntryCard>
                ))}
              </div>
            )}
          </div>
        </StepPanel>
        )}

        {/* Main flow: the single "2. Nominee Shareholder Agreement" tab holds
            a nested sub-tab bar — "Agreement 1", "Agreement 2", ... — each a
            full { nominee, owner, agreement } trio. "+" on the sub-tab bar
            adds a whole new sub-tab, not per-group entries. */}
        {!sectionOnly && (
          <StepPanel stepNumber={2} activeStep={activeStep}>
            <div className="space-y-4">
              <p className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                <span>{t("addMoreAgreementHintBefore")}</span>
                <button
                  type="button"
                  onClick={addSet}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {t("addMoreAgreement")}
                </button>
                <span>{t("addMoreAgreementHintAfter")}</span>
              </p>
              <StepTabs
                steps={Array.from({ length: setCount }, (_, i) => ({
                  number: i + 1,
                  title: t("agreementTabTitle", { number: i + 1 }),
                  disabled: false,
                  flagged: i === 0 && returnSteps.some((s) => s > 1),
                  ...(setCount > 1 && { onRemove: () => removeSet(i), removeLabel: t("removeSet") }),
                }))}
                activeStep={activeSetIndex + 1}
                onChange={(n) => setActiveSetIndex(n - 1)}
              />

              {Array.from({ length: setCount }, (_, i) => i).map((i) => (
                i !== activeSetIndex ? null : (
                <div key={nominees[i]?.localKey ?? i} className="space-y-6">
                  <div className="space-y-4">
                    <GroupHeader title={t("nomineeGroupTitle")} />
                    <PlainCard>
                      <PersonFields
                        t={t}
                        idPrefix={`nominee.${i}`}
                        value={nominees[i]}
                        onChange={(patch) => patchEntry(setNominees, i, patch)}
                        touched={touched}
                        setTouched={setTouchedPatch}
                        requiredFields={NOMINEE_REQUIRED}
                        becameDateLabelKey="shBecameDate"
                      />
                    </PlainCard>
                  </div>

                  <div className="space-y-4">
                    <GroupHeader title={t("ownerGroupTitle")} />
                    <PlainCard>
                      <PersonFields
                        t={t}
                        idPrefix={`owner.${i}`}
                        value={owners[i]}
                        onChange={(patch) => patchEntry(setOwners, i, patch)}
                        touched={touched}
                        setTouched={setTouchedPatch}
                        requiredFields={OWNER_REQUIRED}
                        becameDateLabelKey="becameDate"
                        extraContent={
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">
                                {t("shareAmount")} <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="number"
                                min="0"
                                step="1"
                                value={owners[i].shareAmount}
                                onChange={(e) => patchEntry(setOwners, i, { shareAmount: e.target.value })}
                                onBlur={() => setTouchedPatch({ [`owner.${i}.shareAmount`]: true })}
                                placeholder="e.g. 1000"
                                className={cn("w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500", touched[`owner.${i}.shareAmount`] && !owners[i].shareAmount ? "border-red-400" : "border-slate-300")}
                              />
                              {touched[`owner.${i}.shareAmount`] && !owners[i].shareAmount && <p className="mt-1 text-xs text-red-600">{t("required")}</p>}
                            </div>
                          </div>
                        }
                      />
                    </PlainCard>
                  </div>

                  <div className="space-y-4">
                    <GroupHeader title={t("agreementGroupTitle")} />
                    <PlainCard>
                      <AgreementFields
                        t={t}
                        idPrefix={`agreement.${i}`}
                        value={agreements[i]}
                        onChange={(patch) => patchEntry(setAgreements, i, patch)}
                        touched={touched}
                        setTouched={setTouchedPatch}
                      />
                    </PlainCard>
                  </div>
                </div>
                )
              ))}
            </div>
          </StepPanel>
        )}
        {/* Step 3 — Preview */}
        {!sectionOnly && (
          <StepPanel stepNumber={3} activeStep={activeStep}>
            <RequestPreview t={t} company={company} nominees={nominees} owners={owners} agreements={agreements} />
          </StepPanel>
        )}
        </div>

        {/* Step navigation / Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {sectionOnly ? <span className="hidden sm:block" /> : (
          <button
            type="button"
            onClick={() => setActiveStep((s) => Math.max(1, s - 1))}
            disabled={activeStep === 1}
            className="order-1 sm:order-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t("previous")}
          </button>
          )}

          {submitError && <p className="order-2 sm:order-2 text-sm text-red-600">{submitError}</p>}

          {!sectionOnly && activeStep === 1 ? (
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              disabled={!isCompanyStepComplete}
              className="order-3 sm:order-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t("next")}
            </button>
          ) : (
            <div className="order-3 sm:order-3 flex flex-col sm:flex-row items-stretch gap-3">
              {sectionOnly || activeStep === 3 ? (
              <button
                type="button"
                onClick={handleSubmitRequest}
                disabled={submitting || !allConsentAgreed}
                className="order-1 sm:order-3 inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                {submitting ? t("submittingRequest") : isApprovedUpdate ? t("requestToUpdate") : t("submitRequest")}
              </button>
              ) : (
              <button
                type="button"
                onClick={goToPreview}
                disabled={submitting || !allConsentAgreed}
                className="order-1 sm:order-3 inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Eye className="h-4 w-4" />
                {t("preview")}
              </button>
              )}
              <button
                type="submit"
                disabled={submitting || !allConsentAgreed}
                className="order-2 sm:order-2 inline-flex items-center justify-center gap-1.5 rounded-lg border border-blue-600 bg-white px-5 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                {submitting ? t("submitting") : t("submit")}
              </button>
              <button type="button" onClick={() => router.back()} className="order-3 sm:order-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <XCircle className="h-4 w-4" />
                {t("cancel")}
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
