"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  clearAccessToken,
  createAdminSiteProject,
  createAdminSiteTestimonial,
  deleteAdminSiteProject,
  deleteAdminSiteTestimonial,
  getAdminSiteProjects,
  getAdminSiteTestimonials,
  getProfile,
  patchAdminSiteProject,
  patchAdminSiteTestimonial,
  type AdminSiteProjectRow,
  type AdminSiteTestimonialRow,
} from "@/lib/auth-client";
import { defaultNavigationConfig } from "@/lib/navigation/menu";

type AdminNavItem = {
  id?: string;
  sortOrder: number;
  heading: string;
  description: string | null;
  href: string;
  metadata: unknown;
  metadataInput: string;
  isActive: boolean;
};

type AdminNavMenu = {
  key: string;
  label: string;
  description: string | null;
  isActive: boolean;
  items: AdminNavItem[];
};

function createEmptyNavItem(sortOrder = 0): AdminNavItem {
  return {
    sortOrder,
    heading: "",
    description: null,
    href: "",
    metadata: {},
    metadataInput: "{}",
    isActive: true,
  };
}

function createEmptyNavMenu(): AdminNavMenu {
  return {
    key: "",
    label: "",
    description: null,
    isActive: true,
    items: [createEmptyNavItem(0)],
  };
}

function buildMenuPreset(kind: string): AdminNavMenu {
  if (kind === "startup-primary") {
    return {
      key: "startup-primary",
      label: "Startup primary",
      description: "Primary in-page startup navigation",
      isActive: true,
      items: [
        { ...createEmptyNavItem(0), heading: "Home", href: "/", metadataInput: "{}" },
        { ...createEmptyNavItem(10), heading: "About", href: "#about", metadataInput: '{"sectionId":"about"}' },
        {
          ...createEmptyNavItem(20),
          heading: "Services",
          href: "#services",
          metadataInput: '{"sectionId":"services"}',
        },
        {
          ...createEmptyNavItem(30),
          heading: "Portfolio",
          href: "#projects",
          metadataInput: '{"sectionId":"projects"}',
        },
      ],
    };
  }
  if (kind === "startup-pages") {
    return {
      key: "startup-pages",
      label: "Startup pages",
      description: "Pages dropdown for startup navbar",
      isActive: true,
      items: [
        { ...createEmptyNavItem(0), heading: "Home", href: "/" },
        { ...createEmptyNavItem(10), heading: "About", href: "/about" },
        { ...createEmptyNavItem(20), heading: "Team", href: "/team" },
        { ...createEmptyNavItem(30), heading: "Pricing", href: "/pricing" },
        { ...createEmptyNavItem(40), heading: "Projects", href: "/projects" },
      ],
    };
  }
  if (kind === "main-header") {
    return {
      key: "main-header",
      label: "Main header",
      description: "Primary global header links",
      isActive: true,
      items: [
        { ...createEmptyNavItem(0), heading: "Home", href: "/", metadataInput: "{}" },
        {
          ...createEmptyNavItem(10),
          heading: "Services",
          href: "/services",
          metadataInput: '{"dropdownKey":"services"}',
        },
        {
          ...createEmptyNavItem(20),
          heading: "Industries",
          href: "/industries",
          metadataInput: '{"dropdownKey":"industries"}',
        },
        {
          ...createEmptyNavItem(30),
          heading: "Infrastructure",
          href: "/domains",
          metadataInput: '{"dropdownKey":"infrastructure","activeMatch":["/domains","/hosting"]}',
        },
      ],
    };
  }
  if (kind.startsWith("main-dropdown-")) {
    const suffix = kind.replace("main-dropdown-", "");
    const shared = {
      key: kind,
      label: suffix.charAt(0).toUpperCase() + suffix.slice(1),
      description: `${suffix} mega-menu content`,
      isActive: true,
    };
    if (suffix === "industries") {
      return {
        ...shared,
        items: [
          {
            ...createEmptyNavItem(0),
            heading: "Financial Services",
            href: "/industries/financial-services",
            description: "Secure banking solutions and fintech innovations.",
          },
          {
            ...createEmptyNavItem(10),
            heading: "Healthcare",
            href: "/industries/healthcare",
            description: "HIPAA-compliant healthcare technology solutions.",
          },
        ],
      };
    }
    if (suffix === "infrastructure") {
      return {
        ...shared,
        items: [
          {
            ...createEmptyNavItem(0),
            heading: "Domains & SSL",
            href: "/domains",
            description: "Search domain availability and add SSL with secure checkout.",
          },
          {
            ...createEmptyNavItem(10),
            heading: "Hosting",
            href: "/hosting",
            description: "Launch cPanel and WHM hosting plans with local support.",
          },
        ],
      };
    }
    if (suffix === "resources") {
      return {
        ...shared,
        items: [
          {
            ...createEmptyNavItem(0),
            heading: "Insights",
            href: "/insights",
            description: "Strategy notes, platform updates, and practical guides.",
          },
          {
            ...createEmptyNavItem(10),
            heading: "Case studies",
            href: "/case-studies",
            description: "Delivery outcomes across sectors in Ghana and beyond.",
          },
        ],
      };
    }
    if (suffix === "company") {
      return {
        ...shared,
        items: [
          {
            ...createEmptyNavItem(0),
            heading: "About",
            href: "/about",
            description: "Our mission, team, and operating principles.",
          },
          {
            ...createEmptyNavItem(10),
            heading: "Portfolio",
            href: "/portfolio",
            description: "Delivery examples across sectors and product types.",
          },
        ],
      };
    }
    return {
      ...shared,
      items: [
        { ...createEmptyNavItem(0), heading: "Item one", href: "/", description: "Menu description" },
        { ...createEmptyNavItem(10), heading: "Item two", href: "/", description: "Menu description" },
      ],
    };
  }
  return createEmptyNavMenu();
}

function buildDefaultNavigationMenus(): AdminNavMenu[] {
  const startupPrimary: AdminNavMenu = {
    key: "startup-primary",
    label: "Startup primary",
    description: "Primary in-page startup navigation",
    isActive: true,
    items: defaultNavigationConfig.startupPrimaryNav.map((item, index) => {
      const metadata =
        "sectionId" in item && item.sectionId ? { sectionId: item.sectionId } : {};
      return {
        ...createEmptyNavItem(index * 10),
        heading: item.label,
        href: "href" in item ? item.href : `#${item.sectionId}`,
        metadata,
        metadataInput: JSON.stringify(metadata, null, 2),
      };
    }),
  };

  const startupPages: AdminNavMenu = {
    key: "startup-pages",
    label: "Startup pages",
    description: "Pages dropdown for startup navbar",
    isActive: true,
    items: defaultNavigationConfig.startupPagesMenu.map((item, index) => ({
      ...createEmptyNavItem(index * 10),
      heading: item.label,
      href: item.href,
    })),
  };

  const mainHeader: AdminNavMenu = {
    key: "main-header",
    label: "Main header",
    description: "Primary global header links",
    isActive: true,
    items: defaultNavigationConfig.mainHeaderNav.map((item, index) => {
      const metadata: Record<string, unknown> = {};
      if (item.dropdownKey) metadata.dropdownKey = item.dropdownKey;
      if (item.activeMatch?.length) metadata.activeMatch = item.activeMatch;
      return {
        ...createEmptyNavItem(index * 10),
        heading: item.label,
        href: item.href,
        metadata,
        metadataInput: JSON.stringify(metadata, null, 2),
      };
    }),
  };

  const dropdownMenus: AdminNavMenu[] = Object.entries(defaultNavigationConfig.mainHeaderDropdownContent).map(
    ([key, dropdown]) => ({
      key: `main-dropdown-${key}`,
      label: dropdown.title,
      description: dropdown.description,
      isActive: true,
      items: dropdown.items.map((item, index) => ({
        ...createEmptyNavItem(index * 10),
        heading: item.heading,
        description: item.description,
        href: item.link,
      })),
    }),
  );

  return [startupPrimary, startupPages, mainHeader, ...dropdownMenus];
}

async function getAdminNavigation(apiKey: string) {
  const res = await fetch("/api/admin/navigation", {
    headers: apiKey ? { "x-admin-key": apiKey } : {},
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || "Failed to load navigation");
  }
  const menus = ((data?.menus as AdminNavMenu[]) || []).map((menu) => ({
    ...menu,
    items: menu.items.map((item) => ({
      ...item,
      metadataInput: JSON.stringify(item.metadata ?? {}, null, 2),
    })),
  }));
  return menus;
}

async function putAdminNavigation(menus: AdminNavMenu[], apiKey: string) {
  const duplicateKeys = new Set<string>();
  for (const menu of menus) {
    const normalized = menu.key.trim().toLowerCase();
    if (!normalized) {
      throw new Error("Each menu must include a key.");
    }
    if (duplicateKeys.has(normalized)) {
      throw new Error(`Duplicate menu key detected: ${menu.key}`);
    }
    duplicateKeys.add(normalized);
  }

  const payloadMenus = menus.map((menu, menuIndex) => ({
    ...menu,
    items: menu.items.map((item, itemIndex) => {
      let parsedMetadata: unknown = {};
      const raw = item.metadataInput.trim();
      if (raw.length > 0) {
        try {
          parsedMetadata = JSON.parse(raw) as unknown;
        } catch {
          throw new Error(`Invalid metadata JSON in menu ${menu.key || menuIndex + 1}, item ${itemIndex + 1}.`);
        }
      }
      return {
        id: item.id,
        sortOrder: item.sortOrder,
        heading: item.heading,
        description: item.description,
        href: item.href,
        metadata: parsedMetadata,
        isActive: item.isActive,
      };
    }),
  }));
  const res = await fetch("/api/admin/navigation", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "x-admin-key": apiKey } : {}),
    },
    body: JSON.stringify({ menus: payloadMenus }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || "Failed to save navigation");
  }
}

function techJoin(tech: string[]) {
  return tech.join(", ");
}

function techSplit(s: string): string[] {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

export default function AdminContentPage() {
  const [allowed, setAllowed] = useState<null | boolean>(null);
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [projects, setProjects] = useState<AdminSiteProjectRow[]>([]);
  const [quotes, setQuotes] = useState<AdminSiteTestimonialRow[]>([]);
  const [menus, setMenus] = useState<AdminNavMenu[]>([]);
  const [adminApiKey, setAdminApiKey] = useState("");
  const [navLoading, setNavLoading] = useState(false);
  const [navSaving, setNavSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newProj, setNewProj] = useState({
    title: "",
    slug: "",
    category: "",
    description: "",
    tech: "",
    imageUrl: "",
    featured: false,
    sortOrder: "0",
    detailsJson: "",
  });

  const [newQuote, setNewQuote] = useState({
    name: "",
    company: "",
    role: "",
    content: "",
    rating: "5",
    featured: true,
    initials: "",
    sortOrder: "0",
  });

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
      const storedKey =
        typeof window !== "undefined" ? localStorage.getItem("oceancyber_admin_api_key") || "" : "";
      setAdminApiKey(storedKey);
      const navRows = await getAdminNavigation(storedKey);
      setMenus(navRows);
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
      <main className="min-h-screen bg-slate-50 px-4 py-16">
        <p className="text-slate-600">Loading…</p>
      </main>
    );
  }

  if (allowed === false) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-lg font-bold text-slate-900">Not authorized</h1>
          <p className="mt-2 text-sm text-slate-600">{err || "Admin only."}</p>
          <Link href="/signin" className="mt-4 inline-flex rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 md:py-14">
      <div className="mx-auto max-w-5xl space-y-10">
        {toast ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{toast}</div>
        ) : null}

        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">Marketing content</p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Portfolio & testimonials</h1>
            <p className="mt-1 text-sm text-slate-600">{email}</p>
            <p className="mt-2 max-w-xl text-xs text-slate-500">
              Edits save to PostgreSQL. Set <code className="rounded bg-slate-100 px-1">REVALIDATE_SECRET</code> on both{" "}
              <code className="rounded bg-slate-100 px-1">web</code> and <code className="rounded bg-slate-100 px-1">backend</code>{" "}
              (see <code className="rounded bg-slate-100 px-1">.env.example</code>) so the API can refresh the homepage cache immediately; otherwise allow up to the ISR window (~5 minutes).
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void load()}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800"
            >
              Reload
            </button>
            <Link
              href="/admin"
              className="rounded-xl border border-ocean-200 bg-ocean-50 px-4 py-2 text-sm font-semibold text-ocean-900"
            >
              Admin overview
            </Link>
            <button
              type="button"
              onClick={() => {
                clearAccessToken();
                window.location.href = "/signin";
              }}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800"
            >
              Sign out
            </button>
          </div>
        </header>

        {err ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{err}</div> : null}

        {/* Team media handoff */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Team headshot handoff</h2>
          <p className="mt-1 text-sm text-slate-600">
            Team cards on <code className="rounded bg-slate-100 px-1">/team</code> now use branded
            monogram placeholders. Use this checklist to replace with real headshots.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Recommended asset spec
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Upload 1200x1200 or larger square portraits</li>
                <li>Prefer neutral dark background for startup-theme consistency</li>
                <li>Compress to WebP and keep each file under ~250KB</li>
                <li>
                  Save in <code className="rounded bg-slate-100 px-1">/public/images/team</code>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Suggested filenames
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>
                  <code className="rounded bg-slate-100 px-1">marcus-owusu.webp</code>
                </li>
                <li>
                  <code className="rounded bg-slate-100 px-1">sarah-mensah.webp</code>
                </li>
                <li>
                  <code className="rounded bg-slate-100 px-1">kwame-nkrumah.webp</code>
                </li>
                <li>
                  <code className="rounded bg-slate-100 px-1">ama-serwaa.webp</code>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            After assets are uploaded, update team image paths in{" "}
            <code className="rounded bg-slate-100 px-1">lib/data/team.ts</code>{" "}
            (<code className="rounded bg-slate-100 px-1">teamMembers[].imageUrl</code>).
          </p>
        </section>

        {/* Projects */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Portfolio projects</h2>
          <p className="mt-1 text-sm text-slate-600">
            Powers <code className="rounded bg-slate-100 px-1">/portfolio</code>. Rich detail JSON is optional (
            <code className="rounded bg-slate-100 px-1">details.v === 1</code>).
          </p>

          <div className="mt-6 space-y-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Add project</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs text-slate-600">
                Title
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newProj.title}
                  onChange={(e) => setNewProj((s) => ({ ...s, title: e.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-600">
                Slug (URL)
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  placeholder="my-case-study"
                  value={newProj.slug}
                  onChange={(e) => setNewProj((s) => ({ ...s, slug: e.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-600">
                Category
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newProj.category}
                  onChange={(e) => setNewProj((s) => ({ ...s, category: e.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-600">
                Sort order
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newProj.sortOrder}
                  onChange={(e) => setNewProj((s) => ({ ...s, sortOrder: e.target.value }))}
                />
              </label>
            </div>
            <label className="block text-xs text-slate-600">
              Short description
              <textarea
                className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                rows={2}
                value={newProj.description}
                onChange={(e) => setNewProj((s) => ({ ...s, description: e.target.value }))}
              />
            </label>
            <label className="block text-xs text-slate-600">
              Tech stack (comma-separated)
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                placeholder="Next.js, PostgreSQL"
                value={newProj.tech}
                onChange={(e) => setNewProj((s) => ({ ...s, tech: e.target.value }))}
              />
            </label>
            <label className="block text-xs text-slate-600">
              Image URL (optional)
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                value={newProj.imageUrl}
                onChange={(e) => setNewProj((s) => ({ ...s, imageUrl: e.target.value }))}
              />
            </label>
            <label className="block text-xs text-slate-600">
              Details JSON (optional)
              <textarea
                className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 font-mono text-xs"
                rows={4}
                placeholder='{"v":1,"image":"/images/..."}'
                value={newProj.detailsJson}
                onChange={(e) => setNewProj((s) => ({ ...s, detailsJson: e.target.value }))}
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={newProj.featured}
                onChange={(e) => setNewProj((s) => ({ ...s, featured: e.target.checked }))}
              />
              Featured
            </label>
            <button
              type="button"
              className="rounded-lg bg-ocean-600 px-4 py-2 text-sm font-semibold text-white hover:bg-ocean-700"
              onClick={async () => {
                let details: Record<string, unknown> | undefined;
                if (newProj.detailsJson.trim()) {
                  try {
                    details = JSON.parse(newProj.detailsJson) as Record<string, unknown>;
                  } catch {
                    setErr("Details JSON is invalid.");
                    return;
                  }
                }
                try {
                  await createAdminSiteProject({
                    title: newProj.title.trim(),
                    slug: newProj.slug.trim(),
                    category: newProj.category.trim(),
                    description: newProj.description.trim(),
                    techStack: techSplit(newProj.tech),
                    imageUrl: newProj.imageUrl.trim() || null,
                    featured: newProj.featured,
                    sortOrder: Number.parseInt(newProj.sortOrder, 10) || 0,
                    details,
                  });
                  setToast("Project created.");
                  setNewProj({
                    title: "",
                    slug: "",
                    category: "",
                    description: "",
                    tech: "",
                    imageUrl: "",
                    featured: false,
                    sortOrder: "0",
                    detailsJson: "",
                  });
                  await load();
                  setErr(null);
                } catch (e: unknown) {
                  setErr(e instanceof Error ? e.message : "Create failed");
                }
              }}
            >
              Create project
            </button>
          </div>

          {loading ? (
            <p className="mt-6 text-sm text-slate-600">Loading projects…</p>
          ) : (
            <ul className="mt-6 divide-y divide-slate-100">
              {projects.map((row) => (
                <li key={row.id} className="py-4">
                  {editProj?.id === row.id ? (
                    <ProjectEditor
                      row={row}
                      onCancel={() => setEditProj(null)}
                      onSaved={async () => {
                        setEditProj(null);
                        setToast("Project updated.");
                        await load();
                        setErr(null);
                      }}
                    />
                  ) : (
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{row.title}</p>
                        <p className="text-xs text-slate-500">
                          /portfolio/{row.slug} · order {row.sortOrder}
                          {row.featured ? " · featured" : ""}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-800"
                          onClick={() => setEditProj(row)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-red-200 px-3 py-1 text-xs font-semibold text-red-800"
                          onClick={async () => {
                            if (!confirm(`Delete “${row.title}”?`)) return;
                            try {
                              await deleteAdminSiteProject(row.id);
                              setToast("Project deleted.");
                              await load();
                              setErr(null);
                            } catch (e: unknown) {
                              setErr(e instanceof Error ? e.message : "Delete failed");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Testimonials */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Testimonials</h2>
          <p className="mt-1 text-sm text-slate-600">
            Homepage pulls <strong>featured</strong> quotes first. Tune sort order for display sequence.
          </p>

          <div className="mt-6 space-y-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Add testimonial</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs text-slate-600">
                Name
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newQuote.name}
                  onChange={(e) => setNewQuote((s) => ({ ...s, name: e.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-600">
                Company
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newQuote.company}
                  onChange={(e) => setNewQuote((s) => ({ ...s, company: e.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-600">
                Role
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newQuote.role}
                  onChange={(e) => setNewQuote((s) => ({ ...s, role: e.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-600">
                Sort order
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newQuote.sortOrder}
                  onChange={(e) => setNewQuote((s) => ({ ...s, sortOrder: e.target.value }))}
                />
              </label>
            </div>
            <label className="block text-xs text-slate-600">
              Quote
              <textarea
                className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                rows={3}
                value={newQuote.content}
                onChange={(e) => setNewQuote((s) => ({ ...s, content: e.target.value }))}
              />
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="text-xs text-slate-600">
                Rating (1–5)
                <input
                  className="mt-1 w-20 rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newQuote.rating}
                  onChange={(e) => setNewQuote((s) => ({ ...s, rating: e.target.value }))}
                />
              </label>
              <label className="text-xs text-slate-600">
                Initials (optional)
                <input
                  className="mt-1 w-20 rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                  value={newQuote.initials}
                  onChange={(e) => setNewQuote((s) => ({ ...s, initials: e.target.value }))}
                />
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={newQuote.featured}
                  onChange={(e) => setNewQuote((s) => ({ ...s, featured: e.target.checked }))}
                />
                Featured on homepage
              </label>
            </div>
            <button
              type="button"
              className="rounded-lg bg-ocean-600 px-4 py-2 text-sm font-semibold text-white hover:bg-ocean-700"
              onClick={async () => {
                try {
                  await createAdminSiteTestimonial({
                    name: newQuote.name.trim(),
                    company: newQuote.company.trim(),
                    role: newQuote.role.trim(),
                    content: newQuote.content.trim(),
                    rating: Number.parseInt(newQuote.rating, 10) || 5,
                    featured: newQuote.featured,
                    initials: newQuote.initials.trim() || null,
                    sortOrder: Number.parseInt(newQuote.sortOrder, 10) || 0,
                  });
                  setToast("Testimonial created.");
                  setNewQuote({
                    name: "",
                    company: "",
                    role: "",
                    content: "",
                    rating: "5",
                    featured: true,
                    initials: "",
                    sortOrder: "0",
                  });
                  await load();
                  setErr(null);
                } catch (e: unknown) {
                  setErr(e instanceof Error ? e.message : "Create failed");
                }
              }}
            >
              Create testimonial
            </button>
          </div>

          {!loading ? (
            <ul className="mt-6 divide-y divide-slate-100">
              {quotes.map((row) => (
                <li key={row.id} className="py-4">
                  {editQuote?.id === row.id ? (
                    <QuoteEditor
                      row={row}
                      onCancel={() => setEditQuote(null)}
                      onSaved={async () => {
                        setEditQuote(null);
                        setToast("Testimonial updated.");
                        await load();
                        setErr(null);
                      }}
                    />
                  ) : (
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{row.name}</p>
                        <p className="text-xs text-slate-500">
                          {row.role}, {row.company} · ★{row.rating}
                          {row.featured ? " · featured" : ""} · order {row.sortOrder}
                        </p>
                        <p className="mt-2 max-w-prose text-sm text-slate-600 line-clamp-3">{row.content}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-800"
                          onClick={() => setEditQuote(row)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-red-200 px-3 py-1 text-xs font-semibold text-red-800"
                          onClick={async () => {
                            if (!confirm(`Delete quote from ${row.name}?`)) return;
                            try {
                              await deleteAdminSiteTestimonial(row.id);
                              setToast("Testimonial deleted.");
                              await load();
                              setErr(null);
                            } catch (e: unknown) {
                              setErr(e instanceof Error ? e.message : "Delete failed");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        {/* Navigation */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Navigation menus</h2>
          <p className="mt-1 text-sm text-slate-600">
            Manage header/menu groups from the database-backed navigation config.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-end">
            <label className="text-xs text-slate-600">
              Admin API key
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 text-sm"
                type="password"
                placeholder="x-admin-key (required in production)"
                value={adminApiKey}
                onChange={(e) => {
                  const v = e.target.value;
                  setAdminApiKey(v);
                  if (typeof window !== "undefined") {
                    localStorage.setItem("oceancyber_admin_api_key", v);
                  }
                }}
              />
            </label>
            <button
              type="button"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800"
              onClick={async () => {
                setNavLoading(true);
                try {
                  const navRows = await getAdminNavigation(adminApiKey);
                  setMenus(navRows);
                  setToast("Navigation loaded.");
                  setErr(null);
                } catch (e: unknown) {
                  setErr(e instanceof Error ? e.message : "Load failed");
                } finally {
                  setNavLoading(false);
                }
              }}
            >
              {navLoading ? "Loading…" : "Reload navigation"}
            </button>
            <button
              type="button"
              disabled={navSaving || navLoading}
              className="rounded-lg bg-ocean-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              onClick={async () => {
                setNavSaving(true);
                try {
                  await putAdminNavigation(menus, adminApiKey);
                  setToast("Navigation saved.");
                  setErr(null);
                } catch (e: unknown) {
                  setErr(e instanceof Error ? e.message : "Save failed");
                } finally {
                  setNavSaving(false);
                }
              }}
            >
              {navSaving ? "Saving…" : "Save navigation"}
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap justify-end gap-2">
              <button
                type="button"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800"
                onClick={() => setMenus((prev) => [...prev, buildMenuPreset("startup-primary")])}
              >
                Add startup-primary preset
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800"
                onClick={() => setMenus((prev) => [...prev, buildMenuPreset("startup-pages")])}
              >
                Add startup-pages preset
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800"
                onClick={() => setMenus((prev) => [...prev, buildMenuPreset("main-header")])}
              >
                Add main-header preset
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800"
                onClick={() => setMenus((prev) => [...prev, buildMenuPreset("main-dropdown-services")])}
              >
                Add services dropdown preset
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800"
                onClick={() => setMenus((prev) => [...prev, buildMenuPreset("main-dropdown-industries")])}
              >
                Add industries dropdown preset
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800"
                onClick={() => setMenus((prev) => [...prev, buildMenuPreset("main-dropdown-infrastructure")])}
              >
                Add infrastructure dropdown preset
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800"
                onClick={() => setMenus((prev) => [...prev, buildMenuPreset("main-dropdown-resources")])}
              >
                Add resources dropdown preset
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800"
                onClick={() => setMenus((prev) => [...prev, buildMenuPreset("main-dropdown-company")])}
              >
                Add company dropdown preset
              </button>
              <button
                type="button"
                className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900"
                onClick={() => {
                  if (!confirm("Reset menu editor to default navigation config? Unsaved edits will be lost.")) return;
                  setMenus(buildDefaultNavigationMenus());
                  setToast("Editor reset to defaults. Save navigation to persist.");
                  setErr(null);
                }}
              >
                Reset to defaults
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800"
                onClick={() => setMenus((prev) => [...prev, createEmptyNavMenu()])}
              >
                Add menu
              </button>
            </div>
            {menus.map((menu, menuIndex) => (
              <div key={menu.key} className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                <div className="grid gap-3 sm:grid-cols-4">
                  <label className="text-xs text-slate-600">
                    Menu key
                    <input
                      className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                      value={menu.key}
                      onChange={(e) =>
                        setMenus((prev) =>
                          prev.map((m, i) => (i === menuIndex ? { ...m, key: e.target.value } : m)),
                        )
                      }
                    />
                  </label>
                  <label className="text-xs text-slate-600">
                    Label
                    <input
                      className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                      value={menu.label}
                      onChange={(e) =>
                        setMenus((prev) =>
                          prev.map((m, i) => (i === menuIndex ? { ...m, label: e.target.value } : m)),
                        )
                      }
                    />
                  </label>
                  <label className="text-xs text-slate-600">
                    Description
                    <input
                      className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                      value={menu.description ?? ""}
                      onChange={(e) =>
                        setMenus((prev) =>
                          prev.map((m, i) =>
                            i === menuIndex ? { ...m, description: e.target.value || null } : m,
                          ),
                        )
                      }
                    />
                  </label>
                  <label className="flex items-center gap-2 self-end text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={menu.isActive}
                      onChange={(e) =>
                        setMenus((prev) =>
                          prev.map((m, i) => (i === menuIndex ? { ...m, isActive: e.target.checked } : m)),
                        )
                      }
                    />
                    Active
                  </label>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 disabled:opacity-50"
                    disabled={menuIndex === 0}
                    onClick={() =>
                      setMenus((prev) => {
                        if (menuIndex === 0) return prev;
                        const next = [...prev];
                        [next[menuIndex - 1], next[menuIndex]] = [next[menuIndex], next[menuIndex - 1]];
                        return next;
                      })
                    }
                  >
                    Move up
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 disabled:opacity-50"
                    disabled={menuIndex === menus.length - 1}
                    onClick={() =>
                      setMenus((prev) => {
                        if (menuIndex >= prev.length - 1) return prev;
                        const next = [...prev];
                        [next[menuIndex + 1], next[menuIndex]] = [next[menuIndex], next[menuIndex + 1]];
                        return next;
                      })
                    }
                  >
                    Move down
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-red-200 bg-white px-2.5 py-1 text-xs font-semibold text-red-700"
                    onClick={() =>
                      setMenus((prev) => prev.filter((_, i) => i !== menuIndex))
                    }
                  >
                    Delete menu
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700"
                    onClick={() =>
                      setMenus((prev) =>
                        prev.map((m, i) =>
                          i === menuIndex
                            ? {
                                ...m,
                                items: [
                                  ...m.items,
                                  createEmptyNavItem(
                                    m.items.length > 0
                                      ? (m.items[m.items.length - 1]?.sortOrder ?? 0) + 10
                                      : 0,
                                  ),
                                ],
                              }
                            : m,
                        ),
                      )
                    }
                  >
                    Add item
                  </button>
                </div>
                <div className="mt-3 space-y-2">
                  {menu.items.map((item, itemIndex) => (
                    <div key={`${menu.key}-${itemIndex}`} className="grid gap-2 sm:grid-cols-4">
                      <input
                        className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs"
                        placeholder="Heading"
                        value={item.heading}
                        onChange={(e) =>
                          setMenus((prev) =>
                            prev.map((m, i) =>
                              i === menuIndex
                                ? {
                                    ...m,
                                    items: m.items.map((it, j) =>
                                      j === itemIndex ? { ...it, heading: e.target.value } : it,
                                    ),
                                  }
                                : m,
                            ),
                          )
                        }
                      />
                      <input
                        className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs"
                        placeholder="Href"
                        value={item.href}
                        onChange={(e) =>
                          setMenus((prev) =>
                            prev.map((m, i) =>
                              i === menuIndex
                                ? {
                                    ...m,
                                    items: m.items.map((it, j) =>
                                      j === itemIndex ? { ...it, href: e.target.value } : it,
                                    ),
                                  }
                                : m,
                            ),
                          )
                        }
                      />
                      <input
                        className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs"
                        placeholder="Description"
                        value={item.description ?? ""}
                        onChange={(e) =>
                          setMenus((prev) =>
                            prev.map((m, i) =>
                              i === menuIndex
                                ? {
                                    ...m,
                                    items: m.items.map((it, j) =>
                                      j === itemIndex
                                        ? { ...it, description: e.target.value || null }
                                        : it,
                                    ),
                                  }
                                : m,
                            ),
                          )
                        }
                      />
                      <input
                        className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs"
                        placeholder="Sort order"
                        value={String(item.sortOrder)}
                        onChange={(e) =>
                          setMenus((prev) =>
                            prev.map((m, i) =>
                              i === menuIndex
                                ? {
                                    ...m,
                                    items: m.items.map((it, j) =>
                                      j === itemIndex
                                        ? { ...it, sortOrder: Number.parseInt(e.target.value, 10) || 0 }
                                        : it,
                                    ),
                                  }
                                : m,
                            ),
                          )
                        }
                      />
                      <textarea
                        className="rounded-lg border border-slate-200 px-2 py-1.5 font-mono text-[11px]"
                        rows={3}
                        placeholder='{"dropdownKey":"services","activeMatch":["/services"]}'
                        value={item.metadataInput}
                        onChange={(e) =>
                          setMenus((prev) =>
                            prev.map((m, i) =>
                              i === menuIndex
                                ? {
                                    ...m,
                                    items: m.items.map((it, j) =>
                                      j === itemIndex ? { ...it, metadataInput: e.target.value } : it,
                                    ),
                                  }
                                : m,
                            ),
                          )
                        }
                      />
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1 text-xs text-slate-700">
                          <input
                            type="checkbox"
                            checked={item.isActive}
                            onChange={(e) =>
                              setMenus((prev) =>
                                prev.map((m, i) =>
                                  i === menuIndex
                                    ? {
                                        ...m,
                                        items: m.items.map((it, j) =>
                                          j === itemIndex ? { ...it, isActive: e.target.checked } : it,
                                        ),
                                      }
                                    : m,
                                ),
                              )
                            }
                          />
                          Active
                        </label>
                        <button
                          type="button"
                          className="rounded border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 disabled:opacity-50"
                          disabled={itemIndex === 0}
                          onClick={() =>
                            setMenus((prev) =>
                              prev.map((m, i) => {
                                if (i !== menuIndex || itemIndex === 0) return m;
                                const items = [...m.items];
                                [items[itemIndex - 1], items[itemIndex]] = [items[itemIndex], items[itemIndex - 1]];
                                return {
                                  ...m,
                                  items: items.map((it, idx) => ({ ...it, sortOrder: idx * 10 })),
                                };
                              }),
                            )
                          }
                        >
                          Up
                        </button>
                        <button
                          type="button"
                          className="rounded border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 disabled:opacity-50"
                          disabled={itemIndex === menu.items.length - 1}
                          onClick={() =>
                            setMenus((prev) =>
                              prev.map((m, i) => {
                                if (i !== menuIndex || itemIndex >= m.items.length - 1) return m;
                                const items = [...m.items];
                                [items[itemIndex + 1], items[itemIndex]] = [items[itemIndex], items[itemIndex + 1]];
                                return {
                                  ...m,
                                  items: items.map((it, idx) => ({ ...it, sortOrder: idx * 10 })),
                                };
                              }),
                            )
                          }
                        >
                          Down
                        </button>
                        <button
                          type="button"
                          className="rounded border border-red-200 bg-white px-2 py-1 text-[11px] font-semibold text-red-700"
                          onClick={() =>
                            setMenus((prev) =>
                              prev.map((m, i) =>
                                i === menuIndex
                                  ? {
                                      ...m,
                                      items: m.items
                                        .filter((_, j) => j !== itemIndex)
                                        .map((it, idx) => ({ ...it, sortOrder: idx * 10 })),
                                    }
                                  : m,
                              ),
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function ProjectEditor({
  row,
  onCancel,
  onSaved,
}: {
  row: AdminSiteProjectRow;
  onCancel: () => void;
  onSaved: () => Promise<void>;
}) {
  const [title, setTitle] = useState(row.title);
  const [slug, setSlug] = useState(row.slug);
  const [category, setCategory] = useState(row.category);
  const [description, setDescription] = useState(row.description);
  const [tech, setTech] = useState(techJoin(row.techStack));
  const [imageUrl, setImageUrl] = useState(row.imageUrl ?? "");
  const [featured, setFeatured] = useState(row.featured);
  const [sortOrder, setSortOrder] = useState(String(row.sortOrder));
  const [detailsJson, setDetailsJson] = useState(
    row.details && typeof row.details === "object" ? JSON.stringify(row.details, null, 2) : "",
  );
  const [saving, setSaving] = useState(false);

  return (
    <div className="rounded-xl border border-ocean-200 bg-ocean-50/40 p-4 space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs text-slate-600">
          Title
          <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label className="text-xs text-slate-600">
          Slug
          <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </label>
        <label className="text-xs text-slate-600">
          Category
          <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label className="text-xs text-slate-600">
          Sort order
          <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
        </label>
      </div>
      <label className="block text-xs text-slate-600">
        Description
        <textarea className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label className="block text-xs text-slate-600">
        Tech (comma-separated)
        <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={tech} onChange={(e) => setTech(e.target.value)} />
      </label>
      <label className="block text-xs text-slate-600">
        Image URL
        <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </label>
      <label className="block text-xs text-slate-600">
        Details JSON
        <textarea className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 font-mono text-xs" rows={5} value={detailsJson} onChange={(e) => setDetailsJson(e.target.value)} />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
        Featured
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={saving}
          className="rounded-lg bg-ocean-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          onClick={async () => {
            let details: Record<string, unknown> | undefined;
            if (detailsJson.trim()) {
              try {
                details = JSON.parse(detailsJson) as Record<string, unknown>;
              } catch {
                window.alert("Invalid JSON in details");
                return;
              }
            }
            setSaving(true);
            try {
              await patchAdminSiteProject(row.id, {
                title: title.trim(),
                slug: slug.trim(),
                category: category.trim(),
                description: description.trim(),
                techStack: techSplit(tech),
                imageUrl: imageUrl.trim() || null,
                featured,
                sortOrder: Number.parseInt(sortOrder, 10) || 0,
                details,
              });
              await onSaved();
            } finally {
              setSaving(false);
            }
          }}
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button type="button" className="rounded-lg border border-slate-300 px-4 py-2 text-sm" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function QuoteEditor({
  row,
  onCancel,
  onSaved,
}: {
  row: AdminSiteTestimonialRow;
  onCancel: () => void;
  onSaved: () => Promise<void>;
}) {
  const [name, setName] = useState(row.name);
  const [company, setCompany] = useState(row.company);
  const [role, setRole] = useState(row.role);
  const [content, setContent] = useState(row.content);
  const [rating, setRating] = useState(String(row.rating));
  const [featured, setFeatured] = useState(row.featured);
  const [initials, setInitials] = useState(row.initials ?? "");
  const [sortOrder, setSortOrder] = useState(String(row.sortOrder));
  const [saving, setSaving] = useState(false);

  return (
    <div className="rounded-xl border border-ocean-200 bg-ocean-50/40 p-4 space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs text-slate-600">
          Name
          <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="text-xs text-slate-600">
          Company
          <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={company} onChange={(e) => setCompany(e.target.value)} />
        </label>
        <label className="text-xs text-slate-600">
          Role
          <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={role} onChange={(e) => setRole(e.target.value)} />
        </label>
        <label className="text-xs text-slate-600">
          Sort order
          <input className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
        </label>
      </div>
      <label className="block text-xs text-slate-600">
        Quote
        <textarea className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <div className="flex flex-wrap gap-4">
        <label className="text-xs text-slate-600">
          Rating
          <input className="mt-1 w-16 rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={rating} onChange={(e) => setRating(e.target.value)} />
        </label>
        <label className="text-xs text-slate-600">
          Initials
          <input className="mt-1 w-16 rounded-lg border border-slate-200 px-2 py-1.5 text-sm" value={initials} onChange={(e) => setInitials(e.target.value)} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          Featured
        </label>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={saving}
          className="rounded-lg bg-ocean-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          onClick={async () => {
            setSaving(true);
            try {
              await patchAdminSiteTestimonial(row.id, {
                name: name.trim(),
                company: company.trim(),
                role: role.trim(),
                content: content.trim(),
                rating: Number.parseInt(rating, 10) || 5,
                featured,
                initials: initials.trim() || null,
                sortOrder: Number.parseInt(sortOrder, 10) || 0,
              });
              await onSaved();
            } finally {
              setSaving(false);
            }
          }}
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button type="button" className="rounded-lg border border-slate-300 px-4 py-2 text-sm" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
