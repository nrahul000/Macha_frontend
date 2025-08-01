import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Add this import

// Base API URL - Falls back to localhost if env var not set
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Sample restaurant data for development/fallback
const SAMPLE_RESTAURANTS = [
  {
    id: "r1",
    name: "Spice Garden",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    cuisineType: ["North Indian", "Biryani"],
    cuisine: "North Indian, Biryani",
    rating: 4.3,
    deliveryTime: 30,
    priceForTwo: 300,
    discount: "50% OFF up to ₹100",
    promoted: true,
    veg: false,
    menuItems: [
      {
        id: "m1-r1",
        name: "Chicken Biryani",
        description: "Aromatic basmati rice cooked with tender chicken pieces and special spices",
        price: 180,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D",
        veg: false,
        bestseller: true
      },
      {
        id: "m2-r1",
        name: "Paneer Butter Masala",
        description: "Cottage cheese cubes cooked in rich tomato and butter gravy",
        price: 160,
        image: "https://plus.unsplash.com/premium_photo-1669150852127-2435512add18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFuZWVyJTIwYnV0dGVyfGVufDB8fDB8fHww",
        veg: true,
        bestseller: false
      },
      {
        id: "m3-r1",
        name: "Butter Naan",
        description: "Soft bread made in clay oven and topped with butter",
        price: 30,
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmFhbnxlbnwwfHwwfHx8MA%3D%3D",
        veg: true,
        bestseller: false
      }
    ]
  },
  {
    id: "r2",
    name: "Royal Chinese",
    image: "https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
    cuisineType: ["Chinese", "Fast Food"],
    cuisine: "Chinese, Fast Food",
    rating: 4.1,
    deliveryTime: 25,
    priceForTwo: 250,
    discount: "FREE delivery",
    promoted: false,
    veg: false,
    menuItems: [
      {
        id: "m1-r2",
        name: "Veg Fried Rice",
        description: "Rice stir-fried with assorted vegetables and soy sauce",
        price: 120,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZWQlMjByaWNlfGVufDB8fDB8fHww",
        veg: true,
        bestseller: true
      },
      {
        id: "m2-r2",
        name: "Chilli Chicken",
        description: "Spicy fried chicken tossed with bell peppers and onions",
        price: 180,
        image: "https://images.unsplash.com/photo-1633513470563-d9c44304e4e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hpbGxpJTIwY2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D",
        veg: false,
        bestseller: true
      }
    ]
  },
  {
    id: "r3",
    name: "Pure Veg Delight",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5kaWFuJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    cuisineType: ["South Indian", "North Indian"],
    cuisine: "South Indian, North Indian",
    rating: 4.5,
    deliveryTime: 20,
    priceForTwo: 200,
    discount: "20% OFF",
    promoted: true,
    veg: true,
    menuItems: [
      {
        id: "m1-r3",
        name: "Masala Dosa",
        description: "Crispy rice crepe filled with spiced potato mixture",
        price: 90,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9zYXxlbnwwfHwwfHx8MA%3D%3D",
        veg: true,
        bestseller: true
      },
      {
        id: "m2-r3",
        name: "Idli Sambar",
        description: "Steamed rice cakes served with lentil soup and coconut chutney",
        price: 70,
        image: "https://images.unsplash.com/photo-1589301961826-b196e23aac9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aWRsaXxlbnwwfHwwfHx8MA%3D%3D",
        veg: true,
        bestseller: false
      }
    ]
  }
];

/**
 * Fetches restaurant data from the API or falls back to sample data
 * @param {Object} options - Filter options like category, location
 * @returns {Promise<Array>} - Array of restaurant objects
 */
export const getRestaurants = async (options = {}) => {
  try {
    // Try to fetch from API first
    const response = await axios.get(`${API_BASE_URL}/food-delivery/restaurants`, {
      params: options,
      timeout: 5000 // 5 second timeout
    });
    return response.data.restaurants;
  } catch (error) {
    console.log('Using fallback restaurant data');
    // Return sample data as fallback
    return SAMPLE_RESTAURANTS;
  }
};

/**
 * Fetches popular restaurant data
 * @returns {Promise<Array>} - Array of popular restaurant objects
 */
export const getPopularRestaurants = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/food-delivery/restaurants/popular`);
    return response.data.restaurants;
  } catch (error) {
    // Return top-rated sample restaurants as fallback
    return SAMPLE_RESTAURANTS.filter(restaurant => restaurant.rating >= 4.3);
  }
};

/**
 * Gets restaurant details by ID
 * @param {string} id - Restaurant ID
 * @returns {Promise<Object>} - Restaurant object
 */
export const getRestaurantById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/food-delivery/restaurants/${id}`);
    return response.data.restaurant;
  } catch (error) {
    // Return matching sample restaurant as fallback
    const restaurant = SAMPLE_RESTAURANTS.find(r => r.id === id);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    return restaurant;
  }
};

/**
 * Places a food order
 * @param {Object} orderData - Order details including items, address, payment
 * @returns {Promise<Object>} - Order confirmation details
 */
export const placeOrder = async (orderData) => {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.post(
      `${API_BASE_URL}/food-delivery/orders`,
      orderData,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    // For demo purposes, return a mock successful order
    return {
      success: true,
      orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      message: "Order placed successfully! This is a demo order."
    };
  }
};

/**
 * Gets user's order history
 * @param {Object} options - Pagination and filter options
 * @returns {Promise<Array>} - Array of order objects
 */
export const getOrderHistory = async (options = {}) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required');

    const response = await axios.get(`${API_BASE_URL}/food-delivery/orders/history`, {
      headers: { Authorization: `Bearer ${token}` },
      params: options
    });

    return response.data.orders;
  } catch (error) {
    console.error('Error fetching order history:', error);
    // Return empty array as fallback
    return [];
  }
};

/**
 * Gets a specific order by ID
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} - Order details
 */
export const getOrderById = async (orderId) => {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(
      `${API_BASE_URL}/food-delivery/orders/${orderId}`,
      { headers }
    );

    return response.data.order;
  } catch (error) {
    console.error('Error fetching order:', error);
    // Return mock order data
    return {
      id: orderId,
      status: 'processing',
      items: [],
      total: 0,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString()
    };
  }
};

/**
 * Cancels an order
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} - Cancellation confirmation
 */
export const cancelOrder = async (orderId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required');

    const response = await axios.post(
      `${API_BASE_URL}/food-delivery/orders/${orderId}/cancel`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw new Error('Failed to cancel order');
  }
};

/**
 * Gets saved user addresses
 * @returns {Promise<Array>} - Array of address objects
 */
export const getSavedAddresses = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return [];

    const response = await axios.get(
      `${API_BASE_URL}/users/addresses`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data.addresses;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return [];
  }
};

/**
 * Saves a new delivery address
 * @param {Object} addressData - Address details
 * @returns {Promise<Object>} - Saved address
 */
export const saveAddress = async (addressData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required');

    const response = await axios.post(
      `${API_BASE_URL}/users/addresses`,
      addressData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data.address;
  } catch (error) {
    console.error('Error saving address:', error);
    throw new Error('Failed to save address');
  }
};

/**
 * Gets all orders for the current user
 * @returns {Promise<Array>} - Array of order objects
 */
export const getUserOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required');
    const response = await axios.get(
      `${API_BASE_URL}/food-delivery/orders`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.orders;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
};


// Export additional utility functions
export default {
  getRestaurants,
  getPopularRestaurants,
  getRestaurantById,
  placeOrder,
  getOrderHistory,
  getOrderById,
  cancelOrder,
  getSavedAddresses,
  saveAddress,
  getUserOrders
};
