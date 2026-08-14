import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AuthBrandSection } from "@/components/auth/auth-brand-section";
import { ResetPasswordForm } from "@/components/portal/ResetPasswordForm";
import { redirect } from "@/lib/navigation";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Set New Password — Secured Nominee Shareholder",
  description: "Enter your new password to complete the reset.",
};

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
};

export default async function ResetPasswordPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { token } = await searchParams;
  setRequestLocale(locale);

  if (!token) {
    return redirect({ href: "/portal/forgot-password", locale });
  }

  return (
    <div className="relative flex min-h-screen">
      <AuthBrandSection />
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
