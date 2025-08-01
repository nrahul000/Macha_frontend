import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import {
  ArrowLeft, Package, BarChart3, Menu, Settings,
  Plus, AlertCircle, Edit, Eye
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// Add Chart.js imports
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const RestaurantDashboard = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('menu');
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchRestaurantData = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        // Fetch restaurant details
        const response = await axios.get(`${API_BASE_URL}/restaurants/${restaurantId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setRestaurant(response.data.restaurant);

        // Fetch menu items
        const menuResponse = await axios.get(`${API_BASE_URL}/restaurants/${restaurantId}/menu`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setMenuItems(menuResponse.data.menuItems || []);

        // Fetch orders for this restaurant
        let fetchedOrders = [];
        try {
          const ordersResponse = await axios.get(`${API_BASE_URL}/restaurants/${restaurantId}/orders`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          fetchedOrders = ordersResponse.data.orders || [];
        } catch (orderErr) {
          fetchedOrders = [];
        }
        setOrders(fetchedOrders);

        // Calculate stats
        setStats({
          totalOrders: fetchedOrders.length,
          totalRevenue: fetchedOrders.reduce((sum, order) => sum + (order.total || 0), 0),
          pendingOrders: fetchedOrders.filter(order => order.status !== 'delivered' && order.status !== 'cancelled').length
        });

      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        setError('Failed to load restaurant data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [restaurantId, currentUser, API_BASE_URL]);

  const handleAddMenuItem = () => {
    navigate(`/restaurant/${restaurantId}/add-menu-item`);
  };

  const handleEditMenuItem = (itemId) => {
    navigate(`/restaurant/${restaurantId}/edit-menu-item/${itemId}`);
  };

  const handleDeleteMenuItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/restaurants/${restaurantId}/menu/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMenuItems(menuItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting menu item:', error);
      alert('Failed to delete menu item. Please try again.');
    }
  };

  const handleToggleItemAvailability = async (itemId, isCurrentlyAvailable) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${API_BASE_URL}/restaurants/${restaurantId}/menu/${itemId}/availability`,
        { isAvailable: !isCurrentlyAvailable },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMenuItems(menuItems.map(item => {
        if (item._id === itemId) {
          return { ...item, isAvailable: !isCurrentlyAvailable };
        }
        return item;
      }));
    } catch (error) {
      console.error('Error updating item availability:', error);
      alert('Failed to update item availability. Please try again.');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // --- Analytics helpers ---
  const getOrderStatusCounts = () => {
    const counts = { delivered: 0, cancelled: 0, pending: 0, other: 0 };
    orders.forEach(order => {
      if (order.status === 'delivered') counts.delivered++;
      else if (order.status === 'cancelled') counts.cancelled++;
      else if (order.status === 'pending') counts.pending++;
      else counts.other++;
    });
    return counts;
  };

  const getRevenueByMonth = () => {
    const revenue = {};
    orders.forEach(order => {
      if (!order.createdAt) return;
      const date = new Date(order.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      revenue[key] = (revenue[key] || 0) + (order.total || 0);
    });
    return revenue;
  };

  const statusCounts = getOrderStatusCounts();
  const revenueByMonth = getRevenueByMonth();

  const barData = {
    labels: Object.keys(revenueByMonth),
    datasets: [
      {
        label: 'Revenue (₹)',
        data: Object.values(revenueByMonth),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
    ],
  };

  const doughnutData = {
    labels: ['Delivered', 'Cancelled', 'Pending', 'Other'],
    datasets: [
      {
        data: [
          statusCounts.delivered,
          statusCounts.cancelled,
          statusCounts.pending,
          statusCounts.other,
        ],
        backgroundColor: [
          'rgba(34,197,94,0.7)',
          'rgba(239,68,68,0.7)',
          'rgba(251,191,36,0.7)',
          'rgba(59,130,246,0.7)',
        ],
      },
    ],
  };

  if (loading) {
    return (
      <div className="min-h-screen text-black bg-gray-50 pt-28 pb-10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-10 px-4">
        <div className="container mx-auto max-w-lg text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
            <p className="mb-6 text-gray-600">
              {error}
            </p>
            <div className="flex justify-center">
              <Link to="/restaurant" className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Back to Restaurant Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-10 px-4">
        <div className="container mx-auto max-w-lg text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Restaurant Not Found</h1>
            <p className="mb-6 text-gray-600">
              The restaurant you're looking for doesn't exist or you don't have permission to view it.
            </p>
            <div className="flex justify-center">
              <Link to="/restaurant" className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Back to Restaurant Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Helmet>
        <title>{restaurant.name} Dashboard | MACHA Food</title>
      </Helmet>
      {/* Navigation Bar */}
      <div className="sticky top-0 z-20 bg-white shadow-md rounded-b-xl border-b border-green-100">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center w-full md:w-auto mb-3 md:mb-0">
            <Link to="/restaurant" className="mr-4 flex items-center group">
              <ArrowLeft size={22} className="text-green-600 group-hover:-translate-x-1 transition" />
              <span className="ml-1 text-green-700 font-medium hidden md:inline">Back</span>
            </Link>
            <div className="flex flex-col md:flex-row md:items-center">
              <h1 className="text-2xl font-bold text-gray-800">{restaurant.name}</h1>
              <span className={`ml-0 md:ml-3 mt-2 md:mt-0 px-2 py-1 text-xs rounded-full font-semibold ${restaurant.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {restaurant.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-3">
            <a
              href={`/food-delivery/restaurant/${restaurantId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              <Eye size={16} className="mr-1" /> <span className="hidden sm:inline">View Public Page</span>
            </a>
            <button
              onClick={() => navigate(`/restaurant/${restaurantId}/edit`)}
              className="flex items-center px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
            >
              <Edit size={16} className="mr-1" /> <span className="hidden sm:inline">Edit Restaurant</span>
            </button>
          </div>
        </div>
      </div>
      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid text-black grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Orders</h3>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
            <p className="text-sm text-gray-500 mt-2">All time orders</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Revenue</h3>
            <p className="text-3xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
            <p className="text-sm text-gray-500 mt-2">Total earnings</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Orders</h3>
            <p className="text-3xl font-bold">{stats.pendingOrders}</p>
            <p className="text-sm text-gray-500 mt-2">Need attention</p>
          </div>
        </div>
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-6 py-4 font-medium text-sm flex items-center ${activeTab === 'menu'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <Menu size={16} className="mr-2" /> Menu Items
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-4 font-medium text-sm flex items-center ${activeTab === 'orders'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <Package size={16} className="mr-2" /> Orders
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-4 font-medium text-sm flex items-center ${activeTab === 'analytics'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <BarChart3 size={16} className="mr-2" /> Analytics
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-4 font-medium text-sm flex items-center ${activeTab === 'settings'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <Settings size={16} className="mr-2" /> Settings
            </button>
          </div>
        </div>
        {/* Tab Content */}
        {activeTab === 'menu' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Menu Items</h2>
              <button
                onClick={handleAddMenuItem}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm flex items-center hover:bg-green-700"
              >
                <Plus size={16} className="mr-1" /> Add Menu Item
              </button>
            </div>
            {menuItems.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                <Menu size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Menu Items Yet</h3>
                <p className="text-gray-500 mb-6">Start adding delicious items to your menu</p>
                <button
                  onClick={handleAddMenuItem}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add Your First Menu Item
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {menuItems.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 mr-4">
                              <img className="h-10 w-10 rounded-md object-cover" src={item.imageUrl} alt={item.name} />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{item.name}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ₹{item.price?.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.isVegetarian ? (
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Veg</span>
                          ) : (
                            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Non-veg</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleItemAvailability(item._id, item.isAvailable)}
                            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${item.isAvailable ? 'bg-green-600' : 'bg-gray-200'
                              }`}
                            role="switch"
                            aria-checked={item.isAvailable}
                          >
                            <span className="sr-only">Availability</span>
                            <span
                              aria-hidden="true"
                              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${item.isAvailable ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            ></span>
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditMenuItem(item._id)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteMenuItem(item._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Recent Orders</h2>
            {orders.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                <Package size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Orders Yet</h3>
                <p className="text-gray-500">Orders will appear here when customers place them</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Address</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id || order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.orderId || order._id || order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {order.userId?.name || order.customerName || 'N/A'}
                          {order.userId?.email && (
                            <div className="text-xs text-gray-400">{order.userId.email}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.createdAt || order.timestamp)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(order.total || 0)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {order.items?.map(item => item.name).join(', ') || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {order.deliveryAddress
                            ? `${order.deliveryAddress.addressLine1}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} - ${order.deliveryAddress.pincode}`
                            : 'N/A'}
                        </td>
                        {/* Add this new cell for actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {(order.status === 'pending' || order.status === 'placed') && (
                            <button
                              onClick={async () => {
                                try {
                                  const token = localStorage.getItem('token');
                                  await axios.patch(
                                    `${API_BASE_URL}/restaurants/${order._id}/confirm`,
                                    {},
                                    { headers: { Authorization: `Bearer ${token}` } }
                                  );
                                  // Refresh orders after confirmation
                                  setOrders(orders =>
                                    orders.map(o =>
                                      o._id === order._id ? { ...o, status: 'confirmed' } : o
                                    )
                                  );
                                } catch (err) {
                                  alert('Failed to confirm order');
                                }
                              }}
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Confirm
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-8 text-center">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="flex flex-col items-center">
                <h3 className="text-md font-semibold mb-4 text-gray-700">Monthly Revenue</h3>
                <div className="w-full flex justify-center">
                  {Object.keys(revenueByMonth).length > 0 ? (
                    <div className="w-full max-w-xs md:max-w-md">
                      <Bar
                        data={barData}
                        options={{
                          responsive: true,
                          plugins: { legend: { display: false } },
                          maintainAspectRatio: false,
                          aspectRatio: 1.5,
                          scales: {
                            x: { grid: { display: false } },
                            y: { grid: { color: '#f3f4f6' }, beginAtZero: true }
                          }
                        }}
                        height={250}
                      />
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center py-8">No revenue data yet</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-md font-semibold mb-4 text-gray-700">Order Status Distribution</h3>
                <div className="w-full flex justify-center">
                  {(statusCounts.delivered + statusCounts.cancelled + statusCounts.pending + statusCounts.other) > 0 ? (
                    <div className="w-full max-w-xs md:max-w-md">
                      <Doughnut
                        data={doughnutData}
                        options={{
                          responsive: true,
                          plugins: { legend: { position: 'bottom' } },
                          cutout: '70%',
                          maintainAspectRatio: false,
                          aspectRatio: 1.2
                        }}
                        height={250}
                      />
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center py-8">No orders yet</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Restaurant Settings</h2>
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-md font-medium text-gray-700 mb-3">Restaurant Status</h3>
                <div className="flex items-center">
                  <button
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${restaurant.isActive ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    role="switch"
                    aria-checked={restaurant.isActive}
                  >
                    <span className="sr-only">Restaurant Status</span>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${restaurant.isActive ? 'translate-x-5' : 'translate-x-0'
                        }`}
                    ></span>
                  </button>
                  <span className="ml-3 text-sm text-gray-600">
                    {restaurant.isActive ? 'Active (Accepting Orders)' : 'Inactive (Not Accepting Orders)'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  When inactive, customers will not be able to place orders from your restaurant.
                </p>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => navigate(`/restaurant/${restaurantId}/edit`)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                >
                  Edit Restaurant Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDashboard;