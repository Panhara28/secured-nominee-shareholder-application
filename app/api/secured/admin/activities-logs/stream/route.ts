import { requireAdmin } from "@/lib/auth";
import { subscribeActivity } from "@/lib/notification-events";
import { createSseResponse } from "@/lib/sse";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await requireAdmin();
  if (!session) return new Response("Unauthorized", { status: 401 });

  return createSseResponse(request, subscribeActivity);
}
