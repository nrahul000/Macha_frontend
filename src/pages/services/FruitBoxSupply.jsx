import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Apple,
  Heart,
  CheckCircle,
  Check,
  ArrowLeft,
  Calendar,
  Phone,
  Clock,
  Leaf,
  Truck,
} from "lucide-react";

const FruitBoxSupply = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/book");
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 -mt-16">
      {/* Hero Section */}
      <section className="relative py-40 pt-60 bg-gradient-to-b from-green-900 to-green-900 mix-blend-multiply">
        <div className="absolute inset-0 bg-opacity-100 bg-[url('https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>

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
              Fruit Box Supply Service
            </h1>
            <p className="text-2xl md:text-2xl mb-8">
              Fresh, seasonal fruits delivered to your doorstep for healthier
              living
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
            Why Choose Our Fruit Box Service
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg">
            Enjoy premium quality fruits, health benefits, and convenient
            doorstep delivery every week.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
            {/* Card 1 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://media.istockphoto.com/id/1351676866/photo/haccp-food-safety-and-quality-control-in-food-industry-concept-about-fresh-fruit.jpg?s=612x612&w=0&k=20&c=EcDrPOv_h_3GlBQdEmpxcmOVigQa8rO4FIx3HEyZWgA="
                  alt="Premium Quality"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <Apple className="w-7 h-7 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-500 mb-4">
                We source the freshest, highest quality fruits directly from
                local farms and trusted suppliers to ensure maximum freshness
                and nutrition.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Hand-picked selection
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Farm-to-box freshness
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://media.istockphoto.com/id/516554298/photo/heart-symbol-fruits-diet-concept.jpg?s=612x612&w=0&k=20&c=JBgtSasI_Zty3qtQSHKBbkL02k2KhU7pM6x2yxhfPcE="
                  alt="Health Benefits"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-7 h-7 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Health Benefits
              </h3>
              <p className="text-gray-500 mb-4">
                Our curated fruit boxes provide essential vitamins, minerals,
                and antioxidants to support your health and well-being.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Nutrient-rich variety
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Seasonal selections
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="max-w-sm bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-700">
              <div className="mb-4 rounded-xl overflow-hidden h-40 relative bg-gray-100">
                <img
                  src="https://media.istockphoto.com/id/914834656/photo/home-delivery.jpg?s=612x612&w=0&k=20&c=IC_jGoq1Yff1sRfzsd36_Dv0UGznmwemsU-C7Ofusoc="
                  alt="Convenient Delivery"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 rounded-lg border-2 border-green-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <Truck className="w-7 h-7 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                Convenient Delivery
              </h3>
              <p className="text-gray-500 mb-4">
                Regular deliveries on your schedule - no more trips to the store
                or carrying heavy grocery bags. Fresh fruit arrives right at
                your door.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Flexible delivery schedule
                </li>
                <li className="flex items-center text-gray-800">
                  <CheckCircle
                    className="text-green-500 mr-2 flex-shrink-0"
                    size={20}
                  />
                  Eco-friendly packaging
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Box Options Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Fruit Box Options
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
                  src="https://media.istockphoto.com/id/1156301439/photo/fresh-ripe-fruits-in-a-wooden-box.jpg?s=612x612&w=0&k=20&c=UmlaUffl6rSR5oMMlBOwNXvn7ZLCphwRjcoalWJr0-A="
                  alt="Seasonal Selection Box"
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
                Seasonal Selection Box
              </h3>
              <p className="text-gray-500 mb-4">
                Our most popular option featuring the best seasonal fruits
                available. Each week brings a varied assortment of fresh,
                in-season fruits.
              </p>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  8-10 pieces of seasonal fruits
                </li>
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Weekly rotation of varieties
                </li>
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Perfect for individuals or couples
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
                  src="https://media.istockphoto.com/id/995460192/photo/healthy-breakfast-with-fruit-and-cereal-served-on-kitchen-table.jpg?s=612x612&w=0&k=20&c=B1wBlSrdMkXWMV3pp3I0Dp09TZSMqIOfyzSOsZxWD5I="
                  alt="Family Fruit Box"
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
                Family Fruit Box
              </h3>
              <p className="text-gray-500 mb-4">
                A larger selection of fruits designed to meet the needs of
                families. Contains a mix of everyday favorites and special
                treats.
              </p>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  15-18 pieces of mixed fruits
                </li>
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Kid-friendly options included
                </li>
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Ideal for families of 3-5
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
                  src="https://media.istockphoto.com/id/1003561604/photo/wooden-crates-with-assorted-tropical-fruits-in-rustic-kitchen-natural-lighting.jpg?s=612x612&w=0&k=20&c=khNvULtqxjCR9iV5-YlRL721ObDXWiEYOb3ua2ZvHuo="
                  alt="Exotic Fruit Box"
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
                Exotic Fruit Box
              </h3>
              <p className="text-gray-500 mb-4">
                Experience unique and interesting fruits from around the world.
                A premium selection for fruit enthusiasts and adventurous
                eaters.
              </p>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  6-8 exotic fruit varieties
                </li>
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Includes tasting notes and origin information
                </li>
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Perfect for special occasions
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
                  src="https://media.istockphoto.com/id/1502875664/photo/close-up-of-basket-with-colorful-fruits-on-table.jpg?s=612x612&w=0&k=20&c=ks54FXjMFZ2U6NIhhzhhXBk7Z2eeCCOAkMJZYT4r-eQ="
                  alt="Office Fruit Box"
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
                Office Fruit Box
              </h3>
              <p className="text-gray-500 mb-4">
                Keep your team energized with a regular supply of fresh fruit.
                Designed for workplace kitchens and break rooms.
              </p>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  25-30 pieces of easy-to-eat fruits
                </li>
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Mix of ready-to-eat and ripening fruits
                </li>
                <li className="flex items-start">
                  <Check
                    size={18}
                    className="text-green-600 mr-2 mt-1 flex-shrink-0"
                  />
                  Suitable for teams of 5-10 people
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Fruits Section */}
      <section className="py-16 bg-gray-30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Seasonal Fruits in Our Boxes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {/* Apple */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative group transform transition duration-300 hover:scale-105">
              <img
                src="https://media.istockphoto.com/id/614871876/photo/apple-isolated-on-wood-background.jpg?s=612x612&w=0&k=20&c=_8ShFA2p-xbTBMz0g7JUSsfd329GBkyj47dzW3F1mqc="
                alt="Apples"
                className="w-full h-52 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">Apples</h3>
                  <p className="text-sm opacity-90">Year-round</p>
                </div>
              </div>
            </div>

            {/* Banana */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative group transform transition duration-300 hover:scale-105">
              <img
                src="https://media.istockphoto.com/id/1494763483/photo/banana-concept.jpg?s=612x612&w=0&k=20&c=ZeVP-L6ClmyT-i0N-QAbDK7q37uHhrzg7KOzMkaOtg4="
                alt="Bananas"
                className="w-full h-52 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">Bananas</h3>
                  <p className="text-sm opacity-90">Year-round</p>
                </div>
              </div>
            </div>

            {/* Orange */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative group transform transition duration-300 hover:scale-105">
              <img
                src="https://media.istockphoto.com/id/1091565360/photo/bowl-of-fresh-orange-fruit-salad.jpg?s=612x612&w=0&k=20&c=iLrNPd6rU3W9XQC9Z6BYqe182LvIqvHY_fAtigAtcL4="
                alt="Oranges"
                className="w-full h-52 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">Oranges</h3>
                  <p className="text-sm opacity-90">Winter/Spring</p>
                </div>
              </div>
            </div>

            {/* Kiwi */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative group transform transition duration-300 hover:scale-105">
              <img
                src="https://media.istockphoto.com/id/537403487/photo/kiwi.jpg?s=612x612&w=0&k=20&c=NC7ogHNUxPDFL3SkcTMOe1vrr6p_5p34n7saoI-jhac="
                alt="Kiwi"
                className="w-full h-52 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">Kiwi</h3>
                  <p className="text-sm opacity-90">Year-round</p>
                </div>
              </div>
            </div>

            {/* Grapes */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative group transform transition duration-300 hover:scale-105">
              <img
                src="https://media.istockphoto.com/id/842928214/photo/fresh-grapes-in-the-basket.jpg?s=612x612&w=0&k=20&c=SPUyIifWeeXCda_P8sqE0WFvZ-pDyaQ4aZLjNHpYEc4="
                alt="Grapes"
                className="w-full h-52 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">Grapes</h3>
                  <p className="text-sm opacity-90">Summer/Fall</p>
                </div>
              </div>
            </div>

            {/* Strawberries */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative group transform transition duration-300 hover:scale-105">
              <img
                src="https://media.istockphoto.com/id/1334119715/photo/fresh-ripe-strawberry.jpg?s=612x612&w=0&k=20&c=DaNuxYJhQqPR066TP8Ihc7QPuC6ApnflLwVeGKpeKN4="
                alt="Strawberries"
                className="w-full h-52 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">Strawberries</h3>
                  <p className="text-sm opacity-90">Spring/Summer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Fruits vary based on seasonal availability. We always prioritize
              quality and freshness in our selections.
            </p>
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
            How Our Fruit Box Service Works
          </motion.h2>

          <motion.p
            className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our simple step-by-step process ensures a fresh and convenient fruit
            delivery experience.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {[
              {
                title: "Choose Your Box",
                desc: "Select the box type and size that best fits your needs and preferences.",
                img: "https://media.istockphoto.com/id/1718516554/photo/full-frame-of-assortment-of-healthy-and-fresh-fruits.jpg?s=612x612&w=0&k=20&c=vMziY5XGWKDh_JhrsDGlwtcjqAARNazVj_7hL-14ufg=",
              },
              {
                title: "Select Frequency",
                desc: "Choose weekly, bi-weekly, or monthly deliveries based on your consumption.",
                img: "https://media.istockphoto.com/id/1266542038/photo/two-red-apples-with-a-measuring-tape-on-a-calendar.jpg?s=612x612&w=0&k=20&c=VoTRvZcMGUPnWKTefKfY3syN_ZDOALoS-ap1XjHkUZA=",
              },
              {
                title: "We Source & Pack",
                desc: "Our team selects the freshest fruits and carefully packs your box.",
                img: "https://media.istockphoto.com/id/1056015258/photo/smiling-old-woman-picking-apples.jpg?s=612x612&w=0&k=20&c=9WO8i1S7_S00FHQdc0subGR9nXJb1PiA0gUUplmbFCA=",
              },
              {
                title: "Enjoy Fresh Fruits",
                desc: "Receive your fruit box at your door and enjoy healthy snacking!",
                img: "https://media.istockphoto.com/id/1273378551/photo/set-of-summer-fruits-and-berries-in-wooden-serving.jpg?s=612x612&w=0&k=20&c=XtJFQDgpV_AsG3aFzo3FVN2pmbey7h0jWHMzlHWJ5Kk=",
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
            Subscription Plans
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Standard Box */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:border-2 border-green-700 hover:scale-105 hover:shadow-xl">
              <div className="p-6 bg-green-50">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Standard Box
                </h3>
                <div className="text-gray-600 mb-4">Weekly delivery</div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹399
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    /box
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>8-10 pieces of seasonal fruits</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Free delivery</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Weekly fruit guide</span>
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

            {/* Family Box - Most Popular */}
            <div className="bg-white rounded-xl shadow-lg transform md:scale-105 overflow-hidden border-2 border-green-300 transition duration-300 hover:border-green-700 hover:scale-110 hover:shadow-xl relative">
              <div className="absolute top-0 w-full text-center">
                <div className="bg-green-500 text-white px-4 py-1 text-sm font-medium inline-block rounded-b-lg">
                  Most Popular
                </div>
              </div>
              <div className="p-6 bg-green-50 pt-10">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Family Box
                </h3>
                <div className="text-gray-600 mb-4">Weekly delivery</div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹599
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    /box
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>15-18 pieces of mixed fruits</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Free priority delivery</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Customization options</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Weekly fruit guide & recipes</span>
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

            {/* Office Box */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:border-2 border-green-700 hover:scale-105 hover:shadow-xl">
              <div className="p-6 bg-green-50">
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  Office Box
                </h3>
                <div className="text-gray-600 mb-4">Weekly delivery</div>
                <div className="text-3xl font-bold text-gray-800">
                  ₹999
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    /box
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>25-30 pieces for team sharing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Free priority delivery</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Corporate billing available</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <span>Display stand included</span>
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

          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm">
              *Minimum 4-week subscription for all plans. You can pause or
              cancel anytime after the initial period.
            </p>
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
                q: "How fresh are the fruits?",
                a: "We source our fruits directly from farms and suppliers, with most fruits arriving at our facility within 24-48 hours of harvest. We carefully select each fruit to ensure optimal ripeness and freshness when delivered to you.",
              },
              {
                q: "Can I customize what fruits I receive?",
                a: "Yes, subscribers can set fruit preferences and allergies in their account. While we can't guarantee specific fruits each week due to seasonal availability, we'll always respect your preferences and avoid fruits you don't want.",
              },
              {
                q: "What days do you deliver?",
                a: "We deliver Monday through Saturday, and you can select your preferred delivery day during checkout. Delivery times are typically between 8am and 6pm, with specific time slots available for premium subscriptions.",
              },
              {
                q: "What if I'm not home for delivery?",
                a: "Our fruit boxes are packaged to stay fresh for several hours after delivery. You can specify a safe place for the driver to leave your box if you're not home. We also send delivery notifications so you know when your fruit has arrived.",
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
                  Ready for fresh, seasonal fruits?
                </h2>
                <p className="text-green-100 text-lg mb-0">
                  Join our fruit box subscription service today and enjoy the
                  convenience of fresh fruits delivered directly to your door.
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

export default FruitBoxSupply;
