"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { aboutWorkPreview } from "@/lib/startup-agency/content";

type WorkPreviewItem = (typeof aboutWorkPreview)[number];

export function SaTeamCollage() {
  const [activeItem, setActiveItem] = useState<WorkPreviewItem | null>(null);

  const closeLightbox = useCallback(() => setActiveItem(null), []);

  useEffect(() => {
    if (!activeItem) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItem, closeLightbox]);

  return (
    <>
      <div className="relative lg:min-h-[480px]">
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {aboutWorkPreview.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActiveItem(item)}
              aria-label={`View ${item.title}`}
              className={`group relative overflow-hidden rounded-3xl border border-sa-border bg-sa-surface text-left transition hover:border-sa-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sa-primary ${
                index === 0 ? "col-span-2 aspect-[21/9]" : "aspect-square"
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sa-bg/90 via-sa-bg/20 to-transparent opacity-80 transition group-hover:opacity-100" />
              <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white opacity-100 backdrop-blur-sm transition md:opacity-0 md:group-hover:opacity-100">
                <ZoomIn className="h-4 w-4" aria-hidden />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <p className="font-heading text-sm font-bold text-white md:text-base">{item.title}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-sa-primary md:text-xs">
                  {item.category}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={closeLightbox}
              aria-label="Close image preview"
            />

            <motion.button
              type="button"
              onClick={closeLightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.05 }}
              className="absolute right-4 top-4 z-[102] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-sa-surface/90 text-white transition hover:border-sa-primary hover:text-sa-primary md:right-8 md:top-8"
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden />
            </motion.button>

            <motion.figure
              className="relative z-[101] w-full max-w-6xl overflow-hidden rounded-3xl border border-sa-border bg-sa-surface shadow-2xl shadow-black/50"
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              <div className="relative aspect-[16/10] w-full md:aspect-[16/9]">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  className="object-contain bg-black"
                  sizes="(max-width: 1280px) 100vw, 1152px"
                  priority
                />
              </div>
              <figcaption className="flex flex-col gap-4 border-t border-sa-border px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6 md:py-5">
                <div>
                  <p className="font-heading text-base font-bold text-white md:text-lg">{activeItem.title}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-sa-primary">
                    {activeItem.category}
                  </p>
                </div>
                <Link
                  href={activeItem.href}
                  className="inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:text-sa-primary"
                >
                  View case study
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
