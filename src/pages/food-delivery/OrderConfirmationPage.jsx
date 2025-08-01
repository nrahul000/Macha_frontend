import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Clock, Package, ArrowRight, Home, AlertCircle } from 'lucide-react';
import { useFoodDelivery } from '../../context/FoodDeliveryContext';
import * as foodDeliveryService from '../../services/foodDeliveryService';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = location.state || {};

  useEffect(() => {
    // If no orderId, redirect to food delivery page
    if (!orderId) {
      navigate('/food-delivery');
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const orderData = await foodDeliveryService.getOrderById(orderId);
        setOrder(orderData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to load order details. Please check your orders page.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, navigate]);

  const formatAddress = (address) => {
    if (!address) return 'Address not available';
    return `${address.addressLine1}, ${address.area}${address.landmark ? `, near ${address.landmark}` : ''}, ${address.city}, ${address.state} - ${address.pincode}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              to="/food-delivery/orders"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              View Your Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-6"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-600">Thank you for your order. Your food is being prepared and will be delivered soon.</p>
          </div>

          <div className="border-t border-b border-gray-100 py-4 mb-6">
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <h2 className="text-sm text-gray-500 mb-1">Order Number</h2>
                <p className="font-medium text-gray-900">{order.orderId || order.id || order._id}</p>
              </div>
              <div>
                <h2 className="text-sm text-gray-500 mb-1">Date</h2>
                <p className="font-medium text-gray-900">{formatDate(order.timestamp || order.createdAt)}</p>
              </div>
              <div>
                <h2 className="text-sm text-gray-500 mb-1">Total Amount</h2>
                <p className="font-medium text-gray-900">₹{(order.total || order.orderTotal).toFixed(2)}</p>
              </div>
              <div>
                <h2 className="text-sm text-gray-500 mb-1">Payment Method</h2>
                <p className="font-medium text-gray-900 capitalize">
                  {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-medium text-gray-800 mb-4 flex items-center">
              <Package size={18} className="mr-2 text-green-600" />
              Order Details
            </h2>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                <MapPin size={14} className="mr-1" />
                Delivery Address
              </h3>
              <p className="text-gray-800">{order.deliveryAddress?.fullName}</p>
              <p className="text-gray-800">{formatAddress(order.deliveryAddress)}</p>
              <p className="text-sm text-gray-600 mt-1">
                {order.deliveryAddress?.type ? order.deliveryAddress.type.charAt(0).toUpperCase() + order.deliveryAddress.type.slice(1) : ''} Address
              </p>
            </div>

            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div className="flex items-start">
                    <div className="h-4 w-4 mt-1 mr-2">
                      {item.veg ? (
                        <span className="text-green-600">●</span>
                      ) : (
                        <span className="text-red-600">●</span>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-800">
                        {item.name} <span className="text-gray-500">x{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Item Total</span>
                <span>₹{(order.subtotal || order.itemTotal || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>₹{(order.deliveryFee || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes</span>
                <span>₹{(order.taxes || 0).toFixed(2)}</span>
              </div>
              {order.tip > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Tip</span>
                  <span>₹{order.tip.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>₹{(order.total || order.orderTotal).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-medium text-gray-800 mb-4 flex items-center">
              <Clock size={18} className="mr-2 text-green-600" />
              Delivery Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Estimated Delivery Time</h3>
                <p className="text-gray-800 font-medium">30-45 minutes</p>
                <p className="text-sm text-gray-600">Your food is being prepared and will be delivered soon</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                  <MapPin size={14} className="mr-1" />
                  Delivery Address
                </h3>
                <p className="text-gray-800">{order.deliveryAddress?.fullName}</p>
                <p className="text-gray-800">{formatAddress(order.deliveryAddress)}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {order.deliveryAddress?.type ? order.deliveryAddress.type.charAt(0).toUpperCase() + order.deliveryAddress.type.slice(1) : ''} Address
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/food-delivery/orders"
              className="py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium text-center transition-colors flex items-center justify-center"
            >
              View All Orders
              <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link
              to="/food-delivery"
              className="py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-center transition-colors flex items-center justify-center"
            >
              <Home size={16} className="mr-2" />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;