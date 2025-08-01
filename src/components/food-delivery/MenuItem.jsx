import React from 'react';

const MenuItem = ({ item, cart, addToCart, removeFromCart }) => {
  const itemInCart = cart.find(cartItem => cartItem.id === (item.id || item._id));

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...item, id: item.id || item._id });
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    removeFromCart(item.id);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 border-b pb-6">
      <div className="md:w-3/4">
        <div className="flex items-center mb-1">
          {item.veg ? (
            <span className="mr-1 text-green-600">●</span>
          ) : (
            <span className="mr-1 text-red-600">●</span>
          )}
          <h3 className="font-medium text-gray-800">{item.name}</h3>
          {item.bestseller && (
            <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              Bestseller
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-2">₹{item.price}</p>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>

      <div className="md:w-1/4 flex flex-col items-center">
        <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-lg overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {itemInCart ? (
          <div className="mt-2 flex items-center space-x-2">
            <button
              onClick={handleRemoveFromCart}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-green-50 text-green-500 border border-green-500"
            >
              -
            </button>

            <span className="text-gray-700 font-medium">
              {itemInCart.quantity}
            </span>

            <button
              onClick={handleAddToCart}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="mt-2 px-4 py-1 text-green-500 border border-green-500 rounded-md text-sm font-medium hover:bg-green-50"
          >
            ADD
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
