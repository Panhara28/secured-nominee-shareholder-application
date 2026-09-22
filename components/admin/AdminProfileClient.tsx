"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ArrowLeft, Eye, EyeOff, KeyRound, Loader2, Mail, ShieldCheck, User } from "lucide-react";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Me = {
  fullName: string;
  username: string;
  email: string;
  staffRoleName: string | null;
};

function Field({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-slate-800 flex items-center gap-1.5">
        {icon}
        {value}
      </p>
    </div>
  );
}

export default function AdminProfileClient({ me }: { me: Me | null }) {
  const t = useTranslations("admin.profile");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError(t("mismatch"));
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/secured/admin/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? t("changeError"));
      }
      toast.success(t("changeSuccess"));
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("changeError"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <Link href="/secured/admin/dashboard" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        {t("backToDashboard")}
      </Link>
      <h1 className="text-xl font-semibold text-slate-800">{t("pageTitle")}</h1>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100">
          <User className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-slate-700">{t("accountInfo")}</h3>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label={t("fullName")} value={me?.fullName ?? "-"} />
          <Field label={t("username")} value={me?.username ?? "-"} />
          <Field label={t("email")} value={me?.email ?? "-"} icon={<Mail className="h-3.5 w-3.5 text-slate-400" />} />
          <Field
            label={t("staffRole")}
            value={me?.staffRoleName ?? t("noRole")}
            icon={<ShieldCheck className="h-3.5 w-3.5 text-slate-400" />}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100">
          <KeyRound className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-slate-700">{t("changePassword")}</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && <div className="p-3 rounded-md bg-red-100 text-red-700 text-sm">{error}</div>}

          <div>
            <Label htmlFor="currentPassword">{t("currentPassword")}</Label>
            <div className="relative mt-1">
              <Input
                id="currentPassword"
                type={showCurrent ? "text" : "password"}
                required
                className="pr-10"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                onClick={() => setShowCurrent((v) => !v)}
              >
                {showCurrent ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="newPassword">{t("newPassword")}</Label>
            <div className="relative mt-1">
              <Input
                id="newPassword"
                type={showNew ? "text" : "password"}
                required
                minLength={6}
                className="pr-10"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                onClick={() => setShowNew((v) => !v)}
              >
                {showNew ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
            <div className="relative mt-1">
              <Input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                required
                minLength={6}
                className="pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                onClick={() => setShowConfirm((v) => !v)}
              >
                {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {saving ? t("saving") : t("save")}
          </Button>
        </form>
      </div>
    </div>
  );
}
