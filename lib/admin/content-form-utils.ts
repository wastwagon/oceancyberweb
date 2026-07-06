export function techJoin(tech: string[]): string {
  return tech.join(", ");
}

export function techSplit(s: string): string[] {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}
