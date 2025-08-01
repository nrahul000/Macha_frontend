import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Check, Truck, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ServiceTracking = () => {
  const [trackingId, setTrackingId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState(null);
  const [error, setError] = useState(null);
  
  // Demo tracking statuses for different services
  const demoTrackingData = {
    'MACHA123456': {
      id: 'MACHA123456',
      customerName: 'Rahul Sharma',
      serviceType: 'Food Delivery',
      status: 'in_progress',
      createdAt: '2023-09-25T10:30:00',
      estimatedCompletion: '2023-09-25T11:15:00',
      currentStep: 2,
      steps: [
        { name: 'Order Received', completed: true, time: '10:30 AM' },
        { name: 'Preparing Food', completed: true, time: '10:45 AM' },
        { name: 'Out for Delivery', completed: false, time: null },
        { name: 'Delivered', completed: false, time: null }
      ]
    },
    'MACHA789012': {
      id: 'MACHA789012',
      customerName: 'Priya Reddy',
      serviceType: 'Technician Service',
      status: 'scheduled',
      createdAt: '2023-09-24T14:20:00',
      estimatedCompletion: '2023-09-26T11:00:00',
      currentStep: 1,
      steps: [
        { name: 'Request Received', completed: true, time: 'Sep 24, 2:20 PM' },
        { name: 'Technician Assigned', completed: false, time: null },
        { name: 'En Route', completed: false, time: null },
        { name: 'Service Completed', completed: false, time: null }
      ]
    },
    'MACHA345678': {
      id: 'MACHA345678',
      customerName: 'Vikram Singh',
      serviceType: 'Groceries',
      status: 'completed',
      createdAt: '2023-09-25T09:00:00',
      completedAt: '2023-09-25T10:20:00',
      currentStep: 4,
      steps: [
        { name: 'Order Received', completed: true, time: '9:00 AM' },
        { name: 'Shopping in Progress', completed: true, time: '9:15 AM' },
        { name: 'Out for Delivery', completed: true, time: '9:45 AM' },
        { name: 'Delivered', completed: true, time: '10:20 AM' }
      ]
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setTrackingResult(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Demo tracking lookup
      if (demoTrackingData[trackingId]) {
        setTrackingResult(demoTrackingData[trackingId]);
      } else {
        setError('No service request found with this tracking ID. Please check and try again.');
      }
    } catch (err) {
      setError('An error occurred while fetching your tracking information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500';
      case 'in_progress':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled':
        return 'Scheduled';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };
  
  // Check for stored tracking ID on component mount
  useEffect(() => {
    const storedTrackingId = sessionStorage.getItem('latestTrackingId');
    if (storedTrackingId) {
      setTrackingId(storedTrackingId);
    }
  }, []);
  
  // Demo tracking IDs for easy access
  const demoIds = [
    { id: 'MACHA123456', type: 'Food Delivery (In Progress)' },
    { id: 'MACHA789012', type: 'Technician (Scheduled)' },
    { id: 'MACHA345678', type: 'Groceries (Completed)' }
  ];

  return (
    <section id="tracking" className="section-padding bg-[#0a1120]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="px-5 py-2 rounded-full bg-[#111c30] text-[#4dc8e7] text-sm font-medium inline-block mb-5 border border-[#1e304d]">SERVICE TRACKING</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Track Your <span className="text-[#4dc8e7]">Request</span></h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Enter your tracking ID to check the status of your service request.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto mb-10">
          <form onSubmit={handleSubmit} className="bg-[#111c30] p-6 rounded-xl border border-[#1e304d] shadow-lg">
            <div className="mb-6">
              <label htmlFor="trackingId" className="block text-slate-300 mb-2 text-sm font-medium">
                Tracking ID*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Package size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  id="trackingId"
                  placeholder="e.g., MACHA123456"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#0a1120] border border-[#1e304d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4dc8e7] text-white placeholder:text-slate-500"
                />
              </div>
              <div className="flex items-start gap-2 mt-2">
                <Info size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400">
                  Your tracking ID was sent to you via SMS and email when your service was booked.
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="phone" className="block text-slate-300 mb-2 text-sm font-medium">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400">+91</span>
                </div>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter phone number for verification"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-16 pr-4 py-3 bg-[#0a1120] border border-[#1e304d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4dc8e7] text-white placeholder:text-slate-500"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !trackingId}
              className="w-full py-3 bg-[#4dc8e7] hover:bg-[#3bb5d4] text-white rounded-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin inline-block h-4 w-4 border-2 border-white/20 border-t-white rounded-full"></span>
                  Tracking...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Track Request
                </>
              )}
            </button>
          </form>
        </div>
        
        {/* Tracking Result */}
        {trackingResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-[#111c30] p-6 rounded-xl border border-[#1e304d] shadow-lg"
          >
            <div className="flex justify-between items-start mb-6 pb-4 border-b border-[#1e304d]">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{trackingResult.serviceType}</h3>
                <p className="text-sm text-slate-400">Tracking ID: {trackingResult.id}</p>
                <p className="text-sm text-slate-400">Customer: {trackingResult.customerName}</p>
              </div>
              <div className="flex items-center">
                <span className={`h-3 w-3 rounded-full mr-2 ${getStatusColor(trackingResult.status)}`}></span>
                <span className="text-sm font-semibold text-white">{getStatusText(trackingResult.status)}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-4">Progress Tracker</h4>
              <div className="relative">
                {/* Progress line */}
                <div className="absolute left-4 top-0 w-px h-full bg-[#1e304d]"></div>
                
                {/* Steps */}
                {trackingResult.steps.map((step, index) => (
                  <div key={index} className="relative flex mb-6 last:mb-0">
                    <div className={`z-10 flex items-center justify-center w-8 h-8 rounded-full ${
                      step.completed 
                        ? 'bg-[#4dc8e7] text-white' 
                        : 'bg-[#1c2c44] text-slate-400'
                    }`}>
                      {step.completed ? <Check size={16} /> : index + 1}
                    </div>
                    <div className="ml-4">
                      <p className={`font-medium ${step.completed ? 'text-white' : 'text-slate-400'}`}>
                        {step.name}
                      </p>
                      {step.time && (
                        <p className="text-xs text-slate-500 mt-1">{step.time}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#1c2c44] p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-[#283a59] p-2 rounded-lg">
                  {trackingResult.status === 'completed' ? (
                    <CheckCircle size={24} className="text-green-400" />
                  ) : (
                    <Truck size={24} className="text-[#4dc8e7]" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">
                    {trackingResult.status === 'completed' 
                      ? 'Service Completed' 
                      : trackingResult.status === 'in_progress'
                        ? 'Estimated Completion'
                        : 'Scheduled For'
                    }
                  </h4>
                  <p className="text-slate-300">
                    {trackingResult.status === 'completed' 
                      ? formatDate(trackingResult.completedAt)
                      : formatDate(trackingResult.estimatedCompletion)
                    }
                  </p>
                  {trackingResult.status === 'in_progress' && (
                    <p className="text-xs text-slate-400 mt-1">
                      Your request is currently being processed.
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-400 mb-2">Need help with this service request?</p>
              <div className="flex justify-center gap-3">
                <a 
                  href="tel:+918008330905"
                  className="px-4 py-2 bg-[#1c2c44] hover:bg-[#283a59] text-white rounded-lg text-sm transition-colors"
                >
                  Call Support
                </a>
                <a 
                  href="https://wa.me/919177541947"
                  className="px-4 py-2 bg-[#1c2c44] hover:bg-[#283a59] text-white rounded-lg text-sm transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-white flex items-start gap-3"
          >
            <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
            <div>
              <p className="font-medium">Tracking Error</p>
              <p className="text-sm text-red-300">{error}</p>
            </div>
          </motion.div>
        )}
        
        {/* Demo tracking IDs */}
        <div className="mt-10 max-w-3xl mx-auto bg-[#0c162a]/50 p-4 rounded-xl">
          <p className="text-sm text-slate-300 mb-3 text-center">
            <span className="text-[#4dc8e7]">Demo:</span> Try these tracking IDs for testing
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            {demoIds.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setTrackingId(item.id);
                  setTrackingResult(null);
                  setError(null);
                  
                  // Auto submit after a brief delay
                  setTimeout(() => {
                    document.querySelector('form button[type="submit"]').click();
                  }, 500);
                }}
                className="bg-[#111c30] p-3 rounded-lg border border-[#1e304d] hover:border-[#4dc8e7]/50 transition-colors"
                aria-label={`Load demo tracking ID ${item.id}`}
              >
                <span className="text-sm text-white font-medium block mb-1">{item.id}</span>
                <p className="text-xs text-slate-400">{item.type}</p>
              </button>
            ))}
          </div>
          
          {/* Add help text for real vs demo tracking */}
          <p className="text-xs text-slate-400 mt-4 text-center">
            For real bookings, your tracking ID will be provided after submitting the booking form.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceTracking;
