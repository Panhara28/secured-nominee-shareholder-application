import { redirect } from "@/lib/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function PortalIndexPage({ params }: Props) {
  const { locale } = await params;
  // Auth gating now happens in proxy.ts (middleware), which checks for the
  // NestJS `session` cookie before this page is reached. No server-side
  // session check is needed here anymore.
  return redirect({ href: "/portal/dashboard", locale });
}
