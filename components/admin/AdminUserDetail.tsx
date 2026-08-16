"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link, useRouter } from "@/lib/navigation";
import {
  AlertTriangle, ArrowLeft, Building2, CheckCircle2, Loader2, Mail, MessageSquare, Phone, RotateCcw, ShieldCheck, User, X, XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function formatDateTime(iso: string | null): string {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  const date = `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return `${date} ${time}`;
}

function Field({ label, value, icon }: { label: string; value: string | null | undefined; icon?: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-slate-800 flex items-center gap-1.5">
        {icon}
        {value || "-"}
      </p>
    </div>
  );
}

function SectionCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
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

type UserDetailData = {
  id: number;
  fullName: string;
  companyName: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  username: string;
  phoneNumber: string | null;
  isActive: boolean;
  registrationReturnReason: string | null;
  registrationReturnedAt: string | null;
  createdAt: string;
};

export default function AdminUserDetail({ id }: { id: string }) {
  const t = useTranslations("admin.users");
  const ta = useTranslations("beneficiary.allRequests");
  const tr = useTranslations("admin.requests");
  const router = useRouter();

  const [data, setData] = useState<UserDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [acting, setActing] = useState<"approve" | "reject" | "return" | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<{ verified: boolean; issues: string[]; checkedAt: string } | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const [returnOpen, setReturnOpen] = useState(false);
  const [returnReason, setReturnReason] = useState("");
  const [returnReasonError, setReturnReasonError] = useState<string | null>(null);

  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectReasonError, setRejectReasonError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/secured/admin/users/${id}`);
        if (!res.ok) throw new Error();
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setError(t("loadError"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();

    // Real-time: refetch if this registration is acted on from elsewhere
    // (e.g. another admin, or the same admin in another tab).
    const source = new EventSource("/api/secured/admin/users/stream");
    source.onmessage = () => load();

    return () => {
      cancelled = true;
      source.close();
    };
    // `t` intentionally excluded — see AdminActivitiesLogList.tsx for why
    // including a translation function here would tear down/recreate the
    // EventSource on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAction = async (action: "approve" | "reject" | "return", reason?: string) => {
    setActing(action);
    try {
      const res = await fetch(`/api/secured/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...(reason && { reason }) }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error);
      }
      if (action === "approve") {
        toast.success(t("approveSuccess"));
        setData((d) => (d ? { ...d, isActive: true, registrationReturnReason: null, registrationReturnedAt: null } : d));
      } else if (action === "return") {
        toast.success(t("returnSuccess"));
        setReturnOpen(false);
        router.push("/secured/admin/users");
      } else {
        toast.success(t("rejectSuccess"));
        setRejectOpen(false);
        router.push("/secured/admin/users");
      }
    } catch (err) {
      const fallback = action === "approve" ? t("approveError") : action === "return" ? t("returnError") : t("rejectError");
      toast.error(err instanceof Error && err.message ? err.message : fallback);
    } finally {
      setActing(null);
    }
  };

  const handleVerify = async () => {
    setVerifyError(null);
    setVerifying(true);
    try {
      const res = await fetch(`/api/secured/admin/users/${id}/verify`, { method: "POST" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: t("verifyError") }));
        setVerifyError(err.error ?? t("verifyError"));
        return;
      }
      const result = await res.json();
      setVerifyResult(result);
    } catch {
      setVerifyError(t("verifyError"));
    } finally {
      setVerifying(false);
    }
  };

  const openReturnDialog = () => {
    setReturnReason(verifyResult && !verifyResult.verified ? verifyResult.issues.join("\n") : "");
    setReturnReasonError(null);
    setReturnOpen(true);
  };

  const handleConfirmReturn = () => {
    if (!returnReason.trim()) {
      setReturnReasonError(tr("reasonRequired"));
      return;
    }
    setReturnReasonError(null);
    handleAction("return", returnReason.trim());
  };

  const openRejectDialog = () => {
    setRejectReason(verifyResult && !verifyResult.verified ? verifyResult.issues.join("\n") : "");
    setRejectReasonError(null);
    setRejectOpen(true);
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      setRejectReasonError(tr("reasonRequired"));
      return;
    }
    setRejectReasonError(null);
    handleAction("reject", rejectReason.trim());
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400 inline-block" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-4">
        <Link href="/secured/admin/users" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline">
          <ArrowLeft className="h-4 w-4" />
          {ta("backToList")}
        </Link>
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error ?? ta("notFound")}
        </div>
      </div>
    );
  }

  const status = data.isActive ? "ACTIVE" : data.registrationReturnReason ? "RETURNED" : "PENDING";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Link href="/secured/admin/users" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline">
          <ArrowLeft className="h-4 w-4" />
          {ta("backToList")}
        </Link>
        {!data.isActive && (
          <div className="text-right space-y-1">
            <div className="flex gap-2">
              <button
                onClick={handleVerify}
                disabled={verifying || acting !== null}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors disabled:opacity-50"
              >
                {verifying ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                {verifying ? t("verifying") : t("verify")}
              </button>
              {verifyResult?.verified && (
                <button
                  onClick={() => handleAction("approve")}
                  disabled={acting !== null}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100 transition-colors disabled:opacity-50"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {t("approve")}
                </button>
              )}
              {verifyResult && !verifyResult.verified && (
                <button
                  onClick={openRejectDialog}
                  disabled={acting !== null}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  <XCircle className="h-4 w-4" />
                  {t("reject")}
                </button>
              )}
            </div>
            {verifyError && <p className="text-xs text-red-600">{verifyError}</p>}
          </div>
        )}
      </div>

      {verifyResult && !data.isActive && (
        <div
          className={cn(
            "flex items-start gap-3 rounded-xl border px-5 py-4",
            verifyResult.verified ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"
          )}
        >
          {verifyResult.verified ? (
            <ShieldCheck className="h-4.5 w-4.5 text-green-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="h-4.5 w-4.5 text-amber-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="min-w-0">
            <p className={cn("text-sm font-medium", verifyResult.verified ? "text-green-800" : "text-amber-800")}>
              {verifyResult.verified ? t("verifyPassed") : t("verifyFailed")}
            </p>
            {verifyResult.issues.length > 0 && (
              <ul className="mt-1 space-y-0.5 list-disc list-inside">
                {verifyResult.issues.map((issue, i) => (
                  <li key={i} className="text-sm text-amber-700">{issue}</li>
                ))}
              </ul>
            )}
            <p className="mt-1 text-xs text-slate-400">{formatDateTime(verifyResult.checkedAt)}</p>
            {!verifyResult.verified && (
              <button
                type="button"
                onClick={openReturnDialog}
                disabled={acting !== null}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-orange-100 hover:bg-orange-200 px-4 py-2 text-sm font-medium text-orange-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <RotateCcw className="h-4 w-4" />
                {acting === "return" ? t("returning") : t("return")}
              </button>
            )}
          </div>
        </div>
      )}

      {status === "RETURNED" && data.registrationReturnReason && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <MessageSquare className="h-4.5 w-4.5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-amber-800">{t("returnReasonLabel")}</p>
            <p className="mt-1 text-sm text-amber-700">{data.registrationReturnReason}</p>
            <p className="mt-1 text-xs text-slate-400">{formatDateTime(data.registrationReturnedAt)}</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-xl font-semibold text-slate-800">{data.fullName}</h1>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
            status === "ACTIVE" ? "bg-green-50 text-green-700" : status === "RETURNED" ? "bg-orange-50 text-orange-700" : "bg-amber-50 text-amber-700"
          )}
        >
          {status === "ACTIVE" ? t("statusActive") : status === "RETURNED" ? t("statusReturned") : t("statusPending")}
        </span>
      </div>

      <SectionCard icon={<User className="h-4 w-4" />} title={t("col.name")}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <Field label={t("col.name")} value={data.fullName} />
          <Field label={t("col.company")} value={data.companyName} icon={<Building2 className="h-3.5 w-3.5 text-slate-400" />} />
          <Field label={t("col.registeredAt")} value={formatDateTime(data.createdAt)} />
          <Field label="Email" value={data.email} icon={<Mail className="h-3.5 w-3.5 text-slate-400" />} />
          <Field label="Username" value={`@${data.username}`} />
          <Field label="Phone" value={data.phoneNumber} icon={<Phone className="h-3.5 w-3.5 text-slate-400" />} />
        </div>
      </SectionCard>

      <Dialog open={returnOpen} onOpenChange={setReturnOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("returnDialogTitle")}</DialogTitle>
            <DialogDescription>{t("returnDialogDescription")}</DialogDescription>
          </DialogHeader>
          <Textarea
            value={returnReason}
            onChange={(e) => { setReturnReason(e.target.value); if (returnReasonError) setReturnReasonError(null); }}
            placeholder={tr("reasonPlaceholder")}
            rows={4}
          />
          {returnReasonError && <p className="mt-1.5 text-xs text-red-600">{returnReasonError}</p>}
          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={acting !== null}>
                  <X className="h-4 w-4" />
                  {tr("cancel")}
                </Button>
              }
            />
            <Button type="button" onClick={handleConfirmReturn} disabled={acting !== null} className="bg-orange-600 hover:bg-orange-700 text-white">
              <RotateCcw className="h-4 w-4" />
              {acting === "return" ? t("returning") : t("confirmReturn")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tr("rejectDialogTitle")}</DialogTitle>
            <DialogDescription>{tr("rejectDialogDescription")}</DialogDescription>
          </DialogHeader>
          <Textarea
            value={rejectReason}
            onChange={(e) => { setRejectReason(e.target.value); if (rejectReasonError) setRejectReasonError(null); }}
            placeholder={tr("reasonPlaceholder")}
            rows={4}
          />
          {rejectReasonError && <p className="mt-1.5 text-xs text-red-600">{rejectReasonError}</p>}
          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={acting !== null}>
                  <X className="h-4 w-4" />
                  {tr("cancel")}
                </Button>
              }
            />
            <Button type="button" onClick={handleConfirmReject} disabled={acting !== null} className="bg-red-600 hover:bg-red-700 text-white">
              <XCircle className="h-4 w-4" />
              {acting === "reject" ? t("rejecting") : tr("confirmReject")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
