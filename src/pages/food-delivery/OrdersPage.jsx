import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Package, Clock, MapPin, Search,
  CheckCircle, X, Truck, AlertCircle, ShoppingBag, ChevronDown, ChevronUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import * as foodDeliveryService from '../../services/foodDeliveryService';

const OrdersPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!currentUser) {
      navigate('/login', { state: { from: '/food-delivery/orders' } });
      return;
    }

    // Fetch orders from the API
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const orderData = await foodDeliveryService.getUserOrders();
        setOrders(orderData);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load your orders. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser, navigate]);

  const getStatusDetails = (status) => {
    switch (status) {
      case 'confirmed':
        return {
          icon: <CheckCircle size={18} className="text-green-600" />,
          color: 'bg-green-100 text-green-800',
          label: 'Confirmed'
        };
      case 'preparing':
        return {
          icon: <Clock size={18} className="text-blue-600" />,
          color: 'bg-blue-100 text-blue-800',
          label: 'Preparing'
        };
      case 'out_for_delivery':
        return {
          icon: <Truck size={18} className="text-purple-600" />,
          color: 'bg-purple-100 text-purple-800',
          label: 'Out for Delivery'
        };
      case 'delivered':
        return {
          icon: <CheckCircle size={18} className="text-green-600" />,
          color: 'bg-green-100 text-green-800',
          label: 'Delivered'
        };
      case 'cancelled':
        return {
          icon: <X size={18} className="text-red-600" />,
          color: 'bg-red-100 text-red-800',
          label: 'Cancelled'
        };
      default:
        return {
          icon: <AlertCircle size={18} className="text-gray-600" />,
          color: 'bg-gray-100 text-gray-800',
          label: status.charAt(0).toUpperCase() + status.slice(1)
        };
    }
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

  const formatAddress = (address) => {
    if (!address) return 'Address not available';
    return `${address.street}, ${address.area}${address.landmark ? `, near ${address.landmark}` : ''}, ${address.city}`;
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(order => order.status === filterStatus);

  // Handle reorder
  const handleReorder = async (order) => {
    try {
      // Add items to cart
      // In a real app, you would use the addToCart function from context
      alert("Reorder functionality will be implemented with the cart context");
      navigate('/food-delivery');
    } catch (error) {
      console.error('Failed to reorder:', error);
      alert('Failed to reorder. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-3 pb-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Link to="/food-delivery" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to Restaurants</span>
          </Link>
          <h1 className="text-2xl font-bold text-center text-black flex-grow pr-16">Your Orders</h1>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}

        {!error && orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md mx-auto"
          >
            <div className="mb-6 w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet. Browse restaurants and place your first order.</p>
            <Link
              to="/food-delivery"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Browse Restaurants
              <ArrowLeft size={16} className="ml-2" />
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Filter tabs */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterStatus === 'all'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  All Orders
                </button>
                <button
                  onClick={() => setFilterStatus('confirmed')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterStatus === 'confirmed'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Processing
                </button>
                <button
                  onClick={() => setFilterStatus('delivered')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterStatus === 'delivered'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Delivered
                </button>
                <button
                  onClick={() => setFilterStatus('cancelled')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterStatus === 'cancelled'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Cancelled
                </button>
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="mb-4 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No {filterStatus} orders found</h3>
                <p className="text-gray-600 mb-4">Try selecting a different filter or place a new order</p>
                <button
                  onClick={() => setFilterStatus('all')}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
                >
                  Show All Orders
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const statusDetails = getStatusDetails(order.status || 'confirmed');
                  const isExpanded = expandedOrderId === order.id;

                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-lg shadow-sm overflow-hidden"
                    >
                      {/* Order header */}
                      <div className="border-b border-gray-100 p-4">
                        <div className="flex text-black flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center">
                            <Package size={18} className="text-green-600 mr-2" />
                            <div>
                              <div className="font-medium text-gray-900">{order.orderId || order.id}</div>
                              <div className="text-xs text-gray-500">{formatDate(order.timestamp || order.createdAt)}</div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusDetails.color} flex items-center`}>
                              {statusDetails.icon}
                              <span className="ml-1">{statusDetails.label}</span>
                            </div>
                            <div className="font-medium text-black">₹{(order.total || order.orderTotal || 0).toFixed(2)}</div>
                          </div>
                        </div>
                      </div>

                      {/* Order brief info */}
                      <div className="p-4 flex text-black items-center justify-between cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{order.restaurantName}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'} •
                            {order.items.slice(0, 2).map((item, idx) => (
                              <span key={idx} className="ml-1">
                                {item.name}{idx < Math.min(2, order.items.length - 1) ? ',' : ''}
                              </span>
                            ))}
                            {order.items.length > 2 && <span> & {order.items.length - 2} more</span>}
                          </div>
                          {order.address && (
                            <div className="flex items-center text-xs text-gray-500 mt-2">
                              <MapPin size={12} className="mr-1" />
                              {formatAddress(order.address)}
                            </div>
                          )}
                        </div>
                        <button
                          className="ml-4 text-gray-500 hover:text-gray-700 p-1"
                          aria-label={isExpanded ? 'Collapse' : 'Expand'}
                        >
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>

                      {/* Order details (expandable) */}
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 pb-4 border-t border-gray-100 pt-3"
                        >
                          {/* Items list */}
                          <div className="text-black mb-4">
                            <h3 className="font-medium text-gray-700 mb-2">Order Items</h3>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                  <div className="flex items-start">
                                    <div className="h-4 w-4 mt-0.5 mr-2">
                                      {item.veg ? (
                                        <span className="text-green-600">●</span>
                                      ) : (
                                        <span className="text-red-600">●</span>
                                      )}
                                    </div>
                                    <span>{item.name} x {item.quantity}</span>
                                  </div>
                                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Price breakdown */}
                          <div className="text-black mb-4">
                            <h3 className="font-medium text-gray-700 mb-2">Payment Details</h3>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Item Total</span>
                                <span>₹{(order.subtotal || order.itemTotal || 0).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Delivery Fee</span>
                                <span>₹{(order.deliveryFee || 0).toFixed(2)}</span>
                              </div>
                              {order.taxes > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Taxes</span>
                                  <span>₹{order.taxes.toFixed(2)}</span>
                                </div>
                              )}
                              {order.tip > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Tip</span>
                                  <span>₹{order.tip.toFixed(2)}</span>
                                </div>
                              )}
                              <div className="flex justify-between font-medium pt-1 mt-1 border-t border-gray-100">
                                <span>Total</span>
                                <span>₹{(order.total || order.orderTotal || 0).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>

                          {order.status !== 'delivered' && order.status !== 'cancelled' && (
                            <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium">
                              Track Order
                            </button>
                          )}

                          {order.status === 'delivered' && (
                            <button
                              onClick={() => handleReorder(order)}
                              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium"
                            >
                              Reorder
                            </button>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
