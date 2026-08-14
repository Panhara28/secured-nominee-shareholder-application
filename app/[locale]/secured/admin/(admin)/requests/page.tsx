import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AdminRequestsList from "@/components/admin/AdminRequestsList";

export const metadata: Metadata = {
  title: "Admin Requests — Secured Nominee Shareholder",
  description: "Review, verify, approve, or reject submitted nominee shareholder requests.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function AdminRequestsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AdminRequestsList />;
}
