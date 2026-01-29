import Link from "next/link";
import { Phone, Mail, MapPin, Waves } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-cyan-400/20 bg-gradient-to-b from-ocean-900 to-ocean-800">
      <div className="container mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center">
                <Waves className="w-5 h-5 text-ocean-900" />
              </div>
              <span className="text-lg font-semibold text-cyan-100">OceanCyber</span>
            </div>
            <p className="text-sm text-cyan-200/70 mb-6 leading-relaxed font-light">
              Ghana&apos;s premier technology solutions provider, transforming businesses through innovative digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-cyan-100 mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services" className="text-cyan-200/70 hover:text-cyan-100 transition-colors font-light">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-cyan-200/70 hover:text-cyan-100 transition-colors font-light">
                  Our Works
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-cyan-200/70 hover:text-cyan-100 transition-colors font-light">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cyan-200/70 hover:text-cyan-100 transition-colors font-light">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-cyan-100 mb-6 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services/web-development" className="text-cyan-200/70 hover:text-cyan-100 transition-colors font-light">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-apps" className="text-cyan-200/70 hover:text-cyan-100 transition-colors font-light">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/services/it-consulting" className="text-cyan-200/70 hover:text-cyan-100 transition-colors font-light">
                  IT Consulting
                </Link>
              </li>
              <li>
                <Link href="/services/cybersecurity" className="text-cyan-200/70 hover:text-cyan-100 transition-colors font-light">
                  Cybersecurity
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-cyan-100 mb-6 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-cyan-400 flex-shrink-0" />
                <span className="text-cyan-200/70 font-light leading-relaxed">
                  232 Nii Kwashiefio Avenue<br />
                  Abofu – Achimota – Accra, Ghana
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href="tel:+233242565695" className="text-cyan-200/70 hover:text-cyan-100 transition-colors font-light">
                  +233 242 565 695
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href="mailto:info@oceancyber.net" className="text-cyan-200/70 hover:text-cyan-100 transition-colors font-light">
                  info@oceancyber.net
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cyan-400/20 text-center">
          <p className="text-sm text-cyan-200/50 font-light">
            &copy; {new Date().getFullYear()} OceanCyber - I.T Solutions Provider. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
