-- AlterTable
ALTER TABLE "Project" ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Project" ADD COLUMN "details" JSONB;

-- Index for list ordering
CREATE INDEX "Project_sortOrder_createdAt_idx" ON "Project"("sortOrder" ASC, "createdAt" ASC);
