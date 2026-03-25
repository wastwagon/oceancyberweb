"use client";
import { motion } from 'framer-motion';

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Marcus Owusu",
      role: "Founder & CEO",
      image: "/images/EGP Ghana.webp",
      bio: "Technology visionary with 15+ years of experience in digital transformation and cybersecurity solutions across Africa.",
      expertise: ["Strategic Leadership", "Digital Transformation", "Cybersecurity", "Business Development"]
    },
    {
      name: "Sarah Mensah",
      role: "CTO & Lead Architect",
      image: "/images/Fitch Advisory.webp",
      bio: "Software architect specializing in scalable cloud solutions and cutting-edge technologies for enterprise applications.",
      expertise: ["Cloud Architecture", "DevOps", "AI/ML", "System Design"]
    },
    {
      name: "Kwame Nkrumah",
      role: "Head of Security",
      image: "/images/Juelle Hair.webp",
      bio: "Certified cybersecurity expert dedicated to protecting businesses from evolving digital threats.",
      expertise: ["Security Auditing", "Incident Response", "Compliance", "Risk Management"]
    },
    {
      name: "Ama Serwaa",
      role: "Creative Director",
      image: "/images/Tour World Tourism.webp",
      bio: "Award-winning designer passionate about creating user experiences that blend beauty with functionality.",
      expertise: ["UI/UX Design", "Brand Identity", "Digital Marketing", "User Research"]
    }
  ];

  const milestones = [
    { year: "2018", title: "Company Founded", description: "OceanCyber established in Accra, Ghana" },
    { year: "2019", title: "First Major Client", description: "Secured our first enterprise client in the financial sector" },
    { year: "2020", title: "Team Expansion", description: "Grew from 5 to 25 team members across multiple African countries" },
    { year: "2021", title: "Award Recognition", description: "Recognized as Top Tech Company in West Africa" },
    { year: "2022", title: "International Expansion", description: "Opened offices in Nigeria and Kenya" },
    { year: "2023", title: "100+ Clients", description: "Successfully served 100+ businesses across various industries" },
    { year: "2024", title: "Innovation Lab", description: "Launched R&D lab focusing on AI and blockchain technologies" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-900 via-cyan-900 to-teal-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-cyan-100 mb-6">
              About OceanCyber
            </h1>
            <p className="text-xl md:text-2xl text-cyan-200/80 max-w-4xl mx-auto leading-relaxed">
              Pioneering digital transformation and cybersecurity solutions across Africa, 
              empowering businesses to thrive in the digital age with innovative technology and unwavering commitment to excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-cyan-100 mb-8">Our Mission</h2>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-cyan-400/20">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-ocean-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-100 mb-2">Innovation</h3>
                      <p className="text-cyan-200/80 leading-relaxed">
                        We continuously push the boundaries of technology to deliver cutting-edge solutions 
                        that keep our clients ahead of the curve in an ever-evolving digital landscape.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-cyan-400/20">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-ocean-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-100 mb-2">Excellence</h3>
                      <p className="text-cyan-200/80 leading-relaxed">
                        We are committed to delivering the highest quality solutions, ensuring every project 
                        exceeds our clients' expectations and sets new standards in the industry.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-cyan-400/20">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-ocean-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-100 mb-2">Partnership</h3>
                      <p className="text-cyan-200/80 leading-relaxed">
                        We build lasting relationships with our clients, working as trusted partners 
                        to understand their unique challenges and deliver tailored solutions that drive success.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold text-cyan-100 mb-8">Our Vision</h2>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/20">
                <div className="relative">
                  <img 
                    src="/images/Africa Trade Chamber.webp" 
                    alt="OceanCyber Vision"
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/60 to-transparent rounded-lg" />
                </div>
                <h3 className="text-2xl font-bold text-cyan-100 mb-4">Leading Africa's Digital Future</h3>
                <p className="text-cyan-200/80 leading-relaxed mb-6">
                  We envision a digitally empowered Africa where businesses of all sizes can leverage 
                  cutting-edge technology to achieve their goals, drive innovation, and contribute 
                  to the continent's economic growth and global competitiveness.
                </p>
                <div className="grid grid-cols-2 gap-4 text-cyan-200/70">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span>100+ African Businesses Transformed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span>99.9% Client Satisfaction Rate</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span>15+ Countries Served</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span>24/7 Support Guarantee</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/10 to-teal-500/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-100 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto">
              Our diverse team of experts brings together decades of experience in technology, 
              security, and business strategy to deliver exceptional results for our clients.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-gradient-to-r from-cyan-500 to-teal-500 text-ocean-900 px-3 py-1 rounded-full text-sm font-semibold">
                      {member.role}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-cyan-100 mb-2">{member.name}</h3>
                  <p className="text-cyan-200/80 mb-4 leading-relaxed text-sm">
                    {member.bio}
                  </p>
                  <div className="space-y-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center space-x-3 text-cyan-200/70 bg-white/5 rounded-lg p-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-100 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto">
              From a small startup in Accra to a leading technology partner across Africa, 
              our journey has been marked by innovation, growth, and unwavering commitment to excellence.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-teal-400 transform -translate-x-1/2" />
            
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative ${index % 2 === 0 ? 'md:ml-24' : 'md:mr-24 md:ml-0'}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-ocean-900 shadow-lg z-10 transform -translate-x-1/2 -translate-y-2" />
                  
                  {/* Content Card */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-gradient-to-r from-cyan-500 to-teal-500 text-ocean-900 px-4 py-2 rounded-full font-semibold text-sm">
                        {milestone.year}
                      </span>
                      <span className="text-cyan-200/60 text-sm">Milestone</span>
                    </div>
                    <h3 className="text-2xl font-bold text-cyan-100 mb-3">{milestone.title}</h3>
                    <p className="text-cyan-200/80 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/10 to-teal-500/10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-100 mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-cyan-200/80 mb-8 leading-relaxed">
              Join hundreds of satisfied clients who have trusted OceanCyber to drive their 
              digital transformation and achieve remarkable results.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-cyan-500 to-teal-500 text-ocean-900 font-bold py-4 px-8 rounded-full text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              Get Started Today
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}