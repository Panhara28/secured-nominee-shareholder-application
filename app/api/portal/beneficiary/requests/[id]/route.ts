import { proxyRequest } from "@/lib/api-proxy";

type Props = { params: Promise<{ id: string }> };

const DOC_FIELDS_TO_STRIP = [
  "shPhotoName",
  "shIdDocNames",
  "ownerPhotoName",
  "ownerIdDocNames",
  "shareholderContractDocNames",
  "otherDocNames",
];

export async function GET(request: Request, { params }: Props) {
  const { id } = await params;
  return proxyRequest(request, `/portal/beneficiary/requests/${id}`);
}

export async function PATCH(request: Request, { params }: Props) {
  const { id } = await params;
  return proxyRequest(request, `/portal/beneficiary/requests/${id}`, {
    stripFields: DOC_FIELDS_TO_STRIP,
  });
}
