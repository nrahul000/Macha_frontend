import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [userRestaurants, setUserRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Fetch user's restaurants when user is authenticated
  useEffect(() => {
    if (currentUser) {
      fetchUserRestaurants();
    } else {
      setUserRestaurants([]);
    }
  }, [currentUser]);

  // Fetch restaurants owned by the current user
  const fetchUserRestaurants = async () => {
    if (!currentUser) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${API_BASE_URL}/restaurants/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUserRestaurants(response.data.restaurants || []);
    } catch (error) {
      console.error('Error fetching user restaurants:', error);
      setError('Failed to load your restaurants. Please try again.');

      // Use demo data for testing UI in case of API failure
      setUserRestaurants([
        {
          _id: 'r1',
          name: 'Demo Restaurant',
          description: 'Your demo restaurant for testing',
          cuisine: ['North Indian', 'South Indian'],
          isActive: true,
          address: {
            city: 'Choutuppal',
            state: 'Telangana'
          },
          rating: 4.5
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Register a new restaurant
  const registerRestaurant = async (restaurantData) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(`${API_BASE_URL}/restaurants`,
        restaurantData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUserRestaurants([...userRestaurants, response.data.restaurant]);
      return response.data.restaurant;
    } catch (error) {
      console.error('Error registering restaurant:', error);
      setError(error.response?.data?.message || 'Failed to register restaurant. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update restaurant details
  const updateRestaurant = async (restaurantId, restaurantData) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(`${API_BASE_URL}/restaurants/${restaurantId}`,
        restaurantData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update restaurant in state
      setUserRestaurants(userRestaurants.map(restaurant =>
        restaurant._id === restaurantId ? response.data.restaurant : restaurant
      ));

      return response.data.restaurant;
    } catch (error) {
      console.error('Error updating restaurant:', error);
      setError(error.response?.data?.message || 'Failed to update restaurant. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Toggle restaurant active status
  const toggleRestaurantStatus = async (restaurantId, isActive) => {
    try {
      const token = localStorage.getItem('token');

      await axios.patch(
        `${API_BASE_URL}/restaurants/${restaurantId}/status`,
        { isActive },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update restaurant status in state
      setUserRestaurants(userRestaurants.map(restaurant =>
        restaurant._id === restaurantId ? { ...restaurant, isActive } : restaurant
      ));
    } catch (error) {
      console.error('Error updating restaurant status:', error);
      throw error;
    }
  };

  // Add menu item
  const addMenuItem = async (restaurantId, menuItemData) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${API_BASE_URL}/restaurants/${restaurantId}/menu`,
        menuItemData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return response.data.menuItem;
    } catch (error) {
      console.error('Error adding menu item:', error);
      throw error;
    }
  };

  // Update menu item
  const updateMenuItem = async (restaurantId, menuItemId, menuItemData) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(
        `${API_BASE_URL}/restaurants/${restaurantId}/menu/${menuItemId}`,
        menuItemData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return response.data.menuItem;
    } catch (error) {
      console.error('Error updating menu item:', error);
      throw error;
    }
  };

  // Delete menu item
  const deleteMenuItem = async (restaurantId, menuItemId) => {
    try {
      const token = localStorage.getItem('token');

      await axios.delete(
        `${API_BASE_URL}/restaurants/${restaurantId}/menu/${menuItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.error('Error deleting menu item:', error);
      throw error;
    }
  };

  // Get restaurant orders
  const getRestaurantOrders = async (restaurantId, options = {}) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(
        `${API_BASE_URL}/restaurants/${restaurantId}/orders`,
        {
          params: options,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching restaurant orders:', error);
      throw error;
    }
  };

  return (
    <RestaurantContext.Provider
      value={{
        userRestaurants,
        loading,
        error,
        fetchUserRestaurants,
        registerRestaurant,
        updateRestaurant,
        toggleRestaurantStatus,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        getRestaurantOrders
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => useContext(RestaurantContext);

export default RestaurantContext;
