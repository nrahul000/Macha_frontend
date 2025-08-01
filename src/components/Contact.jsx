import { motion } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, MessageSquare, Leaf,
  Truck, Wrench, Users, Calendar, BookOpen, Code
} from 'lucide-react';

const Contact = () => {
  const phoneNumbers = [
    { number: "8008330905", label: "Main" },
    { number: "7057058841", label: "WhatsApp" },
    { number: "6309671786", label: "Orders" },
    { number: "7093413395", label: "Support" },
    { number: "8185966730", label: "Technicians" },
    { number: "9133107135", label: "Emergencies" },
  ];

  const contactInfo = [
    {
      icon: <Phone size={20} />,
      title: "Phone",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mt-2">
          {phoneNumbers.map((item, idx) => (
            <a
              key={idx}
              href={`tel:+91${item.number}`}
              className="flex items-start gap-2 text-white hover:text-emerald-300 transition-colors"
            >
              <div className="flex-shrink-0 pt-2">
                <span className="w-2 h-2 block rounded-full bg-emerald-400"></span>
              </div>
              <div className="leading-tight">
                <span className="font-medium text-base block whitespace-nowrap text-white">
                  +91 {item.number}
                </span>
                <span className="block text-xs text-emerald-300">
                  {item.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      )
    },
    {
      icon: <Mail size={20} />,
      title: "Email",
      content: (
        <div className="flex items-start">
          <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 mr-2 flex-shrink-0"></span>
          <div>
            <a
              href="mailto:info@macha.in"
              className="text-white hover:text-emerald-300 transition-colors font-medium"
            >
              info@macha.in
            </a>
            <p className="text-xs text-emerald-300 mt-1">
              For business inquiries and support
            </p>
          </div>
        </div>
      )
    },
    {
      icon: <MapPin size={20} />,
      title: "Location",
      content: (
        <div className="flex items-start">
          <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 mr-2 flex-shrink-0"></span>
          <p className="text-white">
            Choutuppal, Telangana<br />
            Serving: Pedda Konduru, Panthangi, CPL,<br />
            Koyala Gudem, Guddi Malkapur & nearby 15 km radius
          </p>
        </div>
      )
    },
    {
      icon: <Clock size={20} />,
      title: "Service Hours",
      content: (
        <div className="flex items-start">
          <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 mr-2 flex-shrink-0"></span>
          <p className="text-white">
            We serve all areas around Choutuppal until 10 PM
          </p>
        </div>
      )
    }
  ];

  const expertise = [
    { icon: <Truck size={18} />, title: "Delivery Services", description: "Food, Groceries, Medicines, essentials" },
    { icon: <Leaf size={18} />, title: "Organic Supply", description: "Milk, Vegetables, and farm products" },
    { icon: <Wrench size={18} />, title: "Technicians", description: "Electricians, Plumbers, Carpenters, Mechanics" },
    { icon: <Users size={18} />, title: "Man Power supply", description: "Security Guards, Maids, and Manpower" },
    { icon: <Calendar size={18} />, title: "Event Management", description: "Birthday parties, Weddings, catering" },
    { icon: <Users size={18} />, title: "Sanitization", description: "Pest control, house cleaning" },
    { icon: <BookOpen size={18} />, title: "Home Tutors", description: "Personalized education services" },
    { icon: <Code size={18} />, title: "Software Development", description: "Websites, Mobile Apps, E-commerce" }
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden py-20">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-teal-400 opacity-15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-1/2 w-[300px] h-[300px] bg-green-400 opacity-20 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 z-0"></div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
      </div>

      <div className="container-custom relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 text-white text-sm font-medium inline-block mb-5"
            whileHover={{ scale: 1.03 }}
          >
            GET IN TOUCH
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow">
            Contact Us
          </h2>
          <p className="text-lg text-emerald-50 max-w-2xl mx-auto font-medium">
            Reach out to us for any inquiries or to schedule a service.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Contact Details */}
          <motion.div className="lg:w-2/5" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="bg-emerald-900/80 p-8 rounded-2xl border border-emerald-600/30 shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-600/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white shadow-lg">
                  <Phone size={20} />
                </div>
                <h3 className="text-2xl font-bold text-white">Get In Touch</h3>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div key={index} className="flex items-start gap-4" whileHover={{ x: 5 }}>
                    <span className="p-3 bg-emerald-800/50 rounded-lg text-emerald-300 mt-1 shadow-lg">
                      {item.icon}
                    </span>
                    <div>
                      <h4 className="font-medium text-emerald-300">{item.title}</h4>
                      <div className="mt-2">{item.content}</div>
                    </div>
                  </motion.div>
                ))}

                <div className="mt-8 text-center">
                  <motion.a
                    href="https://wa.me/917057058841"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageSquare size={18} />
                    <span>Chat on WhatsApp</span>
                  </motion.a>
                  <p className="text-sm text-emerald-300 mt-3 font-medium">
                    Typically replies within minutes
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Our Expertise */}
          <motion.div className="lg:w-3/5" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="bg-emerald-900/80 p-8 rounded-2xl border border-emerald-600/30 shadow-xl">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-emerald-600/30">
                <h3 className="text-2xl font-bold text-white">Our Expertise</h3>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white shadow-lg">
                  <Leaf size={20} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {expertise.map((service, index) => (
                  <motion.div
                    key={index}
                    className="bg-emerald-800/30 p-4 rounded-xl border border-emerald-600/30 shadow-lg"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg text-white shadow-lg">
                        {service.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{service.title}</h4>
                        <p className="text-sm text-emerald-300 mt-1">{service.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div className="mt-8 p-6 rounded-xl bg-emerald-800/40 text-center border border-emerald-600/40 shadow-lg">
                <p className="text-lg font-semibold text-white">Any kind of Delivery Services we do Provide.</p>
                <p className="text-sm text-emerald-300 mt-2">Fast, reliable, and eco-friendly services for your convenience</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
