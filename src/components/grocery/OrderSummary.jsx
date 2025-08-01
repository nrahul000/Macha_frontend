import React from 'react';
import { Truck, Tag } from 'lucide-react';
import CartItem from './CartItem';

const OrderSummary = ({
  items = [],
  subtotal = 0,
  discount = 0,
  deliveryFee = 0,
  total = 0,
  editable = false,
  onUpdateQuantity,
  onRemoveItem,
  note = '',
  setNote,
  showNoteField = false,
  className = ''
}) => {
  const freeDeliveryThreshold = 500;
  const amountForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 md:p-6 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      {/* Order items */}
      <div className="space-y-4 mb-6">
        {items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            editable={editable}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemoveItem}
          />
        ))}
        
        {items.length === 0 && (
          <p className="text-gray-500 text-center py-4">No items in your cart</p>
        )}
      </div>

      {/* Optional note field */}
      {showNoteField && (
        <div className="mb-6">
          <label htmlFor="order-note" className="block text-sm font-medium text-gray-700 mb-1">
            Add a note for your order (optional)
          </label>
          <textarea
            id="order-note"
            rows="3"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Special instructions, delivery preferences, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>
      )}

      {/* Price details */}
      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 flex items-center">
              <Tag size={14} className="mr-1.5 text-green-600" /> Discount
            </span>
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

        {deliveryFee > 0 && amountForFreeDelivery > 0 && (
          <div className="flex items-center justify-between bg-green-50 p-2 rounded-md text-xs">
            <span className="flex items-center text-green-700">
              <Truck size={14} className="mr-1" />
              Free delivery on orders over ₹{freeDeliveryThreshold}
            </span>
            <span className="font-medium text-green-700">
              Add ₹{amountForFreeDelivery.toFixed(2)} more
            </span>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-3 flex justify-between font-medium">
          <span>Total Amount</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
