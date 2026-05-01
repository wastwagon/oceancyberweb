"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Code, Smartphone, Shield, ShoppingCart, TrendingUp, Cloud } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { serviceCards } from "@/lib/startup-agency/content";

function getServiceIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("web")) return Code;
  if (t.includes("mobile")) return Smartphone;
  if (t.includes("cyber")) return Shield;
  if (t.includes("commerce")) return ShoppingCart;
  if (t.includes("seo") || t.includes("growth")) return TrendingUp;
  if (t.includes("cloud") || t.includes("hosting")) return Cloud;
  return Code; // fallback
}

export function SaServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      id="services" 
      className="relative border-b border-sa-border bg-sa-bg py-24 md:py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="sa-container">
        
        {/* Header Section */}
        <div className="mb-16 flex flex-col items-center">
          <div className="flex items-center w-full max-w-4xl mb-8">
            <div className="h-px bg-white/20 flex-1"></div>
            <div className="mx-6 rounded-full border border-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
              Services
            </div>
            <div className="h-px bg-white/20 flex-1"></div>
          </div>
          <h2 className="font-heading text-4xl font-bold uppercase tracking-widest text-white md:text-5xl lg:text-6xl text-center">
            View Our Services
          </h2>
        </div>

        {/* Services List */}
        <div className="border-t border-white/20">
          {serviceCards.map((s, i) => {
            const Icon = getServiceIcon(s.title);
            const isHovered = hoveredIndex === i;

            return (
              <SaReveal key={s.title} delay={i * 0.1}>
                <Link
                  href={s.href}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/20 py-8 md:py-10 transition-colors duration-300 hover:bg-white/5 px-4 -mx-4 md:px-8 md:-mx-8"
                >
                  {/* Left: Icon & Title */}
                  <div className="flex items-center gap-6 md:w-1/3 mb-4 md:mb-0">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sa-primary text-black transition-colors duration-300 group-hover:bg-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
                      {s.title}
                    </h3>
                  </div>

                  {/* Middle: Description */}
                  <div className="md:w-1/3 md:pr-12 text-sa-muted text-sm leading-relaxed mb-4 md:mb-0 relative z-10">
                    <div className="pl-20 md:pl-0 border-l-0 md:border-l md:border-white/20 md:pl-10 py-2 h-full flex items-center min-h-[4rem]">
                      {s.desc}
                    </div>
                  </div>

                  {/* Right: Arrow Button */}
                  <div className="flex w-full md:w-auto justify-end">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-colors duration-300 group-hover:bg-sa-primary shrink-0">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Hover Image (Follows Mouse) */}
                  {isHovered && (
                    <div 
                      className="pointer-events-none fixed z-[100] hidden w-[300px] h-[400px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300 md:block"
                      style={{
                        left: mousePos.x,
                        top: mousePos.y,
                        opacity: 1,
                      }}
                    >
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                    </div>
                  )}
                </Link>
              </SaReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
