import { prisma } from "@/lib/prisma";
import { requireShareholder } from "@/lib/auth";
import type { Prisma } from "@/lib/generated/prisma";

export async function GET(request: Request) {
  const session = await requireShareholder();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const requestIdParam = Number(searchParams.get("requestId"));
  const requestId = Number.isInteger(requestIdParam) && requestIdParam > 0 ? requestIdParam : undefined;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit")) || 20);

  // A shareholder reviewing one specific request (deep link from that request's detail page) can see
  // its diff even before admin approval — the approvedAt gate only applies to the general browse list.
  const where: Prisma.RequestRevisionWhereInput = {
    ...(requestId ? { requestId } : { approvedAt: { not: null } }),
    request: {
      userId: session.userId,
      ...(q && {
        OR: [
          { requestNo: { contains: q } },
          { companyNameEn: { contains: q } },
          { companyNameKh: { contains: q } },
        ],
      }),
    },
  };

  const [records, total] = await Promise.all([
    prisma.requestRevision.findMany({
      where,
      include: { request: { select: { requestNo: true, companyNameEn: true, companyNameKh: true } } },
      orderBy: [{ createdAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.requestRevision.count({ where }),
  ]);

  const data = records.map((r) => ({
    id: r.id,
    requestId: r.requestId,
    requestNo: r.request.requestNo,
    companyNameEn: r.request.companyNameEn,
    companyNameKh: r.request.companyNameKh,
    editedByName: r.editedByName,
    editedByRole: r.editedByRole,
    previousData: JSON.parse(r.previousData),
    newData: JSON.parse(r.newData),
    createdAt: r.createdAt.toISOString(),
    approvedAt: r.approvedAt ? r.approvedAt.toISOString() : null,
  }));

  return Response.json({ data, total, page, limit });
}
