import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, User, Moon, Sun, Calendar, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import machaLogo from '../assets/macha-logo.jpg';

// Static services array
const allServices = [
  { name: 'Digital Marketing', slug: 'digital-marketing' },
  { name: 'Event Management', slug: 'event-management' },
  { name: 'FruitBox Supply', slug: 'fruit-box-supply' },
  { name: 'Home Tutors', slug: 'home-tutors' },
  { name: 'House Cleaning', slug: 'home-keeping-' },
  { name: 'Technicians', slug: 'technicians' },
  { name: 'Software Development', slug: 'software-development' },
  { name: 'Medicine Delivery', slug: 'medicine-delivery' },
  { name: 'Packer and Movers', slug: 'packers-and-movers' },
  { name: 'Transportation services', slug: 'transport-services' },
  { name: 'Medical Services', slug: 'medical-services' },
  { name: 'Package Delivery', slug: 'package-delivery' },
  { name: 'House Rental', slug: 'house-rental' },
  { name: 'Grocery Delivery', slug: 'grocery' },
  { name: 'Lunch Box Supply', slug: 'lunch-box-supply' },
  { name: 'Online Classes', slug: 'online-classes' },
  { name: 'Organic Products', slug: 'organic-products' },
  { name: 'Sanitization Services', slug: 'sanitization' },
  { name: 'Security Services', slug: 'security-services' },
  {name : 'Food Delivery', slug: 'food-delivery' },
  {name : 'Your Care', slug: 'your-care' },

 


];

const Navbar = ({ scrolled, darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [serviceSearch, setServiceSearch] = useState('');
  const [serviceResults, setServiceResults] = useState([]);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  const location = useLocation();
  const dropdownRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Redirect admin users to admin dashboard when they access pages with the Navbar
    if (currentUser?.role === 'admin') {
      navigate('/admin', { replace: true });
    }
  }, [currentUser, navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const handleBookNow = (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Please log in to book a service.');
      navigate('/login');
    } else if (currentUser.role === 'admin') {
      alert('Please use the admin panel to manage bookings.');
    } else {
      navigate('/book');
    }
  };

  // Service search handlers (frontend only)
  const handleServiceSearch = (query) => {
    setServiceSearch(query);
    if (query.length < 2) {
      setServiceResults([]);
      setShowServiceDropdown(false);
      return;
    }
    const results = allServices.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase())
    );
    setServiceResults(results);
    setShowServiceDropdown(true);
  };

  const handleServiceSelect = (service) => {
    setServiceSearch('');
    setServiceResults([]);
    setShowServiceDropdown(false);
    if (service.slug === 'food-delivery') {
      navigate('/food-delivery');
    } else if (service.slug === 'grocery') {
      navigate('/grocery');
    } else {
      navigate(`/services/${service.slug}`);
    }
  };

  const navLinks = [
    { name: 'Home', path: 'hero', type: 'scroll' },
    { name: 'About', path: 'about', type: 'scroll' },
    { name: 'Services', path: 'services', type: 'scroll' },
    { name: 'Contact', path: 'contact', type: 'scroll' },
  ];

  if (currentUser?.role === 'admin') return null;

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-200 ${isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <RouterLink to="/" className="flex items-center">
            <img
              src={machaLogo}
              alt="MACHA Logo"
              className="h-14 w-auto rounded-full mr-4 border-2 border-green-500/80 shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all ring-2 ring-black/20"
            />
            <div className="flex flex-col">
              <span className={`font-seriflogo font-bold text-3xl md:text-4xl tracking-tight ${isScrolled
                ? 'bg-gradient-to-r from-green-800 via-green-700 to-emerald-600 text-transparent bg-clip-text drop-shadow-sm'
                : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] [text-shadow:0_0_10px_rgba(20,83,45,0.7)]'
                }`}>
                MACHA
              </span>
              <span className={`text-xs ${isScrolled
                ? 'bg-gradient-to-r from-green-950 via-green-900 to-emerald-800 text-transparent bg-clip-text font-bold'
                : 'text-emerald-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] [text-shadow:0_0_8px_rgba(20,83,45,0.7)]'
                } tracking-widest uppercase`}>
                Everything at your doorstep
              </span>
            </div>
          </RouterLink>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Service Search Bar */}
            <div className="relative">
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-64 rounded-full text-sm text-gray-700 bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-green-500/50 placeholder-gray-400"
                placeholder="Search services..."
                value={serviceSearch}
                onChange={e => handleServiceSearch(e.target.value)}
                onFocus={() => serviceResults.length > 0 && setShowServiceDropdown(true)}
                onBlur={() => setTimeout(() => setShowServiceDropdown(false), 150)}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </span>
              {showServiceDropdown && serviceResults.length > 0 && (
                <div className="absolute z-30 mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                  {serviceResults.map(service => (
                    <div
                      key={service.slug}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onMouseDown={() => handleServiceSelect(service)}
                    >
                      {service.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Nav Links */}
            <div className="hidden md:flex space-x-3">
              {navLinks.map((link) => (
                link.type === 'scroll' ? (
                  <ScrollLink
                    key={link.name}
                    to={link.path}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={800}
                    className={`px-5 py-3 rounded-md text-lg font-bold transition-colors cursor-pointer ${isScrolled
                      ? 'text-gray-700 hover:text-green-600'
                      : 'text-white hover:text-green-200'
                      }`}
                    activeClass="text-green-600"
                  >
                    {link.name}
                  </ScrollLink>
                ) : (
                  <RouterLink
                    key={link.name}
                    to={link.path}
                    className={`px-5 py-3 rounded-md text-lg font-bold transition-colors ${location.pathname === link.path
                      ? 'text-green-600'
                      : isScrolled
                        ? 'text-gray-700 hover:text-green-600'
                        : 'text-white hover:text-green-200'
                      }`}
                  >
                    {link.name}
                  </RouterLink>
                )
              ))}
            </div>

            {/* Call Button */}
            <a
              href="tel:+918008330905"
              className="relative group bg-black hover:from-green-700 hover:to-black text-white py-3 px-5 rounded-full shadow-lg shadow-green-600/20 flex items-center gap-2 font-medium transition-all transform hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-black blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
              <Phone size={18} className="text-white relative z-10 animate-pulse" />
              <span className="relative z-10">Call Us</span>
            </a>

            {/* Book Now Button */}
            <button
              onClick={handleBookNow}
              className="relative group bg-black hover:from-green-700 hover:to-black text-white py-3 px-5 rounded-full shadow-lg shadow-green-600/20 flex items-center gap-2 font-medium transition-all transform hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-black blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
              <Calendar size={18} className="text-white relative z-10" />
              <span className="relative z-10">Book Now</span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative ml-4" ref={dropdownRef}>
              <button
                onClick={toggleProfileDropdown}
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${isScrolled
                  ? 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200'
                  : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                  } transition-all`}
                aria-expanded={isProfileOpen ? "true" : "false"}
              >
                {currentUser?.email ? (
                  <span className="text-lg font-bold">{currentUser.email.charAt(0).toUpperCase()}</span>
                ) : (
                  <User size={24} />
                )}
              </button>

              <AnimatePresence mode="sync">
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {currentUser ? (
                        <>
                          <div className="px-4 py-3 text-sm text-gray-700 border-b">
                            <p className="font-medium">Signed in as</p>
                            <p className="truncate">{currentUser.email}</p>
                            {currentUser.role === 'admin' && (
                              <p className="text-xs text-green-600 font-medium mt-1">Administrator</p>
                            )}
                          </div>
                          {currentUser.role === 'admin' ? (
                            <RouterLink
                              to="/admin"
                              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsProfileOpen(false)}
                              role="menuitem"
                            >
                              Admin Dashboard
                            </RouterLink>
                          ) : (
                            <>
                              <RouterLink
                                to="/profile"
                                className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsProfileOpen(false)}
                                role="menuitem"
                              >
                                Your Profile
                              </RouterLink>
                              
                              <RouterLink
                                to="/bookings"
                                className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsProfileOpen(false)}
                                role="menuitem"
                              >
                                Your Bookings
                              </RouterLink>
                            </>
                          )}
                          <button
                            className="w-full text-left px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                            onClick={handleLogout}
                            role="menuitem"
                          >
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <RouterLink
                            to="/login"
                            className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                            role="menuitem"
                          >
                            Sign In
                          </RouterLink>
                          <RouterLink
                            to="/signup"
                            className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                            role="menuitem"
                          >
                            Create Account
                          </RouterLink>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu buttons */}
          <div className="flex md:hidden items-center">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`p-2 rounded-full ${isScrolled
                ? 'bg-gray-100 text-gray-700'
                : 'bg-white/20 text-white'
                } transition-colors mr-2`}
            >
              {darkMode ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            {/* Profile Icon for Mobile */}
            <div className="relative mr-3" ref={dropdownRef}>
              <button
                onClick={toggleProfileDropdown}
                className={`flex items-center justify-center w-11 h-11 rounded-full border-2 ${isScrolled
                  ? 'bg-green-100 text-green-700 border-green-300'
                  : 'bg-white/20 text-white border-white/30'
                  }`}
                aria-expanded={isProfileOpen ? "true" : "false"}
              >
                {currentUser?.email ? (
                  <span className="text-sm font-bold">{currentUser.email.charAt(0).toUpperCase()}</span>
                ) : (
                  <User size={20} />
                )}
              </button>

              <AnimatePresence mode="sync">
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {currentUser ? (
                        <>
                          <div className="px-4 py-2 text-base text-gray-700 border-b">
                            <p className="font-medium">Signed in as</p>
                            <p className="truncate">{currentUser.email}</p>
                          </div>
                          <RouterLink
                            to="/profile"
                            className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                            role="menuitem"
                          >
                            Your Profile
                          </RouterLink>
                          <RouterLink
                            to="/orders"
                            className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                            role="menuitem"
                          >
                            Your Orders
                          </RouterLink>
                          <RouterLink
                            to="/bookings"
                            className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                            role="menuitem"
                          >
                            Your Bookings
                          </RouterLink>
                          <button
                            className="w-full text-left px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                            onClick={handleLogout}
                            role="menuitem"
                          >
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <RouterLink
                            to="/login"
                            className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                            role="menuitem"
                          >
                            Sign In
                          </RouterLink>
                          <RouterLink
                            to="/signup"
                            className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                            role="menuitem"
                          >
                            Create Account
                          </RouterLink>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={toggleMenu}
              type="button"
              className={`inline-flex items-center justify-center p-4 rounded-md ${isScrolled ? 'text-gray-700 hover:bg-green-100' : 'text-white hover:bg-white/20'
                }`}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <AnimatePresence mode="sync">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t shadow-lg"
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                link.type === 'scroll' ? (
                  <ScrollLink
                    key={link.name}
                    to={link.path}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={800}
                    className={`block px-3 py-3 rounded-md text-lg font-bold cursor-pointer ${'text-gray-700 hover:bg-green-50 hover:text-green-700'
                      }`}
                    activeClass="bg-green-100 text-green-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </ScrollLink>
                ) : (
                  <RouterLink
                    key={link.name}
                    to={link.path}
                    className={`block px-3 py-3 rounded-md text-lg font-bold ${location.pathname === link.path
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </RouterLink>
                )
              ))}
              <a
                href="tel:+918008330905"
                className="block px-3 py-3 rounded-md text-lg font-bold bg-green-600 text-white hover:bg-green-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Phone size={20} className="mr-2" />
                  Call Us
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;