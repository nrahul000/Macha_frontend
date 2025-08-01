import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Search,
  BarChart4,
  MessageCircle,
  CheckCircle,
  Check,
  ArrowLeft,
  Calendar,
  Phone,
  Instagram,
  Mail,
  Target,
  Zap,
  Globe,
  MousePointer,
  Award,
  BarChart2,
  Repeat
} from 'lucide-react';

const DigitalMarketing = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleBookNow = () => {
    navigate('/book');
  };

  // Success metrics with counter animation
  const [metrics, setMetrics] = useState([
    { label: "Avg. ROI", value: 0, target: 320, prefix: "7", suffix: "%" },
    { label: "Happy Clients", value: 0, target: 150, prefix: "120", suffix: "+" },
    { label: "Campaigns", value: 0, target: 540, prefix: "45", suffix: "" },
    { label: "Monthly Growth", value: 0, target: 28, prefix: "3", suffix: "%" },
  ]);

  // Animate metrics when they come into view
  const { scrollYProgress: statsScrollProgress } = useScroll({
    target: statsRef,
    offset: ["start bottom", "end bottom"]
  });

  useEffect(() => {
    const unsubscribe = statsScrollProgress.onChange(value => {
      if (value > 0.2) {
        const interval = setInterval(() => {
          let allComplete = true;

          setMetrics(prevMetrics =>
            prevMetrics.map(metric => {
              if (metric.value < metric.target) {
                allComplete = false;
                return {
                  ...metric,
                  value: Math.min(metric.value + Math.ceil(metric.target / 30), metric.target)
                };
              }
              return metric;
            })
          );

          if (allComplete) clearInterval(interval);
        }, 30);

        return () => clearInterval(interval);
      }
    });

    return () => unsubscribe();
  }, [statsScrollProgress]);

  // Services data
  const services = [
    {
      title: "Search Engine Optimization",
      icon: <Search className="w-10 h-10" />,
      image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Boost your visibility with data-driven SEO strategies that drive organic traffic and improve rankings.",
      features: ["Keyword Research", "On-Page Optimization", "Technical SEO", "Link Building"]
    },
    {
      title: "Paid Advertising",
      icon: <Target className="w-10 h-10" />,
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Target your ideal customers with strategic PPC campaigns that maximize ROI and drive conversions.",
      features: ["Google Ads", "Social Media Ads", "Retargeting", "Display Networks"]
    },
    {
      title: "Social Media Marketing",
      icon: <Instagram className="w-10 h-10" />,
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Build your brand presence and engage with your audience through strategic social media management.",
      features: ["Content Creation", "Community Management", "Platform Strategy", "Analytics"]
    },
    {
      title: "Content Marketing",
      icon: <MessageCircle className="w-10 h-10" />,
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Create compelling content that resonates with your audience and drives engagement and conversions.",
      features: ["Blog Writing", "Video Content", "Infographics", "Content Strategy"]
    },
    {
      title: "Email Marketing",
      icon: <Mail className="w-10 h-10" />,
      image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      description: "Nurture leads and drive sales with personalized email campaigns that deliver results.",
      features: ["Campaign Design", "Automation", "A/B Testing", "List Management"]
    }
  ];

  // Process steps
  const processSteps = [
    {
      title: "Research",
      description: "We analyze your business, audience, and competitors to develop a foundation for success",
      icon: <Search className="w-8 h-8" />,
      color: "bg-blue-500"
    },
    {
      title: "Strategy",
      description: "We create a customized marketing plan aligned with your business goals and target audience",
      icon: <Target className="w-8 h-8" />,
      color: "bg-purple-500"
    },
    {
      title: "Execution",
      description: "We implement campaigns across the most effective channels for your business",
      icon: <Zap className="w-8 h-8" />,
      color: "bg-pink-500"
    },
    {
      title: "Analytics",
      description: "We continuously monitor performance and provide transparent reporting",
      icon: <BarChart2 className="w-8 h-8" />,
      color: "bg-green-500"
    },
    {
      title: "Optimization",
      description: "We refine strategies based on data insights to maximize results and ROI",
      icon: <Repeat className="w-8 h-8" />,
      color: "bg-amber-500"
    }
  ];

  // Helper function to get process step images
  const getProcessImage = (index) => {
    const images = [
      // Research image
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      // Strategy image
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      // Execution image
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80",
      // Analytics image
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      // Optimization image
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ];

    return images[index] || images[0];
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300 -mt-16`}>
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Digital Marketing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-indigo-900/70 to-purple-900/60"></div>
        </motion.div>

        {/* Back to Services button */}
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

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 inline-block"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            >
              Elevate Your Digital Presence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10"
            >
              Data-driven marketing strategies to boost your brand, engage your audience, and drive growth
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(79, 70, 229, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookNow}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg flex items-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book a Strategy Call
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+918008330905"
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 font-semibold rounded-full shadow-lg flex items-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scrolling mouse indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
        </motion.div>
      </section>

      {/* Services Carousel Section */}
      <section className={`py-24 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className={`inline-block px-4 py-1 ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'} rounded-full text-sm font-medium mb-4`}>OUR EXPERTISE</span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Digital Marketing Services
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Comprehensive strategies tailored to your business goals
            </p>
          </motion.div>

          {/* Services Tabs */}
          <div className="mb-8 flex justify-center space-x-2 overflow-x-auto pb-2">
            {services.map((service, idx) => (
              <motion.button
                key={idx}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveService(idx)}
                className={`px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeService === idx
                    ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`
                    : `${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100'}`
                  }`}
              >
                <span className="flex items-center">
                  {React.cloneElement(service.icon, { className: "w-4 h-4 mr-2" })}
                  {service.title}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Service Display */}
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded-2xl ${darkMode ? 'bg-gray-900/50 backdrop-blur-md' : 'bg-white'} shadow-xl`}
              >
                {/* Service Image */}
                <div className="rounded-xl overflow-hidden h-80">
                  <img
                    src={services[activeService].image}
                    alt={services[activeService].title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Service Content */}
                <div className="flex flex-col justify-center">
                  <div className={`p-4 rounded-2xl mb-6 inline-flex items-center justify-center w-20 h-20 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                    {React.cloneElement(services[activeService].icon, {
                      className: `${darkMode ? 'text-blue-400' : 'text-blue-600'}`
                    })}
                  </div>

                  <h3 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {services[activeService].title}
                  </h3>

                  <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {services[activeService].description}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {services[activeService].features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`flex items-center p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
                      >
                        <Check className={`w-5 h-5 mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0px 0px 15px ${darkMode ? 'rgba(96, 165, 250, 0.3)' : 'rgba(37, 99, 235, 0.3)'}`
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBookNow}
                    className={`mt-8 px-6 py-3 rounded-lg flex items-center justify-center w-full md:w-auto ${darkMode
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Results Statistics */}
      <section ref={statsRef} className={`py-24 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className={`inline-block px-4 py-1 ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'} rounded-full text-sm font-medium mb-4`}>RESULTS THAT SPEAK</span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Driving Growth For Our Clients
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Our data-driven strategies deliver measurable results
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: `0px 10px 30px ${darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(226, 232, 240, 0.7)'}`
                }}
                className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} p-8 rounded-2xl text-center`}
              >
                <div className={`text-5xl font-bold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {metric.prefix}{metric.value}{metric.suffix}
                </div>
                <div className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Animated bar chart */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="max-w-5xl mx-auto mt-16"
          >
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Average Performance Growth
              </h3>

              <div className="space-y-6">
                {[
                  { label: "Organic Traffic", value: 165, color: "blue" },
                  { label: "Conversion Rate", value: 89, color: "purple" },
                  { label: "Social Engagement", value: 210, color: "pink" },
                  { label: "Ad Performance", value: 134, color: "indigo" }
                ].map((stat, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between">
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{stat.label}</span>
                      <span className={`${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}>+{stat.value}%</span>
                    </div>
                    <div className={`w-full h-3 bg-gray-200 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(100, stat.value / 2.5)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                        className={`h-full rounded-full bg-${stat.color}-500`}
                        style={{
                          background: `linear-gradient(90deg, var(--tw-gradient-stops))`,
                          '--tw-gradient-from': `rgb(var(--color-${stat.color}-500))`,
                          '--tw-gradient-to': `rgb(var(--color-${stat.color}-400))`,
                          '--tw-gradient-stops': `var(--tw-gradient-from), var(--tw-gradient-to)`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className={`py-24 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className={`inline-block px-4 py-1 ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'} rounded-full text-sm font-medium mb-4`}>OUR APPROACH</span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Proven Process
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              A strategic methodology designed for your success
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto relative">
            {/* Process Timeline Path - visible on desktop */}
            <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2"></div>

            {/* Process Steps */}
            <div className="space-y-16 md:space-y-24">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                >
                  {/* Step number - visible on desktop */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full ${step.color} text-white font-bold flex items-center justify-center z-10 hidden md:flex`}
                  >
                    {idx + 1}
                  </motion.div>

                  <div className="md:w-1/2 p-4">
                    <motion.div
                      whileHover={{
                        y: -5,
                        boxShadow: `0px 10px 30px ${darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(226, 232, 240, 0.7)'}`
                      }}
                      className={`${darkMode ? 'bg-gray-900' : 'bg-white'} p-8 rounded-2xl shadow-lg ${idx % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                        }`}
                    >
                      <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6`}>
                        {step.icon}
                      </div>

                      <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{step.description}</p>
                    </motion.div>
                  </div>

                  {/* Visual illustration for each step - Now with actual images */}
                  <div className="md:w-1/2 p-4 flex justify-center items-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      {/* Image container with overlay */}
                      <div className="rounded-2xl overflow-hidden shadow-lg relative">
                        <img
                          src={getProcessImage(idx)}
                          alt={step.title}
                          className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className={`absolute inset-0 ${step.color} opacity-20 mix-blend-overlay`}></div>

                        {/* Visual circular decoration elements */}
                        <div className="absolute inset-0 overflow-hidden">
                          <div className={`absolute -bottom-10 -right-10 w-40 h-40 ${step.color} opacity-30 rounded-full`}></div>
                          <div className={`absolute -top-10 -left-10 w-40 h-40 ${step.color} opacity-30 rounded-full`}></div>
                        </div>

                        {/* Icon overlay */}
                        <div className="absolute bottom-4 right-4">
                          <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center`}>
                            {step.icon}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Showcase */}
      <section className={`py-24 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className={`inline-block px-4 py-1 ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'} rounded-full text-sm font-medium mb-4`}>SUCCESS STORIES</span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Client Success
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Real results for real businesses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[{
              client: "E-commerce Retailer",
              result: "196% increase in organic traffic",
              image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
              service: "SEO & Content Marketing"
            },
            {
              client: "SaaS Company",
              result: "342% ROI on advertising spend",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80",
              service: "PPC & Conversion Optimization"
            },
            {
              client: "Local Restaurant Chain",
              result: "87% increase in local customers",
              image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
              service: "Social Media & Local SEO"
            }
            ].map((case_study, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: `0px 20px 40px ${darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`
                }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="relative h-80">
                  <img
                    src={case_study.image}
                    alt={case_study.client}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="bg-blue-600 text-xs uppercase font-bold tracking-wider py-1 px-2 rounded inline-block mb-2">
                      {case_study.service}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{case_study.client}</h3>
                    <p className="text-white/90">{case_study.result}</p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 pt-4 border-t border-white/20"
                    >
                      <button className="text-sm font-medium flex items-center text-blue-300">
                        View Case Study
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 ${darkMode ? 'bg-gradient-to-br from-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-600 to-purple-600'} text-white relative overflow-hidden`}>
        {/* Background Elements */}
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
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Ready to Transform Your Digital Marketing?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl mb-10 text-white/90"
            >
              Schedule a free consultation to discuss your goals and how we can help you achieve them
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookNow}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg flex items-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Free Consultation
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+918008330905"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full flex items-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: +91 8008 330 905
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketing;
