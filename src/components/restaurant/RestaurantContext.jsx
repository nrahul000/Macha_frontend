import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const [userRestaurants, setUserRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserRestaurants = async () => {
    if (!isAuthenticated || authLoading) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Use correct endpoint with authentication
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/restaurants/user`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data && response.data.success) {
        setUserRestaurants(response.data.restaurants);
      } else {
        setUserRestaurants([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user restaurants:', error);
      setError(error.message || 'Failed to fetch your restaurants');
      setUserRestaurants([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      fetchUserRestaurants();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  return (
    <RestaurantContext.Provider
      value={{
        userRestaurants,
        loading,
        error,
        fetchUserRestaurants,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => useContext(RestaurantContext);

export default RestaurantContext;
