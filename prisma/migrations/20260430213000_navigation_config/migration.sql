-- Navigation configuration tables
CREATE TABLE "NavigationMenu" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "description" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "NavigationMenu_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "NavigationMenuItem" (
  "id" TEXT NOT NULL,
  "menuId" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "heading" TEXT NOT NULL,
  "description" TEXT,
  "href" TEXT NOT NULL,
  "metadata" JSONB,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "NavigationMenuItem_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "NavigationMenu_key_key" ON "NavigationMenu"("key");
CREATE INDEX "NavigationMenu_isActive_idx" ON "NavigationMenu"("isActive");
CREATE INDEX "NavigationMenuItem_menuId_isActive_sortOrder_idx"
  ON "NavigationMenuItem"("menuId", "isActive", "sortOrder");

ALTER TABLE "NavigationMenuItem"
ADD CONSTRAINT "NavigationMenuItem_menuId_fkey"
FOREIGN KEY ("menuId") REFERENCES "NavigationMenu"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
