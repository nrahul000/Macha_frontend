import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize currentUser from localStorage if available
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Axios interceptors for authentication
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          if (currentUser) {
            logout();
            setAuthError('Your session has expired. Please login again.');
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [currentUser]);

  // Check auth status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        await axios.get(`${API_BASE_URL}/health`, { timeout: 2000 });
        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000
        });
        if (response.data && response.data.user) {
          setCurrentUser({
            ...response.data.user,
            role: response.data.user.role || 'user'
          });
          localStorage.setItem('user', JSON.stringify({
            ...response.data.user,
            role: response.data.user.role || 'user'
          }));
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [API_BASE_URL]);

  // Save user and token to localStorage on login
  const login = (userData, token) => {
    const user = {
      ...userData,
      role: userData.role || 'user'
    };
    setCurrentUser(user);
    setAuthError(null);
    if (token) {
      localStorage.setItem('token', token);
    }
    localStorage.setItem('user', JSON.stringify(user));
  };

  // Remove user and token from localStorage on logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const updateUserProfile = (updatedData) => {
    setCurrentUser(prev => {
      const updatedUser = { ...prev, ...updatedData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const loginRestaurantOwner = (restaurantData, token) => {
    const owner = {
      ...restaurantData,
      role: 'restaurant_owner'
    };
    setCurrentUser(owner);
    setAuthError(null);
    if (token) {
      localStorage.setItem('token', token);
    }
    localStorage.setItem('user', JSON.stringify(owner));
  };

  const value = {
    currentUser,
    loading,
    authError,
    login,
    logout,
    loginRestaurantOwner,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Add this to your AuthContext


export const useAuth = () => useContext(AuthContext);

export default AuthContext;