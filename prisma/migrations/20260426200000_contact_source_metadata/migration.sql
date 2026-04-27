-- AlterTable
ALTER TABLE "Contact" ADD COLUMN "source" TEXT;
ALTER TABLE "Contact" ADD COLUMN "metadata" JSONB;

-- Index for admin queries by type and time
CREATE INDEX "Contact_source_createdAt_idx" ON "Contact"("source", "createdAt");
