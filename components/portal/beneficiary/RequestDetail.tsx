"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link, useRouter } from "@/lib/navigation";
import { ArrowLeft, Building2, Download, FileText, GitCompare, History, MessageSquare, Pencil, Send, Users } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { UPDATE_SECTION_STEPS, type UpdateSection } from "@/lib/update-sections";
import UpdateDraftedTag from "@/components/portal/beneficiary/UpdateDraftedTag";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn, splitReasonItems } from "@/lib/utils";
import RequestActivityLog, { type ActivityLogEntry } from "@/components/beneficiary/RequestActivityLog";
import RequestRevisionHistory, { PendingUpdateChanges, type RequestRevisionEntry } from "@/components/beneficiary/RequestRevisionHistory";

function formatDate(iso: string | null): string {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}

function Field({
  label,
  value,
  truncate = false,
}: {
  label: string;
  value: string | null | undefined;
  truncate?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p
        className={cn(
          "text-sm font-medium text-slate-800",
          truncate ? "truncate" : "break-words",
        )}
        title={truncate && value ? value : undefined}
      >
        {value || "-"}
      </p>
    </div>
  );
}

// Phone numbers are stored without a country code; display with the Cambodia
// (+855) prefix per item 17. Leaves already-prefixed or empty values as-is.
function formatPhone(phone: string | null | undefined): string | null | undefined {
  if (!phone) return phone;
  const trimmed = phone.trim();
  if (trimmed.startsWith("+")) return trimmed;
  return `+855 ${trimmed.replace(/^0+/, "")}`;
}

function DocList({ documents }: { documents: ApiDocument[] }) {
  if (documents.length === 0) return <p className="text-sm text-slate-400">-</p>;
  return (
    <ul className="space-y-0.5">
      {documents.map((d) => (
        <li key={d.id} className="flex items-center gap-1.5 text-sm text-slate-800 truncate">
          <span className="text-green-500 font-bold">✓</span>
          <a
            href={documentDownloadUrl(d.id)}
            target="_blank"
            rel="noreferrer"
            className="truncate text-blue-600 hover:text-blue-800 hover:underline"
          >
            {d.media.filename}
          </a>
        </li>
      ))}
    </ul>
  );
}

function SectionCard({
  icon,
  title,
  action,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100">
        <span className="text-blue-600">{icon}</span>
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        {action && <div className="ml-auto">{action}</div>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function PersonPhoto({ document }: { document: ApiDocument | undefined }) {
  return (
    <div className="flex-shrink-0 w-36 h-44 border-2 border-blue-300 rounded-xl overflow-hidden bg-slate-100 text-slate-400 flex flex-col items-center justify-center gap-1">
      {document ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={documentDownloadUrl(document.id)}
          alt={document.media.filename}
          className="h-full w-full object-cover"
        />
      ) : (
        <Users className="h-12 w-12" />
      )}
    </div>
  );
}

type RequestDetailData = {
  id: number;
  requestNo: string;
  status: string;
  /** "DRAFTED" while an APPROVED request has a saved, not-yet-sent update. */
  updateStatus?: "DRAFTED" | null;
  pendingUpdateSavedAt?: string | null;
  type: string;
  updateType?: string | null;
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
  shBecameDate: string;
  shNationality: string;
  shGender: "M" | "F";
  shIdCard: string | null;
  shIdIssuedDate: string | null;
  shIdExpiredDate: string | null;
  shEmail: string | null;
  shPhone: string | null;
  ownerLastNameKh: string | null;
  ownerFirstNameKh: string | null;
  ownerLastNameEn: string;
  ownerFirstNameEn: string;
  ownerDob: string;
  ownerBecameDate: string;
  ownerNationality: string;
  ownerGender: "M" | "F";
  ownerIdCard: string | null;
  ownerIdIssuedDate: string | null;
  ownerIdExpiredDate: string | null;
  ownerEmail: string | null;
  ownerPhone: string | null;
  shareAmount: string;
  agreementDate: string | null;
  consentAgreed: boolean;
  submittedAt: string;
  rejectionReason: string | null;
  logs: ActivityLogEntry[];
  revisions: RequestRevisionEntry[];
  // Real uploaded files (item 39), grouped client-side by category below.
  documents?: ApiDocument[];
};

type DocCategory = "SH_PHOTO" | "SH_ID_DOC" | "OWNER_PHOTO" | "OWNER_ID_DOC" | "SHAREHOLDER_CONTRACT" | "OTHER";
type ApiDocument = { id: number; category: DocCategory; media: { filename: string } };

function docsByCategory(documents: ApiDocument[] | undefined, category: DocCategory) {
  return (documents ?? []).filter((d) => d.category === category);
}

function documentDownloadUrl(documentId: number): string {
  return `/api/portal/documents/${documentId}/download`;
}

export default function RequestDetail({ id }: { id: string }) {
  const t = useTranslations("beneficiary.allRequests");
  const tf = useTranslations("beneficiary.request");
  const trev = useTranslations("beneficiary.revisions");
  const tu = useTranslations("updateTypes");
  const router = useRouter();
  const [request, setRequest] = useState<RequestDetailData | null | undefined>(undefined);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [downloadingCertificate, setDownloadingCertificate] = useState(false);

  const handleDownloadCertificate = async () => {
    setDownloadingCertificate(true);
    try {
      const res = await fetch(`/api/portal/beneficiary/requests/${id}/certificate`);
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `certificate-${request?.requestNo ?? id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      toast.error(t("downloadCertificateError"));
    } finally {
      setDownloadingCertificate(false);
    }
  };

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

    // Real-time: refetch (status, logs, certificate availability, etc.) the
    // instant this request changes, instead of only on page load.
    const source = new EventSource("/api/portal/notifications/stream");
    source.onmessage = () => fetchDetail();

    return () => {
      cancelled = true;
      source.close();
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

  // Approved requests: each section opens its own update page that shows
  // only that section (/update-request/{section}).
  const sectionUpdateAction = (section: UpdateSection) =>
    request?.status === "APPROVED" ? (
      <button
        type="button"
        onClick={() => router.push(`/portal/beneficiary/all-requests/${request.id}/update-request/${section}`)}
        className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100 transition-colors"
      >
        <Pencil className="h-3.5 w-3.5" />
        {t("requestToUpdate")} {tf(`step${UPDATE_SECTION_STEPS[section]}Title` as Parameters<typeof tf>[0])}
      </button>
    ) : undefined;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4">
        <Button
          type="button"
          onClick={() => router.back()}
          className="mb-2 bg-blue-600 text-white hover:bg-blue-700 h-8 px-3 text-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("backToList")}
        </Button>
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
              ) : request.status === "IN_REVIEW" ? (
                <p className="mt-2 text-sm text-purple-600">{t("inReviewNotice")}</p>
              ) : request.status === "UPDATE_REQUESTED" ? (
                <div className="mt-2 space-y-1.5">
                  <p className="text-sm text-teal-600">{t("updateRequestedNotice")}</p>
                  <Link
                    href={`/portal/beneficiary/revisions?requestId=${request.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700 transition-colors"
                  >
                    <GitCompare className="h-3.5 w-3.5" />
                    {trev("diffCompare")}
                  </Link>
                </div>
              ) : request.status === "DISSOLVE_REQUESTED" ? (
                <p className="mt-2 text-sm text-amber-600">{t("dissolveRequestedNotice")}</p>
              ) : request.status === "DISSOLVED" ? (
                <p className="mt-2 text-sm text-slate-500">{t("dissolvedNotice")}</p>
              ) : (
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={request.status} label={t(`status.${request.status}` as Parameters<typeof t>[0])} />
                    {request.updateStatus === "DRAFTED" && <UpdateDraftedTag />}
                  </div>
                  {request.updateStatus === "DRAFTED" && (
                    <p className="text-sm text-slate-500">{t("updateDraftedNotice")}</p>
                  )}
                </div>
              )}
            </div>
            {request.status === "DRAFT" && (
              <div className="flex-shrink-0 flex items-start gap-2">
                <button
                  type="button"
                  onClick={() => router.push(`/portal/beneficiary/all-requests/${request.id}/edit`)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-blue-600 bg-white hover:bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                  {t("continueDraft")}
                </button>
                <div className="text-right">
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
              </div>
            )}
            {request.status === "RETURNED" && (
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
            {request.status === "APPROVED" && (
              <div className="flex-shrink-0 flex flex-wrap items-start justify-end gap-2">
                {request.updateStatus === "DRAFTED" && (
                  <>
                    <button
                      type="button"
                      onClick={() => router.push(`/portal/beneficiary/all-requests/${request.id}/edit`)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-blue-600 bg-white hover:bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                      {t("continueDraft")}
                    </button>
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={handleSubmitRequest}
                        disabled={submitting}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <Send className="h-4 w-4" />
                        {submitting ? t("submittingRequest") : t("requestToUpdate")}
                      </button>
                      {submitError && <p className="mt-2 text-xs text-red-600 max-w-xs">{submitError}</p>}
                    </div>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setCertificateOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 hover:bg-green-700 px-4 py-2 text-sm font-medium text-white transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("downloadCertificate")}</span>
                  <span className="sm:hidden">{t("download")}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <h1 className="text-lg font-semibold text-slate-800">{t("detailTitle")}</h1>
        )}
      </div>

      {request && (request.status === "REJECTED" || request.status === "RETURNED") && request.rejectionReason && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <MessageSquare className="h-4.5 w-4.5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-amber-800">
              {request.status === "RETURNED" ? t("returnReason") : t("rejectionReason")}
            </p>
            <ol className="mt-0.5 text-sm text-amber-700 list-decimal list-inside space-y-0.5">
              {splitReasonItems(request.rejectionReason).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ol>
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
          {request.status === "UPDATE_REQUESTED" && <PendingUpdateChanges revisions={request.revisions} />}
          {/* 1. Company Information */}
          <SectionCard icon={<Building2 className="h-4 w-4" />} title={`1. ${tf("step1Title")}`} action={sectionUpdateAction("company")}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label={t("companyNameEn")} value={request.companyNameEn} />
              <Field label={t("companyNameKh")} value={request.companyNameKh} />
              <Field label={t("registrationNo")} value={request.registrationNo} />
              <Field label={tf("registrationDate")} value={formatDate(request.registrationDate)} />
              <Field label={t("companyAddress")} value={companyAddress} />
              <Field label={tf("companyPhone")} value={formatPhone(request.companyPhone)} />
              <Field label={tf("companyOfficePhone")} value={formatPhone(request.companyOfficePhone)} />
              <Field label={tf("companyEmail")} value={request.companyEmail} truncate />
            </div>
          </SectionCard>

          {/* 2. Nominee Shareholder Information */}
          <SectionCard icon={<Users className="h-4 w-4" />} title={`2. ${tf("step2Title")}`} action={sectionUpdateAction("nominee-shareholder")}>
            <div className="flex items-start gap-6 mb-4">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label={t("shareholderName")} value={`${request.shLastNameEn} ${request.shFirstNameEn}`.trim()} />
                <Field label={t("ownerNameKh")} value={`${request.shLastNameKh ?? ""} ${request.shFirstNameKh ?? ""}`.trim()} />
                <Field label={tf("dob")} value={formatDate(request.shDob)} />
                <Field label={tf("shBecameDate")} value={formatDate(request.shBecameDate)} />
                <Field label={tf("nationality")} value={request.shNationality} />
                <Field label={tf("gender")} value={genderLabel(request.shGender)} />
                <Field label={tf("idCard")} value={request.shIdCard} />
                <Field label={tf("issueDate")} value={formatDate(request.shIdIssuedDate)} />
                <Field label={tf("expiryDate")} value={formatDate(request.shIdExpiredDate)} />
                <Field label={tf("email")} value={request.shEmail} truncate />
                <Field label={tf("phone")} value={formatPhone(request.shPhone)} />
              </div>
              <PersonPhoto document={docsByCategory(request.documents, "SH_PHOTO")[0]} />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">{tf("idDocLabel")}</p>
              <DocList documents={docsByCategory(request.documents, "SH_ID_DOC")} />
            </div>
          </SectionCard>

          {/* 3. Beneficial Owner Information */}
          <SectionCard icon={<Users className="h-4 w-4" />} title={`3. ${tf("step3Title")}`} action={sectionUpdateAction("beneficial-owner")}>
            <div className="flex items-start gap-6 mb-4">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label={t("ownerNameEn")} value={`${request.ownerLastNameEn} ${request.ownerFirstNameEn}`.trim()} />
                <Field label={t("ownerNameKh")} value={`${request.ownerLastNameKh ?? ""} ${request.ownerFirstNameKh ?? ""}`.trim()} />
                <Field label={tf("dob")} value={formatDate(request.ownerDob)} />
                <Field label={tf("becameDate")} value={formatDate(request.ownerBecameDate)} />
                <Field label={tf("nationality")} value={request.ownerNationality} />
                <Field label={tf("gender")} value={genderLabel(request.ownerGender)} />
                <Field label={tf("idCard")} value={request.ownerIdCard} />
                <Field label={tf("issueDate")} value={formatDate(request.ownerIdIssuedDate)} />
                <Field label={tf("expiryDate")} value={formatDate(request.ownerIdExpiredDate)} />
                <Field label={tf("email")} value={request.ownerEmail} truncate />
                <Field label={tf("phone")} value={formatPhone(request.ownerPhone)} />
                <Field label={t("shareAmount")} value={request.shareAmount} />
              </div>
              <PersonPhoto document={docsByCategory(request.documents, "OWNER_PHOTO")[0]} />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">{tf("idDocLabel")}</p>
              <DocList documents={docsByCategory(request.documents, "OWNER_ID_DOC")} />
            </div>
          </SectionCard>

          {/* 4. Agreement */}
          <SectionCard icon={<FileText className="h-4 w-4" />} title={`4. ${tf("step4Title")}`} action={sectionUpdateAction("agreement")}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <Field label={tf("agreementDate")} value={formatDate(request.agreementDate)} />
            </div>
            {(() => {
              const contractDocs = docsByCategory(request.documents, "SHAREHOLDER_CONTRACT");
              const otherDocs = docsByCategory(request.documents, "OTHER");
              if (contractDocs.length === 0 && otherDocs.length === 0) return null;
              return (
                <div className="space-y-4 mb-4">
                  {contractDocs.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{tf("shareholderContractLabel")}</p>
                      <DocList documents={contractDocs} />
                    </div>
                  )}
                  {otherDocs.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{tf("otherDocsLabel")}</p>
                      <DocList documents={otherDocs} />
                    </div>
                  )}
                </div>
              );
            })()}
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
              {request.updateType && (
                <Field label={tu("label")} value={tu(request.updateType as Parameters<typeof tu>[0])} />
              )}
            </div>
          </SectionCard>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <SectionCard icon={<Pencil className="h-4 w-4" />} title={trev("title")}>
            <RequestRevisionHistory revisions={request.revisions} />
          </SectionCard>
          <SectionCard icon={<History className="h-4 w-4" />} title={t("log.title")}>
            <RequestActivityLog logs={request.logs} />
          </SectionCard>
        </div>
        </div>
      )}

      <Dialog open={certificateOpen} onOpenChange={setCertificateOpen}>
        <DialogContent className="inset-4 max-w-none w-auto h-auto translate-x-0 translate-y-0 flex flex-col">
          <DialogHeader>
            <DialogTitle>{t("downloadCertificate")}</DialogTitle>
            <DialogDescription>{t("downloadCertificatePreview")}</DialogDescription>
          </DialogHeader>
          <div className="flex-1 rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
            {certificateOpen && (
              <iframe
                src={`/api/portal/beneficiary/requests/${id}/certificate`}
                title={t("downloadCertificate")}
                className="w-full h-full"
              />
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={handleDownloadCertificate}
              disabled={downloadingCertificate}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              <Download className="h-4 w-4" />
              {downloadingCertificate ? t("downloading") : t("download")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
