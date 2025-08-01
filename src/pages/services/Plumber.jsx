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
  Droplet,
  Info,
  AlertCircle,
  Wrench
} from 'lucide-react';
import machaLogo from '../../assets/macha-logo.jpg';

const Plumber = () => {
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
        <div className="absolute inset-0 bg-opacity-70 bg-[url('https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Expert Plumbing Services</h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">Reliable plumbers for all your plumbing repairs, installations, and maintenance needs</p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="text-green-300 fill-green-300" />
                    ))}
                  </div>
                  <span className="ml-2 font-semibold">4.9/5</span>
                  <span className="ml-2 text-white text-opacity-80">(1.8K+ reviews)</span>
                </div>

                <div className="flex items-center">
                  <Clock size={18} className="mr-2" />
                  <span>Within 60 minutes</span>
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
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Book a Plumber in 3 Easy Steps</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold flex-shrink-0">1</div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-800">Choose Your Service</h4>
                      <p className="text-gray-600 text-sm">Select from our range of plumbing services</p>
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
                      <h4 className="font-medium text-gray-800">Relax</h4>
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
          <h2 className="text-3xl font-bold text-center mb-4">Our Plumbing Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            We offer comprehensive plumbing services for residential and commercial properties. Our licensed plumbers can handle all types of plumbing issues.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Droplet className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Leak Repairs</h3>
              <p className="text-gray-600 mb-4">
                Quick identification and fixing of leaks in pipes, faucets, and fixtures to prevent water damage and waste.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Faucet and shower repairs</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Pipe leak fixes</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Toilet leak detection</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Wrench className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Installations</h3>
              <p className="text-gray-600 mb-4">
                Professional installation of sinks, faucets, toilets, showers, water heaters, and other plumbing fixtures.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Bathroom fixture installation</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Kitchen sink & faucet fitting</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Water heater setup</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Drain Services</h3>
              <p className="text-gray-600 mb-4">
                Clear clogged drains and prevent future blockages with our professional drain cleaning and maintenance services.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Drain unclogging</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Hydro jetting</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Preventive maintenance</span>
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
            Select the package that suits your plumbing needs. All packages include service by certified professionals.
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
                  <h3 className="text-xl font-bold mb-2">Quick Fix</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹599</span>
                    <span className="text-gray-500 ml-2">per visit</span>
                  </div>
                  <p className="text-gray-600 mb-6">Basic plumbing repairs for minor issues and quick fixes</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Leaky faucet repair</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Minor drain unblocking</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Toilet flush repair</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>15-day service warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-500 relative lg:scale-105">
                  <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">POPULAR</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Home Plumbing Check</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹999</span>
                    <span className="text-gray-500 ml-2">per visit</span>
                  </div>
                  <p className="text-gray-600 mb-6">Complete inspection and essential repairs for your home</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Full plumbing system inspection</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Water pressure check</span>
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
                      <span>Written report with recommendations</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold mb-2">Fixture Installation</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹899</span>
                    <span className="text-gray-500 ml-2">per unit</span>
                  </div>
                  <p className="text-gray-600 mb-6">Professional installation of plumbing fixtures</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Faucet installation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Sink replacement</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Toilet installation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>30-day installation warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </>
            )}

            {selectedPackage === 'standard' && (
              <>
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold mb-2">Drain Deep Clean</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹1,499</span>
                    <span className="text-gray-500 ml-2">per service</span>
                  </div>
                  <p className="text-gray-600 mb-6">Professional deep cleaning for stubborn drain blockages</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Hydro jetting service</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Multiple drain treatment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>CCTV drain inspection</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>3-month clog-free guarantee</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-500 relative lg:scale-105">
                  <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">POPULAR</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Bathroom Renovation</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹6,999</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">Complete plumbing update for your bathroom</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Fixture replacement (sink, toilet)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Shower/bath installation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Pipe replacement if needed</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Water-saving options</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>1-year warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold mb-2">Water Heater Service</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹2,499</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">Installation, repair and maintenance of water heaters</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Geyser installation/replacement</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>System flushing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Temperature adjustment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>6-month service warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </>
            )}

            {selectedPackage === 'premium' && (
              <>
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold mb-2">Kitchen Plumbing Package</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹7,999</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">Complete kitchen plumbing renovation</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Sink & faucet installation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Dishwasher hookup</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Garbage disposal setup</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>1-year parts warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-500 relative lg:scale-105">
                  <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">POPULAR</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Annual Maintenance Plan</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹14,999</span>
                    <span className="text-gray-500 ml-2">/year</span>
                  </div>
                  <p className="text-gray-600 mb-6">Complete plumbing maintenance for 12 months</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>4 scheduled maintenance visits</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>3 emergency calls included</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>25% discount on parts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Priority scheduling</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Annual plumbing certification</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold mb-2">Water Efficiency Package</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹8,499</span>
                    <span className="text-gray-500 ml-2">one-time</span>
                  </div>
                  <p className="text-gray-600 mb-6">Water-saving upgrades for your entire home</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Low-flow fixture installation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Dual-flush toilet conversion</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Leak detection and repair</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Water usage assessment</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
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
            Our simple process ensures you get quick and reliable plumbing services without any hassle.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-semibold text-lg mb-2">Book Service</h3>
              <p className="text-gray-600">Select your plumbing service and choose a convenient time slot.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-semibold text-lg mb-2">Plumber Arrival</h3>
              <p className="text-gray-600">Our qualified plumber arrives at your doorstep with all necessary equipment.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-semibold text-lg mb-2">Diagnosis & Quote</h3>
              <p className="text-gray-600">The plumber assesses the issue and provides an upfront quote before starting work.</p>
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
          <h2 className="text-3xl font-bold text-center mb-4">Our Professional Plumbers</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            All our plumbers are certified, background-verified, and experienced in handling various plumbing issues.
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <div className="w-36 h-36 bg-gray-200 rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                      alt="Professional Plumber"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <h3 className="font-semibold text-xl">Our Certified Plumbers</h3>
                    <div className="ml-4 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Verified</div>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-green-400 fill-green-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">(950+ customer ratings)</span>
                  </div>

                  <p className="text-gray-600 mb-4">
                    Our plumbers have a minimum of 5+ years of experience and undergo regular training on the latest plumbing techniques and technologies. They are equipped with professional-grade tools to handle any plumbing situation.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-1.5" />
                      <span className="text-sm">Licensed</span>
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
            See what our customers have to say about their experience with our plumbing services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-green-400 fill-green-400" />
                ))}
              </div>
              <p className="my-4 text-gray-600">
                "The plumber arrived on time and quickly identified the issue with our kitchen sink. He explained everything clearly and fixed it without making a mess. Great service!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/54.jpg"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Arjun Kapoor</h4>
                  <p className="text-sm text-gray-500">Hyderabad</p>
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
                "I had a major bathroom renovation done through their premium service package. The team was professional, neat, and completed the work ahead of schedule. Very satisfied!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/women/28.jpg"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Meera Patel</h4>
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
                "Called for an emergency leak at midnight, and they had a plumber at my door within an hour. Fast response, fair pricing, and the leak was fixed perfectly. Would recommend for emergency services."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/76.jpg"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Rahul Verma</h4>
                  <p className="text-sm text-gray-500">Pune</p>
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
                <span className="text-green-500 mr-2"><Info size={24} /></span>
                How quickly can you respond to a plumbing emergency?
              </h3>
              <p className="text-gray-600 pl-8">
                For plumbing emergencies like burst pipes or major leaks, we aim to dispatch a plumber within 60 minutes. For non-emergency services, we offer same-day or next-day appointments based on availability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-start">
                <span className="text-green-500 mr-2"><Info size={24} /></span>
                Are your plumbers licensed and insured?
              </h3>
              <p className="text-gray-600 pl-8">
                Yes, all our plumbers are fully licensed, certified, and insured. They have undergone thorough background checks and have extensive experience in residential and commercial plumbing work.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-start">
                <span className="text-green-500 mr-2"><Info size={24} /></span>
                Do you provide warranties on your plumbing work?
              </h3>
              <p className="text-gray-600 pl-8">
                Yes, we provide service warranties on all our plumbing work. The warranty period depends on the service package, ranging from 15 days for basic repairs to 1 year for premium installations and renovations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-start">
                <span className="text-green-500 mr-2"><AlertCircle size={24} /></span>
                How are your plumbing services priced?
              </h3>
              <p className="text-gray-600 pl-8">
                We provide transparent pricing with no hidden fees. For basic services, we charge a fixed rate. For complex jobs, our plumber will diagnose the issue and provide a detailed quote before starting any work, which you can approve.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-start">
                <span className="text-green-500 mr-2"><AlertCircle size={24} /></span>
                Can you source and supply plumbing fixtures?
              </h3>
              <p className="text-gray-600 pl-8">
                Yes, we can supply high-quality plumbing fixtures from trusted brands. Alternatively, if you've already purchased your fixtures, our plumbers are happy to install them. We also offer guidance on selecting appropriate fixtures for your needs.
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
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Need a plumber today?</h2>
                <p className="text-green-100 text-lg mb-0">
                  Our professional plumbers are just a call away. Book now for same-day service!
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

export default Plumber;
