import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AdminActivitiesLogList from "@/components/admin/AdminActivitiesLogList";

export const metadata: Metadata = {
  title: "Activities Log — Secured Nominee Shareholder",
  description: "Audit trail of logins, registrations, and request lifecycle changes across the platform.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function AdminActivitiesLogsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AdminActivitiesLogList />;
}
