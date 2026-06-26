"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="OceanCyber showreel"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-sa-border bg-sa-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition hover:border-sa-primary hover:text-sa-primary"
          aria-label="Close showreel"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative aspect-video w-full bg-black">
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
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority={i === 0}
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              <p className="absolute bottom-6 left-6 right-6 font-heading text-sm font-bold uppercase tracking-widest text-white md:text-base">
                {slide.caption}
              </p>
            </>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-sa-border px-6 py-4">
          <p className="text-sm text-sa-muted">
            {videoReady
              ? "OceanCyber delivery showreel"
              : "Selected work highlight — add public/videos/oceancyber-showreel.mp4 or set NEXT_PUBLIC_SHOWREEL_URL"}
          </p>
          <Link href="/portfolio" className="sa-btn-primary text-xs" onClick={onClose}>
            View full portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
