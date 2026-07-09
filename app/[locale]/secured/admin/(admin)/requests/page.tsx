import { setRequestLocale } from "next-intl/server";
import AdminRequestsList from "@/components/admin/AdminRequestsList";

type Props = { params: Promise<{ locale: string }> };

export default async function AdminRequestsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AdminRequestsList />;
}
