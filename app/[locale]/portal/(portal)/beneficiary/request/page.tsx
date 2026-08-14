import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import BeneficiaryRequestForm from "@/components/portal/beneficiary/BeneficiaryRequestForm";

export const metadata: Metadata = {
  title: "Request Add Beneficiary Owner — Secured Nominee Shareholder",
  description: "Fill in all required fields to submit a new beneficiary owner request.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function BeneficiaryRequestPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BeneficiaryRequestForm />;
}
