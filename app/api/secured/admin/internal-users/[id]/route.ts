import { proxyRequest } from "@/lib/api-proxy";

type Props = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Props) {
  const { id } = await params;
  return proxyRequest(request, `/secured/admin/internal-users/${id}`);
}

export async function PATCH(request: Request, { params }: Props) {
  const { id } = await params;
  return proxyRequest(request, `/secured/admin/internal-users/${id}`);
}
