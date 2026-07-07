"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { showreelSlides } from "@/lib/startup-agency/content";
import { getShowreelVideoSrc } from "@/lib/startup-agency/showreel";

type SaShowreelModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SaShowreelModal({ open, onClose }: SaShowreelModalProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = getShowreelVideoSrc();

  const useVideo = !videoFailed;
  const showSlideshow = !useVideo || !videoReady;

  const advanceSlide = useCallback(() => {
    setSlideIndex((i) => (i + 1) % showreelSlides.length);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !showSlideshow) return;
    const id = window.setInterval(advanceSlide, 3200);
    return () => window.clearInterval(id);
  }, [open, showSlideshow, advanceSlide]);

  useEffect(() => {
    if (!open) {
      setSlideIndex(0);
      setVideoFailed(false);
      setVideoReady(false);
    }
  }, [open]);

  if (!open) return null;

  const slide = showreelSlides[slideIndex];

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm md:bg-black/90"
            aria-label="Close showreel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-x-0 bottom-0 z-[210] flex max-h-[100dvh] flex-col overflow-hidden border-t border-white/10 bg-[#1c1c1e] shadow-2xl md:inset-4 md:bottom-auto md:left-1/2 md:top-1/2 md:max-h-[min(90vh,720px)] md:w-full md:max-w-5xl md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:border"
            role="dialog"
            aria-modal="true"
            aria-label="OceanCyber showreel"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 34, stiffness: 380 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 justify-center pt-2.5 md:hidden">
              <div className="h-1 w-10 rounded-full bg-white/25" aria-hidden />
            </div>

            <button
              type="button"
              onClick={onClose}
              className="sa-pressable absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white md:right-4 md:top-4"
              aria-label="Close showreel"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative min-h-0 flex-1 bg-black">
              <div className="relative aspect-video w-full min-h-[220px] md:aspect-video">
                {useVideo ? (
                  <video
                    ref={videoRef}
                    className={`h-full w-full object-cover transition-opacity duration-500 ${
                      videoReady ? "opacity-100" : "opacity-0"
                    }`}
                    autoPlay
                    muted
                    playsInline
                    controls
                    onLoadedData={() => setVideoReady(true)}
                    onError={() => setVideoFailed(true)}
                  >
                    <source src={videoSrc} type="video/mp4" />
                  </video>
                ) : null}

                {showSlideshow ? (
                  <>
                    {showreelSlides.map((s, i) => (
                      <div
                        key={s.src}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                          i === slideIndex ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Image
                          src={s.src}
                          alt={s.caption}
                          fill
                          className="object-cover"
                          sizes="100vw"
                          priority={i === 0}
                        />
                      </div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                    <p className="absolute bottom-6 left-6 right-6 text-sm font-medium text-white md:font-heading md:text-base md:font-bold md:uppercase md:tracking-widest">
                      {slide.caption}
                    </p>
                  </>
                ) : null}
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-4 border-t border-sa-border px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between md:px-6">
              <p className="text-sm text-sa-muted">
                {videoReady
                  ? "OceanCyber delivery showreel"
                  : "Selected work highlight — add public/videos/oceancyber-showreel.mp4 or set NEXT_PUBLIC_SHOWREEL_URL"}
              </p>
              <Link
                href="/portfolio"
                className="sa-btn-primary w-full text-center sm:w-auto"
                onClick={onClose}
              >
                View live client work
              </Link>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
