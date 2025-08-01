import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, Phone, MessageCircle, User, Wrench, Zap, Droplet, Hammer, Snowflake
} from 'lucide-react';
import machaLogo from '../../assets/macha-logo.jpg';

const TechnicianNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  // Determine if we're on the main technicians page or a specific service page
  const isMainPage = location.pathname === '/services/technicians';
  const currentService = location.pathname.split('/').pop();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleServices = () => setIsServicesOpen(!isServicesOpen);

  const services = [
    { name: 'Electrician', path: '/services/technicians/electrician', icon: <Zap size={18} /> },
    { name: 'Plumber', path: '/services/technicians/plumber', icon: <Droplet size={18} /> },
    { name: 'Carpenter', path: '/services/technicians/carpenter', icon: <Hammer size={18} /> },
    { name: 'AC Technician', path: '/services/technicians/ac-technician', icon: <Snowflake size={18} /> },
  ];

  const getServiceColor = () => {
    switch (currentService) {
      case 'electrician': return 'bg-green-500';
      case 'plumber': return 'bg-green-600';
      case 'carpenter': return 'bg-green-700';
      case 'ac-technician': return 'bg-green-500';
      default: return 'bg-green-600';
    }
  };

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5
      }
    }
  };

  const staggerMenuItems = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    show: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const serviceDropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg py-3' 
          : 'bg-gradient-to-r from-green-900/95 to-black/95 py-3'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={machaLogo} 
              alt="MACHA Logo" 
              className="h-12 w-auto rounded-md object-cover shadow-sm"
            />
            <div className="ml-3">
              <span className={`font-bold text-2xl ${isScrolled ? 'text-gray-800' : 'text-white'} transition-all duration-300`}>MACHA</span>
              <div className="flex items-center">
                <span className={`text-sm font-medium ${isScrolled ? 'text-green-700' : 'text-green-300'} transition-all duration-300`}>Technician Services</span>
                <span className={`inline-block w-2.5 h-2.5 rounded-full ml-2 ${getServiceColor()}`}></span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <NavLink 
              to="/services/technicians" 
              className={({ isActive }) => 
                `font-medium text-lg transition-colors ${
                  isScrolled 
                    ? isActive ? 'text-green-700' : 'text-gray-700 hover:text-green-700' 
                    : isActive ? 'text-white' : 'text-gray-200 hover:text-white'
                }`
              }
            >
              Home
            </NavLink>
            
            <div className="relative group">
              <button 
                className={`flex items-center font-medium text-lg ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-green-700' 
                    : 'text-gray-200 hover:text-white'
                } transition-colors`}
                onClick={toggleServices}
              >
                Services <ChevronDown size={18} className={`ml-1.5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={serviceDropdownVariants}
                    className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl py-3 w-64 z-20 overflow-hidden"
                  >
                    {services.map((service, index) => (
                      <NavLink
                        key={index}
                        to={service.path}
                        className={({ isActive }) => 
                          `block px-5 py-3 text-base hover:bg-gray-50 transition-colors flex items-center ${
                            isActive ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'
                          }`
                        }
                      >
                        <span className="mr-3 text-green-600">{service.icon}</span>
                        {service.name}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <NavLink 
              to="/book" 
              className={({ isActive }) => 
                `font-medium text-lg transition-colors ${
                  isScrolled 
                    ? isActive ? 'text-green-700' : 'text-gray-700 hover:text-green-700' 
                    : isActive ? 'text-white' : 'text-gray-200 hover:text-white'
                }`
              }
            >
              Book Now
            </NavLink>
            
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `font-medium text-lg transition-colors ${
                  isScrolled 
                    ? isActive ? 'text-green-700' : 'text-gray-700 hover:text-green-700' 
                    : isActive ? 'text-white' : 'text-gray-200 hover:text-white'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Contact Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="tel:+918008330905" 
              className={`px-5 py-2.5 flex items-center text-base font-medium rounded-lg transition-all ${
                isScrolled 
                  ? 'text-green-700 hover:bg-green-50' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Phone size={18} className="mr-2" />
              <span>Call Us</span>
            </a>
            <Link 
              to="/book" 
              className={`px-5 py-2.5 text-base font-medium rounded-lg transition-all ${
                isScrolled 
                  ? 'bg-green-700 text-white hover:bg-green-800' 
                  : 'bg-white text-green-800 hover:bg-green-50'
              }`}
            >
              Book a Technician
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 rounded-lg ${
              isScrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            } transition-colors`}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white shadow-lg"
          >
            <motion.div 
              variants={staggerMenuItems}
              initial="hidden"
              animate="show"
              className="container mx-auto px-6 py-6 divide-y divide-gray-200"
            >
              <motion.nav variants={staggerMenuItems} className="py-6 space-y-6">
                <motion.div variants={menuItemVariants}>
                  <NavLink 
                    to="/services/technicians" 
                    className={({ isActive }) => 
                      `block text-xl font-medium ${isActive ? 'text-green-700' : 'text-gray-800'}`
                    }
                  >
                    Home
                  </NavLink>
                </motion.div>
                
                <motion.div variants={menuItemVariants}>
                  <button 
                    className="flex items-center w-full text-xl font-medium text-gray-800 mb-3"
                    onClick={toggleServices}
                  >
                    Services <ChevronDown size={20} className={`ml-2 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pl-5 border-l-2 border-green-100"
                      >
                        <motion.div 
                          variants={staggerMenuItems}
                          initial="hidden"
                          animate="show"
                          className="space-y-4 py-2"
                        >
                          {services.map((service, index) => (
                            <motion.div key={index} variants={menuItemVariants}>
                              <NavLink
                                to={service.path}
                                className={({ isActive }) => 
                                  `block py-2 text-lg flex items-center ${
                                    isActive ? 'text-green-700 font-medium' : 'text-gray-700'
                                  }`
                                }
                              >
                                <span className="mr-3 text-green-600">{service.icon}</span>
                                {service.name}
                              </NavLink>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                <motion.div variants={menuItemVariants}>
                  <NavLink 
                    to="/book" 
                    className={({ isActive }) => 
                      `block text-xl font-medium ${isActive ? 'text-green-700' : 'text-gray-800'}`
                    }
                  >
                    Book Now
                  </NavLink>
                </motion.div>
                
                <motion.div variants={menuItemVariants}>
                  <NavLink 
                    to="/contact" 
                    className={({ isActive }) => 
                      `block text-xl font-medium ${isActive ? 'text-green-700' : 'text-gray-800'}`
                    }
                  >
                    Contact
                  </NavLink>
                </motion.div>
              </motion.nav>
              
              <motion.div variants={menuItemVariants} className="py-6 grid grid-cols-1 gap-4">
                <a 
                  href="tel:+918008330905" 
                  className="py-3 flex items-center justify-center text-base font-medium rounded-lg border-2 border-green-700 text-green-700 hover:bg-green-50 transition-colors"
                >
                  <Phone size={18} className="mr-2" />
                  <span>Call Us</span>
                </a>
                <Link 
                  to="/book" 
                  className="py-3 flex items-center justify-center text-base bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors"
                >
                  <User size={18} className="mr-2" />
                  <span>Book Now</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default TechnicianNavbar;