"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft, ChevronDown, FileText, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

function StepCard({
  stepNumber,
  title,
  children,
}: {
  stepNumber: number;
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-blue-700 text-white"
      >
        <span className="text-sm font-semibold">Step {stepNumber} — {title}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && <div className="bg-white px-5 py-5">{children}</div>}
    </div>
  );
}

type FormData = {
  /* Step 1 — Company */
  companyNameKh: string; companyNameEn: string; registrationNo: string; registrationDate: string;
  /* Step 2 — Beneficiary Owner */
  lastNameKh: string; firstNameKh: string; lastNameEn: string; firstNameEn: string;
  dob: string; nationality: string; gender: string;
  idCard: string; idIssuedDate: string; idExpiredDate: string;
  email: string; phone: string;
  /* Step 3 — Shareholder */
  shLastNameKh: string; shFirstNameKh: string; shLastNameEn: string; shFirstNameEn: string;
  shDob: string; shNationality: string; shGender: string;
  shIdCard: string; shIdIssuedDate: string; shIdExpiredDate: string;
  shEmail: string; shPhone: string;
};

const EMPTY: FormData = {
  companyNameKh: "", companyNameEn: "", registrationNo: "", registrationDate: "",
  lastNameKh: "", firstNameKh: "", lastNameEn: "", firstNameEn: "",
  dob: "", nationality: "", gender: "", idCard: "", idIssuedDate: "", idExpiredDate: "",
  email: "", phone: "",
  shLastNameKh: "", shFirstNameKh: "", shLastNameEn: "", shFirstNameEn: "",
  shDob: "", shNationality: "", shGender: "", shIdCard: "", shIdIssuedDate: "", shIdExpiredDate: "",
  shEmail: "", shPhone: "",
};

type UploadedDoc = { name: string };

function PersonFields({
  t,
  prefix,
  form,
  set,
  touched,
  setTouched,
  photo,
  setPhoto,
  idDocs,
  setIdDocs,
  requiredFields,
}: {
  t: ReturnType<typeof useTranslations>;
  prefix: string;
  form: Record<string, string>;
  set: (patch: Record<string, string>) => void;
  touched: Record<string, boolean>;
  setTouched: (patch: Record<string, boolean>) => void;
  photo: string | null;
  setPhoto: (v: string | null) => void;
  idDocs: UploadedDoc[];
  setIdDocs: React.Dispatch<React.SetStateAction<UploadedDoc[]>>;
  requiredFields: string[];
}) {
  const key = (f: string) => `${prefix}${f}`;
  const fieldError = (f: string) => touched[key(f)] && !form[key(f)] ? t("required") : "";
  const inputCls = (f: string) =>
    cn("w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
      fieldError(f) ? "border-red-400" : "border-slate-300");

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
          <label className="w-full text-center cursor-pointer rounded-lg bg-blue-500 py-1.5 text-xs font-medium text-white hover:bg-blue-600 transition-colors">
            {t("uploadPhoto")}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setPhoto(URL.createObjectURL(f)); }} />
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

      {/* DOB / Nationality / Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t("dob")} <span className="text-red-500">*</span></label>
          <input type="date" value={form[key("Dob")] ?? ""} onChange={(e) => set({ [key("Dob")]: e.target.value })} onBlur={() => setTouched({ [key("Dob")]: true })} className={inputCls("Dob")} />
          {fieldError("Dob") && <p className="mt-1 text-xs text-red-600">{fieldError("Dob")}</p>}
        </div>
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
                      <button type="button" onClick={() => setIdDocs((p) => p.filter((_, idx) => idx !== i))} className="ml-1 text-red-400 hover:text-red-600">✕</button>
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

export default function BeneficiaryRequestForm() {
  const t = useTranslations("beneficiary.request");
  const router = useRouter();
  const [form, setForm] = useState<FormData>(EMPTY);
  const [ownerPhoto, setOwnerPhoto] = useState<string | null>(null);
  const [ownerIdDocs, setOwnerIdDocs] = useState<UploadedDoc[]>([]);
  const [shPhoto, setShPhoto] = useState<string | null>(null);
  const [shIdDocs, setShIdDocs] = useState<UploadedDoc[]>([]);
  const [supportingDocs, setSupportingDocs] = useState<UploadedDoc[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const set = (patch: Partial<FormData>) => setForm((p) => ({ ...p, ...patch }));
  const setAny = (patch: Record<string, string>) => setForm((p) => ({ ...p, ...patch }));
  const setTouchedPatch = (patch: Record<string, boolean>) => setTouched((p) => ({ ...p, ...patch }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const required: (keyof FormData)[] = [
      "companyNameEn", "registrationNo", "registrationDate",
      "lastNameEn", "firstNameEn", "dob", "nationality", "gender",
      "shLastNameEn", "shFirstNameEn", "shDob", "shNationality", "shGender",
    ];
    const t2: Record<string, boolean> = {};
    required.forEach((k) => (t2[k] = true));
    setTouched(t2);
    if (required.some((k) => !form[k])) return;
    router.push("./all-requests");
  };

  const inputCls = (key: keyof FormData) =>
    cn("w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
      touched[key] && !form[key] ? "border-red-400" : "border-slate-300");

  const fieldError = (key: keyof FormData) =>
    touched[key] && !form[key] ? t("required") : "";

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4">
        <button type="button" onClick={() => router.back()} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors mb-2">
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("backToList")}
        </button>
        <h1 className="text-lg font-semibold text-slate-800">{t("pageTitle")}</h1>
        <p className="text-sm text-slate-500 mt-0.5">{t("pageSubtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Step 1 — Company Information */}
        <StepCard stepNumber={1} title={t("step1Title")}>
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
        </StepCard>

        {/* Step 2 — Beneficiary Owner Information */}
        <StepCard stepNumber={2} title={t("step2Title")}>
          <PersonFields
            t={t}
            prefix=""
            form={form as unknown as Record<string, string>}
            set={setAny}
            touched={touched}
            setTouched={setTouchedPatch}
            photo={ownerPhoto}
            setPhoto={setOwnerPhoto}
            idDocs={ownerIdDocs}
            setIdDocs={setOwnerIdDocs}
            requiredFields={["LastNameEn", "FirstNameEn", "Dob", "Nationality", "Gender"]}
          />
        </StepCard>

        {/* Step 3 — Shareholder Information */}
        <StepCard stepNumber={3} title={t("step3Title")}>
          <PersonFields
            t={t}
            prefix="sh"
            form={form as unknown as Record<string, string>}
            set={setAny}
            touched={touched}
            setTouched={setTouchedPatch}
            photo={shPhoto}
            setPhoto={setShPhoto}
            idDocs={shIdDocs}
            setIdDocs={setShIdDocs}
            requiredFields={["shLastNameEn", "shFirstNameEn", "shDob", "shNationality", "shGender"]}
          />
        </StepCard>

        {/* Step 4 — Supporting Documents */}
        <StepCard stepNumber={4} title={t("step4Title")}>
          <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-slate-700">{t("supportingDocLabel")}</p>
                <p className="text-xs text-slate-400 mt-0.5">{t("supportingDocHint")}</p>
                {supportingDocs.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {supportingDocs.map((d, i) => (
                      <li key={i} className="flex items-center gap-1 text-xs text-slate-500">
                        <span className="truncate">{d.name}</span>
                        <button type="button" onClick={() => setSupportingDocs((p) => p.filter((_, idx) => idx !== i))} className="ml-1 text-red-400 hover:text-red-600">✕</button>
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
        </StepCard>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => router.back()} className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            {t("cancel")}
          </button>
          <button type="submit" className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            {t("submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
