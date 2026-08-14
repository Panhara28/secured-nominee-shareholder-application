import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AdminUserDetail from "@/components/admin/AdminUserDetail";

export const metadata: Metadata = {
  title: "User Registration Detail — Secured Nominee Shareholder",
  description: "Review, approve, or reject a shareholder account registration.",
};

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function AdminUserDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <AdminUserDetail id={id} />;
}
