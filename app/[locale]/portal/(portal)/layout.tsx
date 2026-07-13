import { redirect } from "@/lib/navigation";
import { requireShareholder } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PortalShell from "@/components/portal/PortalShell";
import PendingApprovalGate from "@/components/portal/PendingApprovalGate";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function PortalGroupLayout({ children, params }: Props) {
  const { locale } = await params;
  const session = await requireShareholder();
  if (!session) return redirect({ href: "/portal/login", locale });

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      fullName: true,
      companyName: true,
      firstName: true,
      lastName: true,
      email: true,
      isActive: true,
      registrationReturnReason: true,
    },
  });
  if (!user) return redirect({ href: "/portal/login", locale });

  return (
    <PortalShell fullName={user.fullName} navDisabled={!user.isActive}>
      {user.isActive ? children : (
        <PendingApprovalGate
          fullName={user.fullName}
          companyName={user.companyName}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          returnReason={user.registrationReturnReason}
        />
      )}
    </PortalShell>
  );
}
