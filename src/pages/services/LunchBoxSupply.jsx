import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Salad,
  CheckCircle,
  Check,
  ArrowLeft,
  Calendar,
  Phone,
  Clock,
  Flame,
  Leaf,
} from "lucide-react";

const LunchBoxSupply = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/book");
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 -mt-16">
      {/* Hero Section */}
      <section className="relative py-40 pt-60 bg-gradient-to-b from-green-900 to-green-900 mix-blend-multiply">
        <div className="absolute inset-0 bg-opacity-100 bg-[url('https://images.unsplash.com/photo-1546069901-5ec6a79120b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>

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
              Lunch Box Supply Service
            </h1>
            <p className="text-2xl md:text-2xl mb-8">
              Fresh, nutritious meals delivered daily to your workplace or
              school
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
                <Calendar className="w-6 h-6 mr-2 inline" /> Subscribe Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Why Choose Our Lunch Box Service
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg">
            We offer delicious, healthy, and timely meal delivery options
            tailored to your dietary and scheduling needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
            {/* Card 1 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://media.istockphoto.com/id/1409236261/photo/healthy-food-healthy-eating-background-fruit-vegetable-berry-vegetarian-eating-superfood.jpg?s=612x612&w=0&k=20&c=kYZKgwsQbH_Hscl3mPRKkus0h1OPuL0TcXxZcO2Zdj0="
                  alt="Fresh & Nutritious"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <Leaf className="w-7 h-7 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Fresh & Nutritious
              </h3>
              <p className="text-gray-500 mb-4">
                Our meals are prepared with fresh, high-quality ingredients
                sourced from local suppliers to ensure maximum nutrition and
                taste.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Locally sourced ingredients
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  No artificial preservatives
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://media.istockphoto.com/id/836473262/photo/buffet-food-on-the-table.jpg?s=612x612&w=0&k=20&c=m-eLbtzh4mEoY3J5XV_o6QMXMiW-X2FhD790c3UEsU8="
                  alt="Diverse Menu Options"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <Salad className="w-7 h-7 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Diverse Menu Options
              </h3>
              <p className="text-gray-500 mb-4">
                We offer a wide variety of menu options including vegetarian,
                non-vegetarian, and special dietary requirement meals.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Rotating weekly menus
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Customizable meal plans
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://media.istockphoto.com/id/1226379630/photo/courier-delivering-pizza-holding-boxes-and-clock-on-yellow-background.jpg?s=612x612&w=0&k=20&c=D2JCUKQtq8NGIPK8scTZ6UxT81yvCYqO0XI9J2egwzE="
                  alt="Punctual Delivery"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <Clock className="w-7 h-7 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Punctual Delivery
              </h3>
              <p className="text-gray-500 mb-4">
                We guarantee on-time delivery to ensure you receive your meal
                fresh and ready to eat when you need it.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Time-slot selection
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Real-time delivery tracking
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
            Our Lunch Box Services
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
                  src="https://media.istockphoto.com/id/1938638591/photo/a-woman-is-making-a-weekly-nutrition-plan-and-using-mobile-app.jpg?s=612x612&w=0&k=20&c=pXtvmbTinouBQ2C44VjGMkdNybg9yLDHgDOmzlVG--s="
                  alt="Individual Meal Plans"
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
                <CheckCircle size={22} className="text-green-600 mr-2" />
                Individual Meal Plans
              </h3>
              <p className="text-gray-500 mb-4">
                Personalized lunch boxes delivered to your workplace or home,
                designed to meet your nutritional needs and taste preferences.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-gray-800">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Daily, weekly or monthly subscription
                </li>
                <li className="flex items-start text-gray-800">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Calorie-counted options available
                </li>
                <li className="flex items-start text-gray-800">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Special dietary accommodations
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
                  src="https://media.istockphoto.com/id/1189100271/photo/office-employees-with-healthy-takeaway-food-indoors.jpg?s=612x612&w=0&k=20&c=1ZRpofL5AU7CFMni0qL6QPwwoKnJWLMkchOkRZE-J4k="
                  alt="Corporate Solutions"
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
                <CheckCircle size={22} className="text-green-600 mr-2" />
                Corporate Solutions
              </h3>
              <p className="text-gray-500 mb-4">
                Bulk lunch box delivery for offices and corporate events,
                offering convenient meal solutions for your entire team.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-gray-800">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Simplified billing for organizations
                </li>
                <li className="flex items-start text-gray-800">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Custom branding opportunities
                </li>
                <li className="flex items-start text-gray-800">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Employee satisfaction tracking
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
                  src="https://media.istockphoto.com/id/499888635/photo/school-caferteria-line.jpg?s=612x612&w=0&k=20&c=ZbAflllS0gE4CW8c3-Uv80uheAh7IqaAbGV3q5zFhmg="
                  alt="School Lunch Programs"
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
                <CheckCircle size={22} className="text-green-600 mr-2" />
                School Lunch Programs
              </h3>
              <p className="text-gray-500 mb-4">
                Nutritious and kid-friendly meals delivered to schools, ensuring
                students have access to balanced nutrition that supports
                learning.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-gray-800">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Age-appropriate portions and nutrition
                </li>
                <li className="flex items-start text-gray-800">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Allergy-aware meal preparation
                </li>
                <li className="flex items-start text-gray-800">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Parent portal for meal management
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
                  src="https://media.istockphoto.com/id/1205097512/photo/table-with-plated-salads-and-napkins-and-wine-glasses.jpg?s=612x612&w=0&k=20&c=k_600dZimAUviwgRjmp-dFzB_VlOSTFo0Ni4tEjPxeE="
                  alt="Special Event Catering"
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
                <CheckCircle size={22} className="text-green-600 mr-2" />
                Special Event Catering
              </h3>
              <p className="text-gray-500 mb-4">
                Boxed meal solutions for events, meetings, and gatherings,
                delivered on time and tailored to your event's specific
                requirements.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-gray-800">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  One-time bulk orders
                </li>
                <li className="flex items-start text-gray-800">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Presentation-ready packaging
                </li>
                <li className="flex items-start text-gray-800">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Accommodations for various dietary needs
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-16 bg-gray-30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Sample Menu Items
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative group transform transition duration-300 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Vegetarian Meal"
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium mb-1 bg-opacity-80">
                    Vegetarian
                  </span>
                  <h3 className="text-xl font-semibold mb-1">
                    Garden Fresh Meal
                  </h3>
                  <p className="text-sm opacity-90">
                    Mixed vegetable curry, brown rice, garden salad and fruit
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative group transform transition duration-300 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1606851094291-6efae152bb87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Non-Vegetarian Meal"
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium mb-1 bg-opacity-80">
                    Non-Vegetarian
                  </span>
                  <h3 className="text-xl font-semibold mb-1">Protein Power</h3>
                  <p className="text-sm opacity-90">
                    Grilled chicken, quinoa, steamed vegetables and yogurt
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative group transform transition duration-300 hover:scale-105">
              <img
                src="https://media.istockphoto.com/id/1177752105/photo/keto-food-for-ketogenic-diet-healthy-nutritional-food-eating-lifestyle-for-good-heart-health.jpg?s=612x612&w=0&k=20&c=QdB3tEeSDi4j0IBK7biKU4VGIJSBQm_TIItUvID7Qiw="
                alt="Low-Carb Meal"
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium mb-1 bg-opacity-80">
                    Low-Carb
                  </span>
                  <h3 className="text-xl font-semibold mb-1">Carb-Conscious</h3>
                  <p className="text-sm opacity-90">
                    Cauliflower rice bowl with paneer, avocado and nuts
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative group transform transition duration-300 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1546069901-5ec6a79120b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="International Cuisine"
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium mb-1 bg-opacity-80">
                    International
                  </span>
                  <h3 className="text-xl font-semibold mb-1">World Cuisine</h3>
                  <p className="text-sm opacity-90">
                    Mediterranean mezze plate with hummus, falafel and pita
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
            How Our Lunch Box Service Works
          </motion.h2>

          <motion.p
            className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our simple step-by-step process ensures you enjoy fresh, delicious
            meals without the hassle.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {[
              {
                title: "Subscribe",
                img: "https://media.istockphoto.com/id/2156928439/photo/happy-couple-at-home-booking-a-trip-online.jpg?s=612x612&w=0&k=20&c=-XtqTVmHPi5VbL7wzVlRok-RiHyEm_icMO275V6Nqg4=",
                desc: "Choose your meal plan and subscription frequency through our website or app.",
              },
              {
                title: "Customize",
                img: "https://media.istockphoto.com/id/1314945563/photo/clinical-nutritionist-or-dietitian-builds-a-personalized-meal-plan-for-a-patient-which.jpg?s=612x612&w=0&k=20&c=uJKasqEHOoI7zopH4BRa6DKHOES0ffaty6lSjTBma9g=",
                desc: "Select your meal preferences, dietary requirements, and delivery schedule.",
              },
              {
                title: "We Prepare",
                img: "https://media.istockphoto.com/id/480391926/photo/chopping-food-ingredients.jpg?s=612x612&w=0&k=20&c=gNaK4pSwkZIW1h4BKQEuGhXRJgbjbdtgmlFF_Bu4uYI=",
                desc: "Our chefs prepare your meals fresh each day using quality ingredients.",
              },
              {
                title: "Enjoy",
                img: "https://media.istockphoto.com/id/1136168094/photo/chicken-teriyaki-meal-prep-lunch-box-containers-with-broccoli-rice-and-carrots.jpg?s=612x612&w=0&k=20&c=WNAaGFVX-Kt3l_wrw02Gz6UEg1KOJPByQUYwecIOodc=",
                desc: "Receive your lunch box at your specified location and time, ready to eat!",
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
            Our Subscription Plans
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:border-2 border-green-700 hover:scale-105 hover:shadow-xl">
              <div className="p-6 bg-green-50">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Basic Plan
                </h3>
                <div className="text-gray-600 mb-4">5 meals per week</div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹450
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    /week
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">(₹90 per meal)</div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Weekday lunch delivery</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Standard vegetarian & non-veg options</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Weekly menu rotation</span>
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

            {/* Premium Plan (Most Popular) */}
            <div className="bg-white rounded-xl shadow-lg transform md:scale-105 overflow-hidden border-2 border-green-300 transition duration-300 hover:border-green-700 hover:scale-110 hover:shadow-xl relative">
              <div className="absolute top-0 w-full text-center">
                <div className="bg-green-500 text-white px-4 py-1 text-sm font-medium inline-block rounded-b-lg">
                  Most Popular
                </div>
              </div>
              <div className="p-6 bg-green-50 pt-10">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Premium Plan
                </h3>
                <div className="text-gray-600 mb-4">5 meals per week</div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹550
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    /week
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  (₹110 per meal)
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>All Basic Plan benefits</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Premium menu selections</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Customizable meal options</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Healthy snack included</span>
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

            {/* Family Plan */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:border-2 border-green-700 hover:scale-105 hover:shadow-xl">
              <div className="p-6 bg-green-50">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Family Plan
                </h3>
                <div className="text-gray-600 mb-4">15 meals per week</div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹1,200
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    /week
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">(₹80 per meal)</div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>3 meals per day for family of 5</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Kid-friendly options</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Priority delivery slots</span>
                  </li>
                  <li className="flex items-center text-gray-800">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Weekend delivery available</span>
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
                q: "How are the meals packaged?",
                a: "Our meals are packaged in eco-friendly, microwave-safe containers that keep your food fresh until lunchtime. Each container is properly sealed and labeled with contents and nutritional information.",
              },
              {
                q: "Can I customize my meal plan for dietary restrictions?",
                a: "Yes, we offer customization options for various dietary needs including vegetarian, vegan, gluten-free, low-carb, and allergy-sensitive meals. You can specify your requirements during subscription.",
              },
              {
                q: "What time will my lunch be delivered?",
                a: "We offer delivery time slots between 10:00 AM and 12:30 PM to ensure your lunch arrives before your meal time. You can select your preferred time slot during checkout.",
              },
              {
                q: "Can I pause or cancel my subscription?",
                a: "Absolutely! You can pause, modify or cancel your subscription anytime through your account dashboard. We require 24-hour notice for changes to the next day's delivery.",
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
      <section className="py-12 bg-gray-30">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-green-800 to-black rounded-2xl p-8 md:p-12 shadow-lg max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Text Section */}
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready for healthy, hassle-free lunches?
                </h2>
                <p className="text-green-100 text-lg mb-0">
                  Join thousands of satisfied customers who enjoy our fresh
                  lunch boxes delivered daily. Start your subscription today!
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
                  <Calendar className="w-6 h-6 mr-2 inline" /> Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LunchBoxSupply;
