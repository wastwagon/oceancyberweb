"use client";

import { getApiBaseUrl } from "@/lib/api-config";

const TOKEN_KEY = "oceancyber_access_token";

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

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAccessToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAccessToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

async function authRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAccessToken();
  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || data?.error || "Request failed");
  }
  return data as T;
}

export async function signIn(email: string, password: string) {
  const data = await authRequest<{ access_token: string; user: AuthUser }>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setAccessToken(data.access_token);
  return data.user;
}

export async function signUp(email: string, password: string, fullName?: string) {
  const data = await authRequest<{ access_token: string; user: AuthUser }>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, fullName }),
  });
  setAccessToken(data.access_token);
  return data.user;
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
  const token = getAccessToken();
  const p = new URLSearchParams();
  p.set("take", String(filters?.take ?? 1000));
  if (filters?.status && filters.status !== "all") p.set("status", filters.status);
  if (filters?.source && filters.source !== "all") p.set("source", filters.source);
  if (filters?.q && filters.q.trim().length > 0) p.set("q", filters.q.trim());
  if (filters?.dateRange && filters.dateRange !== "all") p.set("dateRange", filters.dateRange);
  if (filters?.sort && filters.sort !== "created_desc") p.set("sort", filters.sort);
  const res = await fetch(`${getApiBaseUrl()}/api/v1/admin/contacts/export.csv?${p.toString()}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
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
  const token = getAccessToken();
  const res = await fetch(
    `${getApiBaseUrl()}/api/v1/billing/transactions/${encodeURIComponent(transactionId)}/receipt`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
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
  const token = getAccessToken();
  const res = await fetch(
    `${getApiBaseUrl()}/api/v1/billing/transactions/${encodeURIComponent(transactionId)}/invoice`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
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
