import { proxyRequest } from "@/lib/api-proxy";

export async function PATCH(request: Request) {
  return proxyRequest(request, "/portal/notifications/seen");
}
