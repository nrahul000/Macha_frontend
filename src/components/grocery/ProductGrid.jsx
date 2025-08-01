import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductGrid = ({ 
  title, 
  products, 
  viewAllLink,
  limit = 4,
  cols = 2, // Default to 2 columns on mobile
  loading = false,
  cardSize = 'medium',
  onAddToCart,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem
}) => {
  // Determine grid columns class
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
    5: 'sm:grid-cols-5',
    6: 'sm:grid-cols-6'
  };

  // Limit the number of products shown if needed
  const displayProducts = limit ? products.slice(0, limit) : products;

  if (loading) {
    return (
      <div className="w-full">
        {title && (
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            {viewAllLink && <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>}
          </div>
        )}
        <div className={`grid ${gridColsClass[2]} ${gridColsClass[cols]} gap-4`}>
          {[...Array(limit || 4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-36 bg-gray-200 animate-pulse"></div>
              <div className="p-3">
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded mb-3 w-3/5 animate-pulse"></div>
                <div className="flex justify-between items-center">
                  <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-7 w-7 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          {viewAllLink && (
            <Link to={viewAllLink} className="text-green-600 text-sm font-medium flex items-center">
              View all <ChevronRight size={16} className="ml-1" />
            </Link>
          )}
        </div>
      )}

      {displayProducts.length > 0 ? (
        <div className={`grid ${gridColsClass[2]} ${gridColsClass[cols]} gap-4`}>
          {displayProducts.map(product => {
            const cartItem = cartItems.find(item => item._id === product._id);
            return (
              <ProductCard
                key={product._id}
                product={product}
                size={cardSize}
                onAddToCart={onAddToCart}
                cartItem={cartItem}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
