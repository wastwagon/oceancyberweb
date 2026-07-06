const APP_ROUTE_PREFIXES = ["/dashboard", "/admin"] as const;

/** True for signed-in app surfaces that use the workspace shell (not marketing chrome). */
export function isAppRoute(pathname: string): boolean {
  return APP_ROUTE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
