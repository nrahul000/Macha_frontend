import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import machaLogo from '../../assets/macha-logo.jpg';

const FoodDeliveryFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer - Compact version */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            {/* Logo and Brand - Matching Navbar Style */}
            <div className="flex items-center mb-4">
              <img
                src={machaLogo}
                alt="MACHA Logo"
                className="h-14 w-auto rounded-full mr-4 border-2 border-green-500/80 shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all ring-2 ring-black/20"
              />
              <div className="flex flex-col">
                <span className="font-seriflogo font-bold text-3xl tracking-tight bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text drop-shadow-sm">
                  MACHA <span className="text-green-500">Food</span>
                </span>
                <span className="text-xs text-emerald-200 tracking-widest uppercase">
                  Delicious food delivered
                </span>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm mb-6">
              The best food delivery service in Choutuppal. Bringing your favorite meals straight to your doorstep with speed and care.
            </p>
            
            <div className="flex space-x-3 mb-4">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-green-600 flex items-center justify-center transition-colors">
                <Facebook size={15} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-green-600 flex items-center justify-center transition-colors">
                <Instagram size={15} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-green-600 flex items-center justify-center transition-colors">
                <Twitter size={15} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-green-600 flex items-center justify-center transition-colors">
                <Youtube size={15} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 relative pl-3 border-l-2 border-green-500">
              Popular Cuisines
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-gray-400 hover:text-green-500 flex items-center">
                  <ArrowRight size={12} className="mr-2" />
                  South Indian
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-green-500 flex items-center">
                  <ArrowRight size={12} className="mr-2" />
                  North Indian
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-green-500 flex items-center">
                  <ArrowRight size={12} className="mr-2" />
                  Chinese
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-green-500 flex items-center">
                  <ArrowRight size={12} className="mr-2" />
                  Pizza & Fast Food
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-green-500 flex items-center">
                  <ArrowRight size={12} className="mr-2" />
                  Biryani
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 relative pl-3 border-l-2 border-green-500">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-500 flex items-center">
                  <ArrowRight size={12} className="mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-green-500 flex items-center">
                  <ArrowRight size={12} className="mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-green-500 flex items-center">
                  <ArrowRight size={12} className="mr-2" />
                  All Services
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-green-500 flex items-center">
                  <ArrowRight size={12} className="mr-2" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-green-500 flex items-center">
                  <ArrowRight size={12} className="mr-2" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 relative pl-3 border-l-2 border-green-500">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin size={15} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Choutuppal, Yadadri Bhuvanagiri District, Telangana
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={15} className="text-green-500 mr-2 flex-shrink-0" />
                <a href="tel:+918008330905" className="text-gray-400 hover:text-green-500">
                  +91 800-833-0905
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={15} className="text-green-500 mr-2 flex-shrink-0" />
                <a href="mailto:info@macha.com" className="text-gray-400 hover:text-green-500">
                  info@macha.com
                </a>
              </li>
            </ul>
            
            <div className="mt-4 text-sm">
              <h4 className="text-white font-medium mb-1">Delivery Hours</h4>
              <p className="text-gray-400">Every day: 10:00 AM - 10:00 PM</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="text-gray-400 text-center md:text-left mb-2 md:mb-0">
            &copy; {currentYear} MACHA Food. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="#" className="text-gray-400 hover:text-green-500">FAQ</Link>
            <Link to="#" className="text-gray-400 hover:text-green-500">Support</Link>
            <Link to="#" className="text-gray-400 hover:text-green-500">Partners</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FoodDeliveryFooter;
