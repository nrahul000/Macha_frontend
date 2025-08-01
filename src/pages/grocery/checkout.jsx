import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check, MapPin, Plus, AlertCircle,
  CreditCard, Truck, Calendar
} from 'lucide-react';
import GroceryNavBar from '../../components/grocery/GroceryNavBar';

const GroceryCheckout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryTime, setDeliveryTime] = useState('standard');
  const [addressError, setAddressError] = useState('');
  // Cash on Delivery fields
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [nameError, setNameError] = useState('');
  const [contactError, setContactError] = useState('');

  // Fetch cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    } else {
      setCartItems([]);
    }
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = deliveryTime === 'express' ? 60 : 30;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    setAddressError('');
    setNameError('');
    setContactError('');

    if (!deliveryAddress.trim()) {
      setAddressError('Please enter a delivery address');
      valid = false;
    }
    if (paymentMethod === 'Cash on Delivery') {
      if (!customerName.trim()) {
        setNameError('Please enter your name');
        valid = false;
      }
      if (!contactNumber.trim()) {
        setContactError('Please enter your contact number');
        valid = false;
      }
    }
    if (!valid) return;

    setLoading(true);

    // Map payment method to backend enum
    const paymentMethodMap = {
      'Cash on Delivery': 'cod',
      'card': 'card',
      'upi': 'upi'
    };

    const userId = localStorage.getItem('userId'); // Make sure this is set on login

    const orderData = {
      userId,
      name: customerName,
      contact: contactNumber,
      address: deliveryAddress,
      paymentMethod: paymentMethodMap[paymentMethod] || paymentMethod,
      timeSlot: null,
      deliveryInstructions: '',
      orderTotal: total,
      cartItems: cartItems.map(item => ({
        _id: item._id || item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    };

    try {
      console.log('ORDER DATA:', orderData);
      const response = await fetch('/api/grocery/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (!response.ok) throw new Error('Order failed');
      localStorage.removeItem('cart');
      setFormSubmitted(true);
      setTimeout(() => {
        navigate('/grocery/orders/confirmation');
      }, 1500);
    } catch (err) {
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-black bg-gray-50">
      <GroceryNavBar />

      <div className="container mx-auto px-4 py-8 pt-28">
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="flex-grow">
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-8 text-center shadow-sm"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Successful!</h2>
                <p className="text-gray-600 mb-6">Your order has been placed and is being processed.</p>
                <p className="text-gray-600">Redirecting to confirmation page...</p>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="border-b border-gray-200">
                  <h1 className="text-2xl font-bold p-6">Checkout</h1>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                  {/* Cash on Delivery Details */}
                  {paymentMethod === 'Cash on Delivery' && (
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                          type="text"
                          value={customerName}
                          onChange={e => setCustomerName(e.target.value)}
                          className={`w-full border rounded-lg p-2 ${nameError ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter your name"
                          required
                        />
                        {nameError && <div className="text-red-500 text-sm mt-1">{nameError}</div>}
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Contact Number</label>
                        <input
                          type="tel"
                          value={contactNumber}
                          onChange={e => setContactNumber(e.target.value)}
                          className={`w-full border rounded-lg p-2 ${contactError ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter your contact number"
                          required
                        />
                        {contactError && <div className="text-red-500 text-sm mt-1">{contactError}</div>}
                      </div>
                    </div>
                  )}

                  {/* Delivery Address */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
                    <div className="space-y-4">
                      <div className="relative">
                        <textarea
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className={`w-full p-4 pr-10 border rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-green-500 ${addressError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'
                            }`}
                          placeholder="Enter your complete address with landmark..."
                        ></textarea>
                        <MapPin className="absolute top-4 right-3 text-gray-400" size={18} />
                      </div>
                      {addressError && (
                        <div className="flex items-start text-red-500 text-sm">
                          <AlertCircle size={16} className="mr-1 flex-shrink-0 mt-0.5" />
                          <span>{addressError}</span>
                        </div>
                      )}
                      <button
                        type="button"
                        className="inline-flex items-center text-sm text-green-600 font-medium"
                      >
                        <Plus size={16} className="mr-1" />
                        Add a new address
                      </button>
                    </div>
                  </div>

                  {/* Delivery Options */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Delivery Options</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className={`border ${deliveryTime === 'standard' ? 'border-green-500 bg-green-50' : 'border-gray-200'} rounded-lg p-4 flex cursor-pointer`}>
                        <input
                          type="radio"
                          name="deliveryTime"
                          value="standard"
                          checked={deliveryTime === 'standard'}
                          onChange={() => setDeliveryTime('standard')}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${deliveryTime === 'standard' ? 'bg-green-500 border-transparent' : 'border-gray-300'}`}>
                          {deliveryTime === 'standard' && <Check size={12} className="text-white" />}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">Standard Delivery</span>
                            <span className="text-green-600 font-medium">₹30</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Truck size={14} className="mr-1" />
                            <span>Within 3-4 hours</span>
                          </div>
                        </div>
                      </label>
                      <label className={`border ${deliveryTime === 'express' ? 'border-green-500 bg-green-50' : 'border-gray-200'} rounded-lg p-4 flex cursor-pointer`}>
                        <input
                          type="radio"
                          name="deliveryTime"
                          value="express"
                          checked={deliveryTime === 'express'}
                          onChange={() => setDeliveryTime('express')}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${deliveryTime === 'express' ? 'bg-green-500 border-transparent' : 'border-gray-300'}`}>
                          {deliveryTime === 'express' && <Check size={12} className="text-white" />}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">Express Delivery</span>
                            <span className="text-green-600 font-medium">₹60</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Truck size={14} className="mr-1" />
                            <span>Within 90 minutes</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    <div className="space-y-3">
                      <label className={`border ${paymentMethod === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-200'} rounded-lg p-4 flex cursor-pointer`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${paymentMethod === 'card' ? 'bg-green-500 border-transparent' : 'border-gray-300'}`}>
                          {paymentMethod === 'card' && <Check size={12} className="text-white" />}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center">
                            <CreditCard size={18} className="mr-2 text-gray-500" />
                            <span className="font-medium">Credit/Debit Card</span>
                          </div>
                        </div>
                      </label>
                      <label className={`border ${paymentMethod === 'upi' ? 'border-green-500 bg-green-50' : 'border-gray-200'} rounded-lg p-4 flex cursor-pointer`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${paymentMethod === 'upi' ? 'bg-green-500 border-transparent' : 'border-gray-300'}`}>
                          {paymentMethod === 'upi' && <Check size={12} className="text-white" />}
                        </div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                            <span className="text-indigo-600 text-xs font-bold">UPI</span>
                          </div>
                          <span className="font-medium">UPI Payment</span>
                        </div>
                      </label>
                      <label className={`border ${paymentMethod === 'Cash on Delivery' ? 'border-green-500 bg-green-50' : 'border-gray-200'} rounded-lg p-4 flex cursor-pointer`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Cash on Delivery"
                          checked={paymentMethod === 'Cash on Delivery'}
                          onChange={() => setPaymentMethod('Cash on Delivery')}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${paymentMethod === 'Cash on Delivery' ? 'bg-green-500 border-transparent' : 'border-gray-300'}`}>
                          {paymentMethod === 'Cash on Delivery' && <Check size={12} className="text-white" />}
                        </div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                            <span className="text-green-600 text-xs font-bold">₹</span>
                          </div>
                          <span className="font-medium">Cash on Delivery</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      paymentMethod === 'Cash on Delivery'
                        ? 'Place Order'
                        : `Pay ₹${total.toFixed(2)}`
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {!formSubmitted && (
            <div className="w-full md:w-[360px] lg:w-[400px] flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-28">
                <div className="border-b border-gray-200">
                  <h2 className="text-xl font-semibold p-6">Order Summary</h2>
                </div>
                {/* Cart Items */}
                <div className="p-6 border-b border-gray-200">
                  <div className="space-y-4">
                    {cartItems.length === 0 ? (
                      <p className="text-gray-500">Your cart is empty.</p>
                    ) : (
                      cartItems.map(item => (
                        <div key={item._id || item.id} className="flex gap-3">
                          <img
                            src={item.images && item.images.length > 0 ? item.images[0] : item.image || '/no-image.png'}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h3 className="font-medium line-clamp-1">{item.name}</h3>
                              <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="text-sm text-gray-500">
                              ₹{item.price.toFixed(2)} x {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                {/* Price Breakdown */}
                <div className="p-6">
                  <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className="font-medium">₹{deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mt-4 pt-3 border-t border-gray-100 text-lg">
                      <span className="font-medium text-gray-900">Total</span>
                      <span className="font-semibold text-gray-900">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                  {/* Estimated Delivery */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Calendar className="text-gray-500 mr-2" size={16} />
                      <span className="font-medium">Estimated Delivery</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {deliveryTime === 'express' ? 'Today within 90 minutes' : 'Today within 3-4 hours'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroceryCheckout;