import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import {
  namecheapDomainsCreate,
  namecheapSslCreate,
  type DomainCreateInput,
} from "@/lib/namecheap/client";
import { prisma } from "@/lib/db";
import { rateLimitPublicApi } from "@/lib/rate-limit";

const addonSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  selected: z.boolean().optional().default(false),
  required: z.boolean().optional().default(false),
});

const cartItemSchema = z.object({
  kind: z.enum(["domain", "hosting", "ssl"]),
  label: z.string().min(1),
  planCode: z.string().min(1),
  reference: z.string().min(1),
  addons: z.array(addonSchema).default([]),
});

const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+[0-9().\-\s]{7,20}$/, "Phone must start with + and include country code.");

const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  address1: z.string().trim().min(1).max(120),
  city: z.string().trim().min(1).max(80),
  stateProvince: z.string().trim().min(1).max(80),
  postalCode: z
    .string()
    .trim()
    .min(2)
    .max(20)
    .regex(/^[a-zA-Z0-9\-\s]+$/, "Postal code can only include letters, numbers, spaces, and hyphens."),
  country: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{2}$/, "Country must be a 2-letter ISO code (e.g. GH)."),
  phone: phoneSchema,
  emailAddress: z.string().email(),
  organizationName: z.string().trim().max(120).optional(),
});

const bodySchema = z.object({
  items: z.array(cartItemSchema).min(1),
  domainContact: contactSchema.optional(),
  parentCheckoutRef: z.string().min(1).optional(),
});

function defaultDomainContact(): DomainCreateInput["registrant"] | null {
  const firstName = process.env.NAMECHEAP_DEFAULT_FIRST_NAME?.trim();
  const lastName = process.env.NAMECHEAP_DEFAULT_LAST_NAME?.trim();
  const address1 = process.env.NAMECHEAP_DEFAULT_ADDRESS1?.trim();
  const city = process.env.NAMECHEAP_DEFAULT_CITY?.trim();
  const stateProvince = process.env.NAMECHEAP_DEFAULT_STATE?.trim();
  const postalCode = process.env.NAMECHEAP_DEFAULT_POSTAL_CODE?.trim();
  const country = process.env.NAMECHEAP_DEFAULT_COUNTRY?.trim();
  const phone = process.env.NAMECHEAP_DEFAULT_PHONE?.trim();
  const emailAddress = process.env.NAMECHEAP_DEFAULT_EMAIL?.trim();
  const organizationName = process.env.NAMECHEAP_DEFAULT_ORGANIZATION?.trim();

  if (
    !firstName ||
    !lastName ||
    !address1 ||
    !city ||
    !stateProvince ||
    !postalCode ||
    !country ||
    !phone ||
    !emailAddress
  ) {
    return null;
  }

  return {
    firstName,
    lastName,
    address1,
    city,
    stateProvince,
    postalCode,
    country,
    phone,
    emailAddress,
    organizationName,
  };
}

function hasAddon(item: z.infer<typeof cartItemSchema>, id: string): boolean {
  return item.addons.some((a) => a.id === id && (a.selected || a.required));
}

export async function POST(req: Request) {
  const limited = await rateLimitPublicApi(req, "namecheap-unified-checkout");
  if (limited) return limited;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ||
      "Provide { items, domainContact? } with valid cart data.";
    return NextResponse.json(
      { error: message },
      { status: 400 },
    );
  }

  const requestedContact = parsed.data.domainContact;
  const fallbackContact = defaultDomainContact();
  const domainContact = requestedContact || fallbackContact;

  const results: Array<Record<string, unknown>> = [];
  const checkoutRef = `NC-UNIFIED-${Date.now()}`;
  const parentCheckoutRef = parsed.data.parentCheckoutRef?.trim() || null;

  for (const item of parsed.data.items) {
    if (item.kind === "hosting") {
      results.push({
        kind: "hosting",
        label: item.label,
        status: "delegated_to_local_checkout",
        planCode: item.planCode,
        reference: item.reference,
      });
      continue;
    }

    if (item.kind === "domain") {
      if (!domainContact) {
        results.push({
          kind: "domain",
          label: item.label,
          status: "skipped_missing_contact",
          message:
            "Domain contact is required. Send domainContact in request body or set NAMECHEAP_DEFAULT_* env values.",
        });
        continue;
      }

      const created = await namecheapDomainsCreate({
        domainName: item.label.toLowerCase(),
        years: 1,
        registrant: domainContact,
        addFreeWhoisguard: true,
        wgEnabled: true,
      });

      if (!created.ok) {
        results.push({
          kind: "domain",
          label: item.label,
          status: "failed",
          message: created.message,
        });
        continue;
      }

      results.push({
        kind: "domain",
        label: item.label,
        status: created.result.registered ? "registered" : "pending",
        orderId: created.result.orderId,
        transactionId: created.result.transactionId,
        chargedAmount: created.result.chargedAmount,
      });

      if (hasAddon(item, "ssl-positivessl")) {
        const sslOrder = await namecheapSslCreate({
          years: 1,
          type: "PositiveSSL",
        });
        if (!sslOrder.ok) {
          results.push({
            kind: "ssl",
            label: `${item.label} / PositiveSSL`,
            status: "failed",
            message: sslOrder.message,
          });
        } else {
          results.push({
            kind: "ssl",
            label: `${item.label} / PositiveSSL`,
            status: sslOrder.result.isSuccess ? "created" : "pending",
            orderId: sslOrder.result.orderId,
            certificateId: sslOrder.result.certificateId,
            transactionId: sslOrder.result.transactionId,
            chargedAmount: sslOrder.result.chargedAmount,
          });
        }
      }
      continue;
    }

    if (item.kind === "ssl") {
      const sslOrder = await namecheapSslCreate({
        years: 1,
        type: "PositiveSSL",
      });
      if (!sslOrder.ok) {
        results.push({
          kind: "ssl",
          label: item.label,
          status: "failed",
          message: sslOrder.message,
        });
      } else {
        results.push({
          kind: "ssl",
          label: item.label,
          status: sslOrder.result.isSuccess ? "created" : "pending",
          orderId: sslOrder.result.orderId,
          certificateId: sslOrder.result.certificateId,
          transactionId: sslOrder.result.transactionId,
          chargedAmount: sslOrder.result.chargedAmount,
        });
      }
    }
  }

  const failedCount = results.filter((row) => row.status === "failed").length;
  const successCount = results.filter((row) =>
    ["registered", "created", "delegated_to_local_checkout"].includes(
      String(row.status),
    ),
  ).length;
  const status =
    failedCount === 0
      ? "completed"
      : successCount > 0
        ? "partial"
        : "failed";

  try {
    const metadata = JSON.parse(
      JSON.stringify({
        checkoutRef,
        parentCheckoutRef,
        domainContact: parsed.data.domainContact ?? null,
        items: parsed.data.items,
        results,
      }),
    ) as Prisma.InputJsonValue;

    await prisma.contact.create({
      data: {
        name: parsed.data.domainContact
          ? `${parsed.data.domainContact.firstName} ${parsed.data.domainContact.lastName}`.trim()
          : "Unified Checkout",
        email:
          parsed.data.domainContact?.emailAddress ||
          `checkout+${checkoutRef.toLowerCase()}@oceancyber.local`,
        phone: parsed.data.domainContact?.phone,
        source: "namecheap_unified_checkout",
        status,
        message: `Unified Namecheap checkout ${status}. Items: ${parsed.data.items.length}, success: ${successCount}, failed: ${failedCount}.`,
        metadata,
      },
    });
  } catch {
    // non-blocking audit trail write
  }

  return NextResponse.json({
    ok: true,
    mode: "phase-2-unified",
    note: "Hosting remains on local checkout while domain/SSL use Namecheap API.",
    checkoutRef,
    results,
  });
}
