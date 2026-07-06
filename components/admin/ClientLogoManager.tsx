"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MediaUploadField } from "@/components/admin/MediaUploadField";
import { CLIENT_LOGO_KEYS } from "@/lib/startup-agency/client-logos-runtime";

export function ClientLogoManager() {
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/data/client-logos.json", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as Record<string, string>;
        setOverrides(data);
      } catch {
        /* use defaults */
      }
    })();
  }, []);

  return (
    <section className="rounded-2xl border border-sa-border bg-sa-surface p-6">
      <h2 className="text-lg font-bold text-white">Client logos</h2>
      <p className="mt-1 text-sm text-sa-muted/80">
        Upload PNG, WebP, or SVG replacements. Overrides save to{" "}
        <code className="rounded bg-sa-bg px-1">public/data/client-logos.json</code> and
        publish on the homepage immediately after upload.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {CLIENT_LOGO_KEYS.map(({ name, key }) => (
          <div key={key} className="rounded-xl border border-sa-border bg-sa-bg/50 p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white">{name}</p>
            <MediaUploadField
              label="Logo asset"
              folder="clients"
              clientKey={key}
              value={overrides[key] ?? ""}
              onChange={(url) => setOverrides((prev) => ({ ...prev, [key]: url }))}
            />
            {overrides[key] ? (
              <div className="relative mt-2 h-10 w-full">
                <Image
                  src={overrides[key]}
                  alt={name}
                  fill
                  className="object-contain object-left brightness-0 invert opacity-80"
                  sizes="160px"
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
