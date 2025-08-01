import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;
      
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/orders/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load your orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [currentUser]);
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Helmet>
        <title>Dashboard | MACHA Services</title>
      </Helmet>
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser?.name || 'User'}!</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>
          
          {loading ? (
            <div className="flex justify-center p-8">
              <div className="w-10 h-10 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You don't have any orders yet.</p>
              <Link to="/book" className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                Place Your First Order
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3">Service</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="py-3">{order.serviceType}</td>
                      <td className="py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3">₹{order.totalAmount}</td>
                      <td className="py-3">
                        <Link to={`/order/${order._id}`} className="text-blue-600 hover:underline">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{currentUser?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{currentUser?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{currentUser?.phoneNumber}</p>
              </div>
              <div className="pt-2">
                <Link to="/profile" className="text-green-600 hover:underline">
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/book" className="bg-green-50 hover:bg-green-100 p-4 rounded-md text-center">
                <div className="font-medium text-green-700">New Booking</div>
                <p className="text-sm text-gray-600 mt-1">Place a new service request</p>
              </Link>
              <Link to="/food-delivery" className="bg-orange-50 hover:bg-orange-100 p-4 rounded-md text-center">
                <div className="font-medium text-orange-700">Food Delivery</div>
                <p className="text-sm text-gray-600 mt-1">Order food now</p>
              </Link>
              <Link to="/support" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-md text-center">
                <div className="font-medium text-blue-700">Support</div>
                <p className="text-sm text-gray-600 mt-1">Get help with an order</p>
              </Link>
              <Link to="/offers" className="bg-purple-50 hover:bg-purple-100 p-4 rounded-md text-center">
                <div className="font-medium text-purple-700">Offers</div>
                <p className="text-sm text-gray-600 mt-1">View current deals</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
