export default function SecurityJourneyPage() {
  const journeySteps = [
    {
      phase: "Assessment",
      title: "Security Audit & Risk Analysis",
      description: "Comprehensive evaluation of your current security posture, identifying vulnerabilities and potential threats specific to your industry.",
      features: [
        "Vulnerability scanning",
        "Risk assessment",
        "Compliance audit",
        "Security gap analysis"
      ]
    },
    {
      phase: "Planning",
      title: "Security Strategy Development",
      description: "Customized security roadmap designed to address your specific needs while aligning with industry best practices and regulatory requirements.",
      features: [
        "Security framework design",
        "Policy development",
        "Incident response planning",
        "Security architecture"
      ]
    },
    {
      phase: "Implementation",
      title: "Security Solution Deployment",
      description: "Professional implementation of security solutions with minimal disruption to your business operations.",
      features: [
        "Firewall configuration",
        "Endpoint protection",
        "Network security",
        "Access control systems"
      ]
    },
    {
      phase: "Monitoring",
      title: "Continuous Security Monitoring",
      description: "24/7 monitoring and threat detection to ensure your systems remain secure against evolving cyber threats.",
      features: [
        "Real-time threat detection",
        "Security event monitoring",
        "Log analysis",
        "Alert management"
      ]
    },
    {
      phase: "Response",
      title: "Incident Response & Recovery",
      description: "Rapid response to security incidents with proven recovery procedures to minimize impact and downtime.",
      features: [
        "Incident investigation",
        "Containment strategies",
        "Data recovery",
        "Post-incident analysis"
      ]
    },
    {
      phase: "Optimization",
      title: "Security Enhancement & Training",
      description: "Ongoing optimization of security measures and staff training to maintain robust protection against new threats.",
      features: [
        "Security awareness training",
        "Policy updates",
        "Technology upgrades",
        "Performance optimization"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-900 via-cyan-900 to-teal-900">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-100 mb-4">
              Your Security Journey
            </h1>
            <p className="text-base md:text-lg text-cyan-200/80 leading-relaxed">
              Navigate the path to comprehensive cybersecurity with our proven 6-phase approach, 
              designed to protect your business from evolving threats while ensuring compliance and operational excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-teal-400" />
            
            <div className="space-y-16">
              {journeySteps.map((step, index) => (
                <div
                  key={step.phase}
                  className={`relative ${index % 2 === 0 ? 'md:ml-24' : 'md:mr-24 md:ml-0'}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-cyan-400 rounded-full border-4 border-ocean-900 shadow-lg z-10" />
                  
                  {/* Content Card */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 hover:bg-white/20 transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40">
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                      <div>
                        <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                          <span className="bg-gradient-to-r from-cyan-500 to-teal-500 text-ocean-900 px-3 md:px-4 py-1.5 md:py-2 rounded-full font-semibold text-xs md:text-sm">
                            Phase {index + 1}
                          </span>
                          <h3 className="text-xl md:text-2xl font-bold text-cyan-100">{step.phase}</h3>
                        </div>
                        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-cyan-100 mb-3 md:mb-4 group-hover:text-cyan-200 transition-colors">
                          {step.title}
                        </h2>
                        <p className="text-cyan-200/80 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                          {step.description}
                        </p>
                        <div className="grid grid-cols-2 gap-2 md:gap-3">
                          {step.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2 md:space-x-3 text-cyan-200/70 bg-white/5 rounded-lg p-2">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                              <span className="text-xs md:text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Stats */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/10 to-teal-500/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-cyan-100 mb-6">
              Security by the Numbers
            </h2>
            <p className="text-lg text-cyan-200/80 max-w-3xl mx-auto">
              Our proven security approach delivers measurable results and peace of mind for businesses across Ghana and Africa.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/20">
              <div className="text-5xl font-bold text-cyan-400 mb-2">99.9%</div>
              <div className="text-cyan-200/80 text-lg">Uptime Guarantee</div>
              <p className="text-cyan-200/60 text-sm mt-2">Our security systems ensure maximum availability</p>
            </div>
            
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/20">
              <div className="text-5xl font-bold text-cyan-400 mb-2">24/7</div>
              <div className="text-cyan-200/80 text-lg">Monitoring</div>
              <p className="text-cyan-200/60 text-sm mt-2">Round-the-clock threat detection and response</p>
            </div>
            
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/20">
              <div className="text-5xl font-bold text-cyan-400 mb-2">60%</div>
              <div className="text-cyan-200/80 text-lg">Risk Reduction</div>
              <p className="text-cyan-200/60 text-sm mt-2">Average reduction in security vulnerabilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-cyan-100 mb-6">
              Start Your Security Journey Today
            </h2>
            <p className="text-lg text-cyan-200/80 mb-8 leading-relaxed">
              Don't wait for a security incident to take action. Our expert team will guide you 
              through every phase of your security journey, ensuring your business is protected 
              against current and future threats.
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-cyan-500 to-teal-500 text-ocean-900 font-bold py-4 px-8 rounded-full text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              Schedule Security Assessment
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
