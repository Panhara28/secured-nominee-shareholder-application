import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AdminInternalUserDetail from "@/components/admin/AdminInternalUserDetail";

export const metadata: Metadata = {
  title: "Internal User Detail — Secured Nominee Shareholder",
  description: "View staff account details and role permissions.",
};

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function AdminInternalUserDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <AdminInternalUserDetail id={id} />;
}
