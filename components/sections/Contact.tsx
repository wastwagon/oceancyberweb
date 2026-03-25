"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WhatsAppButton } from "@/components/ghana-specific/WhatsAppButton";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="contact" className="py-32 bg-gradient-to-b from-blue-50-custom via-blue-100-custom to-blue-200-custom relative overflow-hidden">
      {/* Ocean wave layers */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-cyan-500/10 to-transparent"
          animate={{
            clipPath: [
              "polygon(0 0, 100% 0, 100% 20%, 0 15%)",
              "polygon(0 0, 100% 0, 100% 25%, 0 20%)",
              "polygon(0 0, 100% 0, 100% 20%, 0 15%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,188,212,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,188,212,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 backdrop-blur-xl border border-cyan-400/30 rounded-full text-sm font-medium text-[hsl(var(--text-light))] mb-6 tracking-wide"
            >
              Get In Touch
            </motion.span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 tracking-tight">
              Let's Build Something
              <br />
              <span className="text-[hsl(var(--text-light))]">Amazing Together</span>
            </h2>
            <p className="text-xl text-[hsl(var(--text-light))]/90 max-w-2xl mx-auto font-light">
              Ready to transform your digital presence? Let's discuss your project.
            </p>
          </motion.div>

        {/* Asymmetric split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info - left side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div>
              <h3 className="contact-heading">Contact Information</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Address",
                    content: "232 Nii Kwashiefio Avenue, Accra, Ghana",
                  },
                  {
                    title: "Phone",
                    content: "+233 242 565 695",
                    link: "tel:+233242565695",
                  },
                  {
                    title: "Email",
                    content: "info@oceancyber.net",
                    link: "mailto:info@oceancyber.net",
                  },
                ].map((item, index) => {
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="contact-info-item"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0">
                        <div className="w-5 h-5 text-cyan-300" />
                      </div>
                      <div>
                        <div className="contact-info-title">{item.title}</div>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="contact-info-link"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <div className="contact-info-content">{item.content}</div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4">
              <WhatsAppButton variant="outline" size="lg" className="w-full" />
            </div>
          </motion.div>

          {/* Contact Form - right side with offset */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:mt-12 bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-cyan-400/20"
          >
            <form className="space-y-6">
              <div className="form-field">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="form-input"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="form-input"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  placeholder="+233 XX XXX XXXX"
                  className="form-input"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Message</label>
                <textarea
                  placeholder="Tell us about your project..."
                  rows={5}
                  className="form-textarea"
                />
              </div>
              <button
                type="submit"
                className="form-submit-btn"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
