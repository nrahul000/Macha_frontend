import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Phone } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="bg-white dark:bg-[#0a1120] min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="text-9xl font-bold text-cyan-500 opacity-20">404</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-slate-800 dark:text-white whitespace-nowrap">Page Not Found</div>
          </div>
        </div>
        
        <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
            <ArrowLeft size={18} />
            Go Back
          </Link>
          
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#4dc8e7] text-white rounded-lg hover:bg-[#3bb5d4] transition-colors">
            <Home size={18} />
            Homepage
          </Link>
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Need immediate assistance?</p>
          <a href="tel:+918008330905" className="inline-flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
            <Phone size={16} />
            Call Support
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
