import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { ArrowLeft, Upload, AlertCircle, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const MenuItemForm = () => {
  const { restaurantId, itemId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(!!itemId);
  const [isEdit, setIsEdit] = useState(!!itemId);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Main Course',
    imageUrl: '',
    isVegetarian: false,
    isAvailable: true,
    popularityScore: 0
  });

  // Category options
  const categoryOptions = [
    'Main Course', 'Starter', 'Dessert', 'Beverage',
    'Bread', 'Rice', 'Curry', 'Snacks', 'Combo'
  ];

  // Image preview
  const [imagePreview, setImagePreview] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Fetch menu item data if editing
  useEffect(() => {
    if (isEdit) {
      const fetchMenuItem = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem('token');

          const response = await axios.get(`${API_BASE_URL}/restaurants/${restaurantId}/menu/${itemId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const menuItem = response.data.menuItem;
          setFormData({
            name: menuItem.name || '',
            description: menuItem.description || '',
            price: menuItem.price || '',
            category: menuItem.category || 'Main Course',
            imageUrl: menuItem.imageUrl || '',
            isVegetarian: menuItem.isVegetarian || false,
            isAvailable: menuItem.isAvailable !== false, // Default to true if not specified
            popularityScore: menuItem.popularityScore || 0
          });

          if (menuItem.imageUrl) {
            setImagePreview(menuItem.imageUrl);
          }

        } catch (error) {
          console.error('Error fetching menu item:', error);
          setError('Failed to load menu item data.');

          // Use demo data for testing UI
          setFormData({
            name: 'Demo Item',
            description: 'This is a sample menu item',
            price: '199',
            category: 'Main Course',
            imageUrl: '',
            isVegetarian: true,
            isAvailable: true,
            popularityScore: 0
          });
        } finally {
          setLoading(false);
        }
      };

      fetchMenuItem();
    }
  }, [isEdit, itemId, restaurantId, API_BASE_URL]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        // In a real app, you would upload to a server and get a URL
        // For now, we'll just use the data URL
        setFormData({
          ...formData,
          imageUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.name) return "Item name is required";
    if (!formData.price) return "Price is required";
    if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      return "Price must be a valid positive number";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      window.scrollTo(0, 0);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('token');

      // Prepare menu item data
      const menuItemData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        imageUrl: formData.imageUrl,
        isVegetarian: formData.isVegetarian,
        isAvailable: formData.isAvailable
      };

      if (isEdit) {
        // Update existing menu item
        await axios.put(
          `${API_BASE_URL}/restaurants/${restaurantId}/menu/${itemId}`,
          menuItemData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setSuccess('Menu item updated successfully!');
      } else {
        // Create new menu item
        await axios.post(
          `${API_BASE_URL}/restaurants/${restaurantId}/menu`,
          menuItemData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setSuccess('Menu item added successfully!');
      }

      // Navigate back to dashboard after a delay
      setTimeout(() => {
        navigate(`/restaurant/dashboard/${restaurantId}`);
      }, 1500);

    } catch (error) {
      console.error('Error saving menu item:', error);
      setError(error.response?.data?.message || 'Failed to save menu item. Please try again.');
      window.scrollTo(0, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-10 px-4">
        <div className="container mx-auto max-w-md text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h1>
            <p className="mb-6 text-gray-600">
              Please sign in or create an account to manage menu items.
            </p>
            <div className="flex flex-col space-y-3">
              <Link to="/login" className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Sign In
              </Link>
              <Link to="/signup" className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  pb-10">
      <Helmet>
        <title>
          {isEdit ? 'Edit Menu Item' : 'Add Menu Item'} | MACHA Restaurant
        </title>
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="mb-8 pt-8">
          <Link
            to={`/restaurant/dashboard/${restaurantId}`}
            className="inline-flex items-center text-green-700 hover:text-green-900 font-medium"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/90 rounded-2xl shadow-lg p-8 border border-green-100">
            <h1 className="text-3xl font-extrabold text-green-800 mb-2 tracking-tight">
              {isEdit ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h1>
            <p className="text-green-700 mb-8">
              {isEdit
                ? 'Update the details of your menu item below.'
                : 'Add delicious items to your restaurant menu.'}
            </p>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                <Check size={20} className="mr-2 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Basic Information */}
              <section>
                <h2 className="text-lg font-bold text-green-800 mb-4 pb-2 border-b border-green-100">
                  Item Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-green-700 mb-1">
                      Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-green-50"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-green-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-green-50"
                      placeholder="Describe your dish with tasty details"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-green-700 mb-1">
                      Price (₹)<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-green-50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-green-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-green-50"
                    >
                      {categoryOptions.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-6">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="isVegetarian"
                      name="isVegetarian"
                      checked={formData.isVegetarian}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
                    />
                    <span className="ml-2 text-green-700">Vegetarian</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="isAvailable"
                      name="isAvailable"
                      checked={formData.isAvailable}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
                    />
                    <span className="ml-2 text-green-700">Available for ordering</span>
                  </label>
                </div>
              </section>

              {/* Item Image */}
              <section>
                <h2 className="text-lg font-bold text-green-800 mb-4 pb-2 border-b border-green-100">
                  Item Image
                </h2>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-1/3">
                    <div className="bg-green-50 aspect-square rounded-xl flex items-center justify-center overflow-hidden border-2 border-dashed border-green-200">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Item preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-6">
                          <Upload size={40} className="mx-auto text-green-300 mb-2" />
                          <p className="text-sm text-green-400">Upload item image</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-green-700 mb-1">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-green-50"
                    />
                    <p className="mt-1 text-xs text-green-500">
                      Upload an appetizing image of your dish. Recommended size: 800x800 pixels.
                    </p>
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <div className="pt-8 border-t border-green-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold shadow hover:from-green-600 hover:to-green-700 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : isEdit ? 'Update Menu Item' : 'Add Menu Item'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MenuItemForm;
