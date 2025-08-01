import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Filter, ChevronDown, X } from 'lucide-react';

import GroceryNavBar from '../../../components/grocery/GroceryNavBar';
import ProductCard from '../../../components/grocery/ProductCard';
import CartSidebar from '../../../components/grocery/CartSidebar';

const CategoryDetailPage = () => {
  const { id: categoryId } = useParams();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    // Fetch category and products from backend
    const fetchData = async () => {
      setLoading(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch(`/api/grocery/categories/${categoryId}`),
          fetch(`/api/grocery/products?categoryId=${categoryId}`)
        ]);
        const catData = await catRes.json();
        const prodData = await prodRes.json();
        setCategory(catData);
        // Support both array and {products: []} response
        setProducts(Array.isArray(prodData) ? prodData : prodData.products || []);
      } catch (err) {
        setCategory(null);
        setProducts([]);
      }
      setLoading(false);
    };
    fetchData();
  }, [categoryId]);

  // Function to apply filters and sorting
  const applyFiltersAndSort = (baseProducts) => {
    let filteredProducts = [...baseProducts];

    // Apply tag filters if any are selected
    if (activeFilters.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        activeFilters.some(filter => product.tags && product.tags.includes(filter))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        filteredProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        filteredProducts.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }

    return filteredProducts;
  };

  // Update products when filters or sort change
  useEffect(() => {
    if (!loading && category && products.length > 0) {
      setProducts(prev =>
        applyFiltersAndSort(prev)
      );
    }
    // eslint-disable-next-line
  }, [activeFilters, sortBy]);

  // Toggle filter
  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Handle adding to cart
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

  // Update cart quantity
  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove from cart
  const handleRemoveItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([]);
    setSortBy('popular');
  };

  // Ensure products is always an array for flatMap
  const safeProducts = Array.isArray(products)
    ? products
    : Array.isArray(products?.products)
      ? products.products
      : [];

  // Available filters based on products
  const availableFilters = Array.from(
    new Set(
      safeProducts.flatMap(product => product.tags || [])
    )
  );

  // Count of active filters
  const activeFilterCount = activeFilters.length;

  if (loading) {
    return (
      <div className="bg-gray-50 text-black min-h-screen">
        <GroceryNavBar />

        <div className="container text-black mx-auto px-4 py-6">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-6"></div>

          <div className="grid text-black grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="bg-gray-50 text-black min-h-screen">
        <GroceryNavBar />

        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, the category you are looking for does not exist.</p>
          <Link to="/grocery/categories" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            Browse All Categories
          </Link>
        </div>
      </div>
    );
  }

  const filteredProducts = applyFiltersAndSort(safeProducts);

  return (
    <div className="bg-gray-50 text-black min-h-screen pb-16">
      <GroceryNavBar />

      <div
        className="h-40 w-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.image})`
        }}
      >
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-md">
            {category.icon} {category.name}
          </h1>
          <p className="text-white text-lg drop-shadow-md">
            {filteredProducts.length} products
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/grocery/categories" className="text-sm text-green-600 hover:text-green-700">
              <ArrowLeft size={16} className="inline mr-1" />
              All Categories
            </Link>

            {/* Filter badges */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 ml-2">
                {activeFilters.map(filter => (
                  <span
                    key={filter}
                    className="flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                  >
                    {filter}
                    <X
                      size={14}
                      className="ml-1 cursor-pointer"
                      onClick={() => toggleFilter(filter)}
                    />
                  </span>
                ))}

                <button
                  className="text-xs text-gray-500 hover:text-gray-700"
                  onClick={clearFilters}
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-1.5 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                <option value="popular">Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-3 py-1.5 rounded-md border text-sm ${activeFilterCount > 0
                ? 'border-green-500 text-green-500 bg-green-50'
                : 'border-gray-200 text-gray-700'
                }`}
            >
              <Filter size={16} className="mr-1" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1.5 w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-100">
            <h3 className="font-medium mb-3">Filter by Tags</h3>
            <div className="flex flex-wrap gap-3">
              {availableFilters.map(filter => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`px-3 py-1.5 rounded-md text-sm ${activeFilters.includes(filter)
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => {
              const cartItem = cartItems.find(item => item._id === product._id);
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  cartItem={cartItem}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try removing some filters or changing the sorting option.</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
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

export default CategoryDetailPage;