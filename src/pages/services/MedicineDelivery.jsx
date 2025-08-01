import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Clock, Shield, Truck, Pill, PlusCircle, Phone, ArrowLeft, Calendar, Activity, MapIcon, CheckCircle, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const MedicineDelivery = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);

  // Refs for section animations
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);

  // Check if sections are in view
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.2 });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  useEffect(() => {
    // Autoplay video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, []);

  const handleBookNow = () => {
    navigate('/book');
  };

  const scrollToFeatures = () => {
    featuresRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 -mt-16 overflow-x-hidden" ref={scrollRef}>
      {/* Hero Section with Video Background */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen flex items-center justify-center bg-blue-900 overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 bg-blue-900/50 z-10"></div>
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          loop
          muted
          playsInline
          poster="https://www.felixhospital.com/sites/default/files/2022-11/best-pharmacy-services-hospital-in-noida.jpg"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-medical-tablets-spilling-from-a-bottle-9468-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Back to Services button positioned below navbar */}
        <div className="absolute top-20 sm:top-24 md:top-28 left-4 sm:left-8 z-20">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:text-blue-100 transition-colors px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Medicine Delivery Service</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">Reliable and fast delivery of essential medications right to your doorstep</p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="tel:+918008330905"
                className="group px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all relative overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <Phone className="w-5 h-5 mr-2 inline relative z-10" />
                <span className="relative z-10">Call Now</span>
              </motion.a>
              <motion.button
                onClick={handleBookNow}
                className="group px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 w-0 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                <Calendar className="w-5 h-5 mr-2 inline relative z-10" />
                <span className="relative z-10">Book Online</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Scroll down indicator */}
          {/* <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            onClick={scrollToFeatures}
          >
            <p className="mb-2 text-sm font-medium">Scroll Down</p>
            <ChevronDown className="w-6 h-6 mx-auto" />
          </motion.div> */}
        </div>
      </motion.section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl text-black font-bold mb-4">Why Choose Our Medicine Delivery Service</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer the most reliable and convenient medication delivery services in your area
            </p>
          </motion.div>

          <div className="grid grid-cols-1 text-black md:grid-cols-3 gap-8">
            {[{
              icon: <Clock className="w-10 h-10 text-blue-600" />,
              title: "Quick Delivery",
              description: "We understand that medications are time-sensitive. Our dedicated team ensures prompt delivery within hours of placing your order.",
              benefits: ["Delivery within 2-3 hours", "Real-time order tracking"],
              image: "https://plus.unsplash.com/premium_photo-1661478126619-53ca2733eab0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
              icon: <Shield className="w-10 h-10 text-blue-600" />,
              title: "Verified Medications",
              description: "We source all medications from licensed pharmacies and verified suppliers to ensure quality and authenticity.",
              benefits: ["Licensed pharmacy partners", "Temperature-controlled transport"],
              image: "https://www.shutterstock.com/image-photo/young-beautiful-hispanic-woman-pharmacist-260nw-2324963991.jpg?q=80&w=2142&auto=format&fit=crop&ixlib=rb-4.0.3"
              //https://images.unsplash.com/photo-1652376252883-1e3ebe136844?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fHZlcmlmaWVkJTIwbWVkaWNpbmVzfGVufDB8fDB8fHww
            },
            {
              icon: <Pill className="w-10 h-10 text-blue-600" />,
              title: "Wide Availability",
              description: "From prescription medications to over-the-counter remedies, we deliver a comprehensive range of healthcare products.",
              benefits: ["Prescription medications", "OTC medicines and supplements"],
              image: "https://d197nivf0nbma8.cloudfront.net/uploads/2023/11/AdobeStock_90128408-1-1350x600.jpeg"
            }].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center">
                        <PlusCircle size={18} className="text-blue-600 mr-2" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="hidden md:block absolute top-40 left-0 w-32 h-32 bg-blue-50 rounded-full opacity-70 -z-10"></div>
        <div className="hidden md:block absolute bottom-20 right-10 w-24 h-24 bg-blue-100 rounded-full opacity-70 -z-10"></div>
        <div className="hidden md:block absolute top-1/2 right-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-50 -z-10"></div>
      </section>

      {/* How It Works with 3D Cards */}
      <section ref={howItWorksRef} className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl text-black font-bold mb-4">How Our Medicine Delivery Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our simple 4-step process ensures you get your medications quickly and safely
            </p>
          </motion.div>

          <div className="flex flex-col text-black md:flex-row items-center justify-center gap-8 md:gap-4">
            {[{
              step: 1,
              title: "Upload Prescription",
              description: "Upload your prescription through our app or website, or send us a photo via WhatsApp.",
              color: "blue"
            },
            {
              step: 2,
              title: "Order Verification",
              description: "Our pharmacists verify your prescription and confirm the availability of medications.",
              color: "indigo"
            },
            {
              step: 3,
              title: "Order Processing",
              description: "We prepare your order with care, ensuring accurate medications and proper packaging.",
              color: "purple"
            },
            {
              step: 4,
              title: "Fast Delivery",
              description: "Our delivery partners bring your medications directly to your doorstep in sanitized packaging.",
              color: "green"
            }].map((step, index) => (
              <motion.div
                key={index}
                className={`bg-white rounded-2xl shadow-xl p-8 w-full md:w-64 relative perspective transform transition-all duration-500 hover:scale-105`}
                initial={{ opacity: 0, rotateY: 30, y: 50 }}
                animate={howItWorksInView ? { opacity: 1, rotateY: 0, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                whileHover={{ z: 10 }}
              >
                <div className={`absolute -top-5 -left-5 w-14 h-14 rounded-full bg-${step.color}-600 flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {step.step}
                </div>
                <div className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <div className={`absolute -bottom-3 -right-3 w-20 h-20 bg-${step.color}-100 rounded-full opacity-50 -z-10`}></div>
              </motion.div>
            ))}
          </div>

          {/* Video explanation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 max-w-5xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/vTOODPn_IwQ"
                title="Medicine Delivery Service"
                className="w-full h-full"
                style={{ minHeight: '450px' }}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-2xl text-black font-semibold">Watch how our delivery service works</h3>
              <p className="text-gray-600 mt-3 text-lg">See our streamlined process from order to delivery</p>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="hidden md:block absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full opacity-70 -z-10 transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="hidden md:block absolute bottom-0 left-0 w-48 h-48 bg-indigo-50 rounded-full opacity-70 -z-10 transform -translate-x-1/4 translate-y-1/4"></div>
      </section>

      {/* Services Section with Parallax */}
      <section ref={servicesRef} className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10 -z-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl text-black font-bold mb-4">Our Medicine Delivery Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive medication delivery services tailored to your needs
            </p>
          </motion.div>

          <div className="grid text-black grid-cols-1 md:grid-cols-2 gap-8">
            {[{
              icon: <Activity className="w-6 h-6 text-blue-600" />,
              title: "Prescription Medications",
              description: "We deliver all types of prescription medications with valid prescriptions from registered doctors. Our service includes regular medications for chronic conditions, antibiotics, and other prescribed treatments.",
              benefits: ["Valid prescription required", "Competitive pricing"],
              image: "https://plus.unsplash.com/premium_photo-1723633215759-0dae5be58333?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJlc2NyaXB0aW9uJTIwbWVkaWNpbmV8ZW58MHx8MHx8fDA%3D"
            },
            {
              icon: <Clock className="w-6 h-6 text-blue-600" />,
              title: "Monthly Refill Service",
              description: "For patients with chronic conditions, we offer a convenient monthly refill service. We'll remind you when it's time to reorder and deliver your medications on schedule.",
              benefits: ["Regular delivery schedule", "Automatic reminders"],
              image: "https://plus.unsplash.com/premium_photo-1661772807149-e58ee9412b0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWVkaWNpbmUlMjBNb250aGx5JTIwUmVmaWxsJTIwU2VydmljZXxlbnwwfHwwfHx8MA%3D%3D"
            },
            {
              icon: <MapIcon className="w-6 h-6 text-blue-600" />,
              title: "Emergency Delivery",
              description: "In urgent situations, we offer priority delivery for critical medications. Our express service ensures you receive essential medications as quickly as possible.",
              benefits: ["Priority processing", "Fastest possible delivery"],
              image: "https://plus.unsplash.com/premium_photo-1661550011562-537183c5670c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZW1lcmdlbmN5JTIwZGVsaXZlcnl8ZW58MHx8MHx8fDA%3D"
            }].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={servicesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <PlusCircle size={18} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action with Parallax Effect */}
      <section ref={ctaRef} className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg className="absolute left-0 top-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="rgba(255,255,255,0.1)" fillOpacity="1" d="M0,160L48,181.3C96,203,192,245,288,240C384,235,480,181,576,170.7C672,160,768,192,864,197.3C960,203,1056,181,1152,165.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Get Your Medications Delivered Today</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Skip the trip to the pharmacy. Let us bring your medications directly to your door with our safe, reliable delivery service.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.a
                href="tel:+918008330905"
                className="group px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all shadow-lg relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <Phone className="w-6 h-6 mr-2 inline relative z-10" />
                <span className="relative z-10 text-lg">Call Now: +91 8008 330 905</span>
              </motion.a>
              <motion.button
                onClick={handleBookNow}
                className="group px-8 py-4 bg-transparent text-white border-2 border-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all shadow-lg relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calendar className="w-6 h-6 mr-2 inline" />
                <span className="text-lg">Book Online</span>
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold mb-2">2,500+</div>
              <div className="text-sm text-blue-100">Orders Delivered</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-sm text-blue-100">On-time Delivery</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold mb-2">4.8/5</div>
              <div className="text-sm text-blue-100">Customer Rating</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold mb-2">30 min</div>
              <div className="text-sm text-blue-100">Avg. Response Time</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MedicineDelivery;
