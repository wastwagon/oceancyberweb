"use client";

import {
  getAdminNavigation,
  putAdminNavigation,
} from "@/lib/auth-client";
import {
  type AdminNavMenu,
  buildDefaultNavigationMenus,
  buildMenuPreset,
  createEmptyNavItem,
  createEmptyNavMenu,
} from "@/lib/admin/navigation-editor";

type NavigationMenusSectionProps = {
  menus: AdminNavMenu[];
  setMenus: React.Dispatch<React.SetStateAction<AdminNavMenu[]>>;
  navLoading: boolean;
  navSaving: boolean;
  setNavLoading: (value: boolean) => void;
  setNavSaving: (value: boolean) => void;
  onToast: (message: string) => void;
  onError: (message: string | null) => void;
  onReload: () => Promise<void>;
};

export function NavigationMenusSection({
  menus,
  setMenus,
  navLoading,
  navSaving,
  setNavLoading,
  setNavSaving,
  onToast,
  onError,
  onReload,
}: NavigationMenusSectionProps) {
  return (
        <section className="rounded-2xl border border-sa-border bg-sa-surface p-6 ">
          <h2 className="text-lg font-bold text-white">Navigation menus</h2>
          <p className="mt-1 text-sm text-sa-muted/80">
            Manage header/menu groups from the database-backed navigation config.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-lg border border-sa-border bg-sa-surface px-4 py-2 text-sm font-semibold text-white"
              onClick={async () => {
                setNavLoading(true);
                try {
                  const navRows = await getAdminNavigation();
                  const formattedMenus = (navRows.menus || []).map((menu: any) => ({
                    ...menu,
                    items: (menu.items || []).map((item: any) => ({
                      ...item,
                      metadataInput: JSON.stringify(item.metadata ?? {}, null, 2),
                    })),
                  }));
                  setMenus(formattedMenus);
                  onToast("Navigation loaded.");
                  onError(null);
                } catch (e: unknown) {
                  onError(e instanceof Error ? e.message : "Load failed");
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
              className="rounded-lg bg-sa-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              onClick={async () => {
                setNavSaving(true);
                try {
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
                  await putAdminNavigation(payloadMenus);
                  onToast("Navigation saved.");
                  await onReload();
                  onError(null);
                } catch (e: unknown) {
                  onError(e instanceof Error ? e.message : "Save failed");
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
                className="rounded-lg border border-sa-border bg-sa-surface px-3 py-2 text-xs font-semibold text-white"
                onClick={() => setMenus((prev) => [...prev, buildMenuPreset("startup-primary")])}
              >
                Add startup-primary preset
              </button>
              <button
                type="button"
                className="rounded-lg border border-sa-border bg-sa-surface px-3 py-2 text-xs font-semibold text-white"
                onClick={() => setMenus((prev) => [...prev, buildMenuPreset("startup-pages")])}
              >
                Add startup-pages preset
              </button>
              <button
                type="button"
                className="rounded-lg border border-sa-border bg-sa-surface px-3 py-2 text-xs font-semibold text-white"
                onClick={() => setMenus((prev) => [...prev, buildMenuPreset("main-header")])}
              >
                Add main-header preset
              </button>
              <button
                type="button"
                className="rounded-lg border border-sa-border bg-sa-surface px-3 py-2 text-xs font-semibold text-white"
                onClick={() => setMenus((prev) => [...prev, buildMenuPreset("main-dropdown-services")])}
              >
                Add services dropdown preset
              </button>
              <button
                type="button"
                className="rounded-lg border border-sa-border bg-sa-surface px-3 py-2 text-xs font-semibold text-white"
                onClick={() => setMenus((prev) => [...prev, buildMenuPreset("main-dropdown-industries")])}
              >
                Add industries dropdown preset
              </button>
              <button
                type="button"
                className="rounded-lg border border-sa-border bg-sa-surface px-3 py-2 text-xs font-semibold text-white"
                onClick={() => setMenus((prev) => [...prev, buildMenuPreset("main-dropdown-infrastructure")])}
              >
                Add infrastructure dropdown preset
              </button>
              <button
                type="button"
                className="rounded-lg border border-sa-border bg-sa-surface px-3 py-2 text-xs font-semibold text-white"
                onClick={() => setMenus((prev) => [...prev, buildMenuPreset("main-dropdown-resources")])}
              >
                Add resources dropdown preset
              </button>
              <button
                type="button"
                className="rounded-lg border border-sa-border bg-sa-surface px-3 py-2 text-xs font-semibold text-white"
                onClick={() => setMenus((prev) => [...prev, buildMenuPreset("main-dropdown-support")])}
              >
                Add support dropdown preset
              </button>
              <button
                type="button"
                className="rounded-lg border border-sa-border bg-sa-surface px-3 py-2 text-xs font-semibold text-white"
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
                  onToast("Editor reset to defaults. Save navigation to persist.");
                  onError(null);
                }}
              >
                Reset to defaults
              </button>
              <button
                type="button"
                className="rounded-lg border border-sa-border bg-sa-surface px-4 py-2 text-sm font-semibold text-white"
                onClick={() => setMenus((prev) => [...prev, createEmptyNavMenu()])}
              >
                Add menu
              </button>
            </div>
            {menus.map((menu, menuIndex) => (
              <div key={menu.key} className="rounded-xl border border-sa-border bg-sa-bg/80 p-4">
                <div className="grid gap-3 sm:grid-cols-4">
                  <label className="text-xs text-sa-muted/80">
                    Menu key
                    <input
                      className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
                      value={menu.key}
                      onChange={(e) =>
                        setMenus((prev) =>
                          prev.map((m, i) => (i === menuIndex ? { ...m, key: e.target.value } : m)),
                        )
                      }
                    />
                  </label>
                  <label className="text-xs text-sa-muted/80">
                    Label
                    <input
                      className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
                      value={menu.label}
                      onChange={(e) =>
                        setMenus((prev) =>
                          prev.map((m, i) => (i === menuIndex ? { ...m, label: e.target.value } : m)),
                        )
                      }
                    />
                  </label>
                  <label className="text-xs text-sa-muted/80">
                    Description
                    <input
                      className="mt-1 w-full rounded-lg border border-sa-border px-2 py-1.5 text-sm"
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
                  <label className="flex items-center gap-2 self-end text-xs text-sa-muted">
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
                    className="rounded-md border border-sa-border bg-sa-surface px-2.5 py-1 text-xs font-semibold text-sa-muted disabled:opacity-50"
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
                    className="rounded-md border border-sa-border bg-sa-surface px-2.5 py-1 text-xs font-semibold text-sa-muted disabled:opacity-50"
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
                    className="rounded-md border border-red-200 bg-sa-surface px-2.5 py-1 text-xs font-semibold text-red-700"
                    onClick={() =>
                      setMenus((prev) => prev.filter((_, i) => i !== menuIndex))
                    }
                  >
                    Delete menu
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-sa-border bg-sa-surface px-2.5 py-1 text-xs font-semibold text-sa-muted"
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
                        className="rounded-lg border border-sa-border px-2 py-1.5 text-xs"
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
                        className="rounded-lg border border-sa-border px-2 py-1.5 text-xs"
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
                        className="rounded-lg border border-sa-border px-2 py-1.5 text-xs"
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
                        className="rounded-lg border border-sa-border px-2 py-1.5 text-xs"
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
                        className="rounded-lg border border-sa-border px-2 py-1.5 font-mono text-[11px]"
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
                        <label className="flex items-center gap-1 text-xs text-sa-muted">
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
                          className="rounded border border-sa-border bg-sa-surface px-2 py-1 text-[11px] font-semibold text-sa-muted disabled:opacity-50"
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
                          className="rounded border border-sa-border bg-sa-surface px-2 py-1 text-[11px] font-semibold text-sa-muted disabled:opacity-50"
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
                          className="rounded border border-red-200 bg-sa-surface px-2 py-1 text-[11px] font-semibold text-red-700"
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
  );
}
