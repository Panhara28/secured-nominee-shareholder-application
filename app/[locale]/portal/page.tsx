import { redirect } from "@/lib/navigation";
import { requireShareholder } from "@/lib/auth";

type Props = { params: Promise<{ locale: string }> };

export default async function PortalIndexPage({ params }: Props) {
  const { locale } = await params;
  const session = await requireShareholder();
  return redirect({ href: session ? "/portal/dashboard" : "/portal/login", locale });
}
