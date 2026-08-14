import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AdminInternalUsersList from "@/components/admin/AdminInternalUsersList";

export const metadata: Metadata = {
  title: "Internal Users — Secured Nominee Shareholder",
  description: "Staff and administrator accounts used to manage the admin backend.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function AdminInternalUsersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AdminInternalUsersList />;
}
