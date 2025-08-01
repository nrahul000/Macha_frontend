import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import CartItem from './CartItem';

const CartSidebar = ({
  isOpen,
  onClose,
  cartItems: propCartItems = [],
}) => {
  const [cartItems, setCartItems] = useState(propCartItems);

  // Sync cartItems from localStorage when sidebar opens or propCartItems changes
  useEffect(() => {
    if (isOpen) {
      const storedCart = localStorage.getItem('cart');
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
    }
  }, [isOpen, propCartItems]);

  // Update localStorage whenever cartItems changes (from sidebar actions)
  useEffect(() => {
    if (isOpen) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isOpen]);

  // Handle quantity update
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        (item._id || item.id) === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle remove item
  const handleRemoveItem = (itemId) => {
    setCartItems(prev =>
      prev.filter(item => (item._id || item.id) !== itemId)
    );
  };

  // Calculate cart summary
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = cartItems.reduce((sum, item) => {
    const itemDiscount = item.oldPrice ? (item.oldPrice - item.price) * item.quantity : 0;
    return sum + itemDiscount;
  }, 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal - discount + deliveryFee;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-xl z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        flex flex-col
      `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart content */}
        <div className="flex flex-col h-[calc(100%-170px)] overflow-hidden flex-grow">
          {cartItems.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center p-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <ShoppingBag size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-500 text-sm text-center mb-4">
                Add items to your cart to see them here
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-4">
              <div className="space-y-5">
                {cartItems.map(item => (
                  <CartItem
                    key={item._id || item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Footer - Price summary and checkout button */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-4 bg-white">
              {/* Price Summary */}
              <div className="space-y-1 mb-4">
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

                {deliveryFee > 0 && (
                  <p className="text-xs text-gray-500">
                    Add ₹{(500 - subtotal).toFixed(2)} more for free delivery
                  </p>
                )}

                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              {/* Checkout Button */}
              <Link
                to="/grocery/checkout"
                onClick={onClose}
                className="w-full py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                Proceed to Checkout
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;