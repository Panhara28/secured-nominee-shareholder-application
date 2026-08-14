import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AdminUsersList from "@/components/admin/AdminUsersList";

export const metadata: Metadata = {
  title: "User Registrations — Secured Nominee Shareholder",
  description: "Review and approve new shareholder account registrations before they can sign in to the portal.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function AdminUsersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AdminUsersList />;
}
