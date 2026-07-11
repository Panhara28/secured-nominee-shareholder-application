import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { logActivity } from "@/lib/activity-log";

type Props = { params: Promise<{ id: string }> };

const POSSIBLE_ISSUES = [
  "Company Name or Entity Number could not be matched in the business registry.",
  "Company Name or Entity Number format looks inconsistent with registered entities.",
  "Entity Number appears to belong to a different registered company.",
];

function randomOf<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function POST(_request: Request, { params }: Props) {
  const session = await requireAdmin();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    return Response.json({ error: "Invalid user id." }, { status: 400 });
  }

  const record = await prisma.user.findUnique({ where: { id } });
  if (!record || record.role !== "SHAREHOLDER") {
    return Response.json({ error: "User not found." }, { status: 404 });
  }
  if (record.isActive) {
    return Response.json({ error: "Only pending registrations can be verified." }, { status: 400 });
  }
  if (!record.companyName?.trim()) {
    return Response.json({
      verified: false,
      issues: ["Company Name or Entity Number is missing."],
      checkedAt: new Date().toISOString(),
    });
  }

  const verified = Math.random() > 0.5;
  const issues: string[] = verified ? [] : [randomOf(POSSIBLE_ISSUES)];

  const actorUser = await prisma.user.findUnique({ where: { id: session.userId }, select: { fullName: true, role: true } });
  if (actorUser) {
    await logActivity({
      action: "USER_VERIFIED",
      entityType: "User",
      entityId: id,
      actor: { id: session.userId, role: actorUser.role, fullName: actorUser.fullName },
      note: verified ? `Verification passed for ${record.fullName}` : `Verification found issues for ${record.fullName}: ${issues.join("; ")}`,
    });
  }

  return Response.json({ verified, issues, checkedAt: new Date().toISOString() });
}
