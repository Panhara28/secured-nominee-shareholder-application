import { setRequestLocale } from "next-intl/server";
import AdminUsersList from "@/components/admin/AdminUsersList";

type Props = { params: Promise<{ locale: string }> };

export default async function AdminUsersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AdminUsersList />;
}
