import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Leaf, Truck, ShieldCheck, Heart, CheckCircle, Phone,
  Clock, RotateCw, ArrowLeft, Search, Calendar,
  Star, Filter, MapPin, ArrowRight, Smartphone, X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const OrganicProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('summer');

  // Parallax effect references
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Simulate seasonal products data
  const seasonalProducts = {
    spring: [
      { name: 'Spinach', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
      { name: 'Green Peas', image: 'https://images.unsplash.com/photo-1587486936739-78df7470c7e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
      { name: 'Strawberries', image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    ],
    summer: [
      { name: 'Tomatoes', image: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
      { name: 'Cucumbers', image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
      { name: 'Mangoes', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    ],
    autumn: [
      { name: 'Pumpkins', image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
      { name: 'Sweet Potatoes', image: 'https://images.unsplash.com/photo-1596097635166-ced8c0e9a1b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
      { name: 'Figs', image: 'https://images.unsplash.com/photo-1600692998703-8a61eb962661?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    ],
    winter: [
      { name: 'Carrots', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
      { name: 'Cauliflower', image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
      { name: 'Oranges', image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    ]
  };

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Monthly Subscriber",
      quote: "The quality of organic vegetables is exceptional. Everything tastes just like from my grandmother's garden!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Family Box Subscriber",
      quote: "My family loves the variety in our weekly box. The kids are actually excited about vegetables now!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Ananya Patel",
      role: "Premium Box Customer",
      quote: "The premium subscription is worth every rupee. The honey and cold-pressed oils are divine.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/45.jpg"
    }
  ];

  // Product categories
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'grains', name: 'Grains & Pulses' },
    { id: 'dairy', name: 'Dairy & Alternatives' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 overflow-hidden -mt-16">
      {/* Back to Services button integrated with navbar */}
      <div className="fixed top-0 left-0 w-full h-16 bg-transparent z-50 flex items-center px-4">

      </div>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-[100vh] flex items-center overflow-hidden pt-16">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-opacity-75 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/60 to-green-700/70 mix-blend-multiply" />

        {/* Back to Services button */}
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold mb-4 tracking-tight"
            >
              Farm-Fresh Organic Products
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl md:text-2xl mb-8 text-green-50"
            >
              Healthy, sustainable, and locally sourced organic produce delivered to your doorstep
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="tel:+918008330905"
                className="px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-green-50 transition-colors shadow-lg transform hover:scale-105 duration-200 flex items-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call to Order
              </a>
              <a
                href="#shop-now"
                className="px-8 py-4 bg-green-500 text-white font-semibold rounded-full hover:bg-green-400 transition-colors shadow-lg transform hover:scale-105 duration-200"
              >
                Shop Now
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating badges */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute left-8 bottom-12 bg-white/90 backdrop-blur-sm text-green-700 rounded-full px-4 py-2 flex items-center shadow-lg"
        >
          <Leaf className="w-5 h-5 mr-2" />
          <span className="font-medium">100% Organic</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute right-8 bottom-12 bg-white/90 backdrop-blur-sm text-green-700 rounded-full px-4 py-2 flex items-center shadow-lg"
        >
          <Truck className="w-5 h-5 mr-2" />
          <span className="font-medium">Same-Day Delivery</span>
        </motion.div>
      </section>

      {/* Animated Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-green-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-green-100 rounded-full opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Organic Products</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Leaf size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">100% Organic</h3>
              <p className="text-gray-600 text-center">
                All our products are certified organic, grown without synthetic pesticides, GMOs, or harmful chemicals.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Heart size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Health Benefits</h3>
              <p className="text-gray-600 text-center">
                Organic products are more nutritious and free from harmful residues, supporting better health for you and your family.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <ShieldCheck size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Locally Sourced</h3>
              <p className="text-gray-600 text-center">
                We partner with local farmers around Choutuppal, ensuring freshness while supporting the local economy.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product Search & Filter Section */}
      <section id="shop-now" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse Our Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our wide range of organic products, carefully sourced from trusted local farmers
            </p>
          </motion.div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
            <div className="relative w-full md:w-auto flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="hidden md:flex items-center space-x-2 overflow-x-auto py-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${selectedCategory === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <button
              className="md:hidden flex items-center px-4 py-2 bg-white rounded-full border border-gray-200"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter size={20} className="mr-2" />
              Filter
            </button>
          </div>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
                onClick={() => setIsFilterOpen(false)}
              >
                <motion.div
                  initial={{ x: 300 }}
                  animate={{ x: 0 }}
                  exit={{ x: 300 }}
                  transition={{ type: "spring", damping: 30 }}
                  className="bg-white w-4/5 max-w-sm h-full p-6"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Filter Products</h3>
                    <button onClick={() => setIsFilterOpen(false)}>
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <p className="font-medium text-gray-700 mb-2">Categories</p>
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setIsFilterOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedCategory === category.id
                          ? 'bg-green-100 text-green-700'
                          : 'hover:bg-gray-50'
                          }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {/* Example product cards */}
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={`https://imgs.search.brave.com/8m4rm0T56SlIakXLYR46jipsR4Yhq9DBp2XmkQbxMxw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8w/OC8xMS8wOC8wNC92/ZWdldGFibGVzLTE1/ODQ5OTlfNjQwLmpw/Zw`}
                    alt="Product"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    ORGANIC
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">Organic Product {index + 1}</h3>
                    <span className="font-bold text-green-600">₹{Math.floor(Math.random() * 500) + 100}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Fresh and locally sourced organic produce</p>
                  <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-2 rounded-lg font-medium transition-colors">
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seasonal Calendar Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-50 rounded-full opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-50 rounded-full opacity-70 translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Seasonal Harvest Calendar</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what's in season right now and plan your meals with the freshest produce
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 relative z-10">
            {/* Season selector */}
            <div className="flex flex-wrap justify-center mb-8 gap-2">
              {['spring', 'summer', 'autumn', 'winter'].map(season => (
                <button
                  key={season}
                  onClick={() => setSelectedSeason(season)}
                  className={`px-6 py-3 rounded-full capitalize transition-colors ${selectedSeason === season
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {season}
                  </span>
                </button>
              ))}
            </div>

            {/* Seasonal products */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="wait">
                {seasonalProducts[selectedSeason].map((product, index) => (
                  <motion.div
                    key={`${selectedSeason}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl overflow-hidden flex items-center"
                  >
                    <div className="w-1/3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-4">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">Best in {selectedSeason}</p>
                      <div className="mt-2 flex items-center">
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                        <span className="ml-2 text-xs text-green-700 whitespace-nowrap">In Season</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <p className="text-center text-gray-500 mt-8">
              Our products vary by season to ensure you get the freshest, most nutritious produce year-round
            </p>
          </div>
        </div>
      </section>

      {/* Farm to Table Journey */}
      <section className="py-16 bg-green-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Farm to Table Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow the path of our organic produce from local farms to your doorstep
            </p>
          </motion.div>

          <div className="relative">
            {/* Journey path */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-2 bg-green-200 transform -translate-y-1/2 z-0 rounded-full"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md p-6 relative"
              >
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center md:text-left">Organic Farming</h3>
                <p className="text-gray-600">
                  Our partner farmers use sustainable organic practices to grow nutritious produce without harmful chemicals.
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md p-6 relative"
              >
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center md:text-left">Harvesting</h3>
                <p className="text-gray-600">
                  Produce is harvested at peak ripeness on the same day as delivery to ensure maximum freshness and nutrition.
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md p-6 relative"
              >
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center md:text-left">Quality Check</h3>
                <p className="text-gray-600">
                  Every item is carefully inspected and packaged to maintain freshness during transportation.
                </p>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md p-6 relative"
              >
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center md:text-left">Home Delivery</h3>
                <p className="text-gray-600">
                  Your order is delivered to your doorstep within hours of harvest, ensuring farm-fresh quality.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join hundreds of satisfied families enjoying our organic products
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute top-10 left-0 right-0 h-40 bg-green-50 rounded-full -z-10 transform -translate-y-1/2"></div>

            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="p-8 md:p-12"
                >
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="mb-6 md:mb-0 md:mr-8">
                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto md:mx-0">
                        <img
                          src={testimonials[currentTestimonial].image}
                          alt={testimonials[currentTestimonial].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex mb-4">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>

                      <p className="text-lg md:text-xl mb-4 italic text-gray-700">
                        "{testimonials[currentTestimonial].quote}"
                      </p>

                      <div>
                        <h4 className="font-semibold text-lg">{testimonials[currentTestimonial].name}</h4>
                        <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center pb-4 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${currentTestimonial === index ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Weekly Subscription Boxes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your family and enjoy regular deliveries of farm-fresh organic produce
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {/* Essential Box */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-2xl shadow-md relative overflow-hidden border border-gray-100"
            >
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-1">
                POPULAR
              </div>
              <h3 className="text-2xl font-semibold mb-2">Essential Box</h3>
              <div className="text-3xl font-bold text-green-600 mb-4">₹499<span className="text-sm text-gray-600 font-normal">/week</span></div>
              <p className="text-gray-600 mb-6">
                Perfect for small families or couples. Weekly supply of seasonal vegetables, fruits and basic staples.
              </p>
              <ul className="mb-6 space-y-3">
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>5-6 varieties of seasonal vegetables</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>2-3 types of fruits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Basic staples (rice/grains)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Free delivery in Choutuppal</span>
                </li>
              </ul>
              <button className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
                Subscribe Now
              </button>
            </motion.div>

            {/* Family Box */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-100"
            >
              <h3 className="text-2xl font-semibold mb-2">Family Box</h3>
              <div className="text-3xl font-bold text-green-600 mb-4">₹899<span className="text-sm text-gray-600 font-normal">/week</span></div>
              <p className="text-gray-600 mb-6">
                Ideal for families of 3-5 people. More variety and quantity of fresh organic produce.
              </p>
              <ul className="mb-6 space-y-3">
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>8-10 varieties of seasonal vegetables</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>4-5 types of fruits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Staples including pulses and grains</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Free delivery in Choutuppal</span>
                </li>
              </ul>
              <button className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
                Subscribe Now
              </button>
            </motion.div>

            {/* Premium Box */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-100"
            >
              <h3 className="text-2xl font-semibold mb-2">Premium Box</h3>
              <div className="text-3xl font-bold text-green-600 mb-4">₹1499<span className="text-sm text-gray-600 font-normal">/week</span></div>
              <p className="text-gray-600 mb-6">
                Our most comprehensive box with premium varieties and specialty organic products.
              </p>
              <ul className="mb-6 space-y-3">
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>All vegetables and fruits in Family Box</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Organic dairy products or alternatives</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Cold-pressed oils and natural sweeteners</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Free delivery up to 15km radius</span>
                </li>
              </ul>
              <button className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
                Subscribe Now
              </button>
            </motion.div>
          </motion.div>

          <div className="flex items-center justify-center mt-8">
            <RotateCw size={20} className="text-green-600 mr-2" />
            <p className="text-gray-600">You can pause, modify or cancel your subscription anytime</p>
          </div>
        </div>
      </section>

      {/* Mobile App Promo Section
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2 mb-10 lg:mb-0"
            >
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-100 rounded-full opacity-60"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-100 rounded-full opacity-60"></div>
                <img 
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                  alt="Mobile App" 
                  className="relative z-10 rounded-2xl shadow-2xl mx-auto"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2 lg:pl-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Our Mobile App</h2>
              <p className="text-xl text-gray-600 mb-6">
                Download our app for a seamless ordering experience. Browse products, manage subscriptions, and track deliveries right from your phone.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Easy Ordering</h3>
                    <p className="text-gray-600">Browse our full catalog and place orders with just a few taps</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Delivery Tracking</h3>
                    <p className="text-gray-600">Know exactly when your order will arrive at your doorstep</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Subscription Management</h3>
                    <p className="text-gray-600">Manage, pause or modify your subscription boxes easily</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center bg-black text-white px-6 py-3 rounded-xl">
                  <Smartphone size={24} className="mr-3" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="font-semibold text-lg -mt-1">App Store</div>
                  </div>
                </button>
                
                <button className="flex items-center bg-black text-white px-6 py-3 rounded-xl">
                  <Smartphone size={24} className="mr-3" />
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="font-semibold text-lg -mt-1">Google Play</div>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our organic products and services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What makes your products organic?",
                answer: "Our products are grown without synthetic fertilizers, pesticides, or GMOs. We practice natural farming methods and work with farmers who follow strict organic standards. Many of our partner farms are in the process of or have already received organic certification."
              },
              {
                question: "How often do you deliver?",
                answer: "We deliver Monday through Saturday in the Choutuppal area. For subscription boxes, you can choose a fixed weekly delivery day that works best for you. One-time orders are typically delivered within 24 hours of placement."
              },
              {
                question: "Can I customize my subscription box?",
                answer: "Yes, you can customize your box contents to match your preferences. While we encourage trusting our seasonal selection for maximum freshness, you can specify items to always include or exclude from your subscription box."
              },
              {
                question: "How do you ensure freshness?",
                answer: "We harvest most produce on the same day as delivery. Our local sourcing means minimal transit time from farm to your table. For subscription boxes, we plan harvests in advance to ensure peak freshness for each delivery."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              >
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready for fresh organic produce?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-green-50 mb-8 max-w-3xl mx-auto"
          >
            Start your journey toward healthier eating with our fresh, locally grown organic products delivered right to your door.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="tel:+918008330905"
              className="flex items-center px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-colors shadow-lg transform hover:scale-105 duration-200"
            >
              <Phone size={20} className="mr-2" />
              Call Now: +91 8008 330 905
            </a>
            <a
              href="#shop-now"
              className="px-8 py-4 bg-green-500 text-white border border-green-400 font-semibold rounded-xl hover:bg-green-400 transition-colors shadow-lg transform hover:scale-105 duration-200"
            >
              <span className="flex items-center">
                <ArrowRight size={20} className="mr-2" />
                Order Now
              </span>
            </a>
          </motion.div>

          {/* Location indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full"
          >
            <MapPin size={18} className="mr-2" />
            <span>Proudly serving Choutuppal and surrounding areas</span>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OrganicProducts;
