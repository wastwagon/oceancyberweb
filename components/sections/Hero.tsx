"use client";
import { motion, useScroll, useTransform } from "framer-motion";
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-700 to-blue-900"
    >
      {/* Blue wave layers */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-cyan-300/30 to-transparent"
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
          className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-cyan-200/20 to-transparent"
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

      {/* Animated blue bubbles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => {
          // Use deterministic positioning to avoid hydration mismatches
          const left = (i * 15) % 100;
          const bottom = (i * 7) % 30;
          const duration = 2 + (i % 3);
          const delay = i * 0.2;
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-cyan-500/30"
              style={{
                left: `${left}%`,
                bottom: `${bottom}%`,
              }}
              animate={{
                y: [0, -100, -200],
                opacity: [0.3, 0.6, 0],
                scale: [0.5, 1, 1.5],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeOut",
              }}
            />
          );
        })}
      </div>

      {/* Subtle blue grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,188,212,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,188,212,0.05)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_70%,transparent_110%)]" />

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-6 md:px-8 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center text-white"
          >
            Website & Mobile App Development
          </motion.h1>

          {/* Subheading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-center text-white"
          >
            Digital Solutions for Modern Businesses
          </motion.h2>

          {/* Supporting paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-white/90 text-center mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            We design and build websites and mobile apps with modern design and scalable technology to help your business thrive in the digital era.
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              href="/consultation"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-ocean-900"
            >
              Get Free Consultation
            </Link>

            <Link
              href="/portfolio"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-base rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-ocean-900"
            >
              View Our Portfolio
            </Link>
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
