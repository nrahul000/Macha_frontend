import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Hero from '../components/Hero';
import About from '../components/About';
import Contact from '../components/Contact';
import ServiceFilter from '../components/ServiceFilter';
import ServiceAreaMap from '../components/ServiceAreaMap';

// Main component for the homepage
const HomePage = ({ darkMode }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Redirect admin users to admin dashboard when they try to access the homepage
  useEffect(() => {
    if (currentUser?.role === 'admin') {
      navigate('/admin', { replace: true });
    }
  }, [currentUser, navigate]);

  // If user is an admin, show minimal content during redirect
  if (currentUser?.role === 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to admin dashboard...</p>
          <div className="mt-4 w-16 h-16 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero darkMode={darkMode} />
      <About darkMode={darkMode} />
      <ServiceFilter darkMode={darkMode} />
      <ServiceAreaMap />
      <Contact darkMode={darkMode} />
    </>
  );
};

export default HomePage;
