import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Truck,
  Box,
  CheckCircle,
  Check,
  ArrowLeft,
  Calendar,
  Phone,
  Package,
  Home,
  Briefcase,
  Warehouse,
  ShieldCheck,
  Map,
} from "lucide-react";

const PackersAndMovers = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/book");
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 -mt-16">
      {/* Hero Section */}
      <section className="relative py-40 pt-60 bg-gradient-to-b from-green-900 to-green-900 bg-opacity-50 mix-blend-multiply">
        <div className="absolute inset-0 bg-opacity-100 bg-[url('https://imgs.search.brave.com/FtReJJX1_9049NRtp3muiPMwjJ4RBCfye-kDOKpM0cw/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMudGhlcGFja2Vy/c21vdmVycy5jb20v/aW1hZ2VzL3BhY2tl/cnNhbmRtb3ZlcnMu/anBn')] bg-cover bg-center mix-blend-overlay"></div>

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
              Professional Packers & Movers
            </h1>
            <p className="text-2xl md:text-2xl mb-8">
              Stress-free relocation services for homes and businesses with care
              and precision
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
            Why Choose Our Packing & Moving Services
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg">
            We offer safe, reliable, and comprehensive solutions tailored to
            your relocation needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
            {/* Card 1 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://img.freepik.com/premium-photo/box-packing-tape-with-man-moving-house-growth-investment-property-relocation-getting-ready-new-home-real-estate-with-homeowner-person-apartment-lease-mortgage-rental_590464-355534.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Expert Packing"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <motion.div
                  className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Box className="w-7 h-7 text-green-600" />
                </motion.div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Expert Packing
              </h3>
              <p className="text-gray-500 mb-4">
                Our professional packers use high-quality materials and
                techniques to ensure your belongings are protected during the
                move.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    size={20}
                    className="text-green-500 mr-2 flex-shrink-0"
                  />
                  <span>Custom packing solutions</span>
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    size={20}
                    className="text-green-500 mr-2 flex-shrink-0"
                  />
                  <span>Special care for fragile items</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://img.freepik.com/premium-photo/yellow-truck-with-cardboard-boxes-covered-by-shield-cargo-insurance-transportation-safety_72572-1317.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Safe Transportation"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <motion.div
                  className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Truck className="w-7 h-7 text-green-600" />
                </motion.div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Safe Transportation
              </h3>
              <p className="text-gray-500 mb-4">
                Our fleet of well-maintained vehicles and trained drivers ensure
                your possessions arrive safely at their destination.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    size={20}
                    className="text-green-500 mr-2 flex-shrink-0"
                  />
                  <span>Modern transportation fleet</span>
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    size={20}
                    className="text-green-500 mr-2 flex-shrink-0"
                  />
                  <span>Transit insurance available</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://img.freepik.com/free-photo/vehicles-laptop-supply-chain-representation_23-2149853161.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Comprehensive Services"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <motion.div
                  className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Map className="w-7 h-7 text-green-600" />
                </motion.div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Comprehensive Services
              </h3>
              <p className="text-gray-500 mb-4">
                From packing to unpacking and arrangement, we handle every
                aspect of your move to make relocation seamless.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    size={20}
                    className="text-green-500 mr-2 flex-shrink-0"
                  />
                  <span>End-to-end moving solutions</span>
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    size={20}
                    className="text-green-500 mr-2 flex-shrink-0"
                  />
                  <span>Customizable service packages</span>
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
            Our Moving Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Residential Moving */}
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
                  src="https://img.freepik.com/free-photo/top-view-messy-full-moving-boxes-room_329181-18268.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Residential Moving"
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
                Residential Moving
              </h3>
              <p className="text-gray-500 mb-4">
                Whether you're moving to a new apartment or a large family home,
                our residential moving services are designed to make your
                transition smooth and stress-free.
              </p>
              <ul className="space-y-2">
                {[
                  "Apartment and house moves",
                  "Local and long-distance relocations",
                  "Furniture disassembly and reassembly",
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

            {/* Commercial Moving */}
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
                  src="https://img.freepik.com/premium-photo/male-female-executives-unpacking-cardboard-boxes-office_13339-359038.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Commercial Moving"
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
                Commercial Moving
              </h3>
              <p className="text-gray-500 mb-4">
                Minimize downtime with our efficient commercial moving services.
                We understand the importance of getting your business back up
                and running quickly.
              </p>
              <ul className="space-y-2">
                {[
                  "Office relocations",
                  "Equipment and inventory moves",
                  "Weekend and after-hours moving",
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

            {/* Packing Services */}
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
                  src="https://img.freepik.com/free-photo/closeup-delivery-man-closing-carboard-box-with-tape-while-preparing-packages-shipment_637285-2244.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Packing Services"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Package size={24} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <CheckCircle size={22} className="text-green-600 mr-2" />
                Packing Services
              </h3>
              <p className="text-gray-500 mb-4">
                Let our expert packers handle the tedious task of packing your
                belongings. We use quality materials and proper techniques to
                ensure everything arrives intact.
              </p>
              <ul className="space-y-2">
                {[
                  "Full and partial packing options",
                  "Specialized packing for fragile items",
                  "Unpacking and arrangement services",
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

            {/* Storage Solutions */}
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
                  src="https://img.freepik.com/free-photo/photorealistic-scene-with-warehouse-logistics-operations_23-2151468921.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                  alt="Storage Solutions"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute top-4 right-4 text-white bg-green-600 p-2 rounded-full"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Warehouse size={24} />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <CheckCircle size={22} className="text-green-600 mr-2" />
                Storage Solutions
              </h3>
              <p className="text-gray-500 mb-4">
                Need temporary storage during your move? We offer secure storage
                facilities for short or long-term needs to keep your belongings
                safe.
              </p>
              <ul className="space-y-2">
                {[
                  "Climate-controlled storage units",
                  "24/7 security monitoring",
                  "Flexible storage durations",
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

      {/* How It Works */}
      <section className="py-16 bg-gray-30">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-gray-800 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Moving Process
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Step 1 */}
            <motion.div
              className="relative bg-white p-6 rounded-2xl shadow-md text-center border-t-4 border-green-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-40 h-40 rounded-xl overflow-hidden border-2 border-green-600">
                  <img
                    src="https://img.freepik.com/free-photo/two-guys-talking-about-work-work-garage-near-truck-transfer-documents-with-goods_1157-46506.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                    alt="Consultation"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                </div>
              </div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Consultation
              </h3>
              <p className="text-gray-600">
                We assess your moving needs and provide a detailed quote.
              </p>
            </motion.div>

            {/* Connector */}
            <div className="hidden md:block">
              <div className="h-full flex items-center justify-center">
                <div className="w-full h-1 bg-green-200"></div>
              </div>
            </div>

            {/* Step 2 */}
            <motion.div
              className="relative bg-white p-6 rounded-2xl shadow-md text-center border-t-4 border-green-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-40 h-40 rounded-xl overflow-hidden border-2 border-green-600">
                  <img
                    src="https://img.freepik.com/free-photo/supply-chain-representation-still-life_23-2150172472.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                    alt="Planning"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                </div>
              </div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Planning
              </h3>
              <p className="text-gray-600">
                We create a customized moving plan tailored to your
                requirements.
              </p>
            </motion.div>

            {/* Connector */}
            <div className="hidden md:block">
              <div className="h-full flex items-center justify-center">
                <div className="w-full h-1 bg-green-200"></div>
              </div>
            </div>

            {/* Step 3 */}
            <motion.div
              className="relative bg-white p-6 rounded-2xl shadow-md text-center border-t-4 border-green-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-40 h-40 rounded-xl overflow-hidden border-2 border-green-600">
                  <img
                    src="https://img.freepik.com/free-photo/side-view-man-looking-truck_23-2149426499.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                    alt="Execution"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                </div>
              </div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Execution
              </h3>
              <p className="text-gray-600">
                Our team handles packing, loading, transportation, and
                unloading.
              </p>
            </motion.div>

            {/* Step 4 - Centered */}
            <motion.div
              className="relative bg-white p-6 rounded-2xl shadow-md text-center border-t-4 border-green-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 group md:col-start-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-40 h-40 rounded-xl overflow-hidden border-2 border-green-600">
                  <img
                    src="https://img.freepik.com/premium-photo/two-contractor-employees-moving-personal-belongings_656932-3190.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                    alt="Unpacking"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                </div>
              </div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                4
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Unpacking
              </h3>
              <p className="text-gray-600">
                We help arrange your belongings in your new space as needed.
              </p>
            </motion.div>

            {/* Connector */}
            <div className="hidden md:block">
              <div className="h-full flex items-center justify-center">
                <div className="w-full h-1 bg-green-200"></div>
              </div>
            </div>

            {/* Step 5 */}
            <motion.div
              className="relative bg-white p-6 rounded-2xl shadow-md text-center border-t-4 border-green-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-40 h-40 rounded-xl overflow-hidden border-2 border-green-600">
                  <img
                    src="https://img.freepik.com/premium-photo/machinic-man-customer-car-writing-clipboard-checklist-repair-machine_1048944-22196797.jpg?ga=GA1.1.1872067447.1750850496&semt=ais_hybrid&w=740"
                    alt="Final Check"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                </div>
              </div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                5
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Final Check
              </h3>
              <p className="text-gray-600">
                We ensure everything is completed to your satisfaction.
              </p>
            </motion.div>
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
            {/* Basic Move */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:border-2 border-green-700 hover:scale-105 hover:shadow-xl">
              <div className="p-6 bg-green-50">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Basic Move
                </h3>
                <div className="text-gray-600 mb-4">
                  For small moves with minimal items
                </div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹2,999
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    onwards
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Transportation for 1BHK</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Basic packing materials</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Loading & unloading</span>
                  </li>
                </ul>
                <button
                  onClick={handleBookNow}
                  className="w-full mt-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Get Quote
                </button>
              </div>
            </div>

            {/* Standard Move - Most Popular */}
            <div className="bg-white rounded-xl shadow-lg transform md:scale-105 overflow-hidden border-2 border-green-300 transition duration-300 hover:border-green-700 hover:scale-110 hover:shadow-xl relative">
              <div className="absolute top-0 w-full text-center">
                <div className="bg-green-500 text-white px-4 py-1 text-sm font-medium inline-block rounded-b-lg">
                  Most Popular
                </div>
              </div>
              <div className="p-6 bg-green-50 pt-10">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Standard Move
                </h3>
                <div className="text-gray-600 mb-4">
                  Complete moving solution for 2-3BHK
                </div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹5,999
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    onwards
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Everything in Basic plan</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Full packing & unpacking</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Furniture disassembly & reassembly</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Basic insurance coverage</span>
                  </li>
                </ul>
                <button
                  onClick={handleBookNow}
                  className="w-full mt-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Get Quote
                </button>
              </div>
            </div>

            {/* Premium Move */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:border-2 border-green-700 hover:scale-105 hover:shadow-xl">
              <div className="p-6 bg-green-50">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Premium Move
                </h3>
                <div className="text-gray-600 mb-4">
                  Luxury moving experience
                </div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹9,999
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    onwards
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Everything in Standard plan</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Premium packing materials</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Specialized item handling</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Full insurance coverage</span>
                  </li>
                </ul>
                <button
                  onClick={handleBookNow}
                  className="w-full mt-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-10 text-gray-500 max-w-3xl mx-auto">
            <p>
              All prices are approximate and may vary based on distance, volume,
              and specific requirements.
            </p>
            <p className="mt-2">
              Contact us for a personalized quote tailored to your exact moving
              needs.
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
                q: "How far in advance should I book your moving services?",
                a: "We recommend booking at least 2 weeks in advance for local moves and 3-4 weeks for long-distance moves. However, we also understand that moves can happen unexpectedly, so we do our best to accommodate last-minute bookings whenever possible.",
              },
              {
                q: "Are my belongings insured during the move?",
                a: "We offer basic insurance coverage on all moves, which covers items against damage during handling and transport. For additional peace of mind, we also offer comprehensive insurance options that provide extended coverage for high-value items.",
              },
              {
                q: "What items won't you move?",
                a: "For safety and legal reasons, we cannot transport hazardous materials (flammables, explosives, chemicals), perishable items, plants, certain valuables (cash, jewelry), and personal/sentimental items that should remain with you. We'll provide a complete list during consultation.",
              },
              {
                q: "How do you handle delicate or valuable items?",
                a: "We use specialized packing materials and techniques for delicate items like artwork, electronics, and antiques. Our movers are trained in proper handling procedures for valuable possessions. For extremely high-value items, we recommend discussing special arrangements during your consultation.",
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
            <div className="flex flex-col md:flex-row md:items-center">
              {/* Text Section */}
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready for a stress-free move?
                </h2>
                <p className="text-green-100 text-lg mb-0">
                  Contact us today to schedule your moving service and
                  experience a seamless relocation with our expert packers and
                  movers.
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

export default PackersAndMovers;
