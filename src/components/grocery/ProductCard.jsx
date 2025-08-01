import React, { useState, useEffect } from 'react';
import { Plus, Star, CheckCircle, Minus, Trash2 } from 'lucide-react';

const ProductCard = ({
  product,
  onAddToCart,
  size = 'medium',
  cartItem,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [localCartItem, setLocalCartItem] = useState(null);

  // Check localStorage for this product's cart status
  useEffect(() => {
    const getCartFromStorage = () => {
      try {
        const stored = localStorage.getItem('cart');
        const parsed = stored ? JSON.parse(stored) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        return [];
      }
    };

    const cart = getCartFromStorage();
    const foundItem = cart.find(item => item._id === product._id);
    setLocalCartItem(foundItem || null);
  }, [product._id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);

    // Get current cart from localStorage
    const storedCart = localStorage.getItem('cart');
    let cart;

    try {
      cart = storedCart ? JSON.parse(storedCart) : [];
      // Ensure cart is always an array
      if (!Array.isArray(cart)) {
        cart = [];
      }
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      cart = [];
    }

    // Check if product already in cart
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      cart = cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update local state
    const updatedItem = cart.find(item => item._id === product._id);
    setLocalCartItem(updatedItem);

    // Optionally call parent handler
    if (onAddToCart) onAddToCart(product);

    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem();
      return;
    }

    const storedCart = localStorage.getItem('cart');
    let cart;

    try {
      cart = storedCart ? JSON.parse(storedCart) : [];
      if (!Array.isArray(cart)) {
        cart = [];
      }
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      cart = [];
    }

    cart = cart.map(item =>
      item._id === product._id
        ? { ...item, quantity: newQuantity }
        : item
    );

    localStorage.setItem('cart', JSON.stringify(cart));

    const updatedItem = cart.find(item => item._id === product._id);
    setLocalCartItem(updatedItem);

    if (onUpdateQuantity) {
      onUpdateQuantity(product._id, newQuantity);
    }
  };

  const handleRemoveItem = () => {
    const storedCart = localStorage.getItem('cart');
    let cart;

    try {
      cart = storedCart ? JSON.parse(storedCart) : [];
      if (!Array.isArray(cart)) {
        cart = [];
      }
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      cart = [];
    }

    cart = cart.filter(item => item._id !== product._id);
    localStorage.setItem('cart', JSON.stringify(cart));
    setLocalCartItem(null);

    if (onRemoveItem) {
      onRemoveItem(product._id);
    }
  };

  // Determine the image height based on the size prop
  const imageHeightClass = {
    small: 'h-24',
    medium: 'h-36',
    large: 'h-48',
  }[size];

  const {
    _id,
    id,
    name,
    price,
    oldPrice,
    images,
    unit,
    inStock = true,
    rating = 0,
    reviews = 0,
    discount = 0
  } = product || {};

  const discountPercentage = discount || (oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0);

  // Use cartItem prop if available, otherwise use localCartItem
  const currentCartItem = cartItem || localCartItem;

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full"
    >
      <div className={`${imageHeightClass} flex items-center justify-center p-3 relative`}>
        {discountPercentage > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium py-0.5 px-1.5 rounded">
            {discountPercentage}% OFF
          </span>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
            <p className="bg-gray-900/70 text-white text-xs px-2 py-1 rounded">Out of stock</p>
          </div>
        )}
        <img
          src={images && images.length > 0 ? images[0] : '/no-image.png'}
          alt={name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="p-3 flex flex-col flex-grow">
        {(size === 'medium' || size === 'large') && rating > 0 && (
          <div className="flex items-center mb-1">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-medium ml-1">{rating}</span>
            {reviews > 0 && (
              <span className="text-xs text-gray-500 ml-1">({reviews})</span>
            )}
          </div>
        )}

        <h3 className={`font-medium line-clamp-2 ${size === 'small' ? 'text-xs' : 'text-sm'} mb-1`}>
          {name}
        </h3>

        <p className="text-xs text-gray-500 mb-auto">{unit}</p>

        <div className="mt-2 flex justify-between items-center">
          <div>
            <span className={`font-semibold ${size === 'small' ? 'text-sm' : 'text-base'}`}>
              ₹{price}
            </span>
            {oldPrice && (
              <span className="text-xs text-gray-500 line-through ml-1">₹{oldPrice}</span>
            )}
          </div>

          {inStock && (
            currentCartItem ? (
              <div className="flex items-center space-x-1">
                <button
                  className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleUpdateQuantity(currentCartItem.quantity - 1);
                  }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="px-2 min-w-[30px] text-center font-medium">
                  {currentCartItem.quantity}
                </span>
                <button
                  className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleUpdateQuantity(currentCartItem.quantity + 1);
                  }}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
                <button
                  className="p-1 ml-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveItem();
                  }}
                  aria-label="Remove from cart"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className={`flex items-center justify-center p-1.5 rounded-full transition-colors ${isAdding ? 'bg-green-100 text-green-600' : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                aria-label="Add to cart"
                disabled={isAdding}
              >
                {isAdding ? (
                  <CheckCircle size={size === 'small' ? 14 : 18} />
                ) : (
                  <Plus size={size === 'small' ? 14 : 18} />
                )}
              </button>
            )
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}} />
    </div>
  );
};

export default ProductCard;