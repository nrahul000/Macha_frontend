import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const AdminAnalytics = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_URL = import.meta.env.VITE_API_URL;
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('token');
        
        // Use Promise.all to fetch all data in parallel for better performance
        const [monthlyStatsResponse, orderStatusResponse, topItemsResponse] = await Promise.all([
          axios.get(`${API_URL}/analytics/monthly-stats`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_URL}/analytics/order-status`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_URL}/analytics/top-items`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        
        // Log responses for debugging
        console.log('Monthly stats response:', monthlyStatsResponse.data);
        console.log('Order status response:', orderStatusResponse.data);
        console.log('Top items response:', topItemsResponse.data);
        
        setStats({
          monthlyData: monthlyStatsResponse.data.monthlyData || [],
          summary: monthlyStatsResponse.data.summary || {},
          serviceDistribution: monthlyStatsResponse.data.serviceDistribution || [],
          statusDistribution: orderStatusResponse.data.statusDistribution || [],
          topItems: topItemsResponse.data.topItems || []
        });
        
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setError(error.response?.data?.message || error.message || 'Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    };
    
    if (currentUser?.role === 'admin') {
      fetchStats();
    }
  }, [API_URL, currentUser]);
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  if (loading) {
    return (
      <div className="p-6 text-black">
        <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
        <div className="grid text-black grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
        <div className="grid text-black grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
          <h2 className="text-lg font-semibold mb-2">Failed to load analytics data</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  if (!stats || !stats.monthlyData.length) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-700">
          <p>No analytics data available yet. Please create some orders and users to see statistics.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 text-black">
      <Helmet>
        <title>Analytics Dashboard | MACHA Admin</title>
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="text-gray-600">Overview of business performance and metrics</p>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Total Orders</h3>
          <p className="text-2xl font-bold mt-2">{stats.summary?.totalOrders?.toLocaleString() || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Total Revenue</h3>
          <p className="text-2xl font-bold mt-2">{formatCurrency(stats.summary?.totalRevenue || 0)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Total Users</h3>
          <p className="text-2xl font-bold mt-2">{stats.summary?.totalUsers?.toLocaleString() || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Total Bookings</h3>
          <p className="text-2xl font-bold mt-2">{stats.summary?.totalBookings?.toLocaleString() || 0}</p>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Orders & Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Monthly Orders & Revenue</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={stats.monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip formatter={(value, name) => name === 'revenue' ? formatCurrency(value) : value} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="orders"
                  name="Orders"
                  stroke="#0088FE"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#00C49F"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Service Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Service Distribution</h3>
          {stats.serviceDistribution && stats.serviceDistribution.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.serviceDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {stats.serviceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${value}`, `${props.payload.name}`]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center">
              <p className="text-gray-500">No service distribution data available</p>
            </div>
          )}
        </div>
        
        {/* Order Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Order Status Distribution</h3>
          {stats.statusDistribution && stats.statusDistribution.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {stats.statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => value} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center">
              <p className="text-gray-500">No order status data available</p>
            </div>
          )}
        </div>
        
        {/* User Growth */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={stats.monthlyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="users" name="New Users" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Top Selling Items */}
        {stats.topItems && stats.topItems.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Top Selling Items</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.topItems}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip formatter={(value, name) => name === 'revenue' ? formatCurrency(value) : value} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="quantity" name="Quantity" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="revenue" name="Revenue" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-sm text-gray-500 text-center mt-4">
        <p>Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default AdminAnalytics;