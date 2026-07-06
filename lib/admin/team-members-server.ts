import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { teamMembers as defaultTeamMembers, type TeamMember } from "@/lib/data/team";

const TEAM_JSON = path.join(process.cwd(), "public", "data", "team-members.json");

function sanitizeMember(raw: unknown, index: number): TeamMember | null {
  if (!raw || typeof raw !== "object") return null;
  const m = raw as Record<string, unknown>;
  const name = typeof m.name === "string" ? m.name.trim() : "";
  if (!name) return null;
  return {
    name,
    initials:
      typeof m.initials === "string" && m.initials.trim()
        ? m.initials.trim().slice(0, 4)
        : name
            .split(/\s+/)
            .map((p) => p[0] ?? "")
            .join("")
            .slice(0, 3)
            .toUpperCase(),
    role: typeof m.role === "string" ? m.role.trim() : "Team member",
    accent:
      typeof m.accent === "string" && m.accent.trim()
        ? m.accent.trim()
        : "from-sa-primary/20 to-sa-surface/40",
    bio: typeof m.bio === "string" ? m.bio.trim() : "",
    imageUrl:
      typeof m.imageUrl === "string" && m.imageUrl.trim() ? m.imageUrl.trim() : undefined,
  };
}

export async function readTeamMembersFile(): Promise<TeamMember[]> {
  try {
    const raw = await readFile(TEAM_JSON, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return defaultTeamMembers;
    const members = parsed
      .map((row, i) => sanitizeMember(row, i))
      .filter((m): m is TeamMember => m !== null);
    return members.length > 0 ? members : defaultTeamMembers;
  } catch {
    return defaultTeamMembers;
  }
}

export async function writeTeamMembersFile(members: TeamMember[]): Promise<void> {
  const sanitized = members
    .map((row, i) => sanitizeMember(row, i))
    .filter((m): m is TeamMember => m !== null);
  if (sanitized.length === 0) {
    throw new Error("At least one team member is required");
  }
  await mkdir(path.dirname(TEAM_JSON), { recursive: true });
  await writeFile(TEAM_JSON, `${JSON.stringify(sanitized, null, 2)}\n`, "utf8");
}
