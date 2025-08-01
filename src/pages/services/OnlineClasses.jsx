import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Monitor,
  Laptop,
  CheckCircle,
  Check,
  ArrowLeft,
  Calendar,
  Phone,
  BookOpen,
  ClipboardCheck,
  Briefcase,
  Paintbrush2,
  GraduationCap,
  Users,
} from "lucide-react";

const OnlineClasses = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/book");
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 -mt-16">
      {/* Hero Section */}
      <section className="relative py-40 pt-60 bg-gradient-to-b from-green-900 to-green-900 bg-opacity-50 mix-blend-multiply">
        <div className="absolute inset-0 bg-opacity-100 bg-[url('https://img.freepik.com/premium-photo/girl-studying-online-laptop-home_1048944-12972244.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740')] bg-cover bg-center mix-blend-overlay"></div>

        {/* Back to Services button positioned below navbar */}
        <div className="absolute top-20 sm:top-24 md:top-28 left-4 sm:left-8 z-20">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:text-green-100 transition-colors px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-medium">Back to Services</span>
          </Link>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="text-5xl md:text-5xl font-bold mb-4">
              Interactive Online Classes
            </h1>
            <p className="text-2xl md:text-2xl mb-8">
              Quality education delivered to your screen with engaging,
              interactive learning experiences
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918008330905"
                className="px-8 py-3 bg-white text-green-700 text-2xl font-semibold rounded-full hover:bg-green-50 transition-colors"
              >
                <Phone className="w-6 h-6 mr-2 inline" /> Call Now
              </a>
              <button
                onClick={handleBookNow}
                className="px-8 py-3 bg-green-800 text-white text-2xl font-semibold rounded-full hover:bg-green-900 transition-colors"
              >
                <Calendar className="w-6 h-6 mr-2 inline" /> Book a Class
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Why Choose Our Online Classes
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg">
            Experience engaging, expert-led learning tailored for digital
            success.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
            {/* Card 1 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://img.freepik.com/premium-photo/cheerful-child-standing-blackboard-with-teacher_474717-125062.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Expert Educators"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <motion.div
                  className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <GraduationCap className="w-7 h-7 text-green-600" />
                </motion.div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Expert Educators
              </h3>
              <p className="text-gray-500 mb-4">
                Learn from qualified teachers with extensive experience in their
                subjects and in online education delivery.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    size={20}
                    className="text-green-500 mr-2 flex-shrink-0"
                  />
                  <span>Certified instructors</span>
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    size={20}
                    className="text-green-500 mr-2 flex-shrink-0"
                  />
                  <span>Subject matter specialists</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://img.freepik.com/free-photo/3d-graph-computer-illustration_23-2151884885.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Interactive Platform"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <motion.div
                  className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Laptop className="w-7 h-7 text-green-600" />
                </motion.div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Interactive Platform
              </h3>
              <p className="text-gray-500 mb-4">
                Our advanced learning platform facilitates real-time
                interaction, collaborative activities, and engaging multimedia
                content.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    size={20}
                    className="text-green-500 mr-2 flex-shrink-0"
                  />
                  <span>Live video sessions</span>
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    size={20}
                    className="text-green-500 mr-2 flex-shrink-0"
                  />
                  <span>Interactive learning tools</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://img.freepik.com/free-photo/learning-education-ideas-insight-intelligence-study-concept_53876-120116.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Personalized Learning"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <motion.div
                  className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Users className="w-7 h-7 text-green-600" />
                </motion.div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Personalized Learning
              </h3>
              <p className="text-gray-500 mb-4">
                We adapt teaching methods to different learning styles and
                provide individualized attention in small group settings.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    size={20}
                    className="text-green-500 mr-2 flex-shrink-0"
                  />
                  <span>Small batch sizes</span>
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    size={20}
                    className="text-green-500 mr-2 flex-shrink-0"
                  />
                  <span>Custom learning paths</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Online Course Categories
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Academic Subjects */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 h-52 border-2 border-green-800 rounded-xl overflow-hidden">
                <img
                  src="https://img.freepik.com/premium-photo/front-view-open-book-graduation-cap-diploma-earth-globe-triangle-education-day_23-2149241023.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Academic Subjects"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <BookOpen size={24} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <CheckCircle size={22} className="text-green-600 mr-2" />
                Academic Subjects
              </h3>
              <p className="text-gray-500 mb-4">
                Comprehensive courses covering school and college curriculum
                across various subjects to help students excel in their academic
                pursuits.
              </p>
              <ul className="space-y-2">
                {[
                  "Mathematics and Sciences",
                  "Languages and Literature",
                  "Social Studies and Humanities",
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-gray-800">
                    <Check
                      size={18}
                      className="text-green-600 mr-2 mt-1 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Test Preparation */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 h-52 border-2 border-green-800 rounded-xl overflow-hidden">
                <img
                  src="https://img.freepik.com/free-photo/medium-shot-kid-cheating-school-test_23-2150104999.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Test Preparation"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ClipboardCheck size={24} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <CheckCircle size={22} className="text-green-600 mr-2" />
                Test Preparation
              </h3>
              <p className="text-gray-500 mb-4">
                Targeted courses designed to help students prepare for
                competitive exams, entrance tests, and standardized assessments.
              </p>
              <ul className="space-y-2">
                {[
                  "Entrance examination prep",
                  "Competitive exam strategies",
                  "Practice tests and assessments",
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-gray-800">
                    <Check
                      size={18}
                      className="text-green-600 mr-2 mt-1 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Professional Skills */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-6 h-52 border-2 border-green-800 rounded-xl overflow-hidden">
                <img
                  src="https://img.freepik.com/premium-photo/skills-learning-personal-development-finance-competency-business-concept_161452-13546.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Professional Skills"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Briefcase size={24} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <CheckCircle size={22} className="text-green-600 mr-2" />
                Professional Skills
              </h3>
              <p className="text-gray-500 mb-4">
                Develop career-enhancing skills with our professional
                development courses taught by industry experts.
              </p>
              <ul className="space-y-2">
                {[
                  "Programming and IT",
                  "Digital marketing",
                  "Business and management",
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-gray-800">
                    <Check
                      size={18}
                      className="text-green-600 mr-2 mt-1 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Creative Arts */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-6 h-52 border-2 border-green-800 rounded-xl overflow-hidden">
                <img
                  src="https://img.freepik.com/premium-vector/colorful-vector-icon-design-element_1120554-34924.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Creative Arts"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Paintbrush2 size={24} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <CheckCircle size={22} className="text-green-600 mr-2" />
                Creative Arts
              </h3>
              <p className="text-gray-500 mb-4">
                Express your creativity and develop artistic skills through our
                interactive arts and crafts classes.
              </p>
              <ul className="space-y-2">
                {[
                  "Music and instrumental lessons",
                  "Art and drawing classes",
                  "Creative writing workshops",
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-gray-800">
                    <Check
                      size={18}
                      className="text-green-600 mr-2 mt-1 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Age Groups Section */}
      <section className="py-16 bg-gray-30">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-4 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Classes for All Age Groups
          </motion.h2>

          <motion.p
            className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Tailored learning experiences for every age – from young learners to
            adult professionals.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {[
              {
                title: "Elementary",
                desc: "Fun, interactive classes designed for young learners with colorful visuals and engaging activities.",
                tag: "Ages 5-10",
                label: "K-5",
                img: "https://img.freepik.com/free-photo/front-view-kids-cheating-school_23-2150256530.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740",
              },
              {
                title: "Middle School",
                desc: "Comprehensive curriculum support with emphasis on building strong academic foundations.",
                tag: "Ages 11-13",
                label: "6-8",
                img: "https://img.freepik.com/premium-photo/playing-schoolchildren-playing-school-yard-feeling-happy_259150-2420.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740",
              },
              {
                title: "High School",
                desc: "Focused academic instruction and exam preparation to help students achieve their goals.",
                tag: "Ages 14-18",
                label: "9-12",
                img: "https://img.freepik.com/free-photo/smiling-students-with-backpacks_1098-1220.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740",
              },
              {
                title: "Adults",
                desc: "Professional skills development and personal interest courses for continuing education.",
                tag: "All adults",
                label: "18+",
                img: "https://img.freepik.com/premium-photo/success-is-our-middle-name-portrait-group-businesspeople-showing-thumbs-up_590464-37139.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740",
              },
            ].map((group, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg text-center border-t-4 border-green-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Step Image */}
                <div className="flex justify-center mb-6">
                  <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-green-400 to-green-700 border-2 border-green-600 group-hover:border-green-500 transition-all duration-300 overflow-hidden flex items-center justify-center">
                    <img
                      src={group.img}
                      alt={group.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                  </div>
                </div>

                {/* Floating Label */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg z-10">
                  {group.label}
                </div>

                <h3 className="font-semibold text-2xl mb-3 text-gray-800">
                  {group.title}
                </h3>
                <p className="text-gray-600 text-base">{group.desc}</p>
                <div className="mt-4">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {group.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-gray-800 font-bold text-center mb-12">
            Class Packages & Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Single Class */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:border-2 border-green-700 hover:scale-105 hover:shadow-xl">
              <div className="p-6 bg-green-50">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Single Class
                </h3>
                <div className="text-gray-600 mb-4">Pay as you go</div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹299
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    /class
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>1-hour live session</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>24-hour recording access</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Basic study materials</span>
                  </li>
                </ul>
                <button
                  onClick={handleBookNow}
                  className="w-full mt-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Book a Class
                </button>
              </div>
            </div>

            {/* Monthly Package */}
            <div className="bg-white rounded-xl shadow-lg transform md:scale-105 overflow-hidden border-2 border-green-300 transition duration-300 hover:border-green-700 hover:scale-110 hover:shadow-xl relative">
              <div className="absolute top-0 w-full text-center">
                <div className="bg-green-500 text-white px-4 py-1 text-sm font-medium inline-block rounded-b-lg">
                  Most Popular
                </div>
              </div>
              <div className="p-6 bg-green-50 pt-10">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Monthly Package
                </h3>
                <div className="text-gray-600 mb-4">12 classes per month</div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹2,499
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    /month
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>3 classes per week</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Full recording access</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Comprehensive study materials</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Weekly progress reports</span>
                  </li>
                </ul>
                <button
                  onClick={handleBookNow}
                  className="w-full mt-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Subscribe Now
                </button>
              </div>
            </div>

            {/* Term Package */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:border-2 border-green-700 hover:scale-105 hover:shadow-xl">
              <div className="p-6 bg-green-50">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Term Package
                </h3>
                <div className="text-gray-600 mb-4">
                  Save 15% on monthly rate
                </div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹12,999
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    /6 months
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>All Monthly Package benefits</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Priority scheduling</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>1-on-1 monthly consultation</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Certification upon completion</span>
                  </li>
                </ul>
                <button
                  onClick={handleBookNow}
                  className="w-full mt-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 text-gray-600">
            <p>
              Need a custom package for group or institutional learning?{" "}
              <a
                href="tel:+918008330905"
                className="text-green-600 font-medium"
              >
                Contact us
              </a>{" "}
              for special rates.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-30">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-4 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How Our Online Classes Work
          </motion.h2>

          <motion.p
            className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Learn in four simple steps: enroll, log in, attend, and grow with
            feedback.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {[
              {
                title: "Enroll in a Course",
                desc: "Choose a course that matches your needs and complete the enrollment process.",
                img: "https://img.freepik.com/premium-photo/elearning-website-with-modish-sofware-student-study-internet_31965-366863.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740",
              },
              {
                title: "Access Platform",
                desc: "Receive login details and access our user-friendly online learning platform.",
                img: "https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740",
              },
              {
                title: "Attend Classes",
                desc: "Join scheduled live sessions or access recorded lessons at your convenience.",
                img: "https://img.freepik.com/free-photo/student-class-looking-course_23-2148888810.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740",
              },
              {
                title: "Practice & Feedback",
                desc: "Complete assignments and receive personalized feedback to track progress.",
                img: "https://img.freepik.com/free-photo/feedback-results-information-satisfeaction_53876-121339.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg text-center border-t-4 border-green-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Step Image */}
                <div className="flex justify-center mb-6">
                  <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-green-400 to-green-700 border-2 border-green-600 group-hover:border-green-500 transition-all duration-300 overflow-hidden flex items-center justify-center">
                    <img
                      src={step.img}
                      alt={`Step ${index + 1}`}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                  </div>
                </div>

                {/* Floating Step Number */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                  {index + 1}
                </div>

                <h3 className="font-semibold text-2xl mb-3 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-base">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Frequently Asked Questions
          </h2>

          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            {[
              {
                q: "What equipment do I need for online classes?",
                a: "You'll need a computer, tablet, or smartphone with a stable internet connection. A webcam and microphone are recommended for interactive participation. For some specialized courses, specific software may be required, which will be communicated during enrollment.",
              },
              {
                q: "Are the classes live or pre-recorded?",
                a: "We offer both live interactive sessions and pre-recorded lessons. Live classes allow real-time interaction with instructors, while recordings provide flexibility to learn at your own pace. Most of our courses include a combination of both formats.",
              },
              {
                q: "How many students are in each class?",
                a: "We keep our class sizes small to ensure personalized attention. Most classes have 8-12 students, though this may vary depending on the course type. Some specialized courses or one-on-one tutoring options are also available.",
              },
              {
                q: "Can I cancel my subscription?",
                a: "Yes, monthly subscriptions can be canceled before the next billing cycle with 7 days' notice. For term packages, we offer partial refunds based on the number of classes already attended. Please refer to our refund policy for more details.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-center md:items-start group ${i % 2 === 0 ? "" : "md:flex-row-reverse"
                  }`}
              >
                {/* Step Number Bubble */}
                <div className="md:w-1/5 w-full flex justify-center mb-4 md:mb-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                    <span className="text-white text-3xl font-bold">
                      {i + 1}
                    </span>
                  </div>
                </div>

                {/* Question and Answer Card */}
                <div className="md:w-4/5 w-full">
                  <div
                    className={`bg-white px-14 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${i % 2 === 0
                        ? "border-l-8 border-green-500"
                        : "border-r-8 border-green-500"
                      }`}
                  >
                    <h3 className="text-2xl font-bold mb-3 flex items-center text-gray-800">
                      <span className="text-gray-500 mr-3">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 16h-1v-4h-1m1-4h.01M12 18h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                      {item.q}
                    </h3>
                    <p className="text-gray-600 text-lg pl-12">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gray-30">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-green-800 to-black rounded-2xl p-8 md:p-12 shadow-lg max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              {/* Text Section */}
              <div className="md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to start learning?
                </h2>
                <p className="text-green-100 text-lg mb-0">
                  Enroll in our interactive online classes today and take the
                  next step in your educational journey.
                </p>
              </div>

              {/* Buttons Section */}
              <div className="md:w-2/3 flex flex-col md:items-end gap-4">
                <a
                  href="tel:+918008330905"
                  className="px-6 py-3 text-lg bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors shadow-md text-center"
                >
                  <Phone className="w-6 h-6 mr-2 inline" />
                  Call Now: +91 8008 330 905
                </a>
                <button
                  onClick={handleBookNow}
                  className="px-6 py-3 text-lg bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 border border-white border-opacity-25 transition-colors shadow-md"
                >
                  <BookOpen className="w-6 h-6 mr-2 inline" />
                  Browse Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnlineClasses;
