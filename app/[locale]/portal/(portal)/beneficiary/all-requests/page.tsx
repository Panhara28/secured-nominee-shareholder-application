import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AllRequestsList from "@/components/portal/beneficiary/AllRequestsList";

export const metadata: Metadata = {
  title: "All Requests — Secured Nominee Shareholder",
};

type Props = { params: Promise<{ locale: string }> };

export default async function AllRequestsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AllRequestsList />;
}
