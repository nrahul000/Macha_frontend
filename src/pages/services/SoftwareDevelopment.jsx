import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Code,
  Laptop,
  CheckCircle,
  Check,
  ArrowLeft,
  Calendar,
  Phone,
  Layout,
  Smartphone,
  Database,
  Cloud,
  Server,
  Cpu,
  Globe,
  Bot,
  GitBranch,
  Moon,
  Sun,
  ChevronRight
} from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { Tilt } from 'react-tilt';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

// Mock code snippets for animation
const codeSnippets = [
  `function optimizePerformance(app) {
  const metrics = analyzeCode(app);
  return enhanceArchitecture(metrics);
}`,
  `async function deployToCloud(service) {
  await configureEnvironment();
  return scaleInfrastructure(service);
}`,
  `class MobileApplication extends BaseApp {
  constructor(config) {
    super(config);
    this.platforms = ['iOS', 'Android'];
  }
}`,
];

const SoftwareDevelopment = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [visibleSection, setVisibleSection] = useState('hero');
  const processRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start end", "end start"]
  });

  const processOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);
  const processScale = useTransform(scrollYProgress, [0, 0.2, 1], [0.8, 1, 1]);

  const handleBookNow = () => {
    navigate('/book');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Tech stack with icons and names
  const techStack = {
    frontend: [
      { name: 'React', icon: '⚛️' },
      { name: 'Angular', icon: '🅰️' },
      { name: 'Vue.js', icon: '🟢' },
      { name: 'Next.js', icon: '▲' },
      { name: 'TypeScript', icon: '📘' },
    ],
    backend: [
      { name: 'Node.js', icon: '🟩' },
      { name: 'Python', icon: '🐍' },
      { name: 'Java', icon: '☕' },
      { name: 'Go', icon: '🔵' },
      { name: 'PHP', icon: '🐘' },
    ],
    database: [
      { name: 'MongoDB', icon: '🍃' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'MySQL', icon: '🐬' },
      { name: 'Firebase', icon: '🔥' },
    ],
    cloud: [
      { name: 'AWS', icon: '☁️' },
      { name: 'Azure', icon: '⚡' },
      { name: 'GCP', icon: '🌩️' },
      { name: 'Kubernetes', icon: '⎈' },
    ],
  };

  // Services data with descriptions and icons
  const services = [
    {
      title: "Web Development",
      icon: <Globe className="w-8 h-8" />,
      description: "Progressive web apps, SPAs, and responsive websites built with cutting-edge frameworks",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
    },
    {
      title: "Mobile Applications",
      icon: <Smartphone className="w-8 h-8" />,
      description: "Native and cross-platform mobile apps for iOS and Android with seamless user experiences",
      image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
    },
    {
      title: "API Development",
      icon: <Server className="w-8 h-8" />,
      description: "RESTful and GraphQL APIs with secure authentication, documentation, and scalable architecture",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
    },
    {
      title: "SaaS Solutions",
      icon: <Cloud className="w-8 h-8" />,
      description: "Custom SaaS platforms with subscription management, multi-tenancy, and analytics",
      image: "https://images.unsplash.com/photo-1520085601670-ee14aa5fa3e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
    },
    {
      title: "AI Integration",
      icon: <Bot className="w-8 h-8" />,
      description: "Machine learning models, natural language processing, and computer vision solutions",
      image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
    },
    {
      title: "DevOps & CI/CD",
      icon: <GitBranch className="w-8 h-8" />,
      description: "Automated deployment pipelines, infrastructure as code, and container orchestration",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
    },
  ];

  // Process steps with descriptions and images
  const processSteps = [
    {
      step: 1,
      title: "Discovery & Ideation",
      description: "Analyzing requirements, defining scope, and creating technical specifications",
      icon: <Code className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
    },
    {
      step: 2,
      title: "UI/UX Design",
      description: "Creating wireframes, interactive prototypes, and design systems",
      icon: <Layout className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
    },
    {
      step: 3,
      title: "Development",
      description: "Agile development with sprint planning, code reviews, and continuous integration",
      icon: <Laptop className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
    },
    {
      step: 4,
      title: "Quality Assurance",
      description: "Automated testing, performance optimization, and security audits",
      icon: <CheckCircle className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
    },
    {
      step: 5,
      title: "Deployment",
      description: "Continuous deployment, monitoring setup, and infrastructure scaling",
      icon: <Cloud className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
    },
    {
      step: 6,
      title: "Maintenance",
      description: "Ongoing support, feature updates, and performance optimization",
      icon: <Cpu className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
    },
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-white to-gray-50'} -mt-16 transition-colors duration-300`}>
      {/* Particle Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url('https://assets.codepen.io/3685267/nebula-background.jpg')`,
          backgroundSize: 'cover',
          mixBlendMode: darkMode ? 'lighten' : 'darken',
          opacity: 0.2
        }}></div>

        {/* Animated circuit lines */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-blue-500 to-purple-500 opacity-10"
            style={{
              height: '1px',
              width: `${Math.random() * 250 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `pulse ${Math.random() * 5 + 3}s infinite alternate`
            }}
          ></div>
        ))}
      </div>


      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-purple-900/30 mix-blend-multiply z-0"></div>

        {/* Parallax Background */}
        <div
          className="absolute inset-0 bg-center bg-cover z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')",
            backgroundAttachment: "fixed",
            opacity: 0.7
          }}
        ></div>

        {/* Back to Services button */}
        <div className="absolute top-20 sm:top-24 md:top-28 left-4 sm:left-8 z-20">
          <Link
            to="/"
            className={`inline-flex items-center transition-all duration-300 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 hover:scale-105 ${darkMode ? 'bg-gray-900/50 text-white hover:bg-gray-800/70' : 'bg-white/30 text-white hover:bg-white/40'
              }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-medium">Back to Services</span>
          </Link>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold mb-6">
                Future-Ready Solutions
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-mono leading-tight">
                <span>Custom </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  <Typewriter
                    words={['Software', 'Solutions', 'Innovations']}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-xl">
                Transforming your ideas into powerful, scalable digital experiences with cutting-edge technology.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="tel:+918008330905"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-3 font-semibold rounded-full flex items-center backdrop-blur-md transition-all ${darkMode ? 'bg-white text-gray-900' : 'bg-purple-600 text-white hover:bg-purple-700'
                    } shadow-lg hover:shadow-purple-500/50`}
                >
                  <Phone className="w-5 h-5 mr-2" /> Call Now
                </motion.a>
                <motion.button
                  onClick={handleBookNow}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-3 font-semibold rounded-full flex items-center backdrop-blur-md transition-all ${darkMode
                      ? 'bg-gray-800 text-white border border-purple-500 hover:bg-gray-700'
                      : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                    } shadow-lg`}
                >
                  <Calendar className="w-5 h-5 mr-2" /> Book Consultation
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative lg:block hidden"
            >
              {/* Animated Code Editor */}
              <div className={`relative rounded-xl overflow-hidden shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white/10 backdrop-blur-xl'} border border-gray-700/30`}>
                <div className="flex items-center gap-1.5 absolute top-0 left-0 right-0 p-3 border-b border-gray-700/30 bg-gray-900/80">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-2 text-xs text-gray-400 font-mono">development.js</div>
                </div>
                <pre className="p-4 pt-12 text-sm font-mono text-green-400 overflow-hidden h-80">
                  {codeSnippets.map((snippet, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                      className="mb-4"
                    >
                      <span className="text-gray-500">// Building advanced software solutions</span>
                      <br />
                      {snippet.split('\n').map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: (i + index * 5) * 0.08 + 0.7 }}
                          className="whitespace-pre"
                        >
                          {line}
                        </motion.div>
                      ))}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                        className="inline-block w-2 h-5 bg-green-400 ml-1"
                      ></motion.div>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                    className="inline-block w-2 h-5 bg-green-400 ml-1"
                  ></motion.div>
                </pre>
                {/* Floating elements */}
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-purple-500/20 rounded-full blur-3xl"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 bg-white rounded-full"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Carousel Section */}
      <section id="services" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visibleSection === 'services' ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl font-bold mb-4 font-mono ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Our Development Services
              </span>
            </h2>
            <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Specialized solutions to address your unique business challenges
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <Swiper
              effect={'cards'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              modules={[EffectCards, Pagination, Autoplay]}
              onSlideChange={(swiper) => setActiveService(swiper.activeIndex)}
              className="services-swiper"
            >
              {services.map((service, index) => (
                <SwiperSlide key={index}>
                  <Tilt
                    options={{
                      max: 15,
                      scale: 1.05,
                      speed: 1000,
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`rounded-2xl overflow-hidden h-96 relative shadow-xl ${darkMode ? 'border border-gray-700' : 'border border-gray-200'
                        }`}
                    >
                      <div className="absolute inset-0 z-0">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 ${darkMode ? 'bg-gray-900/70' : 'bg-black/50'} backdrop-blur-sm`}></div>
                      </div>

                      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
                        <div>
                          <div className="w-16 h-16 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-blue-500/40 to-purple-600/40 flex items-center justify-center mb-6 shadow-lg">
                            <div className="text-white">{service.icon}</div>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-4 font-mono">{service.title}</h3>
                          <p className="text-gray-200">{service.description}</p>
                        </div>

                        <div className="flex justify-end">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 text-sm font-medium"
                          >
                            Learn more
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </Tilt>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Process Section - Hexagonal Grid Design */}
      <section id="process" ref={processRef} className="py-24 relative">
        <div className="container mx-auto px-4">
          {/* Enhanced visibility for section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 relative z-20"
          >
            <div className={`inline-block px-6 py-2 rounded-lg ${darkMode ? 'bg-gray-800/60' : 'bg-white/50'} backdrop-blur-md shadow-md mb-4`}>
              <h2 className={`text-3xl font-bold font-mono ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  Development Process
                </span>
              </h2>
            </div>
            <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-200 font-medium' : 'text-gray-700 font-medium'} text-lg`}>
              Our structured approach to delivering high-quality software solutions
            </p>
          </motion.div>

          {/* Hexagonal Grid Layout for larger screens */}
          <div className="hidden lg:block relative">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
              {/* Animated connection lines */}
              <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M300,300 C400,200 500,200 600,300 C700,400 800,400 900,300"
                  stroke={darkMode ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.2)"}
                  strokeWidth="2"
                  strokeDasharray="10,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <motion.path
                  d="M250,400 C350,500 450,500 550,400 C650,300 750,300 850,400 C950,500 1050,500 1150,400"
                  stroke={darkMode ? "rgba(168, 85, 247, 0.3)" : "rgba(168, 85, 247, 0.2)"}
                  strokeWidth="2"
                  strokeDasharray="10,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                />
                {/* Animated flow particles */}
                {[...Array(5)].map((_, i) => (
                  <motion.circle
                    key={i}
                    r="4"
                    fill={darkMode ? "rgba(59, 130, 246, 0.8)" : "rgba(59, 130, 246, 0.6)"}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      offsetPath: "path('M300,300 C400,200 500,200 600,300 C700,400 800,400 900,300')",
                      offsetDistance: ["0%", "100%"]
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
                {[...Array(5)].map((_, i) => (
                  <motion.circle
                    key={i}
                    r="4"
                    fill={darkMode ? "rgba(168, 85, 247, 0.8)" : "rgba(168, 85, 247, 0.6)"}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      offsetPath: "path('M250,400 C350,500 450,500 550,400 C650,300 750,300 850,400 C950,500 1050,500 1150,400')",
                      offsetDistance: ["0%", "100%"]
                    }}
                    transition={{
                      duration: 5,
                      delay: i * 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
              </svg>
            </div>

            {/* Process Steps Hexagonal Grid */}
            <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${index % 3 === 1 ? 'mt-28' : ''} ${index % 3 === 2 ? 'mt-14' : ''}`}
                >
                  <Tilt options={{ max: 20, scale: 1.05, speed: 1000 }}>
                    <div className="relative mx-auto" style={{ maxWidth: '320px' }}>
                      {/* Hexagon Shape with Clip Path */}
                      <div
                        className={`aspect-square relative ${darkMode
                            ? 'bg-gradient-to-br from-blue-900/40 to-purple-800/40 backdrop-blur-md border border-blue-700/30'
                            : 'bg-gradient-to-br from-blue-100/80 to-purple-100/80 backdrop-blur-md border border-blue-200'
                          } shadow-lg overflow-hidden`}
                        style={{
                          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                          width: '100%'
                        }}
                      >
                        {/* Step Number */}
                        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10">
                          <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-blue-500'
                            } flex items-center justify-center text-white font-bold text-xl`}>
                            {step.step}
                          </div>
                        </div>

                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0 opacity-20">
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-blue-900/80 to-purple-900/80' : 'bg-gradient-to-br from-blue-500/30 to-purple-500/30'
                            }`}></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8 pt-16">
                          <div className={`w-20 h-20 ${darkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                            } rounded-full flex items-center justify-center mb-5`}>
                            <div className={`${darkMode ? 'text-blue-300' : 'text-blue-600'} scale-150`}>
                              {step.icon}
                            </div>
                          </div>

                          <h3 className={`text-2xl font-bold mb-4 font-mono ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {step.title}
                          </h3>

                          <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-5`}>
                            {step.description}
                          </p>

                          {/* Key Feature */}
                          <div className={`mt-auto px-5 py-2 rounded-full text-sm ${darkMode
                              ? 'bg-blue-600/30 text-blue-100'
                              : 'bg-blue-100 text-blue-700'
                            } flex items-center`}>
                            <CheckCircle size={14} className="mr-2" />
                            {getStepFeature(step.step, 0)}
                          </div>
                        </div>

                        {/* Pulsing glow effect */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          animate={{
                            boxShadow: [
                              `inset 0 0 30px 8px rgba(59, 130, 246, 0)`,
                              `inset 0 0 30px 8px rgba(59, 130, 246, 0.15)`,
                              `inset 0 0 30px 8px rgba(59, 130, 246, 0)`
                            ]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5
                          }}
                        />
                      </div>

                      {/* Interactive button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 rounded-full text-sm ${darkMode
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-500 text-white'
                          } shadow-lg flex items-center`}
                      >
                        Details <ChevronRight className="w-4 h-4 ml-1" />
                      </motion.button>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Alternative Card Layout for mobile and tablet */}
          <div className="lg:hidden">
            <motion.div
              style={{ opacity: processOpacity, scale: processScale }}
              className="relative z-10 max-w-xl mx-auto space-y-10"
            >
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <Tilt options={{ max: 10, scale: 1.02, speed: 500 }}>
                    <div className={`rounded-2xl overflow-hidden ${darkMode
                        ? 'bg-gray-800/80 backdrop-blur-md border border-gray-700'
                        : 'bg-white/80 backdrop-blur-md shadow-lg'
                      } p-8 relative`}>
                      {/* Step number badge */}
                      <div className="absolute -top-4 -left-4">
                        <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-blue-500'
                          } flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 ${darkMode ? 'border-gray-800' : 'border-white'
                          }`}>
                          {step.step}
                        </div>
                      </div>

                      <div className="pt-3">
                        <div className="flex items-center mb-4">
                          <div className={`w-14 h-14 rounded-xl ${darkMode ? 'bg-blue-900/50' : 'bg-blue-50'
                            } flex items-center justify-center mr-5`}>
                            <div className={`${darkMode ? 'text-blue-300' : 'text-blue-600'} scale-125`}>{step.icon}</div>
                          </div>
                          <h3 className={`text-2xl font-bold font-mono ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {step.title}
                          </h3>
                        </div>

                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-5 text-base`}>
                          {step.description}
                        </p>

                        {/* Features/Benefits - Horizontal layout for mobile */}
                        <div className="flex flex-wrap gap-3 mt-5">
                          {[...Array(2)].map((_, i) => (
                            <div
                              key={i}
                              className={`px-4 py-2 rounded-full text-sm ${darkMode
                                  ? 'bg-blue-900/30 text-blue-100'
                                  : 'bg-blue-50 text-blue-700'
                                } flex items-center`}
                            >
                              <CheckCircle size={14} className="mr-2" />
                              <span>{getStepFeature(step.step, i)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Tilt>

                  {/* Connection line */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-10 w-px bottom-0 translate-y-full">
                      <motion.div
                        className={`h-full ${darkMode ? 'bg-blue-500/30' : 'bg-blue-400/30'}`}
                        animate={{
                          height: ['60%', '100%', '60%'],
                          opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className={`py-24 relative ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50/80'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visibleSection === 'technologies' ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl font-bold mb-4 font-mono ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Technologies We Master
              </span>
            </h2>
            <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Our tech stack is built for performance, scalability and innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(techStack).map(([category, technologies], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <Tilt options={{ max: 15, scale: 1.03, speed: 1000 }}>
                  <div className={`h-full rounded-2xl ${darkMode
                      ? 'bg-gray-800/40 backdrop-blur-md border border-gray-700'
                      : 'bg-white/80 backdrop-blur-md shadow-lg'
                    } p-6 relative overflow-hidden`}>
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"></div>

                    <h3 className={`text-lg font-bold mb-4 font-mono capitalize ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {category}
                    </h3>

                    <div className="space-y-4">
                      {technologies.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          whileHover={{ x: 5 }}
                          className={`flex items-center gap-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                          <div className="text-xl">{tech.icon}</div>
                          <div>{tech.name}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 z-0"></div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        >
          {/* Digital circuit pattern */}
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Animated data flow points */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-blue-500"
              style={{
                top: `${Math.random() * 100}%`,
                left: 0,
              }}
              animate={{
                left: ['0%', '100%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-4xl mx-auto ${darkMode
              ? 'bg-gray-800/70 backdrop-blur-lg border border-gray-700'
              : 'bg-white/80 backdrop-blur-lg shadow-xl border border-gray-100'
            } rounded-3xl p-10`}>
            <div className="text-center mb-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`text-3xl font-bold mb-4 font-mono ${darkMode ? 'text-white' : 'text-gray-800'}`}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  Ready to Transform Your Idea Into Reality?
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Book a consultation with our experts to discuss your project and explore how we can help.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.a
                href="tel:+918008330905"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 font-semibold rounded-full flex items-center transition-all ${darkMode
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  } shadow-lg hover:shadow-blue-500/25`}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: +91 8008 330 905
              </motion.a>
              <motion.button
                onClick={handleBookNow}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 font-semibold rounded-full flex items-center transition-all ${darkMode
                    ? 'bg-gray-900 text-white border border-blue-500'
                    : 'bg-white text-gray-800 border border-purple-500'
                  } shadow-lg`}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating action button for mobile */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 md:hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <a
          href="tel:+918008330905"
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
        >
          <Phone className="w-6 h-6 text-white" />
        </a>
      </motion.div>
    </div>
  );
};

export default SoftwareDevelopment;

// Helper function to generate step-specific features
const getStepFeature = (stepNumber, index) => {
  const features = {
    1: [
      "Requirements gathering",
      "Market research",
      "Technical feasibility",
      "Project roadmap"
    ],
    2: [
      "User experience design",
      "Interface prototyping",
      "Responsive layouts",
      "User testing"
    ],
    3: [
      "Frontend development",
      "Backend architecture",
      "API integration",
      "Code optimization"
    ],
    4: [
      "Functional testing",
      "Security validation",
      "Performance testing",
      "Cross-browser compatibility"
    ],
    5: [
      "CI/CD pipeline setup",
      "Environment configuration",
      "Data migration",
      "Launch preparation"
    ],
    6: [
      "Ongoing support",
      "Performance monitoring",
      "Feature enhancements",
      "Security updates"
    ]
  };

  return features[stepNumber][index];
};
