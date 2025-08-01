import React from 'react';
import ServiceFilter from '../components/ServiceFilter';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ServicesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ServiceFilter />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
