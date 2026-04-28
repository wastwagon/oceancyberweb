"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, type CSSProperties } from "react";
import { fadeFromLeft, fadeUpSoft, staggerDelay } from "@/lib/scroll-reveal";

function StatsVeinLightning() {
  const veins: { d: string; flowClass: string; style?: CSSProperties }[] = [
    {
      d: "M -40 620 C 200 500 380 400 560 280 S 860 120 1080 40",
      flowClass: "stats-vein-flow",
      style: { animationDelay: "0s" },
    },
    {
      d: "M 1220 180 C 960 260 720 400 480 520 S 160 640 -40 700",
      flowClass: "stats-vein-flow stats-vein-flow--slow",
      style: { animationDelay: "1.4s" },
    },
    {
      d: "M 80 400 Q 420 340 760 380 T 1180 360",
      flowClass: "stats-vein-flow stats-vein-flow--fast",
      style: { animationDelay: "0.7s" },
    },
    {
      d: "M 560 280 Q 620 360 680 440 T 760 560",
      flowClass: "stats-vein-flow",
      style: { animationDelay: "2.1s" },
    },
    {
      d: "M 940 -20 Q 820 200 760 420 T 700 720",
      flowClass: "stats-vein-flow stats-vein-flow--slow",
      style: { animationDelay: "3s" },
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-50" aria-hidden>
      <svg
        className="absolute inset-0 h-full min-h-[420px] w-full"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="stats-vein-stroke-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
            <stop offset="40%" stopColor="#bfdbfe" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <g className="opacity-[0.92]">
          {veins.map(({ d, flowClass, style }, i) => (
            <g key={i}>
              <path d={d} className="stats-vein-static" />
              <path d={d} className={flowClass} style={style} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

const stats = [
  { value: 12, suffix: "+", label: "Industries", sublabel: "Global Reach" },
  { value: 200, suffix: "+", label: "Projects", sublabel: "Successful Launches" },
  { value: 98, suffix: "%", label: "Satisfaction", sublabel: "Client Loyalty" },
  { value: 24, suffix: "/7", label: "Support", sublabel: "Always Connected" },
];

function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 40, damping: 25 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) spring.set(end);
  }, [isInView, spring, end]);

  return (
    <span ref={ref} className="tabular-nums tracking-tighter">
      <motion.span>{display}</motion.span>
      <span className="ml-1 text-ocean-600">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section
      id="stats"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-100/80 py-20 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/40 via-white/80 to-slate-100" />
        <div
          className="absolute left-1/2 top-0 h-[min(60vh,480px)] w-[min(200vw,1100px)] -translate-x-1/2 -translate-y-[5%] rounded-[100%] bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(2,106,255,0.14)_0%,transparent_65%)] blur-[100px]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-slate-100/60" />
      </div>

      <StatsVeinLightning />

      <div className="container relative z-10 mx-auto max-w-5xl px-6">
        <div className="mb-12 max-w-2xl md:mb-16">
          <motion.div {...fadeFromLeft}>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">
              Numbers that speak
            </span>
            <h2 className="mb-6 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
              Our track record of <br />
              <span className="bg-gradient-to-r from-ocean-600 via-ocean-700 to-cyan-600 bg-clip-text text-transparent">
                excellence.
              </span>
            </h2>
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              {...fadeUpSoft}
              transition={staggerDelay(index, 0.1)}
              className="group relative flex min-h-0 flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 bg-white/95 p-5 shadow-sm ring-1 ring-slate-200/50 backdrop-blur-sm transition-all duration-500 hover:border-ocean-200/80 hover:shadow-md md:min-h-[140px] md:p-6"
            >
              <div className="absolute -inset-px bg-gradient-to-br from-ocean-500/[0.07] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="mb-1 text-3xl font-bold tracking-tighter text-slate-900 sm:text-4xl md:text-5xl">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="text-base font-semibold text-slate-800 transition-colors group-hover:text-ocean-800 md:text-lg">
                  {stat.label}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-slate-500">
                  {stat.sublabel}
                </p>
              </div>

              <div className="pointer-events-none absolute bottom-3 right-4 text-slate-200/80 transition-all duration-700 group-hover:text-slate-300/90">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
