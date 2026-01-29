"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code2,
  Smartphone,
  ShoppingBag,
  Search,
  Shield,
  Cloud,
  Network,
  Sparkles,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Modern, performant websites built with cutting-edge technologies and best practices that drive results.",
    features: ["Next.js", "TypeScript", "Performance"],
    gradient: "from-ocean-500/40 to-cyan-500/40",
    borderGradient: "from-ocean-400/60 to-cyan-400/60",
    iconGradient: "from-ocean-400 to-cyan-400",
    size: "featured",
    highlight: "Full-Stack Excellence",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform applications that deliver exceptional user experiences.",
    features: ["React Native", "Flutter"],
    gradient: "from-teal-500/30 to-cyan-500/30",
    borderGradient: "from-teal-400/50 to-cyan-400/50",
    iconGradient: "from-teal-400 to-cyan-400",
    size: "medium",
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce",
    description: "Scalable online stores with seamless checkout and payment integrations.",
    features: ["Shopify", "WooCommerce"],
    gradient: "from-cyan-500/30 to-teal-500/30",
    borderGradient: "from-cyan-400/50 to-teal-400/50",
    iconGradient: "from-cyan-400 to-teal-400",
    size: "medium",
  },
  {
    icon: Search,
    title: "SEO & Marketing",
    description: "Data-driven strategies that increase visibility and drive qualified traffic to your business.",
    features: ["Local SEO", "Content"],
    gradient: "from-ocean-400/30 to-teal-500/30",
    borderGradient: "from-ocean-300/50 to-teal-400/50",
    iconGradient: "from-ocean-300 to-teal-400",
    size: "small",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your business from digital threats.",
    features: ["Audits", "Protection"],
    gradient: "from-ocean-600/30 to-cyan-600/30",
    borderGradient: "from-ocean-500/50 to-cyan-500/50",
    iconGradient: "from-ocean-500 to-cyan-500",
    size: "small",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Scalable infrastructure and cloud migration services for modern businesses.",
    features: ["AWS", "Azure"],
    gradient: "from-cyan-500/30 to-ocean-500/30",
    borderGradient: "from-cyan-400/50 to-ocean-400/50",
    iconGradient: "from-cyan-400 to-ocean-400",
    size: "small",
  },
  {
    icon: Network,
    title: "Networking",
    description: "Robust network infrastructure ensuring reliable and secure connectivity.",
    features: ["Design", "Support"],
    gradient: "from-teal-500/30 to-ocean-500/30",
    borderGradient: "from-teal-400/50 to-ocean-400/50",
    iconGradient: "from-teal-400 to-ocean-400",
    size: "small",
  },
  {
    icon: Sparkles,
    title: "Custom Software",
    description: "Tailored solutions that automate processes and drive operational efficiency.",
    features: ["APIs", "Integration"],
    gradient: "from-cyan-400/30 to-teal-400/30",
    borderGradient: "from-cyan-300/50 to-teal-300/50",
    iconGradient: "from-cyan-300 to-teal-300",
    size: "medium",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const Icon = service.icon;

  if (service.size === "featured") {
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="md:col-span-2 md:row-span-2 group relative"
      >
        <div className="relative h-full p-10 bg-gradient-to-br from-ocean-900/90 to-ocean-800/90 backdrop-blur-xl border-2 border-cyan-400/30 rounded-[2rem] hover:border-cyan-400/60 transition-all duration-500 overflow-hidden">
          {/* Animated gradient background */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
            animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Border glow effect */}
          <motion.div
            className={`absolute -inset-[2px] bg-gradient-to-br ${service.borderGradient} rounded-[2rem] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10`}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Top section */}
            <div className="flex items-start justify-between mb-8">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.iconGradient} flex items-center justify-center shadow-2xl shadow-cyan-500/30`}
              >
                <Icon className="w-10 h-10 text-white" />
              </motion.div>
              <div className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full backdrop-blur-sm">
                <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                  {service.highlight}
                </span>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <h3 className="text-4xl md:text-5xl font-bold text-cyan-100 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:to-teal-200 group-hover:bg-clip-text transition-all duration-300">
                {service.title}
              </h3>
              <p className="text-cyan-200/80 mb-8 leading-relaxed text-lg max-w-2xl">
                {service.description}
              </p>

              {/* Features grid */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {service.features.map((feature) => (
                  <div
                    key={feature}
                    className="px-4 py-3 bg-cyan-500/10 border border-cyan-400/20 text-cyan-200 text-sm font-medium rounded-xl backdrop-blur-sm hover:bg-cyan-500/20 transition-colors"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href={`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-flex items-center gap-3 text-cyan-100 font-semibold text-lg group-hover:text-cyan-50 transition-colors"
            >
              Explore Service
              <ArrowUpRight className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </Link>
          </div>

          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            style={{ skewX: -20 }}
          />

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/10 transition-colors" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative ${
        service.size === "medium" ? "md:col-span-1 md:row-span-1" : "md:col-span-1 md:row-span-1"
      }`}
    >
      <div className="relative h-full p-8 bg-gradient-to-br from-ocean-900/80 to-ocean-800/80 backdrop-blur-xl border border-cyan-400/20 rounded-2xl hover:border-cyan-400/50 transition-all duration-500 overflow-hidden">
        {/* Gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Border glow */}
        <motion.div
          className={`absolute -inset-[1px] bg-gradient-to-br ${service.borderGradient} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10`}
        />

        {/* Content */}
        <div className="relative z-10">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.iconGradient} flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20`}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          <h3 className="text-2xl font-bold text-cyan-100 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:to-teal-200 group-hover:bg-clip-text transition-all duration-300">
            {service.title}
          </h3>

          <p className="text-cyan-200/70 mb-6 leading-relaxed text-sm">{service.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {service.features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-400/20 text-cyan-200 text-xs font-medium rounded-lg backdrop-blur-sm"
              >
                {feature}
              </span>
            ))}
          </div>

          <Link
            href={`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
            className="inline-flex items-center gap-2 text-cyan-200 font-medium text-sm group-hover:text-cyan-100 transition-colors"
          >
            Learn more
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          style={{ skewX: -20 }}
        />
      </div>
    </motion.div>
  );
}

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="services" className="py-32 bg-gradient-to-b from-ocean-900 via-ocean-800 to-ocean-900 relative overflow-hidden">
      {/* Ocean depth effect with animated particles */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,188,212,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,188,212,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-400/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-7xl mx-auto">
            <div className="flex-1">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 backdrop-blur-xl border border-cyan-400/30 rounded-full text-sm font-medium text-cyan-200 mb-6 tracking-wide"
              >
                <Zap className="w-4 h-4" />
                Our Services
              </motion.span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 tracking-tight leading-tight">
                What We Build
              </h2>
              <p className="text-xl text-cyan-100/70 max-w-2xl font-light leading-relaxed">
                Comprehensive digital solutions tailored to your business needs. From concept to deployment, we deliver excellence.
              </p>
            </div>
            <div className="md:text-right">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/10 border border-cyan-400/30 rounded-full backdrop-blur-sm">
                <span className="text-3xl font-bold text-cyan-300">8+</span>
                <span className="text-cyan-200/70 text-sm">Services</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modern asymmetric grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-6 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-400/30 rounded-2xl backdrop-blur-xl">
            <span className="text-cyan-200/80 font-light">Need something custom?</span>
            <Link
              href="/contact"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full font-semibold hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
