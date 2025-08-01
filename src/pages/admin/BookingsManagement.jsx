import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Calendar, Package, User, MapPin, AlertCircle, Check, X, 
  Trash2, RefreshCw, Save, Filter, ChevronDown, ChevronRight, Eye, 
  Download, ChevronLeft, Mail, Phone, MoreHorizontal, Map,
  ExternalLink, Clock, ChevronUp, Info, MessageSquare
} from 'lucide-react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const BookingsManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [actionSuccess, setActionSuccess] = useState('');
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [assigneeInput, setAssigneeInput] = useState('');
  const [notes, setNotes] = useState('');
  const [infoExpanded, setInfoExpanded] = useState(true);
  
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Helper function for booking status colors
  const getBookingStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
      case 'canceled':
        return 'bg-red-100 text-red-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter, currentPage]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication required. Please login again.');
        setLoading(false);
        return;
      }
      
      // Prepare query params
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', 10);
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      
      const response = await axios.get(`${API_BASE_URL}/admin/bookings?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data && response.data.success) {
        setBookings(response.data.bookings);
        setTotalPages(response.data.pagination.pages);
        setError(null);
      } else {
        throw new Error('Failed to fetch bookings');
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      if (err.response?.status === 401) {
        setError('Authentication expired. Please login again.');
      } else {
        setError('Failed to load bookings. ' + (err.response?.data?.message || err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    fetchBookings();
  };

  const handleRefresh = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCurrentPage(1);
    fetchBookings();
  };

  const handleSelectBooking = (bookingId) => {
    if (selectedBookings.includes(bookingId)) {
      setSelectedBookings(selectedBookings.filter(id => id !== bookingId));
    } else {
      setSelectedBookings([...selectedBookings, bookingId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedBookings.length === bookings.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(bookings.map(booking => booking._id));
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setStatusUpdateLoading(true);
      const token = localStorage.getItem('token');
      
      // Find the current booking data
      const bookingToUpdate = bookings.find(booking => booking._id === bookingId);
      
      if (!bookingToUpdate) {
        throw new Error('Booking not found');
      }
      
      const response = await axios.patch(
        `${API_BASE_URL}/admin/bookings/${bookingId}/status`,
        { 
          status: newStatus,
          // Include the location object to satisfy validation requirements
          location: bookingToUpdate.location
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data && response.data.success) {
        // Update booking in state
        setBookings(prev => prev.map(booking => 
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        ));
        
        if (selectedBooking && selectedBooking._id === bookingId) {
          setSelectedBooking({ ...selectedBooking, status: newStatus });
        }
        
        setActionSuccess(`Booking status updated to ${newStatus}`);
        setTimeout(() => setActionSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error updating booking status:', err);
      setError('Failed to update booking status: ' + (err.response?.data?.message || err.message));
      setTimeout(() => setError(null), 3000);
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  // Fixed: View booking details function to properly set state variables
  const viewBookingDetails = (booking) => {
    console.log("Opening booking details:", booking._id); // Debug logging
    
    // Set the booking data to the state
    setSelectedBooking(booking);
    
    // Set notes and assignee from the booking data for editing
    setNotes(booking.notes || '');
    setAssigneeInput(booking.assignedTo || '');
    
    // Show the modal by setting state to true
    setShowDetailModal(true);
  };

  const handleAssigneeUpdate = async () => {
    try {
      setStatusUpdateLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.patch(
        `${API_BASE_URL}/admin/bookings/${selectedBooking._id}/assign`,
        { assignedTo: assigneeInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data && response.data.success) {
        // Update booking in state
        setBookings(prev => prev.map(booking => 
          booking._id === selectedBooking._id 
            ? { ...booking, assignedTo: assigneeInput } 
            : booking
        ));
        
        setSelectedBooking({ ...selectedBooking, assignedTo: assigneeInput });
        
        setActionSuccess('Booking assigned successfully');
        setTimeout(() => setActionSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error assigning booking:', err);
      setError('Failed to assign booking: ' + (err.response?.data?.message || err.message));
      setTimeout(() => setError(null), 3000);
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  const handleNotesUpdate = async () => {
    try {
      setStatusUpdateLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.patch(
        `${API_BASE_URL}/admin/bookings/${selectedBooking._id}/notes`,
        { notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data && response.data.success) {
        // Update booking in state
        setBookings(prev => prev.map(booking => 
          booking._id === selectedBooking._id 
            ? { ...booking, notes } 
            : booking
        ));
        
        setSelectedBooking({ ...selectedBooking, notes });
        
        setActionSuccess('Notes updated successfully');
        setTimeout(() => setActionSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error updating notes:', err);
      setError('Failed to update notes: ' + (err.response?.data?.message || err.message));
      setTimeout(() => setError(null), 3000);
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  const exportBookings = () => {
    // Simple CSV export
    const headers = ['Booking ID', 'Customer', 'Service', 'Date', 'Time Slot', 'Status', 'Phone', 'Address'];
    const csvData = bookings.map(booking => [
      booking._id,
      booking.name,
      booking.serviceType,
      new Date(booking.date).toLocaleDateString(),
      booking.timeSlot,
      booking.status,
      booking.phone,
      booking.location?.address || 'N/A'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `macha_bookings_export_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Bookings Management | MACHA Admin</title>
      </Helmet>
      
      {/* Header section with responsive layout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bookings Management</h1>
          <p className="text-gray-600">Manage service bookings and appointments</p>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={exportBookings} 
            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 sm:w-auto w-full justify-center"
          >
            <Download size={16} />
            <span className="whitespace-nowrap">Export</span>
          </button>
          <button 
            onClick={handleRefresh} 
            className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 flex-shrink-0"
            title="Refresh"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Action success message */}
      {actionSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
          <Check size={16} />
          <span>{actionSuccess}</span>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
      
      {/* Filters & Search - with responsive layout */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        {/* Status filter buttons - scrollable on mobile */}
        <div className="flex flex-nowrap overflow-x-auto pb-2 gap-2 hide-scrollbar">
          <button 
            onClick={() => setStatusFilter('all')} 
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex-shrink-0 ${
              statusFilter === 'all' ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-700'
            }`}
          >
            All Bookings
          </button>
          <button 
            onClick={() => setStatusFilter('pending')} 
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex-shrink-0 ${
              statusFilter === 'pending' ? 'bg-amber-600 text-white' : 'bg-white border border-gray-200 text-gray-700'
            }`}
          >
            Pending
          </button>
          <button 
            onClick={() => setStatusFilter('confirmed')} 
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex-shrink-0 ${
              statusFilter === 'confirmed' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700'
            }`}
          >
            Confirmed
          </button>
          <button 
            onClick={() => setStatusFilter('completed')} 
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex-shrink-0 ${
              statusFilter === 'completed' ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-700'
            }`}
          >
            Completed
          </button>
          <button 
            onClick={() => setStatusFilter('cancelled')} 
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex-shrink-0 ${
              statusFilter === 'cancelled' ? 'bg-red-600 text-white' : 'bg-white border border-gray-200 text-gray-700'
            }`}
          >
            Cancelled
          </button>
        </div>
        
        {/* Search form - full width on mobile */}
        <form onSubmit={handleSearch} className="flex items-center w-full lg:w-auto">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 border rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button 
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg whitespace-nowrap"
          >
            Search
          </button>
        </form>
      </div>
      
      {/* Selected actions */}
      {selectedBookings.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-sm text-gray-600">
            {selectedBookings.length} bookings selected
          </span>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
            <button 
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center gap-1"
            >
              <Check size={14} />
              <span>Confirm</span>
            </button>
            <button 
              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm flex items-center gap-1"
            >
              <Check size={14} />
              <span>Complete</span>
            </button>
            <button 
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm flex items-center gap-1"
            >
              <X size={14} />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Booking table with horizontal scroll for mobile */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={selectedBookings.length > 0 && selectedBookings.length === bookings.length}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                    />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                  </td>
                </tr>
              ) : bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        checked={selectedBookings.includes(booking._id)}
                        onChange={() => handleSelectBooking(booking._id)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{booking.name}</span>
                        <span className="text-xs text-gray-500">{booking.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.serviceType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900">{new Date(booking.date).toLocaleDateString()}</span>
                        <span className="text-xs text-gray-500">{booking.timeSlot}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900 truncate max-w-[200px]" title={booking.location?.address}>
                          {booking.location?.address?.substring(0, 30)}
                          {booking.location?.address?.length > 30 ? '...' : ''}
                        </span>
                        {/* Show details if available */}
                        {booking.location?.details && (
                          <span className="text-xs text-gray-500">
                            {booking.location.details.street && <>Flat: {booking.location.details.street}, </>}
                            {booking.location.details.landmark && booking.location.details.landmark.trim() !== '' && <>Landmark: {booking.location.details.landmark}, </>}
                            {booking.location.details.area && <>Area: {booking.location.details.area}, </>}
                            {booking.location.details.pincode && <>PIN: {booking.location.details.pincode}</>}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getBookingStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => viewBookingDetails(booking)}
                          className="p-1 rounded hover:bg-blue-50 text-blue-600" 
                          title="View details"
                          type="button" // Explicitly set button type
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleStatusChange(booking._id, 
                            booking.status === 'pending' ? 'confirmed' : 
                            booking.status === 'confirmed' ? 'completed' : 
                            'pending'
                          )}
                          className={`p-1 rounded ${
                            booking.status === 'pending' ? 'hover:bg-blue-50 text-blue-600' :
                            booking.status === 'confirmed' ? 'hover:bg-green-50 text-green-600' :
                            'hover:bg-yellow-50 text-yellow-600'
                          }`}
                          title={
                            booking.status === 'pending' ? 'Mark as confirmed' :
                            booking.status === 'confirmed' ? 'Mark as completed' :
                            'Reset to pending'
                          }
                        >
                          {booking.status === 'pending' ? <Check size={18} /> :
                           booking.status === 'confirmed' ? <Check size={18} /> :
                           <RefreshCw size={18} />}
                        </button>
                        <button 
                          onClick={() => handleStatusChange(booking._id, 'cancelled')}
                          className="p-1 rounded hover:bg-red-50 text-red-600"
                          title="Cancel booking"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-sm text-gray-500">
                    {searchTerm ? (
                      <>
                        <Filter size={40} className="mx-auto mb-3 text-gray-400" />
                        <p className="font-medium text-gray-600">No bookings match your search</p>
                        <p className="mt-1">Try adjusting your filters or search term</p>
                      </>
                    ) : (
                      <>
                        <Calendar size={40} className="mx-auto mb-3 text-gray-400" />
                        <p className="font-medium text-gray-600">No bookings found</p>
                        <p className="mt-1">New bookings will appear here</p>
                      </>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination - responsive layout */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-2 flex-wrap justify-center">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border bg-white disabled:opacity-50 flex items-center"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline ml-1">Previous</span>
            </button>
            
            {/* Show fewer page numbers on mobile */}
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => {
                // On mobile, only show current page, first, last, and nearby pages
                const pageNumber = index + 1;
                const showOnMobile = 
                  pageNumber === 1 || 
                  pageNumber === totalPages || 
                  Math.abs(pageNumber - currentPage) <= 1;
                
                return showOnMobile ? (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      currentPage === pageNumber
                        ? 'bg-green-600 text-white' 
                        : 'bg-white border'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ) : (
                  // Show dots for hidden pages, but only once between gaps
                  pageNumber === currentPage - 2 || pageNumber === currentPage + 2 ? (
                    <span key={index} className="px-1 text-gray-400 hidden sm:flex items-center">...</span>
                  ) : null
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border bg-white disabled:opacity-50 flex items-center"
            >
              <span className="hidden sm:inline mr-1">Next</span>
              <ChevronRight size={16} />
            </button>
          </nav>
        </div>
      )}

      {/* Redesigned Booking Details Modal with improved theme */}
      <AnimatePresence mode="popLayout">
        {showDetailModal && selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient matching theme */}
              <div className="p-6 border-b flex justify-between items-center bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div>
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Calendar size={20} />
                    Booking Details
                  </h3>
                  <div className="text-green-100 mt-1 text-sm flex items-center gap-2">
                    <span>Tracking ID: {selectedBooking.trackingId || 'N/A'}</span>
                    {selectedBooking.trackingId && (
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(selectedBooking.trackingId);
                          // You could show a toast notification here
                        }}
                        className="p-1 rounded-full hover:bg-white/20 transition-colors"
                        title="Copy tracking ID"
                      >
                        <Check size={14} />
                      </button>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Content - scrollable */}
              <div className="overflow-y-auto p-6 flex-1 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2 pb-2 border-b border-gray-100">
                      <User size={18} className="text-green-600" /> 
                      <span>Customer Information</span>
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium text-gray-800">{selectedBooking.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">Email</p>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-800 truncate">{selectedBooking.email}</p>
                            <a 
                              href={`mailto:${selectedBooking.email}`}
                              className="text-blue-600 hover:text-blue-800"
                              title="Send email"
                            >
                              <ExternalLink size={14} />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-800">{selectedBooking.phone}</p>
                          <a 
                            href={`tel:${selectedBooking.phone}`}
                            className="text-blue-600 hover:text-blue-800"
                            title="Call customer"
                          >
                            <Phone size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Booking Details */}
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2 pb-2 border-b border-gray-100">
                      <Calendar size={18} className="text-green-600" />
                      <span>Booking Details</span>
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Service Type</p>
                        <p className="font-medium text-gray-800">{selectedBooking.serviceType}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium text-gray-800 flex items-center">
                            <Calendar size={14} className="mr-1 text-green-600" />
                            {new Date(selectedBooking.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Time Slot</p>
                          <p className="font-medium text-gray-800 flex items-center">
                            <Clock size={14} className="mr-1 text-green-600" />
                            {selectedBooking.timeSlot}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(selectedBooking.status)}`}>
                          {selectedBooking.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="font-medium text-gray-800">
                          {new Date(selectedBooking.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Location and Map section */}
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
                    <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2 pb-2 border-b border-gray-100">
                      <MapPin size={18} className="text-green-600" />
                      <span>Service Location</span>
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Full Address</p>
                        <p className="font-medium text-gray-800">{selectedBooking.location?.address || 'No address provided'}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedBooking.location?.details?.street && (
                          <div>
                            <p className="text-sm text-gray-500">Street/House No.</p>
                            <p className="font-medium text-gray-800">{selectedBooking.location.details.street}</p>
                          </div>
                        )}
                        {selectedBooking.location?.details?.landmark && (
                          <div>
                            <p className="text-sm text-gray-500">Landmark</p>
                            <p className="font-medium text-gray-800">{selectedBooking.location.details.landmark}</p>
                          </div>
                        )}
                        {selectedBooking.location?.details?.area && (
                          <div>
                            <p className="text-sm text-gray-500">Area/Village</p>
                            <p className="font-medium text-gray-800">{selectedBooking.location.details.area}</p>
                          </div>
                        )}
                        {selectedBooking.location?.details?.pincode && (
                          <div>
                            <p className="text-sm text-gray-500">PIN Code</p>
                            <p className="font-medium text-gray-800">{selectedBooking.location.details.pincode}</p>
                          </div>
                        )}
                      </div>
                      {selectedBooking.location?.coordinates?.lat && selectedBooking.location?.coordinates?.lng && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 mb-2">Map Location</p>
                          <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                            {/* Map placeholder - you could integrate Google Maps here */}
                            <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=17.3112,78.8639&zoom=14&size=600x300&key=YOUR_API_KEY')] bg-cover bg-center opacity-50"></div>
                            <div className="relative z-10">
                              <a 
                                href={`https://www.google.com/maps?q=${selectedBooking.location.coordinates.lat},${selectedBooking.location.coordinates.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 shadow-md transition-all"
                              >
                                <Map size={16} />
                                <span>Open in Google Maps</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Additional Info - collapsible */}
                {selectedBooking.additionalInfo && (
                  <div className="mt-6 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <button 
                      onClick={() => setInfoExpanded(!infoExpanded)} 
                      className="w-full flex justify-between items-center text-left focus:outline-none"
                    >
                      <h4 className="font-medium text-gray-800 flex items-center gap-2">
                        <Info size={18} className="text-green-600" />
                        <span>Additional Information</span>
                      </h4>
                      {infoExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    
                    {infoExpanded && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <p className="text-gray-700">{selectedBooking.additionalInfo}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Admin Notes */}
                <div className="mt-6 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <MessageSquare size={18} className="text-green-600" />
                    <span>Admin Notes</span>
                  </h4>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-[100px]"
                    placeholder="Add notes about this booking..."
                  ></textarea>
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={handleNotesUpdate}
                      disabled={statusUpdateLoading}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white text-sm rounded-lg hover:from-green-700 hover:to-green-800 flex items-center gap-2 shadow-sm transition-all"
                    >
                      {statusUpdateLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Save size={16} />
                      )}
                      <span>Save Notes</span>
                    </button>
                  </div>
                </div>
                
                {/* Assignment Section */}
                <div className="mt-6 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <User size={18} className="text-green-600" />
                    <span>Assign To</span>
                  </h4>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={assigneeInput}
                      onChange={(e) => setAssigneeInput(e.target.value)}
                      placeholder="Enter assignee name or ID"
                      className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <button
                      onClick={handleAssigneeUpdate}
                      disabled={statusUpdateLoading}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      {statusUpdateLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <User size={16} />
                      )}
                      <span>Assign</span>
                    </button>
                  </div>
                </div>
                
                {/* Status Update */}
                <div className="mt-6 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <RefreshCw size={18} className="text-green-600" />
                    <span>Update Status</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(selectedBooking._id, status)}
                        disabled={statusUpdateLoading || selectedBooking.status === status}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize flex items-center justify-center gap-2
                          ${selectedBooking.status === status
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : status === 'pending' 
                              ? 'bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100'
                              : status === 'confirmed'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                                : status === 'completed'
                                  ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                                  : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                          } ${selectedBooking.status === status ? 'cursor-not-allowed' : ''}`}
                      >
                        {status === 'pending' && <Clock size={16} />}
                        {status === 'confirmed' && <Check size={16} />}
                        {status === 'completed' && <Check size={16} />}
                        {status === 'cancelled' && <X size={16} />}
                        <span>{status}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Footer actions */}
              <div className="p-4 bg-gray-50 border-t flex justify-end gap-3">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleStatusChange(selectedBooking._id, 
                      selectedBooking.status === 'pending' ? 'confirmed' : 
                      selectedBooking.status === 'confirmed' ? 'completed' : 
                      'pending'
                    );
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 shadow-sm transition-all"
                >
                  {selectedBooking.status === 'pending' ? 'Confirm Booking' : 
                   selectedBooking.status === 'confirmed' ? 'Mark Complete' : 
                   'Reactivate Booking'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingsManagement;