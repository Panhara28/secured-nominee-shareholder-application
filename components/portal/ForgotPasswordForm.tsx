"use client";

import { useState } from "react";
import { Mail, ArrowLeft, Copy, Check, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm() {
  const t = useTranslations("portal.forgotPassword");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetLink, setResetLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/portal/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? t("error"));
      setResetLink(data.resetLink as string);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!resetLink) return;
    await navigator.clipboard.writeText(resetLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

      {resetLink ? (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <p className="text-sm font-medium text-green-800 mb-3">{t("resetLinkLabel")}</p>
            <div className="flex items-center gap-2">
              <a
                href={resetLink}
                className="flex-1 text-xs text-blue-700 break-all hover:underline"
              >
                {resetLink}
              </a>
              <button
                onClick={handleCopy}
                className="shrink-0 p-1.5 rounded-md bg-white border border-green-300 text-green-700 hover:bg-green-100 transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center">
            This link expires in 1 hour. (Simulation — no email was sent.)
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="email">{t("email")}</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                id="email"
                type="email"
                required
                className="pl-10"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 hover:from-blue-600 hover:via-blue-500 hover:to-blue-400 text-white"
            disabled={isLoading}
          >
            <Send className="h-4 w-4" />
            {isLoading ? t("submitting") : t("submit")}
          </Button>
        </form>
      )}

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
