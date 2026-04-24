// "use client";
// import { motion, useInView, useSpring, useTransform } from "framer-motion";
// import { useRef } from "react";

// const stats = [
//   { value: 12, suffix: "+", label: "Industries", sublabel: "Served" },
//   { value: 200, suffix: "+", label: "Projects", sublabel: "Delivered" },
//   { value: 98, suffix: "%", label: "Satisfaction", sublabel: "Rate" },
//   { value: 24, suffix: "/7", label: "Support", sublabel: "Available" },
// ];

// function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });

//   const spring = useSpring(0, { stiffness: 50, damping: 30 });
//   const display = useTransform(spring, (current) => Math.round(current));

//   if (isInView) {
//     spring.set(end);
//   }

//   return (
//     <span ref={ref} className="tabular-nums">
//       <motion.span>{display}</motion.span>
//       {suffix}
//     </span>
//   );
// }

// export function Stats() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   return (
//     <section ref={ref} className="py-24 bg-gradient-to-b from-cyan-50 via-cyan-100 to-cyan-200 relative overflow-hidden">
//       {/* Wave pattern overlay */}
//       <div className="absolute inset-0 opacity-20">
//         <svg className="absolute bottom-0 left-0 right-0" viewBox="0 0 1200 120" preserveAspectRatio="none">
//           <path
//             d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
//             fill="url(#wave-gradient)"
//             className="animate-wave"
//           />
//           <defs>
//             <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#00bcd4" />
//               <stop offset="100%" stopColor="#0088e6" />
//             </linearGradient>
//           </defs>
//         </svg>
//       </div>

//       <div className="container mx-auto px-6 md:px-8 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-ocean-600 to-cyan-600 tracking-tight">
//               Numbers That Speak
//             </h2>
//             <p className="text-lg text-white/90 font-light">
//               Our track record of excellence
//             </p>
//           </motion.div>

//         {/* Asymmetric grid layout */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
//           {stats.map((stat, index) => (
//             <motion.div
//               key={stat.label}
//               initial={{ opacity: 0, scale: 0.8, y: 30 }}
//               animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 30 }}
//               transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
//               className={`relative p-8 bg-white/70 backdrop-blur-sm border border-cyan-200/30 rounded-3xl hover:border-cyan-300 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl ${
//                 index === 0 ? "md:col-span-2 md:row-span-1" : ""
//               }`}
//             >
//               {/* Gradient accent */}
//               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-ocean-400 rounded-t-3xl" />
              
//               <div className="text-center">
//                 <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ocean-600 to-cyan-600 mb-3 tracking-tight">
//                   <AnimatedCounter end={stat.value} suffix={stat.suffix} />
//                 </div>
//                 <div className="text-lg font-semibold text-ocean-700 mb-1">{stat.label}</div>
//                 <div className="text-sm text-ocean-500/70 font-light">{stat.sublabel}</div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, type CSSProperties } from "react";
import { fadeFromLeft, fadeUpSoft, staggerDelay } from "@/lib/scroll-reveal";

/** Branching vein paths with light pulses traveling along strokes (see globals.css). */
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
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
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
      <span className="ml-1 text-ocean-400">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section id="stats" className="relative overflow-hidden bg-black py-20 md:py-24">
      {/* Same “horizon arc” stack as Services, shifted cooler / more indigo */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 150% 90% at 50% -22%, #1a3d8c 0%, #0a0a28 44%, #000000 74%)",
          }}
        />
        <div
          className="absolute left-1/2 top-0 h-[min(75vh,640px)] w-[min(220vw,1600px)] -translate-x-1/2 -translate-y-[8%] rounded-[100%] opacity-[0.88] blur-[100px]"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(45, 85, 200, 0.44) 0%, transparent 62%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050a18]/35 to-black" />
      </div>

      <StatsVeinLightning />

      <div className="container relative z-10 mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="mb-12 max-w-2xl md:mb-16">
          <motion.div {...fadeFromLeft}>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-ocean-400">
             Numbers That Speak

            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Our track record of <br />
              <span className="bg-gradient-to-r from-blue-400 via-ocean-500 to-blue-500 bg-clip-text text-transparent">
                excellence.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Compact 2×2 grid - smaller cards than previous bento */}
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              {...fadeUpSoft}
              transition={staggerDelay(index, 0.1)}
              className="group relative flex min-h-0 flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#0c1830]/55 p-5 backdrop-blur-md transition-all duration-500 hover:border-ocean-500/40 hover:bg-[#0e1c38]/70 md:min-h-[140px] md:p-6"
            >
              <div className="absolute -inset-px bg-gradient-to-br from-ocean-500/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="mb-1 text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="text-base font-semibold text-white/90 transition-colors group-hover:text-blue-300 md:text-lg">
                  {stat.label}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-slate-400">
                  {stat.sublabel}
                </p>
              </div>

              <div className="pointer-events-none absolute bottom-3 right-4 text-white/[0.04] transition-all duration-700 group-hover:text-white/[0.08]">
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