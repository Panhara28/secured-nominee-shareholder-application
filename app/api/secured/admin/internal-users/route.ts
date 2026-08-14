import { proxyRequest } from "@/lib/api-proxy";

export async function GET(request: Request) {
  return proxyRequest(request, "/secured/admin/internal-users");
}

export async function POST(request: Request) {
  return proxyRequest(request, "/secured/admin/internal-users");
}
