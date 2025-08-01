import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  MessageCircle,
  Phone,
  RefreshCw,
  Copy
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const BookingDetailPage = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Navigation handler function - FIXED to ensure it navigates to bookings page
  const handleBackToBookings = () => {
    navigate('/bookings');
  };
  
  // Fetch booking details - correct endpoint
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        console.log("Fetching booking with ID:", bookingId); // Debug logging
        
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }
        
        // FIXED: Use the correct endpoint for user-bookings
        const response = await axios.get(
          `${API_BASE_URL}/bookings/user-bookings/${bookingId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        console.log("API Response:", response.data); // Debug logging
        
        if (response.data && response.data.success && response.data.booking) {
          setBooking(response.data.booking);
          setError(null);
        } else {
          throw new Error('Failed to fetch booking details');
        }
      } catch (err) {
        console.error('Error fetching booking details:', err);
        
        // More detailed error reporting
        let errorMessage = 'Failed to load booking details. ';
        
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error response:', err.response.data);
          console.error('Error status:', err.response.status);
          
          if (err.response.status === 404) {
            errorMessage += 'The booking was not found. It may have been deleted or you may not have permission to view it.';
          } else if (err.response.status === 403) {
            errorMessage += 'You do not have permission to view this booking.';
          } else {
            errorMessage += err.response.data?.message || 'An unexpected error occurred.';
          }
        } else if (err.request) {
          // The request was made but no response was received
          console.error('Error request:', err.request);
          errorMessage += 'Could not connect to the server. Please check your internet connection.';
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', err.message);
          errorMessage += err.message;
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId, navigate, API_BASE_URL]);

  // Copy tracking ID to clipboard
  const copyTrackingId = () => {
    if (!booking || !booking.trackingId) return;
    
    navigator.clipboard.writeText(booking.trackingId)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy tracking ID:', err));
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} />;
      case 'confirmed':
        return <Info size={20} />;
      case 'completed':
        return <CheckCircle size={20} />;
      case 'cancelled':
        return <XCircle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  // Book again functionality
  const bookAgain = () => {
    if (!booking) return;
    
    // Navigate to booking page with pre-filled data
    navigate('/book', { 
      state: { 
        prefill: {
          service: booking.serviceType,
          location: booking.location?.address,
          coordinates: booking.location?.coordinates,
          locationDetails: booking.location?.details,
          additionalInfo: booking.additionalInfo
        } 
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 pt-20 pb-12 px-4">
      <Helmet>
        <title>Booking Details | MACHA Services</title>
      </Helmet>

      <div className="max-w-3xl mx-auto">
        {/* Back button with correct navigation handler */}
        <button 
          onClick={handleBackToBookings}
          className="flex items-center gap-2 text-white mb-6 group hover:text-green-300 transition-colors"
        >
          <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to all bookings</span>
        </button>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-8 text-center">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Error Loading Booking</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            {/* Also update this button to use the navigate function */}
            <button
              onClick={handleBackToBookings}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Back to all Bookings
            </button>
          </div>
        ) : booking ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-600 to-green-700">
              <div className="flex flex-wrap justify-between items-center">
                <h1 className="text-2xl font-bold text-white mb-2 md:mb-0">{booking.serviceType}</h1>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusBadgeClass(booking.status)}`}>
                  {getStatusIcon(booking.status)}
                  <span>{booking.status}</span>
                </span>
              </div>
              <div className="mt-2 text-green-100 flex items-center gap-2">
                <span>Tracking ID: {booking.trackingId || 'N/A'}</span>
                {booking.trackingId && (
                  <button 
                    onClick={copyTrackingId}
                    className="p-1 rounded bg-white/20 hover:bg-white/30 transition-colors"
                    title="Copy tracking ID"
                  >
                    {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                  </button>
                )}
              </div>
            </div>

            {/* Booking details */}
            <div className="p-6">
              <div className="grid text-black grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date and time */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-3">Service Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar size={20} className="text-green-600" />
                      <div>
                        <div className="text-sm text-gray-500">Date</div>
                        <div className="font-medium">{booking.date ? formatDate(booking.date) : 'N/A'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={20} className="text-green-600" />
                      <div>
                        <div className="text-sm text-gray-500">Time Slot</div>
                        <div className="font-medium">{booking.timeSlot || 'N/A'}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="text-green-600" />
                      <div>
                        <div className="text-sm text-gray-500">Service Location</div>
                        <div className="font-medium">{booking.location?.address || 'N/A'}</div>
                        {booking.location?.details && (
                          <div className="text-sm text-gray-600 mt-1">
                            {booking.location.details.street && <div>{booking.location.details.street}</div>}
                            {booking.location.details.landmark && <div>Landmark: {booking.location.details.landmark}</div>}
                            {booking.location.details.area && booking.location.details.pincode && (
                              <div>{booking.location.details.area}, {booking.location.details.pincode}</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Booking info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-3">Booking Information</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500">Booking Number</div>
                      <div className="font-medium">#{booking.bookingNumber || booking._id?.substring(0, 8) || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Created On</div>
                      <div className="font-medium">{booking.createdAt ? new Date(booking.createdAt).toLocaleString() : 'N/A'}</div>
                    </div>
                    {booking.additionalInfo && (
                      <div>
                        <div className="text-sm text-gray-500">Additional Information</div>
                        <div className="font-medium">{booking.additionalInfo}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Booking status timeline */}
              <div className="mt-8 text-black bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-3">Booking Timeline</h3>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-6 relative pl-12">
                    <div>
                      <div className="absolute left-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                        <CheckCircle size={16} />
                      </div>
                      <div className="font-medium">Booking Created</div>
                      <div className="text-sm text-gray-500">{booking.createdAt ? new Date(booking.createdAt).toLocaleString() : 'N/A'}</div>
                    </div>
                    
                    {booking.status !== 'pending' && (
                      <div>
                        <div className={`absolute left-0 flex items-center justify-center w-8 h-8 rounded-full ${
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {booking.status === 'cancelled' ? <XCircle size={16} /> : <Info size={16} />}
                        </div>
                        <div className="font-medium">
                          {booking.status === 'confirmed' ? 'Booking Confirmed' : 
                           booking.status === 'completed' ? 'Service Completed' : 
                           'Booking Cancelled'}
                        </div>
                        <div className="text-sm text-gray-500">{booking.updatedAt ? new Date(booking.updatedAt).toLocaleString() : 'N/A'}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-4 justify-between">
                <div>
                  {booking.status === 'pending' && (
                    <button className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                      Cancel Booking
                    </button>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={bookAgain}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw size={16} />
                    <span>Book Again</span>
                  </button>
                  
                  <a
                    href="tel:+918008330905"
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2"
                  >
                    <Phone size={16} />
                    <span>Contact Support</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-8 text-center">
            <AlertCircle size={48} className="mx-auto text-amber-500 mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">No Booking Found</h2>
            <p className="text-gray-600 mb-6">We couldn't find the booking you're looking for.</p>
            {/* Also update this button to use the navigate function */}
            <button
              onClick={handleBackToBookings}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetailPage;
