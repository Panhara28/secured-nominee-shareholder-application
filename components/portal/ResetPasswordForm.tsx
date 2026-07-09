"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, ArrowLeft, KeyRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "@/lib/navigation";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = { token: string };

export function ResetPasswordForm({ token }: Props) {
  const t = useTranslations("portal.resetPassword");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/portal/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: formData.newPassword }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? t("error"));
      }
      toast.success(t("success"));
      router.push("/portal/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("error"));
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">{t("title")}</h2>
        <p className="text-slate-600">{t("subtitle")}</p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="newPassword">{t("newPassword")}</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              className="pl-10 pr-10"
              placeholder={t("newPasswordPlaceholder")}
              value={formData.newPassword}
              onChange={(e) => setFormData((p) => ({ ...p, newPassword: e.target.value }))}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div>
          <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              className="pl-10"
              placeholder={t("confirmPasswordPlaceholder")}
              value={formData.confirmPassword}
              onChange={(e) => setFormData((p) => ({ ...p, confirmPassword: e.target.value }))}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 hover:from-blue-600 hover:via-blue-500 hover:to-blue-400 text-white"
          disabled={isLoading}
        >
          <KeyRound className="h-4 w-4" />
          {isLoading ? t("submitting") : t("submit")}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/portal/login"
          className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToLogin")}
        </Link>
      </div>
    </div>
  );
}
