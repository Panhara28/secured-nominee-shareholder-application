import { setRequestLocale } from "next-intl/server";
import AdminInternalUsersList from "@/components/admin/AdminInternalUsersList";

type Props = { params: Promise<{ locale: string }> };

export default async function AdminInternalUsersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AdminInternalUsersList />;
}
