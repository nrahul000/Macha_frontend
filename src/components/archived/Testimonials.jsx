import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Ravi Kumar',
      location: 'Pedda Konduru',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      service: 'Food Delivery',
      rating: 5,
      text: 'MACHA saved my day when I was sick and needed food delivered. They were prompt, professional, and the delivery was contactless as requested. Highly recommend their services!'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      location: 'CPL',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      service: 'Technician Service',
      rating: 5,
      text: 'I had an electrical emergency and MACHA arranged for an electrician within 30 minutes! The technician was skilled and fixed the issue quickly. Great service at reasonable rates.'
    },
    {
      id: 3,
      name: 'Suresh Reddy',
      location: 'Panthangi',
      avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
      service: 'Grocery Delivery',
      rating: 4,
      text: 'Regular customer of their grocery delivery service. They always deliver on time and the products are fresh. The delivery team is courteous and follows all safety protocols.'
    },
    {
      id: 4,
      name: 'Lakshmi Devi',
      location: 'Choutuppal',
      avatar: 'https://randomuser.me/api/portraits/women/58.jpg',
      service: 'Event Management',
      rating: 5,
      text: 'MACHA team organized my daughter\'s birthday party and it was perfect! From decorations to catering, everything was handled professionally. The kids loved it and so did we!'
    },
    {
      id: 5,
      name: 'Arun Naidu',
      location: 'Koyala Gudem',
      avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
      service: 'Transport Service',
      rating: 4,
      text: 'Used MACHA for transport service to Hyderabad. The driver was punctual, vehicle was clean, and the journey was comfortable. Will definitely use again for future travels.'
    }
  ];

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setAutoplay(false);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setAutoplay(false);
  };

  return (
    <section id="testimonials" className="section-padding bg-[#0a1120]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="px-5 py-2 rounded-full bg-[#111c30] text-[#4dc8e7] text-sm font-medium inline-block mb-5 border border-[#1e304d]">TESTIMONIALS</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">What Our <span className="text-[#4dc8e7]">Customers</span> Say</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Read what our customers have to say about their experience with MACHA's delivery and service solutions.
          </p>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Quote icon */}
          <div className="absolute -top-10 -left-10 text-[#4dc8e7]/10 hidden lg:block">
            <Quote size={80} />
          </div>
          
          {/* Testimonial card */}
          <motion.div
            key={testimonials[currentIndex].id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="bg-[#111c30]/70 backdrop-blur-sm border border-[#1e304d] p-8 rounded-2xl shadow-lg relative"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="md:w-1/4 flex flex-col items-center">
                <img 
                  src={testimonials[currentIndex].avatar} 
                  alt={testimonials[currentIndex].name} 
                  className="w-24 h-24 object-cover rounded-full border-4 border-[#4dc8e7]/20"
                  loading="lazy"
                />
                <div className="flex items-center justify-center mt-3 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={16} 
                      className={i < testimonials[currentIndex].rating ? "text-[#4dc8e7] fill-[#4dc8e7]" : "text-slate-600"}
                    />
                  ))}
                </div>
                <div className="text-center mt-2">
                  <h3 className="font-semibold text-white">{testimonials[currentIndex].name}</h3>
                  <p className="text-sm text-slate-400">{testimonials[currentIndex].location}</p>
                  <span className="inline-block px-3 py-1 bg-[#4dc8e7]/10 text-[#4dc8e7] text-xs rounded-full mt-2">
                    {testimonials[currentIndex].service}
                  </span>
                </div>
              </div>
              
              <div className="md:w-3/4">
                <p className="text-slate-300 italic leading-relaxed">"{testimonials[currentIndex].text}"</p>
              </div>
            </div>
            
            {/* Testimonial navigation */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-[#4dc8e7] w-6' 
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Navigation buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
            <button
              onClick={goToPrev}
              className="pointer-events-auto transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#1c2c44] border border-[#1e304d] text-white flex items-center justify-center hover:bg-[#4dc8e7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4dc8e7]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
              className="pointer-events-auto transform translate-x-1/2 w-10 h-10 rounded-full bg-[#1c2c44] border border-[#1e304d] text-white flex items-center justify-center hover:bg-[#4dc8e7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4dc8e7]"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* Add testimonial CTA */}
          <div className="text-center mt-10">
            <p className="text-slate-300 mb-4">Had a great experience with our service?</p>
            <a 
              href="https://forms.gle/yourFormLink" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#4dc8e7] text-white rounded-full hover:bg-[#3bb5d4] transition-colors"
            >
              Share Your Feedback
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
