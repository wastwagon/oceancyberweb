"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowRight, TrendingUp, Code2, Smartphone, Building2 } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Fitch Attorneys",
    category: "Legal Services",
    description: "Modern legal services platform with client portal and responsive design that increased client inquiries by 150%.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    gradient: "from-ocean-500 to-cyan-500",
    icon: Building2,
    featured: true,
    metrics: { increase: "150%", metric: "Client Inquiries" },
    year: "2024",
  },
  {
    title: "Bravia Residency",
    category: "Real Estate",
    description: "Luxury property showcase with interactive galleries and virtual tours driving premium leads.",
    tech: ["React", "Three.js", "GSAP"],
    gradient: "from-teal-500 to-cyan-500",
    icon: Smartphone,
    featured: true,
    metrics: { increase: "200%", metric: "Lead Generation" },
    year: "2024",
  },
  {
    title: "Euroworld Projects",
    category: "Construction",
    description: "Corporate platform with portfolio showcase and project management streamlining operations.",
    tech: ["Next.js", "Prisma", "PostgreSQL"],
    gradient: "from-cyan-500 to-ocean-500",
    icon: Code2,
    featured: false,
    metrics: { increase: "85%", metric: "Efficiency" },
    year: "2023",
  },
];

export function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="portfolio" className="py-32 bg-gradient-to-b from-ocean-900 via-ocean-800 to-ocean-900 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,188,212,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,188,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <motion.div style={{ opacity }} className="container mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24"
        >
          <div className="max-w-7xl mx-auto">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 backdrop-blur-xl border border-cyan-400/30 rounded-full text-sm font-medium text-cyan-200 mb-6 tracking-wide"
            >
              <TrendingUp className="w-4 h-4" />
              Featured Projects
            </motion.span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 tracking-tight leading-tight">
              Our Work
            </h2>
            <p className="text-xl text-cyan-100/70 max-w-2xl font-light leading-relaxed">
              Showcasing transformative digital solutions that drive real business results
            </p>
          </div>
        </motion.div>

        {/* Editorial/Magazine Style Layout - No Cards */}
        <div className="max-w-7xl mx-auto space-y-32">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 80 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Project Number */}
                <div className="absolute -left-8 md:-left-16 top-0 hidden md:block">
                  <div className="text-8xl font-black text-cyan-500/10 leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Split Layout - Alternating Sides */}
                <div className={`grid md:grid-cols-2 gap-12 items-center ${isEven ? "" : "md:grid-flow-dense"}`}>
                  {/* Image/Visual Area - Left or Right */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.1 }}
                    className={`relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl ${isEven ? "md:order-1" : "md:order-2"}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
                    </div>
                    
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.1)_49%,rgba(255,255,255,0.1)_51%,transparent_52%)] bg-[length:40px_40px]" />
                    </div>

                    {/* Large Project Initial */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0.2 }}
                        whileInView={{ scale: 1, opacity: 0.3 }}
                        viewport={{ once: true }}
                        className="text-[200px] md:text-[300px] font-black text-white/20 leading-none"
                      >
                        {project.title.charAt(0)}
                      </motion.div>
                    </div>

                    {/* Hover Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-ocean-900/95 backdrop-blur-md flex items-center justify-center"
                    >
                      <Link
                        href="#"
                        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-transform shadow-2xl"
                      >
                        View Live Site
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    </motion.div>

                    {/* Year Badge */}
                    <div className="absolute top-6 left-6 px-4 py-2 bg-ocean-900/80 backdrop-blur-sm border border-cyan-400/30 rounded-full">
                      <span className="text-sm font-semibold text-cyan-300">{project.year}</span>
                    </div>
                  </motion.div>

                  {/* Content Area - Right or Left */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 50 : -50 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
                    className={`space-y-6 ${isEven ? "md:order-2" : "md:order-1"}`}
                  >
                    {/* Category & Icon */}
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-cyan-300 uppercase tracking-wider">
                          {project.category}
                        </div>
                        {project.featured && (
                          <div className="text-xs text-cyan-400/70 mt-1">Featured Project</div>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-4xl md:text-5xl font-bold text-cyan-100 leading-tight">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-cyan-200/80 leading-relaxed max-w-xl">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    {project.metrics && (
                      <div className="flex items-center gap-6 py-6 border-t border-cyan-400/20">
                        <div>
                          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">
                            {project.metrics.increase}
                          </div>
                          <div className="text-sm text-cyan-300/70 mt-1">{project.metrics.metric}</div>
                        </div>
                        <div className="h-12 w-px bg-cyan-400/20" />
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-400/20 text-cyan-200 text-xs font-medium rounded-lg"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="pt-4">
                      <Link
                        href="#"
                        className="inline-flex items-center gap-2 text-cyan-200 font-semibold hover:text-cyan-100 transition-colors group"
                      >
                        View Case Study
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                </div>

                {/* Divider Line */}
                {index < projects.length - 1 && (
                  <div className="absolute -bottom-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8 }}
          className="mt-32 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-cyan-100 mb-4">
              Ready to see your project featured here?
            </h3>
            <p className="text-cyan-200/70 mb-8 font-light">
              Let&apos;s create something amazing together
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
