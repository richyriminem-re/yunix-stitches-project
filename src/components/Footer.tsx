import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Facebook, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
const Footer = () => {
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent("Hello! I'd like to get more information about Yunix Stitches services.");
    window.open(`https://wa.me/2348123456789?text=${message}`, '_blank');
  };
  const quickLinks = [{
    name: "About Us",
    href: "/about"
  }, {
    name: "Services",
    href: "/services"
  }, {
    name: "Gallery",
    href: "/gallery"
  }, {
    name: "Contact",
    href: "/contact"
  }];
  const services = [{
    name: "Custom Tailoring",
    href: "/services/custom-tailoring"
  }, {
    name: "Bridal Couture",
    href: "/services/bridal"
  }, {
    name: "Aso-Ebi Collections",
    href: "/services/aso-ebi"
  }, {
    name: "Style Consultation",
    href: "/services/consultation"
  }];
  return <footer className="bg-gradient-luxury text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/20 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Stay Updated with Yunix Style
            </h3>
            <p className="text-lg opacity-90 mb-8">
              Subscribe to our newsletter for the latest fashion trends, styling tips, 
              and exclusive offers on our luxury Nigerian fashion collections.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-lg mx-auto">
              <Input type="email" placeholder="Enter your email address" className="bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:bg-white/20 dark:bg-black/20 dark:border-white/40 dark:focus:bg-black/30" />
              <Button variant="bronze" size="lg" className="whitespace-nowrap">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-serif font-bold text-secondary mb-4">
                Yunix Stitches
              </h2>
              <p className="text-lg opacity-90 mb-6 leading-relaxed">
                Nigeria's premier luxury fashion house, crafting elegant traditional and 
                contemporary wear for over 15 years. Where heritage meets innovation.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-secondary" />
                  <span>Igbatoro Road, Opposite HOB (After Federal Secretariat),
Alagbaka, Akure, Ondo State, Nigeria</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-secondary" />
                  <span>+234 812 345 6789</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-secondary" />
                  <span>hello@yunixstitches.com</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h4 className="font-semibold mb-4">Follow Our Journey</h4>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" className="text-white hover:text-secondary hover:bg-white/10">
                    <Instagram className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:text-secondary hover:bg-white/10">
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:text-secondary hover:bg-white/10" onClick={handleWhatsAppContact}>
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-serif font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {quickLinks.map(link => <li key={link.name}>
                    <a href={link.href} className="opacity-90 hover:opacity-100 hover:text-secondary transition-all duration-200">
                      {link.name}
                    </a>
                  </li>)}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xl font-serif font-semibold mb-6">Our Services</h4>
              <ul className="space-y-4">
                {services.map(service => <li key={service.name}>
                    <a href={service.href} className="opacity-90 hover:opacity-100 hover:text-secondary transition-all duration-200">
                      {service.name}
                    </a>
                  </li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left opacity-90">
              <p>&copy; 2025 Yunix Stitches. All rights reserved.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm opacity-90">
              <a href="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-secondary transition-colors">Terms of Service</a>
              <a href="/returns" className="hover:text-secondary transition-colors">
            </a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;