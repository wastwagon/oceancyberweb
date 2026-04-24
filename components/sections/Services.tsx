// "use client";
// import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
// import { useRef, useState } from "react";
// import Link from "next/link";

// const services = [
//   {
//     title: "Web Development",
//     description: "Modern, performant websites built with cutting-edge technologies and best practices that drive results.",
//     features: ["Next.js", "TypeScript", "Performance"],
//     gradient: "from-ocean-500/40 to-cyan-500/40",
//     borderGradient: "from-ocean-400/60 to-cyan-400/60",
//     size: "featured",
//     highlight: "Full-Stack Excellence",
//   },
//   {
//     title: "Mobile Apps",
//     description: "Native and cross-platform applications that deliver exceptional user experiences.",
//     features: ["React Native", "Flutter"],
//     gradient: "from-teal-500/30 to-cyan-500/30",
//     borderGradient: "from-teal-400/50 to-cyan-400/50",
//     size: "medium",
//   },
//   {
//     title: "E-Commerce",
//     description: "Scalable online stores with seamless checkout and payment integrations.",
//     features: ["Shopify", "WooCommerce"],
//     gradient: "from-cyan-500/30 to-teal-500/30",
//     borderGradient: "from-cyan-400/50 to-teal-400/50",
//     size: "medium",
//   },
//   {
//     title: "SEO & Marketing",
//     description: "Data-driven strategies that increase visibility and drive qualified traffic to your business.",
//     features: ["Local SEO", "Content"],
//     gradient: "from-ocean-400/30 to-teal-500/30",
//     borderGradient: "from-ocean-300/50 to-teal-400/50",
//     size: "small",
//   },
//   {
//     title: "Cybersecurity",
//     description: "Comprehensive security solutions to protect your business from digital threats.",
//     features: ["Audits", "Protection"],
//     gradient: "from-ocean-600/30 to-cyan-600/30",
//     borderGradient: "from-ocean-500/50 to-cyan-500/50",
//     size: "small",
//   },
//   {
//     title: "Cloud Solutions",
//     description: "Scalable infrastructure and cloud migration services for modern businesses.",
//     features: ["AWS", "Azure"],
//     gradient: "from-cyan-500/30 to-ocean-500/30",
//     borderGradient: "from-cyan-400/50 to-ocean-400/50",
//     size: "small",
//   },
//   {
//     title: "Networking",
//     description: "Robust network infrastructure ensuring reliable and secure connectivity.",
//     features: ["Design", "Support"],
//     gradient: "from-teal-500/30 to-ocean-500/30",
//     borderGradient: "from-teal-400/50 to-ocean-400/50",
//     size: "small",
//   },
//   {
//     title: "Custom Software",
//     description: "Tailored solutions that automate processes and drive operational efficiency.",
//     features: ["APIs", "Integration"],
//     gradient: "from-cyan-400/30 to-teal-400/30",
//     borderGradient: "from-cyan-300/50 to-teal-300/50",
//     size: "medium",
//   },
// ];

// function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const cardRef = useRef<HTMLDivElement>(null);
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
//     stiffness: 300,
//     damping: 30,
//   });
//   const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
//     stiffness: 300,
//     damping: 30,
//   });

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!cardRef.current) return;
//     const rect = cardRef.current.getBoundingClientRect();
//     const x = (e.clientX - rect.left) / rect.width;
//     const y = (e.clientY - rect.top) / rect.height;
//     mouseX.set(x - 0.5);
//     mouseY.set(y - 0.5);
//   };

//   const handleMouseLeave = () => {
//     mouseX.set(0);
//     mouseY.set(0);
//     setIsHovered(false);
//   };

//   if (service.size === "featured") {
//     return (
//       <motion.div
//         ref={cardRef}
//         initial={{ opacity: 0, scale: 0.9 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         viewport={{ once: true, margin: "-100px" }}
//         transition={{ duration: 0.6, delay: index * 0.1 }}
//         style={{
//           rotateX,
//           rotateY,
//           transformStyle: "preserve-3d",
//         }}
//         onMouseMove={handleMouseMove}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={handleMouseLeave}
//         className="md:col-span-2 md:row-span-2 group relative"
//       >
//         <div className="relative h-full p-10 bg-gradient-to-br from-ocean-900/90 to-ocean-800/90 backdrop-blur-xl border-2 border-cyan-400/30 rounded-[2rem] hover:border-cyan-400/60 transition-all duration-500 overflow-hidden">
//           {/* Animated gradient background */}
//           <motion.div
//             className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
//             animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
//             transition={{ duration: 3, repeat: Infinity }}
//           />

//           {/* Border glow effect */}
//           <motion.div
//             className={`absolute -inset-[2px] bg-gradient-to-br ${service.borderGradient} rounded-[2rem] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10`}
//           />

//           {/* Content */}
//           <div className="relative z-10 h-full flex flex-col">
//             {/* Top section */}
//             <div className="flex items-start justify-between mb-8">
//               <div className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full backdrop-blur-sm">
//                 <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
//                   {service.highlight}
//                 </span>
//               </div>
//             </div>

//             {/* Main content */}
//             <div className="flex-1">
//               <h3 className="text-4xl md:text-5xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:to-teal-200 group-hover:bg-clip-text transition-all duration-300">
//                 {service.title}
//               </h3>
//               <p className="text-white/90 mb-8 leading-relaxed text-lg max-w-2xl">
//                 {service.description}
//               </p>

//               {/* Features grid */}
//               <div className="grid grid-cols-3 gap-3 mb-8">
//                 {service.features.map((feature) => (
//                   <div
//                     key={feature}
//                     className="px-4 py-3 bg-cyan-500/10 border border-cyan-400/20 text-cyan-200 text-sm font-medium rounded-xl backdrop-blur-sm hover:bg-cyan-500/20 transition-colors"
//                   >
//                     {feature}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* CTA */}
//             <Link
//               href={`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
//               className="inline-flex items-center gap-3 text-cyan-100 font-semibold text-lg group-hover:text-cyan-50 transition-colors"
//             >
//               Explore Service
//             </Link>
//           </div>

//           {/* Animated shine effect */}
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
//             style={{ skewX: -20 }}
//           />

//           {/* Decorative elements */}
//           <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors" />
//           <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/10 transition-colors" />
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       ref={cardRef}
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-100px" }}
//       transition={{ duration: 0.6, delay: index * 0.1 }}
//       style={{
//         rotateX,
//         rotateY,
//         transformStyle: "preserve-3d",
//       }}
//       onMouseMove={handleMouseMove}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={handleMouseLeave}
//       className={`group relative ${
//         service.size === "medium" ? "md:col-span-1 md:row-span-1" : "md:col-span-1 md:row-span-1"
//       }`}
//     >
//       <div className="relative h-full p-8 bg-gradient-to-br from-ocean-900/80 to-ocean-800/80 backdrop-blur-xl border border-cyan-400/20 rounded-2xl hover:border-cyan-400/50 transition-all duration-500 overflow-hidden">
//         {/* Gradient background */}
//         <motion.div
//           className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
//         />

//         {/* Border glow */}
//         <motion.div
//           className={`absolute -inset-[1px] bg-gradient-to-br ${service.borderGradient} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10`}
//         />

//         {/* Content */}
//         <div className="relative z-10">
//           <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:to-teal-200 group-hover:bg-clip-text transition-all duration-300">
//             {service.title}
//           </h3>

//           <p className="text-white/90 mb-6 leading-relaxed text-sm">{service.description}</p>

//           <div className="flex flex-wrap gap-2 mb-6">
//             {service.features.map((feature) => (
//               <span
//                 key={feature}
//                 className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-400/20 text-cyan-200 text-xs font-medium rounded-lg backdrop-blur-sm"
//               >
//                 {feature}
//               </span>
//             ))}
//           </div>

//           <Link
//             href={`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
//             className="inline-flex items-center gap-2 text-cyan-200 font-medium text-sm group-hover:text-cyan-100 transition-colors"
//           >
//             Learn more
//           </Link>
//         </div>

//         {/* Shine effect */}
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
//           style={{ skewX: -20 }}
//         />
//       </div>
//     </motion.div>
//   );
// }

// export function Services() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   return (
//     <section ref={ref} id="services" className="py-32 bg-gradient-to-b from-blue-50-custom via-blue-100-custom to-blue-200-custom relative overflow-hidden">
//       {/* Ocean depth effect with animated particles */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,188,212,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,188,212,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />

//       {/* Floating particles */}
//       {[...Array(15)].map((_, i) => {
//         // Use deterministic positioning to avoid hydration mismatches
//         const left = (i * 20) % 100;
//         const top = (i * 15) % 100;
//         const duration = 3 + (i % 4);
//         const delay = i * 0.3;

//         return (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 rounded-full bg-cyan-400/20"
//             style={{
//               left: `${left}%`,
//               top: `${top}%`,
//             }}
//             animate={{
//               y: [0, -30, 0],
//               opacity: [0.2, 0.5, 0.2],
//               scale: [1, 1.5, 1],
//             }}
//             transition={{
//               duration,
//               repeat: Infinity,
//               delay,
//               ease: "easeInOut",
//             }}
//           />
//         );
//       })}

//       <div className="container mx-auto px-6 md:px-8 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//           transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//           className="mb-20"
//         >
//           <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-7xl mx-auto">
//             <div className="flex-1">
//               <motion.span
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
//                 className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 backdrop-blur-xl border border-cyan-400/30 rounded-full text-sm font-medium text-[hsl(var(--text-light))]/80 mb-6 tracking-wide"
//               >
//                 Our Services
//               </motion.span>
//               <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 tracking-tight leading-tight">
//                 What We Build
//               </h2>
//               <p className="text-xl text-[hsl(var(--text-light))]/70 max-w-2xl font-light leading-relaxed">
//                 Comprehensive digital solutions tailored to your business needs. From concept to deployment, we deliver excellence.
//               </p>
//             </div>
//             <div className="md:text-right">
//               <div className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/10 border border-cyan-400/30 rounded-full backdrop-blur-sm">
//                 <span className="text-3xl font-bold text-cyan-300">8+</span>
//                 <span className="text-cyan-200/70 text-sm">Services</span>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Modern asymmetric grid layout */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
//           {services.map((service, index) => (
//             <ServiceCard key={service.title} service={service} index={index} />
//           ))}
//         </div>

//         {/* Bottom CTA section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//           transition={{ delay: 0.8 }}
//           className="mt-20 text-center"
//         >
//           <div className="inline-flex items-center gap-4 px-8 py-6 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-400/30 rounded-2xl backdrop-blur-xl">
//             <span className="text-cyan-200/80 font-light">Need something custom?</span>
//             <Link
//               href="/contact"
//               className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full font-semibold hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300"
//             >
//               Let&apos;s Talk
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { fadeFromLeft, revealViewport } from "@/lib/scroll-reveal";

// --- Types ---
interface Service {
  title: string;
  description: string;
  features: string[];
  size: "featured" | "medium" | "small";
  highlight?: string;
}

const services: Service[] = [
  {
    title: "Web Development",
    description: "Modern, performant websites built with cutting-edge technologies and best practices that drive results.",
    features: ["Next.js", "TypeScript", "Performance"],
    size: "featured",
    highlight: "Full-Stack Excellence",
  },
  {
    title: "Mobile Apps",
    description: "Native and cross-platform applications that deliver exceptional user experiences.",
    features: ["React Native", "Flutter"],
    size: "medium",
  },
  {
    title: "E-Commerce",
    description: "Scalable online stores with seamless checkout and payment integrations.",
    features: ["Shopify", "WooCommerce"],
    size: "medium",
  },
  {
    title: "SEO & Marketing",
    description: "Data-driven strategies that increase visibility and drive qualified traffic to your business.",
    features: ["Local SEO", "Content"],
    size: "small",
  },
  {
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your business from digital threats.",
    features: ["Audits", "Protection"],
    size: "small",
  },
  {
    title: "Cloud Solutions",
    description: "Scalable infrastructure and cloud migration services for modern businesses.",
    features: ["AWS", "Azure"],
    size: "small",
  },
  {
    title: "Networking",
    description: "Robust network infrastructure ensuring reliable and secure connectivity.",
    features: ["Design", "Support"],
    size: "small",
  },
  {
    title: "Custom Software",
    description: "Tailored solutions that automate processes and drive operational efficiency.",
    features: ["APIs", "Integration"],
    size: "medium",
  },
];

// --- Sub-components ---

/**
 * Animated Grid Background with Mouse Tracking
 * Inspired by the "Jessica Randall" profile screenshot style.
 */
function InteractiveGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      {/* Subtle grid - sits above the arc, low contrast on pure black */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(to right, #143296 1px, transparent 1px), linear-gradient(to bottom, #143296 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Very light cursor bloom so it does not compete with the horizon arc */}
      <motion.div
        className="absolute inset-0 z-10 opacity-25"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(480px circle at ${x}px ${y}px, rgba(20, 50, 150, 0.12), transparent 75%)`
          ),
        }}
      />
    </div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const isFeatured = service.size === "featured";
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1030]/40 backdrop-blur-md transition-all duration-500 hover:border-ocean-500/50 hover:bg-[#0a1030]/60 ${
        isFeatured ? "md:col-span-2 md:row-span-2 p-5 sm:p-6 md:p-7" : "p-4 sm:p-5 md:p-6"
      }`}
    >
      {/* Hover Spotlight Effect */}
      <div className="absolute -inset-px bg-gradient-to-br from-ocean-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex h-full flex-col">
        {isFeatured && service.highlight && (
          <div className="mb-2 md:mb-3">
            <span className="rounded-full border border-ocean-500/20 bg-ocean-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-ocean-400 md:text-[10px]">
              {service.highlight}
            </span>
          </div>
        )}

        <h3
          className={`font-bold text-white transition-colors group-hover:text-blue-300 ${
            isFeatured ? "mb-2 text-2xl md:text-3xl" : "mb-1.5 text-base md:text-lg"
          }`}
        >
          {service.title}
        </h3>

        <p
          className={`leading-relaxed text-slate-400 ${
            isFeatured ? "mb-4 max-w-lg text-sm md:text-base" : "mb-3 text-xs md:text-sm"
          }`}
        >
          {service.description}
        </p>

        <div className="mb-4 mt-auto flex flex-wrap gap-1.5 md:gap-2">
          {service.features.map((feature) => (
            <span
              key={feature}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-300 transition-colors group-hover:border-ocean-500/30 md:text-[11px]"
            >
              {feature}
            </span>
          ))}
        </div>

        <Link
          href={`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-ocean-400 transition-all group-hover:gap-3 md:text-sm"
        >
          {isFeatured ? "Start Your Journey" : "Learn More"}
          <span className="text-base md:text-lg">→</span>
        </Link>
      </div>
    </motion.div>
  );
}

// --- Main Section ---

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-black py-32"
    >
      {/* Dark premium base: wide horizon arc (#143296 → #000032 → black), soft bloom */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 150% 90% at 50% -18%, #143296 0%, #000032 42%, #000000 72%)",
          }}
        />
        <div
          className="absolute left-1/2 top-0 h-[min(75vh,640px)] w-[min(220vw,1600px)] -translate-x-1/2 -translate-y-[8%] rounded-[100%] opacity-90 blur-[100px]"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(20, 50, 150, 0.55) 0%, transparent 62%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
      </div>

      <InteractiveGrid />

      <div className="container relative z-10 mx-auto px-6">
        <header className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <motion.div {...fadeFromLeft}>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-ocean-400">
              Our Services
            </h2>
            <h1 className="mx-auto mb-8 max-w-4xl text-balance text-center text-5xl font-bold tracking-tighter text-white md:text-7xl">
              What We Build <span className="bg-gradient-to-r from-blue-400 via-ocean-500 to-blue-600 bg-clip-text text-transparent">for You</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-slate-400">
              We specialize in building high-performance digital products. Our approach combines technical precision with strategic design to ensure your business thrives in the modern tech landscape.
            </p>
          </motion.div>
        </header>

        {/* Bento Grid - constrained width, tighter rows */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 auto-rows-[minmax(200px,auto)] sm:gap-4 md:grid-cols-3 md:gap-4">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Footer Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 md:flex-row"
        >
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold text-white mb-2">Ready to transform your vision?</h4>
            <p className="text-slate-500">Join 50+ companies already scaling with our expertise.</p>
          </div>
          {/* <Link
            href="/contact"
            className="px-8 py-4 bg-ocean-600 hover:bg-ocean-500 text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-ocean-900/30"
          >
            Schedule a Consultation
          </Link> */}
          <Link href="/contact">
            <button className="min-w-[240px] border-2 border-[#143296cc] bg-gradient-to-t from-[#143296cc] to-[#00000a] py-4 px-8 text-white font-bold rounded-xl transition-all hover:brightness-125 active:scale-95 shadow-lg shadow-[#143296cc]/20">
              Schedule a Consultation
            </button>
            </Link>
        </motion.div>
      </div>
    </section>
  );
}