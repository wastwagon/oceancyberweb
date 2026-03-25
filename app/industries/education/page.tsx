"use client";
import { motion } from "framer-motion";

export default function EducationPage() {
  const services = [
    { 
      title: "Learning Management Systems", 
      description: "Comprehensive platforms for online course delivery and student management" 
    },
    { 
      title: "Virtual Classrooms", 
      description: "Interactive online learning environments with real-time collaboration" 
    },
    { 
      title: "Educational Apps", 
      description: "Mobile and web applications for enhanced learning experiences" 
    },
    { 
      title: "Student Analytics", 
      description: "Data-driven insights for tracking student progress and performance" 
    },
    { 
      title: "Content Management", 
      description: "Digital content creation and distribution platforms" 
    },
    { 
      title: "Assessment Tools", 
      description: "Online testing and evaluation systems with automated grading" 
    }
  ];

  const technologies = [
    { name: "E-learning Platforms", description: "Scalable learning environments" },
    { name: "Interactive Content", description: "Engaging multimedia materials" },
    { name: "AI Tutoring", description: "Personalized learning assistance" },
    { name: "Gamification", description: "Game-based learning elements" },
    { name: "Mobile Learning", description: "On-the-go educational access" },
    { name: "Data Analytics", description: "Learning insights and metrics" }
  ];

  const caseStudies = [
    {
      title: "University LMS Implementation",
      client: "Higher Education Institution",
      result: "Served 5,000+ students with improved engagement"
    },
    {
      title: "K-12 Virtual Classroom",
      client: "School District",
      result: "Enhanced remote learning for 2,000+ students"
    },
    {
      title: "Educational Mobile App",
      client: "EdTech Startup",
      result: "Reached 50,000+ downloads in first year"
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
                Education
              </h1>
              <p className="text-xl md:text-2xl text-cyan-200/80 leading-relaxed mb-8">
                Innovative e-learning platforms and educational technology transforming the future 
                of learning in Africa, making education accessible and engaging for all.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-6 py-3 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-200 font-medium">
                  Interactive Learning
                </span>
                <span className="px-6 py-3 bg-teal-500/20 border border-teal-400/30 rounded-full text-teal-200 font-medium">
                  Student Engagement
                </span>
                <span className="px-6 py-3 bg-ocean-500/20 border border-ocean-400/30 rounded-full text-ocean-200 font-medium">
                  Future Ready
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
            <h2 className="text-4xl font-bold text-cyan-100 mb-4">Our Educational Solutions</h2>
            <p className="text-cyan-200/80">Technology solutions for modern education</p>
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
            <p className="text-cyan-200/80">Innovative technologies for education</p>
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
            <p className="text-cyan-200/80">How we've transformed education</p>
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
              Ready to Transform Education?
            </h2>
            <p className="text-xl text-cyan-200/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              Let's create innovative educational technology solutions that empower 
              students and educators across Africa, making learning more accessible and effective.
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