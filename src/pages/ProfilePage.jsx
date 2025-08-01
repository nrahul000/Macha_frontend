import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Save, User, Mail, Phone, MapPin, Package, LogOut, ArrowLeft, Edit, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import OrderDetailsModal from '../components/OrderDetailsModal';

const ProfilePage = () => {
  const { currentUser, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // User profile information state
  const [userProfile, setUserProfile] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phoneNumber: currentUser?.phoneNumber || '',
    password: '',
    address: currentUser?.address || '',
  });

  // Fetch orders from API (food delivery orders)
  const fetchOrders = async () => {
    if (!currentUser) return;
    setLoadingOrders(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/food-delivery/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // If your backend returns { orders: [...] }
      if (response.data && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders);
      } else if (Array.isArray(response.data)) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Fetch addresses from API
  const fetchAddresses = async () => {
    if (!currentUser) return;

    setLoadingAddresses(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/user/addresses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data && Array.isArray(response.data.addresses)) {
        setAddresses(response.data.addresses);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Set up user profile with real data
    setUserProfile({
      name: currentUser.name || '',
      email: currentUser.email || '',
      phoneNumber: currentUser.phoneNumber || '',
      password: '',
      address: currentUser.address || '',
    });

    // Fetch user orders when active tab is orders
    if (activeTab === 'orders') {
      fetchOrders();
    }

    // Fetch user addresses when active tab is addresses
    if (activeTab === 'addresses') {
      fetchAddresses();
    }
  }, [currentUser, navigate, activeTab]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // Reset password field when cancelling edit
    if (isEditing) {
      setUserProfile(prev => ({ ...prev, password: '' }));
      setError('');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const updatedData = {
        name: userProfile.name,
        email: userProfile.email,
        phoneNumber: userProfile.phoneNumber,
        address: userProfile.address,
      };

      // Only include password if it's been changed
      if (userProfile.password) {
        updatedData.password = userProfile.password;
      }

      const response = await axios.put(
        `${API_BASE_URL}/user/profile`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success || response.status === 200) {
        // Update current user in auth context
        updateUser(response.data.user);

        setSuccess('Profile updated successfully');
        setTimeout(() => setSuccess(''), 3000);
        setIsEditing(false);
      } else {
        throw new Error(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefaultAddress = async (addressId) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/user/addresses/${addressId}/default`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        // Refresh addresses after setting new default
        fetchAddresses();
      }
    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        const response = await axios.delete(
          `${API_BASE_URL}/user/addresses/${addressId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (response.data.success) {
          // Refresh addresses after deletion
          fetchAddresses();
        }
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleViewOrderDetails = async (orderId) => {
    setModalLoading(true);
    setShowOrderModal(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/food-delivery/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSelectedOrder(res.data.order || res.data);
    } catch {
      setSelectedOrder(null);
    } finally {
      setModalLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'orders', label: 'Orders', icon: <Package size={18} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={18} /> }
  ];

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status class for styling based on order status
  const getStatusClass = (status) => {
    status = status.toLowerCase();
    if (status === 'delivered' || status === 'completed') {
      return 'bg-green-100 text-green-800';
    } else if (status === 'cancelled' || status === 'failed') {
      return 'bg-red-100 text-red-800';
    } else if (status === 'processing' || status === 'in_progress') {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-16 pb-12">
      <Helmet>
        <title>Profile | MACHA Services</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="flex items-center gap-2 text-green-700 mb-6 group">
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to home</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header with user info */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-green-700 text-3xl font-bold shadow-lg">
                    {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">{currentUser?.name || 'User'}</h1>
                    <p className="text-green-100 flex items-center gap-2 mt-1">
                      <Mail size={16} /> {currentUser?.email || 'No email provided'}
                    </p>
                    <p className="text-green-100 flex items-center gap-2">
                      <Phone size={16} /> {currentUser?.phoneNumber ? `+91 ${currentUser.phoneNumber}` : 'No phone provided'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b">
              <div className="flex overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors ${activeTab === tab.id
                        ? 'border-b-2 border-green-600 text-green-700'
                        : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="max-w-2xl mx-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
                    <button
                      onClick={handleEditToggle}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${isEditing
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-green-50 text-green-700 hover:bg-green-100'
                        }`}
                    >
                      {isEditing ? (
                        <>
                          <ArrowLeft size={16} /> Cancel
                        </>
                      ) : (
                        <>
                          <Edit size={16} /> Edit Profile
                        </>
                      )}
                    </button>
                  </div>

                  {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2">
                      <Check size={16} />
                      <span>{success}</span>
                    </div>
                  )}

                  <form onSubmit={handleSave}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <div className="relative">
                            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={userProfile.name}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`pl-10 w-full rounded-lg border border-gray-300 py-2.5 transition-all ${isEditing
                                  ? 'focus:ring-2 focus:ring-green-600 focus:border-green-600'
                                  : 'bg-gray-50 text-gray-500'
                                }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={userProfile.email}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`pl-10 w-full rounded-lg border border-gray-300 py-2.5 transition-all ${isEditing
                                  ? 'focus:ring-2 focus:ring-green-600 focus:border-green-600'
                                  : 'bg-gray-50 text-gray-500'
                                }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 flex items-center gap-1">
                              <Phone size={18} />
                              <span className="text-xs">+91</span>
                            </div>
                            <input
                              type="tel"
                              id="phoneNumber"
                              name="phoneNumber"
                              value={userProfile.phoneNumber}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`pl-16 w-full rounded-lg border border-gray-300 py-2.5 transition-all ${isEditing
                                  ? 'focus:ring-2 focus:ring-green-600 focus:border-green-600'
                                  : 'bg-gray-50 text-gray-500'
                                }`}
                              pattern="[0-9]{10}"
                            />
                          </div>
                        </div>

                        {isEditing && (
                          <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                              Password (leave blank to keep current)
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={userProfile.password}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border border-gray-300 py-2.5 pl-3 pr-10 focus:ring-2 focus:ring-green-600 focus:border-green-600"
                                placeholder="••••••••"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="md:col-span-2">
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Default Address
                          </label>
                          <div className="relative">
                            <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
                            <textarea
                              id="address"
                              name="address"
                              rows="3"
                              value={userProfile.address}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`pl-10 w-full rounded-lg border border-gray-300 py-2 transition-all ${isEditing
                                  ? 'focus:ring-2 focus:ring-green-600 focus:border-green-600'
                                  : 'bg-gray-50 text-gray-500'
                                }`}
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex justify-end pt-4">
                          <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:from-green-700 hover:to-green-800 transition-colors shadow-md disabled:opacity-70"
                          >
                            {loading ? (
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : (
                              <>
                                <Save size={18} />
                                <span>Save Changes</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Order History</h2>

                  {loadingOrders ? (
                    <div className="flex justify-center py-12">
                      <svg className="animate-spin h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                        <thead className="bg-gray-50 text-gray-700">
                          <tr>
                            <th className="py-3 px-4 text-left text-sm text-black font-medium">Order ID</th>
                            <th className="py-3 px-4 text-left text-sm text-black font-medium">Date</th>
                            <th className="py-3 px-4 text-left text-sm text-black font-medium">Restaurant</th>
                            <th className="py-3 px-4 text-left text-sm text-black font-medium">Amount</th>
                            <th className="py-3 px-4 text-left text-sm text-black font-medium">Status</th>
                            <th className="py-3 px-4 text-left text-sm text-black font-medium">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {orders.map((order) => (
                            <tr key={order._id}>
                              <td className="py-4 px-4 text-black text-sm">{order._id?.substring(0, 8)}</td>
                              <td className="py-4 px-4 text-black text-sm">{order.createdAt ? formatDate(order.createdAt) : 'N/A'}</td>
                              <td className="py-4 px-4 text-black text-sm">{order.restaurantName || 'N/A'}</td>
                              <td className="py-4 px-4 text-black text-sm font-medium">₹{order.total ? order.total.toFixed(2) : 'N/A'}</td>
                              <td className="py-4 px-4">
                                <span className={`inline-flex rounded-full text-xs font-medium px-2.5 py-1 ${getStatusClass(order.status || '')}`}>
                                  {(order.status || 'pending').replace(/_/g, ' ')}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <button
                                  onClick={() => handleViewOrderDetails(order._id)}
                                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Package size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No orders yet</h3>
                      <p className="text-gray-500 mb-6">When you place orders, they'll appear here</p>
                      <Link to="/" className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors">
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Saved Addresses</h2>
                    <Link to="/add-address" className="bg-green-50 text-green-700 hover:bg-green-100 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                      <span>Add New Address</span>
                      <span className="text-lg">+</span>
                    </Link>
                  </div>

                  {loadingAddresses ? (
                    <div className="flex justify-center py-12">
                      <svg className="animate-spin h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  ) : addresses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {addresses.map(address => (
                        <div
                          key={address._id}
                          className={`border rounded-lg p-5 relative ${address.isDefault ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}
                        >
                          {address.isDefault && (
                            <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded">
                              Default
                            </span>
                          )}
                          <div className="mb-3">
                            <h3 className="font-semibold text-gray-800">{address.type}</h3>
                          </div>
                          <p className="text-gray-600 mb-4">{address.fullAddress}</p>
                          <div className="flex gap-4">
                            <Link to={`/edit-address/${address._id}`} className="text-green-600 hover:text-green-800 text-sm font-medium">
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDeleteAddress(address._id)}
                              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                            >
                              Delete
                            </button>
                            {!address.isDefault && (
                              <button
                                onClick={() => handleSetDefaultAddress(address._id)}
                                className="text-green-600 hover:text-green-800 text-sm font-medium"
                              >
                                Set as Default
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No addresses saved</h3>
                      <p className="text-gray-500 mb-6">Add an address to make checkout faster</p>
                      <Link to="/add-address" className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors">
                        Add New Address
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Join MACHA section */}
          <div className="mt-10 bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-8 text-white shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Join MACHA as a Service Provider</h3>
                <p className="text-green-100">Partner with us to increase your reach and grow your business</p>
              </div>
              <button className="mt-4 md:mt-0 bg-white text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors">
                Register as Partner
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      {showOrderModal && (
        <OrderDetailsModal
          order={selectedOrder}
          loading={modalLoading}
          onClose={() => {
            setShowOrderModal(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
};

export default ProfilePage;
