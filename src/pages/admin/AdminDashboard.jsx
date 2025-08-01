import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Package, MessageSquare, Calendar,
  TrendingUp, BarChart, Settings, Home,
  ChevronLeft, ChevronRight, LogOut, Menu as MenuIcon,
  User, Bell, ChevronDown, ShoppingBag, Tag, Truck, 
  ClipboardList, LayoutDashboard
} from 'lucide-react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import machaLogo from '../../assets/macha-logo.jpg';
import websocketService from '../../services/websocketService';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [websocketConnected, setWebsocketConnected] = useState(false);
  const [openGroceryMenu, setOpenGroceryMenu] = useState(false);
  const { currentUser, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const notificationIntervalRef = useRef(null);
  const wsUnsubscribeFunctions = useRef([]);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Strict role-based access control
  useEffect(() => {
    if (!loading && (!currentUser || currentUser.role !== 'admin')) {
      navigate('/login', { replace: true });
    }
  }, [currentUser, loading, navigate]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setNotificationDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch notifications from the server
  const fetchNotifications = async () => {
    if (!currentUser || currentUser.role !== 'admin') return;

    try {
      setNotificationLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.get(
        `${API_BASE_URL}/admin/notifications`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data && response.data.success) {
        setNotifications(response.data.notifications);
        // Count unread notifications
        const unreadNotifications = response.data.notifications.filter(notif => !notif.read);
        setUnreadCount(unreadNotifications.length);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setNotificationLoading(false);
    }
  };

  // Setup real-time notifications using WebSocket
  useEffect(() => {
    // Don't setup if user is not an admin
    if (!currentUser || currentUser.role !== 'admin') return;

    // Initial fetch
    fetchNotifications();

    // Set up WebSocket connection
    websocketService.connect();

    // Handle connection status
    const connectionHandler = (data) => {
      setWebsocketConnected(data.status === 'connected');
    };

    // Handle notifications
    const notificationHandler = (data) => {
      if (data.notification) {
        // Add new notification to the list
        setNotifications(prev => [data.notification, ...prev]);
        setUnreadCount(prev => prev + 1);

        // Show browser notification
        if (Notification.permission === 'granted') {
          new Notification('MACHA Admin', {
            body: data.notification.message,
            icon: '/favicon.ico'
          });
        }
      }
    };

    // Register event listeners
    const unsubFunctions = [
      websocketService.on('connection', connectionHandler),
      websocketService.on('notification', notificationHandler)
    ];

    // Store unsubscribe functions
    wsUnsubscribeFunctions.current = unsubFunctions;

    // Join admin notification room
    websocketService.joinRoom('admin-notifications');

    // If WebSocket is not working, fallback to polling
    if (!websocketConnected) {
      // Setup polling interval (every 30 seconds)
      notificationIntervalRef.current = setInterval(fetchNotifications, 30000);
    }

    return () => {
      // Clean up WebSocket listeners
      wsUnsubscribeFunctions.current.forEach(unsub => unsub());
      wsUnsubscribeFunctions.current = [];

      // Leave notification room
      websocketService.leaveRoom('admin-notifications');

      // Clear polling interval
      if (notificationIntervalRef.current) {
        clearInterval(notificationIntervalRef.current);
      }
    };
  }, [currentUser]);

  // Additional useEffect to turn off polling when WebSocket connects
  useEffect(() => {
    if (websocketConnected && notificationIntervalRef.current) {
      clearInterval(notificationIntervalRef.current);
      notificationIntervalRef.current = null;
    } else if (!websocketConnected && !notificationIntervalRef.current && currentUser) {
      // If WebSocket disconnects, start polling again
      notificationIntervalRef.current = setInterval(fetchNotifications, 30000);
    }
  }, [websocketConnected, currentUser]);

  // Handle marking notification as read via WebSocket
  const markNotificationAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');

      // Try to use WebSocket if connected
      if (websocketConnected) {
        websocketService.markMessageAsRead(id);
      } else {
        // Fallback to HTTP
        await axios.patch(
          `${API_BASE_URL}/admin/notifications/${id}/read`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Update local state
      setNotifications(prev =>
        prev.map(notif =>
          notif._id === id ? { ...notif, read: true } : notif
        )
      );

      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');

      await axios.patch(
        `${API_BASE_URL}/admin/notifications/mark-all-read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigationLinks = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/admin' },
    { name: 'Orders', icon: <Package size={20} />, path: '/admin/orders' },
    { name: 'Users', icon: <Users size={20} />, path: '/admin/users' },
    { name: 'Restaurants', icon: <TrendingUp size={20} />, path: '/admin/restaurants' },
    // { name: 'Messages', icon: <MessageSquare size={20} />, path: '/admin/messages' },
    { name: 'Bookings', icon: <Calendar size={20} />, path: '/admin/bookings' },
    { name: 'Analytics', icon: <BarChart size={20} />, path: '/admin/analytics' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/admin/security' },
  ];

  // Grocery navigation items
  const groceryNavItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/admin/grocery/dashboard' },
    { name: 'Products', icon: <Package size={18} />, path: '/admin/grocery/products' },
    { name: 'Categories', icon: <Tag size={18} />, path: '/admin/grocery/categories' },
    { name: 'Inventory', icon: <ClipboardList size={18} />, path: '/admin/grocery/inventory' },
    { name: 'Orders', icon: <Truck size={18} />, path: '/admin/grocery/orders' },
    // { name: 'Analytics', icon: <BarChart size={18} />, path: '/admin/grocery/analytics' }
  ];

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/admin';
  };

  // Don't render anything while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Don't render admin content for non-admins
  if (!currentUser || currentUser.role !== 'admin') {
    return null;
  }

  // Format notification time
  const formatNotificationTime = (timeString) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (60 * 1000));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} min ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString();
  };

  // Toggle grocery submenu
  const toggleGroceryMenu = () => {
    setOpenGroceryMenu(!openGroceryMenu);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Helmet>
        <title>Admin Dashboard | MACHA Services</title>
      </Helmet>

      {/* Sidebar for desktop */}
      <motion.aside
        className={`z-20 fixed h-full md:sticky top-0 left-0 ${sidebarOpen ? 'w-64' : 'w-20'
          } transition-width duration-300 ease-in-out hidden md:block bg-gradient-to-b from-green-700 to-green-500`}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Sidebar Header with Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link to="/admin" className="flex items-center gap-3 overflow-hidden">
            <img src={machaLogo} alt="MACHA Logo" className="w-10 h-10 rounded-lg" />
            {sidebarOpen && (
              <span className="font-semibold text-gray-800">MACHA Admin</span>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          {/* Add Grocery Menu Item */}
          <div className="mb-2">
            <button
              onClick={toggleGroceryMenu}
              className={`flex items-center w-full rounded-lg px-3 py-2.5 text-sm transition-all ${
                location.pathname.startsWith('/admin/grocery')
                  ? 'bg-green-100 text-green-800 font-semibold'
                  : 'text-white hover:bg-green-600 hover:text-green-100'
              }`}
            >
              <span className="mr-3"><ShoppingBag size={20} /></span>
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left">Grocery</span>
                  {openGroceryMenu ? 
                    <ChevronDown size={16} /> : 
                    <ChevronRight size={16} />
                  }
                </>
              )}
            </button>
            
            {/* Grocery submenu */}
            {sidebarOpen && openGroceryMenu && (
              <div className="pl-10 mt-2 space-y-1">
                {groceryNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all ${
                      location.pathname === item.path
                        ? 'bg-green-100 text-green-800 font-semibold'
                        : 'text-white hover:bg-green-600 hover:text-green-100'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Existing navigation links */}
          {navigationLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center rounded-lg px-3 py-2.5 text-sm transition-all ${isActive(item.path)
                ? 'bg-green-100 text-green-800 font-semibold'
                : 'text-white hover:bg-green-600 hover:text-green-100'
                }`}
            >
              <span className="mr-3">{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-green-900 bg-opacity-50 z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-green-700 to-green-500 shadow-lg z-40"
              onClick={e => e.stopPropagation()}
            >
              {/* Mobile Menu Content */}
              <div className="flex items-center justify-between h-16 px-4 border-b border-green-600 bg-white">
                <Link to="/admin" className="flex items-center gap-3">
                  <img src={machaLogo} alt="MACHA Logo" className="w-10 h-10 rounded-lg" />
                  <span className="font-semibold text-green-700">MACHA Admin</span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md hover:bg-green-100"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>

              <nav className="p-4 space-y-2">
                {/* Add Grocery Menu Item for mobile */}
                <div className="mb-2">
                  <button
                    onClick={toggleGroceryMenu}
                    className={`flex items-center w-full rounded-lg px-3 py-2.5 text-sm transition-all ${
                      location.pathname.startsWith('/admin/grocery')
                        ? 'bg-green-100 text-green-800 font-semibold'
                        : 'text-white hover:bg-green-600 hover:text-green-100'
                    }`}
                  >
                    <span className="mr-3"><ShoppingBag size={20} /></span>
                    <span className="flex-1 text-left">Grocery</span>
                    {openGroceryMenu ? 
                      <ChevronDown size={16} /> : 
                      <ChevronRight size={16} />
                    }
                  </button>
                  
                  {openGroceryMenu && (
                    <div className="pl-10 mt-2 space-y-1">
                      {groceryNavItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all ${
                            location.pathname === item.path
                              ? 'bg-green-100 text-green-800 font-semibold'
                              : 'text-white hover:bg-green-600 hover:text-green-100'
                          }`}
                        >
                          <span className="mr-3">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Existing mobile navigation links */}
                {navigationLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center rounded-lg px-3 py-2.5 text-sm transition-all ${isActive(item.path)
                      ? 'bg-green-100 text-green-800 font-semibold'
                      : 'text-white hover:bg-green-600 hover:text-green-100'
                      }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>

              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2.5 mt-6 text-sm rounded-lg text-red-600 hover:bg-red-50 mx-4"
              >
                <LogOut size={20} className="mr-3" />
                <span>Sign out</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-gradient-to-r from-green-700 to-green-500 shadow-sm px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="md:hidden p-2 rounded-md hover:bg-green-600"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon size={24} className="text-white" />
            </button>
            <div className="ml-2 md:ml-0 text-lg font-medium text-white">
              Welcome back, {currentUser?.name?.split(' ')[0] || 'Admin'}
            </div>
          </div>

          {/* Right Navigation Items */}
          <div className="flex items-center gap-3">
            {/* WebSocket Connection Status - NEW */}
            <div className="hidden lg:flex items-center gap-1 text-xs text-green-100 bg-white/10 px-2 py-1 rounded-full">
              <div className={`w-1.5 h-1.5 rounded-full ${websocketConnected ? 'bg-green-300' : 'bg-red-300'}`}></div>
              <span>{websocketConnected ? 'Connected' : 'Offline'}</span>
            </div>

            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationDropdownRef}>
              <button
                onClick={() => {
                  setNotificationDropdownOpen(!notificationDropdownOpen);
                  // Refresh notifications when opening the dropdown
                  if (!notificationDropdownOpen) {
                    fetchNotifications();
                  }
                }}
                className="p-2 rounded-full hover:bg-green-600 relative"
              >
                <Bell size={20} className="text-white" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Content */}
              <AnimatePresence mode="popLayout">
                {notificationDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-30 overflow-hidden"
                  >
                    <div className="p-3 border-b border-green-100 flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-green-700">Notifications</h3>
                      <button
                        onClick={() => fetchNotifications()}
                        className="p-1 rounded hover:bg-green-50 text-green-600"
                        title="Refresh notifications"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 2v6h-6"></path>
                          <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                          <path d="M3 22v-6h6"></path>
                          <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                        </svg>
                      </button>
                    </div>

                    {notificationLoading && (
                      <div className="flex justify-center items-center h-12 bg-gray-50">
                        <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}

                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div
                            key={notification._id}
                            className={`p-3 border-b border-green-100 hover:bg-green-50 flex items-start ${!notification.read ? 'bg-green-50' : ''}`}
                            onClick={() => markNotificationAsRead(notification._id)}
                          >
                            <div className={`w-2 h-2 rounded-full ${!notification.read ? 'bg-green-500' : 'bg-gray-300'} mt-2 mr-3 shrink-0`}></div>
                            <div className="flex-1">
                              <p className={`text-sm ${!notification.read ? 'text-green-900 font-medium' : 'text-gray-700'}`}>
                                {notification.message}
                              </p>
                              <div className="flex justify-between items-center mt-1">
                                <p className="text-xs text-green-600">
                                  {formatNotificationTime(notification.createdAt)}
                                </p>
                                {notification.actionUrl && (
                                  <Link
                                    to={notification.actionUrl}
                                    className="text-xs text-blue-600 hover:underline"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    View
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center text-gray-500 text-sm flex flex-col items-center justify-center">
                          <Bell size={24} className="opacity-20 mb-2" />
                          <p>No notifications</p>
                        </div>
                      )}
                    </div>

                    {notifications.length > 0 && (
                      <div className="p-2 border-t border-green-100 text-center">
                        <button
                          className="text-xs text-green-600 hover:text-green-800 font-medium"
                          onClick={markAllAsRead}
                        >
                          Mark all as read
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-green-600"
              >
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium">
                  {currentUser?.name?.charAt(0) || 'A'}
                </div>
                <span className="hidden md:block text-sm font-medium text-white">
                  {currentUser?.name || 'Admin User'}
                </span>
                <ChevronDown size={16} className="text-white" />
              </button>

              {/* Profile Dropdown Content */}
              <AnimatePresence mode="popLayout">
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-30 overflow-hidden"
                  >
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">{currentUser?.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{currentUser?.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/admin/profile"
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <User size={16} />
                        <span>Your Profile</span>
                      </Link>
                      <Link
                        to="/admin/security"
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <Settings size={16} />
                        <span>Settings</span>
                      </Link>
                      <Link
                        to="/"
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <Home size={16} />
                        <span>Back to Home</span>
                      </Link>
                    </div>

                    <div className="py-1 border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 w-full text-left"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Main Content Area - Use Outlet instead of rendering specific content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
