import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import AddressSelector from './AddressSelector';
import PaymentSelector from './PaymentSelector';

const CheckoutForm = ({
  onPlaceOrder
}) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  // New fields for COD
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');

  // Fetch cart items from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Calculate summary
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = cartItems.reduce((sum, item) => {
    const itemDiscount = item.oldPrice ? (item.oldPrice - item.price) * item.quantity : 0;
    return sum + itemDiscount;
  }, 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal - discount + deliveryFee;

  // Available time slots
  const timeSlots = [
    { id: 1, time: 'As soon as possible (30-45 min)' },
    { id: 2, time: 'Today, 2:00 PM - 3:00 PM' },
    { id: 3, time: 'Today, 3:00 PM - 4:00 PM' },
    { id: 4, time: 'Today, 4:00 PM - 5:00 PM' },
    { id: 5, time: 'Today, 5:00 PM - 6:00 PM' },
    { id: 6, time: 'Today, 6:00 PM - 7:00 PM' },
  ];

  // Helper to check if COD is selected
  const isCOD = selectedPayment && (selectedPayment.value === 'cod' || selectedPayment.id === 'cod');

  // Place order handler
  const handlePlaceOrder = async () => {
    // Validate required fields
    if (!selectedPayment || !selectedTimeSlot || cartItems.length === 0) return;
    if (isCOD) {
      if (!customerName.trim() || !contactNumber.trim() || !address.trim()) return;
    } else {
      if (!selectedAddress) return;
    }

    setIsProcessing(true);

    // Prepare order data
    const orderData = {
      name: isCOD ? customerName : undefined,
      contact: isCOD ? contactNumber : undefined,
      address: isCOD ? address : selectedAddress,
      payment: selectedPayment,
      timeSlot: timeSlots.find(slot => slot.id === selectedTimeSlot),
      deliveryInstructions,
      orderTotal: total,
      cartItems
    };

    try {
      // Send order to backend
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (!response.ok) throw new Error('Order failed');
      // Optionally clear cart
      localStorage.removeItem('cart');
      if (onPlaceOrder) onPlaceOrder(orderData);
    } catch (err) {
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Delivery Address Section */}
        {!isCOD && (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
            <AddressSelector
              onSelectAddress={setSelectedAddress}
              selectedAddressId={selectedAddress?.id}
            />
          </div>
        )}

        {/* COD Details */}
        {isCOD && (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Contact Number</label>
              <input
                type="tel"
                value={contactNumber}
                onChange={e => setContactNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter your contact number"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter your delivery address"
                required
              />
            </div>
          </div>
        )}

        {/* Delivery Time Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Delivery Time</h2>
          <div className="space-y-3">
            {timeSlots.map(slot => (
              <div
                key={slot.id}
                onClick={() => setSelectedTimeSlot(slot.id)}
                className={`
                  flex justify-between items-center p-3 border rounded-lg cursor-pointer
                  ${selectedTimeSlot === slot.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}
                `}
              >
                <span className="text-sm">{slot.time}</span>
                {selectedTimeSlot === slot.id && (
                  <Check size={18} className="text-green-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Instructions */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Delivery Instructions (Optional)</h2>
          <textarea
            value={deliveryInstructions}
            onChange={(e) => setDeliveryInstructions(e.target.value)}
            placeholder="Add any special instructions for delivery..."
            className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            rows={3}
          />
        </div>

        {/* Payment Method Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
          <PaymentSelector
            onSelectPayment={setSelectedPayment}
            selectedPaymentId={selectedPayment?.id}
          />
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          {/* Cart Items */}
          <div className="mb-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-sm">Your cart is empty.</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {cartItems.map(item => (
                  <li key={item._id} className="py-2 flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-xs text-gray-500 ml-2">x{item.quantity}</span>
                    </div>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-600">-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              {deliveryFee > 0 ? (
                <span>₹{deliveryFee.toFixed(2)}</span>
              ) : (
                <span className="text-green-600">Free</span>
              )}
            </div>
            <div className="border-t border-gray-200 mt-3 pt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          disabled={
            isProcessing ||
            cartItems.length === 0 ||
            !selectedPayment ||
            !selectedTimeSlot ||
            (isCOD
              ? (!customerName.trim() || !contactNumber.trim() || !address.trim())
              : !selectedAddress)
          }
          className={`
            w-full py-3.5 rounded-lg font-medium text-white
            ${isProcessing ||
              cartItems.length === 0 ||
              !selectedPayment ||
              !selectedTimeSlot ||
              (isCOD
                ? (!customerName.trim() || !contactNumber.trim() || !address.trim())
                : !selectedAddress)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
            }
          `}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Place Order'
          )}
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;