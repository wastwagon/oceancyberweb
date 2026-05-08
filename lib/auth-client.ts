"use client";

import { getApiBaseUrl } from "@/lib/api-config";
import { nestBrowserProxyPath } from "@/lib/auth/nest-browser-proxy-path";

export type AuthUser = { id: string; email: string; role: string; isAdmin?: boolean };

export type BillingRenewal = {
  id: string;
  status: string;
  nextRenewalAt: string;
  autoRenewUsingWallet: boolean;
  graceEndsAt: string | null;
  consecutiveFailures: number;
  externalRef: string | null;
  plan: { name: string; amountMinor: string; code: string };
};

export type BillingTransaction = {
  id: string;
  type: string;
  status: string;
  amountMinor: string;
  createdAt: string;
};

export type ClientRequestRow = {
  id: string;
  source: string | null;
  status: string;
  message: string;
  metadata: unknown;
  createdAt: string;
  updatedAt: string;
};

export type BillingLedgerEntry = {
  id: string;
  type: string;
  amountMinor: string;
  currency: string;
  reference: string | null;
  description: string | null;
  createdAt: string;
};

export type BillingRenewalPlan = {
  code: string;
  name: string;
  description: string;
  interval: string;
  amountMinor: string;
  currency: string;
};

export type ClientProjectMilestone = {
  id: string;
  code: string;
  title: string;
  orderIndex: number;
  percentage: number;
  amountMinor: string;
  status: string;
  unlockedAt: string | null;
  paidAt: string | null;
  dueAt: string | null;
};

export type ClientProjectInvoice = {
  id: string;
  invoiceNumber: string;
  title: string;
  amountMinor: string;
  currency: string;
  status: string;
  dueAt: string | null;
  issuedAt: string | null;
  paidAt: string | null;
  milestoneId: string | null;
  paystackReference: string | null;
};

export type ClientProjectRow = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  totalAmountMinor: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
  milestones: ClientProjectMilestone[];
  invoices: ClientProjectInvoice[];
  activities?: Array<{
    id: string;
    actorType: string;
    actorId: string | null;
    action: string;
    note: string | null;
    metadata?: { category?: string };
    createdAt: string;
  }>;
};

export { nestBrowserProxyPath };

function resolveAuthRequestUrl(path: string): string {
  if (typeof window !== "undefined" && path.startsWith("/api/v1/")) {
    return nestBrowserProxyPath(path);
  }
  return `${getApiBaseUrl()}${path}`;
}

/** Clear legacy localStorage token if present (older deployments). */
export function clearAccessToken() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("oceancyber_access_token");
  } catch {
    /* ignore */
  }
}

/** True when HttpOnly session cookie is accepted by the server (no JWT exposed to JS). */
export async function checkBrowserSession(): Promise<boolean> {
  try {
    const res = await fetch("/api/auth/session", { credentials: "same-origin" });
    return res.ok;
  } catch {
    return false;
  }
}

/** Clears httpOnly session cookie (Next) and Bearer storage; redirects to sign-in. */
export async function signOut() {
  try {
    await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
  } catch {
    /* network / optional */
  }
  clearAccessToken();
  if (typeof window !== "undefined") {
    window.location.href = "/signin";
  }
}

async function authRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const url = resolveAuthRequestUrl(path);
  const useNestProxy = typeof window !== "undefined" && url.startsWith("/api/nest/");
  const res = await fetch(url, {
    ...init,
    credentials: useNestProxy ? "include" : "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || data?.error || "Request failed");
  }
  return data as T;
}

export async function signIn(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ email, password }),
  });
  const data = (await res.json().catch(() => ({}))) as {
    user?: AuthUser;
    message?: string;
    error?: string;
  };
  if (!res.ok) {
    throw new Error(data.message || data.error || "Sign-in failed");
  }
  if (!data.user?.email) {
    throw new Error("Missing user from sign-in response");
  }
  return data.user as AuthUser;
}

export async function signUp(email: string, password: string, fullName?: string) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ email, password, fullName }),
  });
  const data = (await res.json().catch(() => ({}))) as {
    user?: AuthUser;
    message?: string;
    error?: string;
  };
  if (!res.ok) {
    throw new Error(data.message || data.error || "Sign-up failed");
  }
  if (!data.user?.email) {
    throw new Error("Missing user from sign-up response");
  }
  return data.user as AuthUser;
}

export async function getProfile() {
  return authRequest<AuthUser>("/api/v1/auth/profile");
}

export async function getAdminSummary() {
  return authRequest<{
    userCount: number;
    renewalsByStatus: Record<string, number>;
    pastDueCount: number;
    suspendedCount: number;
    transactions24h: number;
    pendingPayments: number;
    /** All Contact rows in the last 7 days */
    contacts7d: number;
    /** project_calculator source, last 7 days */
    projectCalculatorLeads7d: number;
  }>("/api/v1/admin/summary");
}

export async function getAdminUsers(take = 40) {
  return authRequest<
    Array<{
      id: string;
      email: string;
      role: string;
      fullName: string | null;
      createdAt: string;
      walletBalanceMinor: string;
      walletCurrency: string;
    }>
  >(`/api/v1/admin/users?take=${take}`);
}

export async function getAdminTransactions(take = 50) {
  return authRequest<
    Array<{
      id: string;
      userId: string;
      userEmail: string;
      type: string;
      status: string;
      amountMinor: string;
      currency: string;
      provider: string;
      providerReference: string;
      createdAt: string;
    }>
  >(`/api/v1/admin/transactions?take=${take}`);
}

export async function getAdminRenewalIssues(take = 50) {
  return authRequest<
    Array<{
      id: string;
      status: string;
      nextRenewalAt: string;
      graceEndsAt: string | null;
      userEmail: string;
      userId: string;
      planName: string;
      planCode: string;
      amountMinor: string;
      autoRenew: boolean;
    }>
  >(`/api/v1/admin/renewals/issues?take=${take}`);
}

export type AdminContactRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  source: string | null;
  message: string;
  metadata: unknown;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function getAdminContacts(
  take = 50,
  filters?: { status?: string; source?: string; q?: string; dateRange?: string; sort?: string },
) {
  const p = new URLSearchParams();
  p.set("take", String(take));
  if (filters?.status && filters.status !== "all") p.set("status", filters.status);
  if (filters?.source && filters.source !== "all") p.set("source", filters.source);
  if (filters?.q && filters.q.trim().length > 0) p.set("q", filters.q.trim());
  if (filters?.dateRange && filters.dateRange !== "all") p.set("dateRange", filters.dateRange);
  if (filters?.sort && filters.sort !== "created_desc") p.set("sort", filters.sort);
  return authRequest<AdminContactRow[]>(`/api/v1/admin/contacts?${p.toString()}`);
}

export async function listClientRequests(take = 50) {
  const p = new URLSearchParams();
  p.set("take", String(take));
  return authRequest<ClientRequestRow[]>(`/api/v1/billing/requests?${p.toString()}`);
}

export async function patchAdminContact(
  id: string,
  body: { status?: string; notes?: string },
) {
  return authRequest<AdminContactRow>(`/api/v1/admin/contacts/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function downloadAdminContactsCsv(filters?: {
  take?: number;
  status?: string;
  source?: string;
  q?: string;
  dateRange?: string;
  sort?: string;
}) {
  const p = new URLSearchParams();
  p.set("take", String(filters?.take ?? 1000));
  if (filters?.status && filters.status !== "all") p.set("status", filters.status);
  if (filters?.source && filters.source !== "all") p.set("source", filters.source);
  if (filters?.q && filters.q.trim().length > 0) p.set("q", filters.q.trim());
  if (filters?.dateRange && filters.dateRange !== "all") p.set("dateRange", filters.dateRange);
  if (filters?.sort && filters.sort !== "created_desc") p.set("sort", filters.sort);
  const path = `/api/v1/admin/contacts/export.csv?${p.toString()}`;
  const res = await fetch(nestBrowserProxyPath(path), {
    credentials: "include",
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || data?.error || "Could not export CSV");
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `oceancyber-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.rel = "noopener";
  a.click();
  URL.revokeObjectURL(url);
}

export async function getAdminContactPresetCounts(filters?: {
  q?: string;
  dateRange?: string;
}) {
  const p = new URLSearchParams();
  if (filters?.q && filters.q.trim().length > 0) p.set("q", filters.q.trim());
  if (filters?.dateRange && filters.dateRange !== "all") p.set("dateRange", filters.dateRange);
  return authRequest<{
    all: number;
    newOnly: number;
    projectCalculator: number;
    chat: number;
  }>(`/api/v1/admin/contacts/preset-counts?${p.toString()}`);
}

export async function getAdminHelpCenterFeedbackSummary(filters?: { dateRange?: string }) {
  const p = new URLSearchParams();
  if (filters?.dateRange && filters.dateRange !== "all") p.set("dateRange", filters.dateRange);
  return authRequest<{
    totalFeedback: number;
    articles: Array<{ articleId: string; yes: number; no: number; total: number; helpfulRate: number }>;
  }>(`/api/v1/admin/help-center/feedback-summary?${p.toString()}`);
}

export async function getBillingDashboard() {
  return authRequest<{
    wallet: { balanceMinor: string; balanceDisplay: number; currency: string };
    renewals: BillingRenewal[];
    recentTransactions: BillingTransaction[];
    recentLedger: BillingLedgerEntry[];
  }>("/api/v1/billing/dashboard");
}

export async function listMyProjects() {
  return authRequest<ClientProjectRow[]>("/api/v1/projects");
}

export async function initializeProjectInvoicePayment(projectId: string, invoiceId: string) {
  return authRequest<{ authorizationUrl: string; reference: string; amountMinor: string }>(
    `/api/v1/projects/${encodeURIComponent(projectId)}/invoices/${encodeURIComponent(
      invoiceId,
    )}/pay/initialize`,
    {
      method: "POST",
    },
  );
}

export async function createAdminClientProject(body: {
  userEmail: string;
  title: string;
  description?: string;
  totalAmountGhs: number;
  kickoffPercent?: number;
  buildPercent?: number;
  launchPercent?: number;
}) {
  return authRequest<ClientProjectRow>("/api/v1/projects/admin/create", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function updateAdminClientProjectStatus(projectId: string, body: { status: string; note?: string }) {
  return authRequest<ClientProjectRow>(`/api/v1/projects/admin/${encodeURIComponent(projectId)}/status`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function unlockAdminClientProjectMilestone(
  projectId: string,
  milestoneId: string,
  note?: string,
) {
  return authRequest<ClientProjectMilestone>(
    `/api/v1/projects/admin/${encodeURIComponent(projectId)}/milestones/${encodeURIComponent(
      milestoneId,
    )}/unlock`,
    {
      method: "POST",
      body: JSON.stringify(note ? { note } : {}),
    },
  );
}

export async function listAdminClientProjects() {
  return authRequest<Array<ClientProjectRow & { user: { id: string; email: string; fullName: string | null } }>>(
    "/api/v1/projects/admin",
  );
}

export async function addAdminClientProjectActivity(
  projectId: string,
  note: string,
  category: "general" | "client_feedback" | "dev_update" | "blocker" | "approval" = "general",
) {
  return authRequest<{
    id: string;
    projectId: string;
    actorType: string;
    actorId: string | null;
    action: string;
    note: string | null;
    metadata?: { category?: string };
    createdAt: string;
  }>(`/api/v1/projects/admin/${encodeURIComponent(projectId)}/activity`, {
    method: "POST",
    body: JSON.stringify({ note, category }),
  });
}

export async function getWalletLedger() {
  return authRequest<BillingLedgerEntry[]>("/api/v1/billing/wallet/ledger");
}

export async function listBillingTransactions() {
  return authRequest<BillingTransaction[]>("/api/v1/billing/transactions");
}

export async function listRenewalPlans() {
  return authRequest<BillingRenewalPlan[]>("/api/v1/billing/renewal-plans");
}

export async function initializeWalletTopup(amountGhs: number) {
  return authRequest<{ authorizationUrl: string; reference: string }>(
    "/api/v1/billing/wallet/topup/initialize",
    {
      method: "POST",
      body: JSON.stringify({ amountGhs }),
    },
  );
}

export async function initializeProductCheckout(planCode: string, externalRef?: string) {
  return authRequest<{ authorizationUrl: string; reference: string; amountMinor: string }>(
    "/api/v1/billing/checkout/pay/initialize",
    {
      method: "POST",
      body: JSON.stringify({ planCode, externalRef }),
    },
  );
}

export async function getPaymentStatus(providerReference: string) {
  return authRequest<{
    found: boolean;
    status?: string;
    type?: string;
    amountMinor?: string;
    renewalId?: string | null;
  }>(`/api/v1/billing/payment/status?reference=${encodeURIComponent(providerReference)}`);
}

export async function createRenewal(planCode: string, autoRenewUsingWallet = true, externalRef?: string) {
  return authRequest("/api/v1/billing/renewals", {
    method: "POST",
    body: JSON.stringify({ planCode, autoRenewUsingWallet, externalRef }),
  });
}

export async function chargeRenewal(renewalId: string) {
  return authRequest(`/api/v1/billing/renewals/${renewalId}/charge`, {
    method: "POST",
  });
}

export async function pauseRenewal(renewalId: string) {
  return authRequest(`/api/v1/billing/renewals/${renewalId}/pause`, {
    method: "POST",
  });
}

export async function resumeRenewal(renewalId: string) {
  return authRequest(`/api/v1/billing/renewals/${renewalId}/resume`, {
    method: "POST",
  });
}

export async function cancelRenewal(renewalId: string) {
  return authRequest(`/api/v1/billing/renewals/${renewalId}/cancel`, {
    method: "POST",
  });
}

export async function downloadTransactionReceipt(transactionId: string) {
  const res = await fetch(
    nestBrowserProxyPath(
      `/api/v1/billing/transactions/${encodeURIComponent(transactionId)}/receipt`,
    ),
    { credentials: "include" },
  );
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || "Could not download receipt");
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ocean-cyber-receipt-${transactionId}.txt`;
  a.rel = "noopener";
  a.click();
  URL.revokeObjectURL(url);
}

export async function openTransactionInvoiceHtml(transactionId: string) {
  const res = await fetch(
    nestBrowserProxyPath(
      `/api/v1/billing/transactions/${encodeURIComponent(transactionId)}/invoice`,
    ),
    { credentials: "include" },
  );
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || "Could not open invoice");
  }
  const html = await res.text();
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener,noreferrer");
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

/** Admin: marketing portfolio rows (`Project` model). */
export type AdminSiteProjectRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  techStack: string[];
  imageUrl: string | null;
  featured: boolean;
  sortOrder: number;
  details: unknown;
  createdAt: string;
  updatedAt: string;
};

export async function getAdminSiteProjects() {
  return authRequest<AdminSiteProjectRow[]>("/api/v1/admin/site-projects");
}

export async function createAdminSiteProject(body: {
  title: string;
  slug: string;
  category: string;
  description: string;
  techStack: string[];
  imageUrl?: string | null;
  featured?: boolean;
  sortOrder?: number;
  details?: Record<string, unknown>;
}) {
  return authRequest<AdminSiteProjectRow>("/api/v1/admin/site-projects", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function patchAdminSiteProject(
  id: string,
  body: Partial<{
    title: string;
    slug: string;
    category: string;
    description: string;
    techStack: string[];
    imageUrl: string | null;
    featured: boolean;
    sortOrder: number;
    details: Record<string, unknown>;
  }>,
) {
  return authRequest<AdminSiteProjectRow>(`/api/v1/admin/site-projects/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function deleteAdminSiteProject(id: string) {
  return authRequest<{ ok: boolean }>(`/api/v1/admin/site-projects/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

/** Admin: testimonial quotes (`Testimonial` model). */
export type AdminSiteTestimonialRow = {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  featured: boolean;
  initials: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export async function getAdminSiteTestimonials() {
  return authRequest<AdminSiteTestimonialRow[]>("/api/v1/admin/site-testimonials");
}

export async function createAdminSiteTestimonial(body: {
  name: string;
  company: string;
  role: string;
  content: string;
  rating?: number;
  featured?: boolean;
  initials?: string | null;
  sortOrder?: number;
}) {
  return authRequest<AdminSiteTestimonialRow>("/api/v1/admin/site-testimonials", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function patchAdminSiteTestimonial(
  id: string,
  body: Partial<{
    name: string;
    company: string;
    role: string;
    content: string;
    rating: number;
    featured: boolean;
    initials: string | null;
    sortOrder: number;
  }>,
) {
  return authRequest<AdminSiteTestimonialRow>(`/api/v1/admin/site-testimonials/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function deleteAdminSiteTestimonial(id: string) {
  return authRequest<{ ok: boolean }>(`/api/v1/admin/site-testimonials/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

export async function getAdminNavigation() {
  return authRequest<{ menus: any[] }>("/api/v1/navigation/admin");
}

export async function putAdminNavigation(menus: any[]) {
  return authRequest<{ ok: boolean }>("/api/v1/navigation/admin", {
    method: "PUT",
    body: JSON.stringify({ menus }),
  });
}

/** Public Content (Marketing) */
export async function getPublicProjects() {
  const res = await fetch(`${getApiBaseUrl()}/api/v1/public-content/projects`);
  if (!res.ok) return [];
  return (await res.json()) as AdminSiteProjectRow[];
}

export async function getPublicTestimonials() {
  const res = await fetch(`${getApiBaseUrl()}/api/v1/public-content/testimonials`);
  if (!res.ok) return [];
  return (await res.json()) as AdminSiteTestimonialRow[];
}
