"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  signOut,
  getAdminSiteProjects,
  getAdminSiteTestimonials,
  getAdminNavigation,
  getProfile,
  type AdminSiteProjectRow,
  type AdminSiteTestimonialRow,
} from "@/lib/auth-client";
import { AdminNav } from "@/components/admin/AdminNav";
import { TeamMembersManager } from "@/components/admin/content/TeamMembersManager";
import { InsightsManager } from "@/components/admin/content/InsightsManager";
import { HelpCenterManager } from "@/components/admin/content/HelpCenterManager";
import {
  PortfolioProjectsSection,
  type NewProjectForm,
} from "@/components/admin/content/PortfolioProjectsSection";
import {
  TestimonialsSection,
  type NewQuoteForm,
} from "@/components/admin/content/TestimonialsSection";
import { NavigationMenusSection } from "@/components/admin/content/NavigationMenusSection";
import { ClientLogoManager } from "@/components/admin/ClientLogoManager";
import { AppAlert } from "@/components/ui/AppAlert";
import type { AdminNavMenu } from "@/lib/admin/navigation-editor";

const EMPTY_PROJECT: NewProjectForm = {
  title: "",
  slug: "",
  category: "",
  description: "",
  tech: "",
  imageUrl: "",
  featured: false,
  sortOrder: "0",
  detailsJson: "",
};

const EMPTY_QUOTE: NewQuoteForm = {
  name: "",
  company: "",
  role: "",
  content: "",
  rating: "5",
  featured: true,
  initials: "",
  sortOrder: "0",
};

export default function AdminContentPage() {
  const [allowed, setAllowed] = useState<null | boolean>(null);
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [projects, setProjects] = useState<AdminSiteProjectRow[]>([]);
  const [quotes, setQuotes] = useState<AdminSiteTestimonialRow[]>([]);
  const [menus, setMenus] = useState<AdminNavMenu[]>([]);
  const [navLoading, setNavLoading] = useState(false);
  const [navSaving, setNavSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newProj, setNewProj] = useState<NewProjectForm>(EMPTY_PROJECT);
  const [newQuote, setNewQuote] = useState<NewQuoteForm>(EMPTY_QUOTE);
  const [editProj, setEditProj] = useState<AdminSiteProjectRow | null>(null);
  const [editQuote, setEditQuote] = useState<AdminSiteTestimonialRow | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setNavLoading(true);
    setErr(null);
    try {
      const [p, q] = await Promise.all([getAdminSiteProjects(), getAdminSiteTestimonials()]);
      setProjects(p);
      setQuotes(q);
      const navRows = await getAdminNavigation();
      const formattedMenus = (navRows.menus || []).map((menu: AdminNavMenu) => ({
        ...menu,
        items: (menu.items || []).map((item) => ({
          ...item,
          metadataInput: JSON.stringify(item.metadata ?? {}, null, 2),
        })),
      }));
      setMenus(formattedMenus);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Could not load content");
    } finally {
      setLoading(false);
      setNavLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const p = await getProfile();
        if (!p.isAdmin) {
          setAllowed(false);
          return;
        }
        setEmail(p.email);
        setAllowed(true);
        await load();
      } catch {
        setAllowed(false);
        setErr("Sign in as an admin user.");
      }
    })();
  }, [load]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(t);
  }, [toast]);

  if (allowed === null) {
    return (
      <main className="min-h-screen bg-sa-bg px-4 py-16">
        <p className="text-sa-muted/80">Loading…</p>
      </main>
    );
  }

  if (allowed === false) {
    return (
      <main className="min-h-screen bg-sa-bg px-4 py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-sa-border bg-sa-surface p-6">
          <h1 className="text-lg font-bold text-white">Not authorized</h1>
          <p className="mt-2 text-sm text-sa-muted/80">{err || "Admin only."}</p>
          <Link href="/signin" className="mt-4 inline-flex rounded-xl border border-sa-border px-4 py-2 text-sm font-semibold">
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 md:py-12">
      <div className="mx-auto max-w-5xl space-y-10">
        {toast ? <AppAlert variant="success">{toast}</AppAlert> : null}

        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sa-primary">Marketing content</p>
            <h1 className="text-2xl font-bold text-white md:text-3xl">Marketing site content</h1>
            <p className="mt-1 text-sm text-sa-muted/80">{email}</p>
            <p className="mt-2 max-w-xl text-xs text-sa-muted/60">
              Portfolio and testimonials save to PostgreSQL; team, insights, and help center save to{" "}
              <code className="rounded bg-sa-surface px-1">public/data/*.json</code>. Changes publish immediately on save.
              For DB-backed edits, set <code className="rounded bg-sa-surface px-1">REVALIDATE_SECRET</code> on web and backend
              (see <code className="rounded bg-sa-surface px-1">.env.example</code>) to refresh the homepage cache without waiting for ISR.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void load()}
              className="rounded-xl border border-sa-border bg-sa-surface px-4 py-2 text-sm font-semibold text-white"
            >
              Reload
            </button>
            <Link
              href="/admin"
              className="rounded-xl border border-sa-primary/20 bg-sa-primary/10 px-4 py-2 text-sm font-semibold text-white"
            >
              Admin overview
            </Link>
            <button
              type="button"
              onClick={() => {
                void signOut();
              }}
              className="rounded-xl border border-sa-border bg-sa-surface px-4 py-2 text-sm font-semibold text-white"
            >
              Sign out
            </button>
          </div>
        </header>

        <AdminNav />

        {err ? <AppAlert variant="error">{err}</AppAlert> : null}

        <TeamMembersManager />
        <InsightsManager />
        <HelpCenterManager />

        <div className="mt-8">
          <ClientLogoManager />
        </div>

        <PortfolioProjectsSection
          loading={loading}
          projects={projects}
          newProj={newProj}
          setNewProj={setNewProj}
          editProj={editProj}
          setEditProj={setEditProj}
          onToast={setToast}
          onError={setErr}
          onReload={load}
        />

        <TestimonialsSection
          loading={loading}
          quotes={quotes}
          newQuote={newQuote}
          setNewQuote={setNewQuote}
          editQuote={editQuote}
          setEditQuote={setEditQuote}
          onToast={setToast}
          onError={setErr}
          onReload={load}
        />

        <NavigationMenusSection
          menus={menus}
          setMenus={setMenus}
          navLoading={navLoading}
          navSaving={navSaving}
          setNavLoading={setNavLoading}
          setNavSaving={setNavSaving}
          onToast={setToast}
          onError={setErr}
          onReload={load}
        />
      </div>
    </main>
  );
}
