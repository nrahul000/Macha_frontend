import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock } from 'lucide-react';

const RestaurantCard = ({ restaurant, onClick }) => {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
      whileHover={{ y: -4 }}
    >
      <div className="relative">
        <img
          src={
            restaurant.imageUrl
              ? (
                restaurant.imageUrl.startsWith('http') ||
                  restaurant.imageUrl.startsWith('data:image')
                  ? restaurant.imageUrl
                  : `http://localhost:5000/uploads/${restaurant.imageUrl}`
              )
              : 'https://via.placeholder.com/400x300?text=No+Image'
          }
          alt={restaurant.name}
          className="w-full h-48 object-cover"
          onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
        />
        {restaurant.discount && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <span className="text-white text-sm font-medium">{restaurant.discount}</span>
          </div>
        )}
        {restaurant.promoted && (
          <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            Promoted
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-800 mb-1">{restaurant.name}</h3>
          <div className="flex items-center px-2 py-1 bg-green-500 text-white text-xs rounded">
            <span>{restaurant.rating}</span>
            <Star size={12} className="ml-1" fill="white" />
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="flex items-center">
            <Clock size={14} className="mr-1" />
            {restaurant.deliveryTime} mins
          </span>
          <span>₹{restaurant.priceForTwo} for two</span>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;