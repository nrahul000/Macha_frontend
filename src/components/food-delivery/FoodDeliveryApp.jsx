import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, ArrowLeft, ShoppingBag, Clock, Star, MapPin, 
  Filter, ChevronDown, Menu, Phone, User, Heart, AlertCircle 
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFoodDelivery } from '../../context/FoodDeliveryContext';
import machaLogo from '../../assets/macha-logo.jpg';
import FoodDeliveryFooter from './FoodDeliveryFooter';

// Food categories for filter
const categories = [
  "All",
  "North Indian",
  "South Indian",
  "Chinese",
  "Fast Food",
  "Pizza",
  "Biryani",
  "Rolls",
  "Desserts"
];

const FoodDeliveryApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userLocation, setUserLocation] = useState("Choutuppal, Telangana");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  
  // Use context hooks
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const cartRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const { 
    restaurants, 
    popularRestaurants,
    userFavorites, 
    cart, 
    cartRestaurant,
    loading, 
    error, 
    addToCart, 
    removeFromCart, 
    clearCart, 
    toggleFavorite,
    getCartTotal,
    fetchRestaurants
  } = useFoodDelivery();

  // Filter restaurants based on search and category
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = searchTerm === '' || 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || 
      restaurant.cuisineType.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  // Add scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }

      if (cartRef.current && !cartRef.current.contains(event.target) && 
          !event.target.closest('[data-cart-button]')) {
        setIsCartOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle toggle functions
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileDropdown = () => setIsProfileOpen(!isProfileOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const handleBackHome = () => {
    navigate('/');
  };
  
  const handleLocationChange = (location) => {
    setUserLocation(location);
    setShowLocationDropdown(false);
    fetchRestaurants({ location });
  };
  
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    
    navigate('/food-delivery/checkout');
  };

  // Calculate cart total
  const cartTotals = getCartTotal();
  
  // Skeleton loader for restaurants
  const RestaurantSkeleton = () => (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="w-3/4">
            <div className="h-4 bg-gray-200 rounded-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded-full w-1/2"></div>
          </div>
          <div className="flex items-center px-2 py-1 bg-green-500 text-white text-xs rounded">
            <div className="w-4 h-4 border-2 border-white rounded-full animate-spin"></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="w-1/2">
            <div className="h-3 bg-gray-200 rounded-full mb-1"></div>
            <div className="h-3 bg-gray-200 rounded-full mb-1"></div>
          </div>
          <div className="w-1/3">
            <div className="h-3 bg-gray-200 rounded-full mb-1"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with MACHA style */}
      <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-200 ${isScrolled ? 'bg-white shadow-lg py-3' : 'bg-slate-900 py-5'}`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <button onClick={handleBackHome} className="flex items-center">
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
                    MACHA <span className="text-green-500">Food</span>
                  </span>
                  <span className={`text-xs ${isScrolled
                      ? 'bg-gradient-to-r from-green-950 via-green-900 to-emerald-800 text-transparent bg-clip-text font-bold'
                      : 'text-emerald-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] [text-shadow:0_0_8px_rgba(20,83,45,0.7)]'
                    } tracking-widest uppercase`}>
                    Delicious food delivered
                  </span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Desktop Nav Items */}
              <div className="hidden md:flex space-x-3">
                <button
                  onClick={handleBackHome}
                  className={`px-5 py-3 rounded-md text-lg font-bold transition-colors cursor-pointer ${isScrolled
                      ? 'text-gray-700 hover:text-green-600'
                      : 'text-white hover:text-green-200'
                    }`}
                >
                  Home
                </button>
                <a
                  href="#restaurants"
                  className={`px-5 py-3 rounded-md text-lg font-bold transition-colors cursor-pointer ${isScrolled
                      ? 'text-gray-700 hover:text-green-600'
                      : 'text-white hover:text-green-200'
                    }`}
                >
                  Restaurants
                </a>
                <a
                  href="#offers"
                  className={`px-5 py-3 rounded-md text-lg font-bold transition-colors cursor-pointer ${isScrolled
                      ? 'text-gray-700 hover:text-green-600'
                      : 'text-white hover:text-green-200'
                    }`}
                >
                  Offers
                </a>
              </div>

              {/* Search Bar */}
              <div className="relative w-64">
                <Search size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isScrolled ? 'text-gray-400' : 'text-gray-400'}`} />
                <input 
                  type="text"
                  placeholder="Search for food or restaurants..."
                  className={`pl-10 pr-4 py-2 w-full rounded-full text-sm text-gray-700 ${isScrolled ? 'bg-gray-100 border-none' : 'bg-white/10 border-none'} focus:outline-none focus:ring-2 focus:ring-green-500/50 placeholder-gray-400`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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

              {/* Cart Button with Counter */}
              <button
                data-cart-button
                className="relative group bg-green-600 text-white py-3 px-5 rounded-full shadow-lg shadow-green-600/20 flex items-center gap-2 font-medium transition-all transform hover:scale-105 overflow-hidden"
                onClick={toggleCart}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-green-700 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
                <ShoppingBag size={18} className="text-white relative z-10" />
                <span className="relative z-10">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-green-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
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
                  {currentUser ? (
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
                            
                            <Link
                              to="/profile"
                              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsProfileOpen(false)}
                              role="menuitem"
                            >
                              Your Profile
                            </Link>
                            <Link
                              to="/food-delivery/orders"
                              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsProfileOpen(false)}
                              role="menuitem"
                            >
                              Your Orders
                            </Link>
                            
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
                            <Link
                              to="/login"
                              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsProfileOpen(false)}
                              role="menuitem"
                            >
                              Sign In
                            </Link>
                            <Link
                              to="/signup"
                              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsProfileOpen(false)}
                              role="menuitem"
                            >
                              Create Account
                            </Link>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              {/* Cart Button for Mobile */}
              <button
                data-cart-button
                className="relative mr-3"
                onClick={toggleCart}
              >
                <div className={`flex items-center justify-center w-11 h-11 rounded-full ${isScrolled
                    ? 'bg-green-500 text-white'
                    : 'bg-white/20 text-white'
                  }`}>
                  <ShoppingBag size={20} />
                </div>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-green-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
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
                  {currentUser ? (
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
                            <Link
                              to="/profile"
                              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsProfileOpen(false)}
                              role="menuitem"
                            >
                              Your Profile
                            </Link>
                            <Link
                              to="/orders"
                              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsProfileOpen(false)}
                              role="menuitem"
                            >
                              Your Orders
                            </Link>
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
                            <Link
                              to="/login"
                              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsProfileOpen(false)}
                              role="menuitem"
                            >
                              Sign In
                            </Link>
                            <Link
                              to="/signup"
                              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsProfileOpen(false)}
                              role="menuitem"
                            >
                              Create Account
                            </Link>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle */}
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
                <button
                  onClick={handleBackHome}
                  className="block px-3 py-3 rounded-md text-lg font-bold text-gray-700 hover:bg-green-50 hover:text-green-700"
                >
                  Back to Home
                </button>
                <a
                  href="#restaurants" 
                  className="block px-3 py-3 rounded-md text-lg font-bold text-gray-700 hover:bg-green-50 hover:text-green-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Restaurants
                </a>
                <a
                  href="#offers" 
                  className="block px-3 py-3 rounded-md text-lg font-bold text-gray-700 hover:bg-green-50 hover:text-green-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Offers
                </a>
                
                {/* Mobile Search */}
                <div className="px-3 py-3">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text"
                      placeholder="Search for food or restaurants..."
                      className="pl-10 pr-4 py-2 w-full rounded-full text-sm text-gray-700 bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
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

      {/* Cart Panel */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 z-50 h-full w-full md:w-96 bg-white shadow-lg"
            ref={cartRef}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-bold text-gray-800 flex items-center">
                  <ShoppingBag size={18} className="mr-2 text-green-600" />
                  Your Cart
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
              
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-grow p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <ShoppingBag size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Add items from a restaurant to get started</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Browse Restaurants
                  </button>
                </div>
              ) : (
                <>
                  <div className="p-4 border-b bg-green-50">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <h3 className="font-medium">{cartRestaurant?.name}</h3>
                        <p className="text-sm text-gray-500">
                          {cart.reduce((total, item) => total + item.quantity, 0)} items
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm("Remove all items from cart?")) {
                            clearCart();
                          }
                        }}
                        className="text-sm text-red-600 font-medium"
                      >
                        Clear Cart
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-grow overflow-y-auto p-4">
                    <div className="space-y-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center border-b pb-4">
                          <div className="flex items-start">
                            <div className="h-4 w-4 mt-1 mr-2">
                              {item.veg ? (
                                <span className="text-green-600">●</span>
                              ) : (
                                <span className="text-red-600">●</span>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">{item.name}</h4>
                              <p className="text-gray-500 text-sm">₹{item.price}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span className="mx-2 w-6 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => addToCart(item, { id: cartRestaurant.id, name: cartRestaurant.name })}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t p-4 bg-gray-50">
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Item Total</span>
                        <span>₹{cartTotals.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee</span>
                        <span>₹{cartTotals.deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Taxes</span>
                        <span>₹{cartTotals.taxes.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-gray-800 pt-3 border-t border-gray-200">
                        <span>To Pay</span>
                        <span>₹{cartTotals.total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        navigate('/food-delivery/checkout');
                        setIsCartOpen(false);
                      }}
                      className="w-full mt-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Dark overlay when cart is open */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsCartOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Content Area - Add top padding to account for fixed navbar */}
      <div className="pt-24 md:pt-28 flex-grow">
        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          {loading ? (
            <>
              {/* Hero Banner Skeleton */}
              <div className="rounded-lg overflow-hidden h-40 md:h-64 mb-6 bg-gray-300 animate-pulse"></div>
              
              {/* Categories Skeleton */}
              <div className="mb-6 overflow-x-auto scrollbar-hide">
                <div className="flex space-x-4 pb-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-10 w-32 bg-gray-300 rounded-full animate-pulse"></div>
                  ))}
                </div>
              </div>
              
              {/* Restaurant Skeletons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <RestaurantSkeleton key={i} />
                ))}
              </div>
            </>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="bg-red-100 text-red-700 p-4 rounded-lg flex items-center mb-4">
                <AlertCircle className="mr-2" />
                <div>
                  <p className="font-bold">Error loading restaurants</p>
                  <p>{error}</p>
                </div>
              </div>
              <button
                onClick={() => fetchRestaurants()}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : !selectedRestaurant ? (
            <>
              {/* Hero Banner */}
              <div className="rounded-lg overflow-hidden h-40 md:h-64 mb-6 relative">
                <img 
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" 
                  alt="Food Delivery" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                  <div className="text-white p-6">
                    <h1 className="text-2xl md:text-4xl font-bold mb-2">Food Delivery in {userLocation.split(',')[0]}</h1>
                    <p className="text-sm md:text-base opacity-90">Order food from your favorite restaurants</p>
                  </div>
                </div>
              </div>

              {/* Offers Banner */}
              <div id="offers" className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 mb-8 text-white">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">Get 50% off on your first order!</h2>
                    <p className="text-white/80">Use code WELCOME50 at checkout</p>
                  </div>
                  <button className="bg-white text-green-700 px-6 py-3 rounded-full font-bold hover:bg-green-50 transition-colors">
                    Order Now
                  </button>
                </div>
              </div>

              {/* Category Filters */}
              <div id="restaurants" className="mb-6 overflow-x-auto scrollbar-hide">
                <div className="flex space-x-4 pb-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* No results state */}
              {filteredRestaurants.length === 0 && (
                <div className="bg-white p-8 rounded-lg text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Search size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No restaurants found</h3>
                  <p className="text-gray-600">
                    We couldn't find any restaurants matching your search or filters.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                    }}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Restaurant List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <Link
                    to={`/food-delivery/restaurant/${restaurant._id || restaurant.id}`}
                    key={restaurant._id || restaurant.id}
                    className="block"
                  >
                    <motion.div
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
                      whileHover={{ y: -4 }}
                  >
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(restaurant.id);
                      }} 
                      className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md"
                      aria-label={userFavorites.includes(restaurant.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart 
                        size={18} 
                        className={userFavorites.includes(restaurant.id) ? "text-red-500 fill-red-500" : "text-gray-400"} 
                      />
                    </button>
                    
                    <div className="relative">
                      <img 
                        src={restaurant.imageUrl} 
                        alt={restaurant.name} 
                        className="w-full h-48 object-cover"
                      />
                      {restaurant.discount && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                          <span className="text-white text-sm font-medium">{restaurant.discount}</span>
                        </div>
                      )}
                      {restaurant.promoted && (
                        <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          Promoted
                        </span>
                      )}
                      {restaurant.veg && (
                        <span className="absolute top-2 left-24 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          Pure Veg
                        </span>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-800 mb-1">{restaurant.name}</h3>
                        <div className="flex items-center px-2 py-1 bg-green-500 text-white text-xs rounded">
                          <span>{restaurant.rating}</span>
                          <Star size={12} className="ml-1" fill="white" />
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2">
                        {(Array.isArray(restaurant.cuisineType) ? restaurant.cuisineType.join(', ') : restaurant.cuisineType || '')}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {restaurant.deliveryTime} mins
                        </span>
          
                      </div>
                    </div>
                  </motion.div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            /* Restaurant Detail View */
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Restaurant Header */}
              <div className="relative h-64">
                <button 
                  onClick={() => setSelectedRestaurant(null)}
                  className="absolute top-4 left-4 z-10 bg-white p-2 rounded-full shadow-md"
                >
                  <ArrowLeft size={20} />
                </button>
                
                <img 
                  src={selectedRestaurant.image} 
                  alt={selectedRestaurant.name} 
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h1 className="text-2xl font-bold text-white">{selectedRestaurant.name}</h1>
                  <p className="text-white opacity-90">{selectedRestaurant.cuisine}</p>
                </div>
              </div>
              
              {/* Restaurant Info */}
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-6">
                    <div>
                      <div className="flex items-center text-sm font-medium">
                        <Star size={16} className="mr-1 text-green-500" />
                        <span>{selectedRestaurant.rating}</span>
                      </div>
                      <div className="text-xs text-gray-500">1000+ ratings</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium">{selectedRestaurant.deliveryTime} mins</div>
                      <div className="text-xs text-gray-500">Delivery Time</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium">₹{selectedRestaurant.priceForTwo}</div>
                      <div className="text-xs text-gray-500">Cost for two</div>
                    </div>
                  </div>
                  
                  {selectedRestaurant.discount && (
                    <div className="bg-green-50 text-green-700 text-sm py-1 px-3 rounded-md border border-green-100">
                      {selectedRestaurant.discount}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Menu */}
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-6">Menu</h2>
                
                <div className="space-y-6">
                      {Array.isArray(selectedRestaurant.menuItems) && selectedRestaurant.menuItems.map((item) => (
                    <div 
                      key={item.id}
                      className="flex flex-col md:flex-row gap-4 border-b pb-6"
                    >
                      <div className="md:w-3/4">
                        <div className="flex items-center mb-1">
                          {item.veg ? (
                            <span className="mr-1 text-green-600">●</span>
                          ) : (
                            <span className="mr-1 text-red-600">●</span>
                          )}
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          {item.bestseller && (
                            <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              Bestseller
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">₹{item.price}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      
                      <div className="md:w-1/4 flex flex-col items-center">
                        <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-lg overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {cart.find(cartItem => cartItem.id === item.id) ? (
                          <div className="mt-2 flex items-center space-x-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromCart(item.id);
                              }} 
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-green-50 text-green-500 border border-green-500"
                            >
                              -
                            </button>
                            
                            <span className="text-gray-700 font-medium">
                              {cart.find(cartItem => cartItem.id === item.id).quantity}
                            </span>
                            
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(item, { id: selectedRestaurant.id, name: selectedRestaurant.name });
                              }} 
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(item, { id: selectedRestaurant.id, name: selectedRestaurant.name });
                            }} 
                            className="mt-2 px-4 py-1 text-green-500 border border-green-500 rounded-md text-sm font-medium hover:bg-green-50"
                          >
                            ADD
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Footer */}
      <FoodDeliveryFooter />

      {/* Cart Footer */}
      <AnimatePresence>
        {cart.length > 0 && !isCartOpen && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4"
          >
            <div className="container mx-auto flex justify-between items-center">
              <div>
                <div className="flex items-center">
                  <div className="text-gray-700 font-medium mr-4">
                    {cart.reduce((total, item) => total + item.quantity, 0)} Items | ₹{cartTotals.subtotal.toFixed(2)}
                  </div>
                  
                  {cartRestaurant && (
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-800">
                      from {cartRestaurant.name}
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-500 flex items-center">
                  <Clock size={12} className="mr-1" />
                  Delivery: 30-45 min • Extra charges may apply
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={clearCart}
                  className="px-3 py-2 border border-red-500 text-red-500 rounded-lg text-sm hover:bg-red-50"
                >
                  Clear
                </button>
                <button 
                  onClick={toggleCart}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  View Cart
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FoodDeliveryApp;
//                       setSelectedCategory('All');
//                     }}
//                     className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
//                   >
//                     Clear Filters
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               {/* Restaurant Header */}
//               <div className="relative h-64">
//                 <button 
//                   onClick={() => setSelectedRestaurant(null)}
//                   className="absolute top-4 left-4 z-10 bg-white p-2 rounded-full shadow-md"
//                 >
//                   <ArrowLeft size={20} />
//                 </button>
                
//                 <img 
//                   src={selectedRestaurant.image} 
//                   alt={selectedRestaurant.name} 
//                   className="w-full h-full object-cover"
//                 />
                
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
//                   <h1 className="text-2xl font-bold text-white">{selectedRestaurant.name}</h1>
//                   <p className="text-white opacity-90">{selectedRestaurant.cuisine}</p>
//                 </div>
//               </div>
              
//               {/* Restaurant Info */}
//               <div className="p-4 border-b">
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center space-x-6">
//                     <div>
//                       <div className="flex items-center text-sm font-medium">
//                         <Star size={16} className="mr-1 text-green-500" />
//                         <span>{selectedRestaurant.rating}</span>
//                       </div>
//                       <div className="text-xs text-gray-500">1000+ ratings</div>
//                     </div>
                    
//                     <div>
//                       <div className="text-sm font-medium">{selectedRestaurant.deliveryTime} mins</div>
//                       <div className="text-xs text-gray-500">Delivery Time</div>
//                     </div>
                    
//                     <div>
//                       <div className="text-sm font-medium">₹{selectedRestaurant.priceForTwo}</div>
//                       <div className="text-xs text-gray-500">Cost for two</div>
//                     </div>
//                   </div>
                  
//                   {selectedRestaurant.discount && (
//                     <div className="bg-green-50 text-green-700 text-sm py-1 px-3 rounded-md border border-green-100">
//                       {selectedRestaurant.discount}
//                     </div>
//                   )}
//                 </div>
//               </div>
              
//               {/* Menu */}
//               <div className="p-4">
//                 <h2 className="text-lg font-bold text-gray-800 mb-6">Menu</h2>
                
//                 <div className="space-y-6">
//                   {selectedRestaurant.menuItems.map((item) => (
//                     <div 
//                       key={item.id}
//                       className="flex flex-col md:flex-row gap-4 border-b pb-6"
//                     >
//                       <div className="md:w-3/4">
//                         <div className="flex items-center mb-1">
//                           {item.veg ? (
//                             <span className="mr-1 text-green-600">●</span>
//                           ) : (
//                             <span className="mr-1 text-red-600">●</span>
//                           )}
//                           <h3 className="font-medium text-gray-800">{item.name}</h3>
//                           {item.bestseller && (
//                             <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
//                               Bestseller
//                             </span>
//                           )}
//                         </div>
                        
//                         <p className="text-sm text-gray-600 mb-2">₹{item.price}</p>
//                         <p className="text-sm text-gray-500">{item.description}</p>
//                       </div>
                      
//                       <div className="md:w-1/4 flex flex-col items-center">
//                         <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-lg overflow-hidden">
//                           <img 
//                             src={item.image} 
//                             alt={item.name} 
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
                        
//                         {cart.find(cartItem => cartItem.id === item.id) ? (
//                           <div className="mt-2 flex items-center space-x-2">
//                             <button 
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 removeFromCart(item.id);
//                               }} 
//                               className="w-8 h-8 flex items-center justify-center rounded-full bg-green-50 text-green-500 border border-green-500"
//                             >
//                               -
//                             </button>
                            
//                             <span className="text-gray-700 font-medium">
//                               {cart.find(cartItem => cartItem.id === item.id).quantity}
//                             </span>
                            
//                             <button 
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 addToCart(item, { id: selectedRestaurant.id, name: selectedRestaurant.name });
//                               }} 
//                               className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white"
//                             >
//                               +
//                             </button>
//                           </div>
//                         ) : (
//                           <button 
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               addToCart(item, { id: selectedRestaurant.id, name: selectedRestaurant.name });
//                             }} 
//                             className="mt-2 px-4 py-1 text-green-500 border border-green-500 rounded-md text-sm font-medium hover:bg-green-50"
//                           >
//                             ADD
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>

//       {/* Add Footer */}
//       <FoodDeliveryFooter />

//       {/* Cart Footer */}
//       <AnimatePresence>
//         {cart.length > 0 && !isCartOpen && (
//           <motion.div 
//             initial={{ y: 100, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 100, opacity: 0 }}
//             className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4"
//           >
//             <div className="container mx-auto flex justify-between items-center">
//               <div>
//                 <div className="flex items-center">
//                   <div className="text-gray-700 font-medium mr-4">
//                     {cart.reduce((total, item) => total + item.quantity, 0)} Items | ₹{cartTotal}
//                   </div>
                  
//                   {cart.length > 0 && cart[0].restaurantName && (
//                     <div className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-800">
//                       from {cart[0].restaurantName}
//                     </div>
//                   )}
//                 </div>
//                 <div className="text-xs text-gray-500 flex items-center">
//                   <Clock size={12} className="mr-1" />
//                   Delivery: 30-45 min • Extra charges may apply
//                 </div>
//               </div>
              
//               <div className="flex gap-2">
//                 <button 
//                   onClick={clearCart}
//                   className="px-3 py-2 border border-red-500 text-red-500 rounded-lg text-sm hover:bg-red-50"
//                 >
//                   Clear
//                 </button>
//                 <button 
//                   onClick={toggleCart}
//                   className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
//                 >
//                   View Cart
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default FoodDeliveryApp;
