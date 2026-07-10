import { setRequestLocale } from "next-intl/server";
import AdminActivitiesLogList from "@/components/admin/AdminActivitiesLogList";

type Props = { params: Promise<{ locale: string }> };

export default async function AdminActivitiesLogsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AdminActivitiesLogList />;
}
