import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Package, Search, Clock, CheckCircle, XCircle, Truck
} from 'lucide-react';
import GroceryNavBar from '../../../components/grocery/GroceryNavBar';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/grocery/user/orders', { withCredentials: true })
      .then(res => {
        const mapped = res.data.orders.map(order => ({
          id:  order._id,
          date: new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          time: new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          total: order.total,
          status: order.status,
          items: order.items ? order.items.length : 0,
          deliveryAddress: order.deliveryAddress ? order.deliveryAddress.address : ''
        }));
        setOrders(mapped);
      })
      .catch(() => setOrders([]))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const StatusBadge = ({ status }) => {
    const classes = "flex items-center px-2.5 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'delivered':
        return <span className={`${classes} bg-green-100 text-green-800`}><CheckCircle size={12} className="mr-1" />Delivered</span>;
      case 'out-for-delivery':
        return <span className={`${classes} bg-blue-100 text-blue-800`}><Truck size={12} className="mr-1" />Out for Delivery</span>;
      case 'processing':
        return <span className={`${classes} bg-yellow-100 text-yellow-800`}><Clock size={12} className="mr-1" />Processing</span>;
      case 'cancelled':
        return <span className={`${classes} bg-red-100 text-red-800`}><XCircle size={12} className="mr-1" />Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 text-black min-h-screen pb-16">
      <GroceryNavBar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <div className="flex space-x-2">
            {['all', 'processing', 'delivered', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === status
                    ? {
                      all: 'bg-green-100 text-green-700',
                      processing: 'bg-yellow-100 text-yellow-700',
                      delivered: 'bg-green-100 text-green-700',
                      cancelled: 'bg-red-100 text-red-700'
                    }[status]
                    : 'bg-gray-100 text-gray-700'
                  }`}
              >
                {status[0].toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <Link
                key={order.id}
                to={`/grocery/orders/${order.id}`}
                className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">Order #{order.id}</span>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{order.date} • {order.time}</p>
                    <p className="text-sm"><span className="text-gray-500">Items:</span> {order.items}</p>
                    <p className="text-sm"><span className="text-gray-500">Delivery:</span> {order.deliveryAddress}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-lg">₹{order.total}</span>
                    <ChevronRight size={20} className="text-green-500 mt-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? "No orders match your search" : "You haven't placed any orders yet"}
            </p>
            <Link
              to="/grocery"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-10">
        <div className="flex justify-between max-w-lg mx-auto">
          <Link to="/grocery" className="flex flex-col items-center py-2 px-4 text-gray-500">
            <span className="text-2xl">🏠</span>
            <span className="text-xs font-medium mt-1">Home</span>
          </Link>
          <Link to="/grocery/categories" className="flex flex-col items-center py-2 px-4 text-gray-500">
            <span className="text-2xl">🍎</span>
            <span className="text-xs font-medium mt-1">Categories</span>
          </Link>
          <Link to="/grocery/search" className="flex flex-col items-center py-2 px-4 text-gray-500">
            <span className="text-2xl">🔍</span>
            <span className="text-xs font-medium mt-1">Search</span>
          </Link>
          <Link to="/grocery/cart" className="flex flex-col items-center py-2 px-4 text-gray-500">
            <span className="text-2xl">🛒</span>
            <span className="text-xs font-medium mt-1">Cart</span>
          </Link>
          <Link to="/grocery/orders" className="flex flex-col items-center py-2 px-4 text-green-600">
            <span className="text-2xl">📦</span>
            <span className="text-xs font-medium mt-1">Orders</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default OrdersPage;