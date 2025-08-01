import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Plus, Edit, Trash2,
  ChevronLeft, ChevronRight, RefreshCw,
  AlertCircle, Check, X, Upload, PenSquare, Eye
} from 'lucide-react';
import * as groceryService from '../../../../services/groceryService';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    image: null,
    isActive: true
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [formError, setFormError] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [currentPage, searchTerm]);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};

      if (searchTerm) {
        params.search = searchTerm;
      }

      params.page = currentPage;

      const response = await groceryService.getCategories(params);

      if (Array.isArray(response)) {
        setCategories(response);
        setTotalPages(Math.ceil(response.length / 10) || 1);
      } else if (response && response.categories) {
        setCategories(response.categories);
        setTotalPages(response.pagination?.pages || 1);
      } else {
        throw new Error('Invalid response format');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories. Please try again.');
      setCategories([]);
      setLoading(false);
    }
  };

  // Handles image upload for both add and edit modals
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setFormError('Image size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      if (isAddModalOpen) {
        setNewCategory((prev) => ({ ...prev, image: reader.result }));
      } else if (isEditModalOpen && selectedCategory) {
        setSelectedCategory((prev) => ({ ...prev, image: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) {
      setFormError('Category name is required');
      return;
    }

    try {
      await groceryService.createCategory(newCategory);
      fetchCategories();
      setNewCategory({
        name: '',
        description: '',
        image: null,
        isActive: true
      });
      setImagePreview(null);
      setIsAddModalOpen(false);
      setFormError('');
    } catch (error) {
      console.error('Error creating category:', error);
      setFormError('Failed to create category. Please try again.');
    }
  };

  const handleEditCategory = async () => {
    if (!selectedCategory.name.trim()) {
      setFormError('Category name is required');
      return;
    }

    // Only send the fields you want to update!
    const updateData = {
      name: selectedCategory.name,
      description: selectedCategory.description,
      isActive: selectedCategory.isActive,
      image: selectedCategory.image || imagePreview || null, // Always include image
    };

    try {
      await groceryService.updateCategory(selectedCategory._id, updateData);
      fetchCategories();
      setIsEditModalOpen(false);
      setSelectedCategory(null);
      setImagePreview(null);
      setFormError('');
    } catch (error) {
      console.error('Error updating category:', error);
      setFormError('Failed to update category. Please try again.');
    }
  };
  
  const handleDeleteCategory = async () => {
    try {
      await groceryService.deleteCategory(selectedCategory._id);
      fetchCategories();
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category. Please try again.');
    }
  };

  const handleOpenEditModal = (category) => {
    setSelectedCategory({ ...category });
    setImagePreview(category.image || null);
    setIsEditModalOpen(true);
    setFormError('');
  };

  const handleOpenDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      {/* Action Bar */}
      <div className="bg-white rounded-xl shadow-sm mb-6 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search categories..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={fetchCategories}
              className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
            >
              <RefreshCw size={18} className="mr-2" />
              <span>Refresh</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus size={18} className="mr-2" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-gray-400 mb-2">
              <AlertCircle size={48} />
            </div>
            <p className="text-gray-600 mb-4">No categories found</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={18} className="mr-2" />
              <span>Add New Category</span>
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created On
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category._id || category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-lg object-cover"
                              src={category.image || 'https://placehold.co/100x100?text=No+Image'}
                              alt={category.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                            <div className="text-sm text-gray-500">ID: {category.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {category.description || 'No description provided'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{category.productCount} products</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                          {category.isActive ? (
                            <>
                              <Check size={12} className="mr-1" />
                              Active
                            </>
                          ) : (
                            <>
                              <X size={12} className="mr-1" />
                              Inactive
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(category.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end items-center space-x-2">
                          <Link to={`/admin/grocery/products?category=${category.id}`} className="text-blue-600 hover:text-blue-900">
                            <Eye size={18} />
                          </Link>
                          <button
                            onClick={() => handleOpenEditModal(category)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(category)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={18} />
                          </button>
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
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === totalPages
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
                    Showing <span className="font-medium">{categories.length}</span> of{' '}
                    <span className="font-medium">{totalPages * 5}</span> categories
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${currentPage === totalPages
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

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed text-black inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Category</h2>
              <button onClick={() => {
                setIsAddModalOpen(false);
                setNewCategory({
                  name: '',
                  description: '',
                  image: null,
                  isActive: true
                });
                setImagePreview(null);
                setFormError('');
              }} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg flex items-center">
                <AlertCircle size={18} className="mr-2" />
                {formError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="categoryName"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="categoryDescription"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category description"
                  rows="3"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Image
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <PenSquare size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label htmlFor="categoryImage" className="cursor-pointer flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      <Upload size={18} className="mr-2" />
                      <span>Upload Image</span>
                    </label>
                    <input
                      type="file"
                      id="categoryImage"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={newCategory.isActive}
                  onChange={(e) => setNewCategory({ ...newCategory, isActive: e.target.checked })}
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Category is active
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setNewCategory({
                      name: '',
                      description: '',
                      image: null,
                      isActive: true
                    });
                    setImagePreview(null);
                    setFormError('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {isEditModalOpen && selectedCategory && (
        <div className="fixed text-black inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Category</h2>
              <button onClick={() => {
                setIsEditModalOpen(false);
                setSelectedCategory(null);
                setImagePreview(null);
                setFormError('');
              }} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg flex items-center">
                <AlertCircle size={18} className="mr-2" />
                {formError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="editCategoryName" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="editCategoryName"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category name"
                  value={selectedCategory.name}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="editCategoryDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="editCategoryDescription"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category description"
                  rows="3"
                  value={selectedCategory.description || ''}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, description: e.target.value })}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Image
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <PenSquare size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label htmlFor="editCategoryImage" className="cursor-pointer flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      <Upload size={18} className="mr-2" />
                      <span>Change Image</span>
                    </label>
                    <input
                      type="file"
                      id="editCategoryImage"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="editIsActive"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={selectedCategory.isActive}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, isActive: e.target.checked })}
                />
                <label htmlFor="editIsActive" className="ml-2 text-sm text-gray-700">
                  Category is active
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedCategory(null);
                    setImagePreview(null);
                    setFormError('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEditCategory}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="mb-4">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 text-red-600 rounded-full">
                <AlertCircle size={24} />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-center">Delete Category</h2>
              <p className="mt-2 text-gray-600 text-center">
                Are you sure you want to delete "{selectedCategory.name}"? This action cannot be undone.
              </p>
              {selectedCategory.productCount > 0 && (
                <div className="mt-4 bg-yellow-50 text-yellow-700 p-3 rounded-lg text-sm">
                  This category contains {selectedCategory.productCount} products. Deleting it may affect these products.
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedCategory(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteCategory}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;