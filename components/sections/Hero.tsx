// "use client";
// import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
// import Link from "next/link";
// import { useRef, useState } from "react";

// const BEAM_COUNT = 14;
// const GRID_SIZE = 72;

// export function Hero() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const lastTrailCellRef = useRef<{ x: number; y: number } | null>(null);
//   const reduceMotion = useReducedMotion();
//   const [mouseGlow, setMouseGlow] = useState({
//     x: 0,
//     y: 0,
//     active: false,
//   });
//   const [trailSquares, setTrailSquares] = useState<
//     Array<{ id: number; x: number; y: number }>
//   >([]);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
//   const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

//   return (
//     <section
//       ref={containerRef}
//       className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050508] pt-[120px] pb-24 md:pt-[128px]"
//       onMouseMove={(event) => {
//         const rect = event.currentTarget.getBoundingClientRect();
//         const rawX = event.clientX - rect.left;
//         const rawY = event.clientY - rect.top;
//         const snappedX = Math.floor(rawX / GRID_SIZE) * GRID_SIZE;
//         const snappedY = Math.floor(rawY / GRID_SIZE) * GRID_SIZE;

//         const isNewCell =
//           !lastTrailCellRef.current ||
//           lastTrailCellRef.current.x !== snappedX ||
//           lastTrailCellRef.current.y !== snappedY;

//         if (isNewCell) {
//           const id = Date.now() + Math.floor(Math.random() * 1000);
//           lastTrailCellRef.current = { x: snappedX, y: snappedY };
//           setTrailSquares((prev) => [...prev.slice(-8), { id, x: snappedX, y: snappedY }]);
//           window.setTimeout(() => {
//             setTrailSquares((prev) => prev.filter((cell) => cell.id !== id));
//           }, 800);
//         }

//         setMouseGlow({
//           x: snappedX,
//           y: snappedY,
//           active: true,
//         });
//       }}
//       onMouseLeave={() =>
//         setMouseGlow((prev) => ({
//           ...prev,
//           active: false,
//         }))
//       }
//     >
//       {/* Base vignette */}
//       <div
//         className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(0,40,80,0.35)_0%,transparent_50%)]"
//         aria-hidden
//       />

//       {/* Animated center glow - ocean blue + teal (logo colors) */}
//       <div
//         className={`hero-center-glow pointer-events-none absolute left-1/2 top-[32%] h-[min(85vh,820px)] w-[min(140vw,1200px)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,188,212,0.22)_0%,rgba(0,102,204,0.14)_38%,transparent_68%)] blur-[72px] md:blur-[96px] ${reduceMotion ? "opacity-80" : ""}`}
//         style={
//           reduceMotion
//             ? undefined
//             : {
//                 animation: "hero-center-glow 14s ease-in-out infinite",
//               }
//         }
//         aria-hidden
//       />

//       {/* Secondary subtle violet depth (portfolio accent, very soft) */}
//       <div
//         className="pointer-events-none absolute left-1/2 top-[48%] h-[45vh] w-[80%] max-w-3xl -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_65%)] blur-[80px]"
//         aria-hidden
//       />

//       {/* Vertical light beams */}
//       <div
//         className="pointer-events-none absolute inset-0 flex justify-between px-2 md:px-8"
//         aria-hidden
//       >
//         {Array.from({ length: BEAM_COUNT }).map((_, i) => (
//           <div
//             key={i}
//             className="hero-beam relative h-full flex-1 max-w-[72px]"
//             style={{
//               animation: reduceMotion
//                 ? undefined
//                 : `hero-beam-pulse ${6.5 + (i % 5) * 0.6}s ease-in-out infinite`,
//               animationDelay: reduceMotion ? undefined : `${i * 0.42}s`,
//             }}
//           >
//             <div
//               className="absolute inset-x-[15%] top-0 h-full bg-[linear-gradient(180deg,rgba(0,136,230,0.2)_0%,rgba(0,188,212,0.1)_18%,transparent_42%,transparent_58%,rgba(0,102,204,0.06)_82%,rgba(0,188,212,0.08)_100%)] opacity-90 blur-[0.5px]"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Fine vertical + horizontal grid (code-editor style) */}
//       <div
//         className={`hero-grid-anim pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,200,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,200,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_35%,black_15%,transparent_72%)] ${reduceMotion ? "opacity-40" : ""}`}
//         style={
//           reduceMotion
//             ? undefined
//             : { animation: "hero-grid-shift 12s ease-in-out infinite" }
//         }
//         aria-hidden
//       />

//       {/* Mouse reactive square highlight */}
//       {!reduceMotion && (
//         <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
//           {trailSquares.map((trail, index) => (
//             <motion.div
//               key={trail.id}
//               className="absolute rounded-sm bg-cyan-400/25"
//               style={{
//                 width: GRID_SIZE,
//                 height: GRID_SIZE,
//               }}
//               initial={{ x: trail.x, y: trail.y, opacity: 0.35, scale: 1 }}
//               animate={{ opacity: 0, scale: 0.98 }}
//               transition={{
//                 duration: 0.8,
//                 ease: "easeOut",
//                 delay: index * 0.02,
//               }}
//             />
//           ))}
//           <motion.div
//             className="absolute rounded-sm border border-cyan-200/70 bg-cyan-300/40"
//             style={{
//               width: GRID_SIZE,
//               height: GRID_SIZE,
//             }}
//             animate={{
//               x: mouseGlow.x,
//               y: mouseGlow.y,
//               opacity: mouseGlow.active ? 1 : 0,
//               scale: mouseGlow.active ? 1 : 0.85,
//             }}
//             transition={{
//               type: "spring",
//               stiffness: 260,
//               damping: 26,
//               mass: 0.5,
//             }}
//           />
//         </div>
//       )}

//       {/* Square color-ripple sweep: left-center -> top-center */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
//         <motion.div
//           className={`hero-square-ripple-layer absolute inset-0 ${reduceMotion ? "opacity-20" : ""}`}
//           style={{
//             backgroundImage:
//               "linear-gradient(to right, rgba(0,188,212,0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(77,163,255,0.26) 1px, transparent 1px)",
//             backgroundSize: "72px 72px, 72px 72px",
//             mixBlendMode: "screen",
//             animation: reduceMotion
//               ? undefined
//               : "hero-square-ripple-sweep 9.5s linear infinite",
//           }}
//           animate={
//             reduceMotion
//               ? undefined
//               : {
//                   clipPath: [
//                     "circle(8% at 20% 58%)",
//                     "circle(22% at 30% 44%)",
//                     "circle(40% at 42% 26%)",
//                     "circle(55% at 50% 14%)",
//                     "circle(68% at 50% 10%)",
//                     "circle(8% at 20% 58%)",
//                   ],
//                   opacity: [0.08, 0.24, 0.16, 0.22, 0.1, 0.08],
//                 }
//           }
//           transition={
//             reduceMotion
//               ? undefined
//               : {
//                   duration: 9.5,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }
//           }
//         />

//         {/* trailing wave for ripple feel */}
//         <motion.div
//           className={`hero-square-ripple-layer absolute inset-0 ${reduceMotion ? "opacity-10" : ""}`}
//           style={{
//             backgroundImage:
//               "linear-gradient(to right, rgba(0,136,230,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,188,212,0.18) 1px, transparent 1px)",
//             backgroundSize: "72px 72px, 72px 72px",
//             mixBlendMode: "screen",
//             filter: "blur(0.3px)",
//             animation: reduceMotion
//               ? undefined
//               : "hero-square-ripple-sweep 11s linear infinite",
//           }}
//           animate={
//             reduceMotion
//               ? undefined
//               : {
//                   clipPath: [
//                     "circle(6% at 18% 60%)",
//                     "circle(18% at 28% 46%)",
//                     "circle(34% at 40% 28%)",
//                     "circle(48% at 50% 15%)",
//                     "circle(60% at 50% 10%)",
//                     "circle(6% at 18% 60%)",
//                   ],
//                   opacity: [0.06, 0.16, 0.12, 0.15, 0.06, 0.06],
//                 }
//           }
//           transition={
//             reduceMotion
//               ? undefined
//               : {
//                   duration: 11,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                   delay: 0.5,
//                 }
//           }
//         />
//       </div>

//       {/* Soft edge vignette */}
//       <div
//         className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_45%,transparent_30%,rgba(5,5,8,0.85)_100%)]"
//         aria-hidden
//       />

//       {/* Sparse particles (brand: cyan / white) */}
//       {!reduceMotion && (
//         <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
//           {[...Array(24)].map((_, i) => {
//             const left = ((i * 37) % 100) + (i % 3) * 0.5;
//             const top = ((i * 23) % 100) + (i % 5) * 0.3;
//             const duration = 4 + (i % 5);
//             const delay = i * 0.35;
//             return (
//               <motion.div
//                 key={i}
//                 className="absolute h-px w-px rounded-full bg-cyan-300/40 shadow-[0_0_6px_rgba(0,188,212,0.45)] md:h-[2px] md:w-[2px]"
//                 style={{ left: `${left}%`, top: `${top}%` }}
//                 animate={{
//                   opacity: [0.15, 0.55, 0.15],
//                   y: [0, -18, 0],
//                 }}
//                 transition={{
//                   duration,
//                   repeat: Infinity,
//                   delay,
//                   ease: "easeInOut",
//                 }}
//               />
//             );
//           })}
//         </div>
//       )}

//       <motion.div
//         style={{ y, opacity }}
//         className="container relative z-10 mx-auto px-6 md:px-8"
//       >
//         <div className="mx-auto max-w-4xl text-center">
//           <motion.p
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//             className="mb-6 inline-flex items-center rounded-xl border border-cyan-400/25 bg-white/[0.04] px-4 py-1.5 text-xs font-medium tracking-wide text-cyan-200/90 shadow-[0_0_24px_rgba(0,188,212,0.12)] backdrop-blur-md md:text-sm"
//           >
//             ICT solutions provider · Ghana
//           </motion.p>

//           <motion.h1
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
//             className="text-balance text-4xl text-center font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
//           >
//             <span className="block">Website & Mobile App</span>
//             <span className="mt-1 block bg-gradient-to-r from-cyan-200 via-teal-200 to-[#4da3ff] bg-clip-text text-transparent md:mt-2">
//               Development
//             </span>
//           </motion.h1>

//           <motion.h2
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
//             className="mt-5 text-lg text-center font-semibold text-cyan-300/95 md:text-xl md:mt-6"
//           >
//             Digital Solutions for Modern Businesses
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 14 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
//             className="mx-auto mt-6 max-w-2xl text-center text-pretty text-base leading-relaxed text-slate-400 md:text-lg"
//           >
//             We design and build websites and mobile apps with modern design and scalable technology to help your business thrive in the digital era.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 14 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.65, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
//             className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
//           >
//             <Link
//               href="/consultation"
//               className="my-5 inline-flex min-h-[60px] min-w-[200px] items-center justify-center rounded-xl border-2 border-[#143296cc] bg-gradient-to-t from-[#143296cc] to-[#00000a] px-5 py-4 text-base font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#6691ffa6] focus:ring-offset-2 focus:ring-offset-[#050508]"
//             >
//               Get Free Consultation
//             </Link>

//             <Link
//               href="/portfolio"
//               className="my-5 inline-flex min-h-[60px] min-w-[00px] items-center justify-center rounded-xl border-2 border-[#143296cc] bg-gradient-to-t from-[#143296cc] to-[#00000a] px-5 py-4 text-base font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#6691ffa6] focus:ring-offset-2 focus:ring-offset-[#050508]"
//             >
//               View Our Portfolio
//             </Link>
//           </motion.div>
//         </div>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.2 }}
//         className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
//       >
//         <motion.div
//           animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
//           transition={reduceMotion ? undefined : { repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
//           className="flex flex-col items-center gap-3"
//         >
//           <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-400/50">
//             Dive deeper
//           </span>
//           <div className="h-12 w-px bg-gradient-to-b from-cyan-400/50 to-transparent" />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }

// "use client";
// import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
// import Link from "next/link";
// import { useRef, useState } from "react";

// const GRID_SIZE = 64; // Slightly smaller to feel more "tech"

// export function Hero() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [activeSquare, setActiveSquare] = useState<{ x: number; y: number } | null>(null);
//   const reduceMotion = useReducedMotion();

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
//   const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

//   const handleMouseMove = (event: React.MouseEvent) => {
//     const rect = event.currentTarget.getBoundingClientRect();
//     // Logic to "snap" the highlight to the grid cells
//     const x = Math.floor((event.clientX - rect.left) / GRID_SIZE) * GRID_SIZE;
//     const y = Math.floor((event.clientY - rect.top) / GRID_SIZE) * GRID_SIZE;
//     setActiveSquare({ x, y });
//   };

//   return (
//     <section
//       ref={containerRef}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={() => setActiveSquare(null)}
//       className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050508] pt-[120px] pb-24"
//     >
//       {/* 1. The High-Contrast Grid (Inspired by the image layout) */}
//       <div 
//         className="pointer-events-none absolute inset-0 opacity-[0.15]"
//         style={{
//           backgroundImage: `
//             linear-gradient(to right, #22d3ee 1px, transparent 1px),
//             linear-gradient(to bottom, #22d3ee 1px, transparent 1px)
//           `,
//           backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
//           maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
//         }}
//       />

//       {/* Scan line sweep - uses .animate-scan / @keyframes scan-line in globals.css */}
//       {!reduceMotion && (
//         <div
//           className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
//           aria-hidden
//         >
//           <div className="animate-scan absolute left-0 right-0 h-[min(28vh,200px)] w-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
//         </div>
//       )}

//       {/* 2. Reactive Grid Square (Cyan fill like the lime one in the image) */}
//       {!reduceMotion && activeSquare && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="pointer-events-none absolute bg-cyan-400"
//           style={{
//             width: GRID_SIZE,
//             height: GRID_SIZE,
//             left: activeSquare.x,
//             top: activeSquare.y,
//             boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
//             zIndex: 1
//           }}
//         />
//       )}

//       {/* 3. Background Glows (Keeping your brand blues/cyans) */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full" />
//         <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full" />
//       </div>

//       <motion.div
//         style={{ y, opacity }}
//         className="container relative z-10 mx-auto px-6 text-center"
//       >
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="mx-auto max-w-4xl"
//         >
//           {/* Badge */}
//           <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-cyan-300 uppercase mb-8">
//             ICT solutions provider · Ghana
//           </span>

//           {/* Heading */}
//           <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
//             Website & Mobile App <br />
//             <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
//               Development
//             </span>
//           </h1>

//           <p className="mx-auto mt-6 max-w-2xl text-slate-400 text-lg md:text-xl leading-relaxed">
//             We design and build websites and mobile apps with modern design and 
//             scalable technology to help your business thrive.
//           </p>

//           {/* Buttons */}
//           <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
//             <Link
//               href="/consultation"
//               className="group relative inline-flex min-w-[220px] items-center justify-center overflow-hidden rounded-xl bg-cyan-500 px-8 py-4 font-bold text-black transition-all hover:bg-cyan-400"
//             >
//               Get Free Consultation
//             </Link>

//             <Link
//               href="/portfolio"
//               className="inline-flex min-w-[220px] items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition hover:bg-white/10"
//             >
//               View Our Portfolio
//             </Link>
//           </div>
//         </motion.div>
//       </motion.div>

//       {/* Subtle Bottom Vignette */}
//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
//     </section>
//   );
// }

// "use client";
// import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
// import Link from "next/link";
// import { useRef, useState } from "react";

// const GRID_SIZE = 64; // Slightly smaller to feel more "tech"

// export function Hero() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [activeSquare, setActiveSquare] = useState<{ x: number; y: number } | null>(null);
//   const reduceMotion = useReducedMotion();

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
//   const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

//   const handleMouseMove = (event: React.MouseEvent) => {
//     const rect = event.currentTarget.getBoundingClientRect();
//     // Logic to "snap" the highlight to the grid cells
//     const x = Math.floor((event.clientX - rect.left) / GRID_SIZE) * GRID_SIZE;
//     const y = Math.floor((event.clientY - rect.top) / GRID_SIZE) * GRID_SIZE;
//     setActiveSquare({ x, y });
//   };

//   return (
//     <section
//       ref={containerRef}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={() => setActiveSquare(null)}
//       className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050508] pt-[120px] pb-24"
//     >
//       {/* Injected Styles: 
//         This adds your scan-line animation directly into the component 
//       */}
//       <style jsx global>{`
//         @keyframes scan-line {
//           0% { transform: translateY(100vh); }
//           100% { transform: translateY(-100vh); }
//         }
//         .animate-scan {
//           animation: scan-line 8s linear infinite;
//         }
//       `}</style>

//       {/* 1. The High-Contrast Grid (Inspired by the image layout) */}
//       <div 
//         className="pointer-events-none absolute inset-0 opacity-[0.15]"
//         style={{
//           backgroundImage: `
//             linear-gradient(to right, #22d3ee 1px, transparent 1px),
//             linear-gradient(to bottom, #22d3ee 1px, transparent 1px)
//           `,
//           backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
//           maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
//         }}
//       />

//       {/* Scan line sweep - uses .animate-scan defined above */}
//       {!reduceMotion && (
//         <div
//           className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
//           aria-hidden
//         >
//           <div className="animate-scan absolute left-0 right-0 h-[min(28vh,200px)] w-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
//         </div>
//       )}

//       {/* 2. Reactive Grid Square (Cyan fill like the lime one in the image) */}
//       {!reduceMotion && activeSquare && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="pointer-events-none absolute bg-cyan-400"
//           style={{
//             width: GRID_SIZE,
//             height: GRID_SIZE,
//             left: activeSquare.x,
//             top: activeSquare.y,
//             boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
//             zIndex: 2
//           }}
//         />
//       )}

//       {/* 3. Background Glows (Keeping your brand blues/cyans) */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full" />
//         <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full" />
//       </div>

//       <motion.div
//         style={{ y, opacity }}
//         className="container relative z-10 mx-auto px-6 text-center"
//       >
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="mx-auto max-w-4xl"
//         >
//           {/* Badge */}
//           <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-cyan-300 uppercase mb-8">
//             ICT solutions provider · Ghana
//           </span>

//           {/* Heading */}
//           <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
//             Website & Mobile App <br />
//             <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
//               Development
//             </span>
//           </h1>

//           <p className="mx-auto mt-6 max-w-2xl text-slate-400 text-lg md:text-xl leading-relaxed">
//             We design and build websites and mobile apps with modern design and 
//             scalable technology to help your business thrive.
//           </p>

//           {/* Buttons */}
//           <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
//             <Link
//               href="/consultation"
//               className="group relative inline-flex min-w-[220px] items-center justify-center overflow-hidden rounded-xl bg-cyan-500 px-8 py-4 font-bold text-black transition-all hover:bg-cyan-400"
//             >
//               Get Free Consultation
//             </Link>

//             <Link
//               href="/portfolio"
//               className="inline-flex min-w-[220px] items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition hover:bg-white/10"
//             >
//               View Our Portfolio
//             </Link>
//           </div>
//         </motion.div>
//       </motion.div>

//       {/* Subtle Bottom Vignette */}
//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
//     </section>
//   );
// }

// "use client";
// import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
// import Link from "next/link";
// import { useRef, useState } from "react";

// const GRID_SIZE = 64;

// export function Hero() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [activeSquare, setActiveSquare] = useState<{ x: number; y: number } | null>(null);
//   const reduceMotion = useReducedMotion();

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
//   const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

//   const handleMouseMove = (event: React.MouseEvent) => {
//     const rect = event.currentTarget.getBoundingClientRect();
//     const x = Math.floor((event.clientX - rect.left) / GRID_SIZE) * GRID_SIZE;
//     const y = Math.floor((event.clientY - rect.top) / GRID_SIZE) * GRID_SIZE;
//     setActiveSquare({ x, y });
//   };

//   return (
//     <section
//       ref={containerRef}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={() => setActiveSquare(null)}
//       className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050508] pt-[120px] pb-24"
//     >
//       <style jsx global>{`
//         @keyframes scan-move {
//           0% { transform: translateY(-100%); }
//           100% { transform: translateY(100vh); }
//         }
//         .animate-scan {
//           animation: scan-move 6s linear infinite;
//         }
//       `}</style>

//       {/* 1. The Base Dim Grid */}
//       <div 
//         className="pointer-events-none absolute inset-0 opacity-[0.1]"
//         style={{
//           backgroundImage: `
//             linear-gradient(to right, #22d3ee 1px, transparent 1px),
//             linear-gradient(to bottom, #22d3ee 1px, transparent 1px)
//           `,
//           backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
//           maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)'
//         }}
//       />

//       {/* 2. The Animated Scan Line (Lighting up the grid lines) */}
//       {!reduceMotion && (
//         <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
//           <div className="animate-scan absolute left-0 right-0 h-40 w-full">
//              {/* This inner div is the high-intensity grid that is revealed by the scan line */}
//              <div 
//                className="absolute inset-0 opacity-100"
//                style={{
//                  backgroundImage: `
//                    linear-gradient(to right, #22d3ee 2px, transparent 2px),
//                    linear-gradient(to bottom, #22d3ee 2px, transparent 2px)
//                  `,
//                  backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
//                  // The mask creates the "beam" shape that reveals this bright grid
//                  maskImage: 'linear-gradient(to bottom, transparent, white 50%, transparent)',
//                  WebkitMaskImage: 'linear-gradient(to bottom, transparent, white 50%, transparent)',
//                }}
//              />
//              {/* The glowing "edge" of the scan line */}
//              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
//           </div>
//         </div>
//       )}

//       {/* 3. Reactive Grid Square */}
//       {!reduceMotion && activeSquare && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="pointer-events-none absolute bg-cyan-400"
//           style={{
//             width: GRID_SIZE,
//             height: GRID_SIZE,
//             left: activeSquare.x,
//             top: activeSquare.y,
//             boxShadow: "0 0 30px rgba(34, 211, 238, 0.6)",
//             zIndex: 2
//           }}
//         />
//       )}

//       {/* 4. Background Glows */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full" />
//       </div>

//       <motion.div
//         style={{ y, opacity }}
//         className="container relative z-10 mx-auto px-6 text-center"
//       >
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="mx-auto max-w-4xl"
//         >
//           <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-cyan-300 uppercase mb-8">
//             ICT solutions provider · Ghana
//           </span>

//           <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
//             Website & Mobile App <br />
//             <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
//               Development
//             </span>
//           </h1>

//           <p className="mx-auto mt-6 max-w-2xl text-slate-400 text-lg md:text-xl">
//             We design and build websites and mobile apps with modern design and 
//             scalable technology to help your business thrive.
//           </p>

//           <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
//             <Link
//               href="/consultation"
//               className="group relative inline-flex min-w-[220px] items-center justify-center overflow-hidden rounded-xl bg-cyan-500 px-8 py-4 font-bold text-black transition-all hover:bg-cyan-400"
//             >
//               Get Free Consultation
//             </Link>

//             <Link
//               href="/portfolio"
//               className="inline-flex min-w-[220px] items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition hover:bg-white/10"
//             >
//               View Our Portfolio
//             </Link>
//           </div>
//         </motion.div>
//       </motion.div>

//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
//     </section>
//   );
// }

// "use client";
// import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
// import Link from "next/link";
// import { useRef, useState } from "react";

// const GRID_SIZE = 64;

// export function Hero() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [activeSquare, setActiveSquare] = useState<{ x: number; y: number } | null>(null);
//   const reduceMotion = useReducedMotion();

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
//   const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

//   const handleMouseMove = (event: React.MouseEvent) => {
//     const rect = event.currentTarget.getBoundingClientRect();
//     const x = Math.floor((event.clientX - rect.left) / GRID_SIZE) * GRID_SIZE;
//     const y = Math.floor((event.clientY - rect.top) / GRID_SIZE) * GRID_SIZE;
//     setActiveSquare({ x, y });
//   };

//   return (
//     <section
//       ref={containerRef}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={() => setActiveSquare(null)}
//       // Background set to #00000a
//       className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#00000a] pt-[120px] pb-24"
//     >
//       <style jsx global>{`
//         @keyframes scan-move {
//           0% { transform: translateY(-100%); }
//           100% { transform: translateY(100vh); }
//         }
//         .animate-scan {
//           animation: scan-move 7s linear infinite;
//         }
//       `}</style>

//       {/* 1. Base Grid - static white lines (stronger than scan overlay) */}
//       <div 
//         className="pointer-events-none absolute inset-0 z-0 opacity-100"
//         style={{
//           backgroundImage: `
//             linear-gradient(to right,rgba(36, 54, 113, 0.43), 1px, transparent 1px),
//             linear-gradient(to bottom,rgba(45, 60, 109, 0.43), 1px, transparent 1px)
//           `,
//           backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
//           maskImage:
//             "radial-gradient(ellipse 120% 100% at 50% 45%, black 55%, rgba(0,0,0,0.65) 78%, transparent 100%)",
//         }}
//       />

//       {/* 2. Scanning Beam - grid lines match white background grid */}
//       {!reduceMotion && (
//         <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
//           <div className="animate-scan absolute left-0 right-0 h-48 w-full">
//              <div 
//                className="absolute inset-0 opacity-100"
//                style={{
//                  backgroundImage: `
//                    linear-gradient(to right,rgba(12, 12, 154, 0.5); 1px, transparent 1px),
//                    linear-gradient(to bottom,rgba(15, 15, 143, 0.5); 1px, transparent 1px)
//                  `,
//                  backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
//                  maskImage: 'linear-gradient(to bottom, transparent, white 50%, transparent)',
//                  WebkitMaskImage: 'linear-gradient(to bottom, transparent, white 50%, transparent)',
//                }}
//              />
//              {/* Glowing leading edge of the scan beam */}
//              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/90 shadow-[0_0_18px_rgba(255,255,255,0.55)]" />
//           </div>
//         </div>
//       )}

//       {/* 3. Reactive Grid Square - white hover highlight */}
//       {!reduceMotion && activeSquare && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="pointer-events-none absolute bg-white"
//           style={{
//             width: GRID_SIZE,
//             height: GRID_SIZE,
//             left: activeSquare.x,
//             top: activeSquare.y,
//             // boxShadow: "0 0 28px rgba(255, 255, 255, 0.45)",
//             zIndex: 2
//           }}
//         />
//       )}

//       {/* 4. Background Ambient Glow - Using #00003280 */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00003280] blur-[150px] rounded-full" />
//       </div>

//       <motion.div
//         style={{ y, opacity }}
//         className="container relative z-10 mx-auto px-6 text-center"
//       >
//         <motion.div
//           initial={{ opacity: 0, scale: 0.98 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="mx-auto w-full max-w-4xl text-center"
//         >
//           {/* Badge using #143296cc */}
//           <span className="inline-block rounded-full border border-[#143296cc] bg-[#143296cc]/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-300 uppercase mb-8 backdrop-blur-md">
//             ICT solutions provider · Ghana
//           </span>

//           <h1 className="text-balance text-center text-5xl font-bold tracking-tight text-white md:text-7xl mb-6 leading-[1.1]">
//             Website & Mobile App <br />
//             <span className="bg-gradient-to-r from-blue-400 via-[#143296cc] to-blue-400 bg-clip-text text-transparent">
//               Development
//             </span>
//           </h1>

//           <p className="mx-auto mt-6 max-w-2xl text-center text-pretty text-slate-400 text-lg md:text-xl">
//             We design and build websites and mobile apps with modern design and 
//             scalable technology to help your business thrive.
//           </p>

//           <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
//             {/* BOOKING BUTTON with your specific brand gradient */}
//             <Link href="/contact">
//               <button className="min-w-[240px] border-2 border-[#143296cc] bg-gradient-to-t from-[#143296cc] to-[#00000a] py-4 px-8 text-white font-bold rounded-xl transition-all hover:brightness-125 active:scale-95 shadow-lg shadow-[#143296cc]/20">
//                 Book an appointment
//               </button>
//             </Link>

//             <Link
//               href="/portfolio"
//               className="min-w-[240px] inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition hover:bg-white/10"
//             >
//               View Our Portfolio
//             </Link>
//           </div>
//         </motion.div>
//       </motion.div>

//       {/* Bottom fade to deep dark blue #00000a */}
//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#00000a] via-transparent to-transparent" />
//     </section>
//   );
// }

"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";

const GRID_SIZE = 64;

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const heroText = getPageHeroMotionVariants(reduceMotion);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#00000a] pt-[120px] pb-24"
    >
      {/* 1. Base Static Grid - Subtle and dark */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(20, 50, 150, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20, 50, 150, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
          maskImage: "radial-gradient(circle at center, black 40%, transparent 90%)",
        }}
      />

      {/* 2. The Ripple Wave Animation */}
      {!reduceMotion && (
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <motion.div
            className="absolute inset-0"
            animate={{
              // This creates the "forward and backward" wave motion
              clipPath: [
                "circle(0% at 50% 50%)",   // Start small
                "circle(60% at 50% 50%)",  // Expand forward
                "circle(0% at 50% 50%)",   // Move backward (recede)
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              // This is the bright "Revealed" grid
              backgroundImage: `
                linear-gradient(to right, #143296 1px, transparent 1px),
                linear-gradient(to bottom, #143296 1px, transparent 1px)
              `,
              backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
            }}
          >
            {/* Adding an extra inner glow to the wave itself */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,50,150,0.15)_0%,transparent_70%)]" />
          </motion.div>
        </div>
      )}

      {/* 3. Ambient Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00003280] blur-[150px] rounded-full" />
      </div>

      {/* Content Layer */}
      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 mx-auto px-6"
      >
        <motion.div
          className="mx-auto w-full max-w-4xl text-center"
          initial="hidden"
          animate="visible"
          variants={heroText.container}
        >
          <motion.span
            variants={heroText.item}
            className="mb-8 inline-block rounded-full border border-[#143296cc] bg-[#143296cc]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300 backdrop-blur-md"
          >
            ICT solutions provider · Ghana
          </motion.span>

          <motion.h1
            variants={heroText.item}
            className="mb-6 text-balance text-center text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-7xl"
          >
            Website & Mobile App <br />
            <span className="bg-gradient-to-r from-blue-400 via-[#143296cc] to-blue-400 bg-clip-text text-transparent">
              Development
            </span>
          </motion.h1>

          <motion.p
            variants={heroText.item}
            className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg leading-relaxed text-slate-400 md:text-xl"
          >
            We design and build websites and mobile apps with modern design and
            scalable technology to help your business thrive.
          </motion.p>

          <motion.div
            variants={heroText.item}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/contact">
              <button className="min-w-[240px] rounded-xl border-2 border-[#143296cc] bg-gradient-to-t from-[#143296cc] to-[#00000a] px-8 py-4 font-bold text-white shadow-lg shadow-[#143296cc]/20 transition-all hover:brightness-125 active:scale-95">
                Book an appointment
              </button>
            </Link>

            <Link
              href="/portfolio"
              className="inline-flex min-w-[240px] items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition hover:bg-white/10"
            >
              View Our Portfolio
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Final Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#00000a] via-transparent to-transparent" />
    </section>
  );
}