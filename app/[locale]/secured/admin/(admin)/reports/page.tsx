import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AdminReportsList from "@/components/admin/AdminReportsList";

export const metadata: Metadata = {
  title: "Reports — Secured Nominee Shareholder",
  description: "Daily, weekly, monthly, yearly, and custom reports for nominee shareholder requests, with Excel export.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function AdminReportsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AdminReportsList />;
}
