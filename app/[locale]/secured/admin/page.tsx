import { redirect } from "@/lib/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function AdminIndexPage({ params }: Props) {
  const { locale } = await params;
  redirect({ href: "/secured/admin/dashboard", locale });
}
