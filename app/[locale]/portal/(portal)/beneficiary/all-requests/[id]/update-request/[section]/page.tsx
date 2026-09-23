import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import BeneficiaryRequestForm from "@/components/portal/beneficiary/BeneficiaryRequestForm";
import { UPDATE_SECTION_STEPS, type UpdateSection } from "@/lib/update-sections";

export const metadata: Metadata = {
  title: "Request to Update — Secured Nominee Shareholder",
  description: "Request an update to one section of an approved request.",
};

type Props = { params: Promise<{ locale: string; id: string; section: string }> };

// One page per detail-page section (reached from its "Request To Update"
// button) — the wizard shows only that step.
export default async function UpdateRequestSectionPage({ params }: Props) {
  const { locale, id, section } = await params;
  setRequestLocale(locale);
  const step = UPDATE_SECTION_STEPS[section as UpdateSection];
  if (!step) notFound();
  return <BeneficiaryRequestForm editId={id} sectionOnly={step} />;
}
