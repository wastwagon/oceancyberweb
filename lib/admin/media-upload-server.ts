import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const CLIENT_LOGOS_JSON = path.join(PUBLIC_DIR, "data", "client-logos.json");

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
]);

const MIME_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

const MAX_BYTES = 5 * 1024 * 1024;

const SAFE_FOLDER = /^[a-z0-9-]+$/;
const SAFE_CLIENT_KEY = /^[a-z0-9-]+$/;

export function sanitizeUploadFolder(folder: string): string {
  const f = folder.trim().toLowerCase();
  if (!SAFE_FOLDER.test(f)) {
    throw new Error("Invalid upload folder");
  }
  return f;
}

export function sanitizeClientKey(key: string): string {
  const k = key.trim().toLowerCase();
  if (!SAFE_CLIENT_KEY.test(k)) {
    throw new Error("Invalid client key");
  }
  return k;
}

export function validateUploadFile(file: File): void {
  if (!file || file.size === 0) {
    throw new Error("No file provided");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("File exceeds 5MB limit");
  }
  if (!ALLOWED_MIME.has(file.type)) {
    throw new Error("Unsupported file type");
  }
}

export async function savePublicImage(
  file: File,
  folder: string,
): Promise<string> {
  validateUploadFile(file);
  const safeFolder = sanitizeUploadFolder(folder);
  const ext = MIME_EXT[file.type] ?? "bin";
  const base = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  const filename = `${Date.now()}-${base || "asset"}.${ext}`;
  const dir = path.join(PUBLIC_DIR, "images", safeFolder);
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);
  return `/images/${safeFolder}/${filename}`;
}

export async function readClientLogoOverrides(): Promise<Record<string, string>> {
  try {
    const raw = await readFile(CLIENT_LOGOS_JSON, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== "object" || parsed === null) return {};
    return parsed as Record<string, string>;
  } catch {
    return {};
  }
}

export async function setClientLogoOverride(
  clientKey: string,
  publicUrl: string,
): Promise<void> {
  const key = sanitizeClientKey(clientKey);
  const overrides = await readClientLogoOverrides();
  overrides[key] = publicUrl;
  await mkdir(path.dirname(CLIENT_LOGOS_JSON), { recursive: true });
  await writeFile(CLIENT_LOGOS_JSON, `${JSON.stringify(overrides, null, 2)}\n`, "utf8");
}
