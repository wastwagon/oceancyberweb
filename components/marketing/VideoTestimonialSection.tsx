"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Quote } from "lucide-react";
import { useState } from "react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { featuredVideoTestimonial } from "@/lib/marketing/premium-trust";

function getYoutubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com") && parsed.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
    }
    if (parsed.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${parsed.pathname}`;
    }
    if (parsed.pathname.includes("/embed/")) {
      return url;
    }
  } catch {
    return null;
  }
  return null;
}

type VideoTestimonialSectionProps = {
  variant?: "home" | "about";
};

export function VideoTestimonialSection({ variant = "home" }: VideoTestimonialSectionProps) {
  const t = featuredVideoTestimonial;
  const [playing, setPlaying] = useState(false);
  const embedUrl = t.videoUrl ? getYoutubeEmbedUrl(t.videoUrl) : null;
  const isCompact = variant === "home";

  return (
    <section
      className={`border-b border-sa-border ${isCompact ? "bg-sa-bg py-12 md:py-16" : "bg-sa-surface/20 py-14 md:py-20"}`}
      aria-labelledby="video-testimonial-heading"
    >
      <div className="sa-container">
        <SaReveal className="mx-auto mb-10 max-w-2xl text-center">
          <p className="sa-eyebrow">Client voice</p>
          <h2
            id="video-testimonial-heading"
            className="sa-title mt-3"
          >
            Trusted by teams who cannot afford to get it wrong
          </h2>
          {!isCompact ? (
            <p className="sa-subtitle mx-auto mt-3">
              Regulated sectors choose partners who understand brand, security, and delivery — not just launch dates.
            </p>
          ) : null}
        </SaReveal>

        <SaReveal delay={0.08}>
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-sa-border bg-black shadow-xl">
              {playing && embedUrl ? (
                <iframe
                  src={`${embedUrl}?autoplay=1`}
                  title={`${t.client} testimonial`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  {t.posterImage ? (
                    <Image
                      src={t.posterImage}
                      alt={`${t.client} platform preview`}
                      fill
                      className="object-cover opacity-80"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-sa-bg via-sa-bg/40 to-transparent" />
                  {embedUrl ? (
                    <button
                      type="button"
                      onClick={() => setPlaying(true)}
                      className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-sa-primary text-sa-bg shadow-lg transition hover:scale-105"
                      aria-label={`Play ${t.client} testimonial video`}
                    >
                      <Play className="ml-1 h-7 w-7 fill-current" aria-hidden />
                    </button>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                      <p className="text-sm text-sa-muted/80">
                        Video testimonial — add{" "}
                        <code className="text-sa-primary">NEXT_PUBLIC_TESTIMONIAL_VIDEO_URL</code> to enable playback.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="sa-card p-8 md:p-10">
              <Quote className="h-8 w-8 text-sa-primary/60" aria-hidden />
              <blockquote className="mt-4 text-lg leading-relaxed text-white md:text-xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer className="mt-6 border-t border-sa-border pt-5">
                <p className="font-heading font-bold text-white">{t.author}</p>
                <p className="text-sm text-sa-muted/75">
                  {t.client} · {t.role}
                </p>
              </footer>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/portfolio/fitch-advisory" className="sa-btn-outline !min-h-[40px] text-[10px]">
                  Read case study
                </Link>
                <Link href="/reviews" className="text-sm font-semibold text-sa-primary underline-offset-2 hover:underline">
                  Google reviews →
                </Link>
              </div>
            </div>
          </div>
        </SaReveal>
      </div>
    </section>
  );
}
