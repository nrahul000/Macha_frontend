import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from './BackToTop';
import LiveChat from './LiveChat';

const AppLayout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [toastMessage, setToastMessage] = useState(null);
  const location = useLocation();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle theme changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Toast notification system
  const showToast = (message, type = 'info', duration = 5000) => {
    setToastMessage({ message, type, duration });
    setTimeout(() => setToastMessage(null), duration);
  };

  // Expose toast functionality globally
  useEffect(() => {
    window.showNotification = showToast;
    return () => {
      delete window.showNotification;
    };
  }, []);

  // Redirect admin users to admin dashboard
  useEffect(() => {
    if (currentUser?.role === 'admin') {
      navigate('/admin', { replace: true });
    }
  }, [currentUser, navigate]);

  // If user is an admin, don't render regular app layout
  if (currentUser?.role === 'admin') {
    return null;
  }

  return (
    <div className="font-sans dark:bg-[#0a1120] transition-colors duration-300">
      <Helmet>
        <html lang="en" />
        <meta name="theme-color" content={darkMode ? "#0a1120" : "#ffffff"} />
        <meta name="description" content="MACHA - Everything at your doorstep @ single call. Your trusted local service partner in Choutuppal offering food & grocery delivery, technicians, event management and more." />
      </Helmet>

      {/* Skip to content link for keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#4dc8e7] focus:text-white focus:outline-none"
      >
        Skip to content
      </a>
      
      {/* Show navbar on regular pages, not on auth pages */}
      {!['/login', '/signup', '/forgot-password', '/book'].includes(location.pathname) && (
        <Navbar scrolled={scrolled} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}
      
      <main id="main-content">
        {children}
      </main>
      
      {/* Footer, not shown on auth pages */}
      {!['/login', '/signup', '/forgot-password'].includes(location.pathname) && (
        <Footer darkMode={darkMode} />
      )}
      
      {/* Toast notifications */}
      {toastMessage && (
        <div 
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg 
                   bg-white dark:bg-slate-800 border-l-4 
                   ${toastMessage.type === 'success' ? 'border-green-500' : 
                     toastMessage.type === 'error' ? 'border-red-500' : 'border-blue-500'}`}
        >
          {toastMessage.message}
        </div>
      )}
      
      {/* Back to top button */}
      <BackToTop />
      
      {/* Live Chat Widget */}
      <LiveChat />
    </div>
  );
};

export default AppLayout;