import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GroceryNavBar from '../../../components/grocery/GroceryNavBar';
import ProductGrid from '../../../components/grocery/ProductGrid';
import CartSidebar from '../../../components/grocery/CartSidebar';

const CategoriesPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);


  useEffect(() => {
    // Fetch categories and products from backend
    const fetchData = async () => {
      setIsLoading(true);
      setFetchError(null);
      setErrorDetails(null);
      try {
        // Try to get detailed error information from the server
        console.log('Checking server health...');
        const healthRes = await fetch('/api/health');
        console.log('Health check status:', healthRes.status);

        if (!healthRes.ok) {
          try {
            const errorData = await healthRes.json();
            console.log('Health check error details:', errorData);
          } catch (e) {
            console.log('Could not parse health check error:', healthRes.statusText);
          }
        }

        // Fetch all categories with better error handling
        console.log('Fetching categories...');
        const catRes = await fetch('/api/grocery/categories');
        console.log('Categories response status:', catRes.status);

        if (!catRes.ok) {
          try {
            const errorData = await catRes.json();
            console.log('Server error details:', errorData);
            setErrorDetails(errorData);
            throw new Error(`Server error: ${errorData.message || 'Unknown error'}`);
          } catch (e) {
            throw new Error(`Failed to fetch categories: ${catRes.statusText}`);
          }
        }

        const categoriesData = await catRes.json();
        setCategories(categoriesData);

        // Rest of your code remains the same...
      } catch (err) {
        setFetchError(err.message);
        setCategories([]);
        setProductsByCategory({});
        console.error('FETCH ERROR:', err);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Cart handlers
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

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  useEffect(() => {
    console.log('categories:', categories);
    console.log('productsByCategory:', productsByCategory);
    console.log('isLoading:', isLoading);
    if (fetchError) {
      console.error('Fetch error:', fetchError);
    }
  }, [categories, productsByCategory, isLoading, fetchError]);

  const handleRemoveItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  return (
    <div className="bg-gray-50 text-black  min-h-screen">
      <GroceryNavBar />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">All Categories</h1>

        {/* Error Fallback */}
        {fetchError && (
          <div className="text-red-600 mb-4">
            Error: {fetchError}
          </div>
        )}

        {/* Categories Grid */}
        <div className="mb-10">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow h-48 animate-pulse flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gray-200 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div className="text-gray-500">No categories found.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map(category => (
                <Link
                  key={category._id}
                  to={`/grocery/categories/${category._id}`}
                  className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg hover:scale-[1.03] transition-all flex flex-col items-center p-4 group"
                >
                  <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden mb-3 flex items-center justify-center border border-gray-200 group-hover:border-green-400 transition-all">
                    <img
                      src={category.image || "https://placehold.co/120x120?text=No+Image"}
                      alt={category.name}
                      className="object-cover w-full h-full"
                      onError={e => { e.target.src = "https://placehold.co/120x120?text=No+Image"; }}
                    />
                  </div>
                  <div className="w-full text-center">
                    <h3 className="font-semibold text-base text-gray-900 capitalize mb-1 flex items-center justify-center gap-1">
                      {category.icon && <span>{category.icon}</span>}
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {(productsByCategory[category._id]?.length || 0)} product{(productsByCategory[category._id]?.length || 0) !== 1 ? 's' : ''}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Products by Category */}
        {!isLoading && categories.map(category => (
          <section className="mb-10" key={category._id}>
            <ProductGrid
              title={`${category.name}${category.icon ? ' ' + category.icon : ''}`}
              products={productsByCategory[category._id] || []}
              viewAllLink={`/grocery/categories/${category._id}`}
              loading={isLoading}
              cols={4}
              onAddToCart={handleAddToCart}
            />
          </section>
        ))}
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

console.log("CategoriesPage loaded");

export default CategoriesPage;