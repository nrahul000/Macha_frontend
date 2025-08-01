import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Mail, ArrowLeft, Check, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AuthPage = () => {
  const location = useLocation();
  const mode = location.pathname === '/login' ? 'login' : 'signup';

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login, loginRestaurantOwner } = useAuth();

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Handle Google login redirect
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  // Check for auth tokens in URL when redirected back from Google OAuth
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    const userId = query.get('userId');
    const error = query.get('error');

    if (error) {
      setError('Authentication failed. Please try again.');
      window.history.replaceState({}, document.title, location.pathname);
      return;
    }

    if (token && userId) {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${API_BASE_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response.data && response.data.user) {
            login(response.data.user);

            setSuccess('Login successful! Redirecting...');

            if (response.data.user.role === 'admin') {
              setTimeout(() => navigate('/admin'), 1500);
            } else {
              setTimeout(() => navigate('/'), 1500);
            }
          }
        } catch (err) {
          setError('Error fetching user data. Please try again.');
        } finally {
          setLoading(false);
          window.history.replaceState({}, document.title, location.pathname);
        }
      };

      fetchUserData();
    }
  }, [location.search, navigate, login, API_BASE_URL, location.pathname]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (error) {
      setError('');
    }
  };

  const validateForm = () => {
    const errors = {};

    if (mode === 'signup' && !formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (mode === 'signup' && formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (mode === 'signup') {
      if (!formData.phoneNumber) {
        errors.phoneNumber = 'Phone number is required';
      } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
        errors.phoneNumber = 'Phone number must be 10 digits';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const { name, email, password } = formData;

    try {
      // Try restaurant owner login first
      if (mode === 'login') {
        try {
          const resOwner = await axios.post(`${API_BASE_URL}/restaurants/login`, {
            email,
            password,
          });
          if (resOwner.data && resOwner.data.restaurantId) {
            loginRestaurantOwner(
              {
                _id: resOwner.data.restaurantId,
                email: resOwner.data.owner?.email || email, // owner ka email agar mile toh
                role: 'restaurant_owner', // YEH LINE ZARUR ADD KAREN
                name: resOwner.data.owner?.name,
              }, // add more fields if needed
              resOwner.data.token // if your backend returns a token
            );
            toast.success('Restaurant owner login successful!');
            setSuccess('Login successful! Redirecting...');
            setLoading(false);
            // setTimeout(() => {
            //   setLoading(false);
            //   navigate(`/restaurant/dashboard/${resOwner.data.restaurantId}`);
            // }, 1500);
            return;
          }
        } catch (ownerErr) {
          // If owner login fails, try normal user login
        }

        // Normal user login
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password,
          });

          toast.success('Login successful!');
          setSuccess('Login successful! Redirecting...');
          login(response.data.user, response.data.token);
          setTimeout(() => navigate('/'), 1500);
        } catch (err) {
          if (err.response) {
            setError(err.response.data.message || 'Authentication failed. Please check your credentials.');
            if (err.response.status === 401) {
              setError('Invalid email or password. Please try again.');
            }
          } else if (err.request) {
            setError('Unable to connect to the server. Please try again later.');
          } else {
            setError('An error occurred. Please try again.');
          }
          toast.error(error || 'Authentication failed');
        }
      } else {
        // Signup logic
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {
          name,
          email,
          password,
          phoneNumber: formData.phoneNumber,
        });

        toast.success('Account created successfully!');
        setSuccess('Account created successfully! You can now log in.');
        setTimeout(() => navigate('/login'), 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-12">
      <Helmet>
        <title>{mode === 'login' ? 'Login' : 'Sign Up'} | MACHA Services</title>
      </Helmet>

      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 text-green-700 mb-6 group">
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to home</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden border border-green-100"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-green-600 to-black text-white">
            <h1 className="text-2xl font-bold">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-green-100 mt-1">
              {mode === 'login'
                ? 'Sign in to continue to MACHA services'
                : 'Join MACHA for doorstep delivery and services'}
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm flex items-center gap-2">
                <Check size={16} className="shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name input (only for signup) */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`pl-10 w-full text-black rounded-lg border ${formErrors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-green-600'} py-2.5 transition-all`}
                      placeholder="John Doe"
                    />
                  </div>
                  {formErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                  )}
                </div>
              )}

              {/* Email input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 w-full text-black rounded-lg border ${formErrors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-green-600'} py-2.5 transition-all`}
                    placeholder="you@example.com"
                  />
                </div>
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                )}
              </div>

              {/* Phone number input (only for signup) */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`pl-10 w-full text-black rounded-lg border ${formErrors.phoneNumber ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-green-600'} py-2.5 transition-all`}
                      placeholder="9876543210"
                      maxLength="10"
                    />
                  </div>
                  {formErrors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.phoneNumber}</p>
                  )}
                </div>
              )}

              {/* Password input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 w-full text-black rounded-lg border ${formErrors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-green-600'} py-2.5 transition-all`}
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
                {formErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                )}
                {mode === 'login' && (
                  <div className="flex justify-end mt-1">
                    <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-800">
                      Forgot password?
                    </Link>
                  </div>
                )}
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-black text-white rounded-lg font-medium hover:from-green-700 hover:to-black transition-all shadow-md disabled:opacity-70 flex items-center justify-center"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Google login button */}
            <div className="flex text-black justify-center">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex items-center text-black justify-center gap-2 py-2.5 px-6 w-full border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" className="w-5 h-5" />
                <span className="font-medium">Continue with Google</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <Link
                to={mode === 'login' ? '/signup' : '/login'}
                className="font-medium text-green-600 hover:text-green-800"
              >
                {mode === 'login' ? 'Sign up now' : 'Log in'}
              </Link>
            </p>
            {/* Restaurant registration link */}
            <p className="text-center text-xs text-gray-500 mt-2">
              Want to partner with us?{' '}
              <Link
                to="/restaurant/register"
                className="font-medium text-green-600 hover:text-green-800"
              >
                Register your restaurant
              </Link>
            </p>
          </div>
        </motion.div>

        <p className="text-center mt-6 text-sm text-gray-600">
          By using our services, you agree to our{' '}
          <Link to="/terms" className="text-green-600 hover:text-green-800">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-green-600 hover:text-green-800">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;