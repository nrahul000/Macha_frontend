import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ChevronUp, ChevronDown, Download, MessageSquare, PackageCheck, MapPin, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullItemsList, setShowFullItemsList] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`/api/grocery/orders/${id}`, { withCredentials: true })
      .then(res => {
        const order = res.data;
        setOrderDetails({
          id: order.orderNumber || order._id,
          date: new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          status: order.status,
          items: order.items?.map(item => ({
            id: item.productId?._id || item.productId || item._id,
            name: item.name,
            price: item.price,
            image:
              (item.productId && item.productId.images && item.productId.images[0])
                ? item.productId.images[0]
                : (item.image || ''),
            unit: item.unit || '',
            quantity: item.quantity
          })) || [],
          subtotal: order.subtotal || order.total || 0,
          discount: order.discount || 0,
          deliveryFee: order.deliveryFee || 0,
          total: order.total || 0,
          deliveryAddress: {
            name: order.deliveryAddress?.name || '',
            phone: order.deliveryAddress?.phone || '',
            address: order.deliveryAddress?.address || '',
            city: order.deliveryAddress?.city || '',
            state: order.deliveryAddress?.state || '',
            pincode: order.deliveryAddress?.pincode || ''
          },
          paymentMethod: order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod,
          trackingSteps: order.trackingSteps || [
            { label: 'Order Placed', completed: true, timestamp: new Date(order.createdAt).toLocaleString('en-IN') },
            { label: 'Order Confirmed', completed: true, timestamp: '' },
            { label: 'Processing', completed: order.status === 'processing' || order.status === 'out-for-delivery' || order.status === 'delivered', timestamp: '' },
            { label: 'Out for Delivery', completed: order.status === 'out-for-delivery' || order.status === 'delivered', timestamp: '' },
            { label: 'Delivered', completed: order.status === 'delivered', timestamp: '' }
          ]
        });
      })
      .catch(() => setOrderDetails(null))
      .finally(() => setIsLoading(false));
  }, [id]);

  const renderTrackingView = () => {
    const trackingSteps = orderDetails.trackingSteps;
    return (
      <div className="bg-white p-4 text-black rounded-lg shadow-sm mb-4">
        <h2 className="font-semibold mb-3">Order Status</h2>
        <div>
          {trackingSteps.map((step, index) => (
            <div key={index} className="flex items-start mb-3 last:mb-0">
              <div className="mr-3 relative">
                <div className={`w-6 h-6 rounded-full ${step.completed ? 'bg-green-500' : 'bg-gray-300'} flex items-center justify-center`}>
                  {step.completed && <Check className="h-4 w-4 text-white" />}
                </div>
                {index < trackingSteps.length - 1 && (
                  <div className="absolute top-6 bottom-0 left-1/2 w-px bg-gray-200 -translate-x-1/2 h-6"></div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{step.label}</p>
                <p className="text-xs text-gray-500">{step.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex text-black justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="bg-gray-50 min-h-screen p-4 flex flex-col items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center max-w-md">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the order you're looking for. It may have been removed or the ID is incorrect.
          </p>
          <Link
            to="/grocery/orders"
            className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium rounded-lg"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-black min-h-screen pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate('/grocery/orders')} className="flex items-center">
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold">Order Details</h1>
            <div className="w-6"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold">Order #{orderDetails.id}</h2>
              <p className="text-sm text-gray-500">{orderDetails.date}</p>
            </div>
            {orderDetails.status === 'delivered' && (
              <button className="text-sm flex items-center text-green-600">
                <Download className="h-4 w-4 mr-1" />
                Invoice
              </button>
            )}
          </div>
        </div>

        {renderTrackingView()}

        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <h2 className="font-semibold mb-3">Order Items</h2>
          <div className="space-y-3">
            {orderDetails.items.slice(0, showFullItemsList ? orderDetails.items.length : 3).map((item, index) => (
              <div key={index} className="flex justify-between pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex items-center">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-12 w-12 object-cover rounded mr-3" />
                  ) : (
                    <div className="h-12 w-12 bg-gray-100 rounded mr-3" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.unit} x {item.quantity}</p>
                  </div>
                </div>
                <span className="text-sm">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            {orderDetails.items.length > 3 && (
              <button
                onClick={() => setShowFullItemsList(!showFullItemsList)}
                className="text-sm text-green-600 flex items-center mt-1"
              >
                {showFullItemsList ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" /> Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" /> {orderDetails.items.length - 3} more items
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <h2 className="font-semibold mb-3">Payment Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Item Total</span>
              <span>₹{orderDetails.subtotal.toFixed(2)}</span>
            </div>
            {orderDetails.discount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-600">-₹{orderDetails.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              {orderDetails.deliveryFee > 0 ? (
                <span>₹{orderDetails.deliveryFee.toFixed(2)}</span>
              ) : (
                <span className="text-green-600">Free</span>
              )}
            </div>
            <div className="border-t border-gray-100 pt-2 mt-2 font-medium flex justify-between">
              <span>Total Amount</span>
              <span>₹{orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-sm text-gray-700 mt-3">
            Payment Method: <span className="font-medium">{orderDetails.paymentMethod}</span>
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <h2 className="font-semibold mb-3">Delivery Address</h2>
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">{orderDetails.deliveryAddress.name}</p>
              <p className="text-sm text-gray-500">{orderDetails.deliveryAddress.phone}</p>
              <p className="text-sm text-gray-600 mt-1">
                {orderDetails.deliveryAddress.address}
                {orderDetails.deliveryAddress.city && `, ${orderDetails.deliveryAddress.city}`}
                {orderDetails.deliveryAddress.state && `, ${orderDetails.deliveryAddress.state}`}
                {orderDetails.deliveryAddress.pincode && ` - ${orderDetails.deliveryAddress.pincode}`}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-3">Need Help?</h2>
          <div className="space-y-3">
            <Link to="/grocery/help" className="flex items-center text-sm text-gray-700 p-2 border border-gray-200 rounded-lg">
              <MessageSquare className="h-5 w-5 text-gray-500 mr-3" />
              <span>Contact Support</span>
            </Link>
            {orderDetails.status === 'delivered' && (
              <button className="flex items-center w-full text-sm text-gray-700 p-2 border border-gray-200 rounded-lg">
                <PackageCheck className="h-5 w-5 text-gray-500 mr-3" />
                <span>Return or Exchange</span>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetailsPage;