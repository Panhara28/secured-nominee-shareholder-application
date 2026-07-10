import { prisma } from "@/lib/prisma";
import { requireShareholder } from "@/lib/auth";
import type { Prisma } from "@/lib/generated/prisma";

const NOTIFY_STATUSES = ["RETURNED", "REJECTED", "IN_REVIEW"] as const;

export async function GET() {
  const session = await requireShareholder();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { notificationsSeenAt: true },
  });
  const seenAt = user?.notificationsSeenAt ?? null;

  const where: Prisma.BeneficiaryRequestWhereInput = {
    userId: session.userId,
    status: { in: [...NOTIFY_STATUSES] },
  };

  const [records, total, unseenCount] = await Promise.all([
    prisma.beneficiaryRequest.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      take: 10,
      select: { id: true, requestNo: true, companyNameEn: true, companyNameKh: true, status: true, updatedAt: true },
    }),
    prisma.beneficiaryRequest.count({ where }),
    prisma.beneficiaryRequest.count({
      where: { ...where, ...(seenAt ? { updatedAt: { gt: seenAt } } : {}) },
    }),
  ]);

  const data = records.map((r) => ({
    ...r,
    updatedAt: r.updatedAt.toISOString(),
    seen: seenAt ? r.updatedAt <= seenAt : false,
  }));

  return Response.json({ data, total, unseenCount });
}
