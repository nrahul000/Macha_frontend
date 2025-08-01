import { Link as ScrollLink } from 'react-scroll';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About Us', to: 'about' },
    { name: 'Our Services', to: 'services' },
    { name: 'Gallery', to: 'gallery' },
    { name: 'Contact Us', to: 'contact' }
  ];

  return (
    <footer className="relative pt-14 pb-10 text-slate-800 overflow-hidden bg-gradient-to-b from-[#eaf7ef] via-[#eaf7ef] to-[#d6f3e7]">
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-[#17612A]/20 opacity-40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-[#17612A]/10 opacity-30 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-1/2 w-[200px] h-[200px] bg-[#17612A]/10 opacity-20 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold text-[#17612A] mb-3">MACHA</h3>
            <p className="text-slate-600 text-sm mb-4">
              Everything at your doorstep @ single call. Your trusted local service partner in Choutuppal.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/machaservices" target="_blank" rel="noopener noreferrer" className="p-2 bg-white hover:bg-[#eaf7ef] rounded-full shadow-sm">
                <Facebook size={16} className="text-[#17612A]" />
              </a>
              <a href="https://x.com/macha_services" target="_blank" rel="noopener noreferrer" className="p-2 bg-white hover:bg-[#eaf7ef] rounded-full shadow-sm">
                <Twitter size={16} className="text-[#17612A]" />
              </a>
              <a href="https://www.instagram.com/macha_mana_choutuppal?igsh=MXF0eDg4cGJhdzY5Zg==/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white hover:bg-[#eaf7ef] rounded-full shadow-sm">
                <Instagram size={16} className="text-[#17612A]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-y-2 text-sm">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <ScrollLink to={link.to} smooth={true} duration={500} className="text-slate-600 hover:text-[#17612A] cursor-pointer transition">
                    {link.name}
                  </ScrollLink>
                </li>
              ))}
              <li><a href="/terms" className="text-slate-600 hover:text-[#17612A] transition">Terms & Conditions</a></li>
              <li><a href="/privacy" className="text-slate-600 hover:text-[#17612A] transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="grid grid-cols-2 gap-y-2 text-sm">
              <li className="text-slate-600 hover:text-[#17612A] cursor-pointer">Delivery Services</li>
              <li className="text-slate-600 hover:text-[#17612A] cursor-pointer">Technicians</li>
              <li className="text-slate-600 hover:text-[#17612A] cursor-pointer">Medical Services</li>
              <li className="text-slate-600 hover:text-[#17612A] cursor-pointer">Home Services</li>
              <li className="text-slate-600 hover:text-[#17612A] cursor-pointer">Digital Services</li>
              <li className="text-slate-600 hover:text-[#17612A] cursor-pointer">Digital Marketing</li>
              <li className="text-slate-600 hover:text-[#17612A] cursor-pointer">Home Tutors</li>
              <li className="text-slate-600 hover:text-[#17612A] cursor-pointer">Transport Services</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <Phone size={16} className="text-[#17612A] mt-0.5" />
                <div>
                  <a href="tel:+918008330905" className="block hover:text-[#17612A]">+91 8008330905</a>
                  <a href="tel:+917057058841" className="block hover:text-[#17612A]">+91 7057058841</a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-[#17612A] mt-0.5" />
                <a href="mailto:info@macha.in" className="hover:text-[#17612A]">info@macha.in</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-[#17612A] mt-0.5" />
                <p>
                  Choutuppal, Telangana<br />
                  <span className="text-xs text-slate-500">Service until 10 PM daily</span>
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-[#c0d6f5] pt-6 text-center text-sm text-slate-600">
          &copy; {year} MACHA Service. All rights reserved.{" "}
          <a href="https://www.macha.in" className="hover:text-[#17612A] font-medium transition">www.macha.in</a>
        </div>
      </div>

      {/* Decorative border line at the bottom */}
      <div className="h-1 bg-gradient-to-r from-[#17612A]/30 via-black/10 to-[#17612A]/30 mt-5 opacity-30" />
    </footer>
  );
};

export default Footer;
