import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Inbox, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const faqCategories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General' },
    { id: 'services', name: 'Services' },
    { id: 'delivery', name: 'Delivery' },
    { id: 'payment', name: 'Payment' },
    { id: 'booking', name: 'Booking' }
  ];
  
  const faqs = [
    {
      id: 1,
      question: 'What areas do you service in Choutuppal?',
      answer: 'We provide services throughout Choutuppal and surrounding areas including Pedda Konduru, CPL, Panthangi, Koyala Gudem, and Guddi Malkapur. For areas outside these locations, please contact us to check availability.',
      category: 'general'
    },
    {
      id: 2,
      question: 'What are your operating hours?',
      answer: 'Our services are available from 9:00 AM to 5:00 PM every day, including weekends. For urgent requirements outside these hours, please call our emergency number.',
      category: 'general'
    },
    {
      id: 3,
      question: 'How do I place an order for food or grocery delivery?',
      answer: 'You can place orders by calling our hotline at +91 8008330905, sending a WhatsApp message to +91 9177541947, or using the booking form on our website.',
      category: 'delivery'
    },
    {
      id: 4,
      question: 'What types of services do you offer?',
      answer: 'We offer a wide range of services including food delivery, grocery delivery, medicine delivery, technician services (electricians, plumbers, etc.), transport services, event management, labor supply, sanitization services, home tutoring, and software development.',
      category: 'services'
    },
    {
      id: 5,
      question: 'How much do you charge for delivery?',
      answer: 'Our delivery charges vary based on distance and order value. For small deliveries within Choutuppal, charges typically start from ₹30. For larger orders or longer distances, please contact us for a quote.',
      category: 'payment'
    },
    {
      id: 6,
      question: 'How can I pay for your services?',
      answer: 'We accept cash on delivery, UPI payments (GooglePay, PhonePe, Paytm), and bank transfers. For regular customers, we also offer monthly billing options.',
      category: 'payment'
    },
    {
      id: 7,
      question: 'How quickly can you deliver food or groceries?',
      answer: 'For most locations in Choutuppal, we typically deliver within 30-45 minutes, depending on distance and traffic conditions. During peak hours or adverse weather, delivery times may be slightly longer.',
      category: 'delivery'
    },
    {
      id: 8,
      question: 'Do you have minimum order requirements?',
      answer: 'For food and grocery delivery, there is no minimum order requirement, but delivery charges may apply for orders below ₹300. For other services like technician visits, standard service charges apply regardless of the job size.',
      category: 'services'
    },
    {
      id: 9,
      question: 'How do I book a technician?',
      answer: 'You can book a technician by calling us or using the booking form on our website. Please specify the type of technician needed, the issue to be addressed, and your preferred time slot.',
      category: 'booking'
    },
    {
      id: 10,
      question: 'Can I track my delivery or service request?',
      answer: 'Yes, once your order is confirmed, we will share regular updates via WhatsApp or SMS. You can also call our customer service number for real-time updates on your delivery or service status.',
      category: 'delivery'
    }
  ];
  
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const filteredFaqs = faqs
    .filter(faq => activeCategory === 'all' || faq.category === activeCategory)
    .filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  return (
    <section id="faq" className="section-padding bg-[#0a1120]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="px-5 py-2 rounded-full bg-black text-green-600 text-sm font-medium inline-block mb-5 border border-green-900">SUPPORT</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Frequently Asked <span className="text-[#4dc8e7]">Questions</span></h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Find answers to commonly asked questions about our services, delivery, and more.
          </p>
        </motion.div>
        
        {/* Search and categories */}
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black border border-green-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-white placeholder:text-slate-400"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id 
                  ? 'bg-green-600 text-white'
                  : 'bg-black text-slate-300 hover:bg-green-950'
              }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* FAQ accordion */}
        <div className="max-w-3xl mx-auto divide-y divide-green-900">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div key={faq.id} className="py-4">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between items-center w-full text-left px-4 py-2 rounded-lg hover:bg-[#111c30] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4dc8e7] group"
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className="text-white font-medium pr-8">{faq.question}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-[#4dc8e7] transition-transform duration-300 ${activeIndex === index ? 'transform rotate-180' : ''}`} 
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pt-4 pb-2">
                        <p className="text-slate-300">{faq.answer}</p>
                        <div className="flex mt-4 gap-2">
                          <button
                            onClick={() => window.bookCustomService()}
                            className="text-xs text-[#4dc8e7] hover:underline flex items-center gap-1"
                            aria-label="Book a service related to this question"
                          >
                            Book related service
                          </button>
                          <span className="text-slate-500">•</span>
                          <button
                            onClick={() => {
                              // Open chat if available
                              if (typeof window.openLiveChat === 'function') {
                                window.openLiveChat(faq.question);
                              } else {
                                // Fallback - copy question to clipboard and go to contact
                                navigator.clipboard.writeText(faq.question);
                                document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
                                alert('Question copied to clipboard. Contact support for more help.');
                              }
                            }}
                            className="text-xs text-[#4dc8e7] hover:underline flex items-center gap-1"
                            aria-label="Ask more about this in live chat"
                          >
                            Ask in chat
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#111c30] rounded-full mb-4">
                <Inbox size={32} className="text-slate-500" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
              <p className="text-slate-400">
                We couldn't find any FAQs matching your search. Try a different term or
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="text-[#4dc8e7] hover:underline ml-1"
                >
                  clear filters
                </button>
              </p>
            </div>
          )}
        </div>
        
        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#111c30] rounded-lg text-slate-300 mb-4">
            <HelpCircle size={18} className="text-[#4dc8e7]" />
            <span>Still have questions?</span>
          </div>
          <p className="text-slate-300 mb-6">
            If you couldn't find the answer to your question, please contact us.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="tel:+918008330905" 
              className="px-6 py-3 bg-[#111c30] hover:bg-[#1c2c44] text-white rounded-full transition-colors border border-[#1e304d]"
            >
              Call Us
            </a>
            <a 
              href="https://wa.me/919177541947" 
              className="px-6 py-3 bg-[#4dc8e7] hover:bg-[#3bb5d4] text-white rounded-full transition-colors"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
