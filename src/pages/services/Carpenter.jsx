import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Phone,
  CheckCircle,
  Check,
  Star,
  Clock,
  Shield,
  Hammer,
  Info,
  AlertCircle
} from 'lucide-react';
import machaLogo from '../../assets/macha-logo.jpg';

const Carpenter = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState('essential');

  const handleBookNow = () => {
    navigate('/book');
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 pb-16">
      {/* Back to More Link */}
      <div className="container mx-auto px-4 py-4">
        <Link
          to="/services/technicians"
          className="inline-flex items-center text-green-700 hover:text-green-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="font-medium">Back to Technicians</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-green-900/60 to-green-700/70 mix-blend-multiply">
        <div className="absolute inset-0 bg-opacity-70 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 text-white"
            >
              {/* MACHA Logo display */}
              <div className="mb-6">
                <img src={machaLogo} alt="MACHA Logo" className="h-16 rounded-lg shadow-lg" />
              </div>

              <span className="inline-block px-4 py-1.5 bg-white bg-opacity-20 text-white text-sm font-medium rounded-full mb-4">Home Services</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Carpentry Services</h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">Skilled carpenters for all your furniture repair, customization, and woodworking needs</p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="text-green-300 fill-green-300" />
                    ))}
                  </div>
                  <span className="ml-2 font-semibold">4.8/5</span>
                  <span className="ml-2 text-white text-opacity-80">(1.5K+ reviews)</span>
                </div>

                <div className="flex items-center">
                  <Clock size={18} className="mr-2" />
                  <span>Within 2 hours</span>
                </div>

                <div className="flex items-center">
                  <Shield size={18} className="mr-2" />
                  <span>6-month warranty</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+918008330905"
                  className="px-8 py-3 bg-white text-green-800 font-semibold rounded-lg hover:bg-green-50 transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5 mr-2 inline" /> Call Now
                </a>
                <button
                  onClick={handleBookNow}
                  className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
                >
                  <Calendar className="w-5 h-5 mr-2 inline" /> Book Service
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:w-1/2 mt-12 md:mt-0"
            >
              <div className="bg-white p-6 rounded-xl shadow-xl max-w-md mx-auto">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Book a Carpenter in 3 Easy Steps</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold flex-shrink-0">1</div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-800">Choose Your Service</h4>
                      <p className="text-gray-600 text-sm">Select from our range of carpentry services</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold flex-shrink-0">2</div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-800">Pick a Convenient Time</h4>
                      <p className="text-gray-600 text-sm">We offer flexible scheduling options</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold flex-shrink-0">3</div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-800">Get Expert Service</h4>
                      <p className="text-gray-600 text-sm">Our skilled carpenter will arrive with proper tools</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleBookNow}
                  className="w-full mt-6 px-4 py-2.5 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Our Carpentry Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            We offer comprehensive woodworking and furniture services. Our skilled carpenters can handle all types of wooden fixtures and furniture needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Hammer className="w-7 h-7 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Furniture Repair</h3>
              <p className="text-gray-600 mb-4">
                Expert repair for all types of furniture including chairs, tables, cabinets, and beds to extend their life and usability.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Joint and structure repairs</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Surface refinishing</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Parts replacement</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Hammer className="w-7 h-7 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Installations</h3>
              <p className="text-gray-600 mb-4">
                Custom-built shelving, cabinets, wardrobes, and other wooden fixtures designed to perfectly fit your space.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Built-in storage solutions</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Custom shelving units</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Wardrobe installations</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Door & Window Work</h3>
              <p className="text-gray-600 mb-4">
                Installation, repair, and adjustment of doors, windows, and their frames to ensure proper operation and security.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Door alignment and fixing</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Window frame repairs</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Lock installation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Package Selection */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Service Package</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Select the package that suits your carpentry needs. All packages include service by skilled professionals.
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-5xl mx-auto">
            <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-8 mx-auto md:mx-0">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedPackage === 'essential' ? 'bg-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setSelectedPackage('essential')}
              >
                Essential
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedPackage === 'standard' ? 'bg-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setSelectedPackage('standard')}
              >
                Standard
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${selectedPackage === 'premium' ? 'bg-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setSelectedPackage('premium')}
              >
                Premium
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {selectedPackage === 'essential' && (
              <>
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold mb-2">Quick Repair</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹499</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">Basic furniture and fixture repairs requiring minimal materials</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Chair/table wobble fix</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Door/drawer adjustments</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Hardware replacement</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>30-day service warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-600 relative lg:scale-105">
                  <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">POPULAR</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Small Installation</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹899</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">Installation of small furniture items and fixtures</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Shelf/rack installation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Small cabinet assembly</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Door/window repairs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>3-month service warranty</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Material recommendations</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold mb-2">Furniture Assembly</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹1,299</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">Professional assembly of flat-pack and ready-to-assemble furniture</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Bed/wardrobe assembly</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Dining table/chairs assembly</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Cabinet/bookshelf assembly</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>3-month assembly warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </>
            )}

            {selectedPackage === 'standard' && (
              <>
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold mb-2">Custom Shelving</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹2,499</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">Custom-designed shelving solutions for your space</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Design consultation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Material selection</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Custom shelf fabrication</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Professional installation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>6-month warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-600 relative lg:scale-105">
                  <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">POPULAR</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Door & Window Package</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹3,999</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">Complete door and window installation or repair</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Door installation/replacement</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Window frame repair</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Hardware upgrades</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Weatherproofing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>6-month warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold mb-2">Furniture Restoration</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹4,499</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">Complete restoration of damaged or antique furniture</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Structural repairs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Wood restoration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Refinishing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Hardware restoration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>1-year warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </>
            )}

            {selectedPackage === 'premium' && (
              <>
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold mb-2">Custom Wardrobe</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹12,999</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">Custom-designed and built wardrobe solution</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Design consultation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Material selection</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Custom fabrication</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Professional installation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>2-year warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-600 relative lg:scale-105">
                  <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">POPULAR</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Kitchen Renovation</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹25,999</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">Complete kitchen cabinet renovation</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Design consultation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Custom cabinet fabrication</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Storage optimization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Hardware selection & installation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>3-year warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold mb-2">Custom Furniture</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹15,999</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">Fully custom-designed furniture pieces</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Design consultation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Premium material selection</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Bespoke craftsmanship</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Customized finishes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>3-year warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our simple process ensures you get quality carpentry services without any hassle.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-semibold text-lg mb-2">Book Service</h3>
              <p className="text-gray-600">Choose your carpentry service and select a convenient appointment time.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-semibold text-lg mb-2">Carpenter Visit</h3>
              <p className="text-gray-600">Our skilled carpenter will arrive to assess the work and discuss requirements.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-semibold text-lg mb-2">Job Execution</h3>
              <p className="text-gray-600">Work is performed with quality craftsmanship and appropriate materials.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="font-semibold text-lg mb-2">Quality Check</h3>
              <p className="text-gray-600">Final inspection ensures the work meets our quality standards before payment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professionals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Our Professional Carpenters</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our carpenters are skilled craftsmen with years of experience in woodworking and furniture making.
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <div className="w-36 h-36 bg-gray-200 rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1613979736942-77aa8602bd46?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                      alt="Professional Carpenter"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <h3 className="font-semibold text-xl">Our Master Carpenters</h3>
                    <div className="ml-4 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">Verified</div>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">(800+ customer ratings)</span>
                  </div>

                  <p className="text-gray-600 mb-4">
                    Our carpenters have an average of 10+ years of experience in woodworking and furniture craftsmanship. They are skilled in various types of wood and construction techniques, ensuring your project is completed to the highest standards.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-1.5" />
                      <span className="text-sm">Skilled craftsmen</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-1.5" />
                      <span className="text-sm">Background-verified</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-1.5" />
                      <span className="text-sm">Experienced</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-1.5" />
                      <span className="text-sm">Professional tools</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Customer Reviews</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            See what our customers have to say about their experience with our carpentry services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-amber-500 fill-amber-500" />
                ))}
              </div>
              <p className="my-4 text-gray-600">
                "The carpenter was exceptionally skilled. He fixed our dining table that had been wobbling for months. He was professional, cleaned up afterward, and the table is now more stable than when it was new!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/women/33.jpg"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Neha Singh</h4>
                  <p className="text-sm text-gray-500">Bangalore</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-amber-500 fill-amber-500" />
                ))}
              </div>
              <p className="my-4 text-gray-600">
                "We had custom shelves built for our living room, and they turned out beautifully. The carpenter suggested some design improvements that made the shelves even more functional. Excellent craftsmanship!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/47.jpg"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Vikram Mehta</h4>
                  <p className="text-sm text-gray-500">Delhi</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} size={18} className="text-amber-500 fill-amber-500" />
                ))}
                <Star size={18} className="text-gray-300" />
              </div>
              <p className="my-4 text-gray-600">
                "I had several doors that wouldn't close properly. The carpenter fixed them all quickly and efficiently. They now close smoothly without any issues. Great service, though slightly on the expensive side."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/22.jpg"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Aditya Sharma</h4>
                  <p className="text-sm text-gray-500">Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-start">
                <span className="text-amber-600 mr-2"><Info size={24} /></span>
                What types of wood do you work with?
              </h3>
              <p className="text-gray-600 pl-8">
                Our carpenters are skilled in working with various types of wood including teak, pine, oak, mahogany, plywood, MDF, and more. We can recommend the best material for your specific project based on your budget, aesthetic preferences, and functional requirements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-start">
                <span className="text-amber-600 mr-2"><Info size={24} /></span>
                How long does a typical carpentry job take?
              </h3>
              <p className="text-gray-600 pl-8">
                The timeline depends on the complexity and scope of the project. Simple repairs might take 1-2 hours, while furniture assembly typically takes 2-4 hours. Custom installations like shelving or wardrobes can take 1-3 days. For larger projects like custom furniture or kitchen renovations, we'll provide a detailed timeline during the consultation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-start">
                <span className="text-amber-600 mr-2"><Info size={24} /></span>
                Do you provide materials or should I purchase them?
              </h3>
              <p className="text-gray-600 pl-8">
                We can handle material sourcing for you, ensuring quality materials that are appropriate for your project. Alternatively, if you prefer to purchase materials yourself, our carpenters can work with what you provide. We'll discuss material requirements during the initial consultation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-start">
                <span className="text-amber-600 mr-2"><AlertCircle size={24} /></span>
                What is covered under your warranty?
              </h3>
              <p className="text-gray-600 pl-8">
                Our warranties cover workmanship and installation defects. This includes issues like joints coming apart, structural failures, or hardware malfunctions when they're due to our installation. Normal wear and tear, damage from misuse, or issues with materials you provided yourself are not covered under warranty.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-start">
                <span className="text-amber-600 mr-2"><AlertCircle size={24} /></span>
                Can you match existing woodwork in my home?
              </h3>
              <p className="text-gray-600 pl-8">
                Yes, our skilled carpenters can match existing woodwork including color, grain, and style. We can take samples or photos of your existing furniture or fixtures to ensure new pieces blend seamlessly with your current decor. For precise color matching, we can create custom stains or finishes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-green-800 to-black rounded-2xl p-8 md:p-12 shadow-lg max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to transform your space?</h2>
                <p className="text-green-100 text-lg mb-0">
                  Our skilled carpenters are ready to help with all your woodworking and furniture needs.
                </p>
              </div>
              <div className="md:w-1/3 flex flex-col md:items-end gap-4">
                <a
                  href="tel:+918008330905"
                  className="px-6 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors shadow-md text-center"
                >
                  <Phone className="w-5 h-5 mr-2 inline" /> Call Now
                </a>
                <button
                  onClick={handleBookNow}
                  className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 border border-white border-opacity-25 transition-colors shadow-md"
                >
                  <Calendar className="w-5 h-5 mr-2 inline" /> Book Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Carpenter;
