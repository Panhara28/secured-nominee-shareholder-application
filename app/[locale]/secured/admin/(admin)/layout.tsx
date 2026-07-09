import { redirect } from "@/lib/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AdminGroupLayout({ children, params }: Props) {
  const { locale } = await params;
  const session = await requireAdmin();
  if (!session) return redirect({ href: "/secured/admin/login", locale });

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { fullName: true },
  });
  if (!user) return redirect({ href: "/secured/admin/login", locale });

  return <AdminShell fullName={user.fullName}>{children}</AdminShell>;
}
