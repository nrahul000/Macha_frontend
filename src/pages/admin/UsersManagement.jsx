import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search, RefreshCw, AlertCircle, Download,
  Eye, Edit, Trash2, UserPlus, UserCheck, UserX,
  Filter, Check, X, Package, Calendar, MessageSquare,
  History
} from 'lucide-react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'user'
  });
  const [actionSuccess, setActionSuccess] = useState('');
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [userHistory, setUserHistory] = useState({
    orders: [],
    bookings: [],
    messages: [],
    loginHistory: []
  });
  const [historyLoading, setHistoryLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Authentication token missing. Please login again.');
        setLoading(false);
        return;
      }

      // Prepare query params
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', 10);
      params.append('role', 'user'); // Always fetch only users
      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await axios.get(`${API_BASE_URL}/admin/users?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.success) {
        setUsers(response.data.users);
        setTotalPages(response.data.pagination.pages);
        setError(null);
      } else {
        setError('Failed to fetch users. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      if (err.response?.status === 401) {
        setError('Your session has expired. Please login again.');
      } else if (err.response?.status === 403) {
        setError('You do not have permission to access user data.');
      } else {
        setError('Failed to load users. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      setHistoryLoading(true);
      const token = localStorage.getItem('token');

      // Fetch detailed user information including history
      const response = await axios.get(`${API_BASE_URL}/admin/users/${userId}/details`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.success) {
        setSelectedUserDetails(response.data.user);
        setUserHistory({
          orders: response.data.orders || [],
          bookings: response.data.bookings || [],
          messages: response.data.messages || [],
          loginHistory: response.data.loginHistory || []
        });
        setShowUserDetailsModal(true);
      } else {
        throw new Error(response.data?.message || 'Failed to fetch user details');
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
      setError(err.response?.data?.message || 'Failed to fetch user details');
      setTimeout(() => setError(null), 3000);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    fetchUsers();
  };

  const handleRefresh = () => {
    setSearchTerm('');
    setCurrentPage(1);
    fetchUsers();
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user._id));
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.put(
        `${API_BASE_URL}/admin/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data && response.data.success) {
        setUsers(users.map(user =>
          user._id === userId ? { ...user, role: newRole } : user
        ));

        if (selectedUserDetails && selectedUserDetails._id === userId) {
          setSelectedUserDetails({
            ...selectedUserDetails,
            role: newRole
          });
        }

        setActionSuccess(`User role changed to ${newRole} successfully`);
        setTimeout(() => setActionSuccess(''), 3000);
      } else {
        throw new Error(response.data?.message || 'Failed to update user role');
      }
    } catch (err) {
      console.error('Error updating user role:', err);
      setError(err.response?.data?.message || 'Failed to update user role');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleUserDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.delete(`${API_BASE_URL}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.success) {
        setUsers(users.filter(user => user._id !== userId));
        setSelectedUsers(selectedUsers.filter(id => id !== userId));

        if (selectedUserDetails && selectedUserDetails._id === userId) {
          setShowUserDetailsModal(false);
        }

        setActionSuccess('User deleted successfully');
        setTimeout(() => setActionSuccess(''), 3000);
      } else {
        throw new Error(response.data?.message || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err.response?.data?.message || 'Failed to delete user');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${API_BASE_URL}/admin/users`,
        newUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data && response.data.success) {
        setUsers([response.data.user, ...users]);

        setNewUser({
          name: '',
          email: '',
          password: '',
          phoneNumber: '',
          role: 'user'
        });

        setShowAddModal(false);
        setActionSuccess('User added successfully');
        setTimeout(() => setActionSuccess(''), 3000);
      } else {
        throw new Error(response.data?.message || 'Failed to add user');
      }
    } catch (err) {
      console.error('Error adding user:', err);
      setError(err.response?.data?.message || 'Failed to add user');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const userData = { ...editUser };

      if (!userData.password) {
        delete userData.password;
      }

      const response = await axios.put(
        `${API_BASE_URL}/admin/users/${editUser._id}`,
        userData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data && response.data.success) {
        setUsers(users.map(user =>
          user._id === editUser._id ? response.data.user : user
        ));

        if (selectedUserDetails && selectedUserDetails._id === editUser._id) {
          setSelectedUserDetails(response.data.user);
        }

        setShowEditModal(false);
        setActionSuccess('User updated successfully');
        setTimeout(() => setActionSuccess(''), 3000);
      } else {
        throw new Error(response.data?.message || 'Failed to update user');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err.response?.data?.message || 'Failed to update user');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedUsers.length) return;

    if (!window.confirm(`Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`)) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${API_BASE_URL}/admin/users/bulk-delete`,
        { userIds: selectedUsers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data && response.data.success) {
        setUsers(users.filter(user => !selectedUsers.includes(user._id)));
        setSelectedUsers([]);

        if (selectedUserDetails && selectedUsers.includes(selectedUserDetails._id)) {
          setShowUserDetailsModal(false);
        }

        setActionSuccess(`${selectedUsers.length} users deleted successfully`);
        setTimeout(() => setActionSuccess(''), 3000);
      } else {
        throw new Error(response.data?.message || 'Failed to delete users');
      }
    } catch (err) {
      console.error('Error deleting users:', err);
      setError(err.response?.data?.message || 'Failed to delete users');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const exportUsers = () => {
    const headers = ['Name', 'Email', 'Phone', 'Role', 'Joined'];
    const csvData = users.map(user => [
      user.name,
      user.email,
      user.phoneNumber || 'N/A',
      user.role,
      new Date(user.createdAt || Date.now()).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `macha_users_export_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>User Management | MACHA Admin</title>
      </Helmet>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Users Management</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
          >
            <UserPlus size={18} />
            Add User
          </button>
          <button
            onClick={handleRefresh}
            className="p-2 bg-white rounded-lg border hover:bg-gray-50"
            title="Refresh"
          >
            <RefreshCw size={20} />
          </button>
          <button
            onClick={exportUsers}
            className="p-2 bg-white rounded-lg border hover:bg-gray-50"
            title="Export as CSV"
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Action feedback messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {actionSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <Check size={16} />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Search */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div />
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-l-lg w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg"
          >
            Search
          </button>
        </form>
      </div>

      {/* Selected actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {selectedUsers.length} users selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === users.length && users.length > 0}
                        onChange={handleSelectAll}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                      />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Joined
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user._id)}
                          onChange={() => handleSelectUser(user._id)}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-semibold mr-3">
                            {user.name?.charAt(0) || 'U'}
                          </div>
                          <div className="text-sm font-medium text-gray-900">{user.name || 'No Name'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.phoneNumber || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => fetchUserDetails(user._id)}
                            className="p-1 rounded hover:bg-blue-50 text-blue-700"
                            title="View details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleChangeRole(user._id, user.role === 'admin' ? 'user' : 'admin')}
                            className={`p-1 rounded ${user.role === 'admin'
                              ? 'hover:bg-red-100 text-red-700'
                              : 'hover:bg-purple-100 text-purple-700'
                              }`}
                            title={user.role === 'admin' ? 'Remove admin rights' : 'Make admin'}
                          >
                            {user.role === 'admin' ? <UserX size={18} /> : <UserCheck size={18} />}
                          </button>
                          <button
                            onClick={() => {
                              setEditUser({ ...user, password: '' });
                              setShowEditModal(true);
                            }}
                            className="p-1 rounded hover:bg-blue-100 text-blue-700"
                            title="Edit user"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleUserDelete(user._id)}
                            className="p-1 rounded hover:bg-red-100 text-red-700"
                            title="Delete user"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Filter size={48} className="text-gray-400 mb-4" />
                        <p className="text-lg font-medium text-gray-600 mb-1">No users found</p>
                        <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border bg-white disabled:opacity-50"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded ${currentPage === index + 1
                  ? 'bg-green-600 text-white'
                  : 'bg-white border'
                  }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border bg-white disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}

      {/* User Details Modal */}
      {showUserDetailsModal && selectedUserDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold text-gray-800">User Details</h2>
              <button
                onClick={() => setShowUserDetailsModal(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto p-6 flex-1">
              {historyLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="w-10 h-10 border-2 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  {/* User Profile Info */}
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                      <div className="flex-shrink-0 w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-4xl font-bold">
                        {selectedUserDetails.name?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium text-gray-800">{selectedUserDetails.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-800">{selectedUserDetails.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium text-gray-800">{selectedUserDetails.phoneNumber || '—'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Role</p>
                            <p className="font-medium">
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                {selectedUserDetails.role}
                              </span>
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Joined</p>
                            <p className="font-medium text-gray-800">{formatDate(selectedUserDetails.createdAt)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Last Login</p>
                            <p className="font-medium text-gray-800">{selectedUserDetails.lastLogin ? formatDate(selectedUserDetails.lastLogin) : '—'}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium text-gray-800">{selectedUserDetails.address || '—'}</p>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <button
                            onClick={() => handleChangeRole(
                              selectedUserDetails._id,
                              selectedUserDetails.role === 'admin' ? 'user' : 'admin'
                            )}
                            className={`${selectedUserDetails.role === 'admin'
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                              } px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1`}
                          >
                            {selectedUserDetails.role === 'admin' ? (
                              <>
                                <UserX size={16} />
                                Remove Admin Rights
                              </>
                            ) : (
                              <>
                                <UserCheck size={16} />
                                Make Admin
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
                                handleUserDelete(selectedUserDetails._id);
                                setShowUserDetailsModal(false);
                              }
                            }}
                            className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1"
                          >
                            <Trash2 size={16} />
                            Delete User
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Activity History Tabs */}
                  <div>
                    <div className="border-b mb-4">
                      <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                        <button
                          onClick={() => setActiveTab('orders')}
                          className={`py-2 px-1 border-b-2 ${activeTab === 'orders'
                            ? 'border-green-500 text-green-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } font-medium text-sm`}
                        >
                          Orders ({userHistory.orders.length})
                        </button>
                        <button
                          onClick={() => setActiveTab('bookings')}
                          className={`py-2 px-1 border-b-2 ${activeTab === 'bookings'
                            ? 'border-green-500 text-green-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } font-medium text-sm`}
                        >
                          Bookings ({userHistory.bookings.length})
                        </button>
                        <button
                          onClick={() => setActiveTab('messages')}
                          className={`py-2 px-1 border-b-2 ${activeTab === 'messages'
                            ? 'border-green-500 text-green-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } font-medium text-sm`}
                        >
                          Messages ({userHistory.messages.length})
                        </button>
                        <button
                          onClick={() => setActiveTab('loginHistory')}
                          className={`py-2 px-1 border-b-2 ${activeTab === 'loginHistory'
                            ? 'border-green-500 text-green-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } font-medium text-sm`}
                        >
                          Login Activity
                        </button>
                      </nav>
                    </div>

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                      <div>
                        {userHistory.orders.length > 0 ? (
                          <div className="bg-white border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {userHistory.orders.map(order => (
                                  <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">#{order._id.substring(0, 8)}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{formatDate(order.createdAt)}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{order.serviceType}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">₹{order.totalAmount}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                      <span className={`px-2 py-1 text-xs rounded-full ${getOrderStatusColor(order.status)}`}>
                                        {order.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                            <Package size={32} className="mx-auto text-gray-400 mb-3" />
                            <p className="text-gray-500">No orders found for this user</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Bookings Tab */}
                    {activeTab === 'bookings' && (
                      <div>
                        {userHistory.bookings.length > 0 ? (
                          <div className="bg-white border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {userHistory.bookings.map(booking => (
                                  <tr key={booking._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">#{booking._id.substring(0, 8)}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{formatDate(booking.date)}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{booking.serviceType}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{booking.timeSlot}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                      <span className={`px-2 py-1 text-xs rounded-full ${getBookingStatusColor(booking.status)}`}>
                                        {booking.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                            <Calendar size={32} className="mx-auto text-gray-400 mb-3" />
                            <p className="text-gray-500">No bookings found for this user</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Messages Tab */}
                    {activeTab === 'messages' && (
                      <div>
                        {userHistory.messages.length > 0 ? (
                          <div className="space-y-4">
                            {userHistory.messages.map(message => (
                              <div key={message._id} className="bg-white border rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium text-gray-900">{message.subject}</h4>
                                  <span className="text-xs text-gray-500">{formatDate(message.createdAt)}</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-3">{message.message}</p>
                                <div className="flex justify-between items-center">
                                  <span className={`text-xs px-2 py-1 rounded-full ${message.read ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}>
                                    {message.read ? 'Read' : 'Unread'}
                                  </span>
                                  <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">Reply</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                            <MessageSquare size={32} className="mx-auto text-gray-400 mb-3" />
                            <p className="text-gray-500">No messages found for this user</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Login History Tab */}
                    {activeTab === 'loginHistory' && (
                      <div>
                        {userHistory.loginHistory.length > 0 ? (
                          <div className="bg-white border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {userHistory.loginHistory.map((login, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{formatDate(login.timestamp)}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{login.ipAddress}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{login.device}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{login.location}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                            <History size={32} className="mx-auto text-gray-400 mb-3" />
                            <p className="text-gray-500">No login history available</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="p-4 border-t bg-gray-50 flex justify-end sticky bottom-0">
              <button
                onClick={() => setShowUserDetailsModal(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
          >
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Add New User</h3>
            </div>
            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="user@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="••••••••"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={newUser.phoneNumber}
                  onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="1234567890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="user">Regular User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : 'Add User'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
          >
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Edit User</h3>
            </div>
            <form onSubmit={handleEditUserSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editUser.name || ''}
                  onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={editUser.email || ''}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="user@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-gray-400 text-xs">(Leave blank to keep current password)</span>
                </label>
                <input
                  type="password"
                  value={editUser.password || ''}
                  onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={editUser.phoneNumber || ''}
                  onChange={(e) => setEditUser({ ...editUser, phoneNumber: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="1234567890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={editUser.role || 'user'}
                  onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="user">Regular User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : 'Save Changes'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Helper function for order status colors
const getOrderStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-amber-100 text-amber-800';
    case 'cancelled':
    case 'canceled':
      return 'bg-red-100 text-red-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Helper function for booking status colors
const getBookingStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-amber-100 text-amber-800';
    case 'cancelled':
    case 'canceled':
      return 'bg-red-100 text-red-800';
    case 'confirmed':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default UsersManagement;
