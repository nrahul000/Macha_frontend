import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Building,
  CheckCircle,
  Check,
  ArrowLeft,
  Calendar,
  Phone,
  Eye,
  FileText,
  MapPin,
  Key,
  Search,
} from "lucide-react";

const HouseRental = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/book");
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 -mt-16">
      {/* Hero Section */}
      <section className="relative  py-40 pt-60  py-20 bg-gradient-to-b from-green-900 to-green-900 mix-blend-multiply pt-32">
        <div className="absolute inset-0 bg-opacity-100 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>

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

        <div className="container mx-auto pt-40 px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="text-5xl md:text-5xl font-bold mb-4">
              House Rental Services
            </h1>
            <p className="text-2xl md:text-2xl mb-8">
              Find your perfect home in Choutuppal with our comprehensive rental
              assistance
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918008330905"
                className="px-8 py-3 bg-white text-xl text-green-500 font-semibold rounded-full hover:bg-green-50 transition-colors"
              >
                <Phone className="w-6 h-6 mr-2 inline" /> Call Now
              </a>
              <button
                onClick={handleBookNow}
                className="px-8 py-3 bg-green-600 text-xl text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
              >
                <Calendar className="w-6 h-6 mr-2 inline" /> Book Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Why Choose Our Rental Services
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg">
            We make renting easy, reliable, and efficient with a customer-first
            approach tailored to your needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
            {/* Card 1 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://img.freepik.com/free-vector/real-estate-searching_23-2148686371.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Extensive Listings"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <Search className="w-7 h-7 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Extensive Listings
              </h3>
              <p className="text-gray-500 mb-4">
                Access a wide range of verified rental properties across the
                city, with detailed information and high-quality images.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Verified properties only
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Various housing options
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://img.freepik.com/free-vector/real-estate-agency-interior-flat-composition-with-realtor-helping-family-couple-buyers-choosing-first-house_1284-61532.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Expert Guidance"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <Key className="w-7 h-7 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Expert Guidance
              </h3>
              <p className="text-gray-500 mb-4">
                Our experienced team provides personalized support throughout
                your rental journey, from property selection to move-in.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Personalized property matching
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Neighborhood insights
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://img.freepik.com/premium-photo/png-family-with-home-insurance-protection-plan-transparent-background_53876-966119.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Comprehensive Support"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <Building className="w-7 h-7 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Comprehensive Support
              </h3>
              <p className="text-gray-500 mb-4">
                We assist with every aspect of the rental process, including
                paperwork, negotiations, and post-move-in support.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  End-to-end rental assistance
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Dedicated relationship manager
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
            Our Rental Services
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
                  src="https://img.freepik.com/premium-photo/magnifying-glass-reveals-cityscape-night-with-focus-buildings-streets_1395858-2074.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Property Search & Selection"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Search size={24} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <CheckCircle size={22} className="text-green-600 mr-2" />
                Property Search & Selection
              </h3>
              <p className="text-gray-500 mb-4">
                We help you find properties that match your requirements and
                budget, saving you time and effort in the house hunting process.
              </p>
              <ul className="space-y-2">
                {[
                  "Customized property search",
                  "Virtual tours available",
                  "Shortlisting assistance",
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
                  src="https://img.freepik.com/free-photo/real-estate-agent-looking-plans-front-door_23-2147653367.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Property Visits & Inspection"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Eye size={24} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <CheckCircle size={22} className="text-green-600 mr-2" />
                Property Visits & Inspection
              </h3>
              <p className="text-gray-500 mb-4">
                We arrange and accompany you on property visits, helping you
                evaluate features and potential issues before making a decision.
              </p>
              <ul className="space-y-2">
                {[
                  "Scheduled property tours",
                  "Professional property assessment",
                  "Condition documentation",
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
                  src="https://img.freepik.com/premium-photo/tenant-lease-signing-moment-agreement-new-beginning_1198884-42760.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Rental Agreement & Documentation"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <FileText size={24} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <CheckCircle size={22} className="text-green-600 mr-2" />
                Rental Agreement & Documentation
              </h3>
              <p className="text-gray-500 mb-4">
                We handle all legal paperwork and ensure fair terms in your
                rental agreement, protecting your interests as a tenant.
              </p>
              <ul className="space-y-2">
                {[
                  "Standard rental agreement preparation",
                  "Terms negotiation",
                  "Digital documentation",
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
                  src="https://img.freepik.com/free-photo/happy-courier-giving-touchpad-senior-customer-sing-home-delivery_637285-2319.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Move-In Support"
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
                <CheckCircle size={22} className="text-green-600 mr-2" />
                Move-In Support
              </h3>
              <p className="text-gray-500 mb-4">
                We coordinate with property owners and provide assistance during
                the move-in process to ensure a smooth transition to your new
                home.
              </p>
              <ul className="space-y-2">
                {[
                  "Key handover coordination",
                  "Move-in inspection",
                  "Utility connection assistance",
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

      {/* Property Types */}
      <section className="py-16 bg-gray-30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Property Types We Offer
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative group transform transition duration-300 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Apartment"
                className="w-full h-52 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">Apartments</h3>
                  <p className="text-sm opacity-90">
                    Modern apartment complexes with amenities
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative group transform transition duration-300 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Independent House"
                className="w-full h-52 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">
                    Independent Houses
                  </h3>
                  <p className="text-sm opacity-90">
                    Private houses with outdoor space
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative group transform transition duration-300 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Villa"
                className="w-full h-52 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">Villas</h3>
                  <p className="text-sm opacity-90">
                    Luxury villas in gated communities
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative group transform transition duration-300 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Commercial Space"
                className="w-full h-52 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">
                    Commercial Spaces
                  </h3>
                  <p className="text-sm opacity-90">
                    Offices and retail spaces for businesses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-4 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How Our Rental Service Works
          </motion.h2>

          <motion.p
            className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our simple step-by-step process ensures a hassle-free rental
            experience tailored to your needs.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {[
              {
                title: "Share Requirements",
                desc: "Tell us your preferences, budget, and location requirements for your ideal rental.",
                img: "https://img.freepik.com/premium-photo/estate-planning-is-process-organizing-managing-persons-assets_99096-12496.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740",
              },
              {
                title: "Property Suggestions",
                desc: "We'll curate a list of suitable properties that match your criteria.",
                img: "https://img.freepik.com/free-photo/real-estate-agents-working-building-s-main-entrance_23-2147650201.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740",
              },
              {
                title: "Property Visits",
                desc: "Schedule and attend visits to your shortlisted properties with our assistance.",
                img: "https://img.freepik.com/free-photo/full-shot-couple-talking-real-estate-agent_23-2150322070.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740",
              },
              {
                title: "Finalize & Move In",
                desc: "We'll help with agreement, deposit, and coordination for a smooth move-in.",
                img: "https://img.freepik.com/free-photo/portrait-smiling-young-couple-together-holding-moving-cardboard-box_23-2148095445.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740",
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
      <section className="py-16 bg-gray-30">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl text-gray-800 font-bold text-center mb-12">
            Our Service Packages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Package */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:border-2 border-green-700 hover:scale-105 hover:shadow-xl">
              <div className="p-6 bg-green-50">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Basic Package
                </h3>
                <div className="text-gray-600 mb-4">
                  Essential rental assistance
                </div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹1,999
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    one-time
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Property shortlisting</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>1 property visit</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Basic agreement review</span>
                  </li>
                </ul>
                <button
                  onClick={handleBookNow}
                  className="w-full mt-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Select Package
                </button>
              </div>
            </div>

            {/* Standard Package */}
            <div className="bg-white rounded-xl shadow-lg transform md:scale-105 overflow-hidden border-2 border-green-300 transition duration-300 hover:border-green-700 hover:scale-110 hover:shadow-xl relative">
              <div className="absolute top-0 w-full text-center">
                <div className="bg-green-500 text-white px-4 py-1 text-sm font-medium inline-block rounded-b-lg">
                  Most Popular
                </div>
              </div>
              <div className="p-6 bg-green-50 pt-10">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Standard Package
                </h3>
                <div className="text-gray-600 mb-4">
                  Complete rental solution
                </div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹3,999
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    one-time
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>All Basic Package features</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Up to 5 property visits</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Complete agreement assistance</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Move-in coordination</span>
                  </li>
                </ul>
                <button
                  onClick={handleBookNow}
                  className="w-full mt-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Select Package
                </button>
              </div>
            </div>

            {/* Premium Package */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:border-2 border-green-700 hover:scale-105 hover:shadow-xl">
              <div className="p-6 bg-green-50">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Premium Package
                </h3>
                <div className="text-gray-600 mb-4">VIP rental experience</div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹5,999
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    one-time
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>All Standard Package features</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Unlimited property visits</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Priority property access</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Post move-in support (30 days)</span>
                  </li>
                </ul>
                <button
                  onClick={handleBookNow}
                  className="w-full mt-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Select Package
                </button>
              </div>
            </div>
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
                q: "What documents do I need to rent a property?",
                a: "Typically, you'll need identification proof (Aadhaar/PAN card), address proof, income proof (salary slips or bank statements), employment verification, and passport-sized photographs. We'll guide you through the specific requirements for your chosen property.",
              },
              {
                q: "How much security deposit is required?",
                a: "Security deposits typically range from 1-3 months' rent depending on the property type and location. We negotiate to ensure fair deposit amounts and clearly document them in the agreement to protect your interests.",
              },
              {
                q: "Can you help with rental negotiations?",
                a: "Yes, our team negotiates on your behalf regarding rent, deposit, maintenance charges, and other terms in the rental agreement. We leverage our market knowledge and relationships with property owners to secure favorable terms.",
              },
              {
                q: "Do you provide assistance after I move in?",
                a: "Yes, depending on your service package. Our standard and premium packages include post-move-in support to help address any initial issues with the property, coordinate with the landlord for repairs, and ensure a smooth transition to your new home.",
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
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-green-800 to-black rounded-2xl p-8 md:p-12 shadow-lg max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Text Section */}
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to find your perfect rental?
                </h2>
                <p className="text-green-100 text-lg mb-0">
                  Contact us today to begin your house hunting journey with
                  expert guidance every step of the way.
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
                  <MapPin className="w-6 h-6 mr-2 inline" /> Find Properties
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HouseRental;
