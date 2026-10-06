"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/lib/navigation";
import { AlertTriangle, ArrowLeft, Building2, CheckCircle2, FileText, GitCompare, History, Loader2, MessageSquare, PanelRightClose, PanelRightOpen, Pencil, RotateCcw, ShieldCheck, Users, X, XCircle } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { STEP_BY_UPDATE_TYPE } from "@/lib/update-sections";
import { splitReasonItems } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import RequestActivityLog, { type ActivityLogEntry } from "@/components/beneficiary/RequestActivityLog";
import RequestRevisionHistory, { PendingUpdateChanges, type RequestRevisionEntry } from "@/components/beneficiary/RequestRevisionHistory";
import { sharedEventSource } from "@/lib/shared-event-source";

function formatDate(iso: string | null): string {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-slate-800 break-words">{value || "-"}</p>
    </div>
  );
}

// No admin-authenticated document download route exists yet (a pre-existing
// gap — the admin detail previously read non-existent shIdDocNames/etc.
// fields for this), so filenames are shown as plain text rather than links.
function DocList({ documents }: { documents: ApiDocument[] }) {
  if (documents.length === 0) return <p className="text-sm text-slate-400">-</p>;
  return (
    <ul className="space-y-0.5">
      {documents.map((d) => (
        <li key={d.id} className="flex items-center gap-1 text-sm text-slate-800 truncate">
          <span className="text-green-500 font-bold">✓</span>
          {d.media.filename}
        </li>
      ))}
    </ul>
  );
}

function SectionCard({
  icon,
  title,
  headerAction,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100">
        <span className="text-blue-600">{icon}</span>
        <h3 className="text-sm font-semibold text-slate-700 flex-1">{title}</h3>
        {headerAction}
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
          src={`/api/secured/admin/documents/${document.id}/download`}
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
  nomineeShareholders: PersonEntryData[];
  beneficialOwners: OwnerEntryData[];
  agreements: AgreementEntryData[];
  submittedAt: string;
  updatedAt: string;
  rejectionReason: string | null;
  logs: ActivityLogEntry[];
  revisions: RequestRevisionEntry[];
  documents?: ApiDocument[];
  // FLAG: BeneficiaryRequestsService.loadDetail() (shared by findOneAdmin and
  // findOnePortal) only includes { logs, revisions, documents } — no `user`
  // relation — so GET /secured/admin/requests/:id never actually returns a
  // `user` field, even though the admin list endpoint's row shape does
  // include submittedByName/submittedByUsername. Treating this as optional
  // and guarding the render below rather than assuming the backend will
  // supply it; worth confirming with the API owner whether the detail
  // endpoint should include the user relation.
  user?: { fullName: string; username: string };
};

type PersonEntryData = {
  id: number;
  lastNameKh: string | null; firstNameKh: string | null; lastNameEn: string; firstNameEn: string;
  dob: string; becameDate: string; nationality: string; gender: "M" | "F";
  idCard: string | null; idIssuedDate: string | null; idExpiredDate: string | null;
  email: string | null; phone: string | null;
};
type OwnerEntryData = PersonEntryData & { shareAmount: string };
type AgreementEntryData = { id: number; agreementDate: string | null; consentAgreed: boolean };

type DocCategory = "SH_PHOTO" | "SH_ID_DOC" | "OWNER_PHOTO" | "OWNER_ID_DOC" | "SHAREHOLDER_CONTRACT" | "OTHER";
type ApiDocument = {
  id: number;
  category: DocCategory;
  media: { filename: string };
  nomineeShareholderId?: number | null;
  beneficialOwnerId?: number | null;
  agreementId?: number | null;
};

function docsByCategory(documents: ApiDocument[] | undefined, category: DocCategory, entityId?: number) {
  return (documents ?? []).filter((d) => {
    if (d.category !== category) return false;
    if (entityId === undefined) return true;
    return d.nomineeShareholderId === entityId || d.beneficialOwnerId === entityId || d.agreementId === entityId;
  });
}

export default function AdminRequestDetail({ id }: { id: string }) {
  const t = useTranslations("beneficiary.allRequests");
  const tf = useTranslations("beneficiary.request");
  const ta = useTranslations("admin.requests");
  const trev = useTranslations("beneficiary.revisions");
  const tu = useTranslations("updateTypes");
  const trt = useTranslations("requestTypes");
  const router = useRouter();
  const [request, setRequest] = useState<RequestDetailData | null | undefined>(undefined);
  const [error, setError] = useState(false);
  const [acting, setActing] = useState<"approve" | "reject" | "return" | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectReasonError, setRejectReasonError] = useState<string | null>(null);
  const [returnOpen, setReturnOpen] = useState(false);
  const [returnReason, setReturnReason] = useState("");
  const [returnReasonError, setReturnReasonError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<{ verified: boolean; issues: string[]; checkedAt: string } | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [editHistoryOpen, setEditHistoryOpen] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchDetail() {
      setError(false);
      try {
        const res = await fetch(`/api/secured/admin/requests/${id}`);
        if (cancelled) return;
        if (res.status === 404) {
          setRequest(null);
          return;
        }
        if (!res.ok) {
          setError(true);
          return;
        }
        const data = await res.json();
        // A verify result reflects the data as it was at the time of that
        // check — if the request's data has changed since (e.g. the
        // shareholder just resubmitted after a return), the old result is
        // stale and must not keep showing until re-verified.
        setRequest((prev) => {
          if (prev && prev.updatedAt !== data.updatedAt) {
            setVerifyResult(null);
            setVerifyError(null);
          }
          return data;
        });
      } catch {
        if (!cancelled) setError(true);
      }
    }

    fetchDetail();

    // Real-time: refetch (status, logs, revisions, etc.) the instant this
    // or any other request changes, instead of only on page load.
    const source = sharedEventSource("/api/secured/admin/notifications/stream");
    source.onmessage = () => fetchDetail();

    return () => {
      cancelled = true;
      source.close();
    };
  }, [id]);

  const genderLabel = (g: "M" | "F") => (g === "M" ? tf("genderMale") : tf("genderFemale"));

  const handleAction = async (action: "approve" | "reject" | "return", reason?: string) => {
    setActionError(null);
    setActing(action);
    try {
      const res = await fetch(`/api/secured/admin/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...(reason && { reason }) }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: ta("actionError") }));
        setActionError(err.error ?? ta("actionError"));
        return;
      }
      setRequest(await res.json());
      setRejectOpen(false);
      setRejectReason("");
      setReturnOpen(false);
      setReturnReason("");
    } catch {
      setActionError(ta("actionError"));
    } finally {
      setActing(null);
    }
  };

  const handleVerify = async () => {
    setVerifyError(null);
    setVerifying(true);
    try {
      const res = await fetch(`/api/secured/admin/requests/${id}/verify`, { method: "POST" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: ta("verifyError") }));
        setVerifyError(err.error ?? ta("verifyError"));
        return;
      }
      const result = await res.json();
      setVerifyResult(result);
      setRequest((prev) => (prev ? { ...prev, status: result.status } : prev));
    } catch {
      setVerifyError(ta("verifyError"));
    } finally {
      setVerifying(false);
    }
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      setRejectReasonError(ta("reasonRequired"));
      return;
    }
    setRejectReasonError(null);
    handleAction("reject", rejectReason.trim());
  };

  const openReturnDialog = () => {
    setReturnReason("");
    setReturnReasonError(null);
    setReturnOpen(true);
  };

  const addReturnSuggestion = (issue: string) => {
    setReturnReason((prev) => (prev.trim() ? `${prev}\n${issue}` : issue));
    if (returnReasonError) setReturnReasonError(null);
  };

  const handleConfirmReturn = () => {
    if (!returnReason.trim()) {
      setReturnReasonError(ta("reasonRequired"));
      return;
    }
    setReturnReasonError(null);
    handleAction("return", returnReason.trim());
  };

  const companyAddress = request
    ? [request.companyHouse, request.companyStreet, request.companyVillage, request.companyCommune, request.companyDistrict, request.companyProvince]
        .filter(Boolean)
        .join(", ")
    : "";

  // A pending per-section update is reviewed on its own: show only the
  // section the applicant changed (see updateType / lib/update-sections.ts).
  const reviewStep =
    request?.status === "UPDATE_REQUESTED" && request.updateType
      ? STEP_BY_UPDATE_TYPE[request.updateType]
      : undefined;
  const showSection = (step: number) => !reviewStep || step === reviewStep;

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
          <>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500 mb-0.5">{t("detailTitle")}</p>
              <h1 className="text-lg font-semibold text-slate-800 font-mono">{request.requestNo}</h1>
              <p className="text-sm text-slate-500">
                {request.companyNameEn}
                {request.companyNameKh ? ` · ${request.companyNameKh}` : ""}
              </p>
              {request.user && (
                <p className="text-xs text-slate-400 mt-1">
                  {ta("submittedBy")}: {request.user.fullName} (@{request.user.username})
                </p>
              )}
            </div>
            <div className="flex-shrink-0 text-right space-y-2">
              {(request.status === "PENDING" || request.status === "IN_REVIEW" || request.status === "UPDATE_REQUESTED") && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleVerify}
                    disabled={verifying || acting !== null}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {verifying ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                    {verifying ? ta("verifying") : ta("verify")}
                  </button>
                  {verifyResult?.verified && (
                    <button
                      type="button"
                      onClick={() => handleAction("approve")}
                      disabled={acting !== null}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 hover:bg-green-700 px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {acting === "approve" ? ta("approving") : ta("approve")}
                    </button>
                  )}
                </div>
              )}
              {/* Dissolve requests have no verify step — the shareholder-supplied
                  reason is the review basis, so Approve/Deny are always available. */}
              {request.status === "DISSOLVE_REQUESTED" && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleAction("approve")}
                    disabled={acting !== null}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 hover:bg-red-700 px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {acting === "approve" ? ta("dissolveApproving") : ta("dissolveApprove")}
                  </button>
                </div>
              )}
              {actionError && <p className="mt-1 text-xs text-red-600 max-w-xs">{actionError}</p>}
              {verifyError && <p className="mt-1 text-xs text-red-600 max-w-xs">{verifyError}</p>}
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 mt-2">
            <div className="flex items-center gap-2">
              <StatusBadge status={request.status} label={t(`status.${request.status}` as Parameters<typeof t>[0])} />
              {request.status === "UPDATE_REQUESTED" && (
                <Link
                  href={`/secured/admin/revisions?requestId=${request.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700 transition-colors"
                >
                  <GitCompare className="h-3.5 w-3.5" />
                  {trev("diffCompare")}
                </Link>
              )}
            </div>
            <p className="text-xs text-slate-500 flex-shrink-0">
              {t("col.submittedAt")}: <span className="font-medium text-slate-700">{formatDate(request.submittedAt)}</span>
            </p>
          </div>
          </>
        ) : (
          <h1 className="text-lg font-semibold text-slate-800">{t("detailTitle")}</h1>
        )}
      </div>

      {verifyResult && request && (request.status === "PENDING" || request.status === "IN_REVIEW" || request.status === "UPDATE_REQUESTED") && (
        <div
          className={`flex items-start gap-3 rounded-xl border px-5 py-4 ${
            verifyResult.verified ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"
          }`}
        >
          {verifyResult.verified ? (
            <ShieldCheck className="h-4.5 w-4.5 text-green-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="h-4.5 w-4.5 text-amber-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="min-w-0">
            <p className={`text-sm font-medium ${verifyResult.verified ? "text-green-800" : "text-amber-800"}`}>
              {verifyResult.verified ? ta("verifyPassed") : ta("verifyFailed")}
            </p>
            {verifyResult.issues.length > 0 && (
              <ul className="mt-1 space-y-0.5 list-disc list-inside">
                {verifyResult.issues.map((issue, i) => (
                  <li key={i} className="text-sm text-amber-700">{issue}</li>
                ))}
              </ul>
            )}
            <p className="mt-1 text-xs text-slate-400">{formatDate(verifyResult.checkedAt)}</p>
            {/* Item 40: shown whether verification failed or passed — an
                admin may still want to return a request that verified clean
                (e.g. an issue they spotted manually). The reason dialog
                already requires a reason either way (openReturnDialog only
                pre-fills it from verifyResult.issues when verification
                failed; a passing verify starts with an empty, still-required
                reason field). */}
            <button
              type="button"
              onClick={openReturnDialog}
              disabled={acting !== null}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-orange-100 hover:bg-orange-200 px-4 py-2 text-sm font-medium text-orange-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <RotateCcw className="h-4 w-4" />
              {acting === "return" ? ta("returning") : ta("return")}
            </button>
          </div>
        </div>
      )}

      {request && (request.status === "REJECTED" || request.status === "RETURNED") && request.rejectionReason && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <MessageSquare className="h-4.5 w-4.5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-amber-800">
              {request.status === "RETURNED" ? ta("returnReason") : ta("rejectionReason")}
            </p>
            <ol className="mt-0.5 text-sm text-amber-700 list-decimal list-inside space-y-0.5">
              {splitReasonItems(request.rejectionReason).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      )}

      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{ta("rejectDialogTitle")}</DialogTitle>
            <DialogDescription>{ta("rejectDialogDescription")}</DialogDescription>
          </DialogHeader>
          <Textarea
            value={rejectReason}
            onChange={(e) => { setRejectReason(e.target.value); if (rejectReasonError) setRejectReasonError(null); }}
            placeholder={ta("reasonPlaceholder")}
            rows={4}
          />
          {rejectReasonError && <p className="mt-1.5 text-xs text-red-600">{rejectReasonError}</p>}
          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={acting !== null}>
                  <X className="h-4 w-4" />
                  {ta("cancel")}
                </Button>
              }
            />
            <Button type="button" variant="destructive" onClick={handleConfirmReject} disabled={acting !== null}>
              <XCircle className="h-4 w-4" />
              {acting === "reject" ? ta("rejecting") : ta("confirmReject")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={returnOpen} onOpenChange={setReturnOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{ta("returnDialogTitle")}</DialogTitle>
            <DialogDescription>{ta("returnDialogDescription")}</DialogDescription>
          </DialogHeader>
          <Textarea
            value={returnReason}
            onChange={(e) => { setReturnReason(e.target.value); if (returnReasonError) setReturnReasonError(null); }}
            placeholder={ta("reasonPlaceholder")}
            rows={4}
          />
          {returnReasonError && <p className="mt-1.5 text-xs text-red-600">{returnReasonError}</p>}
          {verifyResult && !verifyResult.verified && verifyResult.issues.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-slate-500 mb-1.5">{ta("suggestionsLabel")}</p>
              <div className="flex flex-wrap gap-1.5">
                {verifyResult.issues.map((issue, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => addReturnSuggestion(issue)}
                    className="rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1 text-xs text-slate-700 transition-colors text-left"
                  >
                    {issue}
                  </button>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={acting !== null}>
                  <X className="h-4 w-4" />
                  {ta("cancel")}
                </Button>
              }
            />
            <Button type="button" onClick={handleConfirmReturn} disabled={acting !== null} className="bg-orange-600 hover:bg-orange-700 text-white">
              <RotateCcw className="h-4 w-4" />
              {acting === "return" ? ta("returning") : ta("confirmReturn")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {error ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-16 text-center text-slate-400 text-sm">
          {t("loadError")}
        </div>
      ) : request === undefined ? null : request === null ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-16 text-center text-slate-400 text-sm">
          {t("notFound")}
        </div>
      ) : (
        <div className={`grid grid-cols-1 gap-4 items-start ${editHistoryOpen ? "lg:grid-cols-12" : ""}`}>
        <div className={editHistoryOpen ? "lg:col-span-8 space-y-4" : "space-y-4"}>
          {!editHistoryOpen && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setEditHistoryOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors"
              >
                <PanelRightOpen className="h-3.5 w-3.5" />
                {trev("expand")} {trev("title")}
              </button>
            </div>
          )}
          {reviewStep && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3">
              <Pencil className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-amber-800">{trt(request.updateType as Parameters<typeof trt>[0])}</p>
                <p className="text-xs text-amber-700">{tu("reviewSectionOnly")}</p>
              </div>
            </div>
          )}
          {request.status === "UPDATE_REQUESTED" && <PendingUpdateChanges revisions={request.revisions} />}
          {/* 1. Company Information */}
          {showSection(1) && (
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
          )}

          {/* 2. Nominee Shareholder Information (repeatable) */}
          {showSection(2) && (
          <SectionCard icon={<Users className="h-4 w-4" />} title={`2. ${tf("nomineeGroupTitle")}`}>
            <div className="space-y-5">
              {request.nomineeShareholders.map((sh, idx) => (
                <div key={sh.id} className={idx > 0 ? "pt-5 border-t border-slate-100" : undefined}>
                  {request.nomineeShareholders.length > 1 && (
                    <p className="text-xs font-semibold text-blue-600 mb-2">{tf("entryNumber", { number: idx + 1 })}</p>
                  )}
                  <div className="flex items-start gap-6 mb-4">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Field label={t("shareholderName")} value={`${sh.lastNameEn} ${sh.firstNameEn}`.trim()} />
                      <Field label={t("ownerNameKh")} value={`${sh.lastNameKh ?? ""} ${sh.firstNameKh ?? ""}`.trim()} />
                      <Field label={tf("dob")} value={formatDate(sh.dob)} />
                      <Field label={tf("nationality")} value={sh.nationality} />
                      <Field label={tf("gender")} value={genderLabel(sh.gender)} />
                      <Field label={tf("idCard")} value={sh.idCard} />
                      <Field label={tf("issueDate")} value={formatDate(sh.idIssuedDate)} />
                      <Field label={tf("expiryDate")} value={formatDate(sh.idExpiredDate)} />
                      <Field label={tf("email")} value={sh.email} />
                      <Field label={tf("shBecameDate")} value={formatDate(sh.becameDate)} />
                      <Field label={tf("phone")} value={sh.phone} />
                    </div>
                    <PersonPhoto document={docsByCategory(request.documents, "SH_PHOTO", sh.id)[0]} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">{tf("idDocLabel")}</p>
                    <DocList documents={docsByCategory(request.documents, "SH_ID_DOC", sh.id)} />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
          )}

          {/* 3. Beneficial Owner Information (repeatable) */}
          {showSection(3) && (
          <SectionCard icon={<Users className="h-4 w-4" />} title={`3. ${tf("ownerGroupTitle")}`}>
            <div className="space-y-5">
              {request.beneficialOwners.map((o, idx) => (
                <div key={o.id} className={idx > 0 ? "pt-5 border-t border-slate-100" : undefined}>
                  {request.beneficialOwners.length > 1 && (
                    <p className="text-xs font-semibold text-blue-600 mb-2">{tf("entryNumber", { number: idx + 1 })}</p>
                  )}
                  <div className="flex items-start gap-6 mb-4">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Field label={t("ownerNameEn")} value={`${o.lastNameEn} ${o.firstNameEn}`.trim()} />
                      <Field label={t("ownerNameKh")} value={`${o.lastNameKh ?? ""} ${o.firstNameKh ?? ""}`.trim()} />
                      <Field label={tf("dob")} value={formatDate(o.dob)} />
                      <Field label={tf("nationality")} value={o.nationality} />
                      <Field label={tf("gender")} value={genderLabel(o.gender)} />
                      <Field label={tf("idCard")} value={o.idCard} />
                      <Field label={tf("issueDate")} value={formatDate(o.idIssuedDate)} />
                      <Field label={tf("expiryDate")} value={formatDate(o.idExpiredDate)} />
                      <Field label={tf("email")} value={o.email} />
                      <Field label={tf("becameDate")} value={formatDate(o.becameDate)} />
                      <Field label={tf("phone")} value={o.phone} />
                      <Field label={t("shareAmount")} value={o.shareAmount} />
                    </div>
                    <PersonPhoto document={docsByCategory(request.documents, "OWNER_PHOTO", o.id)[0]} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">{tf("idDocLabel")}</p>
                    <DocList documents={docsByCategory(request.documents, "OWNER_ID_DOC", o.id)} />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
          )}

          {/* 4. Agreement (repeatable) */}
          {showSection(4) && (
          <SectionCard icon={<FileText className="h-4 w-4" />} title={`4. ${tf("agreementGroupTitle")}`}>
            <div className="space-y-5">
              {request.agreements.map((a, idx) => (
                <div key={a.id} className={idx > 0 ? "pt-5 border-t border-slate-100" : undefined}>
                  {request.agreements.length > 1 && (
                    <p className="text-xs font-semibold text-blue-600 mb-2">{tf("entryNumber", { number: idx + 1 })}</p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{tf("shareholderContractLabel")}</p>
                      <DocList documents={docsByCategory(request.documents, "SHAREHOLDER_CONTRACT", a.id)} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{tf("otherDocsLabel")}</p>
                      <DocList documents={docsByCategory(request.documents, "OTHER", a.id)} />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={a.consentAgreed}
                        disabled
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600"
                      />
                      <span className="text-sm text-slate-700">{tf("consentText")}</span>
                    </label>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field label={tf("agreementDate")} value={formatDate(a.agreementDate)} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field
                label={t("col.requestType")}
                value={trt.has(request.type) ? trt(request.type as Parameters<typeof trt>[0]) : request.type}
              />
              {request.updateType && request.updateType !== request.type && (
                <Field label={tu("label")} value={trt(request.updateType as Parameters<typeof trt>[0])} />
              )}
            </div>
          </SectionCard>
          )}

          {(request.status === "PENDING" || request.status === "IN_REVIEW" || request.status === "UPDATE_REQUESTED" || request.status === "DISSOLVE_REQUESTED") && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => { setRejectReason(""); setRejectReasonError(null); setRejectOpen(true); }}
                disabled={acting !== null}
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 hover:bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <XCircle className="h-4 w-4" />
                {request.status === "DISSOLVE_REQUESTED"
                  ? (acting === "reject" ? ta("denyingDissolve") : ta("denyDissolve"))
                  : (acting === "reject" ? ta("rejecting") : ta("reject"))}
              </button>
            </div>
          )}
        </div>

        {editHistoryOpen && (
          <div className="lg:col-span-4 space-y-4">
            <SectionCard
              icon={<Pencil className="h-4 w-4" />}
              title={trev("title")}
              headerAction={
                <button
                  type="button"
                  onClick={() => setEditHistoryOpen(false)}
                  aria-label={trev("collapse")}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <PanelRightClose className="h-4 w-4" />
                </button>
              }
            >
              <RequestRevisionHistory revisions={request.revisions} />
            </SectionCard>
            <SectionCard icon={<History className="h-4 w-4" />} title={t("log.title")}>
              <RequestActivityLog logs={request.logs} />
            </SectionCard>
          </div>
        )}
        </div>
      )}
    </div>
  );
}
