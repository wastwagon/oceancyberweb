import { NextResponse } from "next/server";
import { getMenuConfig } from "@/lib/navigation/getMenuConfig";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = await getMenuConfig();
  return NextResponse.json(config);
}
