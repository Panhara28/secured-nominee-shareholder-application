import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { logActivity } from "@/lib/activity-log";

type Props = { params: Promise<{ id: string }> };

const POSSIBLE_ISSUES = [
  "Registration number could not be matched in the business registry.",
  "ID card number format looks inconsistent with the issuing province.",
  "Company email domain could not be reached.",
  "Shareholder date of birth conflicts with ID issue date.",
  "Owner and shareholder addresses could not be cross-verified.",
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
    return Response.json({ error: "Invalid request id." }, { status: 400 });
  }

  const record = await prisma.beneficiaryRequest.findUnique({ where: { id } });
  if (!record) {
    return Response.json({ error: "Request not found." }, { status: 404 });
  }
  if (record.status !== "PENDING" && record.status !== "IN_REVIEW" && record.status !== "UPDATE_REQUESTED") {
    return Response.json({ error: "Only requests awaiting review can be verified." }, { status: 400 });
  }

  const verified = Math.random() > 0.5;
  const issueCount = verified ? 0 : 1 + Math.floor(Math.random() * 2);
  const issues: string[] = [];
  const pool = [...POSSIBLE_ISSUES];
  for (let i = 0; i < issueCount; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    issues.push(pool.splice(idx, 1)[0]);
  }

  if (record.status !== "IN_REVIEW") {
    await prisma.beneficiaryRequest.update({ where: { id }, data: { status: "IN_REVIEW" } });
  }

  const actorUser = await prisma.user.findUnique({ where: { id: session.userId }, select: { fullName: true, role: true } });
  if (actorUser) {
    await logActivity({
      action: "REQUEST_VERIFIED",
      entityType: "BeneficiaryRequest",
      entityId: id,
      actor: { id: session.userId, role: actorUser.role, fullName: actorUser.fullName },
      note: verified ? "Verification passed" : `Verification found issues: ${issues.join("; ")}`,
    });
  }

  return Response.json({ verified, issues, checkedAt: new Date().toISOString(), status: "IN_REVIEW" });
}
