import { setRequestLocale } from "next-intl/server";
import AdminUserDetail from "@/components/admin/AdminUserDetail";

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function AdminUserDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <AdminUserDetail id={id} />;
}
