export const DEFAULT_SHOWREEL_PATH = "/videos/oceancyber-showreel.mp4";

/** Env override, else bundled public path for auto-detect. */
export function getShowreelVideoSrc(): string {
  return process.env.NEXT_PUBLIC_SHOWREEL_URL?.trim() || DEFAULT_SHOWREEL_PATH;
}
