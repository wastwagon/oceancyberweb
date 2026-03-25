"use client";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const services = [
    {
      title: "Web Development",
      description: "Modern, performant websites built with cutting-edge technologies and best practices that drive results.",
      image: "/images/Fitch Advisory.webp",
      technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
      features: ["SEO Optimized", "Mobile Responsive", "Fast Loading", "Secure"]
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform applications that deliver exceptional user experiences.",
      image: "/images/EGP Ghana.webp",
      technologies: ["React Native", "Flutter", "iOS", "Android"],
      features: ["Cross-Platform", "Native Performance", "Push Notifications", "Offline Support"]
    },
    {
      title: "E-Commerce",
      description: "Scalable online stores with seamless checkout and payment integrations.",
      image: "/images/Juelle Hair.webp",
      technologies: ["Shopify", "WooCommerce", "Custom Solutions", "Payment Gateways"],
      features: ["Secure Payments", "Inventory Management", "Customer Analytics", "Mobile Optimized"]
    },
    {
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your business from digital threats.",
      image: "/images/Fitch Attorney.webp",
      technologies: ["Security Audits", "Firewall Solutions", "Encryption", "Monitoring"],
      features: ["Threat Detection", "Data Protection", "Compliance", "Incident Response"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-900 via-cyan-900 to-teal-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-cyan-100 mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-cyan-200/80 max-w-4xl mx-auto leading-relaxed">
              Comprehensive digital solutions tailored to your business needs. From concept to deployment, 
              we deliver excellence across all our service offerings.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40"
              >
                <div className="relative overflow-hidden rounded-lg mb-6 group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <h3 className="text-2xl font-bold text-cyan-100 mb-4 group-hover:text-cyan-200 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-cyan-200/80 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-cyan-300 uppercase tracking-wide mb-3">
                      Technologies
                    </h4>
                    {service.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="flex items-center space-x-3 text-cyan-200/70 mb-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-cyan-300 uppercase tracking-wide mb-3">
                      Features
                    </h4>
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3 text-cyan-200/70 mb-2">
                        <div className="w-2 h-2 bg-teal-400 rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <a
                  href={`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-flex items-center text-cyan-300 font-medium hover:text-cyan-200 transition-colors"
                >
                  Learn more
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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-100 mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-cyan-200/80 mb-8 leading-relaxed">
              Whether you need a stunning website, mobile app, e-commerce solution, or comprehensive cybersecurity, 
              we have the expertise to bring your vision to life.
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-cyan-500 to-teal-500 text-ocean-900 font-bold py-4 px-8 rounded-full text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}