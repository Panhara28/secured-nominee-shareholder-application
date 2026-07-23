import { proxyStream } from "@/lib/api-proxy";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return proxyStream(request, "/portal/notifications/stream");
}
