"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft, FileText, Loader2, Paperclip, RotateCcw, Save, Send, Sparkles, Upload, X, XCircle } from "lucide-react";
import { toast } from "sonner";
import { cn, splitReasonItems } from "@/lib/utils";

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

const PROVINCES_KH = [
  "ភ្នំពេញ", "កណ្តាល", "កំពង់ចាម", "កំពង់ឆ្នាំង", "កំពង់ស្ពឺ", "កំពង់ធំ", "កំពត",
  "កោះកុង", "ក្រចេះ", "មណ្ឌលគិរី", "ឧត្តរមានជ័យ", "បន្ទាយមានជ័យ", "បាត់ដំបង",
  "ព្រៃវែង", "ព្រះវិហារ", "ពោធិ៍សាត់", "រតនគិរី", "សៀមរាប", "ស្ទឹងត្រែង", "ស្វាយរៀង",
  "តាកែវ", "ត្បូងឃ្មុំ", "ប៉ៃលិន", "ព្រះសីហនុ",
];

type FormData = {
  /* Step 1 — Company */
  companyNameKh: string; companyNameEn: string; registrationNo: string; registrationDate: string;
  companyProvince: string; companyDistrict: string; companyCommune: string; companyVillage: string;
  companyStreet: string; companyHouse: string; companyPhone: string; companyOfficePhone: string; companyEmail: string;
  /* Step 2 — Beneficiary Owner */
  lastNameKh: string; firstNameKh: string; lastNameEn: string; firstNameEn: string;
  dob: string; becameDate: string; nationality: string; gender: string;
  idCard: string; idIssuedDate: string; idExpiredDate: string;
  email: string; phone: string; shareAmount: string;
  /* Step 3 — Shareholder */
  shLastNameKh: string; shFirstNameKh: string; shLastNameEn: string; shFirstNameEn: string;
  shDob: string; shBecameDate: string; shNationality: string; shGender: string;
  shIdCard: string; shIdIssuedDate: string; shIdExpiredDate: string;
  shEmail: string; shPhone: string;
};

const EMPTY: FormData = {
  companyNameKh: "", companyNameEn: "", registrationNo: "", registrationDate: "",
  companyProvince: "", companyDistrict: "", companyCommune: "", companyVillage: "",
  companyStreet: "", companyHouse: "", companyPhone: "", companyOfficePhone: "", companyEmail: "",
  lastNameKh: "", firstNameKh: "", lastNameEn: "", firstNameEn: "",
  dob: "", becameDate: "", nationality: "", gender: "", idCard: "", idIssuedDate: "", idExpiredDate: "",
  email: "", phone: "", shareAmount: "",
  shLastNameKh: "", shFirstNameKh: "", shLastNameEn: "", shFirstNameEn: "",
  shDob: "", shBecameDate: "", shNationality: "", shGender: "", shIdCard: "", shIdIssuedDate: "", shIdExpiredDate: "",
  shEmail: "", shPhone: "",
};

type UploadedDoc = { name: string };

const FAKE_FIRST_KH = ["សុខា", "ដារា", "សុភា", "វិចិត្រ", "ចន្ថា"];
const FAKE_LAST_KH = ["ចាន់", "សាន", "គឹម", "លី", "អ៊ូច"];
const FAKE_FIRST_EN = ["Sokha", "Dara", "Sophea", "Vichet", "Chantha"];
const FAKE_LAST_EN = ["Chan", "San", "Kim", "Ly", "Ouch"];
const NATIONALITIES = ["KH", "CN", "TH", "VN"];
const GENDERS = ["M", "F"];

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
const FAKE_ID_DOC_NAME = "sample_passport.jpg";
const FAKE_CONTRACT_DOC_NAME = "Nominee shareholder agreement KHM.pdf";
const FAKE_OTHER_DOC_NAME = "This is  other documents.pdf";

function generateFakeFormData(): FormData {
  const companyName = `Sample Trading ${randomDigits(3)}`;
  return {
    companyNameKh: "ក្រុមហ៊ុន សំណាកគំរូ",
    companyNameEn: companyName,
    registrationNo: `CO-${randomDigits(5)}`,
    registrationDate: randomDateBetween(2015, 2024),
    companyProvince: randomOf(PROVINCES_KH),
    companyDistrict: "ស្រុកសាកល្បង",
    companyCommune: "ឃុំសាកល្បង",
    companyVillage: "ភូមិសាកល្បង",
    companyStreet: `ផ្លូវលេខ ${randomDigits(2)}`,
    companyHouse: `#${randomDigits(3)}`,
    companyPhone: `${Math.floor(Math.random() * 90) + 10} ${randomDigits(3)} ${randomDigits(3)}`,
    companyOfficePhone: `${Math.floor(Math.random() * 90) + 10} ${randomDigits(3)} ${randomDigits(3)}`,
    companyEmail: `${companyName.toLowerCase().replace(/\s/g, "")}@example.com`,
    shareAmount: String(Math.floor(Math.random() * 9000) + 1000),
    ...generateFakePerson(""),
    ...generateFakePerson("sh"),
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
  const fieldError = (f: string) =>
    isUnchanged(f) ? t("unchangedFieldInline") : touched[key(f)] && !form[key(f)] ? t("required") : "";
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
        {/* Photo */}
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
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setPhoto(URL.createObjectURL(f)); setPhotoName(f.name); } }} />
          </label>
        </div>

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
                  onBlur={() => isRequired && setTouched({ [key(field)]: true })}
                  className={inputCls(field)}
                />
                {fieldError(field) && <p className="mt-1 text-xs text-red-600">{fieldError(field)}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* DOB / Became Date / Nationality / Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("dob")} <span className="text-red-500">*</span></label>
          <input type="date" value={form[key("Dob")] ?? ""} onChange={(e) => set({ [key("Dob")]: e.target.value })} onBlur={() => setTouched({ [key("Dob")]: true })} className={inputCls("Dob")} />
          {fieldError("Dob") && <p className="mt-1 text-xs text-red-600">{fieldError("Dob")}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t(prefix === "sh" ? "shBecameDate" : "becameDate")} <span className="text-red-500">*</span>
          </label>
          <input type="date" value={form[key("BecameDate")] ?? ""} onChange={(e) => set({ [key("BecameDate")]: e.target.value })} onBlur={() => setTouched({ [key("BecameDate")]: true })} className={inputCls("BecameDate")} />
          {fieldError("BecameDate") && <p className="mt-1 text-xs text-red-600">{fieldError("BecameDate")}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("nationality")} <span className="text-red-500">*</span></label>
          <select value={form[key("Nationality")] ?? ""} onChange={(e) => set({ [key("Nationality")]: e.target.value })} onBlur={() => setTouched({ [key("Nationality")]: true })} className={cn(inputCls("Nationality"), "bg-white")}>
            <option value="">{t("select")}</option>
            <option value="KH">{t("nationalityKH")}</option>
            <option value="CN">{t("nationalityCN")}</option>
            <option value="TH">{t("nationalityTH")}</option>
            <option value="VN">{t("nationalityVN")}</option>
            <option value="OTHER">{t("nationalityOther")}</option>
          </select>
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
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("idCard")}</label>
          <input type="text" value={form[key("IdCard")] ?? ""} onChange={(e) => set({ [key("IdCard")]: e.target.value })} className={inputCls("IdCard")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("issueDate")}</label>
          <input type="date" value={form[key("IdIssuedDate")] ?? ""} onChange={(e) => set({ [key("IdIssuedDate")]: e.target.value })} className={inputCls("IdIssuedDate")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("expiryDate")}</label>
          <input type="date" value={form[key("IdExpiredDate")] ?? ""} onChange={(e) => set({ [key("IdExpiredDate")]: e.target.value })} className={inputCls("IdExpiredDate")} />
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
          <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-blue-500">
            <span className="text-base leading-none">🇰🇭</span>
            <span className="text-slate-400 text-xs">+855</span>
            <input type="tel" value={form[key("Phone")] ?? ""} onChange={(e) => set({ [key("Phone")]: e.target.value })} placeholder="23 756 789" className="flex-1 outline-none text-sm bg-transparent" />
          </div>
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
              {idDocs.length > 0 && (
                <ul className="mt-1 space-y-0.5">
                  {idDocs.map((d, i) => (
                    <li key={i} className="flex items-center gap-1 text-xs text-slate-500">
                      <span className="truncate">{d.name}</span>
                      <button type="button" onClick={() => setIdDocs((p) => p.filter((_, idx) => idx !== i))} className="ml-1 text-red-400 hover:text-red-600"><X className="h-3 w-3" /></button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <label className="inline-flex items-center gap-1.5 cursor-pointer flex-shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Paperclip className="h-3.5 w-3.5" />
            {t("attach")}
            <input type="file" accept=".pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setIdDocs((p) => [...p, { name: f.name }]); } e.target.value = ""; }} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default function BeneficiaryRequestForm({ editId }: { editId?: string } = {}) {
  const t = useTranslations("beneficiary.request");
  const router = useRouter();
  const pathname = usePathname() ?? "/en";
  const locale = pathname.split("/")[1] || "en";
  const [form, setForm] = useState<FormData>(EMPTY);
  const [ownerPhoto, setOwnerPhoto] = useState<string | null>(null);
  const [ownerPhotoName, setOwnerPhotoName] = useState<string | null>(null);
  const [ownerIdDocs, setOwnerIdDocs] = useState<UploadedDoc[]>([]);
  const [shPhoto, setShPhoto] = useState<string | null>(null);
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
  const [activeStep, setActiveStep] = useState(1);
  const [returnReason, setReturnReason] = useState<string | null>(null);
  const [returnSteps, setReturnSteps] = useState<number[]>([]);
  const [flaggedFields, setFlaggedFields] = useState<string[]>([]);
  const [originalFlaggedValues, setOriginalFlaggedValues] = useState<Record<string, string>>({});
  const [unchangedFields, setUnchangedFields] = useState<string[]>([]);

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
        const data = await res.json();
        if (data.status !== "APPROVED" && data.status !== "RETURNED") {
          setNotAllowed(true);
          return;
        }
        const dateOnly = (iso: string | null) => (iso ? iso.slice(0, 10) : "");
        const mappedForm: FormData = {
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
          idCard: data.ownerIdCard ?? "", idIssuedDate: dateOnly(data.ownerIdIssuedDate), idExpiredDate: dateOnly(data.ownerIdExpiredDate),
          email: data.ownerEmail ?? "", phone: data.ownerPhone ?? "", shareAmount: data.shareAmount ?? "",
          shLastNameKh: data.shLastNameKh ?? "", shFirstNameKh: data.shFirstNameKh ?? "",
          shLastNameEn: data.shLastNameEn ?? "", shFirstNameEn: data.shFirstNameEn ?? "",
          shDob: dateOnly(data.shDob), shBecameDate: dateOnly(data.shBecameDate), shNationality: data.shNationality ?? "", shGender: data.shGender ?? "",
          shIdCard: data.shIdCard ?? "", shIdIssuedDate: dateOnly(data.shIdIssuedDate), shIdExpiredDate: dateOnly(data.shIdExpiredDate),
          shEmail: data.shEmail ?? "", shPhone: data.shPhone ?? "",
        };
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
        setForm(mappedForm);
        setOwnerPhotoName(data.ownerPhotoName ?? null);
        setShPhotoName(data.shPhotoName ?? null);
        setOwnerIdDocs((data.ownerIdDocNames ?? []).map((name: string) => ({ name })));
        setShIdDocs((data.shIdDocNames ?? []).map((name: string) => ({ name })));
        setShareholderContractDocs((data.shareholderContractDocNames ?? []).map((name: string) => ({ name })));
        setSupportingDocs((data.otherDocNames ?? []).map((name: string) => ({ name })));
        setConsentAgreed(!!data.consentAgreed);
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
    setOwnerIdDocs([{ name: FAKE_ID_DOC_NAME }]);
    setShIdDocs([{ name: FAKE_ID_DOC_NAME }]);
    setShareholderContractDocs([{ name: FAKE_CONTRACT_DOC_NAME }]);
    setSupportingDocs([{ name: FAKE_OTHER_DOC_NAME }]);
    setConsentAgreed(true);
  };

  const STEP_OF_FIELD: Record<string, number> = {
    companyNameEn: 1, registrationNo: 1, registrationDate: 1,
    companyProvince: 1, companyDistrict: 1, companyCommune: 1, companyVillage: 1, companyStreet: 1, companyHouse: 1,
    companyPhone: 1, companyEmail: 1,
    shLastNameEn: 2, shFirstNameEn: 2, shDob: 2, shBecameDate: 2, shNationality: 2, shGender: 2,
    lastNameEn: 3, firstNameEn: 3, dob: 3, becameDate: 3, nationality: 3, gender: 3, shareAmount: 3,
  };

  const STEP_REQUIRED_FIELDS: Record<number, (keyof FormData)[]> = Object.entries(STEP_OF_FIELD).reduce(
    (acc, [field, step]) => {
      acc[step] = acc[step] ?? [];
      acc[step].push(field as keyof FormData);
      return acc;
    },
    {} as Record<number, (keyof FormData)[]>
  );

  const isStepComplete = (step: number) =>
    (STEP_REQUIRED_FIELDS[step] ?? []).every((f) => !!form[f]);

  const validateAndFocusStep = () => {
    const required: (keyof FormData)[] = [
      "companyNameEn", "registrationNo", "registrationDate",
      "companyProvince", "companyDistrict", "companyCommune", "companyVillage", "companyStreet", "companyHouse",
      "companyPhone", "companyEmail",
      "lastNameEn", "firstNameEn", "dob", "becameDate", "nationality", "gender", "shareAmount",
      "shLastNameEn", "shFirstNameEn", "shDob", "shBecameDate", "shNationality", "shGender",
    ];
    const t2: Record<string, boolean> = {};
    required.forEach((k) => (t2[k] = true));
    setTouched(t2);
    setConsentTouched(true);
    const missing = required.filter((k) => !form[k]);
    if (missing.length > 0) {
      const missingSteps = missing.map((k) => STEP_OF_FIELD[k] ?? 1);
      setActiveStep(Math.min(...missingSteps));
      return false;
    }
    if (flaggedFields.length > 0) {
      const stillUnchanged = flaggedFields.filter((f) => form[f as keyof FormData] === originalFlaggedValues[f]);
      if (stillUnchanged.length > 0) {
        setUnchangedFields(stillUnchanged);
        if (returnSteps.length > 0) setActiveStep(returnSteps[0]);
        toast.error(t("unchangedFlaggedFieldError"));
        return false;
      }
    }
    if (!consentAgreed) {
      setActiveStep(4);
      return false;
    }
    return true;
  };

  const saveRequest = async (): Promise<string | null> => {
    const url = editId ? `/api/portal/beneficiary/requests/${editId}` : "/api/portal/beneficiary/requests";
    const payload = {
      ...form,
      ownerPhotoName,
      ownerIdDocNames: ownerIdDocs.map((d) => d.name),
      shPhotoName,
      shIdDocNames: shIdDocs.map((d) => d.name),
      shareholderContractDocNames: shareholderContractDocs.map((d) => d.name),
      otherDocNames: supportingDocs.map((d) => d.name),
      consentAgreed,
      ...(editId && { action: "edit" }),
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

  const handleSaveDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAndFocusStep()) return;

    setSubmitError(null);
    setSubmitting(true);
    try {
      const id = await saveRequest();
      if (!id) return;
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
      const id = await saveRequest();
      if (!id) return;

      if (!editId) {
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
        : touched[key] && !form[key]
        ? "border-red-400"
        : flaggedFields.includes(key)
        ? "border-orange-400 ring-2 ring-orange-100"
        : "border-slate-300");

  const fieldError = (key: keyof FormData) =>
    unchangedFields.includes(key)
      ? t("unchangedFieldInline")
      : touched[key] && !form[key] ? t("required") : "";

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
          <button type="button" onClick={() => router.back()} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors mb-2">
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("backToList")}
          </button>
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
        <h1 className="text-lg font-semibold text-slate-800">{editId ? t("editRequestTitle") : t("pageTitle")}</h1>
        <p className="text-sm text-slate-500 mt-0.5">{t("pageSubtitle")}</p>
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
          <StepTabs
            steps={[1, 2, 3, 4].map((n) => ({
              number: n,
              title: t(`step${n}Title` as "step1Title"),
              disabled: n > activeStep && Array.from({ length: n - 1 }, (_, i) => i + 1).some((s) => !isStepComplete(s)),
              flagged: returnSteps.includes(n),
            }))}
            activeStep={activeStep}
            onChange={setActiveStep}
          />

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
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("province")} <span className="text-red-500">*</span></label>
                <select value={form.companyProvince} onChange={(e) => set({ companyProvince: e.target.value })} onBlur={() => setTouched((p) => ({ ...p, companyProvince: true }))} className={cn(inputCls("companyProvince"), "bg-white")}>
                  <option value="">{t("select")}</option>
                  {PROVINCES_KH.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {fieldError("companyProvince") && <p className="mt-1 text-xs text-red-600">{fieldError("companyProvince")}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("district")} <span className="text-red-500">*</span></label>
                <input type="text" value={form.companyDistrict} onChange={(e) => set({ companyDistrict: e.target.value })} onBlur={() => setTouched((p) => ({ ...p, companyDistrict: true }))} className={inputCls("companyDistrict")} />
                {fieldError("companyDistrict") && <p className="mt-1 text-xs text-red-600">{fieldError("companyDistrict")}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("commune")} <span className="text-red-500">*</span></label>
                <input type="text" value={form.companyCommune} onChange={(e) => set({ companyCommune: e.target.value })} onBlur={() => setTouched((p) => ({ ...p, companyCommune: true }))} className={inputCls("companyCommune")} />
                {fieldError("companyCommune") && <p className="mt-1 text-xs text-red-600">{fieldError("companyCommune")}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("village")} <span className="text-red-500">*</span></label>
                <input type="text" value={form.companyVillage} onChange={(e) => set({ companyVillage: e.target.value })} onBlur={() => setTouched((p) => ({ ...p, companyVillage: true }))} className={inputCls("companyVillage")} />
                {fieldError("companyVillage") && <p className="mt-1 text-xs text-red-600">{fieldError("companyVillage")}</p>}
              </div>
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
                <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="text-base leading-none">🇰🇭</span>
                  <span className="text-slate-400 text-xs">+855</span>
                  <input type="tel" value={form.companyOfficePhone} onChange={(e) => set({ companyOfficePhone: e.target.value })} placeholder="23 756 789" className="flex-1 outline-none text-sm bg-transparent" />
                </div>
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
                  <p className="text-sm text-slate-700">{t("shareholderContractLabel")}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t("supportingDocHint")}</p>
                  {shareholderContractDocs.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {shareholderContractDocs.map((d, i) => (
                        <li key={i} className="flex items-center gap-1 text-xs text-slate-500">
                          <span className="truncate">{d.name}</span>
                          <button type="button" onClick={() => setShareholderContractDocs((p) => p.filter((_, idx) => idx !== i))} className="ml-1 text-red-400 hover:text-red-600"><X className="h-3 w-3" /></button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <label className="inline-flex items-center gap-1.5 cursor-pointer flex-shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <Paperclip className="h-3.5 w-3.5" />
                {t("attach")}
                <input type="file" accept=".pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) setShareholderContractDocs((p) => [...p, { name: f.name }]); e.target.value = ""; }} className="hidden" />
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
                          <span className="truncate">{d.name}</span>
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
                <input type="file" accept=".pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) setSupportingDocs((p) => [...p, { name: f.name }]); e.target.value = ""; }} className="hidden" />
              </label>
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
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setActiveStep((s) => Math.max(1, s - 1))}
            disabled={activeStep === 1}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t("previous")}
          </button>

          {submitError && <p className="text-sm text-red-600">{submitError}</p>}

          {activeStep < 4 ? (
            <button
              type="button"
              onClick={() => setActiveStep((s) => Math.min(4, s + 1))}
              disabled={!isStepComplete(activeStep)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t("next")}
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => router.back()} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <XCircle className="h-4 w-4" />
                {t("cancel")}
              </button>
              <button
                type="submit"
                disabled={submitting || !consentAgreed}
                className="inline-flex items-center gap-1.5 rounded-lg border border-blue-600 bg-white px-5 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                {submitting ? t("submitting") : t("submit")}
              </button>
              <button
                type="button"
                onClick={handleSubmitRequest}
                disabled={submitting || !consentAgreed}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                {submitting ? t("submittingRequest") : t("submitRequest")}
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
