import { setRequestLocale } from "next-intl/server";
import AdminInternalUserDetail from "@/components/admin/AdminInternalUserDetail";

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function AdminInternalUserDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <AdminInternalUserDetail id={id} />;
}
