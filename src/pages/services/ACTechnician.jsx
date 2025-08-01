import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  AlertCircle,
  Wrench,
  Sparkles,
} from "lucide-react";
import machaLogo from "../../assets/macha-logo.jpg";

const ACTechnician = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState("essential");

  const handleBookNow = () => {
    navigate("/book");
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[93vh]  mt-3 py-24 bg-gradient-to-b from-green-900/60 to-green-700/70 mix-blend-multiply">
        <div className="absolute inset-0 bg-opacity-70 bg-[url('https://www.shutterstock.com/image-photo/hvac-technician-performing-air-conditioner-600nw-2488702851.jpg')] bg-cover bg-center mix-blend-overlay"></div>

        {/* Back to Technicians Link  */}
        <div className="absolute left-0 top-0 w-full z-20 pt-10">
          <div className="container mx-auto px-4 pt-6">
            <Link
              to="/services/technicians"
              className="inline-flex items-center text-white hover:text-green-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to Technicians</span>
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-28">
          <div className="flex flex-col md:flex-row md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 text-white"
            >
              {/* MACHA Logo display */}
              <div className="mb-8">
                <img
                  src={machaLogo}
                  alt="MACHA Logo"
                  className="h-20 rounded-lg shadow-lg"
                />
              </div>

              <span className="inline-block px-6 py-2 bg-white bg-opacity-20 text-white text-base font-medium rounded-full mb-6">
                Home Services
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                AC Repair & Service
              </h1>
              <p className="text-2xl md:text-3xl mb-10 text-green-100">
                Professional AC technicians for repair, installation, and
                maintenance of all types of air conditioners
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="text-green-300 fill-green-300"
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-semibold">4.8/5</span>
                  <span className="ml-2 text-white text-opacity-80">
                    (1.2K+ reviews)
                  </span>
                </div>

                <div className="flex items-center">
                  <Clock size={20} className="mr-2" />
                  <span>Within 120 minutes</span>
                </div>

                <div className="flex items-center">
                  <Shield size={20} className="mr-2" />
                  <span>90-day warranty</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+918008330905"
                  className="px-8 py-3 bg-white text-green-800 text-lg font-bold rounded-xl hover:bg-green-50 transition-colors shadow-lg flex items-center"
                >
                  <Phone className="w-6 h-6 mr-2 inline" /> Call Now
                </a>
                <button
                  onClick={handleBookNow}
                  className="px-8 py-3 bg-green-600 text-white text-lg font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg flex items-center"
                >
                  <Calendar className="w-6 h-6 mr-2 inline" /> Book Service
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:w-1/2 mt-12 md:mt-0"
            >
              <div className="bg-white ml-56 p-8 rounded-2xl shadow-2xl max-w-lg mx-auto">
                <h3 className="text-2xl font-extrabold mb-6 text-gray-800">
                  Book an AC Technician in 3 Easy Steps
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xl font-extrabold flex-shrink-0">
                      1
                    </div>
                    <div className="ml-6">
                      <h4 className="font-bold text-xl text-gray-800 mb-1">
                        Choose Your Service
                      </h4>
                      <p className="text-gray-600 text-base">
                        Select from our range of AC services
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xl font-extrabold flex-shrink-0">
                      2
                    </div>
                    <div className="ml-6">
                      <h4 className="font-bold text-xl text-gray-800 mb-1">
                        Schedule an Appointment
                      </h4>
                      <p className="text-gray-600 text-base">
                        Choose a time that works for you
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xl font-extrabold flex-shrink-0">
                      3
                    </div>
                    <div className="ml-6">
                      <h4 className="font-bold text-xl text-gray-800 mb-1">
                        Expert Service
                      </h4>
                      <p className="text-gray-600 text-base">
                        Our technician will arrive and solve your AC issues
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleBookNow}
                  className="w-full mt-8 px-6 py-3 bg-green-700 text-white text-lg font-bold rounded-xl hover:bg-green-800 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AC Services Section */}
      <section className="py-16 bg-gray-30">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl font-bold text-center mb-4">
            Our AC Services
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
            We provide comprehensive air conditioning services for residential
            and commercial properties. Our certified technicians can handle all
            types of AC units.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AC Repair */}
            <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-6 rounded-xl overflow-hidden h-56 relative">
                <img
                  src="https://img.freepik.com/premium-photo/air-conditioner-man-electrical-machine-repair-with-person-home-with-ac-box-maintenance-screwdriver-system-control-installation-inspection-aircon-fix-house-with-contractor_590464-213484.jpg"
                  alt="AC Repair"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <motion.div
                  className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Wrench className="w-7 h-7 text-green-600" />
                </motion.div>
              </div>
              <h3 className="text-3xl font-semibold mb-2">AC Repair</h3>
              <p className="text-gray-600 mb-4">
                Professional diagnosis and repair of all air conditioner
                problems, from minor issues to major breakdowns.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check size={24} className="text-green-500 mr-2" />
                  Cooling issues troubleshooting
                </li>
                <li className="flex items-center">
                  <Check size={24} className="text-green-500 mr-2" />
                  Electrical component repair
                </li>
                <li className="flex items-center">
                  <Check size={24} className="text-green-500 mr-2" />
                  Compressor and condenser fixes
                </li>
              </ul>
            </div>

            {/* AC Servicing */}
            <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-6 rounded-xl overflow-hidden h-56 relative">
                <img
                  src="https://img.freepik.com/free-photo/repairman-doing-air-conditioner-service_1303-26541.jpg"
                  alt="AC Servicing"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <motion.div
                  className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Hammer className="w-7 h-7 text-green-600" />
                </motion.div>
              </div>
              <h3 className="text-3xl font-semibold mb-2">AC Servicing</h3>
              <p className="text-gray-600 mb-4">
                Regular maintenance and servicing to keep your AC running
                efficiently and extend its lifespan.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check size={24} className="text-green-500 mr-2" />
                  Filter cleaning/replacement
                </li>
                <li className="flex items-center">
                  <Check size={24} className="text-green-500 mr-2" />
                  Coil cleaning
                </li>
                <li className="flex items-center">
                  <Check size={24} className="text-green-500 mr-2" />
                  Gas refilling if required
                </li>
              </ul>
            </div>

            {/* AC Installation */}
            <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-6 rounded-xl overflow-hidden h-56 relative">
                <img
                  src="https://img.freepik.com/premium-photo/repairman-fix-air-conditioning-systems-male-technicians-service-repair-maintenance-air-conditioners-air-conditioning-technicians-install-new-air-conditioners-homes_255667-83316.jpg"
                  alt="AC Installation"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <motion.div
                  className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Sparkles className="w-7 h-7 text-green-600" />
                </motion.div>
              </div>
              <h3 className="text-3xl font-semibold mb-2">AC Installation</h3>
              <p className="text-gray-600 mb-4">
                Expert installation of new air conditioning units, ensuring
                optimal performance and energy efficiency.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check size={24} className="text-green-500 mr-2" />
                  New unit installation
                </li>
                <li className="flex items-center">
                  <Check size={24} className="text-green-500 mr-2" />
                  Proper wiring and mounting
                </li>
                <li className="flex items-center">
                  <Check size={24} className="text-green-500 mr-2" />
                  System testing and calibration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Package Selection  transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500*/}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4">
            Choose Your Service Package
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
            Select the package that suits your AC needs. All packages include
            service by certified professionals.
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-5xl mx-auto">
            <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-8 mx-auto md:mx-0">
              <button
                className={`px-4 py-2 rounded-md text-md font-medium ${selectedPackage === "essential"
                    ? "bg-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
                onClick={() => setSelectedPackage("essential")}
              >
                Essential
              </button>
              <button
                className={`px-4 py-2 rounded-md text-md font-medium ${selectedPackage === "standard"
                    ? "bg-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
                onClick={() => setSelectedPackage("standard")}
              >
                Standard
              </button>
              <button
                className={`px-4 py-2 rounded-md text-md font-medium ${selectedPackage === "premium"
                    ? "bg-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
                onClick={() => setSelectedPackage("premium")}
              >
                Premium
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {selectedPackage === "essential" && (
              <>
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                  <h3 className="text-xl font-bold mb-2">AC Inspection</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹499</span>
                    <span className="text-gray-500 ml-2">per visit</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Basic inspection and minor fixes for your AC unit
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Visual inspection</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Performance check</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Minor adjustments</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
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

                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-300 relative lg:scale-105 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                  <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      POPULAR
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Regular Servicing</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹999</span>
                    <span className="text-gray-500 ml-2">per unit</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Complete AC servicing for optimal performance
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Filter cleaning/replacement</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Indoor & outdoor unit cleaning</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Drainage system clearing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Performance optimization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>30-day service warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                  <h3 className="text-xl font-bold mb-2">Repair Visit</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹749</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Professional diagnosis and repair of AC issues
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Comprehensive diagnosis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Minor repairs included</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Quote for major repairs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>30-day repair warranty</span>
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

            {selectedPackage === "standard" && (
              <>
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                  <h3 className="text-xl font-bold mb-2">Gas Refill</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹1,799</span>
                    <span className="text-gray-500 ml-2">per unit</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Complete AC refrigerant refill service
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Gas leak detection</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Pressurization check</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Refrigerant refilling</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Performance testing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>60-day warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-300 relative lg:scale-105 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                  <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      POPULAR
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Deep Cleaning</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹2,499</span>
                    <span className="text-gray-500 ml-2">per unit</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Comprehensive deep cleaning of your AC unit
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Complete disassembly cleaning</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Anti-bacterial treatment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Coil deep cleaning</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Blower & fan cleaning</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>90-day warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                  <h3 className="text-xl font-bold mb-2">AC Installation</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹2,999</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Professional installation of new AC units
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Wall-mounted split AC installation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Indoor & outdoor unit mounting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Basic copper pipe installation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Performance testing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>90-day installation warranty</span>
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

            {selectedPackage === "premium" && (
              <>
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                  <h3 className="text-xl font-bold mb-2">AC Replacement</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹4,999</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Complete replacement of old AC with new unit
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Old unit removal</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>New unit installation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>New piping & brackets</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>6-month installation warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-300 relative lg:scale-105 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                  <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      POPULAR
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Annual Maintenance Contract
                  </h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹5,999</span>
                    <span className="text-gray-500 ml-2">/year</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Complete AC care for 12 months
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>4 scheduled services per year</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>2 free emergency visits</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>20% discount on parts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Priority scheduling</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Year-round warranty</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleBookNow}
                    className="w-full py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:scale-110 hover:border-1 hover:border-green-500">
                  <h3 className="text-xl font-bold mb-2">
                    Commercial AC Service
                  </h3>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">₹9,999</span>
                    <span className="text-gray-500 ml-2">onwards</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Specialized service for business locations
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Multiple unit servicing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Central AC expertise</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Performance optimization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>Efficiency assessment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      />
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
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-30">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-6">How It Works</h2>
          <p className="text-center text-gray-600 mb-14 max-w-3xl mx-auto text-lg">
            Our simple process ensures you get quick and reliable AC services
            without any hassle.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {[
              {
                title: "Book Service",
                desc: "Choose your AC service type and schedule a convenient appointment time.",
                img: "https://img.freepik.com/premium-photo/cropped-image-businessman-using-mobile-phone-desk-office_1048944-29340759.jpg?ga=GA1.1.1872067447.1750850496&w=740",
              },
              {
                title: "Technician Visit",
                desc: "Our qualified AC technician arrives at your location with specialized equipment.",
                img: "https://img.freepik.com/free-photo/woman-inviting-man-house-with-tools_259150-58291.jpg?ga=GA1.1.1872067447.1750850496&w=740",
              },
              {
                title: "Diagnosis & Service",
                desc: "The technician diagnoses issues, explains them, and provides transparent pricing.",
                img: "https://img.freepik.com/free-photo/technician-looking-freon-leaks_482257-92791.jpg?ga=GA1.1.1872067447.1750850496&w=740",
              },
              {
                title: "Complete & Pay",
                desc: "Work is completed to your satisfaction, followed by hassle-free payment.",
                img: "https://img.freepik.com/premium-photo/customer-woman-signing-invoice-from-male-plumber-standing-kitchen_353017-538.jpg?ga=GA1.1.1872067447.1750850496&w=740",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-10 shadow-lg text-center border-t-4 border-green-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                {/* Ensure the image box itself is centered */}
                <div className="flex justify-center mb-6">
                  <div className="w-56 h-56 rounded-xl bg-gradient-to-br from-green-400 to-green-700 border-2 border-green-600 group-hover:border-green-500 transition-all duration-300 overflow-hidden flex items-center justify-center">
                    <img
                      src={step.img}
                      alt={`Step ${index + 1}`}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                  </div>
                </div>
                <h3 className="font-semibold text-2xl mb-3 text-green-700">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-base">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professionals */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4">
            Our AC Technicians
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
            All our technicians are certified, background-verified, and
            experienced in handling various types of air conditioners.
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-green-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 bg-gradient-to-br from-green-200 to-green-400 rounded-2xl overflow-hidden border-4 border-green-300 group-hover:border-green-600 transition-all duration-300 shadow-lg flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                      alt="Professional AC Technician"
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center mb-3">
                    <h3 className="font-bold text-2xl text-green-800">
                      Our Certified AC Experts
                    </h3>
                    <div className="ml-4 px-4 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full border border-green-300 shadow-sm animate-pulse">
                      Verified
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="text-green-400 fill-green-400"
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-base text-gray-700 font-semibold">
                      (850+ customer ratings)
                    </span>
                  </div>

                  <p className="text-gray-700 mb-5 text-lg">
                    Our AC technicians have a minimum of{" "}
                    <span className="font-bold text-green-700">6+ years</span>{" "}
                    of experience and are certified in handling all major brands
                    and types of air conditioners. They receive regular training
                    on the latest AC technologies and repair techniques.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg shadow group-hover:bg-green-100 transition-all duration-300">
                      <CheckCircle size={18} className="text-green-500 mr-2" />
                      <span className="text-sm font-medium text-green-800">
                        Certified
                      </span>
                    </div>
                    <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg shadow group-hover:bg-green-100 transition-all duration-300">
                      <CheckCircle size={18} className="text-green-500 mr-2" />
                      <span className="text-sm font-medium text-green-800">
                        Background-verified
                      </span>
                    </div>
                    <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg shadow group-hover:bg-green-100 transition-all duration-300">
                      <CheckCircle size={18} className="text-green-500 mr-2" />
                      <span className="text-sm font-medium text-green-800">
                        Experienced
                      </span>
                    </div>
                    <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg shadow group-hover:bg-green-100 transition-all duration-300">
                      <CheckCircle size={18} className="text-green-500 mr-2" />
                      <span className="text-sm font-medium text-green-800">
                        Specialized tools
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-gray-30">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4">
            Customer Reviews
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
            See what our customers have to say about their experience with our
            AC services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Review Card 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-green-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-green-200 bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg">
                <img
                  src="https://randomuser.me/api/portraits/men/42.jpg"
                  alt="Customer"
                  className="w-full h-full object-cover rounded-full border-2 border-white group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex justify-center mt-10 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={32}
                    className="text-green-400 fill-green-400"
                  />
                ))}
              </div>
              <p className="my-4 text-gray-700 text-lg text-center">
                "The technician was extremely knowledgeable and fixed our AC
                cooling issue quickly. He explained what was wrong and gave us
                tips to maintain our unit better. Our AC is now working better
                than ever!"
              </p>
              <div className="flex flex-col items-center mt-4">
                <h4 className="font-semibold text-green-800 text-2xl">
                  Rohit Sharma
                </h4>
                <p className="text-sm text-gray-500">Chennai</p>
              </div>
            </div>
            {/* Review Card 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-green-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-green-200 bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg">
                <img
                  src="https://randomuser.me/api/portraits/women/35.jpg"
                  alt="Customer"
                  className="w-full h-full object-cover rounded-full border-2 border-white group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex justify-center mt-10 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={32}
                    className="text-green-400 fill-green-400"
                  />
                ))}
              </div>
              <p className="my-4 text-gray-700 text-lg text-center">
                "I scheduled a deep cleaning service for two ACs in my house.
                The team was punctual, professional, and did a thorough job. My
                units are now whisper-quiet and cooling efficiently. Well worth
                the investment!"
              </p>
              <div className="flex flex-col items-center mt-4">
                <h4 className="font-semibold text-green-800 text-2xl">
                  Priya Singh
                </h4>
                <p className="text-sm text-gray-500">Bangalore</p>
              </div>
            </div>
            {/* Review Card 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-green-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-green-200 bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg">
                <img
                  src="https://randomuser.me/api/portraits/men/78.jpg"
                  alt="Customer"
                  className="w-full h-full object-cover rounded-full border-2 border-white group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex justify-center mt-10 mb-2">
                {[...Array(4)].map((_, i) => (
                  <Star
                    key={i}
                    size={32}
                    className="text-green-400 fill-green-400"
                  />
                ))}
                <Star size={32} className="text-gray-300" />
              </div>
              <p className="my-4 text-gray-700 text-lg text-center">
                "Got an AC installation done through them. The service was good
                but took a bit longer than expected. However, the technician was
                very skilled and made sure everything was working perfectly
                before leaving. Would use their services again."
              </p>
              <div className="flex flex-col items-center mt-4">
                <h4 className="font-semibold text-green-800 text-2xl">
                  Vikrant Patel
                </h4>
                <p className="text-sm text-gray-500">Mumbai</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            {/* FAQ 1 - Left */}
            <div className="flex flex-col md:flex-row items-center md:items-start group">
              <div className="md:w-4/5 w-full md:order-1 order-2">
                <div className="bg-white px-14 py-4 rounded-2xl shadow-xl border-l-8 border-green-500 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-3 flex items-center text-green-800">
                    <span className="text-green-500 mr-3">
                      <Info size={32} />
                    </span>
                    How often should I service my AC?
                  </h3>
                  <p className="text-gray-700 text-lg pl-12">
                    We recommend servicing your AC at least twice a year - once
                    before summer starts and once during mid-season. Regular
                    servicing ensures optimal performance, extends the lifespan
                    of your unit, and prevents major breakdowns.
                  </p>
                </div>
              </div>
              <div className="md:w-1/5 w-full flex justify-center md:justify-end mb-4 md:mb-0 md:order-2 order-1">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                  <span className="text-white text-3xl font-bold">1</span>
                </div>
              </div>
            </div>
            {/* FAQ 2 - Right */}
            <div className="flex flex-col md:flex-row items-center md:items-start group">
              <div className="md:w-1/5 w-full flex justify-center md:justify-start mb-4 md:mb-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                  <span className="text-white text-3xl font-bold">2</span>
                </div>
              </div>
              <div className="md:w-4/5 w-full">
                <div className="bg-white px-14 py-4 rounded-2xl shadow-xl border-r-8 border-green-500 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-3 flex items-center text-green-800">
                    <span className="text-green-500 mr-3">
                      <Info size={32} />
                    </span>
                    What brands do your technicians service?
                  </h3>
                  <p className="text-gray-700 text-lg pl-12">
                    Our technicians are trained to service all major AC brands,
                    including Daikin, Voltas, Blue Star, Carrier, Hitachi, LG,
                    Samsung, Mitsubishi, Panasonic, and many more. We handle
                    window ACs, split ACs, cassette ACs, and central air
                    conditioning systems.
                  </p>
                </div>
              </div>
            </div>
            {/* FAQ 3 - Left */}
            <div className="flex flex-col md:flex-row items-center md:items-start group">
              <div className="md:w-4/5 w-full md:order-1 order-2">
                <div className="bg-white px-14 py-4 rounded-2xl shadow-xl border-l-8 border-green-500 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-3 flex items-center text-green-800">
                    <span className="text-green-500 mr-3">
                      <Info size={32} />
                    </span>
                    How long does an AC service take?
                  </h3>
                  <p className="text-gray-700 text-lg pl-12">
                    A standard AC service typically takes 45-60 minutes per
                    unit. Deep cleaning services may take 1.5-2 hours per unit.
                    AC installations usually require 2-4 hours depending on the
                    complexity and type of installation.
                  </p>
                </div>
              </div>
              <div className="md:w-1/5 w-full flex justify-center md:justify-end mb-4 md:mb-0 md:order-2 order-1">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                  <span className="text-white text-3xl font-bold">3</span>
                </div>
              </div>
            </div>
            {/* FAQ 4 - Right */}
            <div className="flex flex-col md:flex-row items-center md:items-start group">
              <div className="md:w-1/5 w-full flex justify-center md:justify-start mb-4 md:mb-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                  <span className="text-white text-3xl font-bold">4</span>
                </div>
              </div>
              <div className="md:w-4/5 w-full">
                <div className="bg-white px-14 py-4 rounded-2xl shadow-xl border-r-8 border-green-500 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-3 flex items-center text-green-800">
                    <span className="text-green-500 mr-3">
                      <AlertCircle size={32} />
                    </span>
                    Will the technician clean up after service?
                  </h3>
                  <p className="text-gray-700 text-lg pl-12">
                    Yes, all our technicians are trained to clean up their work
                    area after completing the service. They ensure that all
                    dust, packaging materials, and replaced parts are properly
                    disposed of, leaving your space clean and tidy.
                  </p>
                </div>
              </div>
            </div>
            {/* FAQ 5 - Left */}
            <div className="flex flex-col md:flex-row items-center md:items-start group">
              <div className="md:w-4/5 w-full md:order-1 order-2">
                <div className="bg-white px-14 py-4 rounded-2xl shadow-xl border-l-8 border-green-500 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-3 flex items-center text-green-800">
                    <span className="text-green-500 mr-3">
                      <AlertCircle size={32} />
                    </span>
                    Do you provide original spare parts?
                  </h3>
                  <p className="text-gray-700 text-lg pl-12">
                    Yes, we prioritize using original or OEM-equivalent spare
                    parts for all repairs. If original parts are not immediately
                    available, we'll discuss compatible alternatives with you
                    before proceeding. All parts come with their respective
                    manufacturer warranties.
                  </p>
                </div>
              </div>
              <div className="md:w-1/5 w-full flex justify-center md:justify-end mb-4 md:mb-0 md:order-2 order-1">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                  <span className="text-white text-3xl font-bold">5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gray-30">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-green-800 to-black rounded-2xl p-8 md:p-12 shadow-lg max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Need an AC technician today?
                </h2>
                <p className="text-green-100 text-lg mb-0">
                  Our expert technicians are just a call away. Book now for
                  prompt and reliable service!
                </p>
              </div>
              <div className="md:w-1/3 flex flex-col md:items-end gap-4">
                <a
                  href="tel:+918008330905"
                  className="px-6 py-3 bg-white text-lg text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors shadow-md text-center"
                >
                  <Phone className="w-6 h-6 mr-2 inline" /> Call Now
                </a>
                <button
                  onClick={handleBookNow}
                  className="px-6 py-3 text-lg bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 border border-white border-opacity-25 transition-colors shadow-md"
                >
                  <Calendar className="w-6 h-6 mr-2 inline" /> Book Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ACTechnician;
