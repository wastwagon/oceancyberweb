"use client";
import { motion } from "framer-motion";

export default function WebDevelopmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-900 via-cyan-900 to-teal-900">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h1 className="text-5xl md:text-7xl font-bold text-cyan-100 mb-6">
                  Web Development
                </h1>
                <p className="text-xl md:text-2xl text-cyan-200/80 leading-relaxed mb-8">
                  Modern, performant websites built with cutting-edge technologies and best practices that drive results.
                </p>
                <motion.a
                  href="/contact"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="inline-block bg-gradient-to-r from-cyan-500 to-teal-500 text-ocean-900 font-bold py-4 px-8 rounded-full text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  Start a Project
                </motion.a>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/30"
              >
                <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full mx-auto mb-4"></div>
                    <p className="text-cyan-200/70 text-sm">Website Preview</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-cyan-100 mb-4">Technologies We Use</h2>
            <p className="text-cyan-200/80">Cutting-edge tools and frameworks for modern web development</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Next.js", description: "React framework for production" },
              { name: "TypeScript", description: "Type-safe JavaScript" },
              { name: "React", description: "UI library for building interfaces" },
              { name: "Tailwind CSS", description: "Utility-first CSS framework" },
              { name: "Node.js", description: "JavaScript runtime" },
              { name: "Vercel", description: "Deployment platform" }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40"
              >
                <h3 className="text-xl font-semibold text-cyan-100 mb-2">{tech.name}</h3>
                <p className="text-cyan-200/70">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/5 to-teal-500/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-cyan-100 mb-4">What We Deliver</h2>
            <p className="text-cyan-200/80">Comprehensive web solutions with attention to every detail</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "SEO Optimized", description: "Built with search engine optimization in mind" },
              { title: "Mobile Responsive", description: "Perfect experience on all devices" },
              { title: "Fast Loading", description: "Optimized for speed and performance" },
              { title: "Secure", description: "Built with security best practices" },
              { title: "Scalable", description: "Grows with your business needs" },
              { title: "Accessible", description: "Inclusive design for all users" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-cyan-100 mb-3">{feature.title}</h3>
                <p className="text-cyan-200/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-cyan-100 mb-4">Recent Projects</h2>
            <p className="text-cyan-200/80">See how we've helped businesses achieve their goals</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Platform",
                client: "Retail Client",
                result: "Increased conversions by 150%"
              },
              {
                title: "Corporate Website",
                client: "Financial Services",
                result: "Improved user engagement by 80%"
              },
              {
                title: "Portfolio Showcase",
                client: "Creative Agency",
                result: "Generated 200+ new leads"
              }
            ].map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40"
              >
                <h3 className="text-xl font-semibold text-cyan-100 mb-2">{study.title}</h3>
                <p className="text-cyan-300 mb-4 font-medium">{study.client}</p>
                <p className="text-cyan-200/80 mb-6">{study.result}</p>
                <a
                  href="/portfolio"
                  className="inline-flex items-center text-cyan-300 font-medium hover:text-cyan-200 transition-colors"
                >
                  View Project
                  <span className="ml-2">→</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/10 to-teal-500/10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-100 mb-6">
              Ready to Build Your Website?
            </h2>
            <p className="text-xl text-cyan-200/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              Let's create a website that not only looks amazing but also drives results for your business. 
              Contact us today to discuss your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block bg-gradient-to-r from-cyan-500 to-teal-500 text-ocean-900 font-bold py-4 px-8 rounded-full text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Get Started
              </a>
              <a
                href="/portfolio"
                className="inline-block border-2 border-cyan-400/50 text-cyan-200 font-bold py-4 px-8 rounded-full hover:bg-cyan-400/10 hover:border-cyan-400/70 transition-all duration-300"
              >
                View Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
