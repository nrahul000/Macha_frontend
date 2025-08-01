import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Sparkles,
  CheckCircle,
  Check,
  ArrowLeft,
  Calendar,
  Phone,
  Clock,
  ShieldCheck,
  Users,
  ArrowRight,
} from "lucide-react";

const HomeKeeping = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/book");
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 -mt-16">
      {/* Hero Section */}
      <section className="relative py-40 pt-60 bg-gradient-to-b from-green-900 to-green-900 bg-opacity-50 mix-blend-multiply">
        <div className="absolute inset-0 bg-opacity-100 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>

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
              Professional Home Keeping Services
            </h1>
            <p className="text-2xl md:text-2xl mb-8">
              Maintain a clean and welcoming home with our comprehensive home
              keeping solutions
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
                <Calendar className="w-6 h-6 mr-2 inline" /> Book Online
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Why Choose Our Home Keeping Services
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg">
            We make your home shine with professional care, attention to detail,
            and eco-conscious practices.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
            {/* Card 1 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://media.istockphoto.com/id/620730254/photo/plastic-bucket-with-cleaning-supplies-in-home.jpg?s=612x612&w=0&k=20&c=ZOAEoE4M6QoIwduuXL16H-shGbI5MOl6thkoMmV9BnA="
                  alt="Thorough & Detailed"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Thorough & Detailed
              </h3>
              <p className="text-gray-500 mb-4">
                Our professional cleaners are trained to pay attention to every
                detail, ensuring a comprehensive cleaning experience.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Detailed cleaning protocols
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Quality assurance checks
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://media.istockphoto.com/id/945770212/photo/blue-eco-inscription-on-grey-asphalt-with-the-image-of-planet-earth-free-space.jpg?s=612x612&w=0&k=20&c=l9qPftktF80qifXKnAFijuzwaEM3ES6hErRZm1bZntc="
                  alt="Safe & Eco-Friendly"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-7 h-7 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Safe & Eco-Friendly
              </h3>
              <p className="text-gray-500 mb-4">
                We use environmentally friendly cleaning products that are safe
                for your family, pets, and the planet.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Non-toxic cleaning agents
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Sustainable practices
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://media.istockphoto.com/id/504820644/photo/elderly-care-in-the-home.jpg?s=612x612&w=0&k=20&c=isP3YM8olffK0wzIeoxgBO1PlnWL5E9Xv5WU3B-Uuvk="
                  alt="Trusted Professionals"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Trusted Professionals
              </h3>
              <p className="text-gray-500 mb-4">
                Our cleaning staff are carefully vetted, background-checked, and
                trained to deliver exceptional service.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Verified personnel
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Professional training
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Home Keeping Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
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
                  src="https://media.istockphoto.com/id/1312096254/photo/hard-working-cafe-worker-cleaning-and-sanitizing-kitchen-surfaces.jpg?s=612x612&w=0&k=20&c=lFUiDkQjGRnH9zlL_0K3HNBIQP-LVrwsI3JDMzE-4Ng="
                  alt="Regular Cleaning"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Clock size={24} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <CheckCircle size={22} className="text-green-600 mr-2" />{" "}
                Regular Cleaning
              </h3>
              <p className="text-gray-500 mb-4">
                Maintain a consistently clean home with our recurring cleaning
                services, scheduled at your convenience.
              </p>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  <span>Dusting and surface cleaning</span>
                </li>
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  <span>Bathroom and kitchen sanitization</span>
                </li>
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  <span>Floor cleaning and vacuuming</span>
                </li>
              </ul>
            </motion.div>

            {/* Card 2 */}
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
                  src="https://media.istockphoto.com/id/1392580573/photo/removing-dirt-from-soft-carpet-with-a-vacuum-cleaner-indoors.jpg?s=612x612&w=0&k=20&c=3gdPAXK1YdwFp-xYpgCejonyYZio_7BkTNdHulfzaEY="
                  alt="Deep Cleaning"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Home size={24} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <CheckCircle size={22} className="text-green-600 mr-2" /> Deep
                Cleaning
              </h3>
              <p className="text-gray-500 mb-4">
                A comprehensive cleaning service that reaches every corner,
                removing built-up dirt and grime for a truly refreshed home.
              </p>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  <span>Inside appliance cleaning</span>
                </li>
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  <span>Cabinet and drawer detailing</span>
                </li>
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  <span>Baseboard and vent cleaning</span>
                </li>
              </ul>
            </motion.div>

            {/* Card 3 */}
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
                  src="https://media.istockphoto.com/id/915613366/photo/young-woman-cleaning-wooden-floor-in-new-apartment.jpg?s=612x612&w=0&k=20&c=arSK4_Fym28K_neyz7hQSK_LOJfUgmY2pLIVlBqnduo="
                  alt="Move-In/Move-Out Cleaning"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowLeft size={24} />
                <ArrowRight size={24} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <CheckCircle size={22} className="text-green-600 mr-2" />{" "}
                Move-In/Move-Out Cleaning
              </h3>
              <p className="text-gray-500 mb-4">
                Start fresh in your new home or leave your previous residence
                spotless with our specialized moving cleaning service.
              </p>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  <span>Complete property cleaning</span>
                </li>
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  <span>Window and track cleaning</span>
                </li>
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  <span>Fixture and appliance detailing</span>
                </li>
              </ul>
            </motion.div>

            {/* Card 4 */}
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
                  src="https://media.istockphoto.com/id/1205012320/photo/workers-with-specialized-truck-cleaning-sewer-system-in-residential-area.jpg?s=612x612&w=0&k=20&c=6ivWkxV4L7jNm9zxR3_XrEVnEfmZXBWf_InVZlDXFOU="
                  alt="Specialized Cleaning"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <CheckCircle size={24} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <CheckCircle size={22} className="text-green-600 mr-2" />{" "}
                Specialized Cleaning
              </h3>
              <p className="text-gray-500 mb-4">
                We offer specialized cleaning services for specific needs,
                including post-construction cleaning and seasonal deep cleaning.
              </p>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  <span>Post-renovation cleanup</span>
                </li>
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  <span>Spring cleaning services</span>
                </li>
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  <span>Event preparation and cleanup</span>
                </li>
              </ul>
            </motion.div>
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
            How Our Home Keeping Service Works
          </motion.h2>

          <motion.p
            className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We follow a seamless 4-step process to provide you with hassle-free
            and high-quality cleaning services for your home.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {[
              {
                title: "Book Your Service",
                desc: "Schedule your cleaning service online or by phone, choosing the service type and preferred time.",
                img: "https://media.istockphoto.com/id/1352910523/photo/businesswoman-clicking-smart-phones-internet-search-page-go-to-link-success-navigation.jpg?s=612x612&w=0&k=20&c=iczt4Ib0GPAoC0q02a_J8Engd94H2ORLaoFrQB1EslQ=",
              },
              {
                title: "Confirmation",
                desc: "Receive booking confirmation and details about your assigned cleaning professional.",
                img: "https://media.istockphoto.com/id/1352214244/vector/answering-vote-question-on-cellphone-vector-or-phone-approval-acceptance-checkmark-on-survey.jpg?s=612x612&w=0&k=20&c=MHe4y2t2eNXm6VFT5x8xqwRNA4-Ker1LpXcf5hlwAH8=",
              },
              {
                title: "Professional Cleaning",
                desc: "Our trained professionals arrive on time and clean your home according to your specifications.",
                img: "https://media.istockphoto.com/id/518586238/photo/commercial-cleaning-contractors.jpg?s=612x612&w=0&k=20&c=7MJ8TJRs_EotZw3rPNicWBkgLjECiigOg7_nOkTyylU=",
              },
              {
                title: "Quality Check",
                desc: "We conduct a final review and welcome your feedback to ensure complete satisfaction.",
                img: "https://media.istockphoto.com/id/1364946137/photo/businessman-holding-and-showing-the-best-quality-assurance-with-golden-five-stars-for.jpg?s=612x612&w=0&k=20&c=ewqI36IOI0FE9fQGEjhVrdR_4sAg77ICJJ2gZgZxH-0=",
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
                <div className="flex justify-center mb-6">
                  <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-green-400 to-green-700 border-2 border-green-600 group-hover:border-green-500 transition-all duration-300 overflow-hidden flex items-center justify-center">
                    <img
                      src={step.img}
                      alt={`Step ${index + 1}`}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                  </div>
                </div>

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

      {/* Pricing Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl text-gray-800 font-bold text-center mb-12">
            Our Pricing Plans
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Standard Clean */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:border-2 border-green-700 hover:scale-105 hover:shadow-xl">
              <div className="p-6 bg-green-50">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Standard Clean
                </h3>
                <div className="text-gray-600 mb-4">
                  Perfect for regular maintenance
                </div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹799
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    /visit
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  For homes up to 1500 sq ft
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>All living areas and bedrooms</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Kitchen and bathrooms</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Dusting and vacuuming</span>
                  </li>
                </ul>
                <button
                  onClick={handleBookNow}
                  className="w-full mt-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Deep Clean */}
            <div className="bg-white rounded-xl shadow-lg transform md:scale-105 overflow-hidden border-2 border-green-300 transition duration-300 hover:border-green-700 hover:scale-110 hover:shadow-xl relative">
              <div className="absolute top-0 w-full text-center">
                <div className="bg-green-500 text-white px-4 py-1 text-sm font-medium inline-block rounded-b-lg">
                  Most Popular
                </div>
              </div>
              <div className="p-6 bg-green-50 pt-10">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Deep Clean
                </h3>
                <div className="text-gray-600 mb-4">For a thorough refresh</div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹1299
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    /visit
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  For homes up to 1500 sq ft
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Everything in Standard Clean</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Inside cabinets and appliances</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Window interiors and baseboards</span>
                  </li>
                </ul>
                <button
                  onClick={handleBookNow}
                  className="w-full mt-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Move-In/Out */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:border-2 border-green-700 hover:scale-105 hover:shadow-xl">
              <div className="p-6 bg-green-50">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Move-In/Out
                </h3>
                <div className="text-gray-600 mb-4">For a fresh start</div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹1899
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    /visit
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  For homes up to 1500 sq ft
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Everything in Deep Clean</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Refrigerator and oven cleaning</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Wall cleaning and fixture detailing</span>
                  </li>
                </ul>
                <button
                  onClick={handleBookNow}
                  className="w-full mt-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-10 text-gray-500">
            <p>
              Additional charges may apply for larger homes, extra services, or
              specific cleaning requirements.
            </p>
            <p className="mt-2">
              Contact us for a customized quote for your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Frequently Asked Questions
          </h2>
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            {[
              {
                q: "Do I need to provide cleaning supplies?",
                a: "No, our cleaning professionals bring all necessary supplies and equipment. We use high-quality, eco-friendly cleaning products. If you have specific products you'd prefer we use, please let us know in advance.",
              },
              {
                q: "How long does a typical cleaning take?",
                a: "The duration depends on the size of your home and the type of service. A standard cleaning for a 2-bedroom home typically takes 2-3 hours, while a deep cleaning may take 4-5 hours. We'll provide a more accurate estimate when you book.",
              },
              {
                q: "Are your cleaning staff insured?",
                a: "Yes, all our cleaning professionals are fully insured. We also conduct thorough background checks on all our staff to ensure the security of your home and belongings.",
              },
              {
                q: "Can I schedule recurring cleaning services?",
                a: "Absolutely! We offer weekly, bi-weekly, and monthly recurring services at discounted rates. You can easily set up a schedule that works for you, and we'll send the same cleaning professional whenever possible.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-center md:items-start group ${i % 2 === 0 ? "" : "md:flex-row-reverse"
                  }`}
              >
                <div className="md:w-1/5 w-full flex justify-center mb-4 md:mb-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg border-4 border-green-200">
                    <span className="text-white text-3xl font-bold">
                      {i + 1}
                    </span>
                  </div>
                </div>
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
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-green-800 to-black rounded-2xl p-8 md:p-12 shadow-lg max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Text Section */}
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready for a cleaner, fresher home?
                </h2>
                <p className="text-green-100 text-lg mb-0">
                  Book our professional home keeping services today and enjoy a
                  spotless living environment without the hassle.
                </p>
              </div>

              {/* Buttons Section */}
              <div className="md:w-2/3 flex flex-col md:items-end gap-4">
                <a
                  href="tel:+918008330905"
                  className="px-6 py-3 text-lg bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors shadow-md text-center"
                >
                  <Phone className="w-6 h-6 mr-2 inline" /> Call Now: +91 8008
                  330 905
                </a>
                <button
                  onClick={handleBookNow}
                  className="px-6 py-3 text-lg bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 border border-white border-opacity-25 transition-colors shadow-md"
                >
                  <Calendar className="w-6 h-6 mr-2 inline" /> Book Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeKeeping;
