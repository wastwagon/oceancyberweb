"use client";
import { motion } from "framer-motion";

export default function IndustriesPage() {
  const industries = [
    {
      title: "Financial Services",
      description: "Secure banking solutions and fintech innovations tailored for Ghana's growing financial sector.",
      image: "/images/EGP Ghana.webp",
      services: ["Digital Banking Platforms", "Payment Gateway Integration", "Fraud Detection Systems", "Compliance Solutions"]
    },
    {
      title: "Healthcare",
      description: "HIPAA-compliant healthcare technology solutions improving patient care and operational efficiency.",
      image: "/images/Fitch Advisory.webp",
      services: ["Electronic Health Records", "Telemedicine Platforms", "Medical Data Analytics", "Patient Management Systems"]
    },
    {
      title: "Education",
      description: "Innovative e-learning platforms and educational technology transforming the future of learning in Africa.",
      image: "/images/Juelle Hair.webp",
      services: ["Learning Management Systems", "Virtual Classrooms", "Educational Apps", "Student Analytics"]
    },
    {
      title: "Tourism & Hospitality",
      description: "Complete digital solutions for hotels, tour operators, and travel agencies to enhance guest experiences.",
      image: "/images/Tour World Tourism.webp",
      services: ["Booking Systems", "Hotel Management Software", "Travel Apps", "Customer Experience Platforms"]
    },
    {
      title: "Retail & E-commerce",
      description: "Cutting-edge e-commerce solutions and retail technology to boost online sales and customer engagement.",
      image: "/images/Africa Trade Chamber.webp",
      services: ["E-commerce Platforms", "Inventory Management", "Customer Analytics", "Mobile Shopping Apps"]
    },
    {
      title: "Legal Services",
      description: "Advanced legal technology solutions streamlining case management and client services for law firms.",
      image: "/images/Fitch Attorney.webp",
      services: ["Case Management Systems", "Document Automation", "Client Portals", "Legal Analytics"]
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
              Industries We Serve
            </h1>
            <p className="text-xl md:text-2xl text-cyan-200/80 max-w-4xl mx-auto leading-relaxed">
              Empowering diverse industries across Ghana and Africa with cutting-edge technology solutions 
              tailored to meet the unique challenges and opportunities of each sector.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div
                key={industry.title}
                className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40"
              >
                <div className="relative overflow-hidden rounded-lg mb-6 group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={industry.image} 
                    alt={industry.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <h3 className="text-2xl font-bold text-cyan-100 mb-4 group-hover:text-cyan-200 transition-colors">
                  {industry.title}
                </h3>
                
                <p className="text-cyan-200/80 mb-6 leading-relaxed">
                  {industry.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-cyan-300 uppercase tracking-wide mb-3">
                    Our Services
                  </h4>
                  {industry.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="flex items-center space-x-3 text-cyan-200/70">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/10 to-teal-500/10">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-100 mb-6">
              Ready to Transform Your Industry?
            </h2>
            <p className="text-xl text-cyan-200/80 mb-8 leading-relaxed">
              Whether you're in finance, healthcare, education, or any other sector, 
              we have the expertise to help you leverage technology for growth and innovation.
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
