import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Save, Upload, Plus, X, Tag,
  AlertCircle, CheckCircle
} from 'lucide-react';
import * as groceryService from '../../../../services/groceryService';

// Make sure component is defined as a named export
const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    sku: '',
    description: '',
    price: '',
    salePrice: '',
    cost: '',
    stockQuantity: '',
    weight: '',
    categoryId: '',
    images: [],
    tags: [],
    attributes: [],
    isActive: true,
    featured: false,
    taxable: true,
    stockAlert: 10
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [currentTag, setCurrentTag] = useState('');
  const [variantMode, setVariantMode] = useState(false);
  const [currentAttribute, setCurrentAttribute] = useState({ name: '', value: '' });

  // Sample grocery categories
  const categories = [
    { id: 'fruits', name: 'Fruits & Vegetables' },
    { id: 'dairy', name: 'Dairy & Eggs' },
    { id: 'bakery', name: 'Bakery' },
    { id: 'groceries', name: 'Groceries & Staples' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'snacks', name: 'Snacks & Branded Foods' },
    { id: 'personal', name: 'Personal Care' },
    { id: 'household', name: 'Household' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    // Only allow numbers
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setProduct({
        ...product,
        [name]: value
      });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setProduct({
        ...product,
        images: [...product.images, ...images]
      });
    });
  };

  const removeImage = (index) => {
    const newImages = [...product.images];
    newImages.splice(index, 1);
    setProduct({
      ...product,
      images: newImages
    });
  };

  const addTag = () => {
    if (currentTag.trim() && !product.tags.includes(currentTag.trim())) {
      setProduct({
        ...product,
        tags: [...product.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };

  const removeTag = (tag) => {
    setProduct({
      ...product,
      tags: product.tags.filter(t => t !== tag)
    });
  };

  const addAttribute = () => {
    if (currentAttribute.name.trim() && currentAttribute.value.trim()) {
      setProduct({
        ...product,
        attributes: [...product.attributes, { ...currentAttribute }]
      });
      setCurrentAttribute({ name: '', value: '' });
    }
  };

  const removeAttribute = (index) => {
    const newAttributes = [...product.attributes];
    newAttributes.splice(index, 1);
    setProduct({
      ...product,
      attributes: newAttributes
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (!product.name || !product.price || !product.categoryId) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    try {
      console.log('Submitting product:', product);

      // Send data to the API
      await groceryService.createProduct(product);

      // Show success message
      setSuccess(true);
      setLoading(false);

      // Redirect after success
      setTimeout(() => {
        navigate('/admin/grocery/products');
      }, 2000);
    } catch (err) {
      setError('Failed to create product. Please try again.');
      setLoading(false);
      console.error('API Error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="flex text-black min-h-screen bg-gray-50">
      {/* <AdminSidebar /> */}

      <div className="flex-1">
        {/* <AdminHeader title="Add New Product" /> */}

        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <Link
              to="/admin/grocery/products"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span>Back to Products</span>
            </Link>

            <button
              onClick={handleSubmit}
              disabled={loading || success}
              className={`flex items-center px-4 py-2 rounded-lg ${loading || success
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  <span>Saving...</span>
                </>
              ) : success ? (
                <>
                  <CheckCircle size={20} className="mr-2" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save size={20} className="mr-2" />
                  <span>Save Product</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg flex items-start">
              <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-lg flex items-start">
              <CheckCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <span>Product created successfully! Redirecting...</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
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
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
                        SKU (Stock Keeping Unit)
                      </label>
                      <input
                        type="text"
                        id="sku"
                        name="sku"
                        value={product.sku}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. PRD-12345"
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
                        onChange={handleChange}
                        rows="4"
                        className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product description"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Images */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Product Images</h2>

                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      id="images"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="images"
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      <Upload size={32} className="text-gray-400 mb-2" />
                      <p className="text-gray-700 font-medium">Click to upload images</p>
                      <p className="text-gray-500 text-sm mt-1">PNG, JPG, GIF up to 5MB</p>
                    </label>
                  </div>

                  {product.images.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {product.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Product ${index}`}
                              className="h-24 w-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Pricing</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Regular Price (₹) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleNumberChange}
                        className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700 mb-1">
                        Sale Price (₹)
                      </label>
                      <input
                        type="text"
                        id="salePrice"
                        name="salePrice"
                        value={product.salePrice}
                        onChange={handleNumberChange}
                        className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
                        Cost Price (₹)
                      </label>
                      <input
                        type="text"
                        id="cost"
                        name="cost"
                        value={product.cost}
                        onChange={handleNumberChange}
                        className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      id="taxable"
                      name="taxable"
                      checked={product.taxable}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="taxable" className="ml-2 text-sm text-gray-700">
                      This product is taxable
                    </label>
                  </div>
                </div>

                {/* Inventory */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Inventory</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Quantity
                      </label>
                      <input
                        type="text"
                        id="stockQuantity"
                        name="stockQuantity"
                        value={product.stockQuantity}
                        onChange={handleNumberChange}
                        className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label htmlFor="stockAlert" className="block text-sm font-medium text-gray-700 mb-1">
                        Low Stock Alert
                      </label>
                      <input
                        type="text"
                        id="stockAlert"
                        name="stockAlert"
                        value={product.stockAlert}
                        onChange={handleNumberChange}
                        className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={product.isActive}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                      Product is active and visible to customers
                    </label>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Tags</h2>

                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="flex-1 rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add a tag"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <div key={index} className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                        <Tag size={14} className="mr-1" />
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Category */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Category</h2>

                  <div>
                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                      Select Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="categoryId"
                      name="categoryId"
                      value={product.categoryId}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Attributes */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Attributes</h2>

                  <div className="space-y-4 mb-4">
                    <div>
                      <label htmlFor="attrName" className="block text-sm font-medium text-gray-700 mb-1">
                        Attribute Name
                      </label>
                      <input
                        type="text"
                        id="attrName"
                        value={currentAttribute.name}
                        onChange={(e) => setCurrentAttribute({ ...currentAttribute, name: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Weight, Size, Color"
                      />
                    </div>

                    <div>
                      <label htmlFor="attrValue" className="block text-sm font-medium text-gray-700 mb-1">
                        Attribute Value
                      </label>
                      <input
                        type="text"
                        id="attrValue"
                        value={currentAttribute.value}
                        onChange={(e) => setCurrentAttribute({ ...currentAttribute, value: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. 500g, Large, Red"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={addAttribute}
                      className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                    >
                      Add Attribute
                    </button>
                  </div>

                  {product.attributes.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">Added Attributes</h3>
                      <div className="space-y-2">
                        {product.attributes.map((attr, index) => (
                          <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                            <div>
                              <span className="font-medium">{attr.name}:</span> {attr.value}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAttribute(index)}
                              className="text-red-600"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Advanced Options */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Advanced Options</h2>

                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={product.featured}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                      Feature this product on homepage
                    </label>
                  </div>

                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (g)
                    </label>
                    <input
                      type="text"
                      id="weight"
                      name="weight"
                      value={product.weight}
                      onChange={handleNumberChange}
                      className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

// Make sure the default export is properly defined
export default AddProduct;
