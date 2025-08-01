import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  Clock,
  MapPin,
  CheckCircle,
  Check,
  ArrowLeft,
  Calendar,
  Phone,
  Package,
  ShieldCheck,
  Map,
  Users,
  TruckIcon,
  Home,
  Building,
  Navigation,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const TransportServices = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  // Slider functionality
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 0,
      imageUrl: "https://5.imimg.com/data5/SELLER/Default/2024/4/413735946/MS/ZZ/JW/102390858/transport-services-500x500.png",
      title: "Transport & Logistics",
      subtitle: "Fast, reliable, and secure transport solutions"
    },
    {
      id: 1,
      imageUrl: "https://ngts.in/Content/img/slider-banner/banner3.jpg",
      title: "MACHA Transport Services",
      subtitle: "Total Logistics Solutions From A Single Source"
    },
    {
      id: 2,
      imageUrl: "https://ngts.in/Content/img/slider-banner/banner2.jpg",
      title: "On-Time Delivery",
      subtitle: "Committed to excellence in every shipment"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleBookNow = () => {
    navigate('/book');
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 -mt-16">
      {/* Hero Section with Image Slider */}
      <section className="relative pt-28 overflow-hidden h-[600px]">
        {/* Image Slider */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                backgroundImage: `url(${slides[currentSlide].imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </AnimatePresence>
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Back to Services button positioned below navbar */}
        <div className="absolute top-20 sm:top-24 md:top-28 left-4 sm:left-8 z-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center text-white hover:text-green-100 transition-colors px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="font-medium">Back to Services</span>
            </Link>
          </motion.div>
        </div>

        {/* Slider controls */}
        <div className="absolute z-10 bottom-1/2 left-4 right-4 flex justify-between items-center">
          <button
            onClick={goToPrevSlide}
            className="bg-black/30 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNextSlide}
            className="bg-black/30 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Main hero content */}
        <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <motion.h1
              key={slides[currentSlide].title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {slides[currentSlide].title}
            </motion.h1>
            <motion.p
              key={slides[currentSlide].subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8"
            >
              {slides[currentSlide].subtitle}
            </motion.p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <motion.a
                href="tel:+918008330905"
                className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors flex items-center shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5 mr-2" /> Call Now
              </motion.a>
              <motion.button
                onClick={handleBookNow}
                className="px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors flex items-center shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar className="w-5 h-5 mr-2" /> Book Online
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Ship with Us Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-xl text-green-600 font-medium">Ship with Us Now!</h3>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase">Our Team Always Ready 24/7 For Your Help</h2>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-4 uppercase">Associates</h4>
              <div className="w-16 h-1 bg-green-600 mx-auto mb-4"></div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                Get Started
              </motion.button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-4 uppercase">Pickup Request</h4>
              <div className="w-16 h-1 bg-green-600 mx-auto mb-4"></div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                Get Started
              </motion.button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Map className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-4 uppercase">Get an estimate</h4>
              <div className="w-16 h-1 bg-green-600 mx-auto mb-4"></div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                Get Started
              </motion.button>
            </div>
          </div> */}
        </div>
      </section>

      {/* Features Section with Animated Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl text-black font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Our Transport Services
          </motion.h2>

          <div className="grid text-black grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 rounded-xl overflow-hidden h-56 relative">
                <img
                  src="https://plus.unsplash.com/premium_photo-1664476566495-30aee98a466f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fG9uZSUyMHRpbWUlMjBkZWxpdmVyeXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="On-Time Delivery"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <motion.div
                  className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Clock className="w-7 h-7 text-green-600" />
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold mb-4">On-Time Performance</h3>
              <p className="text-gray-600">
                We understand the importance of punctuality in transportation. Our drivers are committed to on-time service.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-green-600 mr-2" />
                  <span>Punctual pickups and drop-offs</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-green-600 mr-2" />
                  <span>Live tracking available</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-8 rounded-xl overflow-hidden h-56 relative">
                <img
                  src="https://techehs.com/wp-content/uploads/2024/07/Transportation-and-Logistics.png"
                  alt="Safety & Security"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <motion.div
                  className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <ShieldCheck className="w-7 h-7 text-green-600" />
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Safety & Security</h3>
              <p className="text-gray-600">
                Your safety and the security of your goods are our top priorities with regularly maintained vehicles.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-green-600 mr-2" />
                  <span>Insured transportation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-green-600 mr-2" />
                  <span>GPS-tracked vehicles</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="mb-8 rounded-xl overflow-hidden h-56 relative">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D12AQHFUhMbaZwUGg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1709734418197?e=2147483647&v=beta&t=nlhwePtdKaaO8Myc55LmuqCHUnB6PMis4vx8_zGN_OM"
                  alt="Extensive Coverage"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <motion.div
                  className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Map className="w-7 h-7 text-green-600" />
                </motion.div>
              </div>
              <h3 className="text-xl text-black font-semibold mb-4">Extensive Coverage</h3>
              <p className="text-gray-600">
                We offer transport services across the city and to neighboring areas with flexible options.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-green-600 mr-2" />
                  <span>City-wide service</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-green-600 mr-2" />
                  <span>Intercity options available</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section with Interactive Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl text-black font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Transport Services
          </motion.h2>

          <div className="grid text-black grid-cols-1 md:grid-cols-2 gap-8">
            {/* Passenger Transport Card */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 h-64 rounded-xl overflow-hidden">
                <img
                  src="https://plus.unsplash.com/premium_photo-1681821676263-48ad57d15f64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFzc2VuZ2VyJTIwdHJhbnNwb3J0fGVufDB8fDB8fHww"
                  alt="Passenger Transport"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-bl-full opacity-50"></div>
              <motion.div
                className="absolute top-4 right-4 text-green-600"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Users size={28} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle size={22} className="text-green-600 mr-2" /> Passenger Transport
              </h3>
              <p className="text-gray-600 mb-4">
                Comfortable and reliable passenger transportation for individuals, families, and groups.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-black mr-2 mt-1 flex-shrink-0" />
                  <span>Personal car services</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-black mr-2 mt-1 flex-shrink-0" />
                  <span>Group transportation</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-black mr-2 mt-1 flex-shrink-0" />
                  <span>Airport transfers</span>
                </li>
              </ul>
            </motion.div>

            {/* Goods Delivery Card */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 h-64 rounded-xl overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTtm4JdJJrClxZXyEyjGzW8pDpbBXExY9Agw&s"
                  alt="Goods Delivery"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-bl-full opacity-50"></div>
              <motion.div
                className="absolute top-4 right-4 text-green-600"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Package size={28} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle size={22} className="text-green-600 mr-2" /> Goods Delivery
              </h3>
              <p className="text-gray-600 mb-4">
                From small packages to large shipments, with safe and on-time delivery guaranteed.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-black mr-2 mt-1 flex-shrink-0" />
                  <span>Same-day delivery options</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-black mr-2 mt-1 flex-shrink-0" />
                  <span>Package tracking</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-black mr-2 mt-1 flex-shrink-0" />
                  <span>Proof of delivery</span>
                </li>
              </ul>
            </motion.div>

            {/* Vehicle Rental Card */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-8 h-64 rounded-xl overflow-hidden">
                <img
                  src="https://media.istockphoto.com/id/1135541222/photo/test-drive-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=ywrj24QD3zPhs-1SCCDQuE8BWdU2uTn8HhRG8a_hnCQ="
                  alt="Vehicle Rental"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-bl-full opacity-50"></div>
              <motion.div
                className="absolute top-4 right-4 text-green-600"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <TruckIcon size={28} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle size={22} className="text-green-600 mr-2" /> Vehicle Rental
              </h3>
              <p className="text-gray-600 mb-4">
                Well-maintained vehicles for personal or commercial use with flexible rental periods.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-black mr-2 mt-1 flex-shrink-0" />
                  <span>Cars, SUVs, and vans</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-black mr-2 mt-1 flex-shrink-0" />
                  <span>Commercial vehicles</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-black mr-2 mt-1 flex-shrink-0" />
                  <span>Hourly, daily, and weekly options</span>
                </li>
              </ul>
            </motion.div>

            {/* Moving Services Card */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-8 h-64 rounded-xl overflow-hidden">
                <img
                  src="https://media.istockphoto.com/id/460758181/photo/young-couple-watching-movers-move-boxes-from-the-moving-van.webp?a=1&b=1&s=612x612&w=0&k=20&c=tRC_bPW91RwCmqvzvpG-NM_aJdM3eVkzR_pnt-uoItQ="
                  alt="Moving Services"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-bl-full opacity-50"></div>
              <motion.div
                className="absolute top-4 right-4 text-green-600"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Home size={28} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle size={22} className="text-green-600 mr-2" /> Moving Services
              </h3>
              <p className="text-gray-600 mb-4">
                We handle everything from packing and loading to transportation and unloading.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-black mr-2 mt-1 flex-shrink-0" />
                  <span>Residential moves</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-black mr-2 mt-1 flex-shrink-0" />
                  <span>Office relocations</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-black mr-2 mt-1 flex-shrink-0" />
                  <span>Packing and unpacking assistance</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works - Animated Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl text-black font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How Our Transport Service Works
          </motion.h2>

          <div className="relative">
            {/* Animated Route Line */}
            <div className="hidden md:block absolute left-1/2 top-12 bottom-0 w-1 bg-green-200 transform -translate-x-1/2 z-0"></div>

            <div className="grid text-black grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              <motion.div
                className="bg-white p-6 rounded-lg shadow text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="mb-6 h-48 rounded-xl overflow-hidden">
                  <img
                    src="https://media.istockphoto.com/id/2218393630/photo/man-renting-a-car-using-a-mobile-app.webp?a=1&b=1&s=612x612&w=0&k=20&c=FMmcddzIL_QJuQOMb61H_qXxO1Nm2NaTEPdCy5Ozh2w="
                    alt="Book Your Service"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <motion.div
                  className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto relative z-20 -mt-12 border-4 border-white shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >1</motion.div>
                <motion.div
                  className="absolute top-0 left-0 right-0 bottom-0 bg-green-50 rounded-lg -z-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
                <h3 className="text-xl font-semibold mb-3">Book Your Service</h3>
                <p className="text-gray-600">Request transport through our website, app, or by calling us.</p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="mb-6 h-48 rounded-xl overflow-hidden">
                  <img
                    src="https://media.istockphoto.com/id/1290099051/photo/confirmed-smartphone-order-success.webp?a=1&b=1&s=612x612&w=0&k=20&c=rJHumen_NUlap7otwoQg-bVntN_8G2504QyUxB8sqaA="
                    alt="Confirmation"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <motion.div
                  className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto relative z-20 -mt-12 border-4 border-white shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >2</motion.div>
                <motion.div
                  className="absolute top-0 left-0 right-0 bottom-0 bg-green-50 rounded-lg -z-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
                <h3 className="text-xl font-semibold mb-3">Confirmation</h3>
                <p className="text-gray-600">Receive details about your assigned vehicle and driver.</p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="mb-6 h-48 rounded-xl overflow-hidden">
                  <img
                    src="https://media.istockphoto.com/id/518228616/photo/order-tracking-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=qHhpBGEeDA8bCm1QZpBjG755ERXy9sP-ArEgFoRWRRA="
                    alt="Track Your Service"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <motion.div
                  className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto relative z-20 -mt-12 border-4 border-white shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >3</motion.div>
                <motion.div
                  className="absolute top-0 left-0 right-0 bottom-0 bg-green-50 rounded-lg -z-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
                <h3 className="text-xl font-semibold mb-3">Track Your Service</h3>
                <p className="text-gray-600">Monitor your transport in real-time through our app.</p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="mb-6 h-48 rounded-xl overflow-hidden">
                  <img
                    src="https://media.istockphoto.com/id/1146511023/photo/3d-check-list-with-completed-stamp-on-chalkboard-background-3d-rendering.jpg?s=612x612&w=0&k=20&c=sehscpRlw4tRinZVO_-a4a3FHQ-tG0NxFpjzE5mX6dI="
                    alt="Service Completion"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <motion.div
                  className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto relative z-20 -mt-12 border-4 border-white shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                >4</motion.div>
                <motion.div
                  className="absolute top-0 left-0 right-0 bottom-0 bg-green-50 rounded-lg -z-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
                <h3 className="text-xl font-semibold mb-3">Service Completion</h3>
                <p className="text-gray-600">Receive confirmation when your service is completed.</p>
              </motion.div>

              {/* Moving Vehicle Animation */}
              <motion.div
                className="hidden md:block absolute z-20"
                initial={{ left: '0%', top: 12 }}
                animate={{ left: ['0%', '33%', '66%', '100%'] }}
                transition={{
                  duration: 6,
                  times: [0, 0.33, 0.66, 1],
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <motion.div
                  animate={{ y: [0, -3, 0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Truck size={24} className="text-green-700" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl text-black font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="max-w-3xl text-black mx-auto space-y-6">
            {[
              {
                question: "How far in advance should I book transport services?",
                answer: "For regular transport, we recommend booking at least 24 hours in advance. For specialized services or during peak times, 2-3 days notice is preferred."
              },
              {
                question: "Are your vehicles insured?",
                answer: "Yes, all our vehicles are fully insured with comprehensive coverage for passengers and goods. We also offer additional insurance options for high-value items."
              },
              {
                question: "Can I track my shipment or vehicle in real-time?",
                answer: "Absolutely. We provide real-time tracking for all our transport services through our mobile app or web portal with a tracking link upon confirmation."
              },
              {
                question: "Do you offer transportation for special events?",
                answer: "Yes, we provide specialized transport services for weddings, corporate events, tours, and other special occasions with customized solutions."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowLeft className="w-5 h-5 transform rotate-90" />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeIndex === index ? 'auto' : 0,
                    opacity: activeIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 mt-4">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA Section with Animation */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto px-4 text-center relative overflow-hidden">
          {/* Animated elements in background */}
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 bg-black/10 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 10, 0],
              y: [0, -10, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          ></motion.div>
          <motion.div
            className="absolute -bottom-20 -left-20 w-60 h-60 bg-green-300/20 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, -10, 0],
              y: [0, 10, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          ></motion.div>

          <motion.h2
            className="text-3xl text-black font-bold mb-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Book Your Transport Service?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Contact us today to schedule your transport service or learn more about our solutions.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.a
              href="tel:+918008330905"
              className="px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors flex items-center"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now: +91 8008 330 905
            </motion.a>
            <motion.button
              onClick={handleBookNow}
              className="px-8 py-3 bg-white text-green-700 border border-green-700 font-semibold rounded-full hover:bg-green-50 transition-colors flex items-center"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Online
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TransportServices;