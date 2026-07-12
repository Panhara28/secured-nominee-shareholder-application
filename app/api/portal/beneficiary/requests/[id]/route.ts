import { prisma } from "@/lib/prisma";
import { requireShareholder } from "@/lib/auth";
import { logRequestEvent } from "@/lib/request-log";
import { logActivity } from "@/lib/activity-log";
import { toRequestSnapshot } from "@/lib/request-revision";

type Props = { params: Promise<{ id: string }> };

const EDIT_REQUIRED_FIELDS = [
  "companyNameEn", "registrationNo", "registrationDate",
  "companyProvince", "companyDistrict", "companyCommune", "companyVillage", "companyStreet", "companyHouse",
  "companyPhone", "companyEmail",
  "lastNameEn", "firstNameEn", "dob", "becameDate", "nationality", "gender", "shareAmount",
  "shLastNameEn", "shFirstNameEn", "shDob", "shBecameDate", "shNationality", "shGender",
] as const;

type EditBody = {
  action?: string;
  companyNameKh?: string; companyNameEn?: string; registrationNo?: string; registrationDate?: string;
  companyProvince?: string; companyDistrict?: string; companyCommune?: string; companyVillage?: string;
  companyStreet?: string; companyHouse?: string; companyPhone?: string; companyOfficePhone?: string; companyEmail?: string;
  lastNameKh?: string; firstNameKh?: string; lastNameEn?: string; firstNameEn?: string;
  dob?: string; becameDate?: string; nationality?: string; gender?: string;
  idCard?: string; idIssuedDate?: string; idExpiredDate?: string; email?: string; phone?: string;
  shareAmount?: string;
  shLastNameKh?: string; shFirstNameKh?: string; shLastNameEn?: string; shFirstNameEn?: string;
  shDob?: string; shBecameDate?: string; shNationality?: string; shGender?: string;
  shIdCard?: string; shIdIssuedDate?: string; shIdExpiredDate?: string; shEmail?: string; shPhone?: string;
  ownerPhotoName?: string; ownerIdDocNames?: string[];
  shPhotoName?: string; shIdDocNames?: string[];
  shareholderContractDocNames?: string[]; otherDocNames?: string[];
  consentAgreed?: boolean;
};

export async function GET(_request: Request, { params }: Props) {
  const session = await requireShareholder();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    return Response.json({ error: "Invalid request id." }, { status: 400 });
  }

  const record = await prisma.beneficiaryRequest.findUnique({
    where: { id },
    include: {
      logs: { orderBy: { createdAt: "desc" } },
      revisions: { where: { approvedAt: { not: null } }, orderBy: { createdAt: "desc" } },
    },
  });
  if (!record || record.userId !== session.userId) {
    return Response.json({ error: "Request not found." }, { status: 404 });
  }

  return Response.json({
    ...record,
    shIdDocNames: JSON.parse(record.shIdDocNames) as string[],
    ownerIdDocNames: JSON.parse(record.ownerIdDocNames) as string[],
    shareholderContractDocNames: JSON.parse(record.shareholderContractDocNames) as string[],
    otherDocNames: JSON.parse(record.otherDocNames) as string[],
    revisions: record.revisions.map((r) => ({
      ...r,
      previousData: JSON.parse(r.previousData),
      newData: JSON.parse(r.newData),
    })),
  });
}

const SUBMIT_REQUIRED_FIELDS = [
  "companyNameEn", "registrationNo", "registrationDate",
  "companyProvince", "companyDistrict", "companyCommune", "companyVillage", "companyStreet", "companyHouse",
  "companyPhone", "companyEmail",
  "ownerLastNameEn", "ownerFirstNameEn", "ownerDob", "ownerBecameDate", "ownerNationality", "ownerGender", "shareAmount",
  "shLastNameEn", "shFirstNameEn", "shDob", "shBecameDate", "shNationality", "shGender",
] as const;

export async function PATCH(request: Request, { params }: Props) {
  const session = await requireShareholder();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    return Response.json({ error: "Invalid request id." }, { status: 400 });
  }

  const body = await request.json().catch(() => null) as EditBody | null;
  if (body?.action !== "submit" && body?.action !== "edit") {
    return Response.json({ error: "Unsupported action." }, { status: 400 });
  }

  const record = await prisma.beneficiaryRequest.findUnique({ where: { id } });
  if (!record || record.userId !== session.userId) {
    return Response.json({ error: "Request not found." }, { status: 404 });
  }

  const actorUser = await prisma.user.findUnique({ where: { id: session.userId }, select: { fullName: true, role: true } });
  const actor = actorUser ? { id: session.userId, role: actorUser.role, fullName: actorUser.fullName } : null;

  if (body.action === "submit") {
    if (record.status !== "DRAFT") {
      return Response.json({ error: "Only draft requests can be submitted." }, { status: 400 });
    }

    const isIncomplete = SUBMIT_REQUIRED_FIELDS.some((field) => {
      const value = record[field as keyof typeof record];
      return value === null || value === undefined || value === "";
    });
    if (isIncomplete) {
      return Response.json({ error: "All required fields must be provided before submitting." }, { status: 400 });
    }

    await prisma.beneficiaryRequest.update({
      where: { id },
      data: { status: "PENDING", submittedAt: new Date() },
    });
    if (actor) {
      await logRequestEvent(id, "SUBMITTED", actor);
      await logActivity({ action: "REQUEST_SUBMITTED", entityType: "BeneficiaryRequest", entityId: id, actor, note: record.requestNo });
    }

    const updated = await prisma.beneficiaryRequest.findUnique({
      where: { id },
      include: {
        logs: { orderBy: { createdAt: "desc" } },
        revisions: { where: { approvedAt: { not: null } }, orderBy: { createdAt: "desc" } },
      },
    });

    return Response.json({
      ...updated!,
      shIdDocNames: JSON.parse(updated!.shIdDocNames) as string[],
      ownerIdDocNames: JSON.parse(updated!.ownerIdDocNames) as string[],
      shareholderContractDocNames: JSON.parse(updated!.shareholderContractDocNames) as string[],
      otherDocNames: JSON.parse(updated!.otherDocNames) as string[],
      revisions: updated!.revisions.map((r) => ({
        ...r,
        previousData: JSON.parse(r.previousData),
        newData: JSON.parse(r.newData),
      })),
    });
  }

  // action === "edit"
  if (record.status !== "APPROVED" && record.status !== "RETURNED") {
    return Response.json({ error: "Only approved or returned requests can be edited." }, { status: 400 });
  }

  for (const field of EDIT_REQUIRED_FIELDS) {
    if (!body[field as keyof EditBody]) {
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

  await prisma.beneficiaryRequest.update({
    where: { id },
    data: {
      status: record.status === "APPROVED" ? "UPDATE_REQUESTED" : "PENDING",
      submittedAt: new Date(),

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
      shBecameDate: new Date(body.shBecameDate!),
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
      ownerBecameDate: new Date(body.becameDate!),
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
  if (actor) {
    await logRequestEvent(id, "EDITED", actor);
    await logActivity({ action: "REQUEST_EDITED", entityType: "BeneficiaryRequest", entityId: id, actor, note: record.requestNo });
  }

  const updated = await prisma.beneficiaryRequest.findUnique({
    where: { id },
    include: {
      logs: { orderBy: { createdAt: "desc" } },
      revisions: { where: { approvedAt: { not: null } }, orderBy: { createdAt: "desc" } },
    },
  });

  if (actor) {
    await prisma.requestRevision.create({
      data: {
        requestId: id,
        editedByUserId: actor.id,
        editedByRole: actor.role,
        editedByName: actor.fullName,
        previousData: JSON.stringify(toRequestSnapshot(record)),
        newData: JSON.stringify(toRequestSnapshot(updated!)),
      },
    });
  }

  return Response.json({
    ...updated!,
    shIdDocNames: JSON.parse(updated!.shIdDocNames) as string[],
    ownerIdDocNames: JSON.parse(updated!.ownerIdDocNames) as string[],
    shareholderContractDocNames: JSON.parse(updated!.shareholderContractDocNames) as string[],
    otherDocNames: JSON.parse(updated!.otherDocNames) as string[],
    revisions: updated!.revisions.map((r) => ({
      ...r,
      previousData: JSON.parse(r.previousData),
      newData: JSON.parse(r.newData),
    })),
  });
}
