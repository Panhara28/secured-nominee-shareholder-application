"use client";

import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "@/lib/navigation";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const t = useTranslations("portal.register");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/portal/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
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

  const field = (id: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData((p) => ({ ...p, [id]: e.target.value }));

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">{t("title")}</h2>
        <p className="text-slate-600">{t("subtitle")}</p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName">{t("fullName")}</Label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              id="fullName"
              type="text"
              required
              className="pl-10"
              placeholder={t("fullNamePlaceholder")}
              value={formData.fullName}
              onChange={field("fullName")}
            />
          </div>
        </div>

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
              value={formData.email}
              onChange={field("email")}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="username">{t("username")}</Label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              id="username"
              type="text"
              required
              className="pl-10"
              placeholder={t("usernamePlaceholder")}
              value={formData.username}
              onChange={field("username")}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password">{t("password")}</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              className="pl-10 pr-10"
              placeholder={t("passwordPlaceholder")}
              value={formData.password}
              onChange={field("password")}
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
              onChange={field("confirmPassword")}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 hover:from-blue-600 hover:via-blue-500 hover:to-blue-400 text-white mt-2"
          disabled={isLoading}
        >
          <UserPlus className="h-4 w-4" />
          {isLoading ? t("registering") : t("register")}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        {t("haveAccount")}{" "}
        <Link href="/portal/login" className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
          {t("signIn")}
        </Link>
      </p>
    </div>
  );
}
