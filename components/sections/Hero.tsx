"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Waves } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-ocean-900 via-ocean-800 to-ocean-900"
    >
      {/* Ocean wave layers */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-ocean-600/30 to-transparent"
          animate={{
            clipPath: [
              "polygon(0 100%, 100% 100%, 100% 80%, 0 85%)",
              "polygon(0 100%, 100% 100%, 100% 75%, 0 80%)",
              "polygon(0 100%, 100% 100%, 100% 80%, 0 85%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-ocean-500/20 to-transparent"
          animate={{
            clipPath: [
              "polygon(0 100%, 100% 100%, 100% 70%, 0 75%)",
              "polygon(0 100%, 100% 100%, 100% 65%, 0 70%)",
              "polygon(0 100%, 100% 100%, 100% 70%, 0 75%)",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Animated ocean bubbles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyan-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 30}%`,
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0.3, 0.6, 0],
              scale: [0.5, 1, 1.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_70%,transparent_110%)]" />

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-6 md:px-8 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-cyan-400/30">
              <Waves className="w-4 h-4 text-cyan-300 animate-wave" />
              <span className="text-sm font-medium text-cyan-100 tracking-wide">
                Ghana&apos;s Premier Tech Partner
              </span>
            </div>
          </motion.div>

          {/* Main headline - asymmetric layout */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
          >
            <span className="block text-white">Diving Deep</span>
            <span className="block mt-2 ml-8 md:ml-16">
              <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-ocean-300 bg-clip-text text-transparent">
                Into Digital
              </span>
            </span>
            <span className="block mt-2 text-white/90">Excellence</span>
          </motion.h1>

          {/* Subheadline - creative layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 max-w-3xl"
          >
            <p className="text-xl md:text-2xl text-cyan-100/80 mb-6 font-light leading-relaxed">
              Full-stack development, premium design, and cutting-edge technology.
            </p>
            <p className="text-lg text-cyan-200/60 font-light">
              Transforming businesses across Ghana with solutions that flow seamlessly.
            </p>
          </motion.div>

          {/* CTA Buttons - creative positioning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <Link
              href="/contact"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full font-semibold text-base overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </Link>

            <Link
              href="/portfolio"
              className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-cyan-400/30 text-cyan-100 rounded-full font-medium text-base hover:bg-white/15 hover:border-cyan-400/50 transition-all duration-300"
            >
              Explore Our Work
            </Link>
          </motion.div>

          {/* Feature indicators - unique layout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl"
          >
            {[
              { label: "Full-Stack", value: "Expertise", icon: "🌊" },
              { label: "Mobile-First", value: "Design", icon: "⚓" },
              { label: "Premium", value: "Quality", icon: "🏆" },
              { label: "Ghana-Based", value: "Local", icon: "🇬🇭" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className="p-6 bg-white/5 backdrop-blur-xl border border-cyan-400/20 rounded-2xl hover:bg-white/10 hover:border-cyan-400/40 transition-all duration-300"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold text-cyan-100 mb-1">{item.label}</div>
                <div className="text-xs text-cyan-200/60">{item.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs text-cyan-300/60 tracking-widest uppercase">Dive Deeper</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
