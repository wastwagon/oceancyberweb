"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from '@/lib/data/case-studies';

interface CaseStudy {
  title: string;
  category: string;
  description: string;
  tech: string[];
  gradient: string;
  image: string;
  metrics?: {
    increase: string;
    metric: string;
  };
  year: string;
  client: string;
  challenge: string;
  solution: string;
  impact: string;
}

export function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="case-studies" className="py-32 bg-gradient-to-b from-cyan-50 via-cyan-100 to-cyan-200 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,188,212,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,188,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="container mx-auto px-6 md:px-8 relative z-10"
          >
            <div className="max-w-7xl mx-auto">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 backdrop-blur-xl border border-cyan-400/30 rounded-full text-sm font-medium text-white mb-6 tracking-wide"
              >
                Success Stories
              </motion.span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 tracking-tight leading-tight">
                Case Studies
              </h2>
              <p className="text-xl text-white/90 max-w-2xl font-light leading-relaxed">
                Real-world solutions that transformed businesses and delivered measurable results
              </p>
            </div>

        {/* Card-based Grid Layout */}
        <div className="max-w-7xl mx-auto mt-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => {
              return (
                <Link
                  key={study.title}
                  href={`/case-studies/${study.slug}`}
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group bg-gradient-to-br from-ocean-800/50 to-ocean-900/50 backdrop-blur-xl border border-cyan-400/20 rounded-2xl overflow-hidden hover:border-cyan-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:scale-105 cursor-pointer"
                  >
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-20`} />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
                      
                      {/* Project Image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={study.image}
                          alt={study.title}
                          fill
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                          priority={index < 3}
                        />
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-ocean-900/80 backdrop-blur-sm border border-cyan-400/30 rounded-full">
                        <span className="text-xs font-semibold text-cyan-300">{study.category}</span>
                      </div>

                      {/* Year Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-ocean-900/80 backdrop-blur-sm border border-cyan-400/30 rounded-full">
                        <span className="text-xs font-semibold text-cyan-300">{study.year}</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-4">
                      {/* Project Title and Client */}
                      <div>
                        <h3 className="text-xl font-bold text-cyan-100">{study.title}</h3>
                        <p className="text-sm text-cyan-300/70">{study.client}</p>
                      </div>


                      {/* Description */}
                      <p className="text-cyan-200/80 text-sm leading-relaxed">
                        {study.description}
                      </p>

                      {/* Metrics */}
                      {study.metrics && (
                        <div className="flex items-center gap-4 py-3 border-t border-cyan-400/20">
                          <div>
                            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">
                              {study.metrics.increase}
                            </div>
                            <div className="text-xs text-cyan-300/70 mt-1">{study.metrics.metric}</div>
                          </div>
                        </div>
                      )}

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {study.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-cyan-500/10 border border-cyan-400/20 text-cyan-200 text-xs font-medium rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex gap-3 pt-4">
                        <Link
                          href={`/case-studies/${study.slug}`}
                          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg font-semibold text-sm hover:scale-105 transition-all shadow-lg"
                        >
                          View Case Study
                        </Link>
                        <Link
                          href="#"
                          className="flex-1 px-4 py-2.5 border border-cyan-400/50 text-cyan-200 rounded-lg font-semibold text-sm hover:bg-cyan-500/10 transition-all"
                        >
                          View Live Site
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </Link>
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
                Ready to transform your business?
              </h3>
              <p className="text-cyan-200/70 mb-8 font-light">
                Let's create a success story for your organization
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
              >
                Start Your Project
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}