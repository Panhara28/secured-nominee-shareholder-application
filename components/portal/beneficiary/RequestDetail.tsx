"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/navigation";
import { ArrowLeft, Building2, FileText, History, MessageSquare, Pencil, Send, Users } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import RequestActivityLog, { type ActivityLogEntry } from "@/components/beneficiary/RequestActivityLog";

function formatDate(iso: string | null): string {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-slate-800">{value || "-"}</p>
    </div>
  );
}

function DocList({ names }: { names: string[] }) {
  if (names.length === 0) return <p className="text-sm text-slate-400">-</p>;
  return (
    <ul className="space-y-0.5">
      {names.map((n, i) => (
        <li key={i} className="flex items-center gap-1 text-sm text-slate-800 truncate">
          <span className="text-green-500 font-bold">✓</span>
          {n}
        </li>
      ))}
    </ul>
  );
}

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100">
        <span className="text-blue-600">{icon}</span>
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function PersonPhoto({ name }: { name: string | null }) {
  return (
    <div className="flex-shrink-0 w-36 h-44 border-2 border-blue-300 rounded-xl overflow-hidden bg-slate-100 text-slate-400 flex flex-col items-center justify-center gap-1">
      <Users className="h-12 w-12" />
      {name && <p className="text-[10px] text-slate-500 px-2 truncate max-w-full">{name}</p>}
    </div>
  );
}

type RequestDetailData = {
  id: number;
  requestNo: string;
  status: string;
  type: string;
  companyNameKh: string | null;
  companyNameEn: string;
  registrationNo: string;
  registrationDate: string;
  companyProvince: string;
  companyDistrict: string;
  companyCommune: string;
  companyVillage: string;
  companyStreet: string;
  companyHouse: string;
  companyPhone: string;
  companyOfficePhone: string | null;
  companyEmail: string;
  shLastNameKh: string | null;
  shFirstNameKh: string | null;
  shLastNameEn: string;
  shFirstNameEn: string;
  shDob: string;
  shNationality: string;
  shGender: "M" | "F";
  shIdCard: string | null;
  shIdIssuedDate: string | null;
  shIdExpiredDate: string | null;
  shEmail: string | null;
  shPhone: string | null;
  shPhotoName: string | null;
  shIdDocNames: string[];
  ownerLastNameKh: string | null;
  ownerFirstNameKh: string | null;
  ownerLastNameEn: string;
  ownerFirstNameEn: string;
  ownerDob: string;
  ownerNationality: string;
  ownerGender: "M" | "F";
  ownerIdCard: string | null;
  ownerIdIssuedDate: string | null;
  ownerIdExpiredDate: string | null;
  ownerEmail: string | null;
  ownerPhone: string | null;
  ownerPhotoName: string | null;
  ownerIdDocNames: string[];
  shareAmount: string;
  shareholderContractDocNames: string[];
  otherDocNames: string[];
  consentAgreed: boolean;
  submittedAt: string;
  rejectionReason: string | null;
  logs: ActivityLogEntry[];
};

export default function RequestDetail({ id }: { id: string }) {
  const t = useTranslations("beneficiary.allRequests");
  const tf = useTranslations("beneficiary.request");
  const router = useRouter();
  const [request, setRequest] = useState<RequestDetailData | null | undefined>(undefined);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchDetail() {
      setError(false);
      try {
        const res = await fetch(`/api/portal/beneficiary/requests/${id}`);
        if (cancelled) return;
        if (res.status === 404) {
          setRequest(null);
          return;
        }
        if (!res.ok) {
          setError(true);
          return;
        }
        setRequest(await res.json());
      } catch {
        if (!cancelled) setError(true);
      }
    }

    fetchDetail();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const genderLabel = (g: "M" | "F") => (g === "M" ? tf("genderMale") : tf("genderFemale"));

  const handleSubmitRequest = async () => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/portal/beneficiary/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit" }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: t("submitRequestError") }));
        setSubmitError(err.error ?? t("submitRequestError"));
        return;
      }
      setRequest(await res.json());
    } catch {
      setSubmitError(t("submitRequestError"));
    } finally {
      setSubmitting(false);
    }
  };

  const companyAddress = request
    ? [request.companyHouse, request.companyStreet, request.companyVillage, request.companyCommune, request.companyDistrict, request.companyProvince]
        .filter(Boolean)
        .join(", ")
    : "";

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("backToList")}
        </button>
        {request ? (
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500 mb-0.5">{t("detailTitle")}</p>
              <h1 className="text-lg font-semibold text-slate-800 font-mono">{request.requestNo}</h1>
              <p className="text-sm text-slate-500">
                {request.companyNameEn}
                {request.companyNameKh ? ` · ${request.companyNameKh}` : ""}
              </p>
              {request.status === "PENDING" ? (
                <p className="mt-2 text-sm text-blue-600">{t("pendingNotice")}</p>
              ) : (
                <div className="flex items-center gap-2 mt-2">
                  <StatusBadge status={request.status} label={t(`status.${request.status}` as Parameters<typeof t>[0])} />
                </div>
              )}
            </div>
            {request.status === "DRAFT" && (
              <div className="flex-shrink-0 text-right">
                <button
                  type="button"
                  onClick={handleSubmitRequest}
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? t("submittingRequest") : t("submitRequest")}
                </button>
                {submitError && <p className="mt-2 text-xs text-red-600 max-w-xs">{submitError}</p>}
              </div>
            )}
            {request.status === "APPROVED" && (
              <div className="flex-shrink-0 text-right">
                <button
                  type="button"
                  onClick={() => router.push(`/portal/beneficiary/all-requests/${request.id}/edit`)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                  {t("requestToEdit")}
                </button>
              </div>
            )}
          </div>
        ) : (
          <h1 className="text-lg font-semibold text-slate-800">{t("detailTitle")}</h1>
        )}
      </div>

      {request && request.status === "REJECTED" && request.rejectionReason && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <MessageSquare className="h-4.5 w-4.5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-amber-800">{t("rejectionReason")}</p>
            <p className="mt-0.5 text-sm text-amber-700">{request.rejectionReason}</p>
          </div>
        </div>
      )}

      {error ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-16 text-center text-slate-400 text-sm">
          {t("loadError")}
        </div>
      ) : request === undefined ? null : request === null ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-16 text-center text-slate-400 text-sm">
          {t("notFound")}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div className="lg:col-span-8 space-y-4">
          {/* 1. Company Information */}
          <SectionCard icon={<Building2 className="h-4 w-4" />} title={`1. ${tf("step1Title")}`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label={t("companyNameEn")} value={request.companyNameEn} />
              <Field label={t("companyNameKh")} value={request.companyNameKh} />
              <Field label={t("registrationNo")} value={request.registrationNo} />
              <Field label={tf("registrationDate")} value={formatDate(request.registrationDate)} />
              <Field label={t("companyAddress")} value={companyAddress} />
              <Field label={tf("companyPhone")} value={request.companyPhone} />
              <Field label={tf("companyOfficePhone")} value={request.companyOfficePhone} />
              <Field label={tf("companyEmail")} value={request.companyEmail} />
            </div>
          </SectionCard>

          {/* 2. Nominee Shareholder Information */}
          <SectionCard icon={<Users className="h-4 w-4" />} title={`2. ${tf("step2Title")}`}>
            <div className="flex items-start gap-6 mb-4">
              <PersonPhoto name={request.shPhotoName} />
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label={t("shareholderName")} value={`${request.shLastNameEn} ${request.shFirstNameEn}`.trim()} />
                <Field label={t("ownerNameKh")} value={`${request.shLastNameKh ?? ""} ${request.shFirstNameKh ?? ""}`.trim()} />
                <Field label={tf("dob")} value={formatDate(request.shDob)} />
                <Field label={tf("nationality")} value={request.shNationality} />
                <Field label={tf("gender")} value={genderLabel(request.shGender)} />
                <Field label={tf("idCard")} value={request.shIdCard} />
                <Field label={tf("issueDate")} value={formatDate(request.shIdIssuedDate)} />
                <Field label={tf("expiryDate")} value={formatDate(request.shIdExpiredDate)} />
                <Field label={tf("email")} value={request.shEmail} />
                <Field label={tf("phone")} value={request.shPhone} />
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">{tf("idDocLabel")}</p>
              <DocList names={request.shIdDocNames} />
            </div>
          </SectionCard>

          {/* 3. Beneficial Owner Information */}
          <SectionCard icon={<Users className="h-4 w-4" />} title={`3. ${tf("step3Title")}`}>
            <div className="flex items-start gap-6 mb-4">
              <PersonPhoto name={request.ownerPhotoName} />
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label={t("ownerNameEn")} value={`${request.ownerLastNameEn} ${request.ownerFirstNameEn}`.trim()} />
                <Field label={t("ownerNameKh")} value={`${request.ownerLastNameKh ?? ""} ${request.ownerFirstNameKh ?? ""}`.trim()} />
                <Field label={tf("dob")} value={formatDate(request.ownerDob)} />
                <Field label={tf("nationality")} value={request.ownerNationality} />
                <Field label={tf("gender")} value={genderLabel(request.ownerGender)} />
                <Field label={tf("idCard")} value={request.ownerIdCard} />
                <Field label={tf("issueDate")} value={formatDate(request.ownerIdIssuedDate)} />
                <Field label={tf("expiryDate")} value={formatDate(request.ownerIdExpiredDate)} />
                <Field label={tf("email")} value={request.ownerEmail} />
                <Field label={tf("phone")} value={request.ownerPhone} />
                <Field label={t("shareAmount")} value={request.shareAmount} />
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">{tf("idDocLabel")}</p>
              <DocList names={request.ownerIdDocNames} />
            </div>
          </SectionCard>

          {/* 4. Agreement */}
          <SectionCard icon={<FileText className="h-4 w-4" />} title={`4. ${tf("step4Title")}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">{tf("shareholderContractLabel")}</p>
                <DocList names={request.shareholderContractDocNames} />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">{tf("otherDocsLabel")}</p>
                <DocList names={request.otherDocNames} />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={request.consentAgreed}
                  disabled
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600"
                />
                <span className="text-sm text-slate-700">{tf("consentText")}</span>
              </label>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label={t("col.submittedAt")} value={formatDate(request.submittedAt)} />
              <Field label={t("col.requestType")} value={request.type} />
            </div>
          </SectionCard>
        </div>

        <div className="lg:col-span-4">
          <SectionCard icon={<History className="h-4 w-4" />} title={t("log.title")}>
            <RequestActivityLog logs={request.logs} />
          </SectionCard>
        </div>
        </div>
      )}
    </div>
  );
}
