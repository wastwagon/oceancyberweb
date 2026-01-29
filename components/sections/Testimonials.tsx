"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "John Mensah",
    company: "Fitch Attorneys",
    role: "Managing Partner",
    content: "OceanCyber transformed our online presence completely. The new website has significantly increased our client inquiries and improved our professional image.",
    rating: 5,
    gradient: "from-ocean-500/30 to-cyan-500/30",
    borderGradient: "from-ocean-400/40 to-cyan-400/40",
  },
  {
    name: "Sarah Adjei",
    company: "Bravia Residency",
    role: "Marketing Director",
    content: "Working with OceanCyber was a game-changer. Their attention to detail and understanding of our business needs exceeded our expectations.",
    rating: 5,
    gradient: "from-teal-500/30 to-cyan-500/30",
    borderGradient: "from-teal-400/40 to-cyan-400/40",
  },
  {
    name: "Kwame Asante",
    company: "Euroworld Projects",
    role: "CEO",
    content: "The team at OceanCyber delivered exactly what they promised. Our website now reflects the quality of our construction projects perfectly.",
    rating: 5,
    gradient: "from-cyan-500/30 to-ocean-500/30",
    borderGradient: "from-cyan-400/40 to-ocean-400/40",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="testimonials" className="py-32 bg-gradient-to-b from-cyan-50 via-teal-50 to-ocean-50 relative overflow-hidden">
      {/* Wave pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-ocean-200/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                className="inline-block px-5 py-2.5 bg-cyan-100 border border-cyan-200 rounded-full text-sm font-medium text-cyan-700 mb-6 tracking-wide"
              >
                Client Stories
              </motion.span>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-ocean-600 to-cyan-600 tracking-tight">
                What Clients Say
              </h2>
            </div>
            <p className="text-xl text-ocean-600/70 max-w-md font-light md:text-right">
              98% satisfaction rate — See why businesses across Ghana trust us
            </p>
          </div>
        </motion.div>

        {/* Creative asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -2 : 2 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative p-8 bg-white/80 backdrop-blur-sm border border-cyan-200/50 rounded-3xl hover:border-cyan-300 hover:bg-white transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl ${
                index === 1 ? "md:mt-8" : ""
              }`}
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Border glow */}
              <motion.div
                className={`absolute -inset-[1px] bg-gradient-to-br ${testimonial.borderGradient} rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10`}
              />

              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote className="w-16 h-16 text-ocean-600" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-cyan-400 text-cyan-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-ocean-700 mb-8 leading-relaxed text-sm relative z-10">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-cyan-200/50">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${testimonial.gradient.replace("/30", "/40")} flex items-center justify-center text-white font-semibold text-lg shadow-lg`}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-ocean-900">{testimonial.name}</div>
                    <div className="text-sm text-ocean-600/70 font-light">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
