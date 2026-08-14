import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AdminRequestDetail from "@/components/admin/AdminRequestDetail";

export const metadata: Metadata = {
  title: "Admin Request Detail — Secured Nominee Shareholder",
  description: "Review, verify, and take action on a submitted request.",
};

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function AdminRequestDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <AdminRequestDetail id={id} />;
}
