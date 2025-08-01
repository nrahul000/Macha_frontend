import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  BookOpen,
  GraduationCap,
  CheckCircle,
  Check,
  ArrowLeft,
  Calendar,
  Phone,
  Clock,
  Users,
  Award,
  ChevronRight,
  Star,
  BookMarked,
  Atom,
  BarChart,
  PenTool,
  Globe,
  Calculator,
  Brain,
  User,
  MapPin,
  ArrowRight
} from 'lucide-react';

const HomeTutors = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [activeSubject, setActiveSubject] = useState('math');
  const [activeTutor, setActiveTutor] = useState(0);
  const processRef = useRef(null);
  const isProcessInView = useInView(processRef, { once: true, amount: 0.2 });

  // Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleBookNow = () => {
    navigate('/book');
  };

  // Subject data with icons and colors
  const subjects = [
    {
      id: 'math',
      name: 'Mathematics',
      icon: <Calculator className="w-6 h-6" />,
      color: 'bg-blue-500',
      description: 'From basic arithmetic to advanced calculus, our math tutors make numbers fun and understandable.',
      grades: 'All grades and college level',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'science',
      name: 'Science',
      icon: <Atom className="w-6 h-6" />,
      color: 'bg-green-500',
      description: 'Biology, Chemistry, Physics - our science tutors bring concepts to life through experiments and clear explanations.',
      grades: 'Elementary through high school',
      image: 'https://media.istockphoto.com/id/2158225904/photo/female-student-holding-a-molecule-model.webp?a=1&b=1&s=612x612&w=0&k=20&c=RimOzE2QcwKP5sm-sRdIzhOQvYEiwVGNhMJkZpwnM_A='
    },
    {
      id: 'english',
      name: 'English & Literature',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-purple-500',
      description: 'Develop strong language skills through reading, writing, and critical analysis with our language experts.',
      grades: 'All grades and specialized courses',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'social',
      name: 'Social Studies',
      icon: <Globe className="w-6 h-6" />,
      color: 'bg-amber-500',
      description: 'History, Geography, Civics - our tutors make past and present social concepts engaging and memorable.',
      grades: 'Elementary through college',
      image: 'https://media.istockphoto.com/id/637831704/photo/save-the-earth.webp?a=1&b=1&s=612x612&w=0&k=20&c=i6qfc-KXgPOmoWdGeHGq8_BLdkNdBlmRe1wglrkh0ao='
    },
    {
      id: 'testprep',
      name: 'Test Preparation',
      icon: <BookMarked className="w-6 h-6" />,
      color: 'bg-red-500',
      description: 'Strategic preparation for standardized tests, entrance exams, and competitive examinations.',
      grades: 'Middle school through college entrance',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'skills',
      name: 'Study Skills',
      icon: <Brain className="w-6 h-6" />,
      color: 'bg-teal-500',
      description: 'Build effective learning habits, time management, and organization skills that last a lifetime.',
      grades: 'All students',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  // Process steps
  const processSteps = [
    {
      id: 1,
      title: 'Request a Tutor',
      description: 'Tell us your needs, subject areas, and scheduling preferences.',
      icon: <User className="w-6 h-6" />,
      color: 'bg-blue-500',
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      title: 'Perfect Match',
      description: 'We pair you with a qualified tutor specialized in your subject and compatible with your learning style.',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-purple-500',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 3,
      title: 'First Session',
      description: 'Your tutor conducts an assessment and creates a personalized learning plan.',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-green-500',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 4,
      title: 'Regular Learning',
      description: 'Scheduled sessions with guided practice, homework help, and concept mastery.',
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-amber-500',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 5,
      title: 'Progress Tracking',
      description: 'Regular progress reports and plan adjustments to ensure continuous improvement.',
      icon: <BarChart className="w-6 h-6" />,
      color: 'bg-red-500',
      image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  // Featured tutors
  const tutors = [
    {
      name: "Priya Sharma",
      subjects: "Mathematics, Physics",
      experience: "8 years",
      education: "M.Sc. Mathematics",
      rating: 4.9,
      reviews: 48,
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      location: "Hyderabad"
    },
    {
      name: "Rahul Mehta",
      subjects: "English Literature, Grammar",
      experience: "6 years",
      education: "M.A. English",
      rating: 4.8,
      reviews: 36,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "Hyderabad"
    },
    {
      name: "Ananya Patel",
      subjects: "Chemistry, Biology",
      experience: "10 years",
      education: "Ph.D. Biochemistry",
      rating: 5.0,
      reviews: 52,
      image: "https://randomuser.me/api/portraits/women/42.jpg",
      location: "Hyderabad"
    }
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

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className={`${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gradient-to-b from-white to-gray-50 text-gray-900'} transition-colors duration-300 -mt-16`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1622&q=80')] bg-cover bg-center" />
          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-b from-green-900/90 via-gray-900/90 to-gray-900/95' : 'bg-gradient-to-b from-green-900/80 via-green-800/75 to-green-700/70'}`} />
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
          <div className="w-24 h-24 text-green-400 opacity-20">
            <BookOpen size={96} />
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
          <div className="w-16 h-16 text-amber-400 opacity-20">
            <GraduationCap size={64} />
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
              className="inline-flex items-center text-white hover:text-green-200 transition-colors px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10"
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
                <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full px-4 py-1 text-sm font-medium">Personalized Education</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              >
                Expert Home Tutors for Academic Excellence
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl text-white/90 mb-8 max-w-xl lg:max-w-none font-medium"
              >
                One-on-one personalized learning with qualified tutors who come to your home, helping students achieve their full potential.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(167, 243, 208, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookNow}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg flex items-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Find a Tutor
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+918008330905"
                  className="px-8 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 font-semibold rounded-full shadow-lg flex items-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call for Details
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
                      src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                      alt="Tutor and student"
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
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400">
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="ml-3">
                        <div className="text-2xl font-bold">500+</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Qualified Tutors</div>
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
                      <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <Star className="w-5 h-5" />
                      </div>
                      <div className="ml-3">
                        <div className="text-2xl font-bold">4.9</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Average Rating</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subject Cards Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className={`inline-block px-4 py-1 ${darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700'} rounded-full text-sm font-medium mb-4`}>SUBJECT AREAS</span>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Comprehensive Tutoring Across All Subjects
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
              Our expert tutors provide personalized instruction in all academic areas, helping students build confidence and achieve success
            </p>
          </motion.div>

          {/* Subject Selection Tabs */}
          <div className="flex justify-center mb-12 overflow-x-auto pb-2">
            <div className={`inline-flex ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-1 rounded-full`}>
              {subjects.map((subject) => (
                <motion.button
                  key={subject.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSubject(subject.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center whitespace-nowrap transition-colors ${activeSubject === subject.id
                      ? `bg-${subject.color.split('-')[1]}-600 text-white`
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`
                    }`}
                >
                  <span className="mr-2">{subject.icon}</span>
                  <span>{subject.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Active Subject Content */}
          <AnimatePresence mode="wait">
            {subjects.map((subject) => {
              if (subject.id !== activeSubject) return null;

              return (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto ${darkMode ? 'bg-gray-900/50 backdrop-blur-md' : 'bg-white'} p-6 rounded-2xl shadow-lg`}
                >
                  {/* Subject Image */}
                  <div className="rounded-xl overflow-hidden h-80 relative">
                    <img
                      src={subject.image}
                      alt={subject.name}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute bottom-0 left-0 right-0 ${subject.color} bg-opacity-90 p-4`}>
                      <div className="flex items-center">
                        <div className="p-2 bg-white rounded-full mr-3">
                          {subject.icon}
                        </div>
                        <h3 className="text-white text-xl font-bold">{subject.name}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Subject Content */}
                  <div className="flex flex-col justify-center">
                    <h3 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {subject.name} Tutoring
                    </h3>

                    <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                      {subject.description}
                    </p>

                    <div className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                      <div className="flex items-center mb-2">
                        <GraduationCap className="w-5 h-5 mr-2 text-green-600" />
                        <span className="font-medium">Available for:</span>
                      </div>
                      <p>{subject.grades}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>What students learn:</h4>
                      {[1, 2, 3].map((item) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: item * 0.1 }}
                          className={`flex items-center p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
                        >
                          <Check className={`w-5 h-5 mr-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                          <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                            {item === 1 ? 'Fundamental concepts and principles' :
                              item === 2 ? 'Problem-solving techniques' :
                                'Exam preparation strategies'}
                          </span>
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
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                    >
                      Find a {subject.name} Tutor
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* All Subjects Grid for Mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-16">
            {subjects.map((subject, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveSubject(subject.id)}
                className={`cursor-pointer p-4 rounded-xl text-center transition-colors ${activeSubject === subject.id
                    ? `${subject.color} text-white`
                    : `${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`
                  } ${darkMode ? 'shadow-dark' : 'shadow-sm'}`}
              >
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 ${activeSubject === subject.id ? 'bg-white/20' : (darkMode ? 'bg-gray-800' : 'bg-gray-100')
                  }`}>
                  {subject.icon}
                </div>
                <div className="text-sm font-medium">{subject.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section ref={processRef} className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className={`inline-block px-4 py-1 ${darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700'} rounded-full text-sm font-medium mb-4`}>OUR PROCESS</span>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              How Our Tutoring Service Works
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
              A smooth, straightforward journey from your first inquiry to academic success
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline path - visible on desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 transform -translate-x-1/2"></div>

            {/* Process Steps */}
            <div className="space-y-24">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
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
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>{step.description}</p>
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

      {/* Featured Tutors Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className={`inline-block px-4 py-1 ${darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700'} rounded-full text-sm font-medium mb-4`}>OUR EDUCATORS</span>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Meet Our Expert Tutors
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
              Highly qualified and experienced educators passionate about student success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tutors.map((tutor, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className={`${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300`}
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-sm p-3`}>
                    <div className="flex items-center">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className={i < Math.floor(tutor.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className={`ml-2 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tutor.rating} ({tutor.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tutor.name}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{tutor.subjects}</p>

                  <div className="flex items-center mb-3">
                    <GraduationCap className={`w-5 h-5 mr-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tutor.education}</span>
                  </div>

                  <div className="flex items-center mb-3">
                    <Clock className={`w-5 h-5 mr-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tutor.experience} experience</span>
                  </div>

                  <div className="flex items-center">
                    <MapPin className={`w-5 h-5 mr-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tutor.location}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`mt-5 w-full py-2 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg flex items-center justify-center`}
                  >
                    Book a Session
                    <ArrowRight size={16} className="ml-2" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-full inline-flex items-center`}
            >
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>View All Tutors</span>
              <ChevronRight size={18} className={`ml-1 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className={`inline-block px-4 py-1 ${darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700'} rounded-full text-sm font-medium mb-4`}>SUCCESS STORIES</span>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              What Our Students Say
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
              Real experiences from students and parents who've seen remarkable academic improvement
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Arjun K.",
                  role: "High School Student",
                  image: "https://randomuser.me/api/portraits/men/77.jpg",
                  quote: "My math grades improved from C to A- in just two months of tutoring. My tutor explains concepts clearly and makes learning fun!",
                  subject: "Mathematics"
                },
                {
                  name: "Meera Shah",
                  role: "Parent",
                  image: "https://randomuser.me/api/portraits/women/63.jpg",
                  quote: "The personalized approach has made all the difference for my daughter. She now enjoys science and participates actively in class.",
                  subject: "Science"
                },
                {
                  name: "Vikram Singh",
                  role: "College Student",
                  image: "https://randomuser.me/api/portraits/men/36.jpg",
                  quote: "The test preparation strategies helped me score well above my target on the entrance exams. Excellent guidance!",
                  subject: "Test Prep"
                }
              ].map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-2xl shadow-lg`}
                >
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="inline-block text-amber-500 fill-amber-500 mr-1" />
                    ))}
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6 italic font-medium`}>"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</h4>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.role}</div>
                      <div className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'} mt-1`}>Subject: {testimonial.subject}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-700 to-green-900 text-white relative overflow-hidden">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Excel Academically?</h2>
            <p className="text-xl mb-10 text-white/90 font-medium">
              Take the first step toward educational success with our personalized tutoring services
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookNow}
                className="px-8 py-4 bg-white text-green-700 font-bold rounded-full shadow-lg flex items-center text-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Find Your Perfect Tutor
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+918008330905"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full flex items-center text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call For Consultation
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-10 text-white/80 font-medium"
            >
              <p>All our tutors are background-verified and highly qualified</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomeTutors;