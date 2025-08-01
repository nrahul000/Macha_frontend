import React, { createContext, useContext, useState, useEffect } from 'react';
import * as foodDeliveryService from '../services/foodDeliveryService';

// Create context
const FoodDeliveryContext = createContext();

// Context provider component
export const FoodDeliveryProvider = ({ children }) => {
  // Get authenticated user from localStorage
  const getAuthenticatedUser = () => {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      try {
        return JSON.parse(userJSON);
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
      }
    }
    return null;
  };

  const currentUser = getAuthenticatedUser();

  const [restaurants, setRestaurants] = useState([]);
  const [popularRestaurants, setPopularRestaurants] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartRestaurant, setCartRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('foodDeliveryCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);

        // If the cart has items, set the restaurant
        if (parsedCart.length > 0 && parsedCart[0].restaurantId) {
          setCartRestaurant({
            id: parsedCart[0].restaurantId,
            name: parsedCart[0].restaurantName
          });
        }
      } catch (e) {
        console.error('Error parsing cart from localStorage:', e);
      }
    }

    // Fetch initial data
    fetchRestaurants();
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('foodDeliveryCart', JSON.stringify(cart));
  }, [cart]);

  // Fetch all restaurants
  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await foodDeliveryService.getRestaurants();
      setRestaurants(data);

      // Filter for popular restaurants based on rating
      const popular = data.filter(r => r.rating >= 4.5).slice(0, 5);
      setPopularRestaurants(popular);

      setLoading(false);
    } catch (err) {
      setError('Failed to fetch restaurants. Please try again later.');
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = (item, restaurant) => {
    // Check if cart is empty
    if (cart.length === 0 && restaurant) {
      // Set the restaurant for the cart
      setCartRestaurant(restaurant);
    } else if (cart.length > 0 && restaurant && cartRestaurant && restaurant.id !== cartRestaurant.id) {
      // If adding from a different restaurant, confirm with the user
      if (!window.confirm(`Your cart contains items from ${cartRestaurant.name}. Adding items from ${restaurant.name} will replace your current cart. Would you like to continue?`)) {
        return;
      }
      // Clear the cart and set the new restaurant
      setCart([]);
      setCartRestaurant(restaurant);
    } else if (cart.length === 0 && !restaurant) {
      // Handle case where no restaurant is provided for empty cart
      console.error('Cannot add item to cart without restaurant information');
      alert('Error adding item to cart. Please try again.');
      return;
    }

    // Check if the item already exists in the cart
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      // If item exists, increment its quantity
      setCart(
        cart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // Otherwise, add the new item with quantity 1
      setCart(prevCart => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem && existingItem.quantity > 1) {
      // Reduce quantity
      setCart(prevCart =>
        prevCart.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      // Remove item
      setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== itemId));

      // If cart is now empty, reset restaurant
      if (cart.length === 1) {
        setCartRestaurant(null);
      }
    }
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    setCartRestaurant(null);
  };

  // Toggle favorite status
  const toggleFavorite = async (restaurantId) => {
    if (!currentUser) {
      if (window.confirm('Please sign in to save favorites. Go to sign in page?')) {
        window.location.href = '/login';
      }
      return;
    }

    const isFavorite = !userFavorites.includes(restaurantId);

    // Optimistic update
    if (isFavorite) {
      setUserFavorites(prev => [...prev, restaurantId]);
    } else {
      setUserFavorites(prev => prev.filter(id => id !== restaurantId));
    }

    try {
      await foodDeliveryService.saveUserFavorites(restaurantId, isFavorite);
    } catch (error) {
      // Revert on failure
      if (isFavorite) {
        setUserFavorites(prev => prev.filter(id => id !== restaurantId));
      } else {
        setUserFavorites(prev => [...prev, restaurantId]);
      }
      console.error('Error updating favorite status:', error);
    }
  };

  // Place order
  const placeOrder = async (orderData) => {
    try {
      if (!cartRestaurant) {
        throw new Error('No restaurant selected for this order');
      }

      const order = await foodDeliveryService.placeOrder({
        ...orderData,
        items: cart,
        restaurantId: cartRestaurant.id,
        restaurantName: cartRestaurant.name
      });

      // Clear cart after successful order
      clearCart();
      return order;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  };

  // Calculate cart totals
  const getCartTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = cart.length > 0 ? 40 : 0;
    const taxes = subtotal * 0.05; // 5% tax
    const total = subtotal + deliveryFee + taxes;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      deliveryFee: parseFloat(deliveryFee.toFixed(2)),
      taxes: parseFloat(taxes.toFixed(2)),
      total: parseFloat(total.toFixed(2))
    };
  };

  // Add this function to fetch user addresses
  const fetchUserAddresses = async () => {
    try {
      const addresses = await foodDeliveryService.getSavedAddresses();
      setUserAddresses(addresses);
      return addresses;
    } catch (error) {
      console.error('Error fetching user addresses:', error);
      return [];
    }
  };

  // Call fetchUserAddresses when the provider mounts if the user is logged in
  useEffect(() => {
    // Assuming you have a way to check if the user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserAddresses();
    }
  }, []);

  // Context value
  const contextValue = {
    restaurants,
    popularRestaurants,
    userFavorites,
    userAddresses,
    cart,
    cartRestaurant,
    loading,
    error,
    addToCart,
    removeFromCart,
    clearCart,
    toggleFavorite,
    placeOrder,
    getCartTotal,
    fetchRestaurants,
    fetchUserAddresses // Add this to the context value
  };

  return (
    <FoodDeliveryContext.Provider value={contextValue}>
      {children}
    </FoodDeliveryContext.Provider>
  );
};

// Custom hook for using the context
export function useFoodDelivery() {
  const context = useContext(FoodDeliveryContext);
  if (!context) {
    throw new Error('useFoodDelivery must be used within a FoodDeliveryProvider');
  }
  return context;
}
export default FoodDeliveryContext;