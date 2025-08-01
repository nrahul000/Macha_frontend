import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Truck, Clock, ArrowLeft, ShoppingBag, Plus, Minus, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFoodDelivery } from '../../context/FoodDeliveryContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const {
    cart,
    cartRestaurant,
    addToCart,
    removeFromCart,
    clearCart,
    placeOrder,
    getCartTotal,
    userAddresses,
    fetchUserAddresses
  } = useFoodDelivery();

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [address, setAddress] = useState({
    fullName: currentUser?.displayName || '',
    phone: '',
    street: '',
    area: '',
    landmark: '',
    city: 'Choutuppal',
    state: 'Telangana',
    pincode: '508252',
    type: 'home',
  });
  const [useExistingAddress, setUseExistingAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [tip, setTip] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Load user's saved addresses when component mounts
  useEffect(() => {
    if (currentUser) {
      fetchUserAddresses();
    }
  }, [currentUser]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/food-delivery');
    }
  }, [cart, navigate]);

  // Calculate total with tip
  const cartTotals = getCartTotal();
  const totalWithTip = cartTotals.total + tip;

  const handleQuantityChange = (itemId, change) => {
    if (change > 0) {
      const item = cart.find(item => item.id === itemId);
      if (item) {
        addToCart(item, cartRestaurant);
      }
    } else {
      removeFromCart(itemId);
    }
  };

  const handleTipChange = (amount) => {
    setTip(amount);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressTypeChange = (type) => {
    setAddress(prev => ({ ...prev, type }));
  };

  const handleExistingAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
    const selectedAddress = userAddresses.find(addr => addr.id === addressId);
    if (selectedAddress) {
      setAddress(selectedAddress);
      setUseExistingAddress(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create order object with the necessary data
      const deliveryAddress = {
        addressLine1: address.street, // <-- map street to addressLine1
        area: address.area,
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        fullName: address.fullName,
        phone: address.phone,
        type: address.type,
      };

      // Map payment method for backend
      let backendPaymentMethod = paymentMethod;
      if (paymentMethod === 'cod') backendPaymentMethod = 'cash';

      const orderData = {
        restaurantId: cartRestaurant?._id || cartRestaurant?.id,
        items: cart,
        deliveryAddress,
        paymentMethod: backendPaymentMethod,
        specialInstructions: '',
        total: totalWithTip,
        deliveryFee: cartTotals.deliveryFee,
        subTotal: cartTotals.subtotal,
      };


      // Place the order using the context function
      // ...existing code...
      const orderResponse = await placeOrder(orderData);
      console.log('Order placed:', orderResponse); // For debugging

      if (orderResponse && orderResponse.order && (orderResponse.order._id || orderResponse.order.id)) {
        navigate('/food-delivery/order-confirmation', { state: { orderId: orderResponse.order._id || orderResponse.order.id } });
      } else {
        setError('Order placed but confirmation could not be shown.');
        setIsProcessing(false);
      }
    } catch (error) {
      setError('Failed to process your order. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!cart.length && !isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 pb-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md mx-auto">
            <div className="mb-6 w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">You haven't added any items to your cart yet.</p>
            <Link
              to="/food-delivery"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Restaurants
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-2 pb-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Link to="/food-delivery" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to Restaurants</span>
          </Link>
          <h1 className="text-2xl font-bold text-center text-black flex-grow pr-16">Checkout</h1>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="grid text-black grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Delivery info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-6 mb-6"
            >
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <MapPin size={18} className="mr-2 text-green-600" />
                Delivery Address
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={address.fullName}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={address.phone}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      value={address.street}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area/Village</label>
                    <input
                      type="text"
                      name="area"
                      value={address.area}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Landmark (Optional)</label>
                    <input
                      type="text"
                      name="landmark"
                      value={address.landmark}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                    <input
                      type="text"
                      name="pincode"
                      value={address.pincode}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-md ${address.type === 'home'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      onClick={() => handleAddressTypeChange('home')}
                    >
                      Home
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-md ${address.type === 'work'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      onClick={() => handleAddressTypeChange('work')}
                    >
                      Work
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-md ${address.type === 'other'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      onClick={() => handleAddressTypeChange('other')}
                    >
                      Other
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6 mb-6"
            >
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <Clock size={18} className="mr-2 text-green-600" />
                Estimated Delivery Time
              </h2>
              <div className="flex items-center bg-green-50 p-3 rounded-md">
                <Truck size={18} className="text-green-600 mr-3" />
                <div>
                  <p className="text-gray-800 font-medium">30-45 minutes</p>
                  <p className="text-gray-600 text-sm">Your order will arrive at the selected address</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <CreditCard size={18} className="mr-2 text-green-600" />
                Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-gray-700">Cash on Delivery</span>
                </label>

                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-gray-700">UPI</span>
                </label>

                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-gray-700">Credit/Debit Card</span>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Right column - Order summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-6 sticky top-28"
            >
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              {cartRestaurant && (
                <div className="flex items-center mb-4 pb-3 border-b border-gray-100">
                  <ShoppingBag size={16} className="text-green-600 mr-2" />
                  <p className="text-sm text-gray-700">From <span className="font-medium">{cartRestaurant.name}</span></p>
                </div>
              )}

              <div className="max-h-60 overflow-y-auto mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-start">
                      <div className="h-4 w-4 mt-1 mr-2">
                        {item.veg ? (
                          <span className="text-green-600">●</span>
                        ) : (
                          <span className="text-red-600">●</span>
                        )}
                      </div>
                      <div>
                        <p className="text-gray-800">{item.name}</p>
                        <div className="flex items-center mt-1">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-300"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="mx-2 text-gray-800 min-w-[20px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-300"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <h3 className="text-base font-medium mb-3">Add a tip</h3>
                <div className="flex space-x-2">
                  {[0, 20, 30, 50].map((amount) => (
                    <button
                      key={amount}
                      className={`px-3 py-1 rounded-full ${tip === amount
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } text-sm`}
                      onClick={() => handleTipChange(amount)}
                    >
                      {amount === 0 ? 'No tip' : `₹${amount}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 py-4 border-t border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Item Total</span>
                  <span>₹{cartTotals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹{cartTotals.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span>₹{cartTotals.taxes.toFixed(2)}</span>
                </div>
                {tip > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Tip</span>
                    <span>₹{tip.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between py-3 font-bold text-lg">
                <span>Total</span>
                <span>₹{totalWithTip.toFixed(2)}</span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className={`w-full py-3 rounded-lg mt-4 font-medium ${isProcessing
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-green-600 text-white hover:bg-green-700'
                  } transition-colors`}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>

              <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
                <Info size={12} className="mr-1" />
                <span>By placing order you agree to our Terms of Service</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
