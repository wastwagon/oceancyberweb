import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { OC_ACCESS_COOKIE_NAME } from "@/lib/auth/oc-session";
import { decodeAccessJwt } from "@/lib/auth/verify-access-jwt";
import { readTeamMembersFile, writeTeamMembersFile } from "@/lib/admin/team-members-server";
import { revalidateMarketingContent } from "@/lib/admin/revalidate-marketing";
import type { TeamMember } from "@/lib/data/team";

export const runtime = "nodejs";

async function requireAdmin() {
  const token = cookies().get(OC_ACCESS_COOKIE_NAME)?.value?.trim();
  if (!token) return null;
  try {
    const claims = await decodeAccessJwt(token);
    if (!claims.isAdmin) return null;
    return claims;
  } catch {
    return null;
  }
}

export async function GET() {
  const members = await readTeamMembersFile();
  return NextResponse.json({ members });
}

export async function PUT(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Admin access required" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { members?: TeamMember[] };
    if (!Array.isArray(body.members)) {
      return NextResponse.json({ error: "members array required" }, { status: 400 });
    }
    await writeTeamMembersFile(body.members);
    revalidateMarketingContent("team");
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
