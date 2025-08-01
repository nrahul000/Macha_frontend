import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  editable = true
}) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (onUpdateQuantity) {
      onUpdateQuantity(item._id, newQuantity); // Use _id for consistency
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      if (onRemove) {
        onRemove(item._id); // Use _id for consistency
      }
    }, 300);
  };

  const discount = item.oldPrice ? (item.oldPrice - item.price) * item.quantity : 0;

  return (
    <div className={`transition-all duration-300 ${isRemoving ? 'opacity-0 scale-95' : 'opacity-100'}`}>
      <div className="flex mb-3">
        <Link to={`/grocery/products/${item._id}`} className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
          <img
            src={item.images && item.images.length > 0 ? item.images[0] : item.image || '/no-image.png'}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
          />
        </Link>
        <div className="ml-4 flex-grow">
          <Link to={`/grocery/products/${item._id}`} className="font-medium text-sm hover:text-green-600">
            {item.name}
          </Link>
          <p className="text-xs text-gray-500">{item.unit}</p>
          {item.variation && (
            <p className="text-xs text-gray-600 mt-1">Size: {item.variation.name}</p>
          )}
          <div className="flex items-center mt-1">
            <span className="font-medium text-sm">₹{item.price}</span>
            {item.oldPrice && (
              <span className="text-xs text-gray-500 line-through ml-2">₹{item.oldPrice}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        {editable ? (
          <>
            <button
              onClick={handleRemove}
              className="flex items-center text-red-500 text-xs"
            >
              <Trash2 size={14} className="mr-1" />
              Remove
            </button>

            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="w-8 h-8 bg-gray-100 rounded-l-lg flex items-center justify-center text-gray-700"
                disabled={item.quantity <= 1}
              >
                <Minus size={14} />
              </button>
              <span className="w-10 h-8 bg-gray-100 flex items-center justify-center text-xs font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="w-8 h-8 bg-gray-100 rounded-r-lg flex items-center justify-center text-gray-700"
              >
                <Plus size={14} />
              </button>
            </div>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-500">
              Quantity: {item.quantity}
            </span>
            <span className="font-medium">
              ₹{(item.price * item.quantity).toFixed(2)}
            </span>
          </>
        )}
      </div>

      {discount > 0 && (
        <div className="mt-1 text-xs text-green-600 text-right">
          You save ₹{discount.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default CartItem;