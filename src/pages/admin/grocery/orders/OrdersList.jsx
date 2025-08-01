import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Calendar, Download, Eye, 
  ChevronLeft, ChevronRight, RefreshCw, Truck,
  CheckCircle, XCircle, Clock, AlertTriangle,
  Calendar as CalendarIcon, User, Phone, MapPin
} from 'lucide-react';
import * as groceryService from '../../../../services/groceryService';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [orderStats, setOrderStats] = useState({
    pending: 0,
    processing: 0,
    'out-for-delivery': 0,
    delivered: 0,
    cancelled: 0
  });

  // Order statuses
  const orderStatuses = [
    { id: 'all', name: 'All Orders' },
    { id: 'pending', name: 'Pending', color: 'yellow' },
    { id: 'processing', name: 'Processing', color: 'blue' },
    { id: 'out-for-delivery', name: 'Out for Delivery', color: 'purple' },
    { id: 'delivered', name: 'Delivered', color: 'green' },
    { id: 'cancelled', name: 'Cancelled', color: 'red' }
  ];

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter, searchTerm, sortConfig, dateRange]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      // Build params for API call
      const params = { page: currentPage };
      
      if (searchTerm) {
        params.search = searchTerm;
      }
      
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      
      if (dateRange.from) {
        params.fromDate = dateRange.from;
      }
      
      if (dateRange.to) {
        params.toDate = dateRange.to;
      }
      
      if (sortConfig) {
        params.sortBy = sortConfig.key;
        params.sortDirection = sortConfig.direction;
      }
      
      // Fetch orders from API
      const response = await groceryService.getAdminOrders(params);
      
      if (response && response.orders) {
        setOrders(response.orders);
        setTotalPages(response.pagination?.pages || 1);
        
        // Get order statistics
        fetchOrderStats();
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders data. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchOrderStats = async () => {
    try {
      const stats = await groceryService.getOrderStats();
      setOrderStats(stats);
    } catch (error) {
      console.error('Error fetching order statistics:', error);
      // Use default values if API fails
    }
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(orders.map(order => order._id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleExportSelected = () => {
    // To be implemented
    console.log('Exporting selected orders:', selectedOrders);
    alert(`Exporting ${selectedOrders.length} orders...`);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await groceryService.updateOrderStatus(orderId, newStatus);
      // Update local state
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusBadge = (status) => {
    const statusObj = orderStatuses.find(s => s.id === status) || { id: status, name: status, color: 'gray' };
    
    const colorMap = {
      yellow: 'bg-yellow-100 text-yellow-800',
      blue: 'bg-blue-100 text-blue-800',
      purple: 'bg-purple-100 text-purple-800',
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800',
      gray: 'bg-gray-100 text-gray-800'
    };
    
    const iconMap = {
      pending: <Clock size={14} className="mr-1" />,
      processing: <RefreshCw size={14} className="mr-1" />,
      'out-for-delivery': <Truck size={14} className="mr-1" />,
      delivered: <CheckCircle size={14} className="mr-1" />,
      cancelled: <XCircle size={14} className="mr-1" />,
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[statusObj.color]}`}>
        {iconMap[status] || null}
        {statusObj.name}
      </span>
    );
  };

  return (
    <div>
      {/* Action Bar */}
      <div className="bg-white text-black rounded-xl shadow-sm mb-6 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search orders, customers..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
            >
              <Filter size={18} className="mr-2" />
              <span>Filter</span>
            </button>
            
            <button
              onClick={fetchOrders}
              className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
            >
              <RefreshCw size={18} className="mr-2" />
              <span>Refresh</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {selectedOrders.length > 0 && (
              <button
                onClick={handleExportSelected}
                className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
              >
                <Download size={18} className="mr-2" />
                <span>Export {selectedOrders.length} orders</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Filter Section */}
        {isFilterOpen && (
          <div className="mt-4 text-black pt-4 border-t border-gray-100">
            <div className="grid text-black grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
                <select
                  className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {orderStatuses.map(status => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={dateRange.from}
                    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={dateRange.to}
                    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={`${sortConfig.key}-${sortConfig.direction}`}
                  onChange={(e) => {
                    const [key, direction] = e.target.value.split('-');
                    setSortConfig({ key, direction });
                  }}
                >
                  <option value="date-desc">Date (Newest First)</option>
                  <option value="date-asc">Date (Oldest First)</option>
                  <option value="total-desc">Amount (High to Low)</option>
                  <option value="total-asc">Amount (Low to High)</option>
                  <option value="customer-asc">Customer Name (A-Z)</option>
                  <option value="customer-desc">Customer Name (Z-A)</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setDateRange({ from: '', to: '' });
                  setStatusFilter('all');
                  setSearchTerm('');
                  setSortConfig({ key: 'date', direction: 'desc' });
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Quick Stats */}
      <div className="grid text-black grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {orderStatuses.filter(status => status.id !== 'all').map(status => (
          <button
            key={status.id}
            onClick={() => setStatusFilter(status.id)}
            className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-${status.color}-300 transition-colors ${
              statusFilter === status.id ? `bg-${status.color}-50 border-${status.color}-300` : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">{status.name}</span>
              <div className={`w-8 h-8 rounded-full bg-${status.color}-100 flex items-center justify-center`}>
                {status.id === 'pending' && <Clock size={16} className="text-yellow-600" />}
                {status.id === 'processing' && <RefreshCw size={16} className="text-blue-600" />}
                {status.id === 'out-for-delivery' && <Truck size={16} className="text-purple-600" />}
                {status.id === 'delivered' && <CheckCircle size={16} className="text-green-600" />}
                {status.id === 'cancelled' && <XCircle size={16} className="text-red-600" />}
              </div>
            </div>
            <div className="text-2xl font-semibold">
              {orderStats[status.id] || 0}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {status.id === 'pending' && 'Awaiting processing'}
              {status.id === 'processing' && 'Being prepared'}
              {status.id === 'out-for-delivery' && 'On the way'}
              {status.id === 'delivered' && 'Successfully delivered'}
              {status.id === 'cancelled' && 'Order cancelled'}
            </div>
          </button>
        ))}
      </div>
      
      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-gray-400 mb-2">
              <AlertTriangle size={48} />
            </div>
            <p className="text-gray-600 mb-4">No orders found</p>
            <p className="text-gray-500 max-w-md text-center">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          onChange={handleSelectAll}
                          checked={selectedOrders.length === orders.length && orders.length > 0}
                        />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('date')}>
                      <div className="flex items-center">
                        <span>Order Info</span>
                        {sortConfig.key === 'date' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('customer')}>
                      <div className="flex items-center">
                        <span>Customer</span>
                        {sortConfig.key === 'customer' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Items</span>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('total')}>
                      <div className="flex items-center">
                        <span>Total</span>
                        {sortConfig.key === 'total' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <React.Fragment key={order._id}>
                      <tr className={`hover:bg-gray-50 ${expandedOrderId === order._id ? 'bg-gray-50' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={selectedOrders.includes(order._id)}
                            onChange={() => handleSelectOrder(order._id)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {new Date(order.createdAt).toLocaleDateString()} - {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order.deliveryAddress?.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {order.deliveryAddress?.phone || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.items?.length || 0} items</div>
                          <button 
                            className="text-xs text-blue-600 hover:text-blue-800"
                            onClick={() => toggleOrderExpansion(order._id)}
                          >
                            {expandedOrderId === order._id ? 'Hide details' : 'View details'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">₹{order.total?.toFixed(2) || '0.00'}</div>
                          <div className="text-xs text-gray-500">{order.paymentMethod}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end items-center space-x-2">
                            <Link to={`/admin/grocery/orders/${order._id}`} className="text-blue-600 hover:text-blue-900">
                              <Eye size={18} />
                            </Link>
                            
                            <select
                              className="text-sm border border-gray-200 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={order.status}
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            >
                              {orderStatuses.filter(status => status.id !== 'all').map(status => (
                                <option key={status.id} value={status.id}>{status.name}</option>
                              ))}
                            </select>
                          </div>
                        </td>
                      </tr>
                      
                      {/* Expanded order details */}
                      {expandedOrderId === order._id && (
                        <tr className="bg-gray-50">
                          <td colSpan="7" className="px-6 py-4">
                            <div className="border border-gray-200 rounded-lg p-4 mb-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500 mb-1">Delivery Address</h4>
                                  <div className="flex items-start">
                                    <MapPin className="h-4 w-4 text-gray-400 mr-1 mt-0.5" />
                                    <p className="text-sm text-gray-700">
                                      {order.deliveryAddress?.address}, 
                                      {order.deliveryAddress?.city}, 
                                      {order.deliveryAddress?.state} - 
                                      {order.deliveryAddress?.pincode}
                                    </p>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500 mb-1">Payment Details</h4>
                                  <p className="text-sm text-gray-700">{order.paymentMethod}</p>
                                  <p className="text-sm text-gray-700 mt-1">
                                    Status: 
                                    <span className={`ml-1 ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                                      {order.paymentStatus?.charAt(0).toUpperCase() + order.paymentStatus?.slice(1) || 'N/A'}
                                    </span>
                                  </p>
                                </div>
                                
                                {order.deliveryNotes && (
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Delivery Notes</h4>
                                    <p className="text-sm text-gray-700">{order.deliveryNotes}</p>
                                  </div>
                                )}
                              </div>
                              
                              <h4 className="text-sm font-medium text-gray-500 mb-2">Order Items</h4>
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-100">
                                    <tr>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Item</th>
                                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Qty</th>
                                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Price</th>
                                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Total</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200">
                                    {order.items?.map((item) => (
                                      <tr key={item.productId}>
                                        <td className="px-4 py-2 text-sm text-gray-700">{item.name}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 text-right">{item.quantity}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 text-right">₹{item.price?.toFixed(2) || '0.00'}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 text-right">₹{(item.price * item.quantity).toFixed(2) || '0.00'}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                  <tfoot className="bg-gray-50">
                                    <tr>
                                      <td colSpan="3" className="px-4 py-2 text-sm text-gray-700 text-right font-medium">Subtotal:</td>
                                      <td className="px-4 py-2 text-sm text-gray-700 text-right">₹{order.subtotal?.toFixed(2) || '0.00'}</td>
                                    </tr>
                                    {order.discount > 0 && (
                                      <tr>
                                        <td colSpan="3" className="px-4 py-2 text-sm text-gray-700 text-right font-medium">Discount:</td>
                                        <td className="px-4 py-2 text-sm text-green-600 text-right">-₹{order.discount?.toFixed(2) || '0.00'}</td>
                                      </tr>
                                    )}
                                    <tr>
                                      <td colSpan="3" className="px-4 py-2 text-sm text-gray-700 text-right font-medium">Delivery Fee:</td>
                                      <td className="px-4 py-2 text-sm text-gray-700 text-right">₹{order.deliveryFee?.toFixed(2) || '0.00'}</td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                      <td colSpan="3" className="px-4 py-2 text-sm font-bold text-gray-700 text-right">Total:</td>
                                      <td className="px-4 py-2 text-sm font-bold text-gray-700 text-right">₹{order.total?.toFixed(2) || '0.00'}</td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(currentPage * 10, orders.length + (currentPage - 1) * 10)}</span> of{' '}
                    <span className="font-medium">{totalPages * 10}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border ${
                          currentPage === page
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        } text-sm font-medium`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
