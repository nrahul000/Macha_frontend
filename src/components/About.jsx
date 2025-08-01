import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Clock, MapPin, CheckCircle, ArrowRight, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';

const About = ({ darkMode }) => {
  const [visibleSection, setVisibleSection] = useState('what');

  // Stats data
  const stats = [
    { id: 1, value: 15, suffix: '+', label: 'Services Offered', icon: <Users size={24} /> },
    { id: 2, value: 4, suffix: 'K+', label: 'Happy Customers', icon: <Users size={24} /> },
    { id: 3, value: 3, suffix: '+', label: 'Years Experience', icon: <Clock size={24} /> },
    { id: 4, value: 12, suffix: '+', label: 'Areas Covered', icon: <MapPin size={24} /> },
  ];

  // Core values
  const coreValues = [
    { id: 1, title: 'Customer Focus', description: 'We put our customers at the heart of everything we do, ensuring their needs are met with care and precision.' },
    { id: 2, title: 'Reliability', description: 'Count on us for consistent, dependable service delivery that arrives on time, every time.' },
    { id: 3, title: 'Local Expertise', description: 'Our deep understanding of Choutuppal and surrounding areas enables us to provide tailored solutions.' },
    { id: 4, title: 'Quality Assurance', description: 'We maintain high standards across all our services, with strict quality control measures.' },
  ];

  // Key advantages
  const keyAdvantages = [
    'Single point of contact for all local services',
    'Quick response time within 30 minutes',
    'Verified service providers and partners',
    'Transparent pricing with no hidden fees',
    'Customized solutions for your specific needs',
    'Digital payment options for convenience'
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-white to-[#f8fbff]">
      <div className="container-custom">
        {/* Section header with updated design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-green-600/10 to-black/10 p-1 rounded-full mb-5">
            <span className="px-5 py-2 rounded-full bg-white text-green-700 text-sm font-medium inline-block">ABOUT US</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-black">Your Local Service Partner</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-black mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            MACHA connects you with essential services in Choutuppal and surrounding areas, bringing everything to your doorstep with just one call.
          </p>
        </motion.div>

        {/* Main content area with tab navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left column for navigation on larger screens */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <nav className="flex flex-col space-y-2">
                <button
                  onClick={() => setVisibleSection('what')}
                  className={`px-4 py-3 rounded-lg text-left transition-all ${visibleSection === 'what'
                      ? 'bg-gradient-to-r from-green-600 to-black text-white shadow-md'
                      : 'hover:bg-green-50 text-slate-700'
                    }`}
                >
                  What is MACHA?
                </button>
                <button
                  onClick={() => setVisibleSection('values')}
                  className={`px-4 py-3 rounded-lg text-left transition-all ${visibleSection === 'values'
                      ? 'bg-gradient-to-r from-green-600 to-black text-white shadow-md'
                      : 'hover:bg-green-50 text-slate-700'
                    }`}
                >
                  Our Values
                </button>
                <button
                  onClick={() => setVisibleSection('why')}
                  className={`px-4 py-3 rounded-lg text-left transition-all ${visibleSection === 'why'
                      ? 'bg-gradient-to-r from-green-600 to-black text-white shadow-md'
                      : 'hover:bg-green-50 text-slate-700'
                    }`}
                >
                  Why Choose Us?
                </button>
              </nav>

              {/* Call to action card */}
              <div className="mt-8 p-5 bg-green-50 rounded-lg border border-green-200 hidden lg:block">
                <h4 className="text-lg font-semibold text-slate-800 mb-2">Need Help?</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Have questions about our services? Contact our friendly team anytime.
                </p>
                <a
                  href="tel:+917057058841"
                  className="flex items-center justify-center gap-2 py-2 px-4 bg-white text-green-700 rounded-lg border border-green-200 hover:bg-green-600 hover:text-white transition-colors"
                >
                  <PhoneCall size={16} />
                  <span>Call Us Now</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right column for content */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden">
              {/* What is MACHA? */}
              {visibleSection === 'what' && (
                <motion.div
                  key="what"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="p-8"
                >
                  <h3 className="text-2xl font-bold mb-6 text-slate-800">
                    What is <span className="text-green-600">MACHA</span>?
                  </h3>

                  <div className="prose max-w-none text-slate-600">
                    <p className="mb-4">
                      MACHA is a comprehensive service platform designed specifically for Choutuppal and surrounding tier two village areas.
                      We bring together a wide range of essential services – from food delivery and home repairs to healthcare
                      and educational support – all accessible through a single point of contact.
                    </p>

                    <p className="mb-4">
                      Founded in 2020, we started with a simple mission: to solve the everyday service needs of our community.
                      We recognized that people in Choutuppal often struggled to find reliable service providers, especially for
                      urgent needs. MACHA was created to fill this gap by curating a network of trusted local professionals.
                    </p>

                    <p className="mb-6">
                      Today, we serve thousands of households and businesses, connecting them with qualified service providers
                      who deliver consistent, high-quality services right to their doorstep. Our dedication to customer satisfaction
                      and community development has made us the trusted service partner in the region.
                    </p>

                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mt-8">
                      <img
                        src="https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                        alt="MACHA Service in action"
                        className="rounded-lg w-full md:w-1/2 h-64 object-cover"
                      />
                      <div className="space-y-4 md:w-1/2">
                        <div className="flex items-start gap-3">
                          <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-slate-800">One-Stop Solution</h4>
                            <p className="text-sm text-slate-600">Access all essential services through a single platform</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-slate-800">Local Network</h4>
                            <p className="text-sm text-slate-600">Established partnerships with trusted local service providers</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-slate-800">Convenience First</h4>
                            <p className="text-sm text-slate-600">Simple booking process via phone call or online platform</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats counter */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 py-8 border-t border-b border-green-100">
                    {stats.map((stat) => (
                      <div key={stat.id} className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-full mb-3">
                          <div className="text-green-600">{stat.icon}</div>
                        </div>
                        <div className="text-3xl font-bold text-slate-800">
                          <CountUp end={stat.value} duration={2.5} />
                          {stat.suffix}
                        </div>
                        <p className="text-sm text-slate-600">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Core Values */}
              {visibleSection === 'values' && (
                <motion.div
                  key="values"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="p-8"
                >
                  <h3 className="text-2xl font-bold mb-6 text-slate-800">
                    Our Core <span className="text-green-600">Values</span>
                  </h3>

                  <p className="text-slate-600 mb-8">
                    At MACHA, our values form the foundation of everything we do. They guide how we interact with our customers,
                    partners, and community members every day.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {coreValues.map((value) => (
                      <div key={value.id} className="bg-green-50 p-6 rounded-xl border border-green-100">
                        <h4 className="text-lg font-semibold text-slate-800 mb-2">{value.title}</h4>
                        <p className="text-slate-600">{value.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Vision & Mission */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-gradient-to-br from-green-50 to-black/5 p-6 rounded-xl border border-green-200">
                      <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-4">
                        <Award size={20} className="text-green-600" />
                        Our Vision
                      </h4>
                      <p className="text-slate-600 italic">
                        "To become the most trusted service platform that enhances the quality of life for every resident in Choutuppal and beyond."
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-black/5 p-6 rounded-xl border border-green-200">
                      <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-4">
                        <Award size={20} className="text-green-600" />
                        Our Mission
                      </h4>
                      <p className="text-slate-600 italic">
                        "To provide convenient, reliable, and high-quality services while creating opportunities for local service providers and contributing to community development."
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Why Choose Us? */}
              {visibleSection === 'why' && (
                <motion.div
                  key="why"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="p-8"
                >
                  <h3 className="text-2xl font-bold mb-6 text-slate-800">
                    Why Choose <span className="text-green-600">MACHA</span>?
                  </h3>

                  <p className="text-slate-600 mb-8">
                    In a world of numerous service providers, here's why MACHA stands out as your preferred local partner:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                    {keyAdvantages.map((advantage, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-700">{advantage}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-200 mt-10">
                    <h4 className="text-lg font-semibold text-slate-800 mb-4">Ready to experience the MACHA difference?</h4>
                    <p className="text-slate-600 mb-5">
                      Join thousands of satisfied customers who rely on our services daily. Whether it's a routine need or an
                      urgent requirement, we're just a call away.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/book"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-black text-white rounded-lg hover:from-green-700 hover:to-black transition-all shadow-sm"
                      >
                        Book a Service
                        <ArrowRight size={16} />
                      </Link>
                      <a
                        href="tel:+917057058841"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-green-200 text-green-700 rounded-lg hover:bg-green-50 transition-all"
                      >
                        <PhoneCall size={16} />
                        Call Us
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;