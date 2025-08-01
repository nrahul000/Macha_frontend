import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Cell
} from 'recharts';
import {
  ArrowDown, ArrowUp, DollarSign, ShoppingCart,
  Users, Package, Calendar, Download, TrendingUp,
  Filter, RefreshCw
} from 'lucide-react';

const GroceryAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7days'); // 7days, 30days, 90days
  const [compareMode, setCompareMode] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    summary: {},
    salesOverTime: [],
    productPerformance: [],
    categoryBreakdown: [],
    ordersByTime: []
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  const fetchAnalyticsData = () => {
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Generate mock data based on date range
      const data = generateMockData(dateRange);
      setAnalyticsData(data);
      setLoading(false);
    }, 1000);
  };

  const generateMockData = (range) => {
    // Summary metrics
    const salesValues = {
      '7days': 42500,
      '30days': 186750,
      '90days': 564300
    };

    const ordersValues = {
      '7days': 186,
      '30days': 754,
      '90days': 2235
    };

    const customersValues = {
      '7days': 142,
      '30days': 532,
      '30days_new': 178,
      '90days': 1560,
      '90days_new': 520
    };

    const previousValues = {
      '7days': 38200,
      '30days': 175400,
      '90days': 542800
    };

    // Sales Over Time
    const days = range === '7days' ? 7 : range === '30days' ? 30 : 90;
    const salesOverTime = Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));

      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        sales: Math.floor(Math.random() * 15000) + 5000,
        orders: Math.floor(Math.random() * 50) + 10,
      };
    });

    // Product Performance
    const productPerformance = [
      { name: 'Organic Bananas', sales: 8500, orders: 420 },
      { name: 'Whole Milk', sales: 7200, orders: 385 },
      { name: 'Brown Eggs', sales: 6300, orders: 310 },
      { name: 'Wheat Bread', sales: 5900, orders: 290 },
      { name: 'Tomatoes', sales: 4800, orders: 240 },
      { name: 'Chicken Breast', sales: 4600, orders: 210 },
      { name: 'Rice (5kg)', sales: 4100, orders: 180 },
      { name: 'Onions', sales: 3700, orders: 220 },
    ];

    // Category Breakdown
    const categoryBreakdown = [
      { name: 'Fruits & Vegetables', value: 28 },
      { name: 'Dairy & Eggs', value: 22 },
      { name: 'Meat & Seafood', value: 18 },
      { name: 'Bakery', value: 12 },
      { name: 'Groceries', value: 10 },
      { name: 'Beverages', value: 10 },
    ];

    // Orders By Time
    const ordersByTime = [
      { time: '6AM-9AM', orders: 35 },
      { time: '9AM-12PM', orders: 85 },
      { time: '12PM-3PM', orders: 120 },
      { time: '3PM-6PM', orders: 140 },
      { time: '6PM-9PM', orders: 95 },
      { time: '9PM-12AM', orders: 65 },
    ];

    return {
      summary: {
        sales: salesValues[range],
        salesChange: ((salesValues[range] - previousValues[range]) / previousValues[range] * 100).toFixed(1),
        orders: ordersValues[range],
        ordersChange: 12.5,
        customers: customersValues[range],
        newCustomers: customersValues[`${range}_new`] || Math.floor(customersValues[range] * 0.3),
        averageOrderValue: (salesValues[range] / ordersValues[range]).toFixed(0),
        aovChange: 5.2
      },
      salesOverTime,
      productPerformance,
      categoryBreakdown,
      ordersByTime
    };
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm mb-6 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
            </div>

            <button
              onClick={fetchAnalyticsData}
              className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
            >
              <RefreshCw size={18} className="mr-2" />
              <span>Refresh</span>
            </button>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="compareMode"
                checked={compareMode}
                onChange={() => setCompareMode(!compareMode)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="compareMode" className="ml-2 text-sm text-gray-700">
                Compare with previous period
              </label>
            </div>
          </div>

          <button
            className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
            onClick={() => alert('Downloading report...')}
          >
            <Download size={18} className="mr-2" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Revenue */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">{formatCurrency(analyticsData.summary.sales)}</h3>
                  <div className={`flex items-center mt-1 ${parseFloat(analyticsData.summary.salesChange) >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                    }`}>
                    {parseFloat(analyticsData.summary.salesChange) >= 0 ? (
                      <ArrowUp size={16} className="mr-1" />
                    ) : (
                      <ArrowDown size={16} className="mr-1" />
                    )}
                    <span className="text-sm font-medium">{Math.abs(analyticsData.summary.salesChange)}% from previous period</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Orders */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                  <h3 className="text-2xl font-bold mt-1">{analyticsData.summary.orders}</h3>
                  <div className={`flex items-center mt-1 ${analyticsData.summary.ordersChange >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                    }`}>
                    {analyticsData.summary.ordersChange >= 0 ? (
                      <ArrowUp size={16} className="mr-1" />
                    ) : (
                      <ArrowDown size={16} className="mr-1" />
                    )}
                    <span className="text-sm font-medium">{analyticsData.summary.ordersChange}% from previous period</span>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            {/* Customers */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Customers</p>
                  <h3 className="text-2xl font-bold mt-1">{analyticsData.summary.customers}</h3>
                  <div className="text-gray-600 mt-1">
                    <span className="text-sm">{analyticsData.summary.newCustomers} new customers</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Average Order Value */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Avg. Order Value</p>
                  <h3 className="text-2xl font-bold mt-1">{formatCurrency(analyticsData.summary.averageOrderValue)}</h3>
                  <div className={`flex items-center mt-1 ${analyticsData.summary.aovChange >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                    }`}>
                    {analyticsData.summary.aovChange >= 0 ? (
                      <ArrowUp size={16} className="mr-1" />
                    ) : (
                      <ArrowDown size={16} className="mr-1" />
                    )}
                    <span className="text-sm font-medium">{analyticsData.summary.aovChange}% from previous period</span>
                  </div>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Sales Over Time */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Sales Over Time</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={analyticsData.salesOverTime}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis
                      tickFormatter={(value) => `₹${value / 1000}k`}
                    />
                    <Tooltip
                      formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']}
                    />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Sales by Category</h2>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {analyticsData.categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Product Performance */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Top Products by Revenue</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyticsData.productPerformance.slice(0, 6)}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `₹${value / 1000}k`} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']} />
                    <Bar dataKey="sales" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Orders by Time */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Orders by Time of Day</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={analyticsData.ordersByTime}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Product Performance Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Product Performance</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg. Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analyticsData.productPerformance.map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {product.orders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(product.sales)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(product.sales / product.orders)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GroceryAnalytics;