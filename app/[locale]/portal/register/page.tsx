import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AuthBrandSection } from "@/components/auth/auth-brand-section";
import { RegisterForm } from "@/components/portal/RegisterForm";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Register — Secured Nominee Shareholder",
  description: "Register for Online Filing Information, and Nominee Shareholder Agreements.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative flex min-h-screen">
      <AuthBrandSection />
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
