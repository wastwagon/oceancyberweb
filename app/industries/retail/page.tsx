"use client";
import { motion } from "framer-motion";

export default function RetailPage() {
  const services = [
    { 
      title: "E-commerce Solutions", 
      description: "Complete online stores with seamless shopping experiences" 
    },
    { 
      title: "Retail Technology", 
      description: "In-store technology solutions for enhanced customer experience" 
    },
    { 
      title: "Customer Engagement", 
      description: "Tools to boost customer interaction and loyalty" 
    },
    { 
      title: "Inventory Management", 
      description: "Real-time stock tracking and management systems" 
    },
    { 
      title: "Payment Processing", 
      description: "Secure and convenient payment solutions" 
    },
    { 
      title: "Analytics & Insights", 
      description: "Data-driven insights for retail optimization" 
    }
  ];

  const technologies = [
    { name: "Omnichannel Platforms", description: "Unified shopping experience" },
    { name: "Mobile Commerce", description: "Mobile-optimized shopping" },
    { name: "AI Recommendations", description: "Personalized product suggestions" },
    { name: "Inventory Systems", description: "Smart stock management" },
    { name: "Customer Analytics", description: "Behavioral insights" },
    { name: "Payment Gateways", description: "Multiple payment options" }
  ];

  const caseStudies = [
    {
      title: "E-commerce Store Launch",
      client: "Fashion Retailer",
      result: "Increased online sales by 250% in 6 months"
    },
    {
      title: "Retail POS System",
      client: "Store Chain",
      result: "Improved checkout efficiency by 60%"
    },
    {
      title: "Customer Loyalty Program",
      client: "Supermarket",
      result: "Increased customer retention by 45%"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-900 via-cyan-900 to-teal-900">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-cyan-100 mb-8">
                Retail & E-commerce
              </h1>
              <p className="text-xl md:text-2xl text-cyan-200/80 leading-relaxed mb-8">
                Cutting-edge e-commerce solutions and retail technology to boost online sales 
                and customer engagement across Ghana and Africa.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-6 py-3 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-200 font-medium">
                  Online Sales Growth
                </span>
                <span className="px-6 py-3 bg-teal-500/20 border border-teal-400/30 rounded-full text-teal-200 font-medium">
                  Customer Experience
                </span>
                <span className="px-6 py-3 bg-ocean-500/20 border border-ocean-400/30 rounded-full text-ocean-200 font-medium">
                  Retail Innovation
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-cyan-100 mb-4">Our Retail Solutions</h2>
            <p className="text-cyan-200/80">Technology solutions for retail success</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40"
              >
                <h3 className="text-xl font-semibold text-cyan-100 mb-4">{service.title}</h3>
                <p className="text-cyan-200/80 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/5 to-teal-500/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-cyan-100 mb-4">Technologies We Use</h2>
            <p className="text-cyan-200/80">Modern technologies for retail innovation</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40"
              >
                <h3 className="text-xl font-semibold text-cyan-100 mb-4">{tech.name}</h3>
                <p className="text-cyan-200/80 leading-relaxed">{tech.description}</p>
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
            <h2 className="text-4xl font-bold text-cyan-100 mb-4">Success Stories</h2>
            <p className="text-cyan-200/80">How we've boosted retail businesses</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40"
              >
                <h3 className="text-xl font-semibold text-cyan-100 mb-4">{study.title}</h3>
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
              Ready to Boost Your Retail Business?
            </h2>
            <p className="text-xl text-cyan-200/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              Let's implement cutting-edge retail technology solutions that increase 
              sales, enhance customer experience, and drive growth for your business.
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