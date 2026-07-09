import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import RequestDetail from "@/components/portal/beneficiary/RequestDetail";

export const metadata: Metadata = {
  title: "Request Detail — Secured Nominee Shareholder",
};

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function RequestDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <RequestDetail id={id} />;
}
