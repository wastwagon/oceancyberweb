"use client";
import { motion } from "framer-motion";

export default function HealthcarePage() {
  const services = [
    { 
      title: "Electronic Health Records", 
      description: "Secure and efficient digital patient record management systems" 
    },
    { 
      title: "Telemedicine Platforms", 
      description: "Virtual healthcare solutions for remote patient consultations" 
    },
    { 
      title: "Medical Data Analytics", 
      description: "Advanced analytics for healthcare data insights and decision making" 
    },
    { 
      title: "Patient Management Systems", 
      description: "Comprehensive solutions for patient scheduling and care coordination" 
    },
    { 
      title: "Healthcare Mobile Apps", 
      description: "Mobile applications for patient engagement and health monitoring" 
    },
    { 
      title: "Medical Imaging Solutions", 
      description: "Digital imaging and diagnostic support systems" 
    }
  ];

  const technologies = [
    { name: "HIPAA Compliance", description: "Full regulatory compliance" },
    { name: "Cloud Healthcare", description: "Secure cloud-based solutions" },
    { name: "AI Diagnostics", description: "Artificial intelligence for medical insights" },
    { name: "IoT Integration", description: "Connected medical devices" },
    { name: "Data Encryption", description: "Advanced security protocols" },
    { name: "Real-time Monitoring", description: "Live patient data tracking" }
  ];

  const caseStudies = [
    {
      title: "Hospital Management System",
      client: "Regional Hospital",
      result: "Improved patient throughput by 40%"
    },
    {
      title: "Telemedicine Platform",
      client: "Healthcare Provider",
      result: "Served 10,000+ remote consultations"
    },
    {
      title: "Medical Records Digitization",
      client: "Clinic Network",
      result: "Reduced administrative costs by 60%"
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
                Healthcare
              </h1>
              <p className="text-xl md:text-2xl text-cyan-200/80 leading-relaxed mb-8">
                HIPAA-compliant healthcare technology solutions improving patient care and 
                operational efficiency across Ghana's healthcare sector.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-6 py-3 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-200 font-medium">
                  HIPAA Compliant
                </span>
                <span className="px-6 py-3 bg-teal-500/20 border border-teal-400/30 rounded-full text-teal-200 font-medium">
                  Patient-Centered
                </span>
                <span className="px-6 py-3 bg-ocean-500/20 border border-ocean-400/30 rounded-full text-ocean-200 font-medium">
                  Data Secure
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
            <h2 className="text-4xl font-bold text-cyan-100 mb-4">Our Healthcare Solutions</h2>
            <p className="text-cyan-200/80">Technology solutions designed for healthcare excellence</p>
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
            <p className="text-cyan-200/80">Advanced technologies for healthcare innovation</p>
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
            <p className="text-cyan-200/80">How we've improved healthcare delivery</p>
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
              Ready to Transform Healthcare Delivery?
            </h2>
            <p className="text-xl text-cyan-200/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              Let's implement cutting-edge healthcare technology solutions that improve 
              patient outcomes and streamline medical operations across Ghana.
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