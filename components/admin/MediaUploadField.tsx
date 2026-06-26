"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { uploadAdminMedia } from "@/lib/admin/upload-media-client";

export function MediaUploadField({
  label,
  value,
  onChange,
  folder = "uploads",
  clientKey,
  accept = "image/png,image/jpeg,image/webp,image/svg+xml",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  clientKey?: string;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const { url } = await uploadAdminMedia(file, { folder, clientKey });
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-sa-muted/80">{label}</span>
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-1 rounded-lg border border-sa-border px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-sa-primary hover:border-sa-primary disabled:opacity-50"
        >
          <Upload className="h-3 w-3" aria-hidden />
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => void onFile(e.target.files?.[0] ?? null)}
      />
      <input
        className="w-full rounded border border-sa-border bg-sa-surface px-2 py-1 text-xs text-white"
        placeholder="/images/uploads/..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value ? (
        <div className="relative h-20 w-full overflow-hidden rounded-lg border border-sa-border bg-black/40">
          <Image src={value} alt="" fill className="object-contain p-2" sizes="200px" />
        </div>
      ) : null}
      {error ? <p className="text-[10px] text-red-400">{error}</p> : null}
    </div>
  );
}
