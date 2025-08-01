import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  ShoppingBag,
  Users,
  Package,
  DollarSign,
  Truck,
  ArrowUp,
  ArrowDown,
  Tag,
  RefreshCw,
  BarChart2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import * as groceryService from '../../../services/groceryService';

const GroceryDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: {
      total: 0,
      pending: 0,
      processing: 0,
      delivered: 0
    },
    revenue: 0,
    customers: 0
  });
  const [revenueData, setRevenueData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch inventory summary for product stats
      const inventorySummary = await groceryService.getInventorySummary();
      
      // Fetch sales analytics
      const salesAnalytics = await groceryService.getSalesAnalytics('30days');
      
      // Fetch top products
      const topProductsData = await groceryService.getTopProducts(5);
      
      // Fetch category breakdown
      const categorySalesData = await groceryService.getSalesByCategory();
      
      // Set data to state
      setStats({
        products: inventorySummary.totalItems || 0,
        categories: 0, // We don't have a category count endpoint yet
        orders: {
          total: salesAnalytics.summary.orders || 0,
          pending: 0, // We need to fetch this separately
          processing: 0,
          delivered: 0
        },
        revenue: salesAnalytics.summary.sales || 0,
        customers: 0 // We need a separate endpoint for this
      });
      
      setRevenueData(salesAnalytics.salesOverTime || []);
      setTopProducts(topProductsData || []);
      setCategorySales(categorySalesData || []);
      
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div>
      {/* Filters */}
      <div className="bg-white text-black rounded-xl shadow-sm mb-6 p-4">
        {/* ... existing filter code ... */}
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Grocery Operations Dashboard</h1>
        
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-700"
        >
          <RefreshCw size={16} className="mr-2" />
          <span>Refresh</span>
        </button>
      </div>
      
      {/* Summary Stats */}
      <div className="grid text-black grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Products</h3>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Package size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold">
            {loading ? (
              <span className="h-8 w-16 bg-gray-200 rounded animate-pulse inline-block"></span>
            ) : (
              stats.products
            )}
          </p>
          <div className="mt-2">
            <Link to="/admin/grocery/products" className="text-sm text-blue-600 hover:underline inline-block">
              Manage Products
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Total Orders</h3>
            <div className="p-2 rounded-lg bg-green-50 text-green-600">
              <ShoppingBag size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold">
            {loading ? (
              <span className="h-8 w-16 bg-gray-200 rounded animate-pulse inline-block"></span>
            ) : (
              stats.orders.total
            )}
          </p>
          <div className="mt-2">
            <Link to="/admin/grocery/orders" className="text-sm text-blue-600 hover:underline inline-block">
              View All Orders
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Revenue</h3>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold">
            {loading ? (
              <span className="h-8 w-16 bg-gray-200 rounded animate-pulse inline-block"></span>
            ) : (
              formatCurrency(stats.revenue)
            )}
          </p>
          <div className="mt-2">
            <Link to="/admin/grocery/analytics" className="text-sm text-blue-600 hover:underline inline-block">
              View Analytics
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Customers</h3>
            <div className="p-2 rounded-lg bg-yellow-50 text-yellow-600">
              <Users size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold">
            {loading ? (
              <span className="h-8 w-16 bg-gray-200 rounded animate-pulse inline-block"></span>
            ) : (
              stats.customers
            )}
          </p>
          <span className="text-sm text-gray-500 mt-2 block">
            Active grocery shoppers
          </span>
        </div>
      </div>
      
      {/* Quick Access Links */}
      <div className="bg-white text-black rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/admin/grocery/products/add" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Package size={24} className="text-blue-600 mb-2" />
            <span className="text-sm font-medium">Add Product</span>
          </Link>
          
          <Link to="/admin/grocery/inventory" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Tag size={24} className="text-green-600 mb-2" />
            <span className="text-sm font-medium">Manage Inventory</span>
          </Link>
          
          <Link to="/admin/grocery/orders" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Truck size={24} className="text-purple-600 mb-2" />
            <span className="text-sm font-medium">Process Orders</span>
          </Link>
          
          <Link to="/admin/grocery/analytics" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <BarChart2 size={24} className="text-yellow-600 mb-2" />
            <span className="text-sm font-medium">View Analytics</span>
          </Link>
        </div>
      </div>
      
      {/* Order Status */}
      <div className="bg-white text-black rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-6">Order Status Overview</h2>
        
        {loading ? (
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
              <h3 className="font-medium text-yellow-800 mb-1">Pending Orders</h3>
              <p className="text-3xl font-bold text-yellow-700">{stats.orders.pending}</p>
              <span className="text-sm text-yellow-600 mt-1 block">Awaiting processing</span>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-1">Processing Orders</h3>
              <p className="text-3xl font-bold text-blue-700">{stats.orders.processing}</p>
              <span className="text-sm text-blue-600 mt-1 block">Currently being prepared</span>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <h3 className="font-medium text-green-800 mb-1">Delivered Orders</h3>
              <p className="text-3xl font-bold text-green-700">{stats.orders.delivered}</p>
              <span className="text-sm text-green-600 mt-1 block">Successfully completed</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Low Stock Alert */}
      <div className="bg-white text-black rounded-xl shadow-sm p-6">
        <div className="flex items-start">
          <div className="p-2 bg-red-100 rounded-lg mr-4">
            <AlertCircle size={24} className="text-red-600" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Low Stock Alert</h3>
            <p className="text-gray-600 mb-4">
              5 products are running low on stock and need to be replenished soon.
            </p>
            <Link 
              to="/admin/grocery/inventory"
              className="inline-flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
            >
              <TrendingUp size={16} className="mr-2" />
              View Low Stock Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryDashboard;