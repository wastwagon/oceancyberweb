"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function SaHeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-24"
    >
      {/* Full-width Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Africa Trade Chamber.webp"
          alt="Digital solutions execution"
          fill
          className="object-cover opacity-60"
          sizes="100vw"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Centered Content */}
      <div className="sa-container relative z-10 mx-auto max-w-5xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-5xl font-bold uppercase leading-[1.1] tracking-wide text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          Crafting Creative <br />
          Solutions for <br />
          Modern Brands
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-sa-muted sm:text-lg"
        >
          At the intersection of vision and execution, our team transforms
          concepts into compelling digital narratives and robust infrastructure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/services"
            className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-sa-primary px-8 font-heading text-[13px] font-bold uppercase tracking-[0.14em] text-sa-bg transition-all duration-300 hover:scale-105 hover:bg-white"
          >
            View Our Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
