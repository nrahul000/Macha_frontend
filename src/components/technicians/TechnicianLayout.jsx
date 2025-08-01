import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TechnicianNavbar from './TechnicianNavbar';
import TechnicianFooter from './TechnicianFooter';

const TechnicianLayout = () => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <TechnicianNavbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <TechnicianFooter />
    </div>
  );
};

export default TechnicianLayout;
