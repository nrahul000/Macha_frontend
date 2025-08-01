import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Package, MessageSquare, TrendingUp, AlertCircle, Calendar, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const AdminHome = () => {
  const [stats, setStats] = useState({
    users: { total: 0 },
    orders: { total: 0, pending: 0, completed: 0, successRate: 0 },
    bookings: { total: 0, pending: 0 },
    messages: { total: 0 }
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication required. Please login again.');
        setLoading(false);
        return;
      }
      
      // Get dashboard stats
      const statsResponse = await axios.get(`${API_BASE_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Get recent orders
      const ordersResponse = await axios.get(`${API_BASE_URL}/admin/orders?limit=5`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Handle stats response
      if (statsResponse.data) {
        setStats(statsResponse.data);
      }
      
      // Handle orders response
      if (ordersResponse.data && ordersResponse.data.orders) {
        setRecentOrders(ordersResponse.data.orders);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      if (err.response?.status === 401) {
        setError('Authentication expired. Please login again.');
      } else if (err.response?.status === 403) {
        setError('You don\'t have permission to access this resource.');
      } else {
        setError(`Error: ${err.response?.data?.message || err.message}`);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [API_BASE_URL]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  if (loading && !refreshing) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.users.total,
      icon: <Users size={24} />,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Orders',
      value: stats.orders.total,
      icon: <Package size={24} />,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Orders',
      value: stats.orders.pending,
      icon: <Package size={24} />,
      color: 'bg-amber-500'
    },
    {
      title: 'Total Bookings',
      value: stats.bookings?.total || 0,
      icon: <Calendar size={24} />,
      color: 'bg-indigo-500'
    },
    {
      title: 'Pending Bookings',
      value: stats.bookings?.pending || 0,
      icon: <Calendar size={24} />,
      color: 'bg-purple-500'
    },
    {
      title: 'Success Rate',
      value: `${stats.orders.successRate}%`,
      icon: <TrendingUp size={24} />,
      color: 'bg-emerald-500'
    },
    {
      title: 'Messages',
      value: stats.messages.total,
      icon: <MessageSquare size={24} />,
      color: 'bg-rose-500'
    }
  ];

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

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Admin Dashboard | MACHA Services</title>
      </Helmet>
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome to your admin dashboard</p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={handleRefresh} 
            className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700"
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-500">{card.title}</div>
                <div className={`p-2 rounded-lg ${card.color} text-white`}>
                  {card.icon}
                </div>
              </div>
              <div className="mt-2 text-3xl font-semibold text-gray-800">
                {refreshing ? (
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  card.value
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white rounded-lg shadow"
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
          <a href="#/admin/orders" className="text-sm text-green-600 hover:text-green-800 font-medium">
            View All Orders
          </a>
        </div>
        
        <div className="overflow-x-auto">
          {refreshing ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order._id ? order._id.substring(0, 8) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.userId?.name || 'Anonymous'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.serviceType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getOrderStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No orders found. New orders will appear here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminHome;
