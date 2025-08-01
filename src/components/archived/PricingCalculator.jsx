import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, ShoppingCart, Wrench, Download, Calendar, Info } from 'lucide-react';

const PricingCalculator = () => {
  const [serviceType, setServiceType] = useState('delivery');
  const [distance, setDistance] = useState(2);
  const [weight, setWeight] = useState(1);
  const [urgency, setUrgency] = useState('standard');
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [technicianType, setTechnicianType] = useState('electrician');
  const [serviceDuration, setServiceDuration] = useState(1);
  const [itemCount, setItemCount] = useState(5);
  const [eventGuests, setEventGuests] = useState(25);
  
  const serviceTypes = [
    { id: 'delivery', name: 'Delivery Service', icon: <Truck size={24} /> },
    { id: 'technician', name: 'Technician Service', icon: <Wrench size={24} /> },
    { id: 'shopping', name: 'Shopping Service', icon: <ShoppingCart size={24} /> },
    { id: 'event', name: 'Event Management', icon: <Calendar size={24} /> },
  ];
  
  const technicianTypes = [
    'Electrician',
    'Plumber',
    'Carpenter',
    'Mechanic',
    'Painter',
    'AC Technician'
  ];

  useEffect(() => {
    calculatePrice();
  }, [serviceType, distance, weight, urgency, technicianType, serviceDuration, itemCount, eventGuests]);

  const calculatePrice = () => {
    let price = 0;
    
    switch(serviceType) {
      case 'delivery':
        // Base price + distance fee + weight fee + urgency fee
        price = 30 + (distance * 10) + (weight * 5);
        if (urgency === 'express') price *= 1.5;
        break;
        
      case 'technician':
        // Base price depends on technician type + duration fee
        const techRates = {
          'electrician': 200,
          'plumber': 250,
          'carpenter': 300,
          'mechanic': 350,
          'painter': 250,
          'ac technician': 400
        };
        
        price = (techRates[technicianType.toLowerCase()] || 250) * serviceDuration;
        if (urgency === 'express') price += 100;
        break;
        
      case 'shopping':
        // Base price + item count fee + distance fee
        price = 50 + (itemCount * 10) + (distance * 10);
        if (urgency === 'express') price *= 1.3;
        break;
        
      case 'event':
        // Base price depends on guest count
        price = 1000 + (eventGuests * 50);
        // For express bookings (less than 3 days notice)
        if (urgency === 'express') price *= 1.4;
        break;
        
      default:
        price = 0;
    }
    
    // Round to whole rupee
    setEstimatedPrice(Math.round(price));
  };
  
  // Function to handle the download of a PDF quote
  const handleDownloadQuote = () => {
    // In a real application, you would generate a PDF here
    alert('In a production environment, this would generate and download a detailed quote as PDF.');
  };
  
  // Function to format price with Indian Rupee symbol
  const formatPrice = (price) => {
    return `₹${price}`;
  };

  return (
    <section id="pricing" className="section-padding bg-[#0c162a]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="px-5 py-2 rounded-full bg-[#111c30] text-[#4dc8e7] text-sm font-medium inline-block mb-5 border border-[#1e304d]">PRICING ESTIMATE</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Service <span className="text-[#4dc8e7]">Calculator</span></h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Get an instant estimate for our services based on your requirements.
          </p>
        </motion.div>
        
        <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator inputs */}
            <div>
              <div className="mb-6">
                <label className="block text-slate-300 mb-3 text-sm font-medium">Select Service Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {serviceTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setServiceType(type.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                        serviceType === type.id 
                          ? 'bg-[#4dc8e7]/20 border-[#4dc8e7]/50 text-[#4dc8e7]' 
                          : 'bg-[#111c30] border-[#1e304d] text-slate-300 hover:bg-[#1c2c44]'
                      } transition-all`}
                    >
                      <div className="mb-2">{type.icon}</div>
                      <span className="text-sm text-center">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Dynamic form fields based on service type */}
              {serviceType === 'delivery' && (
                <>
                  <div className="mb-6">
                    <label className="block text-slate-300 mb-2 text-sm font-medium">
                      Delivery Distance (km)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={distance}
                      onChange={(e) => setDistance(parseInt(e.target.value))}
                      className="w-full h-2 bg-[#111c30] rounded-lg appearance-none cursor-pointer accent-[#4dc8e7]"
                    />
                    <div className="flex justify-between text-sm text-slate-400 mt-1">
                      <span>1 km</span>
                      <span>{distance} km</span>
                      <span>10 km</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-slate-300 mb-2 text-sm font-medium">
                      Package Weight (kg)
                    </label>
                    <div className="flex items-center">
                      <button
                        onClick={() => setWeight(Math.max(1, weight - 0.5))}
                        className="px-3 py-2 bg-[#111c30] border border-[#1e304d] rounded-l-lg text-white"
                        aria-label="Decrease weight by 0.5 kg"
                      >
                        -
                      </button>
                      <div className="px-4 py-2 bg-[#1c2c44] border-t border-b border-[#1e304d] text-white min-w-[80px] text-center">
                        {weight} kg
                      </div>
                      <button
                        onClick={() => setWeight(Math.min(10, weight + 0.5))}
                        className="px-3 py-2 bg-[#111c30] border border-[#1e304d] rounded-r-lg text-white"
                        aria-label="Increase weight by 0.5 kg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </>
              )}
              
              {serviceType === 'technician' && (
                <>
                  <div className="mb-6">
                    <label className="block text-slate-300 mb-2 text-sm font-medium">
                      Technician Type
                    </label>
                    <select
                      value={technicianType}
                      onChange={(e) => setTechnicianType(e.target.value)}
                      className="w-full px-4 py-3 bg-[#111c30] border border-[#1e304d] rounded-lg text-white appearance-none"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em", paddingRight: "2.5rem" }}
                    >
                      {technicianTypes.map(type => (
                        <option key={type} value={type.toLowerCase()}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-slate-300 mb-2 text-sm font-medium">
                      Service Duration (hours)
                    </label>
                    <div className="flex items-center">
                      <button
                        onClick={() => setServiceDuration(Math.max(1, serviceDuration - 1))}
                        className="px-3 py-2 bg-[#111c30] border border-[#1e304d] rounded-l-lg text-white"
                      >
                        -
                      </button>
                      <div className="px-4 py-2 bg-[#1c2c44] border-t border-b border-[#1e304d] text-white min-w-[80px] text-center">
                        {serviceDuration} hr{serviceDuration > 1 ? 's' : ''}
                      </div>
                      <button
                        onClick={() => setServiceDuration(Math.min(8, serviceDuration + 1))}
                        className="px-3 py-2 bg-[#111c30] border border-[#1e304d] rounded-r-lg text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </>
              )}
              
              {serviceType === 'shopping' && (
                <div className="mb-6">
                  <label className="block text-slate-300 mb-2 text-sm font-medium">
                    Number of Items
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={() => setItemCount(Math.max(1, itemCount - 1))}
                      className="px-3 py-2 bg-[#111c30] border border-[#1e304d] rounded-l-lg text-white"
                    >
                      -
                    </button>
                    <div className="px-4 py-2 bg-[#1c2c44] border-t border-b border-[#1e304d] text-white min-w-[80px] text-center">
                      {itemCount} items
                    </div>
                    <button
                      onClick={() => setItemCount(Math.min(30, itemCount + 1))}
                      className="px-3 py-2 bg-[#111c30] border border-[#1e304d] rounded-r-lg text-white"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Grocery items, medicines, etc.</p>
                </div>
              )}
              
              {serviceType === 'event' && (
                <div className="mb-6">
                  <label className="block text-slate-300 mb-2 text-sm font-medium">
                    Number of Guests
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={eventGuests}
                    onChange={(e) => setEventGuests(parseInt(e.target.value))}
                    className="w-full h-2 bg-[#111c30] rounded-lg appearance-none cursor-pointer accent-[#4dc8e7]"
                  />
                  <div className="flex justify-between text-sm text-slate-400 mt-1">
                    <span>10 guests</span>
                    <span>{eventGuests} guests</span>
                    <span>200 guests</span>
                  </div>
                </div>
              )}
              
              {/* Common field: Urgency */}
              <div className="mb-6">
                <label className="block text-slate-300 mb-2 text-sm font-medium">
                  Service Priority
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setUrgency('standard')}
                    className={`p-3 rounded-lg border ${
                      urgency === 'standard' 
                        ? 'bg-[#4dc8e7]/20 border-[#4dc8e7]/50 text-[#4dc8e7]' 
                        : 'bg-[#111c30] border-[#1e304d] text-slate-300 hover:bg-[#1c2c44]'
                    } transition-all text-center`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setUrgency('express')}
                    className={`p-3 rounded-lg border ${
                      urgency === 'express' 
                        ? 'bg-[#4dc8e7]/20 border-[#4dc8e7]/50 text-[#4dc8e7]' 
                        : 'bg-[#111c30] border-[#1e304d] text-slate-300 hover:bg-[#1c2c44]'
                    } transition-all text-center`}
                  >
                    Express
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Express services have priority but cost more.
                </p>
              </div>
            </div>
            
            {/* Estimated price and details */}
            <div className="bg-[#111c30] rounded-xl p-6 border border-[#1e304d]">
              <h3 className="text-xl font-bold text-white mb-4">Price Estimate</h3>
              
              <div className="mb-6">
                <div className="flex justify-between mb-4">
                  <span className="text-slate-300">Base Charge:</span>
                  <span className="text-white font-medium">
                    {serviceType === 'delivery' && formatPrice(30)}
                    {serviceType === 'technician' && formatPrice((technicianType === 'electrician' ? 200 : 250) * serviceDuration)}
                    {serviceType === 'shopping' && formatPrice(50)}
                    {serviceType === 'event' && formatPrice(1000)}
                  </span>
                </div>
                
                {serviceType === 'delivery' && (
                  <>
                    <div className="flex justify-between mb-4">
                      <span className="text-slate-300">Distance Cost:</span>
                      <span className="text-white">{formatPrice(distance * 10)}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-slate-300">Weight Cost:</span>
                      <span className="text-white">{formatPrice(weight * 5)}</span>
                    </div>
                  </>
                )}
                
                {serviceType === 'shopping' && (
                  <>
                    <div className="flex justify-between mb-4">
                      <span className="text-slate-300">Items Cost:</span>
                      <span className="text-white">{formatPrice(itemCount * 10)}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-slate-300">Distance Cost:</span>
                      <span className="text-white">{formatPrice(distance * 10)}</span>
                    </div>
                  </>
                )}
                
                {serviceType === 'event' && (
                  <div className="flex justify-between mb-4">
                    <span className="text-slate-300">Guests Cost:</span>
                    <span className="text-white">{formatPrice(eventGuests * 50)}</span>
                  </div>
                )}
                
                {urgency === 'express' && (
                  <div className="flex justify-between mb-4">
                    <span className="text-slate-300">Express Fee:</span>
                    <span className="text-white">
                      {serviceType === 'technician' 
                        ? formatPrice(100) 
                        : (serviceType === 'delivery' 
                            ? formatPrice(Math.round((30 + distance * 10 + weight * 5) * 0.5))
                            : serviceType === 'shopping' 
                              ? formatPrice(Math.round((50 + itemCount * 10 + distance * 10) * 0.3))
                              : formatPrice(Math.round((1000 + eventGuests * 50) * 0.4))
                          )
                      }
                    </span>
                  </div>
                )}
                
                <div className="border-t border-[#1e304d] pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg text-white font-medium">Total Estimate:</span>
                    <span className="text-2xl text-[#4dc8e7] font-bold">{formatPrice(estimatedPrice)}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    This is an estimate only. Final price may vary based on actual service requirements.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleDownloadQuote}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1c2c44] hover:bg-[#283a59] text-white rounded-lg transition-all"
                >
                  <Download size={18} />
                  Download Detailed Quote
                </button>
                
                <a
                  href="#booking"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#4dc8e7] hover:bg-[#3bb5d4] text-white rounded-lg transition-all text-center"
                  onClick={() => {
                    // Pre-populate booking form with calculator selections
                    if (window.setBookingDetails) {
                      window.setBookingDetails({
                        serviceType: serviceType,
                        price: estimatedPrice
                      });
                    }
                  }}
                >
                  Book This Service
                </a>
              </div>
              
              <div className="mt-6 flex items-start gap-2 bg-[#1c2c44] p-4 rounded-lg">
                <Info size={18} className="text-[#4dc8e7] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300">
                  This calculator provides an estimate based on your inputs. For a more accurate quote, please contact us directly or use the booking form.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;