import { readClientLogoOverrides } from "@/lib/admin/media-upload-server";
import {
  buildClientLogoEntries,
  type ClientLogoEntry,
} from "@/lib/startup-agency/client-logos-runtime";
import { unstable_cache } from "next/cache";

export type { ClientLogoEntry };

async function readClientLogoEntriesFromDisk(): Promise<ClientLogoEntry[]> {
  const overrides = await readClientLogoOverrides();
  return buildClientLogoEntries(overrides);
}

export const getClientLogoEntries = unstable_cache(
  readClientLogoEntriesFromDisk,
  ["marketing-client-logos"],
  { revalidate: 300, tags: ["client-logos"] },
);
