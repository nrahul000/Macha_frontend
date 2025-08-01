import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import GroceryNavBar from '../../components/grocery/GroceryNavBar';

// Utility to get cart from localStorage
const getCartFromStorage = () => {
  try {
    const stored = localStorage.getItem('cart');
    const parsed = stored ? JSON.parse(stored) : [];
    // Ensure it's always an array
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error parsing cart from localStorage:', error);
    return [];
  }
};

const GroceryCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const cart = getCartFromStorage();
      setCartItems(cart);
      setIsLoading(false);
    }, 400);
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    if (!isLoading && Array.isArray(cartItems)) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems => {
      // Ensure prevItems is always an array
      const items = Array.isArray(prevItems) ? prevItems : [];
      const updated = items.map(item =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeItem = (itemId) => {
    setCartItems(prevItems => {
      // Ensure prevItems is always an array
      const items = Array.isArray(prevItems) ? prevItems : [];
      const updated = items.filter(item => item._id !== itemId);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  // Calculate totals - ensure cartItems is always an array
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const subtotal = safeCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = safeCartItems.length > 0 ? 30 : 0;
  const total = subtotal + deliveryFee;

  const handleProceedToCheckout = () => {
    navigate('/grocery/checkout');
  };

  return (
    <div className="min-h-screen text-black bg-gray-50">
      <GroceryNavBar />

      <div className="container mx-auto px-4 py-8 pt-28">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <Link to="/grocery" className="text-green-600 hover:text-green-700 flex items-center">
            <span>Continue Shopping</span>
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading your cart...</p>
          </div>
        ) : safeCartItems.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-sm flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 text-center">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/grocery"
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-grow">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">{safeCartItems.length} {safeCartItems.length === 1 ? 'Item' : 'Items'} in Cart</h2>
                </div>

                <ul className="divide-y divide-gray-200">
                  {safeCartItems.map(item => (
                    <motion.li
                      key={item._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      layout
                      className="p-6"
                    >
                      <div className="flex items-center">
                        <img
                          src={
                            (item.images && item.images.length > 0)
                              ? item.images[0]
                              : item.image || '/no-image.png'
                          }
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        />

                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-gray-500 text-sm">₹{item.price}/unit</p>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-gray-200 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                className="px-3 py-1 hover:bg-gray-100 transition-colors"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-3 py-1 border-l border-r border-gray-200 min-w-[40px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="px-3 py-1 hover:bg-gray-100 transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            <div className="flex items-center">
                              <span className="font-semibold text-lg mr-4">₹{(item.price * item.quantity).toFixed(2)}</span>
                              <button
                                onClick={() => removeItem(item._id)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-[380px]">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-28">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-medium">₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200 text-gray-800">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full mt-6 py-3.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <span className="mr-2">Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Secure checkout powered by our payment partners
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroceryCart;