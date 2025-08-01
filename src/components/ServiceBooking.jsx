import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Check, 
  Clock, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  User, 
  ChevronDown, 
  ChevronUp,
  X, 
  AlertCircle,
  FileText,
  Building,
  Home,
  Navigation,
  Repeat
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LocationPicker from './LocationPicker';

const ServiceBooking = ({ isStandalone = false, onBack }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null); // Add this missing ref
  const markerRef = useRef(null);
  const locationInputRef = useRef(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [services, setServices] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phoneNumber || '',
    service: '',
    date: '',
    time: '',
    location: '',
    address: {
      street: '',
      landmark: '',
      area: '',
      pincode: ''
    },
    message: '',
  });
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState(true);
  const [userBookings, setUserBookings] = useState([]);
  const [showBookingHistory, setShowBookingHistory] = useState(false);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [showDuplicateConfirmation, setShowDuplicateConfirmation] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [trackingId, setTrackingId] = useState(null);
  
  // Define API URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Check if backend is available on component mount
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        await axios.get(`${API_BASE_URL}/health`, { timeout: 3000 });
        setBackendAvailable(true);
      } catch (err) {
        console.warn("Backend server unreachable:", err);
        setBackendAvailable(false);
      }
    };
    
    checkBackendStatus();
  }, [API_BASE_URL]);

  // Fetch available services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        // In a real app, fetch from API
        setServices([
          'AC Repair & Service',
          'Plumbing Services',
          'Electrical Work',
          'Technician Service',
          'Software Solutions',
          'Medical Sample Collection',
          'Package Delivery',
          'Other'
        ]);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Pre-fill form with user data when user logs in
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name || prev.name,
        email: currentUser.email || prev.email,
        phone: currentUser.phoneNumber || prev.phone
      }));
    }
  }, [currentUser]);

  // Generate time slots
  useEffect(() => {
    const generateTimeSlots = () => {
      const slots = [];
      for (let hour = 9; hour <= 20; hour++) {
        const formattedHour = hour > 12 ? hour - 12 : hour;
        const period = hour >= 12 ? 'PM' : 'AM';
        slots.push(`${formattedHour}:00 ${period}`);
        if (hour !== 20) { // Don't add 8:30 PM
          slots.push(`${formattedHour}:30 ${period}`);
        }
      }
      setTimeSlots(slots);
    };

    generateTimeSlots();
  }, []);

  // Fetch user's previous bookings
  useEffect(() => {
    const fetchUserBookings = async () => {
      // Only fetch if user is logged in
      if (!currentUser || !currentUser._id) return;
      
      try {
        setBookingsLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await axios.get(
          `${API_BASE_URL}/bookings/user-bookings?limit=5`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : undefined
            }
          }
        );
        
        if (response.data && response.data.success) {
          setUserBookings(response.data.bookings);
        }
      } catch (error) {
        console.warn('Could not fetch booking history:', error);
      } finally {
        setBookingsLoading(false);
      }
    };
    
    fetchUserBookings();
  }, [currentUser, API_BASE_URL]);

  // Initialize Google Maps with error handling - improved implementation
  useEffect(() => {
    // Only initialize map if it hasn't already been done
    if (window.mapAlreadyInitialized) return;
    
    // Create safety wrapper function for map initialization
    window.initGoogleMap = function() {
      try {
        window.mapAlreadyInitialized = true;
        
        if (!mapRef.current) return;
        
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: { lat: 17.3197, lng: 78.8714 }, // Default center (Choutuppal)
          zoom: 13,
          mapTypeControl: false,
        });
        
        mapInstanceRef.current = mapInstance;
        
        if (locationInputRef.current) {
          try {
            const autocomplete = new window.google.maps.places.Autocomplete(
              locationInputRef.current,
              { componentRestrictions: { country: ["in"] } }
            );
            
            autocomplete.addListener("place_changed", function() {
              try {
                const place = autocomplete.getPlace();
                if (!place || !place.geometry || !place.geometry.location) {
                  console.warn("Selected place missing geometry data");
                  return;
                }
                
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                
                setFormData(prev => ({
                  ...prev,
                  location: {
                    ...prev.location,
                    address: place.formatted_address || '',
                    coordinates: { lat, lng },
                  }
                }));
                
                mapInstance.setCenter({ lat, lng });
                mapInstance.setZoom(15);
                
                if (markerRef.current) {
                  markerRef.current.setPosition({ lat, lng });
                } else if (window.google && window.google.maps) {
                  markerRef.current = new window.google.maps.Marker({
                    position: { lat, lng },
                    map: mapInstance,
                    animation: window.google.maps.Animation.DROP
                  });
                }
              } catch (error) {
                console.error("Error processing place selection:", error);
              }
            });
          } catch (error) {
            console.error("Error initializing autocomplete:", error);
          }
        }
      } catch (error) {
        console.error("Error initializing Google Maps:", error);
      }
    };
  }, []);

  // Properly load the Google Maps script once
  useEffect(() => {
    // Skip if already loaded
    if (window.google && window.google.maps) {
      // If Google Maps is already loaded, just initialize the map
      if (typeof window.initGoogleMap === 'function') {
        window.initGoogleMap();
      }
      return;
    }
    
    // Check if script is already being loaded
    if (document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
      // If the script is loading but not ready yet, set up a callback to run when it's loaded
      const prevInitGoogleMap = window.initGoogleMap;
      window.initGoogleMap = function() {
        if (prevInitGoogleMap) prevInitGoogleMap();
        // Our map init code from the effect above
        if (window.google && window.google.maps && mapRef.current) {
          // Initialize our map instance
          try {
            const mapInstance = new window.google.maps.Map(mapRef.current, {
              center: { lat: 17.3197, lng: 78.8714 }, // Default center (Choutuppal)
              zoom: 13,
              mapTypeControl: false,
            });
            
            mapInstanceRef.current = mapInstance;
          } catch (error) {
            console.error("Error initializing map:", error);
          }
        }
      };
      return;
    }
    
    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!GOOGLE_MAPS_API_KEY) {
      console.error('Google Maps API key is missing from environment variables');
      return;
    }
    
    // Create a global init function
    window.initGoogleMap = function() {
      window.mapAlreadyInitialized = true;
      // Map initialization will happen in the other useEffect
    };
    
    // Load the script with correct parameters
    const script = document.createElement('script');
    // Use 'places' only, not 'geometry' as well
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&loading=async&callback=initGoogleMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
    return () => {
      // Don't remove the script on unmount as it might be needed by other components
      // Just clean up our specific handlers
      const oldInit = window.initGoogleMap;
      window.initGoogleMap = function() {
        if (oldInit && oldInit !== window.initGoogleMap) oldInit();
      };
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested address fields
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  // Handle location selection from the map
  const handleLocationSelect = (address, lat, lng) => {
    setFormData({
      ...formData,
      location: address
    });
    setCoordinates({
      lat,
      lng
    });
    setShowLocationModal(false);
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is not valid';
    if (!formData.phone) errors.phone = 'Phone number is required';
    if (!/^\d{10}$/.test(formData.phone)) errors.phone = 'Enter a valid 10-digit phone number';
    if (!formData.service) errors.service = 'Please select a service';
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.time) errors.time = 'Time slot is required';
    if (!formData.location) errors.location = 'Location is required';
    
    // Validate address fields
    if (!formData.address.street) errors['address.street'] = 'Street/House No. is required';
    if (!formData.address.area) errors['address.area'] = 'Area/Village is required';
    if (!formData.address.pincode) {
      errors['address.pincode'] = 'PIN code is required';
    } else if (!/^\d{6}$/.test(formData.address.pincode)) {
      errors['address.pincode'] = 'Enter a valid 6-digit PIN code';
    }
    
    return errors;
  };

  const handleSubmit = async (e, confirmDuplicate = false) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    
    try {
      // Validate form
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setIsSubmitting(false);
        return;
      }
      
      // Ensure location is properly formatted
      let locationData = formData.location;
      if (typeof formData.location === 'string') {
        // If location is a string, convert it to proper format
        locationData = {
          address: formData.location,
          coordinates: { lat: coordinates.lat || null, lng: coordinates.lng || null },
          details: {
            street: formData.address.street || '',
            landmark: formData.address.landmark || '',
            area: formData.address.area || '',
            pincode: formData.address.pincode || ''
          }
        };
      }
      
      // Prepare booking data
      const bookingData = {
        serviceType: formData.service,
        date: formData.date,
        timeSlot: formData.time,
        location: {
          address: typeof locationData === 'string' ? locationData : locationData.address,
          coordinates: coordinates,
          details: {
            street: formData.address.street || '',
            landmark: formData.address.landmark || '',
            area: formData.address.area || '',
            pincode: formData.address.pincode || ''
          }
        },
        additionalInfo: formData.message,
        allowDuplicate: confirmDuplicate
      };
      
      console.log('Sending booking data:', bookingData);
      
      // Get token
      const token = localStorage.getItem('token');
      if (!token) {
        setFormError('Please login to book a service');
        setIsSubmitting(false);
        navigate('/login');
        return;
      }
      
      // Send booking request
      const response = await axios.post(
        `${API_BASE_URL}/bookings`,
        bookingData,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      if (response.data && response.data.success) {
        setBookingSuccess(true);
        setBookingId(response.data.booking._id);
        setTrackingId(response.data.booking.trackingId);
        window.scrollTo(0, 0);
      } else {
        throw new Error(response.data?.message || 'Failed to create booking');
      }
    } catch (err) {
      console.error('Error submitting booking form:', err);
      if (err.response?.status === 409) {
        // Special handling for conflict errors - duplicate bookings
        setFormError('You already have a booking for this service and date. Would you like to book it anyway?');
        setShowDuplicateConfirmation(true);
      } else {
        setFormError(err.response?.data?.message || err.message || 'An error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute of date input
  const today = new Date().toISOString().split('T')[0];
  // Get date 30 days from today for max attribute
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <section 
      id="booking" 
      className={`${isStandalone ? 'pt-6' : 'section-padding'} ${
        isStandalone ? 'bg-gradient-to-br from-green-50 to-green-100' : 'bg-white'
      }`}
    >
      <div className="container-custom">
        {!isStandalone && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-green-600 font-semibold bg-green-600/10 px-4 py-1 rounded-full border border-green-600/20 inline-block mb-3"
            >
              Book our services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            >
              Schedule Your Service Today
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600"
            >
              Fill out the form below to request our services. Our team will get back to you promptly to confirm your booking.
            </motion.p>
          </div>
        )}
        
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          {bookingSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-2 border-green-500 rounded-xl p-8 mb-8 text-center shadow-lg"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                <Check size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-4">Your service request has been successfully submitted.</p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Tracking ID</p>
                    <p className="font-medium text-gray-800">{trackingId}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Service Type</p>
                    <p className="font-medium text-gray-800">{formData.service}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium text-gray-800">
                      {new Date(formData.date).toLocaleDateString()} at {formData.time}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Pending Confirmation
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                We have sent a confirmation email with all the details. 
                Our team will contact you shortly to confirm your booking.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => {
                    // Reset form
                    setBookingSuccess(false);
                    setFormData({
                      name: currentUser?.name || '',
                      email: currentUser?.email || '',
                      phone: currentUser?.phoneNumber || '',
                      service: '',
                      date: '',
                      time: '',
                      location: '',
                      address: {
                        street: '',
                        landmark: '',
                        area: '',
                        pincode: ''
                      },
                      message: '',
                    });
                    setTrackingId(null);
                    setBookingId(null);
                  }}
                  className="px-5 py-2 bg-white border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  Book Another Service
                </button>
                <Link
                  to="/dashboard"
                  className="px-5 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-400 transition-colors shadow-md shadow-green-600/20"
                >
                  Go to Dashboard
                </Link>
              </div>
            </motion.div>
          )}
        
          {/* Only show the form if booking isn't successful */}
          {!bookingSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${
                isStandalone ? 'bg-white shadow-xl' : 'bg-white shadow-lg'
              } p-8 rounded-xl border border-gray-100`}
            >
              {/* Success message */}
              {formSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg mb-6 p-4 flex items-start gap-3">
                  <Check size={24} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800 mb-1">Booking Submitted Successfully!</h4>
                    <p className="text-green-700">{formSuccess}</p>
                  </div>
                </div>
              )}

              {/* Warning for offline backend */}
              {!backendAvailable && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg mb-6 p-4 flex items-start gap-3">
                  <AlertCircle size={24} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800 mb-1">Booking System Temporarily Unavailable</h4>
                    <p className="text-amber-700">
                      Our booking system is currently offline. Please call us directly at <a href="tel:+918008330905" className="font-medium underline">+91 8008330905</a> to book your service.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Form error message */}
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                  <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                  <p>{formError}</p>
                </div>
              )}
              
              {/* Duplicate booking confirmation */}
              {showDuplicateConfirmation && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg mb-6">
                  <h4 className="font-medium flex items-center gap-2 mb-2">
                    <AlertCircle size={18} />
                    <span>Duplicate Booking Detected</span>
                  </h4>
                  <p className="mb-3">You already have a service booked for this date and time. Would you like to book it anyway?</p>
                  <div className="flex justify-end space-x-3">
                    <button 
                      type="button"
                      onClick={() => setShowDuplicateConfirmation(false)}
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button 
                      type="button"
                      onClick={async () => {
                        setShowDuplicateConfirmation(false);
                        await handleSubmit({ preventDefault: () => {} }, true);
                      }}
                      className="px-3 py-1.5 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                    >
                      Yes, Book Anyway
                    </button>
                  </div>
                </div>
              )}
              
              {/* Form content */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal information */}
                <div className="space-y-4">
                  <h3 className="text-gray-800 font-semibold text-xl pb-1 border-b border-gray-200">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                        Full Name*
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-white border ${
                            formErrors.name ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder:text-gray-400`}
                        />
                      </div>
                      {formErrors.name && (
                        <p className="mt-1 text-red-500 text-xs">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">
                        Phone Number*
                      </label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="Your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-white border ${
                            formErrors.phone ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder:text-gray-400`}
                          maxLength="10"
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="mt-1 text-red-500 text-xs">{formErrors.phone}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                        Email Address*
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Your email address"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-white border ${
                            formErrors.email ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder:text-gray-400`}
                        />
                      </div>
                      {formErrors.email && (
                        <p className="mt-1 text-red-500 text-xs">{formErrors.email}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Service Details */}
                <div className="space-y-4">
                  <h3 className="text-gray-800 font-semibold text-xl pb-1 border-b border-gray-200">Service Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="service" className="block text-gray-700 text-sm font-medium mb-2">
                        Service Required*
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FileText size={18} className="text-gray-400" />
                        </div>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-white border ${
                            formErrors.service ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 appearance-none`}
                        >
                          <option value="" disabled>Select a service</option>
                          {services.map((service, index) => (
                            <option key={index} value={service} className="text-gray-800">
                              {service}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDown size={18} className="text-gray-400" />
                        </div>
                      </div>
                      {formErrors.service && (
                        <p className="mt-1 text-red-500 text-xs">{formErrors.service}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-gray-700 text-sm font-medium mb-2">
                        Service Date*
                      </label>
                      <div className="relative">
                        <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          min={today}
                          max={maxDateString}
                          className={`w-full pl-10 pr-4 py-3 bg-white border ${
                            formErrors.date ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800`}
                        />
                      </div>
                      {formErrors.date && (
                        <p className="mt-1 text-red-500 text-xs">{formErrors.date}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="time" className="block text-gray-700 text-sm font-medium mb-2">
                        Preferred Time*
                      </label>
                      <div className="relative">
                        <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-white border ${
                            formErrors.time ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 appearance-none`}
                        >
                          <option value="" disabled>Select a time slot</option>
                          {timeSlots.map((slot, index) => (
                            <option key={index} value={slot} className="text-gray-800">
                              {slot}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDown size={18} className="text-gray-400" />
                        </div>
                      </div>
                      {formErrors.time && (
                        <p className="mt-1 text-red-500 text-xs">{formErrors.time}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Location Details */}
                <div className="text-black space-y-4">
                  <h3 className="text-gray-800 font-semibold text-xl pb-1 border-b border-gray-200">Location Details</h3>
                  
                  {/* Map location selector */}
                  <div>
                    <label htmlFor="location" className="block text-black text-sm font-medium mb-2">
                      Pin Your Location on Map*
                    </label>
                    <div className="text-black relative">
                      <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Choose your location on map"
                        value={formData.location}
                        readOnly
                        onClick={() => setShowLocationModal(true)}
                        className={`w-full pl-10 text-black pr-10 py-3 bg-gray-50 border ${
                          formErrors.location ? 'border-red-300' : 'border-gray-200'
                        } rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder:text-gray-400 cursor-pointer`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowLocationModal(true)}
                        className="absolute text-black right-2 top-1/2 -translate-y-1/2 bg-green-50 hover:bg-green-100 text-green-600 p-1.5 rounded-lg transition-all"
                        title="Choose location on map"
                      >
                        <Navigation size={16} />
                      </button>
                    </div>
                    {formErrors.location && (
                      <p className="mt-1 text-red-500 text-xs">{formErrors.location}</p>
                    )}
                    {coordinates.lat && coordinates.lng && (
                      <p className="mt-1 text-green-600 text-xs flex items-center">
                        <Check size={12} className="mr-1" /> Location selected successfully
                      </p>
                    )}
                  </div>
                  
                  {/* Address details */}
                  <div className="grid text-black grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="address.street" className="block text-gray-700 text-sm font-medium mb-2">
                        Street/House No.*
                      </label>
                      <div className="relative">
                        <Home size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="address.street"
                          name="address.street"
                          placeholder="House number and street name"
                          value={formData.address.street}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 text-black bg-white border ${
                            formErrors['address.street'] ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder:text-gray-400`}
                        />
                      </div>
                      {formErrors['address.street'] && (
                        <p className="mt-1 text-red-500 text-xs">{formErrors['address.street']}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="address.landmark" className="block text-gray-700 text-sm font-medium mb-2">
                        Landmark <span className="text-gray-500 text-xs">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Building size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="address.landmark"
                          name="address.landmark"
                          placeholder="Nearby landmark for easy identification"
                          value={formData.address.landmark}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address.area" className="block text-gray-700 text-sm font-medium mb-2">
                        Area/Village/Town*
                      </label>
                      <div className="relative">
                        <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="address.area"
                          name="address.area"
                          placeholder="Area, village or town name"
                          value={formData.address.area}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-white border ${
                            formErrors['address.area'] ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder:text-gray-400`}
                        />
                      </div>
                      {formErrors['address.area'] && (
                        <p className="mt-1 text-red-500 text-xs">{formErrors['address.area']}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="address.pincode" className="block text-gray-700 text-sm font-medium mb-2">
                        PIN Code*
                      </label>
                      <div className="relative">
                        <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="address.pincode"
                          name="address.pincode"
                          placeholder="6-digit PIN code"
                          value={formData.address.pincode}
                          onChange={handleInputChange}
                          maxLength="6"
                          className={`w-full pl-10 pr-4 py-3 bg-white border ${
                            formErrors['address.pincode'] ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder:text-gray-400`}
                        />
                      </div>
                      {formErrors['address.pincode'] && (
                        <p className="mt-1 text-red-500 text-xs">{formErrors['address.pincode']}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div>
                  <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">
                    Additional Information <span className="text-gray-500 text-xs">(Optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    placeholder="Provide any additional details or requirements for your service"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder:text-gray-400"
                  />
                </div>
                
                {/* Booking history section */}
                {currentUser && userBookings.length > 0 && (
                  <div className="mb-6">
                    <button
                      type="button"
                      onClick={() => setShowBookingHistory(!showBookingHistory)}
                      className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
                    >
                      {showBookingHistory ? (
                        <>
                          <ChevronUp size={16} />
                          <span>Hide booking history</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} />
                          <span>Show your previous bookings ({userBookings.length})</span>
                        </>
                      )}
                    </button>
                    
                    {showBookingHistory && (
                      <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="font-medium text-gray-800 mb-3">Your Previous Bookings</h4>
                        {bookingsLoading ? (
                          <div className="text-center py-3">Loading your bookings...</div>
                        ) : (
                          <div className="space-y-3">
                            {userBookings.map(booking => (
                              <div 
                                key={booking._id} 
                                className="bg-white p-3 rounded border border-gray-200 flex justify-between items-center hover:border-green-300 cursor-pointer"
                                onClick={() => {
                                  // Pre-fill form with this booking's details (except date/time)
                                  setFormData({
                                    ...formData,
                                    service: booking.serviceType,
                                    location: booking.location.address,
                                    address: {
                                      street: booking.location.details?.street || '',
                                      landmark: booking.location.details?.landmark || '',
                                      area: booking.location.details?.area || '',
                                      pincode: booking.location.details?.pincode || ''
                                    },
                                    message: formData.message || booking.additionalInfo,
                                  });
                                  
                                  setCoordinates({
                                    lat: booking.location.coordinates?.lat || null,
                                    lng: booking.location.coordinates?.lng || null
                                  });
                                  
                                  setShowBookingHistory(false);
                                }}
                              >
                                <div>
                                  <div className="text-sm font-medium">{booking.serviceType}</div>
                                  <div className="text-xs text-gray-500">
                                    {new Date(booking.date).toLocaleDateString()} • {booking.timeSlot}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                                    booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                    booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {booking.status}
                                  </span>
                                  <button className="p-1 bg-gray-100 rounded hover:bg-gray-200">
                                    <Repeat size={14} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Form error message */}
                {formErrors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <p>{formErrors.submit}</p>
                  </div>
                )}
                
                {/* Submit button */}
                <button
                  type="submit"
                  disabled={formSubmitting || !backendAvailable}
                  className="w-full py-3.5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all font-medium shadow-lg shadow-green-500/20 transform hover:translate-y-[-2px] hover:shadow-xl hover:shadow-green-500/20"
                >
                  {formSubmitting ? (
                    <>
                      <span className="animate-spin inline-block h-5 w-5 border-2 border-white/20 border-t-white rounded-full mr-2"></span>
                      Processing...
                    </>
                  ) : (
                    <>Book Service Now</>
                  )}
                </button>
                
                <p className="text-center text-gray-500 text-xs">
                  By submitting this form, you agree to our <a href="#" className="text-green-600 hover:underline">Terms of Service</a> and <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>.
                </p>
              </form>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Location Picker Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-200 shadow-2xl">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-green-500 to-green-600">
              <h3 className="text-white text-lg font-semibold">Choose Your Exact Location</h3>
              <button 
                onClick={() => setShowLocationModal(false)} 
                className="text-white/90 hover:text-white bg-white/10 rounded-lg p-2 hover:bg-white/20 transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <LocationPicker 
                onSelectLocation={handleLocationSelect} 
                initialLocation={coordinates.lat && coordinates.lng ? coordinates : null}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceBooking;