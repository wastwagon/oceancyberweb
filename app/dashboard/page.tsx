"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  RefreshCcw, 
  ChevronRight,
  AlertCircle
} from "lucide-react";
import {
  BillingLedgerEntry,
  BillingRenewalPlan,
  BillingRenewal,
  BillingTransaction,
  cancelRenewal,
  chargeRenewal,
  createRenewal,
  getBillingDashboard,
  getProfile,
  listMyProjects,
  listRenewalPlans,
  pauseRenewal,
  resumeRenewal,
  type ClientProjectRow,
} from "@/lib/auth-client";
// Components
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { ProjectOverviewCard } from "@/components/dashboard/ProjectOverviewCard";
import { WalletHero } from "@/components/dashboard/WalletHero";
import { SubscriptionNode } from "@/components/dashboard/SubscriptionNode";
import { ActivityHub } from "@/components/dashboard/ActivityHub";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { AppAlert } from "@/components/ui/AppAlert";

type DashboardData = Awaited<ReturnType<typeof getBillingDashboard>>;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [data, setData] = useState<DashboardData | null>(null);
  const [plans, setPlans] = useState<BillingRenewalPlan[]>([]);
  const [selectedPlanCode, setSelectedPlanCode] = useState("");
  const [autoRenewUsingWallet, setAutoRenewUsingWallet] = useState(true);
  const [creating, setCreating] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [projects, setProjects] = useState<ClientProjectRow[]>([]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const [profile, dashboard, availablePlans] = await Promise.all([
        getProfile(),
        getBillingDashboard(),
        listRenewalPlans(),
      ]);
      setEmail(profile.email);
      setData(dashboard);
      setPlans(availablePlans);
      setSelectedPlanCode((prev) => prev || availablePlans[0]?.code || "");
      try {
        setProjects(await listMyProjects());
      } catch {
        setProjects([]);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not load dashboard");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const balanceLabel = useMemo(() => {
    if (!data) return "₵0.00";
    return `₵${data.wallet.balanceDisplay.toFixed(2)}`;
  }, [data]);

  const pastDueCount = data?.renewals.filter((r) => r.status === "past_due").length ?? 0;
  const suspendedCount = data?.renewals.filter((r) => r.status === "suspended").length ?? 0;

  async function withRenewalAction(renewalId: string, fn: () => Promise<unknown>) {
    setBusyId(renewalId);
    setError(null);
    try {
      await fn();
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Action failed");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <main className="min-h-screen pb-20 pt-8 md:pt-12">
      {/* Background Glow */}
      <div className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[500px] w-full -translate-x-1/2 overflow-hidden opacity-10 blur-[120px]">
        <div className="absolute inset-0 bg-gradient-to-b from-sa-primary/20 via-sa-primary/10 to-transparent" />
      </div>

      <div className="sa-container max-w-6xl space-y-10">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sa-eyebrow"
            >
              Control Center
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="sa-title !text-left text-3xl md:text-5xl"
            >
              System <span className="text-sa-muted/40">Dashboard</span>
            </motion.h1>
            <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="text-sm text-sa-muted/60 font-medium"
            >
              Securely connected as <span className="text-white font-bold">{email || "..." }</span>
            </motion.p>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <button
              type="button"
              onClick={() => void load()}
              disabled={loading}
              className="rounded-full border border-sa-border bg-sa-surface/50 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition hover:border-sa-primary/40 hover:text-white disabled:opacity-50"
            >
              <RefreshCcw size={12} className={loading ? "mr-2 inline animate-spin" : "mr-2 inline"} />
              Refresh
            </button>
          </div>
        </header>

        {/* Action Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <DashboardNav showSignOut={false} />
        </motion.div>

        {loading && !data ? <DashboardSkeleton /> : null}

        {error ? (
          <AppAlert variant="error" title="Could not complete action">
            {error}
          </AppAlert>
        ) : null}

        {data ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* Urgent Alerts */}
            <AnimatePresence>
              {(pastDueCount > 0 || suspendedCount > 0) && (
                <motion.section 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-3xl border border-orange-500/40 bg-orange-500/5 p-6 backdrop-blur-md">
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                        <AlertCircle size={20} />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-orange-400 text-lg leading-none">Immediate Action Required</h3>
                        <p className="mt-2 text-sm text-orange-400/80 max-w-2xl leading-relaxed">
                          You have <span className="font-bold text-white underline decoration-orange-500/50 underline-offset-4">{pastDueCount} past due</span> renewals
                          {suspendedCount > 0 ? ` and ${suspendedCount} suspended services.` : "."}
                          {" "}Top up your wallet and charge the affected renewal to restore service.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <Link href="/dashboard/wallet" className="sa-btn-primary min-h-[40px] px-6 text-[10px]">
                            Top up wallet
                          </Link>
                          <Link
                            href="/help-center"
                            className="rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-orange-300 transition hover:bg-orange-500/20"
                          >
                            Billing help
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Top Cards Grid */}
            <section className="grid gap-6 md:grid-cols-3">
              <WalletHero balanceLabel={balanceLabel} />

              <motion.div variants={itemVariants} className="sa-card group flex flex-col justify-between overflow-hidden border-sa-border">
                 <div className="p-8 md:p-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sa-surface text-sa-muted">
                      <RefreshCcw size={20} />
                    </div>
                    <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-sa-muted/60">Active Subscriptions</p>
                    <h2 className="mt-4 font-heading text-6xl font-bold text-white">{data.renewals.length}</h2>
                    <p className="mt-4 text-sm text-sa-muted/60 font-medium">
                      Manage recurring infra and hosting services.
                    </p>
                 </div>
                 <div className="bg-sa-surface/30 p-8 md:px-10 md:py-6">
                   <Link href="/dashboard/statements" className="text-[10px] font-bold uppercase tracking-widest text-sa-muted hover:text-white transition-colors flex items-center gap-2">
                     Transaction History <ChevronRight size={12} />
                   </Link>
                 </div>
              </motion.div>
            </section>

            <ProjectOverviewCard projects={projects} />

            {/* Quick Actions Card */}
            <motion.section variants={itemVariants} className="sa-card group relative overflow-hidden bg-gradient-to-r from-sa-surface/50 to-transparent p-1">
              <div className="rounded-[inherit] bg-[#0A0A0A] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-3">
                  <div className="inline-flex rounded-full bg-sa-primary/10 px-3 py-1 text-[10px] font-bold text-sa-primary">
                    PROMOTION
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-white">Need an App Build?</h2>
                  <p className="text-sm text-sa-muted/70 max-w-xl font-medium leading-relaxed">
                    Convert your existing website into a high-performance native mobile app. 
                    Submit your URL for a custom scoped conversion quote.
                  </p>
                </div>
                <Link
                  href="/services/website-to-mobile-app"
                  className="sa-btn-primary group min-h-[52px] px-10 text-[11px]"
                >
                  Get App Quote
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.section>

            {/* Renewals Management */}
            <motion.section variants={itemVariants} className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white">Subscription Infrastructure</h2>
                  <p className="text-sm text-sa-muted/60 font-medium">Deploy and manage your recurring service nodes.</p>
                </div>
                
                <div className="flex flex-col gap-3 bg-sa-surface/50 p-2 rounded-2xl border border-sa-border backdrop-blur-sm sm:flex-row sm:flex-wrap sm:items-center">
                  <label className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-sa-muted">
                    <input
                      type="checkbox"
                      checked={autoRenewUsingWallet}
                      onChange={(e) => setAutoRenewUsingWallet(e.target.checked)}
                      className="h-4 w-4 rounded border-sa-border bg-sa-surface text-sa-primary focus:ring-sa-primary"
                      disabled={creating || plans.length === 0}
                    />
                    Auto-renew from wallet
                  </label>
                  <select
                    value={selectedPlanCode}
                    onChange={(e) => setSelectedPlanCode(e.target.value)}
                    className="rounded-xl border-none bg-transparent px-4 py-2 text-sm font-semibold text-white focus:ring-0 cursor-pointer"
                    disabled={creating || plans.length === 0}
                  >
                    {plans.length === 0 ? (
                      <option value="">No plans available</option>
                    ) : (
                      plans.map((p) => (
                        <option key={p.code} value={p.code} className="bg-sa-surface">
                          {p.name} — ₵{(Number(p.amountMinor) / 100).toFixed(2)}
                        </option>
                      ))
                    )}
                  </select>
                  
                  <button
                    type="button"
                    disabled={creating || !selectedPlanCode}
                    onClick={async () => {
                      setCreating(true);
                      setError(null);
                      try {
                        await createRenewal(selectedPlanCode, autoRenewUsingWallet);
                        await load();
                      } catch (err: unknown) {
                        setError(err instanceof Error ? err.message : "Could not create renewal");
                      } finally {
                        setCreating(false);
                      }
                    }}
                    className="sa-btn-primary min-h-[40px] px-6 text-[10px]"
                  >
                    <Plus size={14} className={creating ? "animate-spin" : ""} />
                    {creating ? "Deploying..." : "Add Node"}
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                {data.renewals.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 rounded-3xl border border-sa-border border-dashed bg-sa-surface/10"
                  >
                    <RefreshCcw size={48} className="text-sa-muted/20" />
                    <p className="mt-4 text-sm text-sa-muted/60 font-medium">No active subscriptions found.</p>
                  </motion.div>
                ) : (
                  data.renewals.map((row: BillingRenewal) => (
                    <SubscriptionNode 
                      key={row.id}
                      renewal={row}
                      busyId={busyId}
                      onAction={withRenewalAction}
                      chargeRenewal={chargeRenewal}
                      pauseRenewal={pauseRenewal}
                      resumeRenewal={resumeRenewal}
                      cancelRenewal={cancelRenewal}
                    />
                  ))
                )}
              </div>
            </motion.section>

            <ActivityHub 
              ledger={data.recentLedger} 
              transactions={data.recentTransactions} 
              itemVariants={itemVariants} 
            />
          </motion.div>
        ) : null}
      </div>
    </main>
  );
}
