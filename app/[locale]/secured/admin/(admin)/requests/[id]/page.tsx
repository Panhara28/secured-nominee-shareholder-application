import { setRequestLocale } from "next-intl/server";
import AdminRequestDetail from "@/components/admin/AdminRequestDetail";

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function AdminRequestDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <AdminRequestDetail id={id} />;
}
