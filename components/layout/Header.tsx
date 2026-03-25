"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppButton } from "@/components/ghana-specific/WhatsAppButton";
import { usePathname } from "next/navigation";

// Mega Menu Component - Reusable for all dropdowns
function MegaMenu({ 
  isOpen, 
  title, 
  description, 
  items, 
  onMouseEnter, 
  onMouseLeave 
}: {
  isOpen: boolean;
  title: string;
  description: string;
  items: Array<{
    heading: string;
    description: string;
    link: string;
  }>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute top-full left-0 w-screen bg-white rounded-xl shadow-2xl shadow-cyan-500/20 border border-cyan-400/20 z-[9999]"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="container mx-auto px-6 py-8">
            {/* Header Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-cyan-900 mb-2">{title}</h3>
              <p className="text-cyan-600 text-sm">{description}</p>
            </div>

            {/* Grid Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group p-6 rounded-xl hover:bg-gradient-to-br hover:from-cyan-500/5 hover:to-teal-500/5 transition-all duration-300 border border-cyan-400/10 hover:border-cyan-400/20 hover:shadow-lg hover:shadow-cyan-500/10"
                  style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}
                >
                  <h4 className="text-lg font-semibold text-cyan-900 mb-3 group-hover:text-cyan-600 transition-colors break-words">
                    {item.heading}
                  </h4>
                  <p className="text-cyan-700 text-sm leading-relaxed mb-6 flex-grow break-words">
                    {item.description}
                  </p>
                  <div className="mt-auto">
                    <Link
                      href={item.link}
                      className="inline-flex items-center text-cyan-600 font-medium text-sm hover:text-cyan-800 transition-colors group"
                    >
                      Learn more
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                        className="ml-2"
                      >
                        →
                      </motion.span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Mobile Accordion Component for dropdowns
function MobileAccordion({ 
  title, 
  items, 
  isOpen, 
  onToggle,
  onClose
}: {
  title: string;
  items: Array<{
    heading: string;
    description: string;
    link: string;
  }>;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div className="border-b border-black/20">
      <button
        className="w-full flex items-center justify-between py-3 text-left text-sm font-medium text-black/70 hover:text-black transition-colors"
        onClick={onToggle}
      >
        <span>{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-black/60" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pb-4 space-y-3"
          >
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="block p-3 rounded-lg hover:bg-black/5 transition-colors"
                onClick={onClose}
              >
                <h4 className="font-medium text-black mb-1">{item.heading}</h4>
                <p className="text-xs text-black/60">{item.description}</p>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services", hasDropdown: true },
    { href: "/industries", label: "Industries", hasDropdown: true },
    { href: "/insights", label: "Insight" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/security-journey", label: "Security Journey" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const dropdownContent = {
    services: {
      title: "Our Services",
      description: "Comprehensive digital solutions tailored to your business needs",
      items: [
        {
          heading: "Web Development",
          description: "Modern, performant websites built with cutting-edge technologies and best practices that drive results.",
          link: "/services/web-development"
        },
        {
          heading: "Mobile Apps",
          description: "Native and cross-platform applications that deliver exceptional user experiences.",
          link: "/services/mobile-apps"
        },
        {
          heading: "E-Commerce",
          description: "Scalable online stores with seamless checkout and payment integrations.",
          link: "/services/ecommerce"
        },
        {
          heading: "Cybersecurity",
          description: "Comprehensive security solutions to protect your business from digital threats.",
          link: "/services/cybersecurity"
        }
      ]
    },
    industries: {
      title: "Industries We Serve",
      description: "Empowering diverse industries across Ghana and Africa with cutting-edge technology solutions",
      items: [
        {
          heading: "Financial Services",
          description: "Secure banking solutions and fintech innovations tailored for Ghana's growing financial sector.",
          link: "/industries/financial-services"
        },
        {
          heading: "Healthcare",
          description: "HIPAA-compliant healthcare technology solutions improving patient care and operational efficiency.",
          link: "/industries/healthcare"
        },
        {
          heading: "Education",
          description: "Innovative e-learning platforms and educational technology transforming the future of learning in Africa.",
          link: "/industries/education"
        },
        {
          heading: "Retail & E-commerce",
          description: "Cutting-edge e-commerce solutions and retail technology to boost online sales and customer engagement.",
          link: "/industries/retail"
        }
      ]
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Contact Bar */}
      <div className={`bg-blue-900/90 backdrop-blur-xl border-b border-blue-500/20 transition-all duration-500 ${
        scrolled ? "shadow-lg shadow-blue-500/10" : ""
      }`}>
        <nav className="container mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-14">
              {/* Contact Info - Left Side */}
            <div className="hidden md:flex items-center gap-6">
              {/* Contact Details */}
              <div className="flex items-center gap-6 text-black/70 text-xs whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-black/60" />
                  <span>+233 242 565 695</span>
                </div>
                <div className="w-px h-4 bg-black/30" />
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-black/60" />
                  <span>info@oceancyber.net</span>
                </div>
                <div className="w-px h-4 bg-black/30" />
                <span className="text-black/60">
                  232 Nii Kwashiefo Avenue, Abofu - Achimota - Accra - Ghana
                </span>
              </div>
              
              {/* Social Media */}
              <div className="flex items-center gap-2">
                <a href="https://facebook.com/oceancyber" className="w-7 h-7 rounded-full bg-black/10 border border-black/30 flex items-center justify-center hover:bg-black/20 transition-colors" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-3 h-3 text-black/60" />
                </a>
                <a href="https://twitter.com/oceancyber" className="w-7 h-7 rounded-full bg-black/10 border border-black/30 flex items-center justify-center hover:bg-black/20 transition-colors" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-3 h-3 text-black/60" />
                </a>
                <a href="https://instagram.com/oceancyber" className="w-7 h-7 rounded-full bg-black/10 border border-black/30 flex items-center justify-center hover:bg-black/20 transition-colors" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-3 h-3 text-black/60" />
                </a>
                <a href="https://linkedin.com/company/oceancyber" className="w-7 h-7 rounded-full bg-black/10 border border-black/30 flex items-center justify-center hover:bg-black/20 transition-colors" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-3 h-3 text-black/60" />
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Navigation Bar */}
      <div className={`bg-white/80 backdrop-blur-2xl transition-all duration-500 ${
        scrolled ? "shadow-lg shadow-blue-500/10" : ""
      }`}>
        <nav className="container mx-auto px-6 md:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo - Left Side */}
            <Link href="/" className="flex items-center group mr-16">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Image
                  src="/images/oceancyber logo.webp"
                  alt="OceanCyber Logo"
                  width={320}
                  height={99}
                  className="h-16 w-auto object-contain transition-all duration-300 group-hover:opacity-90"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation - Right Side */}
            <div className="hidden md:flex items-center gap-6 ml-auto whitespace-nowrap">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const isDropdownOpen = openDropdown === item.label.toLowerCase();
                
                return (
                  <div key={item.href} className="relative group flex-shrink-0 nav-item">
                    {item.hasDropdown ? (
                      <button
                        className={`relative text-sm font-medium transition-all duration-300 ${
                          isActive 
                            ? 'text-black' 
                            : 'text-black/70 hover:text-black'
                        }`}
                        onMouseEnter={() => setOpenDropdown(item.label.toLowerCase())}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <span className="relative">
                          {item.label}
                          <span className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-300 ${
                            isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                          }`} />
                        </span>
                        <ChevronDown className="w-3 h-3 inline-block ml-1 text-black/60 transition-all duration-300 group-hover:text-black/80 group-hover:rotate-180" />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`relative text-sm font-medium transition-all duration-300 ${
                          isActive 
                            ? 'text-black' 
                            : 'text-black/70 hover:text-black'
                        }`}
                      >
                        <span className="relative">
                          {item.label}
                          <span className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-300 ${
                            isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                          }`} />
                        </span>
                      </Link>
                    )}
                    
                    {/* Simple Dropdown Menu */}
                    {item.hasDropdown && (
                      <div className="dropdown-menu">
                        <div className="dropdown-header">{dropdownContent[item.label.toLowerCase() as keyof typeof dropdownContent]?.title || ""}</div>
                        <div className="dropdown-subtitle">{dropdownContent[item.label.toLowerCase() as keyof typeof dropdownContent]?.description || ""}</div>
                        {dropdownContent[item.label.toLowerCase() as keyof typeof dropdownContent]?.items.map((subItem, index) => (
                          <Link
                            key={index}
                            href={subItem.link}
                            className="dropdown-item"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="font-medium">{subItem.heading}</div>
                            <div className="text-sm text-gray-600 mt-1">{subItem.description}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-black/70 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

            {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-gray-200"
            >
              <div className="container mx-auto px-6 py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.hasDropdown ? (
                      <MobileAccordion
                        title={item.label}
                        items={dropdownContent[item.label.toLowerCase() as keyof typeof dropdownContent]?.items || []}
                        isOpen={openDropdown === item.label.toLowerCase()}
                        onToggle={() => setOpenDropdown(
                          openDropdown === item.label.toLowerCase() ? null : item.label.toLowerCase()
                        )}
                        onClose={() => setIsMenuOpen(false)}
                      />
                    ) : (
                      <Link
                        href={item.href}
                        className={`block py-2 font-medium transition-colors ${
                          pathname === item.href 
                            ? 'text-black' 
                            : 'text-black/70 hover:text-black'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                <div className="pt-2">
                  <WhatsAppButton variant="default" size="md" className="w-full" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
