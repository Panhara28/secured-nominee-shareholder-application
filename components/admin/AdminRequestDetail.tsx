"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/lib/navigation";
import { AlertTriangle, ArrowLeft, Building2, CheckCircle2, FileText, GitCompare, History, Loader2, MessageSquare, Pencil, RotateCcw, ShieldCheck, Users, X, XCircle } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { splitReasonItems } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import RequestActivityLog, { type ActivityLogEntry } from "@/components/beneficiary/RequestActivityLog";
import RequestRevisionHistory, { type RequestRevisionEntry } from "@/components/beneficiary/RequestRevisionHistory";

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
  shBecameDate: string;
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
  ownerBecameDate: string;
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
  updatedAt: string;
  rejectionReason: string | null;
  logs: ActivityLogEntry[];
  revisions: RequestRevisionEntry[];
  user: { fullName: string; username: string };
};

export default function AdminRequestDetail({ id }: { id: string }) {
  const t = useTranslations("beneficiary.allRequests");
  const tf = useTranslations("beneficiary.request");
  const ta = useTranslations("admin.requests");
  const trev = useTranslations("beneficiary.revisions");
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
    const source = new EventSource("/api/secured/admin/notifications/stream");
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
    setReturnReason(verifyResult && !verifyResult.verified ? verifyResult.issues.join("\n") : "");
    setReturnReasonError(null);
    setReturnOpen(true);
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
              <p className="text-xs text-slate-400 mt-1">
                {ta("submittedBy")}: {request.user.fullName} (@{request.user.username})
              </p>
              <div className="flex items-center gap-2 mt-2">
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
            </div>
            {(request.status === "PENDING" || request.status === "IN_REVIEW" || request.status === "UPDATE_REQUESTED") && (
              <div className="flex-shrink-0 text-right space-y-2">
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
                {actionError && <p className="mt-1 text-xs text-red-600 max-w-xs">{actionError}</p>}
                {verifyError && <p className="mt-1 text-xs text-red-600 max-w-xs">{verifyError}</p>}
              </div>
            )}
          </div>
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
            {!verifyResult.verified && (
              <button
                type="button"
                onClick={openReturnDialog}
                disabled={acting !== null}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-orange-100 hover:bg-orange-200 px-4 py-2 text-sm font-medium text-orange-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <RotateCcw className="h-4 w-4" />
                {acting === "return" ? ta("returning") : ta("return")}
              </button>
            )}
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
                <Field label={tf("shBecameDate")} value={formatDate(request.shBecameDate)} />
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
                <Field label={tf("becameDate")} value={formatDate(request.ownerBecameDate)} />
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

        <div className="lg:col-span-4 space-y-4">
          <SectionCard icon={<Pencil className="h-4 w-4" />} title={trev("title")}>
            <RequestRevisionHistory revisions={request.revisions} />
          </SectionCard>
          <SectionCard icon={<History className="h-4 w-4" />} title={t("log.title")}>
            <RequestActivityLog logs={request.logs} />
          </SectionCard>

          {(request.status === "PENDING" || request.status === "IN_REVIEW" || request.status === "UPDATE_REQUESTED") && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => { setRejectReason(""); setRejectReasonError(null); setRejectOpen(true); }}
                disabled={acting !== null}
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 hover:bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <XCircle className="h-4 w-4" />
                {acting === "reject" ? ta("rejecting") : ta("reject")}
              </button>
            </div>
          )}
        </div>
        </div>
      )}
    </div>
  );
}
