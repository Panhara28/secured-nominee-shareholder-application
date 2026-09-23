"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft, Eye, FileText, Loader2, Paperclip, RotateCcw, Save, Send, Sparkles, Upload, X, XCircle } from "lucide-react";
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
}: {
  steps: { number: number; title: string; disabled: boolean; flagged?: boolean }[];
  activeStep: number;
  onChange: (step: number) => void;
}) {
  return (
    <div className="flex overflow-x-auto border-b border-slate-200">
      {steps.map((s) => {
        const isActive = s.number === activeStep;
        return (
          <button
            key={s.number}
            type="button"
            onClick={() => !s.disabled && onChange(s.number)}
            disabled={s.disabled}
            className={cn(
              "relative flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors",
              s.disabled
                ? "border-transparent text-slate-300 cursor-not-allowed"
                : isActive
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
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
        );
      })}
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

function guessFieldsFromReason(reason: string): { fields: string[]; steps: number[] } {
  const text = reason.toLowerCase();
  const fields: string[] = [];
  const steps = new Set<number>();

  // Company-level (step 1) keywords
  if (text.includes("registration") || text.includes("business registry")) {
    fields.push("registrationNo");
    steps.add(1);
  }
  if (text.includes("company email")) {
    fields.push("companyEmail");
    steps.add(1);
  }
  if (text.includes("company phone")) {
    fields.push("companyPhone");
    steps.add(1);
  }
  if (text.includes("company address") || text.includes("addresses could not be cross-verified")) {
    fields.push("companyProvince", "companyDistrict", "companyCommune", "companyVillage", "companyStreet", "companyHouse");
    steps.add(1);
  }

  // Person-level (step 2/3) keywords — if the reason doesn't say which person, flag both.
  const mentionsShareholder = text.includes("shareholder") || text.includes("nominee");
  const mentionsOwner = text.includes("beneficial owner") || text.includes("beneficiary owner") || text.includes(" owner");
  const targets: (2 | 3)[] = [];
  if (mentionsShareholder) targets.push(2);
  if (mentionsOwner) targets.push(3);
  if (targets.length === 0) targets.push(2, 3);

  const personField = (suffix: string, step: 2 | 3) =>
    step === 2 ? `sh${suffix}` : `${suffix.charAt(0).toLowerCase()}${suffix.slice(1)}`;

  const mentionsIdCard = text.includes("id card") || text.includes("passport") || text.includes("id number") || text.includes("id issue") || text.includes("issuing province");
  const mentionsDob = text.includes("date of birth") || text.includes("dob");
  const mentionsPersonEmail = !text.includes("company") && text.includes("email");
  const mentionsPersonPhone = !text.includes("company") && text.includes("phone");

  if (mentionsIdCard || mentionsDob || mentionsPersonEmail || mentionsPersonPhone) {
    for (const step of targets) {
      if (mentionsIdCard) fields.push(personField("IdCard", step), personField("IdIssuedDate", step), personField("IdExpiredDate", step));
      if (mentionsDob) fields.push(personField("Dob", step));
      if (mentionsPersonEmail) fields.push(personField("Email", step));
      if (mentionsPersonPhone) fields.push(personField("Phone", step));
      steps.add(step);
    }
  }

  return { fields, steps: [...steps].sort((a, b) => a - b) };
}

// Item 30/31 validation helpers, shared by PersonFields and the top-level
// step-completion checks.
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

type FormData = {
  /* Step 1 — Company */
  companyNameKh: string; companyNameEn: string; registrationNo: string; registrationDate: string;
  companyProvince: string; companyDistrict: string; companyCommune: string; companyVillage: string;
  companyStreet: string; companyHouse: string; companyPhone: string; companyOfficePhone: string; companyEmail: string;
  /* Step 2 — Beneficiary Owner */
  lastNameKh: string; firstNameKh: string; lastNameEn: string; firstNameEn: string;
  dob: string; becameDate: string; nationality: string; gender: string;
  idType: "ID" | "PASSPORT"; idCard: string; idIssuedDate: string; idExpiredDate: string;
  email: string; phone: string; shareAmount: string;
  /* Step 3 — Shareholder */
  shLastNameKh: string; shFirstNameKh: string; shLastNameEn: string; shFirstNameEn: string;
  shDob: string; shBecameDate: string; shNationality: string; shGender: string;
  shIdType: "ID" | "PASSPORT"; shIdCard: string; shIdIssuedDate: string; shIdExpiredDate: string;
  shEmail: string; shPhone: string;
  /* Step 4 — Agreement */
  agreementDate: string;
};

const EMPTY: FormData = {
  companyNameKh: "", companyNameEn: "", registrationNo: "", registrationDate: "",
  companyProvince: "", companyDistrict: "", companyCommune: "", companyVillage: "",
  companyStreet: "", companyHouse: "", companyPhone: "", companyOfficePhone: "", companyEmail: "",
  lastNameKh: "", firstNameKh: "", lastNameEn: "", firstNameEn: "",
  dob: "", becameDate: "", nationality: "", gender: "", idType: "ID", idCard: "", idIssuedDate: "", idExpiredDate: "",
  email: "", phone: "", shareAmount: "",
  shLastNameKh: "", shFirstNameKh: "", shLastNameEn: "", shFirstNameEn: "",
  shDob: "", shBecameDate: "", shNationality: "", shGender: "", shIdType: "ID", shIdCard: "", shIdIssuedDate: "", shIdExpiredDate: "",
  shEmail: "", shPhone: "",
  agreementDate: "",
};

// `file` is the raw picked File, kept in memory only, until it's uploaded to
// the real Document/Media backend once a requestId exists (item 39). `url`
// is either a local preview blob (while `file` is still pending) or a real
// `/api/portal/documents/:id/download` link once `documentId` is set.
type UploadedDoc = { name: string; url?: string; file?: File; documentId?: number };

// Matches the API's DocumentCategory enum (prisma/schema.prisma).
type DocCategory = "SH_PHOTO" | "SH_ID_DOC" | "OWNER_PHOTO" | "OWNER_ID_DOC" | "SHAREHOLDER_CONTRACT" | "OTHER";

async function uploadDocument(
  requestId: string,
  category: DocCategory,
  file: File,
): Promise<{ documentId: number; filename: string }> {
  const formData = new FormData();
  formData.append("requestId", requestId);
  formData.append("category", category);
  formData.append("file", file);
  const res = await fetch("/api/portal/documents/upload", { method: "POST", body: formData });
  if (!res.ok) throw new Error("Document upload failed.");
  const data = await res.json();
  return { documentId: data.document.id as number, filename: data.document.media.filename as string };
}

function documentDownloadUrl(documentId: number): string {
  return `/api/portal/documents/${documentId}/download`;
}

// Item 42: in-progress form state persisted to sessionStorage so a language
// switch (which remounts this component) doesn't lose what the user typed.
// Raw `File` objects aren't serializable, so persisted doc entries never
// carry one — an in-flight (not-yet-uploaded) attachment picked just before
// a language switch is a known, accepted gap (its filename/preview survive,
// re-attaching the file itself doesn't).
type PersistedDoc = Omit<UploadedDoc, "file">;
type PersistedDraft = {
  form: Partial<FormData>;
  ownerPhotoName: string | null;
  shPhotoName: string | null;
  ownerPhotoDocId: number | null;
  shPhotoDocId: number | null;
  ownerIdDocs: PersistedDoc[];
  shIdDocs: PersistedDoc[];
  shareholderContractDocs: PersistedDoc[];
  supportingDocs: PersistedDoc[];
  consentAgreed: boolean;
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

function generateFakePerson(prefix: "sh" | "") {
  const key = (f: string) => (prefix ? `${prefix}${f}` : `${f.charAt(0).toLowerCase()}${f.slice(1)}`);
  return {
    [key("LastNameKh")]: randomOf(FAKE_LAST_KH),
    [key("FirstNameKh")]: randomOf(FAKE_FIRST_KH),
    [key("LastNameEn")]: randomOf(FAKE_LAST_EN),
    [key("FirstNameEn")]: randomOf(FAKE_FIRST_EN),
    [key("Dob")]: randomDateBetween(1970, 2000),
    [key("BecameDate")]: randomDateBetween(2018, 2026),
    [key("Nationality")]: randomOf(NATIONALITIES),
    [key("Gender")]: randomOf(GENDERS),
    [key("IdCard")]: randomDigits(9),
    [key("IdIssuedDate")]: randomDateBetween(2018, 2023),
    [key("IdExpiredDate")]: randomDateBetween(2026, 2033),
    [key("Email")]: `${randomOf(FAKE_FIRST_EN).toLowerCase()}.${randomOf(FAKE_LAST_EN).toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`,
    [key("Phone")]: `${Math.floor(Math.random() * 90) + 10} ${randomDigits(3)} ${randomDigits(3)}`,
  };
}

const FAKE_PROFILE_PHOTO = "/profile-manager.jpg";
const FAKE_ID_DOC_NAME = "sample_passport.pdf";
const FAKE_CONTRACT_DOC_NAME = "Nominee shareholder agreement KHM.pdf";
const FAKE_OTHER_DOC_NAME = "This is  other documents.pdf";

function generateFakeFormData(): FormData {
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
    shareAmount: String(Math.floor(Math.random() * 9000) + 1000),
    ...generateFakePerson(""),
    ...generateFakePerson("sh"),
    agreementDate: randomDateBetween(2024, 2026),
  } as unknown as FormData;
}

function PersonFields({
  t,
  prefix,
  form,
  set,
  touched,
  setTouched,
  photo,
  setPhoto,
  setPhotoName,
  setPhotoFile,
  idDocs,
  setIdDocs,
  requiredFields,
  extraContent,
  flaggedFields = [],
  unchangedFields = [],
}: {
  t: ReturnType<typeof useTranslations>;
  prefix: string;
  form: Record<string, string>;
  set: (patch: Record<string, string>) => void;
  touched: Record<string, boolean>;
  setTouched: (patch: Record<string, boolean>) => void;
  photo: string | null;
  setPhoto: (v: string | null) => void;
  setPhotoName: (v: string | null) => void;
  setPhotoFile: (v: File | null) => void;
  idDocs: UploadedDoc[];
  setIdDocs: React.Dispatch<React.SetStateAction<UploadedDoc[]>>;
  requiredFields: string[];
  extraContent?: React.ReactNode;
  flaggedFields?: string[];
  unchangedFields?: string[];
}) {
  const key = (f: string) => (prefix ? `${prefix}${f}` : `${f.charAt(0).toLowerCase()}${f.slice(1)}`);
  const isFlagged = (f: string) => flaggedFields.includes(key(f));
  const isUnchanged = (f: string) => unchangedFields.includes(key(f));
  const fieldError = (f: string) => {
    if (isUnchanged(f)) return t("unchangedFieldInline");
    if (!touched[key(f)]) return "";
    const val = form[key(f)] ?? "";
    if (!val) return requiredFields.includes(key(f)) ? t("required") : "";
    if ((f === "LastNameKh" || f === "FirstNameKh") && !isValidKhmerName(val)) return t("invalidNameKh");
    if ((f === "LastNameEn" || f === "FirstNameEn") && !isValidLatinName(val)) return t("invalidNameEn");
    if (f === "Dob" && isFutureDate(val)) return t("invalidDobFuture");
    if (f === "Dob" && isUnder18(val)) return t("invalidDobUnder18");
    if (f === "BecameDate" && !isValidBecameDate(val, form[key("Dob")] ?? "")) return t("invalidBecameDate");
    if (f === "IdExpiredDate" && !isValidIdDateRange(form[key("IdIssuedDate")] ?? "", val)) return t("invalidIdDates");
    if (f === "Phone" && !isValidPhone(val)) return t("invalidPhone");
    return "";
  };
  const inputCls = (f: string) =>
    cn("w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
      isUnchanged(f)
        ? "border-red-400 ring-2 ring-red-100"
        : fieldError(f)
        ? "border-red-400"
        : isFlagged(f)
        ? "border-orange-400 ring-2 ring-orange-100"
        : "border-slate-300");

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-6">
        {/* Names */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(["LastNameKh", "FirstNameKh", "LastNameEn", "FirstNameEn"] as const).map((f) => {
            const field = f;
            const isRequired = requiredFields.includes(key(field));
            return (
              <div key={f}>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t(field.charAt(0).toLowerCase() + field.slice(1) as Parameters<typeof t>[0])}
                  {isRequired && <span className="text-red-500 ml-0.5">*</span>}
                </label>
                <input
                  type="text"
                  value={form[key(field)] ?? ""}
                  onChange={(e) => set({ [key(field)]: e.target.value })}
                  onBlur={() => setTouched({ [key(field)]: true })}
                  className={inputCls(field)}
                />
                {fieldError(field) && <p className="mt-1 text-xs text-red-600">{fieldError(field)}</p>}
              </div>
            );
          })}
        </div>

        {/* Photo — moved to the right side (item 10) */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className="h-44 w-36 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-300 overflow-hidden">
            {photo ? (
              <img src={photo} alt="person" className="h-full w-full object-cover" />
            ) : (
              <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            )}
          </div>
          <label className="w-full inline-flex items-center justify-center gap-1.5 cursor-pointer rounded-lg bg-blue-500 py-1.5 text-xs font-medium text-white hover:bg-blue-600 transition-colors">
            <Upload className="h-3.5 w-3.5" />
            {t("uploadPhoto")}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setPhoto(URL.createObjectURL(f)); setPhotoName(f.name); setPhotoFile(f); } }} />
          </label>
        </div>
      </div>

      {/* DOB / Nationality / Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("dob")} <span className="text-red-500">*</span></label>
          <input type="date" max={maxDobFor18()} value={form[key("Dob")] ?? ""} onChange={(e) => set({ [key("Dob")]: e.target.value })} onBlur={() => setTouched({ [key("Dob")]: true })} className={inputCls("Dob")} />
          {fieldError("Dob") && <p className="mt-1 text-xs text-red-600">{fieldError("Dob")}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("nationality")} <span className="text-red-500">*</span></label>
          <SearchableSelect
            value={form[key("Nationality")] ?? ""}
            onChange={(code) => set({ [key("Nationality")]: code })}
            onBlur={() => setTouched({ [key("Nationality")]: true })}
            options={COUNTRIES}
            placeholder={t("select")}
            className={cn(inputCls("Nationality"), "bg-white")}
          />
          {fieldError("Nationality") && <p className="mt-1 text-xs text-red-600">{fieldError("Nationality")}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("gender")} <span className="text-red-500">*</span></label>
          <select value={form[key("Gender")] ?? ""} onChange={(e) => set({ [key("Gender")]: e.target.value })} onBlur={() => setTouched({ [key("Gender")]: true })} className={cn(inputCls("Gender"), "bg-white")}>
            <option value="">{t("select")}</option>
            <option value="M">{t("genderMale")}</option>
            <option value="F">{t("genderFemale")}</option>
          </select>
          {fieldError("Gender") && <p className="mt-1 text-xs text-red-600">{fieldError("Gender")}</p>}
        </div>
      </div>

      {/* ID Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <div className="mb-1.5 flex items-center gap-4">
            <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
              <input
                type="radio"
                name={key("IdType")}
                value="ID"
                checked={(form[key("IdType")] ?? "ID") === "ID"}
                onChange={() => set({ [key("IdType")]: "ID" })}
                className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500"
              />
              {t("idTypeId")}
            </label>
            <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
              <input
                type="radio"
                name={key("IdType")}
                value="PASSPORT"
                checked={form[key("IdType")] === "PASSPORT"}
                onChange={() => set({ [key("IdType")]: "PASSPORT" })}
                className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500"
              />
              {t("idTypePassport")}
            </label>
          </div>
          <input
            type="text"
            value={form[key("IdCard")] ?? ""}
            onChange={(e) => set({ [key("IdCard")]: e.target.value })}
            placeholder={form[key("IdType")] === "PASSPORT" ? t("passportPlaceholder") : t("idCardPlaceholder")}
            className={inputCls("IdCard")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("issueDate")}</label>
          <input type="date" value={form[key("IdIssuedDate")] ?? ""} onChange={(e) => set({ [key("IdIssuedDate")]: e.target.value })} onBlur={() => setTouched({ [key("IdIssuedDate")]: true })} className={inputCls("IdIssuedDate")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("expiryDate")}</label>
          <input type="date" value={form[key("IdExpiredDate")] ?? ""} onChange={(e) => set({ [key("IdExpiredDate")]: e.target.value })} onBlur={() => setTouched({ [key("IdExpiredDate")]: true })} className={inputCls("IdExpiredDate")} />
          {fieldError("IdExpiredDate") && <p className="mt-1 text-xs text-red-600">{fieldError("IdExpiredDate")}</p>}
        </div>
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("email")}</label>
          <input type="email" value={form[key("Email")] ?? ""} onChange={(e) => set({ [key("Email")]: e.target.value })} placeholder="email@example.com" className={inputCls("Email")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("phone")}</label>
          <div className={cn("flex items-center gap-2 rounded-lg border px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-blue-500", fieldError("Phone") ? "border-red-400" : "border-slate-300")}>
            <span className="text-base leading-none">🇰🇭</span>
            <span className="text-slate-400 text-xs">+855</span>
            <input type="tel" value={form[key("Phone")] ?? ""} onChange={(e) => set({ [key("Phone")]: e.target.value })} onBlur={() => setTouched({ [key("Phone")]: true })} placeholder="23 756 789" className="flex-1 outline-none text-sm bg-transparent" />
          </div>
          {fieldError("Phone") && <p className="mt-1 text-xs text-red-600">{fieldError("Phone")}</p>}
        </div>
      </div>

      {/* Date of Becoming — moved directly above the ID document upload (item 11) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t(prefix === "sh" ? "shBecameDate" : "becameDate")} <span className="text-red-500">*</span>
          </label>
          <input type="date" value={form[key("BecameDate")] ?? ""} onChange={(e) => set({ [key("BecameDate")]: e.target.value })} onBlur={() => setTouched({ [key("BecameDate")]: true })} className={inputCls("BecameDate")} />
          {fieldError("BecameDate") && <p className="mt-1 text-xs text-red-600">{fieldError("BecameDate")}</p>}
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
              {idDocs.length > 0 ? (
                <ul className="mt-1 space-y-0.5">
                  {idDocs.map((d, i) => (
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
                      <button type="button" onClick={() => setIdDocs((p) => p.filter((_, idx) => idx !== i))} className="ml-1 text-red-400 hover:text-red-600"><X className="h-3 w-3" /></button>
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
            <input type="file" accept=".pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setIdDocs((p) => [...p, { name: f.name, url: URL.createObjectURL(f), file: f }]); } e.target.value = ""; }} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}

// Every form field of a wizard step (the per-section update pages check
// these for changes). idType/shIdType are UI-only and never saved.
const SECTION_FIELDS: Record<number, (keyof FormData)[]> = (() => {
  const keys = (Object.keys(EMPTY) as (keyof FormData)[]).filter((k) => k !== "idType" && k !== "shIdType");
  const stepOf = (k: string) =>
    k.startsWith("company") || k.startsWith("registration") ? 1 : k.startsWith("sh") ? 2 : k === "agreementDate" ? 4 : 3;
  return { 1: keys.filter((k) => stepOf(k) === 1), 2: keys.filter((k) => stepOf(k) === 2), 3: keys.filter((k) => stepOf(k) === 3), 4: keys.filter((k) => stepOf(k) === 4) };
})();

type SectionDocs = {
  shPhotoDocId: number | null; shPhotoFile: File | null; shIdDocs: UploadedDoc[];
  ownerPhotoDocId: number | null; ownerPhotoFile: File | null; ownerIdDocs: UploadedDoc[];
  shareholderContractDocs: UploadedDoc[]; supportingDocs: UploadedDoc[];
};

// A comparable key for a step's uploads: saved document ids, plus any
// not-yet-uploaded files.
function sectionDocsKey(step: number, d: SectionDocs): string {
  const ids = (docs: UploadedDoc[]) => docs.map((doc) => doc.documentId ?? `new:${doc.name}`).sort().join(",");
  const photo = (id: number | null, file: File | null) => (file ? `new:${file.name}` : String(id ?? ""));
  if (step === 2) return `${photo(d.shPhotoDocId, d.shPhotoFile)}|${ids(d.shIdDocs)}`;
  if (step === 3) return `${photo(d.ownerPhotoDocId, d.ownerPhotoFile)}|${ids(d.ownerIdDocs)}`;
  if (step === 4) return `${ids(d.shareholderContractDocs)}|${ids(d.supportingDocs)}`;
  return "";
}

// `sectionOnly` (1-4): the detail page's per-section "Request To Update"
// buttons open just that step, without the step tabs or Previous/Next. The
// full request is still loaded and saved, so the payload stays complete.
export default function BeneficiaryRequestForm({ editId, sectionOnly }: { editId?: string; sectionOnly?: number } = {}) {
  const t = useTranslations("beneficiary.request");
  const router = useRouter();
  const pathname = usePathname() ?? "/en";
  const locale = pathname.split("/")[1] || "en";

  // Item 42: switching language re-mounts this component (the [locale]
  // route segment changes), which would otherwise wipe in-progress form
  // state. Persist to sessionStorage (same tab/session only) and restore via
  // lazy state initializers so a language switch doesn't lose what the user
  // typed. For a brand-new (non-edit) request this is the full initial
  // state; for an edit it's merged over the fetched record once that loads
  // (see loadExisting below).
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
  const [form, setForm] = useState<FormData>(EMPTY);
  const [ownerPhotoDocId, setOwnerPhotoDocId] = useState<number | null>(null);
  const [ownerPhoto, setOwnerPhoto] = useState<string | null>(null);
  const [ownerPhotoFile, setOwnerPhotoFile] = useState<File | null>(null);
  const [ownerPhotoName, setOwnerPhotoName] = useState<string | null>(null);
  const [ownerIdDocs, setOwnerIdDocs] = useState<UploadedDoc[]>([]);
  const [shPhotoDocId, setShPhotoDocId] = useState<number | null>(null);
  const [shPhoto, setShPhoto] = useState<string | null>(null);
  const [shPhotoFile, setShPhotoFile] = useState<File | null>(null);
  const [shPhotoName, setShPhotoName] = useState<string | null>(null);
  const [shIdDocs, setShIdDocs] = useState<UploadedDoc[]>([]);
  const [supportingDocs, setSupportingDocs] = useState<UploadedDoc[]>([]);
  const [shareholderContractDocs, setShareholderContractDocs] = useState<UploadedDoc[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [consentTouched, setConsentTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(!!editId);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [notAllowed, setNotAllowed] = useState(false);
  const [activeStep, setActiveStep] = useState(sectionOnly ?? 1);
  const [draftRestored, setDraftRestored] = useState(!editId ? false : true);
  const [returnReason, setReturnReason] = useState<string | null>(null);
  const [returnSteps, setReturnSteps] = useState<number[]>([]);
  const [flaggedFields, setFlaggedFields] = useState<string[]>([]);
  const [originalFlaggedValues, setOriginalFlaggedValues] = useState<Record<string, string>>({});
  // Approved values of the section being updated (sectionOnly mode), to
  // refuse an update that changes nothing.
  const [originalSection, setOriginalSection] = useState<{ form: FormData; docsKey: string } | null>(null);
  const [unchangedFields, setUnchangedFields] = useState<string[]>([]);
  const [loadedStatus, setLoadedStatus] = useState<string | null>(null);

  // Runs once after mount to apply any sessionStorage draft — deferred out of
  // the useState initializers above so the first client render matches the
  // server-rendered HTML (see the comment there).
  useEffect(() => {
    if (editId) return;
    const persistedDraft = readPersistedDraft(storageKey);
    if (persistedDraft) {
      setForm((f) => ({ ...f, ...persistedDraft.form }));
      setOwnerPhotoDocId(persistedDraft.ownerPhotoDocId ?? null);
      setOwnerPhoto(persistedDraft.ownerPhotoDocId ? documentDownloadUrl(persistedDraft.ownerPhotoDocId) : null);
      setOwnerPhotoName(persistedDraft.ownerPhotoName ?? null);
      setOwnerIdDocs(persistedDraft.ownerIdDocs ?? []);
      setShPhotoDocId(persistedDraft.shPhotoDocId ?? null);
      setShPhoto(persistedDraft.shPhotoDocId ? documentDownloadUrl(persistedDraft.shPhotoDocId) : null);
      setShPhotoName(persistedDraft.shPhotoName ?? null);
      setShIdDocs(persistedDraft.shIdDocs ?? []);
      setSupportingDocs(persistedDraft.supportingDocs ?? []);
      setShareholderContractDocs(persistedDraft.shareholderContractDocs ?? []);
      setConsentAgreed(!!persistedDraft.consentAgreed);
      setActiveStep(persistedDraft.activeStep ?? 1);
    }
    setDraftRestored(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the persisted snapshot in sync with in-progress edits. `file` is
  // stripped from doc entries since raw File objects aren't serializable —
  // only already-uploaded (documentId) or filename/preview info survives.
  const stripFile = (docs: UploadedDoc[]): PersistedDoc[] =>
    docs.map((d) => ({ name: d.name, url: d.url, documentId: d.documentId }));
  useEffect(() => {
    // Skip persisting until the mount-time draft restore above has settled
    // (otherwise it would overwrite the just-read draft with the pre-restore
    // empty defaults), and, for an edit, while the initial fetch is still in
    // flight (see loadExisting below) for the same reason.
    if (!draftRestored) return;
    if (editId && loading) return;
    try {
      const snapshot: PersistedDraft = {
        form,
        ownerPhotoName,
        shPhotoName,
        ownerPhotoDocId,
        shPhotoDocId,
        ownerIdDocs: stripFile(ownerIdDocs),
        shIdDocs: stripFile(shIdDocs),
        shareholderContractDocs: stripFile(shareholderContractDocs),
        supportingDocs: stripFile(supportingDocs),
        consentAgreed,
        activeStep,
      };
      sessionStorage.setItem(storageKey, JSON.stringify(snapshot));
    } catch {
      // ignore (e.g. private browsing storage quota)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, ownerPhotoName, shPhotoName, ownerPhotoDocId, shPhotoDocId, ownerIdDocs, shIdDocs, shareholderContractDocs, supportingDocs, consentAgreed, activeStep, editId, loading, draftRestored]);

  useEffect(() => {
    if (!editId) return;
    let cancelled = false;

    async function loadExisting() {
      try {
        const res = await fetch(`/api/portal/beneficiary/requests/${editId}`);
        if (cancelled) return;
        if (!res.ok) {
          setLoadError(t("editLoadError"));
          return;
        }
        const loaded = await res.json();
        // A saved update to an APPROVED request lives in `pendingUpdate`
        // (the approved values stay untouched) — edit the draft, not them.
        const data = loaded.updateStatus === "DRAFTED" && loaded.pendingUpdate
          ? { ...loaded, ...loaded.pendingUpdate }
          : loaded;
        if (
          sectionOnly
            ? data.status !== "APPROVED"
            : data.status !== "APPROVED" && data.status !== "RETURNED" && data.status !== "DRAFT"
        ) {
          setNotAllowed(true);
          return;
        }
        setLoadedStatus(data.status);
        const dateOnly = (iso: string | null) => (iso ? iso.slice(0, 10) : "");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const toForm = (data: any): FormData => ({
          companyNameKh: data.companyNameKh ?? "", companyNameEn: data.companyNameEn ?? "",
          registrationNo: data.registrationNo ?? "", registrationDate: dateOnly(data.registrationDate),
          companyProvince: data.companyProvince ?? "", companyDistrict: data.companyDistrict ?? "",
          companyCommune: data.companyCommune ?? "", companyVillage: data.companyVillage ?? "",
          companyStreet: data.companyStreet ?? "", companyHouse: data.companyHouse ?? "",
          companyPhone: data.companyPhone ?? "", companyOfficePhone: data.companyOfficePhone ?? "",
          companyEmail: data.companyEmail ?? "",
          lastNameKh: data.ownerLastNameKh ?? "", firstNameKh: data.ownerFirstNameKh ?? "",
          lastNameEn: data.ownerLastNameEn ?? "", firstNameEn: data.ownerFirstNameEn ?? "",
          dob: dateOnly(data.ownerDob), becameDate: dateOnly(data.ownerBecameDate), nationality: data.ownerNationality ?? "", gender: data.ownerGender ?? "",
          // idType/shIdType (ID Card vs Passport) aren't persisted server-side
          // yet — always resets to "ID" on load, see the note in saveRequest().
          idType: "ID", idCard: data.ownerIdCard ?? "", idIssuedDate: dateOnly(data.ownerIdIssuedDate), idExpiredDate: dateOnly(data.ownerIdExpiredDate),
          email: data.ownerEmail ?? "", phone: data.ownerPhone ?? "", shareAmount: data.shareAmount ?? "",
          shLastNameKh: data.shLastNameKh ?? "", shFirstNameKh: data.shFirstNameKh ?? "",
          shLastNameEn: data.shLastNameEn ?? "", shFirstNameEn: data.shFirstNameEn ?? "",
          shDob: dateOnly(data.shDob), shBecameDate: dateOnly(data.shBecameDate), shNationality: data.shNationality ?? "", shGender: data.shGender ?? "",
          shIdType: "ID", shIdCard: data.shIdCard ?? "", shIdIssuedDate: dateOnly(data.shIdIssuedDate), shIdExpiredDate: dateOnly(data.shIdExpiredDate),
          shEmail: data.shEmail ?? "", shPhone: data.shPhone ?? "",
          agreementDate: dateOnly(data.agreementDate),
        });
        const mappedForm = toForm(data);
        if (data.status === "RETURNED" && data.rejectionReason) {
          setReturnReason(data.rejectionReason);
          const { fields, steps } = guessFieldsFromReason(data.rejectionReason);
          setReturnSteps(steps);
          if (steps.length > 0) {
            setActiveStep(steps[0]);
            setFlaggedFields(fields);
            const snapshot: Record<string, string> = {};
            fields.forEach((f) => { snapshot[f] = mappedForm[f as keyof FormData] ?? ""; });
            setOriginalFlaggedValues(snapshot);
          }
        }
        // Real uploaded documents (item 39) — grouped by category into the
        // same shape the wizard already works with, using the authenticated
        // download proxy as `url` so photos/previews render immediately.
        type ApiDocument = { id: number; category: DocCategory; media: { filename: string } };
        const documents = (data.documents ?? []) as ApiDocument[];
        const byCategory = (cat: DocCategory) =>
          documents
            .filter((d) => d.category === cat)
            .map((d) => ({ name: d.media.filename, documentId: d.id, url: documentDownloadUrl(d.id) }));
        const shPhotoDoc = byCategory("SH_PHOTO")[0];
        const ownerPhotoDoc = byCategory("OWNER_PHOTO")[0];
        if (sectionOnly) {
          // `loaded`, not `data`: an update draft's values already count as changes.
          setOriginalSection({
            form: toForm(loaded),
            docsKey: sectionDocsKey(sectionOnly, {
              shPhotoDocId: shPhotoDoc?.documentId ?? null, shPhotoFile: null, shIdDocs: byCategory("SH_ID_DOC"),
              ownerPhotoDocId: ownerPhotoDoc?.documentId ?? null, ownerPhotoFile: null, ownerIdDocs: byCategory("OWNER_ID_DOC"),
              shareholderContractDocs: byCategory("SHAREHOLDER_CONTRACT"), supportingDocs: byCategory("OTHER"),
            }),
          });
        }

        // If a language switch remounted this page mid-edit, restore the
        // in-progress (unsaved) edits over the freshly-fetched server data
        // (item 42).
        const saved = readPersistedDraft(storageKey);
        setForm(saved ? { ...mappedForm, ...saved.form } : mappedForm);
        setOwnerPhotoName((saved ? saved.ownerPhotoName : ownerPhotoDoc?.name) ?? null);
        setOwnerPhotoDocId(saved ? saved.ownerPhotoDocId : (ownerPhotoDoc?.documentId ?? null));
        setOwnerPhoto(saved?.ownerPhotoDocId ? documentDownloadUrl(saved.ownerPhotoDocId) : (ownerPhotoDoc ? ownerPhotoDoc.url : null));
        setShPhotoName((saved ? saved.shPhotoName : shPhotoDoc?.name) ?? null);
        setShPhotoDocId(saved ? saved.shPhotoDocId : (shPhotoDoc?.documentId ?? null));
        setShPhoto(saved?.shPhotoDocId ? documentDownloadUrl(saved.shPhotoDocId) : (shPhotoDoc ? shPhotoDoc.url : null));
        setOwnerIdDocs(saved?.ownerIdDocs ?? byCategory("OWNER_ID_DOC"));
        setShIdDocs(saved?.shIdDocs ?? byCategory("SH_ID_DOC"));
        setShareholderContractDocs(saved?.shareholderContractDocs ?? byCategory("SHAREHOLDER_CONTRACT"));
        setSupportingDocs(saved?.supportingDocs ?? byCategory("OTHER"));
        setConsentAgreed(saved ? !!saved.consentAgreed : !!data.consentAgreed);
        if (saved?.activeStep && !sectionOnly) setActiveStep(saved.activeStep);
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

  const clearResolvedUnchangedFields = (patch: Record<string, string>) => {
    if (unchangedFields.length === 0) return;
    const resolved = Object.keys(patch).filter((k) => unchangedFields.includes(k) && patch[k] !== originalFlaggedValues[k]);
    if (resolved.length > 0) setUnchangedFields((prev) => prev.filter((f) => !resolved.includes(f)));
  };
  const set = (patch: Partial<FormData>) => {
    clearResolvedUnchangedFields(patch as Record<string, string>);
    setForm((p) => ({ ...p, ...patch }));
  };
  const setAny = (patch: Record<string, string>) => {
    clearResolvedUnchangedFields(patch);
    setForm((p) => ({ ...p, ...patch }));
  };
  const setTouchedPatch = (patch: Record<string, boolean>) => setTouched((p) => ({ ...p, ...patch }));

  const fillFakeData = () => {
    const fake = generateFakeFormData();
    setForm(fake);
    setOwnerPhoto(FAKE_PROFILE_PHOTO);
    setOwnerPhotoName("profile-manager.jpg");
    setShPhoto(FAKE_PROFILE_PHOTO);
    setShPhotoName("profile-manager.jpg");
    const ownerIdFile = makeFakePdfFile(FAKE_ID_DOC_NAME);
    const shIdFile = makeFakePdfFile(FAKE_ID_DOC_NAME);
    const contractFile = makeFakePdfFile(FAKE_CONTRACT_DOC_NAME);
    const otherFile = makeFakePdfFile(FAKE_OTHER_DOC_NAME);
    setOwnerIdDocs([{ name: ownerIdFile.name, url: URL.createObjectURL(ownerIdFile), file: ownerIdFile }]);
    setShIdDocs([{ name: shIdFile.name, url: URL.createObjectURL(shIdFile), file: shIdFile }]);
    setShareholderContractDocs([{ name: contractFile.name, url: URL.createObjectURL(contractFile), file: contractFile }]);
    setSupportingDocs([{ name: otherFile.name, url: URL.createObjectURL(otherFile), file: otherFile }]);
    setConsentAgreed(true);
  };

  const STEP_OF_FIELD: Record<string, number> = {
    companyNameEn: 1, registrationNo: 1, registrationDate: 1,
    companyProvince: 1, companyDistrict: 1, companyCommune: 1, companyVillage: 1, companyStreet: 1, companyHouse: 1,
    companyPhone: 1, companyEmail: 1,
    shLastNameEn: 2, shFirstNameEn: 2, shDob: 2, shBecameDate: 2, shNationality: 2, shGender: 2,
    lastNameEn: 3, firstNameEn: 3, dob: 3, becameDate: 3, nationality: 3, gender: 3, shareAmount: 3,
    agreementDate: 4,
  };

  const STEP_REQUIRED_FIELDS: Record<number, (keyof FormData)[]> = Object.entries(STEP_OF_FIELD).reduce(
    (acc, [field, step]) => {
      acc[step] = acc[step] ?? [];
      acc[step].push(field as keyof FormData);
      return acc;
    },
    {} as Record<number, (keyof FormData)[]>
  );

  // Extra per-step validation beyond "is this field non-empty": name
  // character sets, date rules, phone format, and required uploads
  // (items 30-33). Feeds both the stepper/Next-button gating and the
  // final submit-time check below.
  const stepExtraValid = (step: number): boolean => {
    if (step === 1) {
      return isValidPhone(form.companyPhone) && isValidPhone(form.companyOfficePhone);
    }
    if (step === 2) {
      return (
        isValidKhmerName(form.shLastNameKh) &&
        isValidKhmerName(form.shFirstNameKh) &&
        isValidLatinName(form.shLastNameEn) &&
        isValidLatinName(form.shFirstNameEn) &&
        !isFutureDate(form.shDob) &&
        !isUnder18(form.shDob) &&
        isValidBecameDate(form.shBecameDate, form.shDob) &&
        isValidIdDateRange(form.shIdIssuedDate, form.shIdExpiredDate) &&
        isValidPhone(form.shPhone) &&
        shIdDocs.length > 0
      );
    }
    if (step === 3) {
      return (
        isValidKhmerName(form.lastNameKh) &&
        isValidKhmerName(form.firstNameKh) &&
        isValidLatinName(form.lastNameEn) &&
        isValidLatinName(form.firstNameEn) &&
        !isFutureDate(form.dob) &&
        !isUnder18(form.dob) &&
        isValidBecameDate(form.becameDate, form.dob) &&
        isValidIdDateRange(form.idIssuedDate, form.idExpiredDate) &&
        isValidPhone(form.phone) &&
        ownerIdDocs.length > 0
      );
    }
    if (step === 4) {
      return shareholderContractDocs.length > 0;
    }
    return true;
  };

  const isStepComplete = (step: number) =>
    (STEP_REQUIRED_FIELDS[step] ?? []).every((f) => !!form[f]) && stepExtraValid(step);

  // In single-section mode a problem in another step can't be shown on this
  // page, so say so instead of silently switching to a hidden step.
  const focusStep = (step: number) => {
    if (sectionOnly && step !== sectionOnly) {
      toast.error(t("otherSectionIncomplete", { section: t(`step${step}Title` as "step1Title") }));
      return;
    }
    setActiveStep(step);
  };

  const sectionHasChanges = () => {
    if (!sectionOnly || !originalSection) return true;
    const fieldChanged = SECTION_FIELDS[sectionOnly].some((k) => form[k] !== originalSection.form[k]);
    const docsKey = sectionDocsKey(sectionOnly, {
      shPhotoDocId, shPhotoFile, shIdDocs, ownerPhotoDocId, ownerPhotoFile, ownerIdDocs, shareholderContractDocs, supportingDocs,
    });
    return fieldChanged || docsKey !== originalSection.docsKey;
  };

  const validateAndFocusStep = () => {
    if (!sectionHasChanges()) {
      toast.error(t("noChanges", { section: t(`step${sectionOnly}Title` as "step1Title") }));
      return false;
    }
    const required: (keyof FormData)[] = [
      "companyNameEn", "registrationNo", "registrationDate",
      "companyProvince", "companyDistrict", "companyCommune", "companyVillage", "companyStreet", "companyHouse",
      "companyPhone", "companyEmail",
      "lastNameEn", "firstNameEn", "dob", "becameDate", "nationality", "gender", "shareAmount",
      "shLastNameEn", "shFirstNameEn", "shDob", "shBecameDate", "shNationality", "shGender",
      "agreementDate",
    ];
    const t2: Record<string, boolean> = {};
    required.forEach((k) => (t2[k] = true));
    setTouched(t2);
    setConsentTouched(true);
    const missing = required.filter((k) => !form[k]);
    if (missing.length > 0) {
      const missingSteps = missing.map((k) => STEP_OF_FIELD[k] ?? 1);
      focusStep(Math.min(...missingSteps));
      return false;
    }
    for (const step of [1, 2, 3, 4]) {
      if (!stepExtraValid(step)) {
        focusStep(step);
        return false;
      }
    }
    if (flaggedFields.length > 0) {
      const stillUnchanged = flaggedFields.filter((f) => form[f as keyof FormData] === originalFlaggedValues[f]);
      if (stillUnchanged.length > 0) {
        setUnchangedFields(stillUnchanged);
        if (returnSteps.length > 0) focusStep(returnSteps[0]);
        toast.error(t("unchangedFlaggedFieldError"));
        return false;
      }
    }
    if (!consentAgreed) {
      focusStep(4);
      return false;
    }
    return true;
  };

  // Updating an already-approved request: "Save Drafted" keeps the edit as a
  // draft (request stays Approved), only "Request To Update" submits it.
  const isApprovedUpdate = !!editId && loadedStatus === "APPROVED";

  const saveRequest = async (asDraft = false): Promise<string | null> => {
    const url = editId ? `/api/portal/beneficiary/requests/${editId}` : "/api/portal/beneficiary/requests";
    // Document/photo attachments are no longer sent inline here — they're
    // real uploads (item 39), handled by uploadPendingDocuments() once we
    // have a requestId (see handleSaveDraft/handleSubmitRequest below).
    // idType/shIdType (ID Card vs Passport radio) are UI-only — the API's
    // BeneficiaryRequestFieldsDto has no matching columns yet, and its
    // ValidationPipe rejects unknown fields outright, so these must not be
    // sent.
    const { idType, shIdType, ...formForApi } = form;
    void idType;
    void shIdType;
    const payload = {
      ...formForApi,
      consentAgreed,
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
    return editId ?? saved.id;
  };

  // Item 39: upload any locally-picked-but-not-yet-uploaded files now that
  // we have a real requestId to attach them to. Already-uploaded entries
  // (documentId set) are skipped. Best-effort: a failed attachment doesn't
  // block the save that just succeeded — it just stays pending and retries
  // on the next save.
  const uploadPendingDocuments = async (requestId: string) => {
    const uploadArray = async (docs: UploadedDoc[], category: DocCategory): Promise<UploadedDoc[]> =>
      Promise.all(
        docs.map(async (d) => {
          if (!d.file || d.documentId) return d;
          try {
            const { documentId } = await uploadDocument(requestId, category, d.file);
            return { name: d.name, documentId, url: documentDownloadUrl(documentId) };
          } catch {
            toast.error(t("submitError"));
            return d;
          }
        }),
      );

    const uploadPhoto = async (
      file: File | null,
      category: DocCategory,
      setDocId: (id: number) => void,
      setPreviewUrl: (url: string) => void,
      clearFile: () => void,
    ) => {
      if (!file) return;
      try {
        const { documentId } = await uploadDocument(requestId, category, file);
        setDocId(documentId);
        setPreviewUrl(documentDownloadUrl(documentId));
        clearFile();
      } catch {
        toast.error(t("submitError"));
      }
    };

    const [newShIdDocs, newOwnerIdDocs, newContractDocs, newOtherDocs] = await Promise.all([
      uploadArray(shIdDocs, "SH_ID_DOC"),
      uploadArray(ownerIdDocs, "OWNER_ID_DOC"),
      uploadArray(shareholderContractDocs, "SHAREHOLDER_CONTRACT"),
      uploadArray(supportingDocs, "OTHER"),
      uploadPhoto(shPhotoFile, "SH_PHOTO", setShPhotoDocId, setShPhoto, () => setShPhotoFile(null)),
      uploadPhoto(ownerPhotoFile, "OWNER_PHOTO", setOwnerPhotoDocId, setOwnerPhoto, () => setOwnerPhotoFile(null)),
    ]);
    setShIdDocs(newShIdDocs);
    setOwnerIdDocs(newOwnerIdDocs);
    setShareholderContractDocs(newContractDocs);
    setSupportingDocs(newOtherDocs);
  };

  const handleSaveDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAndFocusStep()) return;

    setSubmitError(null);
    setSubmitting(true);
    try {
      // Editing an already-reviewed (APPROVED/RETURNED) request validates
      // required documents inline, as part of the same PATCH that saves the
      // fields (see editApprovedOrReturned server-side) — so any newly
      // attached files must be uploaded first, or that check still sees the
      // pre-edit document set and 400s even though the user just attached
      // what was missing.
      if (editId && loadedStatus !== "DRAFT") {
        await uploadPendingDocuments(editId);
      }
      const id = await saveRequest(true);
      if (!id) return;
      if (!editId || loadedStatus === "DRAFT") {
        await uploadPendingDocuments(id);
      }
      clearPersisted();
      toast.success(editId ? t("draftUpdated") : t("draftSaved"));
      router.push(editId ? `/${locale}/portal/beneficiary/all-requests/${id}` : `/${locale}/portal/beneficiary/all-requests`);
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
      // See the matching comment in handleSaveDraft: editing an
      // already-reviewed request checks required documents inline in the
      // same PATCH that saves the fields, so new attachments must upload
      // before that call, not after.
      if (editId && loadedStatus !== "DRAFT") {
        await uploadPendingDocuments(editId);
      }
      const id = await saveRequest();
      if (!id) return;
      if (!editId || loadedStatus === "DRAFT") {
        await uploadPendingDocuments(id);
      }

      // A brand-new request or a continued draft (item 37) both still need
      // the separate "submit" transition (DRAFT -> PENDING). Editing an
      // already-reviewed (APPROVED/RETURNED) request transitions status as
      // part of saveRequest() itself, so no extra submit call there.
      if (!editId || loadedStatus === "DRAFT") {
        const submitRes = await fetch(`/api/portal/beneficiary/requests/${id}`, {
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
      router.push(`/${locale}/portal/beneficiary/all-requests/${id}`);
    } catch {
      setSubmitError(t("submitError"));
      toast.error(t("submitError"));
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = (key: keyof FormData) =>
    cn("w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
      unchangedFields.includes(key)
        ? "border-red-400 ring-2 ring-red-100"
        : fieldError(key)
        ? "border-red-400"
        : flaggedFields.includes(key)
        ? "border-orange-400 ring-2 ring-orange-100"
        : "border-slate-300");

  const fieldError = (key: keyof FormData) => {
    if (unchangedFields.includes(key)) return t("unchangedFieldInline");
    if (!touched[key]) return "";
    const val = form[key];
    if (!val) return t("required");
    if ((key === "companyPhone" || key === "companyOfficePhone") && !isValidPhone(val)) return t("invalidPhone");
    return "";
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
            steps={[1, 2, 3, 4].map((n) => ({
              number: n,
              title: t(`step${n}Title` as "step1Title"),
              disabled: false,
              flagged: returnSteps.includes(n),
            }))}
            activeStep={activeStep}
            onChange={setActiveStep}
          />
          )}

        {/* Step 1 — Company Information */}
        <StepPanel stepNumber={1} activeStep={activeStep}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t("companyNameKh")}</label>
              <input type="text" value={form.companyNameKh} onChange={(e) => set({ companyNameKh: e.target.value })} placeholder="ឈ្មោះក្រុមហ៊ុន" className={inputCls("companyNameKh")} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t("companyNameEn")} <span className="text-red-500">*</span></label>
              <input type="text" value={form.companyNameEn} onChange={(e) => set({ companyNameEn: e.target.value })} onBlur={() => setTouched((p) => ({ ...p, companyNameEn: true }))} placeholder="Company Name" className={inputCls("companyNameEn")} />
              {fieldError("companyNameEn") && <p className="mt-1 text-xs text-red-600">{fieldError("companyNameEn")}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t("registrationNo")} <span className="text-red-500">*</span></label>
              <input type="text" value={form.registrationNo} onChange={(e) => set({ registrationNo: e.target.value })} onBlur={() => setTouched((p) => ({ ...p, registrationNo: true }))} placeholder="e.g. CO-20001" className={inputCls("registrationNo")} />
              {fieldError("registrationNo") && <p className="mt-1 text-xs text-red-600">{fieldError("registrationNo")}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t("registrationDate")} <span className="text-red-500">*</span></label>
              <input type="date" value={form.registrationDate} onChange={(e) => set({ registrationDate: e.target.value })} onBlur={() => setTouched((p) => ({ ...p, registrationDate: true }))} className={inputCls("registrationDate")} />
              {fieldError("registrationDate") && <p className="mt-1 text-xs text-red-600">{fieldError("registrationDate")}</p>}
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-slate-200">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-3">{t("addressLabel")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AddressCascadeSelects
                values={{ province: form.companyProvince, district: form.companyDistrict, commune: form.companyCommune, village: form.companyVillage }}
                onChange={(patch) => set(Object.fromEntries(Object.entries(patch).map(([k, v]) => [ADDRESS_FORM_KEYS[k as AddressField], v])))}
                onBlur={(f) => setTouched((p) => ({ ...p, [ADDRESS_FORM_KEYS[f]]: true }))}
                labels={{ province: t("province"), district: t("district"), commune: t("commune"), village: t("village") }}
                className={(f) => inputCls(ADDRESS_FORM_KEYS[f])}
                error={(f) => fieldError(ADDRESS_FORM_KEYS[f])}
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("street")} <span className="text-red-500">*</span></label>
                <input type="text" value={form.companyStreet} onChange={(e) => set({ companyStreet: e.target.value })} onBlur={() => setTouched((p) => ({ ...p, companyStreet: true }))} className={inputCls("companyStreet")} />
                {fieldError("companyStreet") && <p className="mt-1 text-xs text-red-600">{fieldError("companyStreet")}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("houseNo")} <span className="text-red-500">*</span></label>
                <input type="text" value={form.companyHouse} onChange={(e) => set({ companyHouse: e.target.value })} onBlur={() => setTouched((p) => ({ ...p, companyHouse: true }))} className={inputCls("companyHouse")} />
                {fieldError("companyHouse") && <p className="mt-1 text-xs text-red-600">{fieldError("companyHouse")}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("companyPhone")} <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="text-base leading-none">🇰🇭</span>
                  <span className="text-slate-400 text-xs">+855</span>
                  <input type="tel" value={form.companyPhone} onChange={(e) => set({ companyPhone: e.target.value })} onBlur={() => setTouched((p) => ({ ...p, companyPhone: true }))} placeholder="23 756 789" className="flex-1 outline-none text-sm bg-transparent" />
                </div>
                {fieldError("companyPhone") && <p className="mt-1 text-xs text-red-600">{fieldError("companyPhone")}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("companyOfficePhone")}</label>
                <div className={cn("flex items-center gap-2 rounded-lg border px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-blue-500", fieldError("companyOfficePhone") ? "border-red-400" : "border-slate-300")}>
                  <span className="text-base leading-none">🇰🇭</span>
                  <span className="text-slate-400 text-xs">+855</span>
                  <input type="tel" value={form.companyOfficePhone} onChange={(e) => set({ companyOfficePhone: e.target.value })} onBlur={() => setTouched((p) => ({ ...p, companyOfficePhone: true }))} placeholder="23 756 789" className="flex-1 outline-none text-sm bg-transparent" />
                </div>
                {fieldError("companyOfficePhone") && <p className="mt-1 text-xs text-red-600">{fieldError("companyOfficePhone")}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("companyEmail")} <span className="text-red-500">*</span></label>
                <input type="email" value={form.companyEmail} onChange={(e) => set({ companyEmail: e.target.value })} onBlur={() => setTouched((p) => ({ ...p, companyEmail: true }))} placeholder="email@example.com" className={inputCls("companyEmail")} />
                {fieldError("companyEmail") && <p className="mt-1 text-xs text-red-600">{fieldError("companyEmail")}</p>}
              </div>
            </div>
          </div>
        </StepPanel>

        {/* Step 2 — Nominee Shareholder Information */}
        <StepPanel stepNumber={2} activeStep={activeStep}>
          <PersonFields
            t={t}
            prefix="sh"
            form={form as unknown as Record<string, string>}
            set={setAny}
            touched={touched}
            setTouched={setTouchedPatch}
            photo={shPhoto}
            setPhoto={setShPhoto}
            setPhotoName={setShPhotoName}
            setPhotoFile={setShPhotoFile}
            idDocs={shIdDocs}
            setIdDocs={setShIdDocs}
            requiredFields={["shLastNameEn", "shFirstNameEn", "shDob", "shBecameDate", "shNationality", "shGender"]}
            flaggedFields={flaggedFields}
            unchangedFields={unchangedFields}
          />
        </StepPanel>

        {/* Step 3 — Beneficial Owner Information */}
        <StepPanel stepNumber={3} activeStep={activeStep}>
          <PersonFields
            t={t}
            prefix=""
            form={form as unknown as Record<string, string>}
            set={setAny}
            touched={touched}
            setTouched={setTouchedPatch}
            photo={ownerPhoto}
            setPhoto={setOwnerPhoto}
            setPhotoName={setOwnerPhotoName}
            setPhotoFile={setOwnerPhotoFile}
            idDocs={ownerIdDocs}
            setIdDocs={setOwnerIdDocs}
            requiredFields={["lastNameEn", "firstNameEn", "dob", "becameDate", "nationality", "gender"]}
            flaggedFields={flaggedFields}
            unchangedFields={unchangedFields}
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
                    value={form.shareAmount}
                    onChange={(e) => set({ shareAmount: e.target.value })}
                    onBlur={() => setTouched((p) => ({ ...p, shareAmount: true }))}
                    placeholder="e.g. 1000"
                    className={inputCls("shareAmount")}
                  />
                  {fieldError("shareAmount") && <p className="mt-1 text-xs text-red-600">{fieldError("shareAmount")}</p>}
                </div>
              </div>
            }
          />
        </StepPanel>

        {/* Step 4 — Agreement of Nominees and Beneficial Owner */}
        <StepPanel stepNumber={4} activeStep={activeStep}>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-slate-700">{t("shareholderContractLabel")} <span className="text-red-500">*</span></p>
                  <p className="text-xs text-slate-400 mt-0.5">{t("supportingDocHint")}</p>
                  {shareholderContractDocs.length > 0 ? (
                    <ul className="mt-1 space-y-0.5">
                      {shareholderContractDocs.map((d, i) => (
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
                          <button type="button" onClick={() => setShareholderContractDocs((p) => p.filter((_, idx) => idx !== i))} className="ml-1 text-red-400 hover:text-red-600"><X className="h-3 w-3" /></button>
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
                <input type="file" accept=".pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) setShareholderContractDocs((p) => [...p, { name: f.name, url: URL.createObjectURL(f), file: f }]); e.target.value = ""; }} className="hidden" />
              </label>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-slate-700">{t("otherDocsLabel")}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t("supportingDocHint")}</p>
                  {supportingDocs.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {supportingDocs.map((d, i) => (
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
                          <button type="button" onClick={() => setSupportingDocs((p) => p.filter((_, idx) => idx !== i))} className="ml-1 text-red-400 hover:text-red-600"><X className="h-3 w-3" /></button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <label className="inline-flex items-center gap-1.5 cursor-pointer flex-shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <Paperclip className="h-3.5 w-3.5" />
                {t("attach")}
                <input type="file" accept=".pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) setSupportingDocs((p) => [...p, { name: f.name, url: URL.createObjectURL(f), file: f }]); e.target.value = ""; }} className="hidden" />
              </label>
            </div>

            <div>
              <div className="inline-flex flex-col w-full sm:w-auto">
                <label className="block text-sm font-medium text-slate-700 mb-1 whitespace-nowrap">{t("agreementDate")} <span className="text-red-500">*</span></label>
                <input type="date" value={form.agreementDate ?? ""} onChange={(e) => set({ agreementDate: e.target.value })} onBlur={() => setTouched((p) => ({ ...p, agreementDate: true }))} className={cn(inputCls("agreementDate"), "sm:w-full")} />
                {fieldError("agreementDate") && <p className="mt-1 text-xs text-red-600">{fieldError("agreementDate")}</p>}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <label className="flex items-start gap-3 cursor-pointer pt-4">
                <input
                  type="checkbox"
                  checked={consentAgreed}
                  onChange={(e) => { setConsentAgreed(e.target.checked); setConsentTouched(true); }}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 accent-blue-600"
                />
                <span className="text-sm text-slate-700">{t("consentText")}</span>
              </label>
              {consentTouched && !consentAgreed && (
                <p className="mt-2 text-xs text-red-600">{t("consentRequired")}</p>
              )}
            </div>
          </div>
        </StepPanel>
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

          {!sectionOnly && activeStep < 4 ? (
            <button
              type="button"
              onClick={() => setActiveStep((s) => Math.min(4, s + 1))}
              disabled={!isStepComplete(activeStep)}
              className="order-3 sm:order-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t("next")}
            </button>
          ) : (
            <div className="order-3 sm:order-3 flex flex-col sm:flex-row items-stretch gap-3">
              <button
                type="button"
                onClick={handleSubmitRequest}
                disabled={submitting || !consentAgreed}
                className="order-1 sm:order-3 inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                {submitting ? t("submittingRequest") : isApprovedUpdate ? t("requestToUpdate") : t("submitRequest")}
              </button>
              <button
                type="submit"
                disabled={submitting || !consentAgreed}
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
