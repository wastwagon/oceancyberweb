"use client";
import { motion } from "framer-motion";

export default function FinancialServicesPage() {
  const services = [
    { 
      title: "Digital Banking Platforms", 
      description: "Modern online banking solutions with seamless user experience" 
    },
    { 
      title: "Payment Gateway Integration", 
      description: "Secure and reliable payment processing systems" 
    },
    { 
      title: "Fraud Detection Systems", 
      description: "Advanced AI-powered fraud prevention and detection" 
    },
    { 
      title: "Compliance Solutions", 
      description: "Regulatory compliance and reporting automation" 
    },
    { 
      title: "Mobile Banking Apps", 
      description: "Native mobile applications for on-the-go banking" 
    },
    { 
      title: "Risk Management Systems", 
      description: "Comprehensive risk assessment and management tools" 
    }
  ];

  const technologies = [
    { name: "Blockchain", description: "Secure transaction ledgers" },
    { name: "AI/ML", description: "Fraud detection and analytics" },
    { name: "API Integration", description: "Seamless system connectivity" },
    { name: "Cloud Security", description: "Enterprise-grade protection" },
    { name: "Biometric Authentication", description: "Advanced user verification" },
    { name: "Real-time Analytics", description: "Instant data insights" }
  ];

  const caseStudies = [
    {
      title: "Mobile Banking Transformation",
      client: "Regional Bank",
      result: "Increased digital transactions by 300%"
    },
    {
      title: "Fraud Prevention System",
      client: "Payment Processor",
      result: "Reduced fraudulent transactions by 95%"
    },
    {
      title: "Compliance Automation",
      client: "Financial Institution",
      result: "Cut compliance reporting time by 80%"
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
                Financial Services
              </h1>
              <p className="text-xl md:text-2xl text-cyan-200/80 leading-relaxed mb-8">
                Secure banking solutions and fintech innovations tailored for Ghana's growing 
                financial sector, ensuring compliance and driving digital transformation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-6 py-3 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-200 font-medium">
                  Secure & Compliant
                </span>
                <span className="px-6 py-3 bg-teal-500/20 border border-teal-400/30 rounded-full text-teal-200 font-medium">
                  Fintech Innovation
                </span>
                <span className="px-6 py-3 bg-ocean-500/20 border border-ocean-400/30 rounded-full text-ocean-200 font-medium">
                  Digital Banking
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
            <h2 className="text-4xl font-bold text-cyan-100 mb-4">Our Financial Services</h2>
            <p className="text-cyan-200/80">Comprehensive technology solutions for the financial industry</p>
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
            <p className="text-cyan-200/80">Cutting-edge technologies for financial innovation</p>
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
            <p className="text-cyan-200/80">How we've transformed financial institutions</p>
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
              Ready to Transform Your Financial Services?
            </h2>
            <p className="text-xl text-cyan-200/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              Let's build secure, innovative financial solutions that drive growth and 
              enhance customer experience in Ghana's dynamic market.
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