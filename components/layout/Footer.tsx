import Link from "next/link";
import Image from "next/image";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Shield,
  Lock,
  Globe,
  Database,
  Smartphone,
  Code,
  ShoppingBag,
  Settings,
  Network,
  Heart,
  Building2,
  DatabaseBackup,
  DatabaseZap
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0B1C2C] text-[#B8C1CC]">
      <div className="container mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand + Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/images/oceancyber logo.webp"
                alt="OceanCyber Logo"
                width={120}
                height={37}
                className="h-10 w-auto object-contain grayscale brightness-0 invert"
              />
            </div>
            <p className="text-sm text-[#B8C1CC] mb-6 leading-relaxed">
              Protecting your digital world with elite cybersecurity intelligence. World-class penetration testing, cloud security, and zero-trust infrastructure.
            </p>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-[#1A2F40] border border-[#2A4A60] text-xs text-[#B8C1CC] rounded-full font-medium">
                SOC 2 Certified
              </span>
              <span className="px-3 py-1 bg-[#1A2F40] border border-[#2A4A60] text-xs text-[#B8C1CC] rounded-full font-medium">
                Zero Trust
              </span>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-3">
              <a href="https://linkedin.com/company/oceancyber" className="w-10 h-10 rounded-full bg-[#1A2F40] border border-[#2A4A60] flex items-center justify-center hover:bg-[#00C2D1] hover:border-[#00C2D1] transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 text-[#B8C1CC]" />
              </a>
              <a href="https://twitter.com/oceancyber" className="w-10 h-10 rounded-full bg-[#1A2F40] border border-[#2A4A60] flex items-center justify-center hover:bg-[#00C2D1] hover:border-[#00C2D1] transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-4 h-4 text-[#B8C1CC]" />
              </a>
              <a href="https://facebook.com/oceancyber" className="w-10 h-10 rounded-full bg-[#1A2F40] border border-[#2A4A60] flex items-center justify-center hover:bg-[#00C2D1] hover:border-[#00C2D1] transition-colors" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-4 h-4 text-[#B8C1CC]" />
              </a>
              <a href="https://instagram.com/oceancyber" className="w-10 h-10 rounded-full bg-[#1A2F40] border border-[#2A4A60] flex items-center justify-center hover:bg-[#00C2D1] hover:border-[#00C2D1] transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-4 h-4 text-[#B8C1CC]" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-[#00C2D1]" />
                <Link href="/services/web-development" className="text-[#B8C1CC] hover:text-[#00C2D1] transition-colors">
                  Web Design & Development
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-[#00C2D1]" />
                <Link href="/services/seo" className="text-[#B8C1CC] hover:text-[#00C2D1] transition-colors">
                  SEO & Digital Marketing
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4 text-[#00C2D1]" />
                <Link href="/services/ecommerce" className="text-[#B8C1CC] hover:text-[#00C2D1] transition-colors">
                  E-Commerce Solutions
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-[#00C2D1]" />
                <Link href="/services/mobile-apps" className="text-[#B8C1CC] hover:text-[#00C2D1] transition-colors">
                  Mobile App Development
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Settings className="w-4 h-4 text-[#00C2D1]" />
                <Link href="/services/it-consulting" className="text-[#B8C1CC] hover:text-[#00C2D1] transition-colors">
                  IT Consultancy
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Network className="w-4 h-4 text-[#00C2D1]" />
                <Link href="/services/networking" className="text-[#B8C1CC] hover:text-[#00C2D1] transition-colors">
                  Computer Networking
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Industries & Technologies */}
          <div className="md:col-span-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Industries</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-[#00C2D1]" />
                    <span className="text-[#B8C1CC]">Healthcare Websites</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-[#00C2D1]" />
                    <span className="text-[#B8C1CC]">Financial Services</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Technologies</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-[#00C2D1]" />
                    <span className="text-[#B8C1CC]">.Net</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Code className="w-4 h-4 text-[#00C2D1]" />
                    <span className="text-[#B8C1CC]">HTML5</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <DatabaseBackup className="w-4 h-4 text-[#00C2D1]" />
                    <span className="text-[#B8C1CC]">Java</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <DatabaseZap className="w-4 h-4 text-[#00C2D1]" />
                    <span className="text-[#B8C1CC]">Node.js</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-[#00C2D1]" />
                    <span className="text-[#B8C1CC]">PHP</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <DatabaseBackup className="w-4 h-4 text-[#00C2D1]" />
                    <span className="text-[#B8C1CC]">Python</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#00C2D1] mt-0.5 flex-shrink-0" />
                <span className="text-[#B8C1CC] text-sm leading-relaxed">
                  232 Nii Kwashiefo Avenue<br />
                  Accra, Ghana
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#00C2D1] flex-shrink-0" />
                <a href="tel:+233242565695" className="text-[#B8C1CC] hover:text-[#00C2D1] transition-colors text-sm">
                  +233 242 565 695
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#00C2D1] flex-shrink-0" />
                <a href="mailto:info@oceancyber.net" className="text-[#B8C1CC] hover:text-[#00C2D1] transition-colors text-sm">
                  info@oceancyber.net
                </a>
              </div>
            </div>
            
            {/* Emergency Box */}
            <div className="bg-[#2A0F14] border border-[#4A1F24] rounded-lg p-4">
              <div className="text-center">
                <div className="text-xs font-semibold text-[#FF6B6B] uppercase tracking-wider mb-1">
                  24/7 SOC EMERGENCY
                </div>
                <div className="text-[#FF6B6B] font-mono text-sm">
                  +233 242 565 695
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#2A4A60]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#B8C1CC]">
              &copy; 2026 OceanCyber. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-[#B8C1CC]">
              <Link href="/privacy" className="hover:text-[#00C2D1] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#00C2D1] transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-[#00C2D1] transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
