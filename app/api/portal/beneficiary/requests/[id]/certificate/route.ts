import { proxyBinary } from "@/lib/api-proxy";

type Props = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Props) {
  const { id } = await params;
  return proxyBinary(request, `/portal/beneficiary/requests/${id}/certificate`);
}
