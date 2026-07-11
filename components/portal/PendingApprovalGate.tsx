"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { AlertTriangle, Building2, Clock, Mail, RefreshCw, ShieldCheck, User } from "lucide-react";
import { useRouter } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  fullName: string;
  companyName: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  returnReason: string | null;
};

export default function PendingApprovalGate({ fullName, companyName, firstName, lastName, email, returnReason }: Props) {
  const t = useTranslations("portal.pendingApproval");
  const tr = useTranslations("portal.register");
  const router = useRouter();
  const [isRefreshing, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: companyName ?? "",
    lastName: lastName ?? "",
    firstName: firstName ?? "",
    email,
  });

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const field = (id: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData((p) => ({ ...p, [id]: e.target.value }));

  const handleResubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/portal/auth/resubmit-registration", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? t("resubmitError"));
      }
      toast.success(t("resubmitSuccess"));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("resubmitError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (returnReason) {
    return (
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md text-center bg-white rounded-2xl border border-slate-200 shadow-sm px-8 py-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
            <AlertTriangle className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t("returnedTitle")}</h2>
          <p className="text-slate-600 leading-relaxed">{t("returnedMessage", { fullName })}</p>
          <div className="mt-5 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-left text-sm text-amber-800">
            {returnReason}
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-md bg-red-100 text-red-700 text-sm text-left">{error}</div>
          )}

          <form onSubmit={handleResubmit} className="mt-6 space-y-4 text-left">
            <div>
              <Label htmlFor="companyName">{tr("companyName")}</Label>
              <div className="relative mt-1">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  id="companyName"
                  type="text"
                  required
                  className="pl-10"
                  value={formData.companyName}
                  onChange={field("companyName")}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lastName">{tr("lastName")}</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    id="lastName"
                    type="text"
                    required
                    className="pl-10"
                    value={formData.lastName}
                    onChange={field("lastName")}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="firstName">{tr("firstName")}</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    id="firstName"
                    type="text"
                    required
                    className="pl-10"
                    value={formData.firstName}
                    onChange={field("firstName")}
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="email">{tr("email")}</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  required
                  className="pl-10"
                  value={formData.email}
                  onChange={field("email")}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 hover:from-blue-600 hover:via-blue-500 hover:to-blue-400 text-white mt-2"
            >
              {isSubmitting ? t("resubmitting") : t("resubmit")}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md text-center bg-white rounded-2xl border border-slate-200 shadow-sm px-8 py-10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
          <ShieldCheck className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">{t("title")}</h2>
        <p className="text-slate-600 leading-relaxed">{t("message", { fullName })}</p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2.5 text-sm text-amber-800">
          <Clock className="h-4 w-4 flex-shrink-0" />
          {t("timeframe")}
        </div>

        <Button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="w-full bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 hover:from-blue-600 hover:via-blue-500 hover:to-blue-400 text-white mt-8"
        >
          <RefreshCw className={isRefreshing ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
          {isRefreshing ? t("refreshing") : t("refresh")}
        </Button>
      </div>
    </div>
  );
}
