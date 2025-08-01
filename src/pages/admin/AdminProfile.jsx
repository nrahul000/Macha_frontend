import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Add this import for Link component
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Save, AlertCircle, Check, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const AdminProfile = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    profileImage: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Load user data on component mount
  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phoneNumber: currentUser.phoneNumber || '',
        address: currentUser.address || '',
        profileImage: currentUser.profileImage || ''
      });
      
      if (currentUser.profileImage) {
        setPreviewUrl(currentUser.profileImage);
      }
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    
    // Clear specific field error
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file (jpg, png, etc.)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    setImageFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const errors = {};

    if (!profileData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!profileData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!profileData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(profileData.phoneNumber.replace(/\D/g, ''))) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let profileImageUrl = profileData.profileImage;
      
      // Upload image if a new one was selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const uploadResponse = await axios.post(
          `${API_BASE_URL}/admin/upload-image`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        profileImageUrl = uploadResponse.data.imageUrl;
      }
      
      // Update profile
      const response = await axios.put(
        `${API_BASE_URL}/admin/profile`,
        {
          ...profileData,
          profileImage: profileImageUrl
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      // Update local context
      updateUserProfile({
        ...currentUser,
        ...profileData,
        profileImage: profileImageUrl
      });
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Admin Profile | MACHA Services</title>
      </Helmet>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
        
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm font-medium rounded-lg border bg-white text-gray-700 hover:bg-gray-50"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-6">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-6">
          <Check size={16} className="shrink-0" />
          <span>{success}</span>
        </div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative md:w-1/4">
              <div className="w-32 h-32 mx-auto rounded-full border-4 border-gray-50 shadow overflow-hidden bg-gray-100">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-green-50 flex items-center justify-center text-green-700">
                    <User size={48} />
                  </div>
                )}
              </div>
              
              {isEditing && (
                <div className="mt-4 text-center">
                  <label className="cursor-pointer inline-flex items-center justify-center px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium">
                    <Camera size={18} className="mr-2" />
                    <span>Change Photo</span>
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`pl-10 w-full rounded-lg border ${formErrors.name ? 'border-red-300' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-50'} py-2.5 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all`}
                    />
                  </div>
                  {formErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`pl-10 w-full rounded-lg border ${formErrors.email ? 'border-red-300' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-50'} py-2.5 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all`}
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`pl-10 w-full rounded-lg border ${formErrors.phoneNumber ? 'border-red-300' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-50'} py-2.5 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all`}
                      placeholder="9876543210"
                    />
                  </div>
                  {formErrors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.phoneNumber}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={3}
                      className={`pl-10 w-full rounded-lg border ${formErrors.address ? 'border-red-300' : 'border-gray-300'} ${isEditing ? 'bg-white' : 'bg-gray-50'} py-2 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all`}
                      placeholder="Enter your full address"
                    />
                  </div>
                  {formErrors.address && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
                  )}
                </div>
                
                {isEditing && (
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-70 flex items-center justify-center"
                    >
                      {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <>
                          <Save size={18} className="mr-2" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Account Security</h3>
              <p className="text-xs text-gray-500">Manage your account password and security settings</p>
            </div>
            <Link
              to="/admin/security"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Change Password
            </Link>
          </div>
        </div>
      </motion.div>
      
      <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Admin Permissions</h2>
          <p className="mt-1 text-sm text-gray-600">
            As an admin, you have access to manage all platform operations
          </p>
        </div>
        
        <div className="p-6 bg-gray-50">
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm text-gray-700">
              <span className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">✓</span>
              <span>User management and access control</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-700">
              <span className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">✓</span>
              <span>Order management and processing</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-700">
              <span className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">✓</span>
              <span>Content and service management</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-700">
              <span className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">✓</span>
              <span>View analytics and business reports</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
