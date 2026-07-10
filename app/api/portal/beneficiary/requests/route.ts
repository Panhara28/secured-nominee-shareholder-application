import { prisma } from "@/lib/prisma";
import { requireShareholder } from "@/lib/auth";
import { logRequestEvent } from "@/lib/request-log";
import { logActivity } from "@/lib/activity-log";
import type { Prisma } from "@/lib/generated/prisma";

const SORTABLE_FIELDS = ["requestNo", "companyNameEn", "submittedAt", "status"] as const;
type SortKey = (typeof SORTABLE_FIELDS)[number];

const STATUS_VALUES = ["DRAFT", "PENDING", "IN_REVIEW", "APPROVED", "REJECTED", "RETURNED", "UPDATE_REQUESTED"] as const;
type StatusValue = (typeof STATUS_VALUES)[number];

const REQUIRED_FIELDS = [
  "companyNameEn", "registrationNo", "registrationDate",
  "companyProvince", "companyDistrict", "companyCommune", "companyVillage", "companyStreet", "companyHouse",
  "companyPhone", "companyEmail",
  "lastNameEn", "firstNameEn", "dob", "nationality", "gender", "shareAmount",
  "shLastNameEn", "shFirstNameEn", "shDob", "shNationality", "shGender",
] as const;

type CreateBody = {
  companyNameKh?: string; companyNameEn?: string; registrationNo?: string; registrationDate?: string;
  companyProvince?: string; companyDistrict?: string; companyCommune?: string; companyVillage?: string;
  companyStreet?: string; companyHouse?: string; companyPhone?: string; companyOfficePhone?: string; companyEmail?: string;
  lastNameKh?: string; firstNameKh?: string; lastNameEn?: string; firstNameEn?: string;
  dob?: string; nationality?: string; gender?: string;
  idCard?: string; idIssuedDate?: string; idExpiredDate?: string; email?: string; phone?: string;
  shareAmount?: string;
  shLastNameKh?: string; shFirstNameKh?: string; shLastNameEn?: string; shFirstNameEn?: string;
  shDob?: string; shNationality?: string; shGender?: string;
  shIdCard?: string; shIdIssuedDate?: string; shIdExpiredDate?: string; shEmail?: string; shPhone?: string;
  ownerPhotoName?: string; ownerIdDocNames?: string[];
  shPhotoName?: string; shIdDocNames?: string[];
  shareholderContractDocNames?: string[]; otherDocNames?: string[];
  consentAgreed?: boolean;
};

function generateRequestNo(): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `BO-${num}`;
}

export async function GET(request: Request) {
  const session = await requireShareholder();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const statusParam = searchParams.get("status");
  const status = STATUS_VALUES.includes(statusParam as StatusValue) ? (statusParam as StatusValue) : undefined;
  const sortKeyParam = searchParams.get("sortKey");
  const sortKey: SortKey = SORTABLE_FIELDS.includes(sortKeyParam as SortKey) ? (sortKeyParam as SortKey) : "submittedAt";
  const sortDir = searchParams.get("sortDir") === "asc" ? "asc" : "desc";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit")) || 10);

  const where: Prisma.BeneficiaryRequestWhereInput = {
    userId: session.userId,
    ...(status && { status }),
    ...(q && {
      OR: [
        { companyNameKh: { contains: q } },
        { companyNameEn: { contains: q } },
        { requestNo: { contains: q } },
        { ownerFirstNameEn: { contains: q } },
        { ownerLastNameEn: { contains: q } },
        { registrationNo: { contains: q } },
      ],
    }),
  };

  const [records, total, groups] = await Promise.all([
    prisma.beneficiaryRequest.findMany({
      where,
      orderBy: { [sortKey]: sortDir },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.beneficiaryRequest.count({ where }),
    prisma.beneficiaryRequest.groupBy({
      by: ["status"],
      where: { userId: session.userId },
      _count: true,
    }),
  ]);

  const summary = { drafted: 0, inReview: 0, verifying: 0, approved: 0, rejected: 0, returned: 0, updateRequested: 0 };
  for (const g of groups) {
    if (g.status === "DRAFT") summary.drafted = g._count;
    else if (g.status === "PENDING") summary.inReview = g._count;
    else if (g.status === "IN_REVIEW") summary.verifying = g._count;
    else if (g.status === "APPROVED") summary.approved = g._count;
    else if (g.status === "REJECTED") summary.rejected = g._count;
    else if (g.status === "RETURNED") summary.returned = g._count;
    else if (g.status === "UPDATE_REQUESTED") summary.updateRequested = g._count;
  }

  const data = records.map((r) => ({
    id: r.id,
    requestNo: r.requestNo,
    companyNameKh: r.companyNameKh,
    companyNameEn: r.companyNameEn,
    ownerNameEn: `${r.ownerFirstNameEn} ${r.ownerLastNameEn}`.trim(),
    shareholderNameEn: `${r.shFirstNameEn} ${r.shLastNameEn}`.trim(),
    submittedAt: r.submittedAt,
    status: r.status,
  }));

  return Response.json({ data, total, page, limit, summary });
}

export async function POST(request: Request) {
  const session = await requireShareholder();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null) as CreateBody | null;
  if (!body) return Response.json({ error: "Invalid request body." }, { status: 400 });

  for (const field of REQUIRED_FIELDS) {
    if (!body[field as keyof CreateBody]) {
      return Response.json({ error: "All required fields must be provided." }, { status: 400 });
    }
  }

  if (body.gender !== "M" && body.gender !== "F") {
    return Response.json({ error: "Invalid gender value." }, { status: 400 });
  }
  if (body.shGender !== "M" && body.shGender !== "F") {
    return Response.json({ error: "Invalid shareholder gender value." }, { status: 400 });
  }
  if (body.consentAgreed !== true) {
    return Response.json({ error: "Consent must be agreed to submit." }, { status: 400 });
  }

  let requestNo = generateRequestNo();
  while (await prisma.beneficiaryRequest.findUnique({ where: { requestNo } })) {
    requestNo = generateRequestNo();
  }

  const record = await prisma.beneficiaryRequest.create({
    data: {
      userId: session.userId,
      requestNo,
      status: "DRAFT",
      type: "Add Beneficiary Owner",

      companyNameKh: body.companyNameKh || null,
      companyNameEn: body.companyNameEn!,
      registrationNo: body.registrationNo!,
      registrationDate: new Date(body.registrationDate!),
      companyProvince: body.companyProvince!,
      companyDistrict: body.companyDistrict!,
      companyCommune: body.companyCommune!,
      companyVillage: body.companyVillage!,
      companyStreet: body.companyStreet!,
      companyHouse: body.companyHouse!,
      companyPhone: body.companyPhone!,
      companyOfficePhone: body.companyOfficePhone || null,
      companyEmail: body.companyEmail!,

      shLastNameKh: body.shLastNameKh || null,
      shFirstNameKh: body.shFirstNameKh || null,
      shLastNameEn: body.shLastNameEn!,
      shFirstNameEn: body.shFirstNameEn!,
      shDob: new Date(body.shDob!),
      shNationality: body.shNationality!,
      shGender: body.shGender as "M" | "F",
      shIdCard: body.shIdCard || null,
      shIdIssuedDate: body.shIdIssuedDate ? new Date(body.shIdIssuedDate) : null,
      shIdExpiredDate: body.shIdExpiredDate ? new Date(body.shIdExpiredDate) : null,
      shEmail: body.shEmail || null,
      shPhone: body.shPhone || null,
      shPhotoName: body.shPhotoName || null,
      shIdDocNames: JSON.stringify(body.shIdDocNames ?? []),

      ownerLastNameKh: body.lastNameKh || null,
      ownerFirstNameKh: body.firstNameKh || null,
      ownerLastNameEn: body.lastNameEn!,
      ownerFirstNameEn: body.firstNameEn!,
      ownerDob: new Date(body.dob!),
      ownerNationality: body.nationality!,
      ownerGender: body.gender as "M" | "F",
      ownerIdCard: body.idCard || null,
      ownerIdIssuedDate: body.idIssuedDate ? new Date(body.idIssuedDate) : null,
      ownerIdExpiredDate: body.idExpiredDate ? new Date(body.idExpiredDate) : null,
      ownerEmail: body.email || null,
      ownerPhone: body.phone || null,
      ownerPhotoName: body.ownerPhotoName || null,
      ownerIdDocNames: JSON.stringify(body.ownerIdDocNames ?? []),
      shareAmount: body.shareAmount!,

      shareholderContractDocNames: JSON.stringify(body.shareholderContractDocNames ?? []),
      otherDocNames: JSON.stringify(body.otherDocNames ?? []),
      consentAgreed: true,
    },
  });

  const actor = await prisma.user.findUnique({ where: { id: session.userId }, select: { fullName: true, role: true } });
  if (actor) {
    const actorInfo = { id: session.userId, role: actor.role, fullName: actor.fullName };
    await logRequestEvent(record.id, "CREATED", actorInfo);
    await logActivity({ action: "REQUEST_CREATED", entityType: "BeneficiaryRequest", entityId: record.id, actor: actorInfo, note: record.requestNo });
  }

  return Response.json(record, { status: 201 });
}
