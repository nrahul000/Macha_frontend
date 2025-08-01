import React from "react";

const OrderDetailsModal = ({ order, onClose, loading }) => {
    if (!order && !loading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Order Details</h2>
                {loading ? (
                    <div className="animate-pulse space-y-4">
                        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ) : (
                    <div className="text-gray-800">
                        <p><strong>Order ID:</strong> {order._id}</p>
                        <p><strong>Date:</strong> {order.createdAt && new Date(order.createdAt).toLocaleString()}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Restaurant:</strong> {order.restaurantName}</p>
                        <p><strong>Total:</strong> ₹{order.total}</p>
                        <div className="mt-4">
                            <strong>Items:</strong>
                            <ul className="list-disc ml-6">
                                {order.items?.map(item => (
                                    <li key={item._id}>{item.name} x {item.quantity}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-4">
                            <strong>Delivery Address:</strong>
                            <div>
                                {order.deliveryAddress?.addressLine1}, {order.deliveryAddress?.city}, {order.deliveryAddress?.state} - {order.deliveryAddress?.pincode}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderDetailsModal;