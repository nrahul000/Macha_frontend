import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Plus, Edit, Trash2, 
  ChevronLeft, ChevronRight, RefreshCw,
  AlertCircle, Filter, BarChart2, ArrowUp, ArrowDown,
  Download, Package, AlertTriangle, X, PlusCircle, 
  MinusCircle, Clipboard, Truck
} from 'lucide-react';
import * as groceryService from '../../../../services/groceryService';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [adjustQuantity, setAdjustQuantity] = useState('');
  const [adjustReason, setAdjustReason] = useState('');
  const [adjustType, setAdjustType] = useState('add');
  const [inventorySummary, setInventorySummary] = useState({
    totalItems: 0,
    lowStockItems: 0,
    outOfStockItems: 0,
    overStockedItems: 0
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  // Stock status options
  const stockStatuses = [
    { id: 'all', name: 'All Status' },
    { id: 'in-stock', name: 'In Stock' },
    { id: 'low-stock', name: 'Low Stock' },
    { id: 'out-of-stock', name: 'Out of Stock' },
    { id: 'overstock', name: 'Overstock' }
  ];

  useEffect(() => {
    fetchInventory();
    fetchCategories();
    fetchInventorySummary();
  }, [currentPage, statusFilter, categoryFilter, searchTerm]);

  const fetchCategories = async () => {
    try {
      const categoriesData = await groceryService.getCategories();
      // Add "All Categories" option
      setCategories([
        { _id: 'all', name: 'All Categories' },
        ...categoriesData
      ]);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    }
  };

  const fetchInventorySummary = async () => {
    try {
      const summary = await groceryService.getInventorySummary();
      setInventorySummary(summary);
    } catch (err) {
      console.error('Error fetching inventory summary:', err);
    }
  };

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Build query params
      const params = { page: currentPage };
      
      if (searchTerm) {
        params.search = searchTerm;
      }
      
      if (categoryFilter !== 'all') {
        params.category = categoryFilter;
      }
      
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      
      // Fetch products from API
      const response = await groceryService.getAdminProducts(params);
      
      if (response && response.products) {
        setInventory(response.products);
        setTotalPages(response.pagination?.pages || 1);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setError('Failed to load inventory data. Please try again.');
      setInventory([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleAdjustInventory = async () => {
    if (!adjustQuantity || isNaN(adjustQuantity) || parseInt(adjustQuantity) <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

    if (!adjustReason.trim()) {
      alert('Please enter a reason for the adjustment');
      return;
    }

    try {
      const adjustmentData = {
        productId: selectedProduct._id,
        adjustmentType: adjustType,
        quantity: parseInt(adjustQuantity),
        reason: adjustReason,
        notes: ''
      };
      
      await groceryService.adjustInventory(adjustmentData);
      
      // Refresh inventory data
      fetchInventory();
      fetchInventorySummary();
      
      // Close modal and reset form
      setIsAdjustModalOpen(false);
      setSelectedProduct(null);
      setAdjustQuantity('');
      setAdjustReason('');
      setAdjustType('add');
      
    } catch (error) {
      console.error('Error adjusting inventory:', error);
      alert('Failed to adjust inventory. Please try again.');
    }
  };

  const openAdjustModal = (product, type) => {
    setSelectedProduct(product);
    setAdjustType(type);
    setIsAdjustModalOpen(true);
  };

  return (
    <div>
      {/* Action Bar */}
      <div className="bg-white rounded-xl shadow-sm mb-6 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search inventory..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
            >
              <Filter size={18} className="mr-2" />
              <span>Filter</span>
            </button>
            
            <button
              onClick={fetchInventory}
              className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
            >
              <RefreshCw size={18} className="mr-2" />
              <span>Refresh</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <Link
              to="/admin/grocery/inventory/report"
              className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
            >
              <BarChart2 size={18} className="mr-2" />
              <span>Reports</span>
            </Link>
            
            <button
              onClick={() => {
                // Export inventory data via API
                groceryService.exportInventory().then(data => {
                  // Handle CSV download
                  const blob = new Blob([data], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.setAttribute('hidden', '');
                  a.setAttribute('href', url);
                  a.setAttribute('download', 'inventory_export.csv');
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }).catch(err => {
                  console.error('Error exporting inventory:', err);
                  alert('Failed to export inventory data.');
                });
              }}
              className="flex items-center px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
            >
              <Download size={18} className="mr-2" />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        {/* Filter Section */}
        {isFilterOpen && (
          <div className="mt-4 text-black pt-4 border-t border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                <select
                  className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {stockStatuses.map(status => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  setStatusFilter('all');
                  setSearchTerm('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="flex items-center">
            <AlertTriangle size={18} className="mr-2" />
            {error}
          </p>
        </div>
      )}
      
      {/* Inventory Summary */}
      <div className="grid text-black grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <h3 className="text-2xl font-semibold mt-1">{inventorySummary.totalItems}</h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Low Stock Items</p>
              <h3 className="text-2xl font-semibold mt-1">{inventorySummary.lowStockItems}</h3>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Out of Stock</p>
              <h3 className="text-2xl font-semibold mt-1">{inventorySummary.outOfStockItems}</h3>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <X className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Overstocked</p>
              <h3 className="text-2xl font-semibold mt-1">{inventorySummary.overStockedItems}</h3>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Clipboard className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : inventory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-gray-400 mb-2">
              <AlertTriangle size={48} />
            </div>
            <p className="text-gray-600 mb-4">No inventory items found</p>
            <p className="text-gray-500 max-w-md text-center">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Stock
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventory.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-md object-cover" 
                              src={item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/100x100?text=No+Image'} 
                              alt={item.name} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.categoryId ? item.categoryId.name : 'Uncategorized'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.stock} units</div>
                        <div className="text-xs text-gray-500">
                          Min: {item.minStockLevel} | Max: {item.maxStockLevel}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.stockStatus === 'in-stock' 
                            ? 'bg-green-100 text-green-800' 
                            : item.stockStatus === 'low-stock'
                              ? 'bg-yellow-100 text-yellow-800'
                              : item.stockStatus === 'out-of-stock'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                        }`}>
                          {item.stockStatus === 'in-stock' && 'In Stock'}
                          {item.stockStatus === 'low-stock' && 'Low Stock'}
                          {item.stockStatus === 'out-of-stock' && 'Out of Stock'}
                          {item.stockStatus === 'overstock' && 'Overstocked'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.location || 'Main Warehouse'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(item.lastUpdated || item.updatedAt || item.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openAdjustModal(item, 'add')}
                            className="text-green-600 hover:text-green-900"
                            title="Add Stock"
                          >
                            <PlusCircle size={18} />
                          </button>
                          <button
                            onClick={() => openAdjustModal(item, 'remove')}
                            className="text-red-600 hover:text-red-900"
                            title="Remove Stock"
                          >
                            <MinusCircle size={18} />
                          </button>
                          <Link
                            to={`/admin/grocery/products/edit/${item._id}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit Product"
                          >
                            <Truck size={18} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(currentPage * 10, inventory.length + (currentPage - 1) * 10)}</span> of{' '}
                    <span className="font-medium">{totalPages * 10}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else {
                        if (currentPage <= 3) {
                          pageNumber = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i;
                        } else {
                          pageNumber = currentPage - 2 + i;
                        }
                      }
                      
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === pageNumber
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Adjust Inventory Modal */}
      {isAdjustModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              {adjustType === 'add' ? 'Add Stock' : 'Remove Stock'}: {selectedProduct.name}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Stock
                </label>
                <div className="p-2.5 bg-gray-100 rounded-lg text-gray-700">
                  {selectedProduct.stock} units
                </div>
              </div>
              
              <div>
                <label htmlFor="adjustQuantity" className="block text-sm font-medium text-gray-700 mb-1">
                  {adjustType === 'add' ? 'Quantity to Add' : 'Quantity to Remove'}
                </label>
                <input
                  type="number"
                  id="adjustQuantity"
                  value={adjustQuantity}
                  onChange={(e) => setAdjustQuantity(e.target.value)}
                  min="1"
                  className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter quantity"
                />
              </div>
              
              <div>
                <label htmlFor="adjustReason" className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Adjustment
                </label>
                <select
                  id="adjustReason"
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a reason...</option>
                  {adjustType === 'add' ? (
                    <>
                      <option value="new_stock">New Stock Arrival</option>
                      <option value="return">Customer Return</option>
                      <option value="correction">Inventory Correction</option>
                      <option value="other">Other</option>
                    </>
                  ) : (
                    <>
                      <option value="sale">Sale</option>
                      <option value="damage">Damaged Goods</option>
                      <option value="expiry">Expired Items</option>
                      <option value="correction">Inventory Correction</option>
                      <option value="other">Other</option>
                    </>
                  )}
                </select>
              </div>
              
              {adjustReason === 'other' && (
                <div>
                  <label htmlFor="customReason" className="block text-sm font-medium text-gray-700 mb-1">
                    Specify Reason
                  </label>
                  <textarea
                    id="customReason"
                    className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter specific reason..."
                    rows="2"
                  ></textarea>
                </div>
              )}
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsAdjustModalOpen(false);
                    setSelectedProduct(null);
                    setAdjustQuantity('');
                    setAdjustReason('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleAdjustInventory}
                  className={`px-4 py-2 rounded-lg text-white ${
                    adjustType === 'add' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {adjustType === 'add' ? 'Add Stock' : 'Remove Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;