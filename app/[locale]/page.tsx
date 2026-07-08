import { redirect } from "@/lib/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function LocaleIndexPage({ params }: Props) {
  const { locale } = await params;
  return redirect({ href: "/portal/login", locale });
}
