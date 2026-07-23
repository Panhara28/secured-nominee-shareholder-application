import { proxyRequest } from "@/lib/api-proxy";

const DOC_FIELDS_TO_STRIP = [
  "shPhotoName",
  "shIdDocNames",
  "ownerPhotoName",
  "ownerIdDocNames",
  "shareholderContractDocNames",
  "otherDocNames",
];

export async function GET(request: Request) {
  return proxyRequest(request, "/portal/beneficiary/requests");
}

export async function POST(request: Request) {
  return proxyRequest(request, "/portal/beneficiary/requests", {
    stripFields: DOC_FIELDS_TO_STRIP,
  });
}
