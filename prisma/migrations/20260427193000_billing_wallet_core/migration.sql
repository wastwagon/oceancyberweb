-- User: admin + wallet fields
ALTER TABLE "User" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'user';
ALTER TABLE "User" ADD COLUMN "fullName" TEXT;
ALTER TABLE "User" ADD COLUMN "walletBalanceMinor" BIGINT NOT NULL DEFAULT 0;
ALTER TABLE "User" ADD COLUMN "walletCurrency" TEXT NOT NULL DEFAULT 'GHS';

-- RenewalPlan (catalog SKUs — Paystack / wallet renewals)
CREATE TABLE "RenewalPlan" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "interval" TEXT NOT NULL,
    "amountMinor" BIGINT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'GHS',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "gracePeriodDays" INTEGER NOT NULL DEFAULT 7,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RenewalPlan_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "RenewalPlan_code_key" ON "RenewalPlan"("code");

-- UserRenewal (per-user subscription state)
CREATE TABLE "UserRenewal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "nextRenewalAt" TIMESTAMP(3) NOT NULL,
    "autoRenewUsingWallet" BOOLEAN NOT NULL DEFAULT true,
    "externalRef" TEXT,
    "metadata" JSONB,
    "status" TEXT NOT NULL DEFAULT 'active',
    "pausedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "graceEndsAt" TIMESTAMP(3),
    "consecutiveFailures" INTEGER NOT NULL DEFAULT 0,
    "lastChargeAttemptAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRenewal_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "UserRenewal_userId_idx" ON "UserRenewal"("userId");
CREATE INDEX "UserRenewal_nextRenewalAt_idx" ON "UserRenewal"("nextRenewalAt");

ALTER TABLE "UserRenewal" ADD CONSTRAINT "UserRenewal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "UserRenewal" ADD CONSTRAINT "UserRenewal_planId_fkey" FOREIGN KEY ("planId") REFERENCES "RenewalPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- PaymentTransaction (Paystack + wallet ledger mirror)
CREATE TABLE "PaymentTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "amountMinor" BIGINT NOT NULL,
    "currency" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerReference" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentTransaction_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PaymentTransaction_providerReference_key" ON "PaymentTransaction"("providerReference");
CREATE INDEX "PaymentTransaction_userId_idx" ON "PaymentTransaction"("userId");
CREATE INDEX "PaymentTransaction_createdAt_idx" ON "PaymentTransaction"("createdAt");

ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- WalletLedger (credit / debit rows)
CREATE TABLE "WalletLedger" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amountMinor" BIGINT NOT NULL,
    "currency" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalletLedger_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "WalletLedger_userId_idx" ON "WalletLedger"("userId");

ALTER TABLE "WalletLedger" ADD CONSTRAINT "WalletLedger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
