import { readFile } from "fs/promises";
import path from "path";
import { unstable_cache } from "next/cache";
import { teamMembers as defaultTeamMembers, type TeamMember } from "./team";

const TEAM_JSON = path.join(process.cwd(), "public", "data", "team-members.json");

export type { TeamMember };

async function readTeamMembersFromDisk(): Promise<TeamMember[]> {
  try {
    const raw = await readFile(TEAM_JSON, "utf8");
    const parsed = JSON.parse(raw) as TeamMember[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return defaultTeamMembers;
    }
    return parsed;
  } catch {
    return defaultTeamMembers;
  }
}

export const getTeamMembers = unstable_cache(
  readTeamMembersFromDisk,
  ["marketing-team-members"],
  { revalidate: 60, tags: ["team"] },
);
