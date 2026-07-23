import { proxyRequest } from "@/lib/api-proxy";

type Props = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Props) {
  const { id } = await params;
  return proxyRequest(request, `/secured/admin/requests/${id}`);
}

// Admin PATCH here is action-based (approve/reject/return + optional reason) —
// the NestJS AdminUpdateStatusDto doesn't accept any of the doc-filename
// fields the shareholder form sends, and this route is never called by the
// beneficiary form, so no stripFields shim is needed here.
export async function PATCH(request: Request, { params }: Props) {
  const { id } = await params;
  return proxyRequest(request, `/secured/admin/requests/${id}`);
}
