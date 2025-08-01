import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  Check, Shield, Clock, Sparkles, CheckCircle, Calendar, Phone,
  ArrowLeft, Users, Home, Building, AlertCircle, Zap, Star, Send,
  ChevronLeft, ChevronRight, ArrowRight, Search
} from 'lucide-react';

const Sanitization = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: false, amount: 0.2 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoverService, setHoverService] = useState(null);
  const [comparePosition, setComparePosition] = useState(50);
  const [activeTab, setActiveTab] = useState('residential');
  const [searchQuery, setSearchQuery] = useState('');

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleBookNow = () => {
    navigate('/book');
  };

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Rahul Verma",
      role: "Homeowner",
      quote: "The sanitization service was thorough and professional. Our home feels safer and cleaner than ever before.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Priya Mehta",
      role: "Office Manager",
      quote: "We've been using MACHA's sanitization services monthly for our office. Their team is always punctual and meticulous.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "Sanjay Patel",
      role: "Restaurant Owner",
      quote: "As a restaurant owner, cleanliness is critical. Their commercial sanitization service gives me and my customers peace of mind.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/62.jpg"
    }
  ];

  // Service types
  const services = [
    {
      id: 'home',
      icon: <Home className="w-6 h-6" />,
      title: 'Residential Sanitization',
      description: 'Complete sanitization services for homes of all sizes, ensuring a safe environment for your family.',
      features: ['Living spaces', 'Bedrooms', 'Bathrooms', 'Kitchen', 'Common areas'],
    },
    {
      id: 'office',
      icon: <Building className="w-6 h-6" />,
      title: 'Commercial Sanitization',
      description: 'Professional sanitization for offices, shops, and commercial spaces to protect staff and customers.',
      features: ['Workstations', 'Meeting rooms', 'Reception areas', 'Cafeterias', 'Restrooms'],
    },
    {
      id: 'virus',
      icon: <AlertCircle className="w-6 h-6" />,
      title: 'Pathogen Elimination',
      description: 'Specialized service to eliminate harmful pathogens, viruses, and bacteria from your environment.',
      features: ['Deep disinfection', 'Virus neutralization', 'Surface treatment', 'Air purification', 'Preventative care'],
    },
    {
      id: 'emergency',
      icon: <Zap className="w-6 h-6" />,
      title: 'Emergency Sanitization',
      description: 'Rapid response sanitization services for locations with confirmed exposures or outbreaks.',
      features: ['24/7 availability', 'Rapid response', 'Complete decontamination', 'Follow-up treatments', 'Certification'],
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How long does a typical sanitization process take?",
      answer: "The duration depends on the size of the space. Residential sanitization typically takes 2-4 hours, while commercial spaces may take 4-8 hours depending on square footage and complexity."
    },
    {
      question: "Are your sanitization chemicals safe for children and pets?",
      answer: "Yes, we use EPA-approved, eco-friendly sanitizers that are safe for households with children and pets. We recommend keeping the area clear during application and for 1-2 hours afterward to allow proper drying."
    },
    {
      question: "How often should I schedule sanitization services?",
      answer: "For residential spaces, we recommend monthly or quarterly services. Commercial spaces, especially high-traffic areas, may benefit from weekly or bi-weekly sanitization. We can create a custom schedule based on your specific needs."
    },
    {
      question: "Do you provide sanitization certificates for businesses?",
      answer: "Yes, we provide official sanitization certificates for businesses that can be displayed to assure customers and employees that your space has been professionally sanitized."
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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

  const stepVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-cover bg-center -mt-16 pt-16 overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-opacity-75 bg-[url('https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-green-800/70 to-green-700/60 mix-blend-multiply" />

        {/* Back to Services button */}
        <div className="absolute top-20 sm:top-24 md:top-28 left-4 sm:left-8 z-20">
          <Link
            to="/"
            className="inline-flex items-center text-green-200 hover:text-white transition-colors px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-medium">Back to Home</span>
          </Link>
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
              className="w-24 h-24 bg-green-500/30 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-green-400/30"
            >
              <Sparkles className="w-12 h-12 text-green-200" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Advanced <span className="text-green-300">Sanitization</span> Services
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl mb-10 text-green-100 max-w-3xl mx-auto"
            >
              Professional cleaning and disinfection services that eliminate 99.9% of germs, viruses, and bacteria
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
              className="px-8 py-4 bg-white text-green-700 font-semibold rounded-full shadow-lg flex items-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call For Service
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBookNow}
              className="px-8 py-4 bg-green-500 text-white font-semibold rounded-full shadow-lg border border-green-400 flex items-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Sanitization
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { number: "99.9%", label: "Germ Elimination" },
              { number: "500+", label: "Spaces Sanitized" },
              { number: "24/7", label: "Emergency Service" },
              { number: "100%", label: "Customer Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
              >
                <div className="text-3xl font-bold text-green-200">{stat.number}</div>
                <div className="text-sm text-green-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating badges */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute left-8 bottom-12 bg-white/90 backdrop-blur-sm text-green-700 rounded-full px-4 py-2 flex items-center shadow-lg"
        >
          <Shield className="w-5 h-5 mr-2" />
          <span className="font-medium">EPA Approved</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute right-8 bottom-12 bg-white/90 backdrop-blur-sm text-green-700 rounded-full px-4 py-2 flex items-center shadow-lg"
        >
          <Clock className="w-5 h-5 mr-2" />
          <span className="font-medium">Same-Day Service</span>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-green-50 rounded-full opacity-50"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-green-50 rounded-full opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">OUR SERVICES</span>
            <h2 className="text-3xl md:text-4xl text-black font-bold mb-4">Comprehensive Sanitization Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From homes to offices, we provide specialized sanitization services tailored to your unique needs
            </p>
          </motion.div>

          {/* Service tabs */}
          <div className="flex text-black justify-center mb-10 overflow-x-auto pb-2">
            <div className="inline-flex bg-gray-100 p-1 rounded-full">
              <button
                onClick={() => setActiveTab('residential')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'residential' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Residential
              </button>
              <button
                onClick={() => setActiveTab('commercial')}
                className={`px-5 text-black py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'commercial' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Commercial
              </button>
              <button
                onClick={() => setActiveTab('specialized')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'specialized' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Specialized
              </button>
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid text-black grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                onHoverStart={() => setHoverService(service.id)}
                onHoverEnd={() => setHoverService(null)}
                className="relative bg-white p-6 rounded-2xl shadow-lg border border-gray-100 overflow-hidden group"
              >
                <div className="mb-8 h-48 rounded-xl overflow-hidden">
                  <img
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKBSZG3SVnxa4wderCe_EsV86m1BPxbjn1uw&s,${service.id}`}
                    alt={service.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
                </div>
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-green-500 transform transition-transform duration-300 ${hoverService === service.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                ></div>
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#book-now"
                  className="inline-flex items-center text-green-600 font-medium hover:text-green-800 transition-colors group-hover:underline"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={processRef} className="py-20 bg-gradient-to-br from-green-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">OUR PROCESS</span>
            <h2 className="text-3xl text-black md:text-4xl font-bold mb-4">How We Sanitize Your Space</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive sanitization process follows industry best practices and ensures thorough disinfection
            </p>
          </motion.div>

          <div className="relative text-black max-w-5xl mx-auto">
            {/* Process timeline */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-green-100 transform -translate-x-1/2"></div>

            {/* Process steps */}
            <div className="space-y-24">
              {[
                {
                  title: "Initial Assessment",
                  description: "Our technicians evaluate your space to determine the appropriate sanitization approach and identify high-touch areas requiring special attention.",
                  image: "https://media.istockphoto.com/id/1305912350/photo/man-working-from-home-lockdown-covid-19-coronavirus-using-antiseptic-gel-social-distance.webp?a=1&b=1&s=612x612&w=0&k=20&c=h1kSqKnNpsP1FcxqLWdSP7opPVOxlZhUow4JrZEH0Qo=",
                  icon: <Search className="w-6 h-6" />
                },
                {
                  title: "Preparation",
                  description: "We prepare the area by removing obstacles, ensuring proper ventilation, and protecting sensitive items before beginning the sanitization process.",
                  image: "https://plus.unsplash.com/premium_photo-1661692090860-a3bdd0ed425b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FuaXRpemF0aW9uJTIwUHJlcGFyYXRpb24lMjIlMkN8ZW58MHx8MHx8fDA%3D",
                  icon: <CheckCircle className="w-6 h-6" />
                },
                {
                  title: "Deep Sanitization",
                  description: "Using EPA-approved disinfectants, we thoroughly sanitize all surfaces, paying special attention to high-touch areas like doorknobs, switches, and handles.",
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvFCeYFRLizO-Vb-eNgXtFBT6GCLc3yGioRQ&s",
                  icon: <Sparkles className="w-6 h-6" />
                },
                {
                  title: "Certification",
                  description: "After completion, we conduct a quality check and provide a sanitization certificate for your peace of mind and documentation.",
                  image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                  icon: <Shield className="w-6 h-6" />
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                  initial="hidden"
                  animate={processInView ? "visible" : "hidden"}
                  variants={stepVariant}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="md:w-1/2 p-4">
                    <div className={`bg-white p-6 rounded-2xl shadow-lg relative ${index % 2 === 1 ? 'md:mr-8' : 'md:ml-8'}`}>
                      <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full border-4 border-white z-10
                        ${index % 2 === 1 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`}
                      ></div>
                      <h3 className="text-2xl font-semibold mb-3 flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                          {step.icon}
                        </div>
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-4">
                    <div className="rounded-xl overflow-hidden shadow-lg h-64">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-20">
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              {/* Before image */}
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                  alt="Before sanitization"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold bg-black/40 px-6 py-2 rounded-full">BEFORE</span>
                </div>
              </div>

              {/* After image with clip path */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `polygon(0 0, ${comparePosition}% 0, ${comparePosition}% 100%, 0 100%)` }}
              >
                <img
                  src=""
                  alt="After sanitization"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold bg-green-500/60 px-6 py-2 rounded-full">AFTER</span>
                </div>
              </div>

              {/* Slider handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                style={{ left: `${comparePosition}%` }}
                onMouseDown={(e) => {
                  const handleMove = (moveEvent) => {
                    const container = e.currentTarget.parentElement;
                    const rect = container.getBoundingClientRect();
                    const position = Math.min(Math.max(0, ((moveEvent.clientX - rect.left) / rect.width) * 100), 100);
                    setComparePosition(position);
                  };

                  const handleUp = () => {
                    document.removeEventListener('mousemove', handleMove);
                    document.removeEventListener('mouseup', handleUp);
                  };

                  document.addEventListener('mousemove', handleMove);
                  document.addEventListener('mouseup', handleUp);
                }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="flex items-center">
                    <ChevronLeft className="w-3 h-3 text-green-600" />
                    <ChevronRight className="w-3 h-3 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-500 mt-4">Drag the slider to compare before and after sanitization</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">TESTIMONIALS</span>
            <h2 className="text-3xl text-black md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our satisfied customers about their experience with our sanitization services
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 overflow-hidden">
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full opacity-30 -mt-32 -mr-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-50 rounded-full opacity-30 -mb-32 -ml-32"></div>

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
                      <div className="w-24 h-24 rounded-full border-4 border-green-100 overflow-hidden shadow-lg">
                        <img
                          src={testimonials[activeTestimonial].image}
                          alt={testimonials[activeTestimonial].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="flex justify-center md:justify-start mb-4">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>

                      <p className="text-lg md:text-xl mb-6 italic text-gray-700">
                        "{testimonials[activeTestimonial].quote}"
                      </p>

                      <div>
                        <h4 className="font-semibold text-lg text-green-800">{testimonials[activeTestimonial].name}</h4>
                        <p className="text-gray-600">{testimonials[activeTestimonial].role}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${activeTestimonial === index ? 'bg-green-600' : 'bg-gray-300 hover:bg-green-300'
                    }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 text-black bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">FAQs</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our sanitization services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                >
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer p-6">
                      <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                      <span className="relative ml-4 flex-shrink-0">
                        <div className="w-5 h-0.5 bg-gray-500 absolute top-0 transition-transform transform group-open:rotate-180"></div>
                        <div className="w-5 h-0.5 bg-gray-500 absolute top-0 transition-transform transform rotate-90 group-open:rotate-180"></div>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <p className="text-gray-600 mb-4">Have more questions about our sanitization services?</p>
              <a
                href="tel:+918008330905"
                className="inline-flex items-center text-green-600 font-medium hover:text-green-800 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call us at +91 8008 330 905
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Book Now Section */}
      <section id="book-now" className="py-20 bg-gradient-to-br from-green-700 to-green-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium mb-4">BOOKING</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book a Sanitization Service?</h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Schedule your professional sanitization service today for a cleaner, safer environment
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-green-100 mb-2 text-sm font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Your name"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-green-100 mb-2 text-sm font-medium">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Your phone number"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-green-100 mb-2 text-sm font-medium">Service Type</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-green-400">
                    <option value="" className="bg-green-800">Select service type</option>
                    <option value="residential" className="bg-green-800">Residential Sanitization</option>
                    <option value="commercial" className="bg-green-800">Commercial Sanitization</option>
                    <option value="emergency" className="bg-green-800">Emergency Sanitization</option>
                  </select>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-green-100 mb-2 text-sm font-medium">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <label className="block text-green-100 mb-2 text-sm font-medium">Address</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 h-24 resize-none"
                  placeholder="Your address"
                ></textarea>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center justify-center"
              >
                <button
                  type="submit"
                  className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg transition-colors flex items-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Book Sanitization Service
                </button>
              </motion.div>
            </form>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-green-100 mb-2">Prefer to speak with our team?</p>
            <a
              href="tel:+918008330905"
              className="inline-flex items-center text-white font-semibold hover:text-green-200 transition-colors text-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              +91 8008 330 905
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Sanitization;
