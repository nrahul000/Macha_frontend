import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Stethoscope,
  Activity,
  CheckCircle,
  Check,
  ArrowLeft,
  Calendar,
  Phone,
  Heart,
  UserCheck,
  Home,
  Pill,
  Syringe,
  PlusCircle,
  HeartPulse,
  Baby,
  Microscope,
  Ambulance,
  Clock,
  User,
  ClipboardCheck,
  Thermometer,
  Star,
  ChevronRight
} from 'lucide-react';

const MedicalServices = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [activeService, setActiveService] = useState('general');
  const timelineRef = useRef(null);
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.2 });

  const handleBookNow = () => {
    navigate('/book');
  };

  // Services data
  const services = [
    {
      id: 'general',
      title: 'General Care',
      icon: <Stethoscope className="w-6 h-6" />,
      description: 'Comprehensive health check-ups and consultations for all your primary healthcare needs.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'pediatrics',
      title: 'Pediatrics',
      icon: <Baby className="w-6 h-6" />,
      description: 'Specialized healthcare for children, including vaccinations and developmental monitoring.',
      image: 'https://images.unsplash.com/photo-1632053002928-1919605ee6f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVkaWF0cmljc3xlbnwwfHwwfHx8MA%3D%3D',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'diagnostics',
      title: 'Diagnostics',
      icon: <Microscope className="w-6 h-6" />,
      description: 'Advanced testing and analysis with home sample collection and quick digital reports.',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'emergency',
      title: 'Emergency Care',
      icon: <Ambulance className="w-6 h-6" />,
      description: 'Rapid response care for urgent medical situations with 24/7 availability.',
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      color: 'from-red-500 to-red-600'
    }
  ];

  // Care process steps
  const processSteps = [
    {
      id: 1,
      title: 'Book Appointment',
      description: 'Schedule a consultation through our app, website, or by calling our 24/7 helpline.',
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-blue-500',
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      title: 'Consultation',
      description: 'Meet with our qualified healthcare professionals for comprehensive assessment.',
      icon: <User className="w-6 h-6" />,
      color: 'bg-green-500',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 3,
      title: 'Diagnosis',
      description: 'Receive accurate diagnosis based on symptoms, examination, and required tests.',
      icon: <ClipboardCheck className="w-6 h-6" />,
      color: 'bg-purple-500',
      image: 'https://plus.unsplash.com/premium_photo-1663013467272-f0ca0edf1961?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlhZ25vc2lzfGVufDB8fDB8fHww'
    },
    {
      id: 4,
      title: 'Treatment',
      description: 'Personalized treatment plans with medication delivery and care instructions.',
      icon: <Pill className="w-6 h-6" />,
      color: 'bg-amber-500',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyZWF0bWVudHxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      id: 5,
      title: 'Follow-up',
      description: 'Continuous care with scheduled follow-ups and progress monitoring.',
      icon: <HeartPulse className="w-6 h-6" />,
      color: 'bg-red-500',
      image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  // Health stats
  const healthStats = [
    { value: '24/7', label: 'Available Care', icon: <Clock className="w-6 h-6" /> },
    { value: '98%', label: 'Patient Satisfaction', icon: <Star className="w-6 h-6" /> },
    { value: '15k+', label: 'Patients Served', icon: <User className="w-6 h-6" /> },
    { value: '<30min', label: 'Response Time', icon: <Activity className="w-6 h-6" /> }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
    }
  };

  return (
    <div className={`${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gradient-to-b from-white to-gray-50 text-gray-900'} transition-colors duration-300 -mt-16`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center" />
          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-b from-blue-900/90 via-gray-900/90 to-gray-900/95' : 'bg-gradient-to-b from-blue-900/80 via-blue-800/75 to-blue-700/70'}`} />
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute right-[15%] top-[20%]"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="w-24 h-24 text-blue-400 opacity-20">
            <Heart size={96} />
          </div>
        </motion.div>

        <motion.div
          className="absolute left-[10%] bottom-[25%]"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        >
          <div className="w-16 h-16 text-blue-400 opacity-20">
            <Stethoscope size={64} />
          </div>
        </motion.div>

        {/* Navigation and controls */}
        <div className="absolute top-20 sm:top-24 md:top-28 left-4 sm:left-8 z-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-flex items-center text-white hover:text-blue-200 transition-colors px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </motion.div>
        </div>

        <div className="absolute top-20 sm:top-24 md:top-28 right-4 sm:right-8 z-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white"
          >
            {darkMode ? '☀️' : '🌙'}
          </motion.button>
        </div>

        {/* Hero content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2 text-center lg:text-left text-white mb-8 lg:mb-0 lg:pr-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-2"
              >
                <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full px-4 py-1 text-sm font-medium">Professional Healthcare</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              >
                Expert Medical Services <span className="text-blue-300">At Your Doorstep</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl text-white/90 mb-8 max-w-xl lg:max-w-none"
              >
                Quality healthcare when and where you need it, delivered by certified medical professionals
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookNow}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg flex items-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+918008330905"
                  className="px-8 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 font-semibold rounded-full shadow-lg flex items-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call For Assistance
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2"
            >
              <div className="relative mx-auto" style={{ maxWidth: "500px" }}>
                {/* Main image with floating animation */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="relative z-10"
                >
                  <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                      alt="Medical professional with patient"
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>

                {/* Floating stats cards */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-5 -left-5 md:-left-16"
                >
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 1
                    }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 w-36"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-bold">Certified</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Medical Staff</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute -top-5 -right-5 md:-right-16"
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.5
                    }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 w-36"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-bold">24/7</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Emergency Care</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Health Stats Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {healthStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-xl p-6 text-center shadow-sm`}
              >
                <motion.div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}
                  whileHover={pulseAnimation}
                >
                  {stat.icon}
                </motion.div>
                <h3 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className={`inline-block px-4 py-1 ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'} rounded-full text-sm font-medium mb-4`}>OUR SERVICES</span>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Comprehensive Medical Care
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Discover our range of professional healthcare services delivered by certified medical experts
            </p>
          </motion.div>

          {/* Service selection tabs */}
          <div className="flex justify-center mb-10 overflow-x-auto pb-2">
            <div className={`inline-flex ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} p-1 rounded-full`}>
              {services.map((service) => (
                <motion.button
                  key={service.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveService(service.id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium flex items-center whitespace-nowrap transition-colors ${activeService === service.id
                      ? `bg-gradient-to-r ${service.color} text-white`
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-300'}`
                    }`}
                >
                  <span className="mr-2">{service.icon}</span>
                  <span>{service.title}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Service cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                onClick={() => setActiveService(service.id)}
                className={`cursor-pointer rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 ${activeService === service.id
                    ? 'ring-4 ring-blue-400 dark:ring-blue-600'
                    : ''
                  }`}
              >
                <div className="relative h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent`}></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className={`inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-r ${service.color} text-white mb-2`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>
                <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    {service.description}
                  </p>
                  <div className={`flex items-center text-sm font-medium ${activeService === service.id
                      ? 'text-blue-500 dark:text-blue-400'
                      : `${darkMode ? 'text-gray-400' : 'text-gray-500'}`
                    }`}>
                    <span>Learn more</span>
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className={`inline-block px-4 py-1 ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'} rounded-full text-sm font-medium mb-4`}>WHY CHOOSE US</span>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Healthcare Excellence
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              What sets our medical services apart from the rest
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`${darkMode ? 'bg-gray-700' : 'bg-white'} p-6 rounded-xl shadow-lg`}
            >
              <motion.div
                whileHover={pulseAnimation}
                className={`w-16 h-16 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} rounded-full flex items-center justify-center mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
              >
                <UserCheck className="w-8 h-8" />
              </motion.div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Certified Professionals</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                Our team consists of licensed healthcare experts with extensive experience in their specialties.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className={`w-5 h-5 mr-2 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Board-certified physicians</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className={`w-5 h-5 mr-2 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Regular training & updates</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`${darkMode ? 'bg-gray-700' : 'bg-white'} p-6 rounded-xl shadow-lg`}
            >
              <motion.div
                whileHover={pulseAnimation}
                className={`w-16 h-16 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} rounded-full flex items-center justify-center mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
              >
                <Home className="w-8 h-8" />
              </motion.div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Doorstep Care</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                Healthcare delivered to your home, saving time and providing comfort during treatment.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className={`w-5 h-5 mr-2 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Convenient scheduling</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className={`w-5 h-5 mr-2 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>No travel or waiting rooms</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${darkMode ? 'bg-gray-700' : 'bg-white'} p-6 rounded-xl shadow-lg`}
            >
              <motion.div
                whileHover={pulseAnimation}
                className={`w-16 h-16 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} rounded-full flex items-center justify-center mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
              >
                <Microscope className="w-8 h-8" />
              </motion.div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Advanced Technology</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                State-of-the-art portable equipment for accurate diagnostics and effective treatment.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className={`w-5 h-5 mr-2 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Digital health monitoring</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className={`w-5 h-5 mr-2 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Portable diagnostic tools</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section ref={timelineRef} className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className={`inline-block px-4 py-1 ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'} rounded-full text-sm font-medium mb-4`}>PATIENT JOURNEY</span>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Your Care Process
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Our streamlined approach to delivering exceptional healthcare
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline path - visible on desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-red-500 transform -translate-x-1/2"></div>

            {/* Process Steps */}
            <div className="space-y-24">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                >
                  {/* Step Number - visible on timeline */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full ${step.color} text-white font-bold flex items-center justify-center z-10 hidden md:flex`}
                  >
                    {step.id}
                  </motion.div>

                  <div className="md:w-1/2 p-4">
                    <motion.div
                      whileHover={{
                        y: -5,
                        boxShadow: `0px 10px 30px ${darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(226, 232, 240, 0.7)'}`
                      }}
                      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-2xl shadow-lg ${idx % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                        }`}
                    >
                      <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 text-white`}>
                        {step.icon}
                      </div>

                      <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{step.description}</p>
                    </motion.div>
                  </div>

                  {/* Step Image */}
                  <div className="md:w-1/2 p-4">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="rounded-2xl overflow-hidden shadow-lg h-64"
                    >
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className={`inline-block px-4 py-1 ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'} rounded-full text-sm font-medium mb-4`}>PATIENT STORIES</span>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Testimonials
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Hear from patients who've experienced our medical services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Priya Sharma",
                role: "Regular Check-up Patient",
                image: "https://randomuser.me/api/portraits/women/28.jpg",
                quote: "The convenience of having a doctor visit me at home saved me so much time. The doctor was thorough and professional."
              },
              {
                name: "Rahul Mehta",
                role: "Emergency Care Patient",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                quote: "When my child had a high fever at midnight, their emergency team responded within 30 minutes. I can't thank them enough."
              },
              {
                name: "Ananya Patel",
                role: "Elderly Care Patient",
                image: "https://randomuser.me/api/portraits/women/42.jpg",
                quote: "As a senior with mobility issues, their home medical services have been a blessing. Professional and compassionate care."
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-2xl shadow-lg`}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-100">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-center italic mb-4`}>"{testimonial.quote}"</p>
                <div className="text-center">
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-700 to-blue-900 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-white opacity-10 rounded-full"
          ></motion.div>
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-40 -left-20 w-96 h-96 bg-white opacity-10 rounded-full"
          ></motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Professional Healthcare?</h2>
            <p className="text-xl mb-10 text-white/90">
              Schedule an appointment today for quality medical care in the comfort of your home
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookNow}
                className="px-8 py-4 bg-white text-blue-700 font-bold rounded-full shadow-lg flex items-center text-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book An Appointment
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+918008330905"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full flex items-center text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call For Assistance
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-10 text-white/80"
            >
              <p className="flex items-center justify-center">
                <PlusCircle className="w-5 h-5 mr-2 text-blue-300" />
                <span>24/7 Emergency Medical Services Available</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MedicalServices;
