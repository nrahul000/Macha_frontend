import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  UserCheck,
  Clock,
  CheckCircle,
  Check,
  ArrowLeft,
  Calendar,
  Phone,
  Lock,
  Eye,
  Users,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Camera,
  Building,
  AlertCircle,
  User,
  Car,
  Map,
  FileCheck,
  Home,
  Bell,
  Key,
  Star,
  Monitor,
  Wifi,
  Search,
  ShieldAlert,
  Shield as ShieldIcon
} from 'lucide-react';

const SecurityServices = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  // Slider functionality
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 0,
      imageUrl: "https://www.jssgroupindia.com/images/5a11dd8ee7244804697a8a0424f181c3.jpg",
      title: "Professional Security Services",
      subtitle: "Protecting what matters most with trained professionals"
    },
    {
      id: 1,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm3cYEXBCZiLdFexADk5LpXdRUH61iyBpATA&s",
      title: "24/7 Surveillance Solutions",
      subtitle: "Advanced monitoring systems for complete peace of mind"
    },
    {
      id: 2,
      imageUrl: "https://plus.unsplash.com/premium_photo-1682125948844-e2dc8996b0f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbmFsJTIwc2VjdXJpdHklMjBzZXJ2aWNlc3xlbnwwfHwwfHx8MA%3D%3D",
      title: "Trained Security Personnel",
      subtitle: "Experienced guards ready to protect your assets"
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

  // Active section for the control room panels
  const [activePanel, setActivePanel] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  // Simulate security alert for interactive element
  useEffect(() => {
    const alertTimer = setTimeout(() => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }, 10000);

    return () => clearTimeout(alertTimer);
  }, []);

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
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Back to Services button positioned below navbar */}
        <div className="absolute top-20 sm:top-24 md:top-28 left-4 sm:left-8 z-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-flex items-center text-white hover:text-slate-100 transition-colors px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </motion.div>
        </div>

        {/* Slider controls */}
        <div className="absolute z-10 bottom-1/2 left-4 right-4 flex justify-between items-center">
          <button
            onClick={goToPrevSlide}
            className="bg-black/30 text-white p-2 rounded-full hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNextSlide}
            className="bg-black/30 text-white p-2 rounded-full hover:bg-slate-700 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        {/* Slide indicators */}

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
                className="px-8 py-3 bg-slate-700 text-white font-semibold rounded-full hover:bg-slate-800 transition-colors flex items-center shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5 mr-2" /> Call Now
              </motion.a>
              <motion.button
                onClick={handleBookNow}
                className="px-8 py-3 bg-white text-slate-800 font-semibold rounded-full hover:bg-slate-100 transition-colors flex items-center shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar className="w-5 h-5 mr-2" /> Book Online
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security Command Center Section - New and Unique */}
      <section className="py-12 bg-slate-900 text-white relative overflow-hidden">
        {/* Background image for command center */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlveHL3y18Ui99oV0T0xDddCCRw1Ia3oxcrg&s"
            alt="Security Command Center Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Simulated security alert */}
        <AnimatePresence>
          {showAlert && (
            <motion.div
              className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg flex items-center shadow-lg z-50"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Bell className="w-5 h-5 mr-2 animate-pulse" />
              <span>Security Alert Detected</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <div className="mb-6 md:mb-0 md:flex items-start">
              <div className="hidden md:block mr-6 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://plus.unsplash.com/premium_photo-1749037390900-76690c9e6082?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFNlY3VyaXR5JTIwQ29tbWFuZCUyMENlbnRlcnxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Security Command Center"
                  className="w-32 h-32 object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Security Command Center</h2>
                <p className="text-gray-300 max-w-xl">Our state-of-the-art command center monitors all security operations 24/7, ensuring rapid response to any situation.</p>
              </div>
            </div>

            <motion.div
              className="bg-slate-800 p-3 rounded-full flex items-center"
              animate={{ boxShadow: ['0 0 0 rgba(100, 100, 255, 0.3)', '0 0 20px rgba(100, 100, 255, 0.7)', '0 0 0 rgba(100, 100, 255, 0.3)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="bg-green-500 w-3 h-3 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">System Online</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              className="bg-slate-800 rounded-lg p-5 border border-slate-700"
              whileHover={{ y: -5, borderColor: "#6366f1" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-indigo-400"></div>
                  ))}
                </div>
              </div>
              <div className="mb-4 rounded-lg overflow-hidden h-32">
                <img
                  src="https://media.istockphoto.com/id/625904394/photo/security-system-operator-looking-at-cctv-footage-at-desk.webp?a=1&b=1&s=612x612&w=0&k=20&c=uO7O8wFzFbkXzc2GPdmKUEjPq7HVVrQqv8hkmNXePuw="
                  alt="Video Surveillance"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Video Surveillance</h3>
              <p className="text-gray-400 mb-4">Advanced camera systems with facial recognition and motion detection capabilities.</p>
              <div className="flex justify-between text-sm">
                <span className="text-green-400">127 Active Cameras</span>
                <span className="text-indigo-400">Live Monitoring</span>
              </div>
            </motion.div>

            <motion.div
              className="bg-slate-800 rounded-lg p-5 border border-slate-700"
              whileHover={{ y: -5, borderColor: "#f43f5e" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-rose-900/50 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-rose-400" />
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-rose-400"></div>
                  ))}
                </div>
              </div>
              <div className="mb-4 rounded-lg overflow-hidden h-32">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhVqO7LayD2et97iXdo7hrvJ5kzucQ2FZxxg&s"
                  alt="Alarm Systems"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Alarm Systems</h3>
              <p className="text-gray-400 mb-4">Immediate threat detection with direct connection to local emergency services.</p>
              <div className="flex justify-between text-sm">
                <span className="text-green-400">All Systems Armed</span>
                <span className="text-rose-400">Rapid Response</span>
              </div>
            </motion.div>

            <motion.div
              className="bg-slate-800 rounded-lg p-5 border border-slate-700"
              whileHover={{ y: -5, borderColor: "#0ea5e9" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-sky-900/50 rounded-lg flex items-center justify-center">
                  <Key className="w-6 h-6 text-sky-400" />
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-sky-400"></div>
                  ))}
                </div>
              </div>
              <div className="mb-4 rounded-lg overflow-hidden h-32">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5XxHgNpNNLB7WceZzwYofnSJiCe1P_a9jGg&s"
                  alt="Access Control"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Access Control</h3>
              <p className="text-gray-400 mb-4">Multi-factor authentication systems for complete control over secure areas.</p>
              <div className="flex justify-between text-sm">
                <span className="text-green-400">89 Access Points</span>
                <span className="text-sky-400">Real-time Logs</span>
              </div>
            </motion.div>
          </div>

          {/* Control room animation */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="mr-3 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551972873-b7e8754e8e26?q=80&w=80&auto=format&fit=crop"
                    alt="Live Monitoring"
                    className="w-12 h-12 object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Live Security Monitoring</h3>
              </div>
              <div className="flex items-center">
                <motion.div
                  className="w-3 h-3 bg-green-500 rounded-full mr-2"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                ></motion.div>
                <span className="text-sm text-gray-300">Live Feed</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[ // ✅ Array instead of object
                { panel: 1, image: "https://plus.unsplash.com/premium_photo-1690519887622-40b5119d3621?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fFNlY3VyaXR5JTIwc2VydmljZSUyMGhvbWV8ZW58MHx8MHx8fDA%3D", label: "Home" },
                { panel: 2, image: "https://media.istockphoto.com/id/1199877378/photo/future-city.webp?a=1&b=1&s=612x612&w=0&k=20&c=e7skeRZDeKzUA872Z5_vWAfRi8OiiPoH_tqBCdEhAIE=", label: "Building" },
                { panel: 3, image: "https://images.unsplash.com/photo-1578172190200-9434d7816d29?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fFNlY3VyaXR5JTIwc2VydmljZSUyMCUyMCUyMCUyQnBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D", label: "People" },
                { panel: 4, image: "https://images.unsplash.com/photo-1552622594-9a37efeec618?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U2VjdXJpdHklMjBzZXJ2aWNlJTIwJTIwJTIwc2VydmljZSUyMGFyZWF8ZW58MHx8MHx8fDA%3D", label: "Secure Area" }
              ].map((item) => (
                <motion.div
                  key={item.panel}
                  className={`aspect-video rounded bg-slate-900 border-2 overflow-hidden cursor-pointer ${activePanel === item.panel ? 'border-indigo-500' : 'border-slate-700'}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActivePanel(item.panel)}
                >
                  <div className="h-full relative">
                    <img
                      src={item.image}
                      alt={`Security Feed ${item.label}`}
                      className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{
                          y: item.panel % 2 === 0 ? [0, 3, 0] : [0, -3, 0],
                          x: item.panel > 2 ? [0, 3, 0] : [0, -3, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {item.panel === 1 ? <Home className="text-gray-300 opacity-90" /> :
                          item.panel === 2 ? <Building className="text-gray-300 opacity-90" /> :
                            item.panel === 3 ? <Users className="text-gray-300 opacity-90" /> :
                              <Lock className="text-gray-300 opacity-90" />}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 h-1 w-full bg-slate-700">
              <motion.div
                className="h-full bg-indigo-500"
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 10, repeat: Infinity }}
              ></motion.div>
            </div>

            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Feed 01:42:36</span>
              <span>Signal Strength: 98%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Shield-Based Security Stats - Unique to Security Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-black text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Professional Security Solutions
          </motion.h2>

          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-5/6 lg:w-4/6 relative">
              {/* Large center shield */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 text-slate-100"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, 0, -1, 0]
                }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Shield size={300} strokeWidth={0.5} />
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 relative z-10">
                {[
                  { icon: <ShieldCheck className="w-8 h-8 text-slate-700" />, title: "Trained Guards", value: "500+" },
                  { icon: <Camera className="w-8 h-8 text-slate-700" />, title: "Surveillance Coverage", value: "24/7" },
                  { icon: <Monitor className="w-8 h-8 text-slate-700" />, title: "Control Centers", value: "12" },
                  { icon: <Clock className="w-8 h-8 text-slate-700" />, title: "Response Time", value: "<5 min" },
                  { icon: <Star className="w-8 h-8 text-slate-700" />, title: "Client Satisfaction", value: "98%" },
                  { icon: <FileCheck className="w-8 h-8 text-slate-700" />, title: "Security Audits", value: "Monthly" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="mb-3 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                      {stat.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-1 text-slate-800">{stat.value}</h3>
                    <p className="text-sm text-slate-600">{stat.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Solutions with Hexagon Grid - Unique Design */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16">
            <div className="mx-auto mb-4 w-24 h-24 rounded-full overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1562159278-1253a58da141?q=80&w=150&auto=format&fit=crop"
                alt="Security Solutions"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.h2
              className="text-3xl text-black font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Security Solutions
            </motion.h2>
          </motion.div>

          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-10/12">
              <div className="grid grid-cols-1 text-black md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Home />,
                    title: "Residential Security",
                    color: "from-blue-500 to-blue-600",
                    image: "data:image/jpeg;base64,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",
                    features: [
                      "24/7 gate and entrance monitoring",
                      "Regular property patrols",
                      "Visitor screening & management"
                    ]
                  },
                  {
                    icon: <Building />,
                    title: "Commercial Security",
                    color: "from-purple-500 to-purple-600",
                    image: "https://img1.exportersindia.com/product_images/bc-full/2020/6/3882743/residential-commercial-security-services-1591207527-5464696.jpg",
                    features: [
                      "Access control management",
                      "Asset protection & loss prevention",
                      "Emergency response protocols"
                    ]
                  },
                  {
                    icon: <Users />,
                    title: "Event Security",
                    color: "from-orange-500 to-orange-600",
                    image: "https://5.imimg.com/data5/SELLER/Default/2024/3/402939576/MK/VX/TW/59389717/event-security-services.jpg",
                    features: [
                      "Crowd management & control",
                      "Entry point security",
                      "Emergency evacuation planning"
                    ]
                  },
                  {
                    icon: <User />,
                    title: "Executive Protection",
                    color: "from-green-500 to-green-600",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-_4gqX3KoubVtqNfdSTDQzJzXLKVg3wUdeA&s",
                    features: [
                      "Personal security officers",
                      "Threat assessment & management",
                      "Secure transportation"
                    ]
                  },
                  {
                    icon: <Wifi />,
                    title: "Technical Security",
                    color: "from-red-500 to-red-600",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpMQp2Bu0m2-ZERnvph0SPg8UzA2HlLWyZPg&s",
                    features: [
                      "CCTV installation & monitoring",
                      "Alarm system integration",
                      "Access control systems"
                    ]
                  },
                  {
                    icon: <Clock />,
                    title: "Mobile Patrol",
                    color: "from-sky-500 to-sky-600",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSotlaykmqLMHkN9mcmrL_6hqu0LyJc3GDt0A&s",
                    features: [
                      "Scheduled property checks",
                      "Deterrent presence",
                      "Incident reporting"
                    ]
                  }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    className="relative bg-white rounded-xl shadow-md overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className={`h-2 w-full bg-gradient-to-r ${service.color}`}></div>
                    <div className="h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="w-14 h-14 mb-4 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle size={16} className="text-slate-700 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <motion.button
                        className="mt-6 w-full py-2 bg-slate-700 text-white rounded-md flex items-center justify-center"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleBookNow}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Book Service</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Security Shield Process - Unique to Security */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-6">
            <div className="mx-auto text-black mb-4 w-24 h-24 rounded-full overflow-hidden shadow-md">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4eH_vWQZGOVemO41iUEWKg-dsS2VoqGISPg&s"
                alt="Security Process"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.h2
              className="text-3xl text-black font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Security Process
            </motion.h2>
          </motion.div>

          <motion.p
            className="text-gray-600 text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We follow a comprehensive approach to ensure maximum security for your property and assets
          </motion.p>

          <div className="relative">
            {/* Center line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-slate-200"></div>

            {/* Shield nodes that connect process steps */}
            <div className="relative z-10">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute text-black left-1/2 transform -translate-x-1/2"
                  style={{ top: `${i * 33}%` }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        '0 0 0 rgba(15, 23, 42, 0.3)',
                        '0 0 15px rgba(15, 23, 42, 0.7)',
                        '0 0 0 rgba(15, 23, 42, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                  >
                    <Shield className="w-6 h-6 text-white" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-24 text-black relative z-0">
              {[
                {
                  title: "Risk Assessment",
                  desc: "We conduct a comprehensive assessment of your security vulnerabilities and needs.",
                  icon: <Search className="w-8 h-8 text-slate-700" />,
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqzImXUgjOebEYLqOFL98NFbEbGUw0JUjw0Q&s",
                  align: "right"
                },
                {
                  title: "Security Planning",
                  desc: "We develop a tailored security strategy to address identified risks and vulnerabilities.",
                  icon: <FileCheck className="w-8 h-8 text-slate-700" />,
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLiv7r3bzAVqsI0WsoPqjmWFMAB0eoFe_dxQ&s",
                  align: "left"
                },
                {
                  title: "Implementation",
                  desc: "Our trained security personnel deploy the security plan with precision and attention to detail.",
                  icon: <ShieldCheck className="w-8 h-8 text-slate-700" />,
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGSo6nOC9H6FTHL90bHqATL1SIVRFYXrSUHQ&s",
                  align: "right"
                },
                {
                  title: "Monitoring & Adjustment",
                  desc: "We continuously monitor security performance and make adjustments as needed for optimal protection.",
                  icon: <Eye className="w-8 h-8 text-slate-700" />,
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJMxEzCnnD4sG1V8CgytTSiNtycvdyLOVofw&s",
                  align: "left"
                }
              ].map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center">
                  <div className={`md:w-1/2 ${step.align === "left" ? "md:order-1" : "md:order-2"}`}>
                    <motion.div
                      className={`bg-white p-6 rounded-xl shadow-md ${step.align === "left" ? "md:ml-12" : "md:mr-12"}`}
                      initial={{ opacity: 0, x: step.align === "left" ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                      <div className="flex items-start">
                        <div className="bg-slate-100 p-3 rounded-lg mr-4">
                          {step.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-gray-600">{step.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <div className={`hidden md:block w-1/2 ${step.align === "left" ? "md:order-2" : "md:order-1"}`}></div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Security Badge Section - Unique to Security Services */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
              <div className="flex items-center mb-6">
                <div className="mr-4 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=100&auto=format&fit=crop"
                    alt="Certifications"
                    className="w-16 h-16 object-cover"
                  />
                </div>
                <motion.h2
                  className="text-3xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Security Certifications & Standards
                </motion.h2>
              </div>

              <motion.p
                className="text-slate-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Our security services adhere to the highest industry standards and certifications, ensuring professional quality in every aspect of our operations.
              </motion.p>

              <div className="space-y-4">
                {[
                  "Certified Security Personnel",
                  "Background-Verified Staff",
                  "Regular Training Programs",
                  "Industry Best Practices",
                  "Advanced Security Protocols"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="grid text-black grid-cols-2 gap-6">
                {[
                  { name: "Security Professional Certification", color: "bg-blue-600", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4w846XYsekysYZ7GVPFDF4v5rPr4sY3StOw&s" },
                  { name: "Advanced Safety Standards", color: "bg-green-600", image: "https://images.unsplash.com/photo-1607703703520-bb638e84caf2?q=80&w=300&auto=format&fit=crop" },
                  { name: "Quality Management System", color: "bg-orange-600", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT3K0oUIcPxFaibWYIYlrtQOWiSYSadyDm6A&s" },
                  { name: "Data Protection Compliance", color: "bg-purple-600", image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=300&auto=format&fit=crop" }
                ].map((badge, index) => (
                  <motion.div
                    key={index}
                    className={`${badge.color} rounded-lg p-6 text-center flex flex-col items-center justify-center aspect-square relative overflow-hidden`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(255, 255, 255, 0.2)"
                    }}
                  >
                    <div className="absolute inset-0 opacity-20">
                      <img
                        src={badge.image}
                        alt={badge.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <ShieldCheck className="w-10 h-10 mb-4 relative z-10" />
                    <span className="font-semibold text-sm relative z-10">{badge.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section - Keeping as is with slight styling changes */}
      <section className="py-16 text-black bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
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
                question: "Are your security guards licensed?",
                answer: "Yes, all our security personnel are fully licensed, insured, and have undergone thorough background checks. We maintain strict compliance with all local and national security regulations."
              },
              {
                question: "Can you provide security services for short-term events?",
                answer: "Absolutely. We offer flexible security solutions for one-time events, short-term projects, and special occasions. Our team can quickly adapt to your specific timeframe and requirements."
              },
              {
                question: "Do you offer armed security guards?",
                answer: "Yes, we provide both armed and unarmed security officers depending on your specific needs and risk assessment. All our armed personnel are properly trained and licensed to carry firearms."
              },
              {
                question: "What kind of reporting do you provide?",
                answer: "We deliver comprehensive security reports detailing incidents, visitor logs, patrol activities, and any security concerns. Reports can be provided daily, weekly, or monthly based on your preference."
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

      {/* CTA Section with Badge Design - Unique to Security */}
      <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center relative overflow-hidden">
          {/* Background shield pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 transform -translate-x-1/2">
              <ShieldIcon size={300} />
            </div>
            <div className="absolute bottom-0 right-1/4 transform translate-x-1/2">
              <ShieldIcon size={300} />
            </div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold text-sm inline-flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2" />
                <span>Protected by MACHA Security</span>
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ready to enhance your security?
            </motion.h2>

            <motion.p
              className="text-slate-300 mb-10 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Contact us today to discuss your security needs and discover how our professional security services can protect what matters most to you.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.a
                href="tel:+918008330905"
                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors flex items-center"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: +91 8008 330 905
              </motion.a>
              <motion.button
                onClick={handleBookNow}
                className="px-8 py-3 bg-white text-slate-800 font-semibold rounded-full hover:bg-slate-100 transition-colors flex items-center"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Online
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecurityServices;