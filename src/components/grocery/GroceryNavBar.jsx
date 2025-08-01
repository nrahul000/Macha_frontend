import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingBag, 
  User, 
  MapPin, 
  Phone, 
  Calendar,
  Menu, 
  X, 
  ChevronDown,
  LogOut
} from 'lucide-react';
import machaLogo from '../../assets/macha-logo.jpg';

const GroceryNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(2); // This would come from your cart context in a real app
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/grocery';
  const dropdownRef = useRef(null);

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCount(cart.reduce((acc, item) => acc + (item.quantity || 1), 0));
      } catch {
        setCartCount(0);
      }
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  // Fetch user info from localStorage (or API if you have)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // Ensure userId is set for checkout page
      if (parsedUser._id) {
        localStorage.setItem('userId', parsedUser._id);
      }
    }
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-200 ${
      isScrolled || !isHomePage 
        ? 'bg-white shadow-lg py-3' 
        : 'bg-gradient-to-r from-green-800 to-green-600 py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center gap-7">
          {/* Logo - Modified to redirect to main application */}
          <div className="flex items-center">
            {/* Change Link to="/" to redirect to main app */}
            <Link to="/" className="flex items-center" title="Back to Main Website">
              <img
                src={machaLogo}
                alt="MACHA Grocery"
                className="h-12 w-auto rounded-full mr-3 border-2 border-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all ring-2 ring-black/20"
              />
              <div className="flex flex-col">
                <span className={`font-bold text-2xl md:text-3xl tracking-tight ${
                  isScrolled || !isHomePage
                    ? 'bg-gradient-to-r from-green-800 via-green-700 to-emerald-600 text-transparent bg-clip-text drop-shadow-sm'
                    : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
                }`}>
                  MACHA
                </span>
                <span className={`text-xs ${
                  isScrolled || !isHomePage
                    ? 'bg-gradient-to-r from-green-950 via-green-900 to-emerald-800 text-transparent bg-clip-text font-bold'
                    : 'text-emerald-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]'
                } tracking-widest uppercase`}>
                  Fresh Grocery
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
<div className="hidden lg:flex items-center space-x-4">
  {/* Location Selector */}
  <div className={`hidden md:flex items-center gap-3 px-4 py-2.0 rounded-full cursor-pointer transition-all text-base ${
    isScrolled || !isHomePage
      ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
      : 'bg-white/20 hover:bg-white/30 text-white'
  }`}>
    <MapPin size={20} className={isScrolled || !isHomePage ? 'text-green-600' : 'text-white'} />
    <div>
      <p className={`text-sm ${isScrolled || !isHomePage ? 'text-gray-500' : 'text-green-100'}`}>Delivery to</p>
      <p className="text-base font-semibold">Hyderabad, 500001</p>
    </div>
    <ChevronDown size={16} className={isScrolled || !isHomePage ? 'text-gray-400' : 'text-green-200'} />
  </div>

  {/* Navigation Links */}
  <div className="hidden lg:flex space-x-2">
    <NavLink 
      to="/grocery" 
      end
      className={({ isActive }) => `px-5 py-3 rounded-xl text-lg font-semibold transition-colors ${
        isActive 
          ? isScrolled || !isHomePage ? 'text-green-600 bg-gray-100' : 'text-white bg-white/30' 
          : isScrolled || !isHomePage ? 'text-gray-700 hover:text-green-600' : 'text-white hover:bg-white/10'
      }`}
    >
      Home
    </NavLink>

    <NavLink 
      to="/grocery/categories"
      className={({ isActive }) => `px-5 py-3 rounded-xl text-lg font-semibold transition-colors ${
        isActive 
          ? isScrolled || !isHomePage ? 'text-green-600 bg-gray-100' : 'text-white bg-white/30' 
          : isScrolled || !isHomePage ? 'text-gray-700 hover:text-green-600' : 'text-white hover:bg-white/10'
      }`}
    >
      Categories
    </NavLink>
  </div>
</div>

{/* Search Bar for Desktop */}
<div className="hidden md:block lg:flex-grow lg:max-w-2xl mx-6">
  <div className="relative">
    <input
      type="text"
      placeholder="Search for fruits, vegetables, and more..."
      className={`w-full pl-12 pr-4 py-3 rounded-full text-base font-medium border-none ${
        isScrolled || !isHomePage 
          ? 'bg-gray-100 focus:bg-white focus:ring-2 focus:ring-green-500 text-gray-800' 
          : 'bg-white/20 focus:bg-white/30 text-white placeholder:text-white/70 focus:ring-2 focus:ring-white/50'
      } transition-colors`}
    />
    <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
      isScrolled || !isHomePage ? 'text-gray-400' : 'text-white/70'
    }`} size={20} />
  </div>
</div>

{/* User Actions */}
<div className="hidden md:flex items-center space-x-4">
  {/* Phone */}
  <a
    href="tel:+918008330905"
    className={`group flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-base transition-all transform hover:scale-105 ${
      isScrolled || !isHomePage
        ? 'bg-green-600 text-white hover:bg-green-700'
        : 'bg-white text-green-700 hover:bg-green-50'
    }`}
  >
    <Phone size={20} className={isScrolled || !isHomePage ? 'text-white' : 'text-green-600'} />
    <span className="hidden xl:inline">Call Us</span>
  </a>

  {/* Cart Link */}
  <Link to="/grocery/cart" className="relative">
    <div className={`flex items-center justify-center h-11 w-11 rounded-full hover:bg-opacity-80 transition ${
      isScrolled || !isHomePage ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-white/20 text-white hover:bg-white/30'
    }`}>
      <ShoppingBag size={24} />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-semibold">
          {cartCount}
        </span>
      )}
    </div>
  </Link>

  {/* User Profile */}
  <div className="relative" ref={dropdownRef}>
    <button
      onClick={toggleProfileDropdown}
      className={`flex items-center justify-center h-11 w-11 rounded-full transition-all ${
        isScrolled || !isHomePage
          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          : 'bg-white/20 text-white hover:bg-white/30'
      }`}
    >
      <User size={22} />
    </button>

    <AnimatePresence>
      {isProfileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-64 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 text-base"
        >
          <div className="py-2" role="menu">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-800">{user?.name || "Guest"}</p>
                        <p className="text-sm text-gray-500 truncate">{user?.email || "Not signed in"}</p>
                      </div>
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
              Your Profile
            </Link>
            <Link to="/grocery/orders" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
              Your Orders
            </Link>
            <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
              Settings
            </Link>
            <div className="border-t border-gray-100">
              <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center">
                <LogOut size={18} className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</div>
          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            {/* Cart icon for mobile */}
            <Link to="/grocery/cart" className="relative mr-2">
              <div className={`flex items-center justify-center h-10 w-10 rounded-full ${
                isScrolled || !isHomePage ? 'bg-gray-100 text-gray-700' : 'bg-white/20 text-white'
              }`}>
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
            
            <button
              onClick={toggleMenu}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled || !isHomePage ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
              }`}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search when scrolled or not home page */}
      <div className="px-4 mt-2 pb-2 md:hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for groceries..."
            className={`w-full pl-10 pr-4 py-2 rounded-full border-none ${
              isScrolled || !isHomePage 
                ? 'bg-gray-100 focus:bg-white focus:ring-2 focus:ring-green-500 text-gray-800' 
                : 'bg-white/20 focus:bg-white/30 text-white placeholder:text-white/70 focus:ring-2 focus:ring-white/50'
            } transition-colors`}
          />
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            isScrolled || !isHomePage ? 'text-gray-400' : 'text-white/70'
          }`} size={18} />
        </div>
      </div>

      {/* Mobile Location Selection */}
      <div className="px-4 pb-2 md:hidden">
        <div className={`flex items-center gap-2 rounded-full py-1 px-3 ${
          isScrolled || !isHomePage ? 'bg-gray-100 text-gray-700' : 'bg-white/20 text-white'
        }`}>
          <MapPin size={16} className={isScrolled || !isHomePage ? 'text-green-600' : 'text-white'} />
          <div className="flex-1">
            <p className={`text-xs ${isScrolled || !isHomePage ? 'text-gray-500' : 'text-green-100'}`}>Delivery to</p>
            <p className="text-sm font-medium truncate">Hyderabad, 500001</p>
          </div>
          <ChevronDown size={14} className={isScrolled || !isHomePage ? 'text-gray-400' : 'text-green-200'} />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg border-t"
          >
            <div className="px-4 py-2 space-y-1">
              <NavLink 
                to="/grocery" 
                end
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              
              <NavLink 
                to="/grocery/categories"
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </NavLink>
              
              <NavLink 
                to="/grocery/offers"
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Offers
              </NavLink>
              
              <NavLink 
                to="/grocery/orders"
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                My Orders
              </NavLink>
              
              <NavLink 
                to="/grocery/profile"
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                My Profile
              </NavLink>
              
              <div className="pt-2">
                <a
                  href="tel:+918008330905"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-green-600 text-white hover:bg-green-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Phone size={18} className="mr-2" />
                    Call Us
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 md:hidden z-20">
        <div className="grid grid-cols-5">
          <NavLink 
            to="/grocery" 
            className={({ isActive }) => `flex flex-col items-center py-2 ${isActive ? 'text-green-600' : 'text-gray-600'}`}
            end
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1 font-medium">Home</span>
          </NavLink>
          
          <NavLink 
            to="/grocery/categories" 
            className={({ isActive }) => `flex flex-col items-center py-2 ${isActive ? 'text-green-600' : 'text-gray-600'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="text-xs mt-1 font-medium">Categories</span>
          </NavLink>
          
          <NavLink 
            to="/grocery/search" 
            className={({ isActive }) => `flex flex-col items-center py-2 ${isActive ? 'text-green-600' : 'text-gray-600'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs mt-1 font-medium">Search</span>
          </NavLink>
          
          <NavLink 
            to="/grocery/cart" 
            className={({ isActive }) => `flex flex-col items-center py-2 ${isActive ? 'text-green-600' : 'text-gray-600'} relative`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-xs mt-1 font-medium">Cart</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-3 bg-green-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </NavLink>
          
          <NavLink 
            to="/grocery/orders" 
            className={({ isActive }) => `flex flex-col items-center py-2 ${isActive ? 'text-green-600' : 'text-gray-600'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-xs mt-1 font-medium">Orders</span>
          </NavLink>
        </div>
      </div>

      {/* Bottom spacer for mobile navigation */}
      <div className="h-16 md:hidden"></div>
    </nav>
  );
};

export default GroceryNavBar;
