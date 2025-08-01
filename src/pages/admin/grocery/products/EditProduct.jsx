import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, 
  ArrowLeft, 
  Image as ImageIcon, 
  Trash2, 
  AlertCircle,
  Tag,
  Barcode,
  Package,
  DollarSign,
  Percent,
  Check,
  X,
  Info,
  Upload,
  Eye
} from "lucide-react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Product state
  const [product, setProduct] = useState({
    name: '',
    description: '',
    sku: '',
    barcode: '',
    category: '',
    price: '',
    costPrice: '',
    discount: '',
    tax: '',
    stock: '',
    minStock: '',
    isActive: true,
    isFeatured: false,
    images: []
  });
  
  // Sample categories for the dropdown
  const categories = [
    { id: 'fruits', name: 'Fruits & Vegetables' },
    { id: 'dairy', name: 'Dairy & Eggs' },
    { id: 'bakery', name: 'Bakery' },
    { id: 'groceries', name: 'Groceries & Staples' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'snacks', name: 'Snacks & Branded Foods' }
  ];

  useEffect(() => {
    // Fetch product data based on ID
    fetchProductData();
  }, [id]);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      // In a real app, we would fetch data from an API
      // For now, let's use a timeout to simulate a network request
      setTimeout(() => {
        // Mock product data
        const mockProduct = {
          id: id,
          name: 'Organic Apples',
          description: 'Fresh organic apples sourced from local farmers.',
          sku: `SKU-${id}`,
          barcode: `BARCODE-${id}`,
          category: 'fruits',
          price: '120',
          costPrice: '80',
          discount: '5',
          tax: '12',
          stock: '250',
          minStock: '20',
          isActive: true,
          isFeatured: true,
          images: [
            'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
            'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
          ]
        };
        
        setProduct(mockProduct);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to load product data. Please try again.');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      const newImages = files.map(file => URL.createObjectURL(file));
      
      setProduct({
        ...product,
        images: [...product.images, ...newImages]
      });
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...product.images];
    updatedImages.splice(index, 1);
    
    setProduct({
      ...product,
      images: updatedImages
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // In a real app, we would send data to an API
      // For now, let's use a timeout to simulate a network request
      setTimeout(() => {
        console.log('Product data saved:', product);
        setSaving(false);
        setShowSuccessMessage(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }, 1000);
    } catch (err) {
      setError('Failed to save product data. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/grocery/products')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2" size={18} />
          <span>Back to Products</span>
        </button>
      </div>
      
      {/* Page header */}
      <div className="bg-white rounded-xl shadow-sm mb-6 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {loading ? 'Loading Product...' : `Editing: ${product.name}`}
            </h1>
            <p className="text-gray-500 mt-1">
              {loading ? '' : `Product ID: ${id}`}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {!loading && (
              <button
                onClick={() => navigate(`/admin/grocery/products/view/${id}`)}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg flex items-center"
              >
                <Eye size={18} className="mr-2" />
                Preview
              </button>
            )}
            
            <button
              type="submit"
              form="product-form"
              disabled={loading || saving}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center ${
                (loading || saving) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              <Save size={18} className="mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Success message */}
      {showSuccessMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-lg flex items-start">
          <Check size={20} className="text-green-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-green-800">Product saved successfully</h3>
            <p className="text-green-700 text-sm">All changes have been saved to the database.</p>
          </div>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start">
          <AlertCircle size={20} className="text-red-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-red-800">Error</h3>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm p-8 flex justify-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <form id="product-form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main product info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={product.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={product.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
                        SKU <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Barcode size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="sku"
                          name="sku"
                          value={product.sku}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="barcode" className="block text-sm font-medium text-gray-700 mb-1">
                        Barcode
                      </label>
                      <div className="relative">
                        <Barcode size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="barcode"
                          name="barcode"
                          value={product.barcode}
                          onChange={handleInputChange}
                          className="w-full pl-10 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Tag size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Pricing</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Selling Price <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <DollarSign size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={product.price}
                          onChange={handleInputChange}
                          required
                          min="0"
                          step="0.01"
                          className="w-full pl-10 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="costPrice" className="block text-sm font-medium text-gray-700 mb-1">
                        Cost Price
                      </label>
                      <div className="relative">
                        <DollarSign size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          id="costPrice"
                          name="costPrice"
                          value={product.costPrice}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                          className="w-full pl-10 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                        Discount (%)
                      </label>
                      <div className="relative">
                        <Percent size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          id="discount"
                          name="discount"
                          value={product.discount}
                          onChange={handleInputChange}
                          min="0"
                          max="100"
                          className="w-full pl-10 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="tax" className="block text-sm font-medium text-gray-700 mb-1">
                        Tax Rate (%)
                      </label>
                      <div className="relative">
                        <Percent size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          id="tax"
                          name="tax"
                          value={product.tax}
                          onChange={handleInputChange}
                          min="0"
                          className="w-full pl-10 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {product.discount > 0 && (
                    <div className="bg-blue-50 p-3 rounded-lg flex items-start">
                      <Info size={18} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-700">
                        <p>After discount, the final price will be: <strong>{(product.price * (1 - product.discount / 100)).toFixed(2)}</strong></p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Product Images</h2>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <label htmlFor="images" className="cursor-pointer block">
                      <ImageIcon size={36} className="mx-auto text-gray-400 mb-2" />
                      <span className="text-gray-600 mb-1 block">Drop your images here, or click to browse</span>
                      <span className="text-gray-500 text-sm block">JPG, PNG or WebP (max 5MB each)</span>
                      
                      <input
                        type="file"
                        id="images"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      
                      <button
                        type="button"
                        onClick={() => document.getElementById('images').click()}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Upload size={16} className="mr-2" />
                        Select Files
                      </button>
                    </label>
                  </div>
                  
                  {product.images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {product.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Sidebar - Inventory and Settings */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Inventory</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Stock <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Package size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={product.stock}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full pl-10 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="minStock" className="block text-sm font-medium text-gray-700 mb-1">
                      Low Stock Threshold
                    </label>
                    <div className="relative">
                      <AlertCircle size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        id="minStock"
                        name="minStock"
                        value={product.minStock}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full pl-10 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        You'll be notified when stock falls below this level
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Product Status</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="isActive" className="font-medium text-gray-700">Active</label>
                      <p className="text-sm text-gray-500">Customers can see and purchase this product</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        className="sr-only peer"
                        checked={product.isActive}
                        onChange={handleInputChange}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="isFeatured" className="font-medium text-gray-700">Featured</label>
                      <p className="text-sm text-gray-500">Product will be displayed on homepage</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="isFeatured"
                        name="isFeatured"
                        className="sr-only peer"
                        checked={product.isFeatured}
                        onChange={handleInputChange}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Danger Zone</h2>
                
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
                      navigate('/admin/grocery/products');
                    }
                  }}
                  className="w-full px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={18} className="inline-block mr-2" />
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
 
                        