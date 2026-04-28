import { NextResponse } from "next/server";
import { z } from "zod";
import { namecheapDomainsCheck } from "@/lib/namecheap/client";
import { rateLimitPublicApi } from "@/lib/rate-limit";
import {
  expandDomainCandidates,
  normalizeSearchInput,
} from "@/lib/namecheap/suggest-domains";

const bodySchema = z.object({
  query: z.string().max(200),
});

export async function POST(req: Request) {
  const limited = await rateLimitPublicApi(req, "domains-check");
  if (limited) {
    return limited;
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Provide { \"query\": \"brand or domain.com\" }" },
      { status: 400 },
    );
  }

  const normalized = normalizeSearchInput(parsed.data.query);
  if (!normalized) {
    return NextResponse.json(
      { error: "Enter a valid name (letters, numbers, hyphen) or a full domain." },
      { status: 400 },
    );
  }

  const domains = expandDomainCandidates(normalized);
  const result = await namecheapDomainsCheck(domains);

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 502 });
  }

  return NextResponse.json({
    query: parsed.data.query.trim(),
    normalized,
    checked: result.results,
  });
}
