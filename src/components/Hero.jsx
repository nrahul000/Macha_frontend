import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Package, Clock, MapPin, ChevronDown, Wrench, Users, Home, Truck, Phone, Laptop, BookOpen, HeartPulse, ShoppingBasket, X } from 'lucide-react';
import { Link } from 'react-scroll';

import poster1Desk from '../assets/poster1_desk.jpg';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

const SLIDE_INTERVAL = 6000;
const POSTER_SEEN_KEY = 'macha_poster_seen';

const Hero = ({ darkMode, showDots = false }) => {
  const [slide, setSlide] = useState(0);
  useIsMobile();

  // Popup state for poster (show only once per session)
  const [showPoster, setShowPoster] = useState(() => {
    return !sessionStorage.getItem(POSTER_SEEN_KEY);
  });

  useEffect(() => {
    if (showPoster) {
      const timer = setTimeout(() => {
        setShowPoster(false);
        sessionStorage.setItem(POSTER_SEEN_KEY, '1');
      }, 2000); // auto-close after 2s
      return () => clearTimeout(timer);
    }
  }, [showPoster]);

  const heroSlides = [
    {
      key: 'main',
      bgType: 'gradient',
      heading: (
        <>
          <span className="text-white block mb-2">Everything at</span>
          <span className="text-green-600 block font-bold">your doorstep</span>
        </>
      ),
      subheading: '@ single call',
      description:
        "MACHA delivers everything you need across Choutuppal and surrounding areas. From food and groceries to technicians and event management - we're your one-stop solution.",
      features: [
        {
          icon: <Package size={24} className="drop-shadow-md" />,
          title: 'Complete Delivery Services',
          desc: 'Food, groceries, medicines, essentials and more',
        },
        {
          icon: <Clock size={24} className="drop-shadow-md" />,
          title: 'Service Till 10 PM',
          desc: 'We serve all areas around Choutuppal until 10 PM',
        },
        {
          icon: <MapPin size={24} className="drop-shadow-md" />,
          title: 'Local Expertise',
          desc: 'Serving Choutuppal areas like Pedda Kondur, CPL, Panthangi and more',
        },
      ],
      banner: null,
    },
    {
      key: 'food',
      bgType: 'image',
      banner: 'https://i.pinimg.com/736x/90/fe/2e/90fe2e51138ac54168946bfe5a94b9bc.jpg',
      heading: (
        <>
          <span className="text-white block mb-2">Delicious Food &</span>
          <span className="text-green-600 block font-bold">Quick Delivery</span>
        </>
      ),
      subheading: 'Groceries, Fruits, Lunch Boxes & More',
      description:
        'Order food, groceries, fruit boxes, lunch boxes, and organic vegetables. Fast, fresh, and delivered to your door.',
      features: [
        {
          icon: <ShoppingBasket size={24} className="drop-shadow-md" />,
          title: 'All Food Delivery',
          desc: 'Meals, snacks, tiffins, lunch boxes',
        },
        {
          icon: <Package size={24} className="drop-shadow-md" />,
          title: 'Groceries & Essentials',
          desc: 'Daily needs, organic vegetables, fruit boxes',
        },
        {
          icon: <Clock size={24} className="drop-shadow-md" />,
          title: 'Fast Delivery',
          desc: 'Delivered hot & fresh, always on time',
        },
      ],
    },
    {
      key: 'technicians',
      bgType: 'image',
      banner: 'https://i.pinimg.com/736x/a2/27/ab/a227ab0073aa000fea07667036873405.jpg',
      heading: (
        <>
          <span className="text-white block mb-2">Expert</span>
          <span className="text-green-600 block font-bold">Technicians</span>
        </>
      ),
      subheading: 'All Home & Office Repairs',
      description:
        'Electricians, plumbers, carpenters, AC technicians and more. Skilled professionals for every technical need.',
      features: [
        {
          icon: <Wrench size={24} className="drop-shadow-md" />,
          title: 'All Repairs Covered',
          desc: 'Electrical, plumbing, carpentry, AC & more',
        },
        {
          icon: <Clock size={24} className="drop-shadow-md" />,
          title: 'Quick Response',
          desc: 'Fast service at your doorstep',
        },
        {
          icon: <Phone size={24} className="drop-shadow-md" />,
          title: 'Just a Call Away',
          desc: 'Book a technician instantly',
        },
      ],
    },
    {
      key: 'digital',
      bgType: 'image',
      banner: 'https://i.pinimg.com/736x/27/2f/a3/272fa3cb0267b3a463aa43d5e5ada201.jpg',
      heading: (
        <>
          <span className="text-white block mb-2">Digital & Software</span>
          <span className="text-green-600 block font-bold">Development</span>
        </>
      ),
      subheading: 'Websites, Apps & Marketing',
      description:
        'Web/app development, digital marketing, software solutions, and more for your business or personal needs.',
      features: [
        {
          icon: <Laptop size={24} className="drop-shadow-md" />,
          title: 'Web & App Development',
          desc: 'Custom websites, mobile apps, portals',
        },
        {
          icon: <Package size={24} className="drop-shadow-md" />,
          title: 'Digital Marketing',
          desc: 'Social media, SEO, advertising',
        },
        {
          icon: <Clock size={24} className="drop-shadow-md" />,
          title: 'Fast Delivery',
          desc: 'Quick project turnaround',
        },
      ],
    },
    {
      key: 'eduhealth',
      bgType: 'image',
      banner: 'https://i.pinimg.com/736x/48/aa/da/48aadafdf851c897619a9b6c0aebe19a.jpg',
      heading: (
        <>
          <span className="text-white block mb-2">Education &</span>
          <span className="text-green-600 block font-bold">Health Services</span>
        </>
      ),
      subheading: 'Learning & Wellbeing',
      description:
        'Home tutors, online classes, medical sample collection, and appointments – all at your convenience.',
      features: [
        {
          icon: <BookOpen size={24} className="drop-shadow-md" />,
          title: 'Education',
          desc: 'Home tutors, online classes for all ages',
        },
        {
          icon: <HeartPulse size={24} className="drop-shadow-md" />,
          title: 'Medical Services',
          desc: 'Lab sample collection, appointments',
        },
        {
          icon: <Clock size={24} className="drop-shadow-md" />,
          title: 'Flexible Scheduling',
          desc: 'Book at your preferred time',
        },
      ],
    },
    {
      key: 'transport',
      bgType: 'image',
      banner: 'https://i.pinimg.com/736x/0a/eb/3e/0aeb3ea13895bf06694135173b017f18.jpg',
      heading: (
        <>
          <span className="text-white block mb-2">Transport &</span>
          <span className="text-green-600 block font-bold">Packers & Movers</span>
        </>
      ),
      subheading: 'Hassle-free Shifting & Delivery',
      description:
        'Vehicle rentals, logistics, and professional packing/moving services for homes and businesses.',
      features: [
        {
          icon: <Truck size={24} className="drop-shadow-md" />,
          title: 'Transport Services',
          desc: 'Vehicle rentals, logistics solutions',
        },
        {
          icon: <Home size={24} className="drop-shadow-md" />,
          title: 'Packers & Movers',
          desc: 'Professional packing and moving',
        },
        {
          icon: <Users size={24} className="drop-shadow-md" />,
          title: 'Support',
          desc: 'End-to-end shifting assistance',
        },
      ],
    },
  ];

  useEffect(() => {
    if (!showPoster) {
      const timer = setTimeout(() => {
        setSlide((prev) => (prev + 1) % heroSlides.length);
      }, SLIDE_INTERVAL);
      return () => clearTimeout(timer);
    }
  }, [slide, heroSlides.length, showPoster]);

  // Helper for background
  const renderBackground = (slideObj) => {
    if (slideObj.bgType === 'gradient') {
      return (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-green-700 z-0" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-green-600 opacity-15 animate-float"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-black opacity-10 animate-float-delay"></div>
          <div className="absolute top-40 left-1/4 w-20 h-20 rounded-full bg-white opacity-20 animate-pulse"></div>
        </>
      );
    }
    // For other image slides
    return (
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(16, 44, 24, 0.7), rgba(16,44,24,0.7)), url('${slideObj.banner}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    );
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Always show the first hero slide background */}
      {renderBackground(heroSlides[0])}

      {/* Poster Popup */}
      <AnimatePresence>
        {showPoster && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-xl shadow-2xl p-4 max-w-lg w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <img
                src={poster1Desk}
                alt="Welcome Poster"
                className="rounded-lg w-full h-auto"
              />
              <button
                onClick={() => {
                  setShowPoster(false);
                  sessionStorage.setItem(POSTER_SEEN_KEY, '1');
                }}
                className="absolute top-2 right-2 text-black bg-white rounded-full p-1 shadow hover:bg-green-100"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hero Content */}
      {!showPoster && (
        <>
          {renderBackground(heroSlides[slide])}
          <div className="container-custom relative z-10 py-20">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-8 flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={heroSlides[slide].key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.7 }}
                    className="mb-8 w-full"
                  >
                    <>
                      <motion.div
                        className="relative z-10 mb-8 transform-gpu"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full opacity-75 blur-xl animate-glow"></div>
                        <div className="relative backdrop-blur-sm bg-black/80 py-2 px-6 rounded-full border-2 border-green-500/50 shadow-lg shadow-green-500/30 flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                          <div className="absolute -left-1 -top-1 w-6 h-6 bg-green-500 rounded-full"></div>
                          <div className="absolute -right-1 -bottom-1 w-6 h-6 bg-green-500 rounded-full"></div>
                          <div className="flex items-center">
                            <span className="text-green-500 text-lg md:text-2xl font-bold mr-2 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">#1</span>
                            <span className="text-white text-xl md:text-3xl">Service Provider in Choutuppal</span>
                          </div>
                        </div>
                      </motion.div>
                      <motion.h1
                        className="text-4xl md:text-7xl font-bold leading-tight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                      >
                        {heroSlides[slide].heading}
                      </motion.h1>
                      <motion.div
                        className="text-2xl text-white mt-2 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                      >
                        {heroSlides[slide].subheading}
                      </motion.div>
                      <motion.div
                        className="w-32 h-1 bg-green-600 mb-8"
                        initial={{ width: 0 }}
                        animate={{ width: "8rem" }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      />
                      <motion.p
                        className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl border-l-4 border-green-600 pl-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                      >
                        {heroSlides[slide].description}
                      </motion.p>
                      <motion.div
                        className="flex flex-wrap gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                      >
                        <a
                          href="tel:+918008330905"
                          className="rounded-full inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white cursor-pointer shadow-lg transition-all transform hover:scale-105 hover:bg-black"
                        >
                          Call Now <ArrowRight size={18} className="ml-2" />
                        </a>
                        <a
                          href="https://wa.me/917057058841"
                          className="rounded-full inline-flex items-center justify-center px-8 py-4 bg-black hover:bg-green-950 text-white cursor-pointer shadow-lg border border-green-900 transition-all transform hover:scale-105"
                        >
                          <span>WhatsApp</span>
                        </a>
                      </motion.div>
                    </>
                  </motion.div>
                </AnimatePresence>
              </div>
              <motion.div
                className="lg:w-1/2 mt-16 lg:mt-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {heroSlides[slide].features && heroSlides[slide].features.length > 0 && (
                  <div className="bg-white/10 backdrop-filter backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-2xl hover:shadow-green-600/10 transition-all duration-500 transform hover:scale-[1.02]">
                    <div className="flex flex-col gap-6">
                      <AnimatePresence mode="wait">
                        {heroSlides[slide].features.map((feature, idx) => (
                          <motion.div
                            key={feature.title}
                            className="flex items-start gap-4"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ delay: 0.1 * idx, duration: 0.5 }}
                            whileHover={{ x: 5 }}
                          >
                            <span className="p-3 bg-green-600/20 rounded-xl text-green-600">
                              {feature.icon}
                            </span>
                            <div>
                              <h3 className="font-bold text-xl mb-2 text-white">{feature.title}</h3>
                              <p className="text-slate-300 text-sm">{feature.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
            {showDots && (
              <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center w-full pointer-events-none">
                <div className="flex justify-center mb-2 gap-2 pointer-events-auto">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${slide === idx ? 'bg-green-600 scale-125' : 'bg-white/30'}`}
                      onClick={() => setSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="pointer-events-auto"
                >
                  <Link to="about" smooth={true} duration={800} className="flex flex-col items-center cursor-pointer group">
                    <span className="text-sm mb-2 group-hover:text-green-400 transition-colors">Discover More</span>
                    <ChevronDown size={20} className="group-hover:text-green-400 transition-colors" />
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;