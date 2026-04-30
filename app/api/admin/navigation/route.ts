import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/db";

type MenuItemInput = {
  sortOrder?: number;
  heading: string;
  description?: string | null;
  href: string;
  metadata?: unknown;
  isActive?: boolean;
};

type MenuInput = {
  key: string;
  label: string;
  description?: string | null;
  isActive?: boolean;
  items?: MenuItemInput[];
};

function isAuthorized(req: NextRequest): boolean {
  const configured = process.env.ADMIN_API_KEY;
  if (!configured) return process.env.NODE_ENV !== "production";
  return req.headers.get("x-admin-key") === configured;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await prisma.$queryRaw<
    Array<{
      menuId: string;
      menuKey: string;
      menuLabel: string;
      menuDescription: string | null;
      menuIsActive: boolean;
      itemId: string | null;
      itemSortOrder: number | null;
      itemHeading: string | null;
      itemDescription: string | null;
      itemHref: string | null;
      itemMetadata: unknown;
      itemIsActive: boolean | null;
    }>
  >`
    SELECT
      m.id AS "menuId",
      m.key AS "menuKey",
      m.label AS "menuLabel",
      m.description AS "menuDescription",
      m."isActive" AS "menuIsActive",
      i.id AS "itemId",
      i."sortOrder" AS "itemSortOrder",
      i.heading AS "itemHeading",
      i.description AS "itemDescription",
      i.href AS "itemHref",
      i.metadata AS "itemMetadata",
      i."isActive" AS "itemIsActive"
    FROM "NavigationMenu" m
    LEFT JOIN "NavigationMenuItem" i ON i."menuId" = m.id
    ORDER BY m.key ASC, i."sortOrder" ASC, i."createdAt" ASC
  `;

  const menus = new Map<
    string,
    {
      key: string;
      label: string;
      description: string | null;
      isActive: boolean;
      items: Array<{
        id: string;
        sortOrder: number;
        heading: string;
        description: string | null;
        href: string;
        metadata: unknown;
        isActive: boolean;
      }>;
    }
  >();

  for (const row of rows) {
    const existing = menus.get(row.menuKey) ?? {
      key: row.menuKey,
      label: row.menuLabel,
      description: row.menuDescription,
      isActive: row.menuIsActive,
      items: [],
    };
    if (row.itemId && row.itemHeading && row.itemHref && row.itemSortOrder !== null) {
      existing.items.push({
        id: row.itemId,
        sortOrder: row.itemSortOrder,
        heading: row.itemHeading,
        description: row.itemDescription,
        href: row.itemHref,
        metadata: row.itemMetadata ?? {},
        isActive: row.itemIsActive ?? true,
      });
    }
    menus.set(row.menuKey, existing);
  }

  return NextResponse.json({ menus: [...menus.values()] });
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await req.json()) as { menus?: MenuInput[] };
  if (!payload.menus || !Array.isArray(payload.menus)) {
    return NextResponse.json({ error: "Expected `menus` array." }, { status: 400 });
  }
  const menus = payload.menus;

  await prisma.$transaction(async (tx) => {
    for (const menu of menus) {
      if (!menu.key || !menu.label) continue;
      const upsertRows = await tx.$queryRaw<Array<{ id: string }>>`
        INSERT INTO "NavigationMenu" ("id", "key", "label", "description", "isActive", "createdAt", "updatedAt")
        VALUES (${randomUUID()}, ${menu.key}, ${menu.label}, ${menu.description ?? null}, ${menu.isActive ?? true}, NOW(), NOW())
        ON CONFLICT ("key")
        DO UPDATE SET
          "label" = EXCLUDED."label",
          "description" = EXCLUDED."description",
          "isActive" = EXCLUDED."isActive",
          "updatedAt" = NOW()
        RETURNING "id"
      `;
      const menuId = upsertRows[0]?.id;
      if (!menuId) continue;

      await tx.$executeRaw`DELETE FROM "NavigationMenuItem" WHERE "menuId" = ${menuId}`;
      const items = menu.items ?? [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i]!;
        await tx.$executeRaw`
          INSERT INTO "NavigationMenuItem"
            ("id", "menuId", "sortOrder", "heading", "description", "href", "metadata", "isActive", "createdAt", "updatedAt")
          VALUES
            (
              ${randomUUID()},
              ${menuId},
              ${item.sortOrder ?? i * 10},
              ${item.heading},
              ${item.description ?? null},
              ${item.href},
              ${JSON.stringify(item.metadata ?? {})}::jsonb,
              ${item.isActive ?? true},
              NOW(),
              NOW()
            )
        `;
      }
    }
  });

  revalidateTag("navigation");
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/portfolio");
  revalidatePath("/pricing");
  revalidatePath("/projects");
  revalidatePath("/team");

  return NextResponse.json({ ok: true });
}
