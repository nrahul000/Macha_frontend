import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ServiceBooking from '../components/ServiceBooking';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const BookingPage = () => {
  // Preconnect to Google Maps services for faster loading
  useEffect(() => {
    // Only add preconnect links if they don't already exist
    if (!document.querySelector('link[href="https://maps.googleapis.com"]')) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = 'https://maps.googleapis.com';
      document.head.appendChild(link);

      const link2 = document.createElement('link');
      link2.rel = 'preconnect';
      link2.href = 'https://maps.gstatic.com';
      document.head.appendChild(link2);
    }
  }, []);
  
  return (
    <div className="bg-[#17612A] min-h-screen">
      <Helmet>
        <title>Book Our Services | MACHA</title>
        <meta name="description" content="Book delivery, technician, and other services in Choutuppal and surrounding areas. Pin your exact location on the map for accurate service." />
      </Helmet>

      {/* Header with back button */}
      <div className="bg-gradient-to-r from-[#0e3917] to-[#56bb6a] py-4 px-6 sticky top-0 z-10 shadow-lg">
        <div className="container-custom flex items-center">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white hover:text-[#4dc8e7] transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Page title */}
        <div className="container-custom pt-12 pb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Book Our Services
          </h1>
          <p className="text-slate-300 max-w-3xl">
            Fill out the form below to request any of our services in Choutuppal and surrounding areas.
            Use the map to pin your exact location for accurate service delivery.
          </p>
        </div>
        
        {/* The booking form component */}
        <ServiceBooking isStandalone={true} />
      </motion.div>
    </div>
  );
};

export default BookingPage;
