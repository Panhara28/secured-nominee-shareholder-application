import { proxyRequest } from "@/lib/api-proxy";

export async function POST(request: Request) {
  return proxyRequest(request, "/secured/admin/auth/login");
}
