import { NextResponse } from "next/server";
import { getNamecheapConfig } from "@/lib/namecheap/config";

export async function GET() {
  const cfg = getNamecheapConfig();
  if (!cfg) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        message:
          "Missing Namecheap env vars. Set NAMECHEAP_API_USER, NAMECHEAP_API_KEY, and NAMECHEAP_CLIENT_IP.",
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    configured: true,
    useSandbox: cfg.useSandbox,
    apiUser: cfg.apiUser,
    userName: cfg.userName,
    clientIp: cfg.clientIp,
  });
}
