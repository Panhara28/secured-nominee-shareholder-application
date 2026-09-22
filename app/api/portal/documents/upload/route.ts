import { proxyUpload } from "@/lib/api-proxy";

export async function POST(request: Request) {
  return proxyUpload(request, "/documents/upload");
}
