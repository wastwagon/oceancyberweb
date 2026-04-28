// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { Menu, X, ChevronDown, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { WhatsAppButton } from "@/components/ghana-specific/WhatsAppButton";
// import { usePathname } from "next/navigation";

// // Mega Menu Component - Reusable for all dropdowns
// function MegaMenu({ 
//   isOpen, 
//   title, 
//   description, 
//   items, 
//   onMouseEnter, 
//   onMouseLeave 
// }: {
//   isOpen: boolean;
//   title: string;
//   description: string;
//   items: Array<{
//     heading: string;
//     description: string;
//     link: string;
//   }>;
//   onMouseEnter: () => void;
//   onMouseLeave: () => void;
// }) {
//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.25, ease: "easeOut" }}
//           className="absolute top-full left-0 w-screen bg-white rounded-xl shadow-2xl shadow-cyan-500/20 border border-cyan-400/20 z-[9999]"
//           onMouseEnter={onMouseEnter}
//           onMouseLeave={onMouseLeave}
//         >
//           <div className="container mx-auto px-6 py-8">
//             {/* Header Section */}
//             <div className="mb-8">
//               <h3 className="text-2xl font-bold text-cyan-900 mb-2">{title}</h3>
//               <p className="text-cyan-600 text-sm">{description}</p>
//             </div>

//             {/* Grid Columns */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//               {items.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3, delay: index * 0.1 }}
//                   className="group p-6 rounded-xl hover:bg-gradient-to-br hover:from-cyan-500/5 hover:to-teal-500/5 transition-all duration-300 border border-cyan-400/10 hover:border-cyan-400/20 hover:shadow-lg hover:shadow-cyan-500/10"
//                   style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}
//                 >
//                   <h4 className="text-lg font-semibold text-cyan-900 mb-3 group-hover:text-cyan-600 transition-colors break-words">
//                     {item.heading}
//                   </h4>
//                   <p className="text-cyan-700 text-sm leading-relaxed mb-6 flex-grow break-words">
//                     {item.description}
//                   </p>
//                   <div className="mt-auto">
//                     <Link
//                       href={item.link}
//                       className="inline-flex items-center text-cyan-600 font-medium text-sm hover:text-cyan-800 transition-colors group"
//                     >
//                       Learn more
//                       <motion.span
//                         initial={{ x: 0 }}
//                         whileHover={{ x: 4 }}
//                         transition={{ duration: 0.2 }}
//                         className="ml-2"
//                       >
//                         →
//                       </motion.span>
//                     </Link>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// // Mobile Accordion Component for dropdowns
// function MobileAccordion({ 
//   title, 
//   items, 
//   isOpen, 
//   onToggle,
//   onClose
// }: {
//   title: string;
//   items: Array<{
//     heading: string;
//     description: string;
//     link: string;
//   }>;
//   isOpen: boolean;
//   onToggle: () => void;
//   onClose: () => void;
// }) {
//   return (
//     <div className="border-b border-white/10">
//       <button
//         className="w-full flex items-center justify-between py-3 text-left text-sm font-medium text-slate-300 hover:text-white transition-colors"
//         onClick={onToggle}
//       >
//         <span>{title}</span>
//         <motion.div
//           animate={{ rotate: isOpen ? 180 : 0 }}
//           transition={{ duration: 0.2 }}
//         >
//           <ChevronDown className="w-4 h-4 text-slate-400" />
//         </motion.div>
//       </button>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="pb-4 space-y-3"
//           >
//             {items.map((item, index) => (
//               <Link
//                 key={index}
//                 href={item.link}
//                 className="block p-3 rounded-lg hover:bg-white/5 transition-colors"
//                 onClick={onClose}
//               >
//                 <h4 className="mb-1 font-medium text-slate-100">{item.heading}</h4>
//                 <p className="text-xs text-slate-400">{item.description}</p>
//               </Link>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navItems = [
//     { href: "/", label: "Home" },
//     { href: "/services", label: "Services", hasDropdown: true },
//     { href: "/industries", label: "Industries", hasDropdown: true },
//     { href: "/insights", label: "Insight" },
//     { href: "/portfolio", label: "Portfolio" },
//     { href: "/case-studies", label: "Case Studies" },
//     { href: "/security-journey", label: "Security Journey" },
//     { href: "/about", label: "About" },
//     { href: "/contact", label: "Contact" },
//   ];

//   const dropdownContent = {
//     services: {
//       title: "Our Services",
//       description: "Comprehensive digital solutions tailored to your business needs",
//       items: [
//         {
//           heading: "Web Development",
//           description: "Modern, performant websites built with cutting-edge technologies and best practices that drive results.",
//           link: "/services/web-development"
//         },
//         {
//           heading: "Mobile Apps",
//           description: "Native and cross-platform applications that deliver exceptional user experiences.",
//           link: "/services/mobile-apps"
//         },
//         {
//           heading: "E-Commerce",
//           description: "Scalable online stores with seamless checkout and payment integrations.",
//           link: "/services/ecommerce"
//         },
//         {
//           heading: "Cybersecurity",
//           description: "Comprehensive security solutions to protect your business from digital threats.",
//           link: "/services/cybersecurity"
//         }
//       ]
//     },
//     industries: {
//       title: "Industries We Serve",
//       description: "Empowering diverse industries across Ghana and Africa with cutting-edge technology solutions",
//       items: [
//         {
//           heading: "Financial Services",
//           description: "Secure banking solutions and fintech innovations tailored for Ghana's growing financial sector.",
//           link: "/industries/financial-services"
//         },
//         {
//           heading: "Healthcare",
//           description: "HIPAA-compliant healthcare technology solutions improving patient care and operational efficiency.",
//           link: "/industries/healthcare"
//         },
//         {
//           heading: "Education",
//           description: "Innovative e-learning platforms and educational technology transforming the future of learning in Africa.",
//           link: "/industries/education"
//         },
//         {
//           heading: "Retail & E-commerce",
//           description: "Cutting-edge e-commerce solutions and retail technology to boost online sales and customer engagement.",
//           link: "/industries/retail"
//         }
//       ]
//     }
//   };

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 px-3 md:px-6">
//       {/* Top Contact Bar */}
//       <div className={`mt-2 rounded-xl border border-white/10 bg-[#0a1030]/85 backdrop-blur-xl transition-all duration-500 ${
//         scrolled ? "shadow-2xl shadow-cyan-900/30" : ""
//       }`}>
//         <nav className="mx-auto max-w-7xl px-4 md:px-6">
//           <div className="flex h-10 items-center justify-between">
//               {/* Contact Info - Left Side */}
//             <div className="hidden md:flex items-center gap-4">
//               {/* Contact Details */}
//               <div className="flex items-center gap-4 text-[11px] text-slate-300/80 whitespace-nowrap">
//                 <div className="flex items-center gap-2">
//                   <Phone className="w-3 h-3 text-cyan-300/75" />
//                   <span>+233 242 565 695</span>
//                 </div>
//                 <div className="w-px h-3 bg-white/20" />
//                 <div className="flex items-center gap-2">
//                   <Mail className="w-3 h-3 text-cyan-300/75" />
//                   <span>info@oceancyber.net</span>
//                 </div>
//                 <div className="w-px h-3 bg-white/20" />
//                 <span className="text-slate-400">
//                   232 Nii Kwashiefo Avenue, Abofu - Achimota - Accra - Ghana
//                 </span>
//               </div>
              
//               {/* Social Media */}
//               <div className="flex items-center gap-2">
//                 <a href="https://facebook.com/oceancyber" className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors" target="_blank" rel="noopener noreferrer">
//                   <Facebook className="w-3 h-3 text-slate-300" />
//                 </a>
//                 <a href="https://twitter.com/oceancyber" className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors" target="_blank" rel="noopener noreferrer">
//                   <Twitter className="w-3 h-3 text-slate-300" />
//                 </a>
//                 <a href="https://instagram.com/oceancyber" className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors" target="_blank" rel="noopener noreferrer">
//                   <Instagram className="w-3 h-3 text-slate-300" />
//                 </a>
//                 <a href="https://linkedin.com/company/oceancyber" className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors" target="_blank" rel="noopener noreferrer">
//                   <Linkedin className="w-3 h-3 text-slate-300" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>

//       {/* Main Navigation Bar */}
//       <div className={`mt-2 rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(16,25,74,0.9),rgba(7,12,38,0.9))] backdrop-blur-2xl transition-all duration-500 ${
//         scrolled ? "shadow-2xl shadow-cyan-900/40" : "shadow-xl shadow-black/25"
//       }`}>
//         <nav className="mx-auto max-w-7xl px-4 md:px-6">
//           <div className="flex h-16 items-center justify-between gap-4">
//             {/* Logo - Left Side */}
//             <Link href="/" className="flex items-center group shrink-0">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="relative"
//               >
//                 <Image
//                   src="/images/oceancyber logo.webp"
//                   alt="OceanCyber Logo"
//                   width={320}
//                   height={99}
//                   className="h-11 w-auto object-contain transition-all duration-300 group-hover:opacity-90"
//                   priority
//                 />
//               </motion.div>
//             </Link>

//             {/* Desktop Navigation - Center */}
//             <div className="hidden lg:flex items-center justify-center gap-6 whitespace-nowrap rounded-xl px-6 py-2">
//               {navItems.map((item) => {
//                 const isActive = pathname === item.href;
//                 const isDropdownOpen = openDropdown === item.label.toLowerCase();
                
//                 return (
//                   <div key={item.href} className="relative group flex-shrink-0 nav-item">
//                     {item.hasDropdown ? (
//                       <button
//                         className={`relative text-sm font-medium transition-all duration-300 ${
//                           isActive 
//                             ? 'text-white' 
//                             : 'text-slate-300 hover:text-white'
//                         }`}
//                         onMouseEnter={() => setOpenDropdown(item.label.toLowerCase())}
//                         onMouseLeave={() => setOpenDropdown(null)}
//                       >
//                         <span className="relative">
//                           {item.label}
//                           <span className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-300 ${
//                             isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
//                           }`} />
//                         </span>
//                         <ChevronDown className="w-3 h-3 inline-block ml-1 text-slate-400 transition-all duration-300 group-hover:text-slate-100 group-hover:rotate-180" />
//                       </button>
//                     ) : (
//                       <Link
//                         href={item.href}
//                         className={`relative text-sm font-medium transition-all duration-300 ${
//                           isActive 
//                             ? 'text-white' 
//                             : 'text-slate-300 hover:text-white'
//                         }`}
//                       >
//                         <span className="relative">
//                           {item.label}
//                           <span className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-300 ${
//                             isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
//                           }`} />
//                         </span>
//                       </Link>
//                     )}
                    
//                     {/* Simple Dropdown Menu */}
//                     {item.hasDropdown && (
//                       <div className="dropdown-menu">
//                         <div className="dropdown-header">{dropdownContent[item.label.toLowerCase() as keyof typeof dropdownContent]?.title || ""}</div>
//                         <div className="dropdown-subtitle">{dropdownContent[item.label.toLowerCase() as keyof typeof dropdownContent]?.description || ""}</div>
//                         {dropdownContent[item.label.toLowerCase() as keyof typeof dropdownContent]?.items.map((subItem, index) => (
//                           <Link
//                             key={index}
//                             href={subItem.link}
//                             className="dropdown-item"
//                             onClick={() => setIsMenuOpen(false)}
//                           >
//                             <div className="font-medium">{subItem.heading}</div>
//                             <div className="text-sm text-gray-600 mt-1">{subItem.description}</div>
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden p-2 text-slate-200 hover:text-white transition-colors"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           </div>
//         </nav>

//             {/* Mobile Navigation */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="md:hidden border-t border-white/10 bg-[#0b1235]/95 backdrop-blur-2xl"
//             >
//               <div className="container mx-auto px-6 py-6 space-y-4">
//                 {navItems.map((item, index) => (
//                   <motion.div
//                     key={item.href}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ delay: index * 0.1 }}
//                   >
//                     {item.hasDropdown ? (
//                       <MobileAccordion
//                         title={item.label}
//                         items={dropdownContent[item.label.toLowerCase() as keyof typeof dropdownContent]?.items || []}
//                         isOpen={openDropdown === item.label.toLowerCase()}
//                         onToggle={() => setOpenDropdown(
//                           openDropdown === item.label.toLowerCase() ? null : item.label.toLowerCase()
//                         )}
//                         onClose={() => setIsMenuOpen(false)}
//                       />
//                     ) : (
//                       <Link
//                         href={item.href}
//                         className={`block py-2 font-medium transition-colors ${
//                           pathname === item.href 
//                             ? 'text-white' 
//                             : 'text-slate-300 hover:text-white'
//                         }`}
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         {item.label}
//                       </Link>
//                     )}
//                   </motion.div>
//                 ))}
//                 <div className="pt-2">
//                   <WhatsAppButton variant="default" size="md" className="w-full" />
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </header>
//   );
// }

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
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-[calc(100%+6px)] left-0 z-[9999] w-[min(92vw,640px)] overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_16px_48px_rgba(15,23,42,0.12)] backdrop-blur-md"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="max-h-[min(70vh,520px)] overflow-y-auto p-4 sm:p-5">
            {/* Header - compact */}
            <div className="mb-3 border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">{title}</h3>
              <p className="mt-1 text-xs leading-snug text-slate-600 sm:text-sm">{description}</p>
            </div>

            {/* 2-column grid: balanced rows for 4 items (2×2), still stacks on mobile */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                  className="group relative rounded-lg border border-transparent p-3 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50"
                >
                  <h4 className="text-sm font-semibold text-slate-900 group-hover:text-ocean-600 sm:text-[15px]">
                    {item.heading}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-600 sm:text-xs">
                    {item.description}
                  </p>
                  <Link
                    href={item.link}
                    className="mt-2 inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-ocean-600 hover:text-ocean-800"
                  >
                    Learn more
                    <span className="ml-1.5 inline-block">→</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Mobile Accordion Component
function MobileAccordion({
  title,
  items,
  isOpen,
  onToggle,
  onClose,
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
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-semibold text-slate-900 sm:py-4"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-ocean-500" aria-hidden />
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-slate-200"
          >
            <div className="space-y-2 px-3 pb-3 pt-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:space-y-0 sm:px-3 sm:pb-4">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="block rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:border-ocean-300 hover:bg-slate-50"
                  onClick={onClose}
                >
                  <h4 className="mb-0.5 text-sm font-bold text-slate-900">{item.heading}</h4>
                  <p className="line-clamp-2 text-[11px] leading-snug text-slate-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const HEADER_SOCIAL_LINKS = [
  {
    Icon: Facebook,
    href: "https://facebook.com/oceancyber",
    label: "Facebook",
  },
  {
    Icon: Twitter,
    href: "https://twitter.com/oceancyber",
    label: "Twitter",
  },
  {
    Icon: Instagram,
    href: "https://instagram.com/oceancyber",
    label: "Instagram",
  },
  {
    Icon: Linkedin,
    href: "https://linkedin.com/company/oceancyber",
    label: "LinkedIn",
  },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

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
        { heading: "Web Development", description: "Modern, performant websites built with cutting-edge technologies.", link: "/services/web-development" },
        { heading: "Mobile Apps", description: "Native and cross-platform applications deliver exceptional experiences.", link: "/services/mobile-apps" },
        { heading: "E-Commerce", description: "Scalable online stores with seamless checkout and payment.", link: "/services/ecommerce" },
        { heading: "Cybersecurity", description: "Comprehensive security solutions to protect your business.", link: "/services/cybersecurity" }
      ]
    },
    industries: {
      title: "Industries We Serve",
      description: "Empowering diverse industries across Ghana and Africa.",
      items: [
        { heading: "Financial Services", description: "Secure banking solutions and fintech innovations.", link: "/industries/financial-services" },
        { heading: "Healthcare", description: "HIPAA-compliant healthcare technology solutions.", link: "/industries/healthcare" },
        { heading: "Education", description: "Innovative e-learning platforms transforming learning.", link: "/industries/education" },
        { heading: "Retail & E-commerce", description: "Retail technology to boost online sales and engagement.", link: "/industries/retail" }
      ]
    }
  };

  const homeNav = navItems.find((i) => i.href === "/");
  const dropdownNav = navItems.filter((i) => i.hasDropdown);
  const flatNav = navItems.filter((i) => !i.hasDropdown && i.href !== "/");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center bg-white/95 px-3 pt-2 shadow-sm sm:px-5 sm:pt-3 md:px-8 backdrop-blur-md">
      {/* Top contact bar: desktop only (lg+); on mobile/tablet this lives inside the menu drawer */}
      <div
        className={`hidden w-full max-w-7xl overflow-hidden transition-all duration-500 lg:block ${scrolled ? "h-0 translate-y-[-100%] opacity-0" : "h-10 translate-y-0 opacity-100"}`}
      >
        <div className="flex h-full items-center justify-between gap-4 rounded-t-2xl border-x border-t border-slate-200/90 bg-slate-50/90 px-5 backdrop-blur-md">
          <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-1 text-[10px] font-bold uppercase tracking-widest text-slate-600">
            <a
              href="tel:+233242565695"
              className="flex min-w-0 items-center gap-2 text-slate-700 transition-colors hover:text-ocean-700"
            >
              <Phone className="h-3 w-3 shrink-0 text-ocean-600" aria-hidden />
              <span className="truncate">+233 242 565 695</span>
            </a>
            <a
              href="mailto:info@oceancyber.net"
              className="flex min-w-0 items-center gap-2 text-slate-700 transition-colors hover:text-ocean-700"
            >
              <Mail className="h-3 w-3 shrink-0 text-ocean-600" aria-hidden />
              <span className="truncate">info@oceancyber.net</span>
            </a>
            <span className="hidden text-slate-500 lg:inline">
              232 Nii Kwashiefio Avenue, Accra, Ghana
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {HEADER_SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 transition-colors hover:text-ocean-600"
                aria-label={label}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`w-full max-w-7xl transition-all duration-500 ${scrolled ? "mt-4" : "mt-0"}`}>
        <nav className={`relative flex h-[4.25rem] min-h-[4.25rem] items-center gap-2 border border-slate-200/90 px-3 backdrop-blur-md transition-all duration-500 sm:h-20 sm:min-h-[5rem] sm:gap-3 sm:px-6 ${
          scrolled
            ? "rounded-2xl bg-white/95 shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
            : "max-lg:rounded-2xl max-lg:bg-white/95 lg:rounded-b-2xl lg:bg-white/80"
        }`}>
            {/* Logo */}
            <Link href="/" className="relative z-10 shrink-0">
              <Image
                src="/images/oceancyber logo.webp"
                alt="OceanCyber"
                width={200}
                height={60}
                className="h-9 w-auto object-contain sm:h-10"
                priority
              />
            </Link>

            {/* Desktop Navigation - centered in remaining space, single-line labels */}
            <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
              <div className="flex max-w-full flex-nowrap items-center justify-center gap-0.5 xl:gap-1">
              {navItems.map((item) => (
                <div 
                    key={item.href} 
                    className="relative flex shrink-0 items-stretch"
                    onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.label.toLowerCase())}
                    onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex h-10 items-center gap-1 whitespace-nowrap rounded-lg px-2.5 text-[12px] font-semibold leading-none transition-all duration-300 xl:px-3 xl:text-[13px] ${
                      pathname === item.href ? "text-ocean-800" : "text-slate-600 hover:text-ocean-700"
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown className={`h-3 w-3 shrink-0 transition-transform ${openDropdown === item.label.toLowerCase() ? "rotate-180" : ""}`} />}
                  </Link>
                  
                  {pathname === item.href && (
                    <motion.div
                      layoutId="nav-line"
                      className="absolute bottom-1 left-2.5 right-2.5 h-0.5 bg-ocean-600 shadow-[0_0_12px_rgba(2,106,255,0.35)]"
                    />
                  )}

                  {item.hasDropdown && (
                    <MegaMenu 
                      isOpen={openDropdown === item.label.toLowerCase()} 
                      title={dropdownContent[item.label.toLowerCase() as keyof typeof dropdownContent]?.title || ""}
                      description={dropdownContent[item.label.toLowerCase() as keyof typeof dropdownContent]?.description || ""}
                      items={dropdownContent[item.label.toLowerCase() as keyof typeof dropdownContent]?.items || []}
                      onMouseEnter={() => setOpenDropdown(item.label.toLowerCase())}
                      onMouseLeave={() => setOpenDropdown(null)}
                    />
                  )}
                </div>
              ))}
              </div>
            </div>

            {/* Actions + mobile toggle */}
            <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-3">
              <Link
                href="/contact"
                className="hidden rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs font-semibold text-slate-800 transition-colors hover:border-ocean-300 hover:bg-ocean-50/80 sm:inline-flex lg:hidden"
              >
                Contact
              </Link>
              <WhatsAppButton
                variant="default"
                size="sm"
                className="hidden h-10 min-h-[2.5rem] shrink-0 px-4 text-sm shadow-md md:inline-flex"
              />
              <button
                type="button"
                className="inline-flex shrink-0 rounded-xl p-2.5 text-slate-800 hover:bg-slate-100 lg:hidden"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
        </nav>
      </div>

      {/* Mobile / tablet menu: dim backdrop + bottom sheet (phone) or right drawer (sm+) */}
      <AnimatePresence>
        {isMenuOpen ? (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[40] bg-slate-900/40 backdrop-blur-[2px] lg:hidden"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 360 }}
              className="fixed inset-x-0 bottom-0 z-[50] flex max-h-[min(90dvh,calc(100dvh-5.25rem))] flex-col rounded-t-3xl border border-slate-200 border-b-0 bg-white shadow-[0_-20px_60px_rgba(15,23,42,0.12)] sm:inset-x-auto sm:bottom-6 sm:left-auto sm:right-4 sm:top-20 sm:max-h-[min(calc(100dvh-6.5rem),680px)] sm:w-[min(22rem,calc(100vw-1.5rem))] sm:rounded-3xl sm:border-b sm:border-slate-200 md:right-6 md:top-24 lg:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:rounded-t-3xl sm:px-5 sm:py-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ocean-600">
                    Navigate
                  </p>
                  <p className="text-sm font-semibold text-slate-900">OceanCyber</p>
                </div>
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-2 sm:px-5">
                {homeNav ? (
                  <Link
                    href={homeNav.href}
                    className={`mb-4 flex items-center justify-between rounded-2xl border px-4 py-3.5 text-sm font-bold transition-colors sm:py-4 ${
                      pathname === homeNav.href
                        ? "border-ocean-300 bg-ocean-50 text-ocean-900"
                        : "border-slate-200 bg-slate-50/80 text-slate-800 hover:border-ocean-200"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {homeNav.label}
                    <span className="text-xs font-normal text-slate-500">Start here</span>
                  </Link>
                ) : null}

                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Solutions
                </p>
                <div className="space-y-2 sm:space-y-3">
                  {dropdownNav.map((item) => (
                    <MobileAccordion
                      key={item.href}
                      title={item.label}
                      items={
                        dropdownContent[
                          item.label.toLowerCase() as keyof typeof dropdownContent
                        ]?.items || []
                      }
                      isOpen={openDropdown === item.label.toLowerCase()}
                      onToggle={() =>
                        setOpenDropdown(
                          openDropdown === item.label.toLowerCase()
                            ? null
                            : item.label.toLowerCase()
                        )
                      }
                      onClose={() => setIsMenuOpen(false)}
                    />
                  ))}
                </div>

                <p className="mb-2 mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Pages
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
                  {flatNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-2xl border px-4 py-3.5 text-sm font-semibold transition-colors ${
                        pathname === item.href
                          ? "border-ocean-200 bg-ocean-50/80 text-ocean-900"
                          : "border-slate-200 bg-slate-50/50 text-slate-800 hover:border-ocean-200 hover:bg-slate-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="shrink-0 space-y-2 border-t border-slate-200 bg-slate-50/90 px-4 py-4 sm:rounded-b-3xl sm:px-5">
                <WhatsAppButton variant="default" size="md" className="w-full" />
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-ocean-300 hover:bg-ocean-50/60"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact form
                </Link>
                <div className="border-t border-slate-200 pt-4">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Reach us
                  </p>
                  <div className="flex flex-col gap-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-800">
                    <a
                      href="tel:+233242565695"
                      className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-ocean-600" aria-hidden />
                      <span>+233 242 565 695</span>
                    </a>
                    <a
                      href="mailto:info@oceancyber.net"
                      className="flex items-center gap-2.5 break-all transition-opacity hover:opacity-90"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0 text-ocean-600" aria-hidden />
                      <span>info@oceancyber.net</span>
                    </a>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {HEADER_SOCIAL_LINKS.map(({ Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 transition-colors hover:text-ocean-600"
                        aria-label={label}
                      >
                        <Icon size={16} strokeWidth={1.75} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}