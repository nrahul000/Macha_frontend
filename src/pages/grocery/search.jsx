import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, X, Filter, ChevronDown, Tag } from 'lucide-react';

// Import components
import GroceryNavBar from '../../components/grocery/GroceryNavBar';
import ProductCard from '../../components/grocery/ProductCard';
import CartSidebar from '../../components/grocery/CartSidebar';

// Import mock data for demonstration
const mockCategories = [
  { id: 1, name: 'Fruits & Vegetables', count: 125 },
  { id: 2, name: 'Dairy & Eggs', count: 88 },
  { id: 3, name: 'Bakery', count: 42 },
  { id: 4, name: 'Beverages', count: 93 },
  { id: 5, name: 'Snacks', count: 128 },
  { id: 6, name: 'Household', count: 74 }
];

// Mock product data for search results
const allProducts = [
  { id: 101, name: 'Fresh Red Apples', price: 120, oldPrice: 150, image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?q=80&w=200&auto=format&fit=crop', unit: '1 kg', categoryId: 1, rating: 4.8, reviewCount: 126, inStock: true, isPopular: true },
  { id: 102, name: 'Bananas', price: 50, oldPrice: null, image: 'https://images.unsplash.com/photo-1566393028639-d108a42c46a7?q=80&w=200&auto=format&fit=crop', unit: '1 kg', categoryId: 1, rating: 4.6, reviewCount: 98, inStock: true, isPopular: true },
  { id: 103, name: 'Red Grapes', price: 180, oldPrice: 220, image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=200&auto=format&fit=crop', unit: '500 g', categoryId: 1, rating: 4.7, reviewCount: 84, inStock: true },
  { id: 104, name: 'Oranges', price: 90, oldPrice: null, image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=200&auto=format&fit=crop', unit: '4 pcs', categoryId: 1, rating: 4.5, reviewCount: 65, inStock: false },
  { id: 201, name: 'Whole Milk', price: 60, oldPrice: null, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=200&auto=format&fit=crop', unit: '500 ml', categoryId: 2, rating: 4.6, reviewCount: 112, inStock: true, isPopular: true },
  { id: 202, name: 'Farm Eggs', price: 85, oldPrice: 95, image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=200&auto=format&fit=crop', unit: '6 pcs', categoryId: 2, rating: 4.8, reviewCount: 143, inStock: true, isPopular: true },
  { id: 203, name: 'Butter', price: 120, oldPrice: null, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=200&auto=format&fit=crop', unit: '200 g', categoryId: 2, rating: 4.5, reviewCount: 78, inStock: true },
  { id: 204, name: 'Cheese Slices', price: 150, oldPrice: 180, image: 'https://images.unsplash.com/photo-1624806992066-5ffbcb91e321?q=80&w=200&auto=format&fit=crop', unit: '200 g', categoryId: 2, rating: 4.3, reviewCount: 56, inStock: true },
  { id: 301, name: 'Wheat Bread', price: 35, oldPrice: 40, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=200&auto=format&fit=crop', unit: '1 loaf', categoryId: 3, rating: 4.7, reviewCount: 91, inStock: true, isPopular: true },
  { id: 302, name: 'Croissants', price: 120, oldPrice: null, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=200&auto=format&fit=crop', unit: '4 pcs', categoryId: 3, rating: 4.8, reviewCount: 68, inStock: true },
  { id: 401, name: 'Orange Juice', price: 110, oldPrice: 130, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=200&auto=format&fit=crop', unit: '1 L', categoryId: 4, rating: 4.6, reviewCount: 74, inStock: true },
  { id: 402, name: 'Cola Drink', price: 45, oldPrice: null, image: 'https://images.unsplash.com/photo-1581636625149-565590542aad?q=80&w=200&auto=format&fit=crop', unit: '500 ml', categoryId: 4, rating: 4.4, reviewCount: 105, inStock: true, isPopular: true }
];

// Sort options
const sortOptions = [
  { id: 'popularity', name: 'Popularity' },
  { id: 'priceLowToHigh', name: 'Price: Low to High' },
  { id: 'priceHighToLow', name: 'Price: High to Low' },
  { id: 'discount', name: 'Discount' },
  { id: 'rating', name: 'Rating' }
];

// Filter options
const filterOptions = [
  { id: 'inStock', name: 'In Stock Only' },
  { id: 'onDiscount', name: 'Discounted Items' }
];

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeSort, setActiveSort] = useState('popularity');
  const [activeFilters, setActiveFilters] = useState([]);
  const [recentSearches, setRecentSearches] = useState(['milk', 'apples', 'bread', 'eggs']);
  const [trendingSearches, setTrendingSearches] = useState(['bananas', 'orange juice', 'cheese', 'croissants']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Load search results based on query param
  useEffect(() => {
    if (queryParam) {
      setIsLoading(true);
      
      // Simulate API call with delay
      const timer = setTimeout(() => {
        // Filter products based on search term
        const filtered = allProducts.filter(product => 
          product.name.toLowerCase().includes(queryParam.toLowerCase())
        );
        setProducts(filtered);
        setIsLoading(false);
        
        // Add to recent searches
        if (queryParam.trim() !== '' && !recentSearches.includes(queryParam.toLowerCase())) {
          setRecentSearches(prev => [queryParam.toLowerCase(), ...prev.slice(0, 3)]);
        }
      }, 800);
      
      return () => clearTimeout(timer);
    } else {
      setProducts([]);
      setIsLoading(false);
    }
  }, [queryParam]);

  // Apply sorting to products
  useEffect(() => {
    if (products.length > 0) {
      let sortedProducts = [...products];
      
      switch (activeSort) {
        case 'priceLowToHigh':
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case 'priceHighToLow':
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case 'discount':
          sortedProducts.sort((a, b) => {
            const discountA = a.oldPrice ? ((a.oldPrice - a.price) / a.oldPrice * 100) : 0;
            const discountB = b.oldPrice ? ((b.oldPrice - b.price) / b.oldPrice * 100) : 0;
            return discountB - discountA;
          });
          sortedProducts.sort((a, b) => b.rating - a.rating);
          break;
        default: // popularity
          sortedProducts.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
          break;
      }
      
      // Apply filters
      if (activeFilters.includes('inStock')) {
        sortedProducts = sortedProducts.filter(product => product.inStock);
      }
      
      if (activeFilters.includes('onDiscount')) {
        sortedProducts = sortedProducts.filter(product => product.oldPrice !== null);
      }
      
      setProducts(sortedProducts);
    }
  }, [activeSort, activeFilters]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm });
    } else {
      navigate('/grocery/search');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    navigate('/grocery/search');
  };

  const handleSearchItemClick = (term) => {
    setSearchTerm(term);
    setSearchParams({ q: term });
  };

  const toggleFilter = (filterId) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const setSort = (sortId) => {
    setActiveSort(sortId);
    setShowSortMenu(false);
  };

  // Handle adding to cart
  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      // Check if product is already in cart
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increase quantity if product already exists
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new product to cart with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    // Open the cart sidebar
    setIsCartOpen(true);
  };

  // Update quantity in cart
  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const renderContent = () => {
    // Show loading state
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      );
    }
    
    // Show search results if query exists and products found
    if (queryParam && products.length > 0) {
      return (
        <>
          <div className="flex justify-between items-center py-3">
            <span className="text-sm text-gray-600">{products.length} results</span>
            <div className="flex gap-2">
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowSortMenu(!showSortMenu);
                    setShowFilterMenu(false);
                  }}
                  className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                >
                  <Tag className="h-4 w-4 mr-1" />
                  Sort
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                
                {showSortMenu && (
                  <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="p-2">
                      {sortOptions.map(option => (
                        <button 
                          key={option.id}
                          onClick={() => setSort(option.id)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                            activeSort === option.id ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'
                          }`}
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowFilterMenu(!showFilterMenu);
                    setShowSortMenu(false);
                  }}
                  className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                
                {showFilterMenu && (
                  <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="p-2">
                      {filterOptions.map(option => (
                        <button 
                          key={option.id}
                          onClick={() => toggleFilter(option.id)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm hover:bg-gray-50"
                        >
                          {option.name}
                          <div className={`w-4 h-4 border rounded ${
                            activeFilters.includes(option.id) ? 'bg-green-500 border-green-500' : 'border-gray-300'
                          }`}>
                            {activeFilters.includes(option.id) && (
                              <X className="h-4 w-4 text-white" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map(product => (
              <Link 
                key={product.id}
                to={`/grocery/products/${product.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="h-32 flex items-center justify-center p-3">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="max-h-full object-contain"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.unit}</p>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold">₹{product.price}</span>
                      {product.oldPrice && (
                        <span className="text-xs text-gray-500 line-through ml-2">₹{product.oldPrice}</span>
                      )}
                    </div>
                    
                    {!product.inStock && (
                      <span className="text-xs text-red-500">Out of stock</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      );
    }
    
    // Show "no results" message if query exists but no products found
    if (queryParam && products.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center text-gray-500 mx-auto mb-4">
            <Search className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No results found</h3>
          <p className="text-gray-500 mb-6">
            We couldn't find any products matching "{queryParam}".
          </p>
          <button 
            onClick={clearSearch}
            className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Clear Search
          </button>
          
          <div className="mt-8 text-left">
            <h3 className="font-medium mb-2">Browse Categories</h3>
            <div className="grid grid-cols-2 gap-3">
              {mockCategories.slice(0, 4).map(category => (
                <Link 
                  key={category.id}
                  to={`/grocery/categories/${category.id}`}
                  className="border border-gray-200 rounded-lg p-3 hover:border-green-400 transition-colors"
                >
                  <h4 className="font-medium text-sm">{category.name}</h4>
                  <p className="text-xs text-gray-500">{category.count}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    // Default: show search page with suggestions
    return (
      <div className="py-4">
        {/* Recent searches */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-3">Recent Searches</h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term, idx) => (
              <button 
                key={idx} 
                onClick={() => handleSearchItemClick(term)}
                className="px-3 py-1.5 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
        
        {/* Trending searches */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-3">Popular Searches</h3>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((term, idx) => (
              <button 
                key={idx} 
                onClick={() => handleSearchItemClick(term)}
                className="px-3 py-1.5 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
        
        {/* Browse categories */}
        <div>
          <h3 className="text-sm font-medium mb-3">Browse Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {mockCategories.map(category => (
              <Link 
                key={category.id}
                to={`/grocery/categories/${category.id}`}
                className="border border-gray-200 rounded-lg p-3 hover:border-green-400 transition-colors flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium text-sm">{category.name}</h4>
                  <p className="text-xs text-gray-500">{category.count}</p>
                </div>
                <span className="text-green-500">&rsaquo;</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <GroceryNavBar />

      {/* Search bar */}
      <header className="bg-white shadow-sm sticky top-16 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center">
            <Link to="/grocery" className="mr-3">
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </Link>
            
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:bg-white"
                autoFocus
              />
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-600"
              >
                <span className="font-medium text-sm">Search</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4">
        {renderContent()}
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Overlay to close menus */}
      {(showSortMenu || showFilterMenu) && (
        <div 
          className="fixed inset-0 z-0"
          onClick={() => {
            setShowSortMenu(false);
            setShowFilterMenu(false);
          }}
        />
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default SearchPage;
