import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  Star,
  Shield,
  Clock,
  Zap,
  Droplet,
  Hammer,
  Snowflake,
  Users,
  CheckCircle,
  MapPin,
  Calendar,
  Wrench,
  Award
} from 'lucide-react';
import machaLogo from '../../assets/macha-logo.jpg'; // Import your logo

// Modern card component with hover effects
const TechnicianCard = ({ title, icon, color, description, rating, responseTime, image, link, popular, features }) => {
  // Define color schemes for each service type - updated to match MACHA green/black theme
  const colorSchemes = {
    'yellow': {
      bg: 'from-green-600 to-green-800',
      iconBg: 'bg-green-700',
      button: 'bg-green-700 hover:bg-green-800',
      badge: 'bg-green-100 text-green-800'
    },
    'blue': {
      bg: 'from-green-500 to-green-700',
      iconBg: 'bg-green-600',
      button: 'bg-green-600 hover:bg-green-700',
      badge: 'bg-green-100 text-green-800'
    },
    'amber': {
      bg: 'from-green-700 to-green-900',
      iconBg: 'bg-green-800',
      button: 'bg-green-700 hover:bg-green-800',
      badge: 'bg-green-100 text-green-800'
    },
    'cyan': {
      bg: 'from-green-600 to-green-800',
      iconBg: 'bg-green-700',
      button: 'bg-green-700 hover:bg-green-800',
      badge: 'bg-green-100 text-green-800'
    }
  };

  const scheme = colorSchemes[color];

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={() => window.location.href = link}
    >
      {popular && (
        <div className="absolute top-4 right-4 z-30">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-white text-green-700 shadow-lg">
            MOST REQUESTED
          </span>
        </div>
      )}

      <div className="h-64 relative">
        <div className="absolute inset-0 bg-gray-900 bg-opacity-20 z-10"></div>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x250?text=Image+Unavailable';
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 z-10`}></div>

        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="flex items-center mb-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${scheme.button}`}>
              {icon}
            </div>
            <h3 className="text-2xl font-bold text-white ml-3">{title}</h3>
          </div>
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-white ml-2 font-medium">{rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white flex flex-col h-64">
        <p className="text-gray-700 mb-4 flex-grow">{description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            <Clock size={14} className="mr-1.5" />
            <span className="font-medium">{responseTime}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            <Shield size={14} className="mr-1.5" />
            <span className="font-medium">Verified</span>
          </div>
        </div>

        <ul className="space-y-2 mb-5">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <CheckCircle size={16} className="mr-2 mt-0.5 text-green-600" />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          to={link}
          className={`flex items-center justify-center w-full py-3.5 rounded-xl bg-green-700 hover:bg-green-800 text-white font-medium transition-all hover:-translate-y-0.5`}
          onClick={(e) => e.stopPropagation()} // Prevent triggering parent onClick
        >
          View Details
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </motion.div>
  );
};

// Modern timeline step component
const TimelineStep = ({ number, title, description, isLast = false }) => (
  <div className="relative">
    <div className="flex items-center">
      <div className="relative z-10">
        <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
          {number}
        </div>
      </div>
      <div className="flex-grow ml-4">
        <h3 className="text-xl font-semibold text-green-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
    {!isLast && (
      <div className="absolute top-0 left-5 h-full ml-[2px] w-0.5 bg-green-200"></div>
    )}
  </div>
);

// Testimonial card component
const TestimonialCard = ({ name, location, image, content, rating }) => (
  <motion.div
    className="bg-white rounded-2xl p-6 shadow-lg relative"
    whileHover={{ y: -5 }}
  >
    <div className="absolute top-0 right-0 -mt-3 mr-3 bg-green-700 px-3 py-1 rounded-full text-white text-sm flex items-center">
      {rating} <Star size={12} className="fill-white text-white ml-1" />
    </div>
    <div className="flex items-center mb-4">
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-100 shadow-md">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${name.replace(/\s+/g, '+')}&background=22c55e&color=fff`;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-green-600 text-white text-xl font-bold">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div className="ml-4">
        <h4 className="font-bold text-gray-800">{name}</h4>
        <div className="flex items-center text-gray-500 text-sm">
          <MapPin size={14} className="mr-1" /> {location}
        </div>
      </div>
    </div>
    <p className="text-gray-700 italic">{content}</p>
  </motion.div>
);

// Feature card component with improved design
const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-t-4 border-green-700"
    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl flex items-center justify-center mb-8 shadow-md mx-auto">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4 text-green-800 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </motion.div>
);

const Technicians = () => {
  const technicianServices = [
    {
      id: 1,
      title: 'Electrician',
      icon: <Zap size={24} className="text-white" />,
      color: 'yellow',
      description: 'Professional electrical repair, installation, and maintenance services for residential and commercial needs',
      rating: '4.8/5 (2.4k+ reviews)',
      responseTime: 'Within 90 minutes',
      image: 'https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '/services/technicians/electrician',
      popular: true,
      features: [
        'Electrical repairs & troubleshooting',
        'Wiring installation & replacement',
        'Safety inspections & upgrades'
      ]
    },
    {
      id: 2,
      title: 'Plumber',
      icon: <Droplet size={24} className="text-white" />,
      color: 'blue',
      description: 'Expert plumbing services for leaks, repairs, installations, and maintenance to keep your water systems running smoothly',
      rating: '4.9/5 (1.8k+ reviews)',
      responseTime: 'Within 60 minutes',
      image: 'https://img.freepik.com/premium-photo/plumber-fixing-kitchen-sink-efficiently_53876-1063512.jpg?semt=ais_hybrid&w=740',
      link: '/services/technicians/plumber',
      popular: false,
      features: [
        'Leak detection & repair',
        'Fixture installation & replacement',
        'Drain cleaning & maintenance'
      ]
    },
    {
      id: 3,
      title: 'Carpenter',
      icon: <Hammer size={24} className="text-white" />,
      color: 'amber',
      description: 'Skilled carpenters for furniture repairs, custom woodwork, installations, and all your wooden fixture needs',
      rating: '4.8/5 (1.5k+ reviews)',
      responseTime: 'Within 2 hours',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1470&auto=format&fit=crop',
      link: '/services/technicians/carpenter',
      popular: false,
      features: [
        'Furniture repair & restoration',
        'Custom carpentry & installations',
        'Door & window frame work'
      ]
    },
    {
      id: 4,
      title: 'AC Technician',
      icon: <Snowflake size={24} className="text-white" />,
      color: 'cyan',
      description: 'Professional AC repair, servicing, installation, and maintenance for all types of air conditioning systems',
      rating: '4.8/5 (1.2k+ reviews)',
      responseTime: 'Within 120 minutes',
      image: 'https://thumbs.dreamstime.com/b/ac-electrician-technician-repairing-air-conditioner-ac-electrician-technician-repairing-air-conditioner-appliance-277163670.jpg',
      link: '/services/technicians/ac-technician',
      popular: false,
      features: [
        'AC repair & troubleshooting',
        'Regular maintenance & servicing',
        'Installation & replacement'
      ]
    }
  ];

  // Updated testimonials with valid image URLs
  const testimonials = [
    {
      name: "Amit Patel",
      location: "Mumbai",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "The electrician arrived on time and fixed our power issue quickly. He was knowledgeable, professional, and even gave us tips to prevent future problems!",
      rating: "4.9"
    },
    {
      name: "Sneha Gupta",
      location: "Bangalore",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "Our AC wasn't cooling properly. The technician arrived, diagnosed a refrigerant leak, and fixed it on the spot. Our AC is now working better than ever!",
      rating: "5.0"
    },
    {
      name: "Rahul Verma",
      location: "Delhi",
      image: "https://randomuser.me/api/portraits/men/62.jpg",
      content: "The carpenter built a custom bookshelf for our living room. The craftsmanship is outstanding, and it fits perfectly in the space. Highly recommend!",
      rating: "4.8"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section - Redesigned with green/black theme */}
      <section className="relative py-8 overflow-hidden bg-gradient-to-br from-green-800 via-green-900 to-black">
        <div className="absolute inset-0 pattern-grid-lg opacity-10"></div>

        {/* Floating shapes for modern design */}
        <div className="absolute top-20 left-10 w-64 h-44 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto px-5 relative z-10">
          {/* MACHA Logo display */}
          <div className="flex justify-center mb-8">
            <img src={machaLogo} alt="MACHA Logo" className="h-24 rounded-lg shadow-lg" />
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Professional Home <span className="text-green-300">Technicians</span> At Your Service
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl md:text-2xl text-green-100 mb-10"
            >
              Skilled and verified professionals for all your home repair and maintenance needs
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="tel:+918008330905"
                className="px-8 py-4 bg-white text-green-800 font-bold rounded-xl hover:bg-green-50 transition-all hover:-translate-y-1 hover:shadow-lg flex items-center"
              >
                <Phone className="w-5 h-5 mr-2" /> Call Us Now
              </a>
              <Link
                to="/book"
                className="px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all hover:-translate-y-1 hover:shadow-lg flex items-center"
              >
                <Calendar className="w-5 h-5 mr-2" /> Book A Technician
              </Link>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-16 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-4 flex flex-wrap justify-around"
            >
              <div className="px-4 py-2 text-center">
                <div className="text-2xl font-bold text-white">5,000+</div>
                <div className="text-green-200 text-sm">Completed Jobs</div>
              </div>
              <div className="px-4 py-2 text-center">
                <div className="text-2xl font-bold text-white">4.8/5</div>
                <div className="text-green-200 text-sm">Customer Rating</div>
              </div>
              <div className="px-4 py-2 text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-green-200 text-sm">Verified Technicians</div>
              </div>
              <div className="px-4 py-2 text-center">
                <div className="text-2xl font-bold text-white">30 Days</div>
                <div className="text-green-200 text-sm">Service Guarantee</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Updated to match brand theme */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <img src={machaLogo} alt="MACHA Logo" className="h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">Why Choose Our Technicians</h2>
            <div className="w-24 h-1 bg-green-700 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our technicians are carefully selected to ensure you receive the highest quality service for all your home maintenance and repair needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={<Users size={32} className="text-white" />}
              title="Expert Professionals"
              description="All our technicians are skilled, experienced, and background verified to ensure quality service and your safety."
            />

            <FeatureCard
              icon={<Clock size={32} className="text-white" />}
              title="Quick Response"
              description="We understand the urgency of home repairs. Our technicians respond quickly to minimize inconvenience."
            />

            <FeatureCard
              icon={<Award size={32} className="text-white" />}
              title="Service Guarantee"
              description="All our services come with a satisfaction guarantee and warranty on workmanship and parts."
            />
          </div>
        </div>
      </section>

      {/* Service Cards - Updated with enhanced card design */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-semibold inline-block mb-4">
              OUR TECHNICIANS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">Choose Your Technical Service</h2>
            <div className="w-24 h-1 bg-green-700 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Select from our range of professional technician services, each specializing in different areas of home maintenance and repair.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technicianServices.map((service) => (
              <TechnicianCard
                key={service.id}
                {...service}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Updated timeline design with green theme */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">How It Works</h2>
            <div className="w-24 h-1 bg-green-700 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Booking a technician is quick and easy. Follow these simple steps to get your home maintenance issues resolved.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-12 pl-4">
            <TimelineStep
              number="1"
              title="Book Online or Call Us"
              description="Select your service and preferred time slot through our easy booking platform or give us a call."
            />
            <TimelineStep
              number="2"
              title="Get Matched with a Technician"
              description="We'll assign a skilled technician based on your specific needs and confirm the appointment."
            />
            <TimelineStep
              number="3"
              title="Receive Professional Service"
              description="Our technician arrives on time, diagnoses the issue, and performs high-quality repairs."
            />
            <TimelineStep
              number="4"
              title="Satisfaction Guaranteed"
              description="Pay only when you're satisfied with the service, backed by our service guarantee."
              isLast
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section - Updated with enhanced testimonial cards */}
      <section className="py-20 bg-gradient-to-br from-green-800 via-green-900 to-black text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-green-100 max-w-2xl mx-auto text-lg">
              Don't just take our word for it. Here's what some of our satisfied customers have to say about our technician services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tool Banner Section - Updated with green theme */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench size={28} className="text-green-700" />
              </div>
              <h3 className="text-lg font-bold text-green-800 mb-2">Professional Tools</h3>
              <p className="text-gray-600">Our technicians use high-quality tools for precise and efficient work</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={28} className="text-green-700" />
              </div>
              <h3 className="text-lg font-bold text-green-800 mb-2">Experienced Pros</h3>
              <p className="text-gray-600">All technicians have years of field experience and technical training</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={28} className="text-green-700" />
              </div>
              <h3 className="text-lg font-bold text-green-800 mb-2">24/7 Service</h3>
              <p className="text-gray-600">Emergency services available around the clock when you need help</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={28} className="text-green-700" />
              </div>
              <h3 className="text-lg font-bold text-green-800 mb-2">100% Guaranteed</h3>
              <p className="text-gray-600">All our services come with a complete satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned with green/black theme */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-green-800 to-black rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden max-w-5xl mx-auto">
            <div className="absolute right-0 top-0 w-64 h-64 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -mr-32 -mt-32"></div>
            <div className="absolute left-0 bottom-0 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -ml-32 -mb-32"></div>

            {/* Logo in CTA */}
            <div className="absolute top-6 right-6 z-10">
              <img src={machaLogo} alt="MACHA Logo" className="h-12 rounded-md shadow-lg" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center">
              <div className="md:w-2/3 md:pr-10 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to solve your home repair needs?</h2>
                <p className="text-green-100 text-xl mb-0">
                  Our professional technicians are just a click away. Book now for prompt, reliable service!
                </p>
              </div>
              <div className="md:w-1/3">
                <Link
                  to="/book"
                  className="w-full block py-4 px-6 bg-white text-green-700 font-bold text-lg rounded-xl hover:bg-green-50 transition-all hover:-translate-y-1 hover:shadow-lg text-center"
                >
                  Book A Technician Now
                </Link>
                <a
                  href="tel:+918008330905"
                  className="w-full block py-3 px-6 mt-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:bg-opacity-10 transition-all text-center"
                >
                  <Phone size={18} className="inline mr-2" /> Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add custom styles for animations */}
      <style>
        {`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .pattern-grid-lg {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 0V4h-2V0h-4v2h4v4h2V2h4V0h-4zM0 34v-4H2v4h4v2H2v4H0v-4H2v-2H0zM0 0V4h2V0h4v2H2v4H0V2H2V0H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        `}
      </style>
    </div>
  );
};

export default Technicians;