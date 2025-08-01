import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ShoppingBag, ArrowRight, ChevronRight } from 'lucide-react';
import GroceryNavBar from '../../../components/grocery/GroceryNavBar';

const GroceryOrderConfirmation = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen text-black bg-gray-50">
      <GroceryNavBar />
      
      <div className="container mx-auto px-4 py-8 pt-28">
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Successfully Placed!</h1>
            <p className="text-gray-600 mb-6">
              Your order has been placed and is being processed. We'll send you updates on your order status.
            </p>
            
            <div className="border border-gray-200 rounded-lg p-6 mb-6 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-700">Order Number</h3>
                <span className="font-semibold">{orderNumber}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-700">Estimated Delivery</h3>
                <span className="font-semibold">Today, 4:30 PM - 6:30 PM</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/grocery/orders"
                className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                <ShoppingBag size={18} className="mr-2" />
                View All Orders
              </Link>
              
              <Link 
                to="/grocery"
                className="inline-flex items-center justify-center px-5 py-3 bg-green-600 rounded-lg text-white font-medium hover:bg-green-700 transition-colors"
              >
                Continue Shopping
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-lg mb-4">What happens next?</h2>
            
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-semibold text-green-600">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Order Preparation</h3>
                  <p className="text-gray-600 text-sm">Your order is being prepared by our team</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-semibold text-green-600">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Quality Check</h3>
                  <p className="text-gray-600 text-sm">We verify the quality of your items</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-semibold text-green-600">3</span>
                </div>
                <div>
                  <h3 className="font-medium">On its way</h3>
                  <p className="text-gray-600 text-sm">Your order will be out for delivery</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-semibold text-green-600">4</span>
                </div>
                <div>
                  <h3 className="font-medium">Delivered</h3>
                  <p className="text-gray-600 text-sm">Your order will be delivered to your doorstep</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link to="/grocery/orders" className="inline-flex items-center text-green-600 font-medium">
                Track Order Status
                <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GroceryOrderConfirmation;
