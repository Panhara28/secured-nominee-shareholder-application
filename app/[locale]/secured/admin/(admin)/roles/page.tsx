import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AdminRolesList from "@/components/admin/AdminRolesList";

export const metadata: Metadata = {
  title: "Role & Permission — Secured Nominee Shareholder",
  description: "Manage staff roles and permission assignments.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function AdminRolesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AdminRolesList />;
}
