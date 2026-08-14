import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import EditRequest from "@/components/portal/beneficiary/EditRequest";

export const metadata: Metadata = {
  title: "Edit Request — Secured Nominee Shareholder",
  description: "Edit and resubmit a returned or approved request.",
};

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function EditRequestPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <EditRequest id={id} />;
}
