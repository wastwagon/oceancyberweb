"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { heroServiceSlides } from "@/lib/startup-agency/content";

export function SaHeroSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="hero" className="relative h-screen min-h-[600px] w-full overflow-hidden bg-sa-bg pt-20">
      {/* Grid Beam Animation Layer */}
      <div className="hero-grid-cells opacity-20">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="hero-grid-cell" />
        ))}
      </div>

      {/* Huge Stroked Text (Initial State) */}
      <div 
        className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-700 pointer-events-none ${
          hoveredIndex !== null ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 
          className="font-heading text-[12vw] font-bold tracking-tighter uppercase leading-none"
          style={{
            WebkitTextStroke: "2px rgba(255, 255, 255, 0.4)",
            color: "transparent",
          }}
        >
          OceanCyber
        </h1>
      </div>

      {/* Default Background Image */}
      <div 
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
          hoveredIndex !== null ? "opacity-0" : "opacity-40"
        }`}
      >
        <Image
          src={heroServiceSlides[0].image}
          alt="OceanCyber Default"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Hovered Background Images (Full Width) */}
      {heroServiceSlides.map((slide, index) => (
        <div 
          key={`bg-${slide.title}`}
          className={`absolute inset-0 z-0 transition-all duration-1000 ease-in-out ${
            hoveredIndex === index ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>
      ))}

      {/* 4-Column Grid */}
      <div className="relative z-20 flex h-full w-full border-t border-white/5">
        {heroServiceSlides.map((slide, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <Link
              key={slide.title}
              href={slide.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex h-full flex-1 cursor-pointer items-end justify-center border-r border-white/10 transition-all duration-700 ease-in-out last:border-r-0 hover:flex-[2]"
            >

              {/* Slide Content */}
              <div className="mb-20 w-full px-6 text-center transition-all duration-500">
                {/* When hovered, show huge stroked text for the specific service */}
                {isHovered && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-max z-30">
                     <h2 
                        className="font-heading text-[10vw] font-bold tracking-tight uppercase leading-none whitespace-nowrap animate-fade-in"
                        style={{
                          WebkitTextStroke: "1px rgba(255, 255, 255, 0.6)",
                          color: "transparent",
                        }}
                      >
                        {slide.title}
                      </h2>
                  </div>
                )}
                
                <h3 className={`font-heading text-xl font-bold uppercase tracking-widest text-white transition-all duration-500 md:text-2xl ${
                  isHovered ? "opacity-0 -translate-y-10" : "opacity-100"
                }`}>
                  {slide.title}
                </h3>
                <div className={`mx-auto mt-6 h-12 w-12 flex items-center justify-center rounded-full border border-white/30 transition-all duration-500 ${
                  isHovered ? "border-sa-primary bg-sa-primary/20 scale-125" : "group-hover:border-white group-hover:bg-white/10"
                }`}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-all duration-500 ${
                     isHovered ? "-rotate-45 text-sa-primary" : "text-white"
                   }`}>
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
