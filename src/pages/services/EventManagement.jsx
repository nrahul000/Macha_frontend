import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Calendar, Music, Users, Utensils, Camera, Star, Award, CheckCircle, Phone, ArrowLeft, Heart, Briefcase, ChevronRight, ChevronLeft, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const EventManagement = () => {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef(null);

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Services data with images
  const services = [
    {
      title: "Weddings",
      icon: <Heart className="w-6 h-6" />,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgTSTVcwzp9OF8aeF1orWqxyVcXpM-jSao8g&s",
      description: "Turn your dream wedding into reality with our comprehensive planning and coordination services."
    },
    {
      title: "Corporate Events",
      icon: <Briefcase className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "From conferences to team building activities, we create professional and engaging corporate events."
    },
    {
      title: "Social Gatherings",
      icon: <Users className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Birthday parties, anniversaries, and reunions organized with attention to every detail."
    },
    {
      title: "Cultural Events",
      icon: <Music className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Festivals, performances, and traditional celebrations organized with cultural sensitivity."
    },
    {
      title: "Award Ceremonies",
      icon: <Award className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Prestigious ceremonies that recognize achievements and excellence with style."
    }
  ];

  // Process steps with images
  const processSteps = [
    {
      title: "Consultation",
      description: "We begin with an in-depth discussion about your vision and requirements.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Planning & Design",
      description: "Our team develops a comprehensive event proposal tailored to your needs.",
      image: "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Coordination",
      description: "We handle vendor bookings, logistics, and all pre-event preparations.",
      image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Execution",
      description: "Our team ensures flawless execution from setup to teardown on the event day.",
      image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Testimonials with images
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "CEO, TechStar Solutions",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "MACHA's event management team turned our corporate product launch into an unforgettable experience. Their attention to detail was beyond our expectations."
    },
    {
      name: "Sunita Reddy",
      role: "Wedding Client",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "We hired MACHA for our daughter's wedding, and it was the best decision we made. They handled everything perfectly, allowing us to enjoy the celebration without stress."
    },
    {
      name: "Dr. Anand Sharma",
      role: "College Principal",
      image: "https://randomuser.me/api/portraits/men/62.jpg",
      quote: "Our annual college festival was managed excellently by the MACHA team. From logistics to entertainment, everything was handled professionally within budget."
    }
  ];

  // Navigate to next/prev service
  const nextService = () => {
    setActiveService((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const prevService = () => {
    setActiveService((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  // Auto-slide functionality for services carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextService();
    }, 5000);

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  // Navigate to next/prev testimonial
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleBookNow = () => {
    navigate('/book');
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 -mt-16">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16 pt-16">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-opacity-80 bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 via-purple-800/60 to-purple-700/50 mix-blend-multiply" />

        {/* Back to Services button */}
        <div className="absolute top-20 sm:top-24 md:top-28 left-4 sm:left-8 z-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-flex items-center text-white hover:text-purple-200 transition-colors px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </motion.div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-24 h-24 bg-purple-500/30 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-400/30"
            >
              <Calendar className="w-12 h-12 text-purple-200" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Exceptional <span className="text-purple-300">Event</span> Management
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl mb-10 text-purple-100 max-w-3xl mx-auto"
            >
              From intimate gatherings to grand celebrations, we create memorable experiences
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-5"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="tel:+918008330905"
              className="px-8 py-4 bg-white text-purple-700 font-semibold rounded-full shadow-lg flex items-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Get Started
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBookNow}
              className="px-8 py-4 bg-purple-500 text-white font-semibold rounded-full shadow-lg border border-purple-400 flex items-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Consultation
            </motion.button>
          </motion.div>

          {/* Event Counters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              {
                number: "500+",
                label: "Events Managed"
              },
              {
                number: "10k+",
                label: "Happy Guests"
              },
              {
                number: "24/7",
                label: "Support"
              },
              {
                number: "100%",
                label: "Satisfaction"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
              >
                <div className="text-3xl font-bold text-purple-200">{stat.number}</div>
                <div className="text-sm text-purple-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating badges */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute left-8 bottom-12 bg-white/90 backdrop-blur-sm text-purple-700 rounded-full px-4 py-2 flex items-center shadow-lg"
        >
          <Award className="w-5 h-5 mr-2" />
          <span className="font-medium">Award-Winning</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute right-8 bottom-12 bg-white/90 backdrop-blur-sm text-purple-700 rounded-full px-4 py-2 flex items-center shadow-lg"
        >
          <Users className="w-5 h-5 mr-2" />
          <span className="font-medium">Expert Team</span>
        </motion.div>
      </section>

      {/* Services Carousel Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-purple-50 rounded-full opacity-50"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-50 rounded-full opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">OUR SERVICES</span>
            <h2 className="text-3xl md:text-4xl text-black font-bold mb-4">Curated Event Experiences</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We transform your vision into meticulously planned and flawlessly executed events
            </p>
          </motion.div>

          {/* Services Carousel */}
          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-[16/9] overflow-hidden"
                >
                  <img
                    src={services[activeService].image}
                    alt={services[activeService].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-800/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                        {services[activeService].icon}
                      </div>
                      <h3 className="text-2xl font-bold">{services[activeService].title}</h3>
                    </div>
                    <p className="text-white/80 max-w-2xl">
                      {services[activeService].description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 px-6 py-2 bg-white text-purple-700 rounded-full font-medium inline-flex items-center"
                    >
                      Learn More
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-between mt-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevService}
                className="p-3 bg-white rounded-full shadow-md text-purple-700 hover:bg-purple-50 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <div className="flex space-x-2">
                {services.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveService(idx)}
                    className={`w-3 h-3 rounded-full transition-colors ${idx === activeService ? 'bg-purple-600' : 'bg-purple-200'
                      }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextService}
                className="p-3 bg-white rounded-full shadow-md text-purple-700 hover:bg-purple-50 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          {/* Service Categories */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-16">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveService(idx)}
                className={`cursor-pointer p-4 rounded-xl text-center transition-colors ${idx === activeService
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-purple-600 hover:bg-purple-50'
                  }`}
              >
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${idx === activeService ? 'bg-white/20' : 'bg-purple-100'
                  }`}>
                  {service.icon}
                </div>
                <div className="font-medium">{service.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Process Journey */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">OUR PROCESS</span>
            <h2 className="text-3xl md:text-4xl text-black font-bold mb-4">How We Create Magic</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven methodology ensures a seamless and stress-free event planning experience
            </p>
          </motion.div>

          <div className="relative">
            {/* Process Journey Path */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-purple-200 transform -translate-x-1/2"></div>

            {/* Process Steps */}
            <div className="space-y-24">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="md:w-1/2 p-4">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="overflow-hidden rounded-2xl shadow-lg"
                    >
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-80 object-cover hover:scale-110 transition-transform duration-700"
                      />
                    </motion.div>
                  </div>

                  <div className={`absolute left-1/2 transform -translate-x-1/2 bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center z-10 border-4 border-white hidden md:flex`}>
                    {index + 1}
                  </div>

                  <div className="md:w-1/2 p-8">
                    <div className={`bg-white p-8 rounded-2xl shadow-lg relative hover:shadow-xl transition-shadow ${index % 2 === 1 ? 'md:mr-8 text-right' : 'md:ml-8'
                      }`}>
                      <h3 className="text-2xl font-bold mb-4 text-purple-700">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Add-On Services with Images */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">ENHANCEMENTS</span>
            <h2 className="text-3xl md:text-4xl text-black font-bold mb-4">Event Add-On Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elevate your event with our premium customization options
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Catering",
                icon: <Utensils />,
                image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                description: "Customized menus featuring local and international cuisines"
              },
              {
                title: "Photography",
                icon: <Camera />,
                image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                description: "Professional photography and videography services"
              },
              {
                title: "Entertainment",
                icon: <Music />,
                image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                description: "Live music, DJs, performers, and interactive activities"
              },
              {
                title: "Decoration",
                icon: <Award />,
                image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                description: "Stunning decor, floral arrangements, and ambient lighting"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    </div>
                    <p className="text-white/90 text-sm">{service.description}</p>
                    <div className="mt-4 overflow-hidden h-0 group-hover:h-8 transition-all duration-300">
                      <button className="text-white flex items-center text-sm font-medium">
                        Learn more <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl text-black font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from those who have experienced our exceptional event planning services
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 overflow-hidden">
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full opacity-30 -mt-32 -mr-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full opacity-30 -mb-32 -ml-32"></div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-center"
                  >
                    <div className="mb-6 md:mb-0 md:mr-8">
                      <div className="w-24 h-24 rounded-full border-4 border-purple-100 overflow-hidden shadow-lg">
                        <img
                          src={testimonials[activeTestimonial].image}
                          alt={testimonials[activeTestimonial].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="flex justify-center md:justify-start mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>

                      <p className="text-lg md:text-xl mb-6 italic text-gray-700">
                        "{testimonials[activeTestimonial].quote}"
                      </p>

                      <div>
                        <h4 className="font-semibold text-lg text-purple-800">{testimonials[activeTestimonial].name}</h4>
                        <p className="text-gray-600">{testimonials[activeTestimonial].role}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Carousel controls */}
            <div className="flex justify-between mt-6 absolute -bottom-4 left-0 right-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="p-3 bg-white rounded-full shadow-md text-purple-700 hover:bg-purple-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="p-3 bg-white rounded-full shadow-md text-purple-700 hover:bg-purple-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center mt-12 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${activeTestimonial === index ? 'bg-purple-600' : 'bg-purple-200'
                    }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Visual Appeal */}
      <section className="py-20 bg-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>

        {/* Animated shapes */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        ></motion.div>
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        ></motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Your Dream Event?</h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-12">
              Let us transform your vision into a memorable experience. Book a consultation today!
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookNow}
                className="px-10 py-4 bg-white text-purple-700 rounded-full font-semibold shadow-lg flex items-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                href="tel:+918008330905"
                className="px-10 py-4 bg-purple-600 text-white border border-purple-500 rounded-full font-semibold shadow-lg flex items-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: +91 8008 330 905
              </motion.a>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EventManagement;
