import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Zap,
  Droplet,
  Hammer,
  Snowflake,
  Clock,
  Calendar,
  Star,
  Shield,
  ChevronRight
} from 'lucide-react';
import machaLogo from '../../assets/macha-logo.jpg';

const TechnicianFooter = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-green-900 text-gray-200">
      {/* Promo Banner */}
      <div className="bg-green-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-green-100" />
              <span className="text-sm sm:text-base text-white">Same-day service available for emergencies</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-100" />
              <span className="text-sm sm:text-base text-white">All services backed by our service guarantee</span>
            </div>
            <div>
              <a 
                href="tel:+918008330905" 
                className="inline-flex items-center px-4 py-2 bg-white text-green-700 rounded-lg font-medium text-sm hover:bg-green-50 transition-colors"
              >
                <Phone className="w-4 h-4 mr-1.5" /> Call for urgent service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src={machaLogo} 
                alt="MACHA Logo" 
                className="h-12 w-auto rounded-md object-cover shadow-sm" 
              />
              <div className="ml-3">
                <div className="font-bold text-xl text-white">MACHA</div>
                <div className="text-xs text-green-300">Technician Services</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Professional home technicians providing quality repair and maintenance services. Trusted by thousands of customers across the city.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-800 hover:bg-green-700 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-800 hover:bg-green-700 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-800 hover:bg-green-700 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-800 hover:bg-green-700 transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center after:content-[''] after:ml-4 after:flex-grow after:h-px after:bg-green-700">Our Services</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/services/technicians/electrician" className="flex items-center text-gray-300 hover:text-white transition-colors group">
                  <Zap size={16} className="mr-2 text-yellow-400" /> 
                  <span>Electrician Services</span>
                  <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/services/technicians/plumber" className="flex items-center text-gray-300 hover:text-white transition-colors group">
                  <Droplet size={16} className="mr-2 text-blue-400" /> 
                  <span>Plumbing Services</span>
                  <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/services/technicians/carpenter" className="flex items-center text-gray-300 hover:text-white transition-colors group">
                  <Hammer size={16} className="mr-2 text-amber-400" /> 
                  <span>Carpentry Services</span>
                  <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/services/technicians/ac-technician" className="flex items-center text-gray-300 hover:text-white transition-colors group">
                  <Snowflake size={16} className="mr-2 text-cyan-400" /> 
                  <span>AC Repair & Service</span>
                  <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="flex items-center text-gray-300 hover:text-white transition-colors group">
                  <span>View All Services</span>
                  <ChevronRight size={14} className="ml-2" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center after:content-[''] after:ml-4 after:flex-grow after:h-px after:bg-green-700">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/book" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Book A Technician</span>
                  <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>About Us</span>
                  <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Pricing & Packages</span>
                  <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Blog & Tips</span>
                  <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Join As A Technician</span>
                  <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center after:content-[''] after:ml-4 after:flex-grow after:h-px after:bg-green-700">Contact Us</h3>
            <ul className="space-y-5">
              <li className="flex">
                <Phone size={18} className="text-green-400 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Customer Service</p>
                  <a href="tel:+918008330905" className="text-gray-300 hover:text-white">+91 8008 330 905</a>
                </div>
              </li>
              <li className="flex">
                <Clock size={18} className="text-green-400 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Working Hours</p>
                  <p className="text-gray-300">Mon-Sun: 8:00 AM - 10:00 PM</p>
                </div>
              </li>
              <li className="flex">
                <Mail size={18} className="text-green-400 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Email Us</p>
                  <a href="mailto:support@macha.com" className="text-gray-300 hover:text-white">support@macha.com</a>
                </div>
              </li>
              <li className="flex">
                <MapPin size={18} className="text-green-400 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Head Office</p>
                  <p className="text-gray-300">123 Service Road, Hyderabad, TS</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-green-800">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-white">4.9/5</div>
              <div className="flex items-center mt-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="text-sm text-gray-400">Based on 5k+ reviews</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium text-white">5,000+</div>
              <div className="text-sm text-gray-400">Completed Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium text-white">100%</div>
              <div className="text-sm text-gray-400">Verified Technicians</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium text-white">30-Day</div>
              <div className="text-sm text-gray-400">Service Guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} MACHA Technician Services. All Rights Reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-500 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TechnicianFooter;
