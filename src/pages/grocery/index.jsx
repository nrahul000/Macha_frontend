import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Import components
import GroceryNavBar from '../../components/grocery/GroceryNavBar';
import CategoryList from '../../components/grocery/CategoryList';
import ProductGrid from '../../components/grocery/ProductGrid';
import CartSidebar from '../../components/grocery/CartSidebar';
import * as groceryService from '../../services/groceryService';
import ProductCard from '../../components/grocery/ProductCard';

const GroceryHome = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for products
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [topDeals, setTopDeals] = useState([]);
  const [freshVegetables, setFreshVegetables] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    // Fetch featured products (isFeatured: true)
    groceryService.getProducts({ featured: true, limit: 8 })
      .then(res => setFeaturedProducts(res.products || []))
      .catch(() => setFeaturedProducts([]));

    // Fetch top deals (isTopDeal: true or sort by salePrice/discount)
    groceryService.getProducts({ sortBy: 'discount', limit: 8 })
      .then(res => setTopDeals(res.products || []))
      .catch(() => setTopDeals([]));

    // Fetch fresh vegetables (category: vegetables)
    groceryService.getCategories()
      .then(categories => {
        const vegCat = categories.find(cat =>
          cat.name.toLowerCase().includes('vegetable')
        );
        if (vegCat) {
          groceryService.getProducts({ category: vegCat._id, limit: 12 })
            .then(res => setFreshVegetables(res.products || []))
            .catch(() => setFreshVegetables([]));
        } else {
          setFreshVegetables([]);
        }
      })
      .catch(() => setFreshVegetables([]));

    // Simulate loading state for UI
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Function to handle adding products to cart
  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  // Function to update item quantity in cart
  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Function to remove item from cart
  const handleRemoveItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  return (
    <div className="min-h-screen text-black bg-gray-50">
      <GroceryNavBar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-12 bg-gradient-to-r from-green-600 to-emerald-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1440')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Fresh Groceries Delivered To Your Doorstep</h1>
            <p className="text-lg md:text-xl text-green-50 mb-6">Shop quality groceries at affordable prices</p>
            {/* Search bar */}
            {/* ...existing search bar code... */}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        {/* Categories section */}
        <section className="mb-10">
          <CategoryList horizontal={true} />
        </section>

        {/* Featured Products */}
        <section className="mb-10">
          <ProductGrid
            title="Featured Products"
            products={featuredProducts}
            viewAllLink="/grocery/categories"
            loading={isLoading}
            cols={4}
            onAddToCart={handleAddToCart}
          />
        </section>

        {/* Special Offers Banner */}
        <section className="mb-10">
          <div className="bg-yellow-500 rounded-xl overflow-hidden shadow-md">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 md:p-10 md:w-2/3">
                <span className="inline-block px-3 py-1 bg-yellow-800 text-white text-xs font-semibold rounded-full mb-4">
                  LIMITED TIME OFFER
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  20% OFF on First Order
                </h2>
                <p className="text-yellow-100 mb-6">
                  Use code FIRST20 at checkout. Minimum order value ₹500.
                  Offer valid for new customers only.
                </p>
                <Link
                  to="/grocery/categories"
                  className="inline-flex items-center bg-white text-yellow-700 px-6 py-2.5 rounded-lg font-medium hover:bg-yellow-50 transition-colors"
                >
                  Shop Now <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
              <div className="md:w-1/3 bg-yellow-400">
                <img
                  src="https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?q=80&w=400&auto=format&fit=crop"
                  alt="Special offer on groceries"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Top Deals */}
        <section className="mb-10">
          <ProductGrid
            title="Top Deals"
            products={topDeals}
            viewAllLink="/grocery/categories"
            loading={isLoading}
            cols={4}
            onAddToCart={handleAddToCart}
          />
        </section>

        {/* Fresh Vegetables */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Fresh Vegetables</h2>
            <Link to="/grocery/categories/1" className="text-green-600 text-sm font-medium flex items-center">
              View all <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid text-black grid-cols-2 md:grid-cols-6 gap-4">
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="h-24 bg-gray-200 animate-pulse"></div>
                  <div className="p-3">
                    <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded mb-3 w-3/5 animate-pulse"></div>
                    <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : (
              freshVegetables.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  size="small"
                />
              ))
            )}
          </div>
        </section>
          {/* Shop by benefits */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-4">Shop by Benefits</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Organic', 'Sugar Free', 'Gluten Free', 'High Protein'].map((item, i) => (
              <Link
                key={i}
                to={`/grocery/search?q=${item}`}
                className="bg-white rounded-lg p-3 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all"
              >
                <div className={`w-12 h-12 rounded-full mb-2 ${['bg-green-100', 'bg-blue-100', 'bg-yellow-100', 'bg-purple-100'][i]
                  } flex items-center justify-center`}>
                  <span className="text-xl">
                    {['🌱', '🍯', '🌾', '🥚'][i]}
                  </span>
                </div>
                <span className="font-medium">{item}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-3">
                <span className="text-2xl">🚚</span>
              </div>
              <div>
                <h3 className="font-medium">Free Delivery</h3>
                <p className="text-xs text-gray-600">On orders over ₹500</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-3">
                <span className="text-2xl">🥦</span>
              </div>
              <div>
                <h3 className="font-medium">Fresh Quality</h3>
                <p className="text-xs text-gray-600">100% guaranteed</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-3">
                <span className="text-2xl">💳</span>
              </div>
              <div>
                <h3 className="font-medium">Secure Payment</h3>
                <p className="text-xs text-gray-600">100% secure checkout</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default GroceryHome;