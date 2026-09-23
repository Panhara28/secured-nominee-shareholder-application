import { NextResponse } from "next/server";
import { isAddressLevel, listAddressOptions } from "@/lib/gazetteer";

// Public reference data for the cascading address dropdowns, shaped like the
// MOC API's /provinces, /provinces/:code/districts, ... endpoints:
//   GET /api/address/provinces
//   GET /api/address/districts?parent=12
//   GET /api/address/communes?parent=1201
//   GET /api/address/villages?parent=120101
export async function GET(request: Request, { params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  if (!isAddressLevel(level)) {
    return NextResponse.json({ message: "Unknown address level" }, { status: 404 });
  }
  const parent = new URL(request.url).searchParams.get("parent") ?? "";
  return NextResponse.json(listAddressOptions(level, parent), {
    headers: { "Cache-Control": "public, max-age=86400" },
  });
}
