import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, RefreshCw, CheckCircle, XCircle,
  Clock, AlertCircle, Download, Eye, X
} from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // For popup

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, currentPage]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', 10);
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      const response = await axios.get(`${API_BASE_URL}/admin/orders?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data.orders);
      setTotalPages(response.data.pagination.pages);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/admin/orders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status');
    }
  };

  const handleRefresh = () => {
    fetchOrders();
  };

  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map(order => order._id));
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  // --- Order Details Popup ---
  const OrderDetailsPopup = ({ order, onClose }) => (
    <AnimatePresence>
      {order && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Order Details</h3>
            <div className="mb-2 text-sm text-gray-500">Order ID: <span className="font-mono">{order._id}</span></div>
            <div className="mb-2">
              <span className="font-semibold">Customer:</span> {order.userId?.name || 'Anonymous'}
              {order.userId?.email && (
                <span className="ml-2 text-xs text-gray-400">{order.userId.email}</span>
              )}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Date:</span> {formatDate(order.createdAt)}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Status:</span>{' '}
              <span className={`px-2 py-1 text-xs rounded-full ${getOrderStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Total:</span> ₹{order.total?.toFixed(2) || '0.00'}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Delivery Address:</span>
              <div className="ml-2 text-gray-700 text-sm">
                {order.deliveryAddress
                  ? `${order.deliveryAddress.addressLine1}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} - ${order.deliveryAddress.pincode}`
                  : 'N/A'}
              </div>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Items:</span>
              <ul className="ml-4 list-disc text-gray-700 text-sm">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} x {item.quantity} <span className="text-gray-400">₹{item.price?.toFixed(2)}</span>
                    </li>
                  ))
                ) : (
                  <li>No items</li>
                )}
              </ul>
            </div>
            {order.notes && (
              <div className="mb-2">
                <span className="font-semibold">Notes:</span> <span className="text-gray-700">{order.notes}</span>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-6 text-black">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Orders Management</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-2 bg-white rounded-lg border hover:bg-gray-50"
            title="Refresh"
          >
            <RefreshCw size={20} />
          </button>
          <button
            className="p-2 bg-white rounded-lg border hover:bg-gray-50"
            title="Export as CSV"
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg ${statusFilter === 'all' ? 'bg-green-600 text-white' : 'bg-white border'}`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded-lg ${statusFilter === 'pending' ? 'bg-amber-600 text-white' : 'bg-white border'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter('processing')}
            className={`px-4 py-2 rounded-lg ${statusFilter === 'processing' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
          >
            Processing
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-4 py-2 rounded-lg ${statusFilter === 'completed' ? 'bg-green-600 text-white' : 'bg-white border'}`}
          >
            Completed
          </button>
          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`px-4 py-2 rounded-lg ${statusFilter === 'cancelled' ? 'bg-red-600 text-white' : 'bg-white border'}`}
          >
            Cancelled
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search order or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-l-lg w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg"
          >
            Search
          </button>
        </form>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-red-500 flex items-center justify-center gap-2">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedOrders.length === orders.length && orders.length > 0}
                        onChange={handleSelectAll}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                      />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order._id)}
                          onChange={() => handleSelectOrder(order._id)}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order._id.substring(0, 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.userId?.name || 'Anonymous'}
                        <div className="text-xs text-gray-400">{order.userId?.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getOrderStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-1 rounded hover:bg-gray-100"
                            title="View details"
                          >
                            <Eye size={18} />
                          </button>
                          <div className="h-4 border-r border-gray-300"></div>
                          <button
                            onClick={() => handleStatusChange(order._id, 'processing')}
                            className="p-1 rounded hover:bg-blue-100 text-blue-700"
                            title="Mark as processing"
                          >
                            <Clock size={18} />
                          </button>
                          <button
                            onClick={() => handleStatusChange(order._id, 'completed')}
                            className="p-1 rounded hover:bg-green-100 text-green-700"
                            title="Mark as completed"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button
                            onClick={() => handleStatusChange(order._id, 'cancelled')}
                            className="p-1 rounded hover:bg-red-100 text-red-700"
                            title="Mark as cancelled"
                          >
                            <XCircle size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      No orders found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border bg-white disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded ${currentPage === index + 1
                  ? 'bg-green-600 text-white'
                  : 'bg-white border'
                  }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border bg-white disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}

      {/* Order Details Popup */}
      <OrderDetailsPopup order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
};

export default OrdersManagement;

