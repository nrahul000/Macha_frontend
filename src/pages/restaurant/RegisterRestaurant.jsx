import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Upload, Clock, MapPin, AlertCircle, Check } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const RegisterRestaurant = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cuisine: [],
    street: '',
    city: 'Choutuppal',
    state: 'Telangana',
    pincode: '',
    imageUrl: '',
    deliveryTime: 30,
    deliveryFee: 40,
    minimumOrder: 100,
    openingHours: {
      monday: { open: '09:00', close: '22:00' },
      tuesday: { open: '09:00', close: '22:00' },
      wednesday: { open: '09:00', close: '22:00' },
      thursday: { open: '09:00', close: '22:00' },
      friday: { open: '09:00', close: '22:00' },
      saturday: { open: '09:00', close: '22:00' },
      sunday: { open: '09:00', close: '22:00' }
    },
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerPassword: ''
  });

  const cuisineOptions = [
    'North Indian', 'South Indian', 'Chinese',
    'Fast Food', 'Pizza', 'Biryani', 'Rolls',
    'Desserts', 'Beverages', 'Thali'
  ];

  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCuisineChange = (cuisine) => {
    if (formData.cuisine.includes(cuisine)) {
      setFormData({
        ...formData,
        cuisine: formData.cuisine.filter(item => item !== cuisine)
      });
    } else {
      setFormData({
        ...formData,
        cuisine: [...formData.cuisine, cuisine]
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({
          ...formData,
          imageUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpeningHoursChange = (day, field, value) => {
    setFormData({
      ...formData,
      openingHours: {
        ...formData.openingHours,
        [day]: {
          ...formData.openingHours[day],
          [field]: value
        }
      }
    });
  };

  const validateForm = () => {
    if (!formData.name) return "Restaurant name is required";
    if (!formData.ownerName) return "Owner name is required";
    if (!formData.ownerEmail) return "Owner email is required";
    if (!formData.ownerPhone) return "Owner phone is required";
    if (!formData.ownerPassword) return "Owner password is required"; // <-- Validate password
    if (formData.cuisine.length === 0) return "Please select at least one cuisine type";
    if (!formData.street) return "Street address is required";
    if (!formData.pincode) return "PIN code is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      window.scrollTo(0, 0);
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const restaurantData = {
        name: formData.name,
        description: formData.description,
        cuisine: formData.cuisine,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        imageUrl: formData.imageUrl,
        deliveryTime: parseInt(formData.deliveryTime),
        deliveryFee: parseInt(formData.deliveryFee),
        minimumOrder: parseInt(formData.minimumOrder),
        openingHours: formData.openingHours,
        ownerName: formData.ownerName,
        ownerEmail: formData.ownerEmail,
        ownerPhone: formData.ownerPhone,
        ownerPassword: formData.ownerPassword // <-- Send password
      };
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      await axios.post(`${API_BASE_URL}/restaurants/register`, restaurantData);
      setSuccess('Restaurant registered successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to register restaurant. Please try again.');
      window.scrollTo(0, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-10">
      <Helmet>
        <title>Register Your Restaurant | MACHA Food</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/login" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={18} className="mr-2" />
            <span>Back</span>
          </Link>
        </div>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Register Your Restaurant</h1>
          <p className="text-gray-600 mb-6">Join MACHA Food and reach more customers in Choutuppal and surrounding areas</p>
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
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
            {/* Owner Information */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">Owner Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner Name*
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2  text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner Email*
                  </label>
                  <input
                    type="email"
                    name="ownerEmail"
                    value={formData.ownerEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner Phone*
                  </label>
                  <input
                    type="tel"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner Password*
                  </label>
                  <input
                    type="password"
                    name="ownerPassword"
                    value={formData.ownerPassword}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              </div>
            </div>
            {/* ...rest of your form (restaurant info, cuisine, address, etc.) ... */}
            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-black mb-1">
                    Restaurant Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border  text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Tell customers about your restaurant"
                  />
                </div>
              </div>
            </div>
            {/* Restaurant Image */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">Restaurant Image</h2>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-1/3">
                  <div className="bg-gray-100 aspect-video rounded-lg flex items-center justify-center overflow-hidden border border-dashed border-gray-300">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Restaurant preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-6">
                        <Upload size={40} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Upload restaurant image</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Upload a high-quality image of your restaurant. Recommended size: 1280x720 pixels.
                  </p>
                </div>
              </div>
            </div>
            {/* Cuisine Types */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">Cuisine Types*</h2>
              <div className="flex flex-wrap gap-2">
                {cuisineOptions.map((cuisine) => (
                  <button
                    key={cuisine}
                    type="button"
                    onClick={() => handleCuisineChange(cuisine)}
                    className={`px-3 text-black py-1.5 rounded-full text-sm ${formData.cuisine.includes(cuisine)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Select all cuisine types that apply to your restaurant. At least one is required.
              </p>
            </div>
            {/* Location & Address */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">
                <span className="flex items-center">
                  <MapPin size={18} className="mr-2 text-green-600" />
                  Location & Address
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address*
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full text-black  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Building name, street name, landmark"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PIN Code*
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              </div>
            </div>
            {/* Delivery Options */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-black mb-4 pb-2 border-b">
                <span className="flex items-center">
                  <Clock size={18} className="mr-2 text-green-600" />
                  Delivery Options
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Avg. Delivery Time (minutes)
                  </label>
                  <input
                    type="number"
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    min="10"
                    max="90"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Fee (₹)
                  </label>
                  <input
                    type="number"
                    name="deliveryFee"
                    value={formData.deliveryFee}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Order (₹)
                  </label>
                  <input
                    type="number"
                    name="minimumOrder"
                    value={formData.minimumOrder}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    min="0"
                  />
                </div>
              </div>
            </div>
            {/* Opening Hours */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">Opening Hours</h2>
              <div className="grid grid-cols-7 gap-1 text-xs font-medium text-center text-gray-700 mb-2">
                <div>Monday</div>
                <div>Tuesday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                <div>Saturday</div>
                <div>Sunday</div>
              </div>
              <div className="grid grid-cols-7 text-black gap-1">
                {Object.entries(formData.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex flex-col space-y-1">
                    <select
                      value={hours.open}
                      onChange={(e) => handleOpeningHoursChange(day, 'open', e.target.value)}
                      className="w-full px-1 py-1  text-black text-xs border border-gray-300 rounded-md"
                    >
                      <option value="00:00">12:00 AM</option>
                      <option value="06:00">6:00 AM</option>
                      <option value="07:00">7:00 AM</option>
                      <option value="08:00">8:00 AM</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                    </select>
                    <span className="text-xs text-center text-gray-500">to</span>
                    <select
                      value={hours.close}
                      onChange={(e) => handleOpeningHoursChange(day, 'close', e.target.value)}
                      className="w-full px-1 py-1 text-xs border border-gray-300 rounded-md"
                    >
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="21:00">9:00 PM</option>
                      <option value="22:00">10:00 PM</option>
                      <option value="23:00">11:00 PM</option>
                      <option value="00:00">12:00 AM</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
            {/* Terms & Submission */}
            <div className="border-t pt-6">
              <div className="mb-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I confirm that the information provided is accurate and I agree to MACHA's <a href="#" className="text-green-600 hover:underline">terms and conditions</a> for restaurant partners.
                  </label>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
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
                  ) : 'Register Restaurant'}
                </button>
              </div>
            </div>
          </form>
          <div className="text-center text-gray-500 text-sm mt-8">
            Already have a restaurant account? <Link to="/login" className="text-green-600 hover:underline">Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRestaurant;