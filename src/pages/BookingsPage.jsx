import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Search,
  Filter, 
  AlertCircle,
  RefreshCw,
  CheckCircle,
  Plus,
  XCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Fetch user's bookings when filters or pagination change
  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Only fetch if we have a user
    fetchBookings();
    
  }, [currentUser, navigate, currentPage]); // Remove statusFilter and searchTerm from dependencies

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication required. Please login again.');
        setLoading(false);
        return;
      }
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', 10);
      
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      
      const response = await axios.get(
        `${API_BASE_URL}/bookings/user-bookings?${params.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data && response.data.success) {
        setBookings(response.data.bookings);
        setTotalPages(response.data.pagination.pages);
        setError(null);
      } else {
        throw new Error('Failed to fetch bookings');
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.response?.data?.message || 'Failed to load your bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Modified to trigger immediate search without requiring form submission
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Modified to ensure form submission properly triggers a search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBookings(); // Explicitly call fetchBookings here instead of relying on useEffect
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when changing filter
    setTimeout(() => fetchBookings(), 0); // Explicitly fetch bookings after state update
  };

  const handleRefresh = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCurrentPage(1);
    setTimeout(() => fetchBookings(), 0); // Explicitly fetch bookings after state update
  };

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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <Helmet>
        <title>My Bookings | MACHA Services</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-green-700 mb-6 group">
          <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to home</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-600 to-green-700 flex flex-wrap justify-between items-center">
            <h1 className="text-2xl font-bold text-white mb-2 md:mb-0">My Bookings</h1>
            <Link 
              to="/book" 
              className="inline-flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
            >
              <Plus size={18} />
              <span>Book New Service</span>
            </Link>
          </div>

          <div className="p-6">
            {/* Filters and search */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusFilterChange(status)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${
                      statusFilter === status
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              
              <form onSubmit={handleSearchSubmit} className="flex">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search bookings..."
                    className="pl-9 pr-4 py-1.5 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-3 py-1.5 rounded-r-lg hover:bg-green-700"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2 mb-6">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Bookings list */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div 
                    key={booking._id} 
                    className="bg-white rounded-lg border border-gray-200 hover:border-green-200 overflow-hidden shadow-sm transition-all hover:shadow"
                  >
                    <div className="p-4 md:p-5">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <h3 className="font-medium text-lg text-gray-900">{booking.serviceType}</h3>
                          <div className="text-sm text-gray-500 mt-1">
                            Tracking ID: <span className="font-medium text-gray-700">{booking.trackingId}</span>
                          </div>
                        </div>
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBadgeClass(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="mt-4 text-black grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={16} className="flex-shrink-0 text-gray-400" />
                          <span>{formatDate(booking.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock size={16} className="flex-shrink-0 text-gray-400" />
                          <span>{booking.timeSlot}</span>
                        </div>
                        <div className="flex items-start gap-2 md:col-span-2 text-gray-600">
                          <MapPin size={16} className="flex-shrink-0 mt-0.5 text-gray-400" />
                          <span className="text-sm line-clamp-1">{booking.location.address}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          {booking.status === 'pending' && (
                            <button className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors">
                              Cancel
                            </button>
                          )}
                          <Link
                            to={`/bookings/${booking._id}`}
                            className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center space-x-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-2 py-1 rounded border border-gray-300 disabled:opacity-50"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`w-8 h-8 rounded flex items-center justify-center ${
                          currentPage === index + 1
                            ? 'bg-green-600 text-white'
                            : 'bg-white border border-gray-300'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-2 py-1 rounded border border-gray-300 disabled:opacity-50"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No bookings found</h3>
                <p className="text-gray-500 mb-6">
                  {statusFilter !== 'all' 
                    ? `You don't have any ${statusFilter} bookings yet.` 
                    : "You haven't made any bookings yet."}
                </p>
                <Link 
                  to="/book" 
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus size={18} />
                  <span>Book New Service</span>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingsPage;
