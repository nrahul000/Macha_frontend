import React, { useState } from 'react';
import { Check, Star, Truck } from 'lucide-react';

const ProductDetail = ({ 
  product, 
  onAddToCart, 
  onBuyNow 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  // Set default variation when product changes
  React.useEffect(() => {
    if (product?.variations && product.variations.length > 0) {
      const defaultVar = product.variations.find(v => v.default) || product.variations[0];
      setSelectedVariation(defaultVar);
    }
  }, [product]);

  // Calculate discount percentage if there's an old price
  const discountPercentage = product?.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  const increaseQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10)); // Max limit of 10
  };

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1)); // Min limit of 1
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        ...product,
        quantity,
        variation: selectedVariation,
        price: selectedVariation?.price || product.price
      });
    }
  };

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow({
        ...product,
        quantity,
        variation: selectedVariation,
        price: selectedVariation?.price || product.price
      });
    }
  };

  if (!product) return null;

  return (
    <div className="w-full">
      {/* Product Images */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <div className="h-64 md:h-80 overflow-hidden rounded-lg mb-4 flex items-center justify-center">
          <img 
            src={product.images[currentImageIndex]} 
            alt={product.name} 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        
        {product.images.length > 1 && (
          <div className="flex justify-center space-x-2">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                className={`w-12 h-12 rounded-md overflow-hidden border-2 ${
                  idx === currentImageIndex ? 'border-green-500' : 'border-gray-200'
                }`}
                onClick={() => setCurrentImageIndex(idx)}
                aria-label={`View image ${idx + 1}`}
              >
                <img 
                  src={img} 
                  alt={`${product.name} view ${idx + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Product Details */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold">{product.name}</h1>
            <p className="text-gray-500 text-sm">{product.unit}</p>
          </div>
          
          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              {discountPercentage}% OFF
            </span>
          )}
        </div>
        
        <div className="flex items-center mt-2">
          <div className="flex items-center bg-green-50 px-2 py-1 rounded">
            <Star className="h-4 w-4 text-green-600 fill-green-600" />
            <span className="text-sm font-medium ml-1">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
        </div>

        <div className="flex items-baseline mt-4">
          <span className="text-2xl font-bold">₹{selectedVariation?.price || product.price}</span>
          {product.oldPrice && (
            <span className="text-gray-500 line-through ml-2">₹{product.oldPrice}</span>
          )}
        </div>
        
        {/* Variations */}
        {product.variations && product.variations.length > 1 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Choose size:</p>
            <div className="flex flex-wrap gap-2">
              {product.variations.map(variant => (
                <button
                  key={variant.id}
                  className={`px-3 py-1.5 border rounded-lg text-sm ${
                    selectedVariation?.id === variant.id 
                      ? 'border-green-500 bg-green-50 text-green-700' 
                      : 'border-gray-300 text-gray-700'
                  }`}
                  onClick={() => setSelectedVariation(variant)}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Quantity Selector */}
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Quantity:</p>
          <div className="flex items-center">
            <button 
              onClick={decreaseQuantity}
              className="w-10 h-10 bg-gray-100 rounded-l-lg flex items-center justify-center text-gray-700 font-bold"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="w-14 h-10 bg-gray-100 flex items-center justify-center text-gray-800 font-medium">
              {quantity}
            </span>
            <button 
              onClick={increaseQuantity}
              className="w-10 h-10 bg-gray-100 rounded-r-lg flex items-center justify-center text-gray-700 font-bold"
              disabled={quantity >= 10}
            >
              +
            </button>
          </div>
        </div>
        
        {/* Delivery Info */}
        <div className="mt-6 flex items-center">
          <Truck className="h-5 w-5 text-gray-500 mr-2" />
          <div>
            <p className="text-sm">Delivery to <span className="font-medium">123 Example St, City</span></p>
            <p className="text-xs text-gray-500 mt-1">Usually delivered in 30-45 minutes</p>
          </div>
          <button className="ml-auto text-green-600 text-xs font-medium">
            Change
          </button>
        </div>
      </div>

      {/* Description and Details */}
      <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
        <div className="flex border-b">
          <button 
            onClick={() => setActiveTab('description')}
            className={`py-3 px-4 text-sm font-medium flex-1 text-center ${
              activeTab === 'description' 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500'
            }`}
          >
            Description
          </button>
          
          <button 
            onClick={() => setActiveTab('nutrition')}
            className={`py-3 px-4 text-sm font-medium flex-1 text-center ${
              activeTab === 'nutrition' 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500'
            }`}
          >
            Nutrition Facts
          </button>
        </div>
        
        <div className="p-4">
          {activeTab === 'description' && (
            <div>
              <p className="text-gray-700 mb-4">{product.description}</p>
              
              {product.features && (
                <>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Key Features:</h3>
                  <ul className="space-y-1">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="min-w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
          
          {activeTab === 'nutrition' && product.nutritionalInfo && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Nutritional Information</h3>
              <div className="space-y-1">
                {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-sm capitalize">{key}</span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                *Values are approximate and may vary based on exact product weight and serving size.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <button 
          onClick={handleAddToCart}
          className="flex-1 px-4 py-3 bg-white border border-green-500 text-green-600 font-medium rounded-lg hover:bg-green-50"
        >
          Add to Cart
        </button>
        
        <button 
          onClick={handleBuyNow}
          className="flex-1 px-4 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
