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
  Wrench,
  Zap,
  Info,
  AlertCircle
} from 'lucide-react';
import machaLogo from '../../assets/macha-logo.jpg';

const Electrician = () => {
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
        <div className="absolute inset-0 bg-opacity-70 bg-[url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Electrical Services</h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">Expert electricians for all your electrical repair, installation, and maintenance needs</p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="text-green-300 fill-green-300" />
                    ))}
                  </div>
                  <span className="ml-2 font-semibold">4.8/5</span>
                  <span className="ml-2 text-white text-opacity-80">(2.4K+ reviews)</span>
                </div>

                <div className="flex items-center">
                  <Clock size={18} className="mr-2" />
                  <span>Within 90 minutes</span>
                </div>

                <div className="flex items-center">
                  <Shield size={18} className="mr-2" />
                  <span>30-day warranty</span>
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
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Book an Electrician in 3 Easy Steps</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold flex-shrink-0">1</div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-800">Choose Your Service</h4>
                      <p className="text-gray-600 text-sm">Select from our range of electrical services</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold flex-shrink-0">2</div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-800">Pick a Convenient Time</h4>
                      <p className="text-gray-600 text-sm">We offer same-day and next-day slots</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold flex-shrink-0">3</div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-800">Relax and Confirm</h4>
                      <p className="text-gray-600 text-sm">Our professional will arrive at your doorstep</p>
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
          <h2 className="text-3xl font-bold text-center mb-4">Our Electrical Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            We offer a wide range of electrical services for your home and office. Our certified electricians are trained to handle all types of electrical issues.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Electrical Repairs</h3>
              <p className="text-gray-600 mb-4">
                Fix electrical issues, replace damaged components, and restore functionality to your electrical systems.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Switch and socket repairs</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Circuit breaker troubleshooting</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Fan & light fixture issues</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Wrench className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Installations</h3>
              <p className="text-gray-600 mb-4">
                Professional installation of lighting fixtures, fans, switches, outlets and other electrical components.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Ceiling fan installation</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Light fixture mounting</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Outlet & switch installation</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safety Inspections</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive electrical safety checks to identify potential hazards and ensure your home's electrical system is up to code.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Wiring inspection</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Circuit load analysis</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Safety certificate issuance</span>
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
            Select the package that suits your needs. All packages include service by certified professionals.
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
                  <h3 className="text-xl font-bold mb-2">Emergency Fixes</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹499</span>
                    <span className="text-gray-500 ml-2">per visit</span>
                  </div>
                  <p className="text-gray-600 mb-6">Quick fixes for electrical emergencies and minor repairs</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Switch & socket repairs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Simple light fixture fixes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>MCB replacement</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>15-day service warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-500 relative lg:scale-105">
                  <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">POPULAR</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Home Electrical Safety</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹899</span>
                    <span className="text-gray-500 ml-2">per visit</span>
                  </div>
                  <p className="text-gray-600 mb-6">Complete inspection & essential repairs for your home</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Full electrical safety audit</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>MCB & switchboard check</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Minor repairs included</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>30-day service warranty</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Safety certificate</span>
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
                  <h3 className="text-xl font-bold mb-2">Installation Package</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹799</span>
                    <span className="text-gray-500 ml-2">per unit</span>
                  </div>
                  <p className="text-gray-600 mb-6">Professional installation of electrical fixtures</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Fan installation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Light fixture mounting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Switch & socket installation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>30-day installation warranty</span>
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
                  <h3 className="text-xl font-bold mb-2">Rewiring Basic</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹1,999</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">Partial rewiring for specific areas of your home</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Single room rewiring</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>High-quality copper wiring</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>New switches & sockets</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
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

                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-500 relative lg:scale-105">
                  <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">POPULAR</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Full Home Electrical Upgrade</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹5,999</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">Complete electrical system upgrade for your home</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>MCB & distribution box upgrade</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Complete wiring inspection</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Prioritized problem areas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Advanced safety features</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
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

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold mb-2">Power Backup Setup</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹2,499</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">Inverter/UPS installation and setup</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Backup system installation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Wiring for critical areas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>System testing & fine-tuning</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>9-month service warranty</span>
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
                  <h3 className="text-xl font-bold mb-2">Smart Home Wiring</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹8,999</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">Wiring setup for smart home integration</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Smart switch preparation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Hub wiring setup</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>IoT device compatibility</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>1-year technical support</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-500 relative lg:scale-105">
                  <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">POPULAR</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Premium Annual Maintenance</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹12,999</span>
                    <span className="text-gray-500 ml-2">/year</span>
                  </div>
                  <p className="text-gray-600 mb-6">Complete electrical maintenance for 12 months</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>4 scheduled maintenance visits</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>2 emergency calls included</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>20% discount on parts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Priority scheduling</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Annual safety certification</span>
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
                  <h3 className="text-xl font-bold mb-2">Energy Efficiency Audit</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹3,999</span>
                    <span className="text-gray-500 ml-2">one-time</span>
                  </div>
                  <p className="text-gray-600 mb-6">Comprehensive energy usage assessment</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Complete energy usage analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Savings opportunity identification</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Detailed recommendations report</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>One follow-up consultation</span>
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
            Our simple process ensures you get quick and reliable electrical services without any hassle.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-semibold text-lg mb-2">Book Service</h3>
              <p className="text-gray-600">Select your service and choose a convenient time slot online or via phone.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-semibold text-lg mb-2">Electrician Arrival</h3>
              <p className="text-gray-600">Our qualified electrician arrives at your doorstep with all necessary equipment.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-semibold text-lg mb-2">Diagnosis & Quote</h3>
              <p className="text-gray-600">The electrician assesses the issue and provides an upfront quote before starting work.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="font-semibold text-lg mb-2">Service & Payment</h3>
              <p className="text-gray-600">Work is completed to your satisfaction, followed by easy digital payment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professionals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Our Professional Electricians</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            All our electricians are certified, background-verified, and experienced in handling various electrical issues.
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <div className="w-36 h-36 bg-gray-200 rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1565467885064-6147792f5ae8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                      alt="Professional Electrician"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <h3 className="font-semibold text-xl">Our Certified Electricians</h3>
                    <div className="ml-4 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Verified</div>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-green-400 fill-green-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">(1,200+ customer ratings)</span>
                  </div>

                  <p className="text-gray-600 mb-4">
                    Our electricians have an average of 8+ years of experience and undergo rigorous training and background verification. They are equipped with professional tools and follow all safety protocols.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-1.5" />
                      <span className="text-sm">Certified</span>
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
            See what our customers have to say about their experience with our electrical services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-green-400 fill-green-400" />
                ))}
              </div>
              <p className="my-4 text-gray-600">
                "The electrician was very professional and fixed our fan issue quickly. He explained the problem clearly and gave us advice to prevent future issues."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/women/45.jpg"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Priya Sharma</h4>
                  <p className="text-sm text-gray-500">New Delhi</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-green-400 fill-green-400" />
                ))}
              </div>
              <p className="my-4 text-gray-600">
                "Excellent service! The home electrical safety inspection was thorough and I feel much safer now. Will definitely recommend to friends and family."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Rajesh Kumar</h4>
                  <p className="text-sm text-gray-500">Mumbai</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} size={18} className="text-green-400 fill-green-400" />
                ))}
                <Star size={18} className="text-gray-300" />
              </div>
              <p className="my-4 text-gray-600">
                "Got my entire house rewired. The team was punctual, neat, and efficient. They finished ahead of schedule and cleaned up thoroughly after the job."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Anita Desai</h4>
                  <p className="text-sm text-gray-500">Bangalore</p>
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
                <span className="text-yellow-500 mr-2"><Info size={24} /></span>
                How quickly can you send an electrician?
              </h3>
              <p className="text-gray-600 pl-8">
                For most standard services, we can send an electrician within 90 minutes in emergency cases. For non-emergency services, same-day or next-day appointments are typically available.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-start">
                <span className="text-yellow-500 mr-2"><Info size={24} /></span>
                Are your electricians licensed and insured?
              </h3>
              <p className="text-gray-600 pl-8">
                Yes, all our electricians are fully licensed, certified, and insured. They have undergone thorough background checks and have extensive experience in residential and commercial electrical work.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-start">
                <span className="text-yellow-500 mr-2"><Info size={24} /></span>
                Do you provide a warranty on your work?
              </h3>
              <p className="text-gray-600 pl-8">
                Yes, we provide a service warranty on all our electrical work. The warranty period depends on the service package, ranging from 15 days to 1 year. Parts installed also come with manufacturer warranties.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-start">
                <span className="text-yellow-500 mr-2"><AlertCircle size={24} /></span>
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 pl-8">
                We accept cash, major credit/debit cards, UPI payments, and online bank transfers. Payment is collected after the service is completed to your satisfaction.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-start">
                <span className="text-yellow-500 mr-2"><AlertCircle size={24} /></span>
                Will the electrician bring all necessary parts and equipment?
              </h3>
              <p className="text-gray-600 pl-8">
                Our electricians arrive with professional tools and common replacement parts. For specialized components, they can source them for you or provide recommendations on what to purchase.
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
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to fix your electrical issues?</h2>
                <p className="text-green-100 text-lg mb-0">
                  Our professional electricians are just a call away. Book now for same-day service!
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

export default Electrician;
