import { proxyRequest } from "@/lib/api-proxy";

type Props = { params: Promise<{ slug: string }> };

export async function GET(request: Request, { params }: Props) {
  const { slug } = await params;
  return proxyRequest(request, `/roles/permissions/${slug}`);
}
