/** Maps `/api/v1/…` Nest paths to the same-origin BFF `/api/nest/v1/…`. */
export function nestBrowserProxyPath(path: string): string {
  if (!path.startsWith("/api/v1/")) {
    return path;
  }
  return `/api/nest${path.slice(4)}`;
}
