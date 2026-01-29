"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: 12, suffix: "+", label: "Industries", sublabel: "Served", icon: "🌊" },
  { value: 200, suffix: "+", label: "Projects", sublabel: "Delivered", icon: "⚓" },
  { value: 98, suffix: "%", label: "Satisfaction", sublabel: "Rate", icon: "🏆" },
  { value: 24, suffix: "/7", label: "Support", sublabel: "Available", icon: "🌐" },
];

function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(0, { stiffness: 50, damping: 30 });
  const display = useTransform(spring, (current) => Math.round(current));

  if (isInView) {
    spring.set(end);
  }

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-cyan-50 via-teal-50 to-ocean-50 relative overflow-hidden">
      {/* Wave pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg className="absolute bottom-0 left-0 right-0" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
            fill="url(#wave-gradient)"
            className="animate-wave"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00bcd4" />
              <stop offset="100%" stopColor="#0088e6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-ocean-600 to-cyan-600 tracking-tight">
            Numbers That Speak
          </h2>
          <p className="text-lg text-ocean-600/70 font-light">
            Our track record of excellence
          </p>
        </motion.div>

        {/* Asymmetric grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative p-8 bg-white/70 backdrop-blur-sm border border-cyan-200/50 rounded-3xl hover:border-cyan-300 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl ${
                index === 0 ? "md:col-span-2 md:row-span-1" : ""
              }`}
            >
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-ocean-400 rounded-t-3xl" />
              
              <div className="text-center">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ocean-600 to-cyan-600 mb-3 tracking-tight">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-lg font-semibold text-ocean-700 mb-1">{stat.label}</div>
                <div className="text-sm text-ocean-500/70 font-light">{stat.sublabel}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
