import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AuthBrandSection } from "@/components/auth/auth-brand-section";
import { LoginForm } from "@/components/portal/LoginForm";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Sign In — Secured Nominee Shareholder",
  description: "Logon to Online Filing Information, and Nominee Shareholder Agreements.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative flex min-h-screen">
      <AuthBrandSection />
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
