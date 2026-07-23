import { cookies } from "next/headers";
import { redirect } from "@/lib/navigation";
import PortalShell from "@/components/portal/PortalShell";
import PendingApprovalGate from "@/components/portal/PendingApprovalGate";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

type PortalMe = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: string;
  companyName: string | null;
  firstName: string | null;
  lastName: string | null;
  isActive: boolean;
  registrationReturnReason: string | null;
};

export default async function PortalGroupLayout({ children, params }: Props) {
  const { locale } = await params;
  const cookieHeader = (await cookies()).toString();

  const res = await fetch(`${process.env.API_BASE_URL}/portal/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  if (!res.ok) return redirect({ href: "/portal/login", locale });

  const user = (await res.json()) as PortalMe;

  if (!user.isActive) {
    return (
      <PortalShell fullName={user.fullName} navDisabled>
        <PendingApprovalGate
          fullName={user.fullName}
          companyName={user.companyName}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          returnReason={user.registrationReturnReason}
        />
      </PortalShell>
    );
  }

  return <PortalShell fullName={user.fullName}>{children}</PortalShell>;
}
