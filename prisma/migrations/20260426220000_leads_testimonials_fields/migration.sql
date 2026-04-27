-- AlterTable Contact — lead triage
ALTER TABLE "Contact" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'new';
ALTER TABLE "Contact" ADD COLUMN "notes" TEXT;

CREATE INDEX "Contact_status_createdAt_idx" ON "Contact"("status", "createdAt");

-- AlterTable Testimonial — ordering + optional initials
ALTER TABLE "Testimonial" ADD COLUMN "initials" TEXT;
ALTER TABLE "Testimonial" ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0;

CREATE INDEX "Testimonial_sortOrder_createdAt_idx" ON "Testimonial"("sortOrder" ASC, "createdAt" ASC);
