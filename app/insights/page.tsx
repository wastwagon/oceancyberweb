"use client";
import { motion } from 'framer-motion';

export default function InsightsPage() {
  const blogPosts = [
    {
      title: "The Future of Cybersecurity in Africa",
      excerpt: "Exploring the evolving cybersecurity landscape across African nations and the unique challenges and opportunities that lie ahead.",
      image: "/images/EGP Ghana.webp",
      category: "Security",
      date: "March 15, 2024",
      readTime: "5 min read"
    },
    {
      title: "Digital Transformation: A Ghanaian Perspective",
      excerpt: "How businesses in Ghana are embracing digital transformation to stay competitive in the global market.",
      image: "/images/Fitch Advisory.webp",
      category: "Technology",
      date: "March 10, 2024",
      readTime: "7 min read"
    },
    {
      title: "Fintech Revolution: Banking the Unbanked",
      excerpt: "Examining how fintech solutions are bringing financial services to underserved communities across Africa.",
      image: "/images/Juelle Hair.webp",
      category: "Finance",
      date: "March 5, 2024",
      readTime: "6 min read"
    },
    {
      title: "E-commerce Growth in Emerging Markets",
      excerpt: "Strategies for success in the rapidly growing e-commerce sector across emerging African economies.",
      image: "/images/Tour World Tourism.webp",
      category: "Business",
      date: "February 28, 2024",
      readTime: "8 min read"
    },
    {
      title: "AI and Machine Learning: Practical Applications",
      excerpt: "Real-world applications of AI and ML technologies that are transforming industries today.",
      image: "/images/Africa Trade Chamber.webp",
      category: "Innovation",
      date: "February 20, 2024",
      readTime: "10 min read"
    },
    {
      title: "Data Privacy and Compliance in the Digital Age",
      excerpt: "Understanding data protection regulations and implementing effective privacy measures for your business.",
      image: "/images/Fitch Attorney.webp",
      category: "Compliance",
      date: "February 15, 2024",
      readTime: "4 min read"
    }
  ];

  const categories = [
    "All", "Security", "Technology", "Finance", "Business", "Innovation", "Compliance"
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
              Insights & Thought Leadership
            </h1>
            <p className="text-xl md:text-2xl text-cyan-200/80 max-w-4xl mx-auto leading-relaxed">
              Stay informed with our latest insights, industry trends, and expert analysis 
              on technology, security, and digital transformation shaping Africa's future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-10 bg-gradient-to-r from-cyan-500/10 to-teal-500/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="px-6 py-3 rounded-full text-cyan-200/80 hover:text-cyan-100 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 hover:bg-white/5"
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-cyan-500 to-teal-500 text-ocean-900 px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between text-cyan-200/60 text-sm mb-3">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-cyan-100 mb-3 group-hover:text-cyan-200 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-cyan-200/80 mb-6 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/10 to-teal-500/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-100 mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-cyan-200/80 mb-8 leading-relaxed">
              Subscribe to our newsletter to receive the latest insights, industry news, 
              and expert analysis directly to your inbox.
            </p>
            
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-cyan-400/30 text-cyan-100 placeholder-cyan-200/60 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-teal-500 text-ocean-900 font-bold py-3 px-6 rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </form>
            
            <p className="text-cyan-200/60 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Latest Articles Preview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-100 mb-6">
              Featured Articles
            </h2>
            <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto">
              Explore our most popular and recent publications that are shaping conversations 
              in the tech and business communities.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-400/20"
            >
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img 
                  src="/images/EGP Ghana.webp" 
                  alt="Featured Article"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-gradient-to-r from-cyan-500 to-teal-500 text-ocean-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-cyan-100 mb-3">The Future of Cybersecurity in Africa</h3>
              <p className="text-cyan-200/80 mb-4 leading-relaxed">Exploring the evolving cybersecurity landscape across African nations and the unique challenges and opportunities that lie ahead.</p>
              <div className="flex items-center justify-between text-cyan-200/60 text-sm">
                <span>March 15, 2024 • 5 min read</span>
                <motion.a
                  href="#"
                  whileHover={{ x: 5 }}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Read Article →
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-6"
            >
              {blogPosts.slice(1, 4).map((post, index) => (
                <div key={post.title} className="flex gap-4 group">
                  <div className="flex-shrink-0 relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-20 h-20 object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/40 to-transparent rounded-lg" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-cyan-100 mb-2 group-hover:text-cyan-200 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-cyan-200/70 text-sm mb-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-cyan-200/60 text-xs">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}