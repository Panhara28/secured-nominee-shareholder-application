import { requireShareholder } from "@/lib/auth";
import { subscribeUser } from "@/lib/notification-events";
import { createSseResponse } from "@/lib/sse";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await requireShareholder();
  if (!session) return new Response("Unauthorized", { status: 401 });

  return createSseResponse(request, (listener) => subscribeUser(session.userId, listener));
}
