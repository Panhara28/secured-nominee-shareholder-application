import { proxyRequest } from "@/lib/api-proxy";

type Props = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Props) {
  const { id } = await params;
  return proxyRequest(request, `/portal/beneficiary/requests/${id}/dissolve`);
}
