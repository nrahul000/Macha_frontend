import React, { createContext, useContext, useState, useEffect } from 'react';

const GroceryContext = createContext();

export const useGrocery = () => {
  const context = useContext(GroceryContext);
  if (!context) {
    throw new Error('useGrocery must be used within a GroceryProvider');
  }
  return context;
};

export const GroceryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('groceryCart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Ensure it's always an array
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        } else {
          console.warn('Invalid cart data in localStorage, resetting to empty cart');
          setCartItems([]);
          localStorage.removeItem('groceryCart');
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setCartItems([]);
      localStorage.removeItem('groceryCart');
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    if (Array.isArray(cartItems)) {
      localStorage.setItem('groceryCart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // ...existing code...
  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Mock data for now - replace with actual API calls
        const mockProducts = [
          {
            _id: '1',
            name: 'Fresh Tomatoes',
            price: 30,
            oldPrice: 35,
            images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500'],
            unit: '1 kg',
            category: 'Vegetables',
            inStock: true,
            rating: 4.5,
            reviews: 125,
            description: 'Fresh, ripe tomatoes perfect for cooking'
          },
          {
            _id: '2',
            name: 'Basmati Rice',
            price: 120,
            oldPrice: 140,
            images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500'],
            unit: '5 kg',
            category: 'Grains',
            inStock: true,
            rating: 4.8,
            reviews: 89,
            description: 'Premium quality basmati rice'
          },
          {
            _id: '3',
            name: 'Fresh Milk',
            price: 25,
            images: ['https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500'],
            unit: '500ml',
            category: 'Dairy',
            inStock: true,
            rating: 4.2,
            reviews: 67,
            description: 'Fresh cow milk, delivered daily'
          },
          {
            _id: '4',
            name: 'Organic Apples',
            price: 80,
            oldPrice: 90,
            images: ['https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500'],
            unit: '1 kg',
            category: 'Fruits',
            inStock: true,
            rating: 4.6,
            reviews: 143,
            description: 'Fresh organic apples, sweet and crispy'
          },
          {
            _id: '5',
            name: 'Whole Wheat Bread',
            price: 35,
            images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500'],
            unit: '450g',
            category: 'Bakery',
            inStock: true,
            rating: 4.3,
            reviews: 89,
            description: 'Freshly baked whole wheat bread'
          },
          {
            _id: '6',
            name: 'Onions',
            price: 20,
            oldPrice: 25,
            images: ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500'],
            unit: '1 kg',
            category: 'Vegetables',
            inStock: true,
            rating: 4.1,
            reviews: 76,
            description: 'Fresh red onions, perfect for cooking'
          }
        ];

        const mockCategories = [
          { _id: '1', name: 'Vegetables', image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=300' },
          { _id: '2', name: 'Fruits', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300' },
          { _id: '3', name: 'Dairy', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300' },
          { _id: '4', name: 'Grains', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300' },
          { _id: '5', name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300' }
        ];

        setProducts(mockProducts);
        setCategories(mockCategories);
      } catch (error) {
        console.error('Error fetching grocery data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Ensure prevItems is always an array
      const items = Array.isArray(prevItems) ? prevItems : [];
      const existingItem = items.find(item => item._id === product._id);
      if (existingItem) {
        return items.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...items, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems => {
      // Ensure prevItems is always an array
      const items = Array.isArray(prevItems) ? prevItems : [];
      return items.map(item =>
        item._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      // Ensure prevItems is always an array
      const items = Array.isArray(prevItems) ? prevItems : [];
      return items.filter(item => item._id !== productId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    // Ensure cartItems is always an array before using reduce
    const items = Array.isArray(cartItems) ? cartItems : [];
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    // Ensure cartItems is always an array before using reduce
    const items = Array.isArray(cartItems) ? cartItems : [];
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    products,
    categories,
    cartItems: Array.isArray(cartItems) ? cartItems : [], // Always ensure it's an array
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount
  };

  return (
    <GroceryContext.Provider value={value}>
      {children}
    </GroceryContext.Provider>
  );
};