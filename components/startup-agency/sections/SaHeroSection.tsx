"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { heroServiceSlides } from "@/lib/startup-agency/content";

export function SaHeroSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="hero" className="relative h-screen min-h-[600px] w-full overflow-hidden bg-sa-bg pt-20">
      {/* Huge Stroked Text (Initial State) */}
      <div 
        className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-700 pointer-events-none ${
          hoveredIndex !== null ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 
          className="font-heading text-[10vw] font-bold tracking-tighter uppercase leading-none"
          style={{
            WebkitTextStroke: "2px rgba(255, 255, 255, 0.8)",
            color: "transparent",
          }}
        >
          OceanCyber
        </h1>
      </div>

      {/* Default Background Image (Shows when no column is hovered) */}
      <div 
        className={`absolute inset-0 z-0 transition-opacity duration-700 ${
          hoveredIndex !== null ? "opacity-0" : "opacity-40"
        }`}
      >
        <Image
          src="/images/Africa Trade Chamber.webp"
          alt="OceanCyber Default"
          fill
          className="object-cover grayscale"
          priority
        />
      </div>

      {/* 4-Column Grid */}
      <div className="relative z-20 flex h-full w-full">
        {heroServiceSlides.map((slide, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <Link
              key={slide.title}
              href={slide.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex h-full flex-1 cursor-pointer items-end justify-center border-r border-white/10 transition-all duration-500 last:border-r-0 hover:flex-[1.5]"
            >
              {/* Slide Background Image */}
              <div 
                className={`absolute inset-0 -z-10 transition-opacity duration-500 ${
                  isHovered ? "opacity-80" : "opacity-0"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Slide Title */}
              <div className="mb-20 w-full px-6 text-center">
                {/* When hovered, show huge stroked text for the specific service */}
                {isHovered && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-max">
                     <h2 
                        className="font-heading text-[6vw] font-bold tracking-tight uppercase leading-none whitespace-nowrap"
                        style={{
                          WebkitTextStroke: "1px rgba(255, 255, 255, 0.9)",
                          color: "transparent",
                        }}
                      >
                        {slide.title}
                      </h2>
                  </div>
                )}
                
                <h3 className="font-heading text-2xl font-bold uppercase tracking-widest text-white md:text-3xl">
                  {slide.title}
                </h3>
                <div className="mx-auto mt-6 h-12 w-12 flex items-center justify-center rounded-full border border-white/30 transition-all group-hover:border-white group-hover:bg-white/10">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white transform transition-transform group-hover:-rotate-45">
                     <line x1="5" y1="12" x2="19" y2="12"></line>
                     <polyline points="12 5 19 12 12 19"></polyline>
                   </svg>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
