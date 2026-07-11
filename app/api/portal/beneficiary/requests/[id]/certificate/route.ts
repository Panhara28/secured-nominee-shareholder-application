import { prisma } from "@/lib/prisma";
import { requireShareholder } from "@/lib/auth";
import { generateCertificatePdf } from "@/lib/certificate";

type Props = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Props) {
  const session = await requireShareholder();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    return Response.json({ error: "Invalid request id." }, { status: 400 });
  }

  const record = await prisma.beneficiaryRequest.findUnique({ where: { id } });
  if (!record || record.userId !== session.userId) {
    return Response.json({ error: "Request not found." }, { status: 404 });
  }
  if (record.status !== "APPROVED") {
    return Response.json({ error: "Only approved requests have a certificate." }, { status: 400 });
  }

  const pdf = await generateCertificatePdf({
    requestNo: record.requestNo,
    companyNameEn: record.companyNameEn,
    companyNameKh: record.companyNameKh,
    registrationNo: record.registrationNo,
    registrationDate: record.registrationDate,
    approvedAt: record.updatedAt,
  });

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="certificate-${record.requestNo}.pdf"`,
    },
  });
}
