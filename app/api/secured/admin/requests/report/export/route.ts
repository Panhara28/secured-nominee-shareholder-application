import { proxyBinary } from "@/lib/api-proxy";

export async function GET(request: Request) {
  return proxyBinary(request, "/secured/admin/requests/report/export");
}
