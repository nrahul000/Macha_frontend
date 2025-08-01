import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Check,
  Heart,
  Share2,
  ShoppingBag,
  Truck,
  ChevronRight,
  ShoppingCart
} from 'lucide-react';

import GroceryNavBar from '../../../components/grocery/GroceryNavBar';
import CartSidebar from '../../../components/grocery/CartSidebar';
import * as groceryService from '../../../services/groceryService';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [selectedVariation, setSelectedVariation] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    // Fetch product details
    groceryService.getProductById(id)
      .then((data) => {
        setProduct(data);
        setSelectedVariation(data?.variations?.find(v => v.default) || null);
        // Fetch related products by category if available
        if (data.categoryId) {
          groceryService.getProductsByCategory(data.categoryId)
            .then((rel) => {
              // Exclude current product from related
              setRelatedProducts(rel.filter(p => p._id !== data._id));
            })
            .catch(() => setRelatedProducts([]));
        } else {
          setRelatedProducts([]);
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = (productToAdd) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item =>
        item._id === productToAdd._id &&
        (!productToAdd.variation || item.variation?.id === productToAdd.variation?.id)
      );

      if (existingItemIndex >= 0) {
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + productToAdd.quantity }
            : item
        );
      } else {
        return [...prevItems, productToAdd];
      }
    });

    setShowAddedToCart(true);
    setIsCartOpen(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  const handleBuyNow = (productToAdd) => {
    handleAddToCart(productToAdd);
    window.location.href = '/grocery/cart';
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  const increaseQuantity = () => setQuantity(q => Math.min(q + 1, 10));
  const decreaseQuantity = () => setQuantity(q => Math.max(q - 1, 1));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <GroceryNavBar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 text-center py-20">
        <GroceryNavBar />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">Sorry, the product you are looking for does not exist.</p>
        <Link to="/grocery" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          Back to Grocery Home
        </Link>
      </div>
    );
  }

  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - (selectedVariation?.price || product.price)) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <GroceryNavBar />

      {/* Product content here */}
      <main className="container mx-auto px-4 py-6">
        {/* Image gallery */}
        <div className="bg-white rounded-xl p-4 shadow mb-6">
          <div className="flex justify-between items-start">
            <button onClick={() => window.history.back()} className="p-2 rounded hover:bg-gray-100">
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </button>
            <div className="flex space-x-4">
              <button onClick={() => setIsFavorite(!isFavorite)} className="p-2 rounded-full hover:bg-gray-100">
                <Heart className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Share2 className="h-6 w-6 text-gray-700" />
              </button>
              <Link to="/grocery/cart" className="relative p-2">
                <ShoppingBag className="h-6 w-6 text-gray-700" />
              </Link>
            </div>
          </div>

          <div className="h-64 flex justify-center items-center mb-4">
            <img src={product.images && product.images.length > 0 ? product.images[currentImageIndex] : '/no-image.png'} alt={product.name} className="max-h-full object-contain" />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex justify-center space-x-2">
              {product.images.map((img, idx) => (
                <button key={idx} onClick={() => setCurrentImageIndex(idx)}
                  className={`w-12 h-12 border-2 ${idx === currentImageIndex ? 'border-green-500' : 'border-gray-300'} rounded overflow-hidden`}>
                  <img src={img} className="object-cover w-full h-full" alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product details */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h1 className="text-xl font-semibold">{product.name}</h1>
          <p className="text-sm text-gray-500">{product.unit}</p>

          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded mt-2 inline-block">
              {discountPercentage}% OFF
            </span>
          )}

          <div className="flex items-center mt-2">
            <Star className="h-4 w-4 text-green-600 fill-green-600" />
            <span className="ml-1 text-sm">{product.rating || 4.5} ({product.reviews || 0} reviews)</span>
          </div>

          <div className="mt-3">
            <span className="text-2xl font-bold text-gray-800">₹{selectedVariation?.price || product.price}</span>
            {product.oldPrice && <span className="ml-2 text-gray-500 line-through">₹{product.oldPrice}</span>}
          </div>

          {/* Variation buttons */}
          {product.variations && product.variations.length > 1 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Choose:</p>
              <div className="flex gap-2">
                {product.variations.map(variation => (
                  <button key={variation.id}
                    onClick={() => setSelectedVariation(variation)}
                    className={`px-3 py-1.5 border text-sm rounded ${selectedVariation?.id === variation.id ? 'border-green-600 bg-green-50' : 'border-gray-300'
                      }`}>
                    {variation.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Quantity:</p>
            <div className="flex items-center gap-2">
              <button onClick={decreaseQuantity} className="w-10 h-10 border rounded-l text-lg" disabled={quantity <= 1}>−</button>
              <span className="w-12 text-center">{quantity}</span>
              <button onClick={increaseQuantity} className="w-10 h-10 border rounded-r text-lg" disabled={quantity >= 10}>+</button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex border-b">
            <button onClick={() => setActiveTab('description')} className={`py-2 px-4 text-sm font-medium ${activeTab === 'description' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}>Description</button>
            <button onClick={() => setActiveTab('nutrition')} className={`py-2 px-4 text-sm font-medium ${activeTab === 'nutrition' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}>Nutrition Facts</button>
          </div>
          <div className="pt-4">
            {activeTab === 'description' && (
              <>
                <p>{product.description}</p>
                {product.features && (
                  <ul className="mt-3 space-y-1 list-disc list-inside text-sm text-gray-700">
                    {product.features.map((feat, i) => <li key={i}>{feat}</li>)}
                  </ul>
                )}
              </>
            )}
            {activeTab === 'nutrition' && product.nutritionalInfo && (
              <ul className="text-sm">
                {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                  <li key={key} className="flex justify-between border-b py-1">
                    <span>{key}</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-20">
            <h3 className="text-lg font-semibold mb-3">You may also like</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map(r => (
                <Link key={r._id} to={`/grocery/products/${r._id}`} className="bg-white p-2 border hover:shadow rounded-lg">
                  <img src={r.images && r.images.length > 0 ? r.images[0] : '/no-image.png'} alt={r.name} className="h-24 mx-auto object-contain mb-2" />
                  <h4 className="text-sm font-medium line-clamp-1">{r.name}</h4>
                  <div className="flex justify-between mt-1">
                    <span className="font-semibold">₹{r.price}</span>
                    <span className="text-xs">{r.unit}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Sticky Footer Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-top py-3 px-4 border-t border-gray-200">
        <div className="flex justify-between max-w-lg mx-auto">
          <button
            onClick={() => handleAddToCart({ ...product, variation: selectedVariation, quantity })}
            className="flex-1 px-4 py-2 border border-green-500 text-green-600 rounded-lg mr-2 flex items-center justify-center">
            <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
          </button>
          <button
            onClick={() => handleBuyNow({ ...product, variation: selectedVariation, quantity })}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg flex items-center justify-center">
            Buy Now <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;