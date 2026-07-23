import { cookies } from "next/headers";
import { redirect } from "@/lib/navigation";
import AdminShell from "@/components/admin/AdminShell";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

type AdminMe = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: string;
  staffRoleName: string | null;
  permissions: Record<string, { create: boolean; read: boolean; update: boolean; delete: boolean }>;
};

export default async function AdminGroupLayout({ children, params }: Props) {
  const { locale } = await params;
  const cookieHeader = (await cookies()).toString();

  const res = await fetch(`${process.env.API_BASE_URL}/secured/admin/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  if (!res.ok) return redirect({ href: "/secured/admin/login", locale });

  const user = (await res.json()) as AdminMe;

  return <AdminShell fullName={user.fullName}>{children}</AdminShell>;
}
