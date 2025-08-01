import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Helmet } from 'react-helmet-async';
import { Store, Utensils, MapPin, Star, CheckCircle, AlertCircle, PlusCircle, LogOut } from 'lucide-react';
import machaLogo from '../../assets/macha-logo.jpg';
import axios from 'axios';

const RestaurantHome = () => {
  const { currentUser, logout } = useAuth();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!currentUser?.email) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/restaurants/owner/${currentUser.email}`
        );
        setRestaurant(res.data.restaurants?.[0] || null);
      } catch (err) {
        setError('Failed to fetch restaurant details.');
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Restaurant Partner Portal | MACHA</title>
      </Helmet>

      {/* Top Bar with Logout */}
      <div className="flex justify-end items-center px-6 py-4 bg-white shadow-sm">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-900 to-green-700 text-white pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <img
              src={machaLogo}
              alt="MACHA Logo"
              className="h-24 w-24 rounded-full border-2 border-white/30 object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">MACHA Restaurant Partner</h1>
          <p className="text-xl mb-8 text-green-100">
            Grow your restaurant business with MACHA's food delivery platform
          </p>
        </div>
      </div>

      {/* Restaurant Details Section */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle size={20} className="mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        ) : restaurant ? (
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <img
                src={restaurant.imageUrl || machaLogo}
                alt={restaurant.name}
                className="w-48 h-48 object-cover rounded-lg border border-gray-200"
              />
              <div className="mt-4 flex items-center gap-2">
                {restaurant.isActive ? (
                  <span className="flex items-center text-green-600 font-medium">
                    <CheckCircle size={18} className="mr-1" /> Active
                  </span>
                ) : (
                  <span className="flex items-center text-gray-500 font-medium">
                    <AlertCircle size={18} className="mr-1" /> Inactive
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{restaurant.name}</h2>
              <p className="text-gray-600 mb-4">{restaurant.description}</p>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Utensils size={18} />
                  <span>{restaurant.cuisine?.join(', ') || 'Multiple cuisines'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={18} />
                  <span>
                    {restaurant.address?.street}, {restaurant.address?.city}, {restaurant.address?.state} - {restaurant.address?.pincode}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-yellow-600">
                  <Star size={18} />
                  <span>{restaurant.rating ?? 0} / 5</span>
                </div>
              </div>
              <div className="mb-4">
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  Delivery Time: {restaurant.deliveryTime} min
                </span>
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium ml-2">
                  Delivery Fee: ₹{restaurant.deliveryFee}
                </span>
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium ml-2">
                  Min Order: ₹{restaurant.minimumOrder}
                </span>
              </div>
              <div className="flex gap-4 mt-6">
                <Link
                  to={`/restaurant/dashboard/${restaurant._id}`}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Store size={18} />
                  <span>Go to Dashboard</span>
                </Link>
                <Link
                  to={`/restaurant/${restaurant._id}/add-menu-item`}
                  className="px-6 py-3 bg-white text-green-700 border border-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center gap-2"
                >
                  <PlusCircle size={18} />
                  <span>Add Menu Item</span>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg text-center border border-dashed border-gray-300">
            <Store size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Restaurant Found</h3>
            <p className="text-gray-500 mb-6">Register your restaurant to start accepting orders</p>
            <Link
              to="/restaurant/register"
              className="px-6 py-3 bg-green-600 text-white rounded-lg inline-flex items-center gap-2 hover:bg-green-700"
            >
              <PlusCircle size={18} />
              <span>Register Your Restaurant</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantHome;

