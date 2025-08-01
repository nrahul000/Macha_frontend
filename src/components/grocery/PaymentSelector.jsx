import React, { useEffect } from 'react';
import { CreditCard, Check, AlertCircle, Smartphone, Wallet, Landmark, Shield } from 'lucide-react';

// Mock payment methods
const paymentMethods = [
  { 
    id: 'upi',
    name: 'UPI',
    icon: <Smartphone size={20} className="text-purple-500" />,
    description: 'Pay using Google Pay, PhonePe, or other UPI apps',
    popular: true
  },
  { 
    id: 'card',
    name: 'Credit/Debit Card',
    icon: <CreditCard size={20} className="text-blue-500" />,
    description: 'Pay with Visa, Mastercard, American Express, or RuPay'
  },
  { 
    id: 'wallet',
    name: 'Online Wallet',
    icon: <Wallet size={20} className="text-orange-500" />,
    description: 'Pay via Paytm, Amazon Pay, or other digital wallets'
  },
  { 
    id: 'netbanking',
    name: 'Net Banking',
    icon: <Landmark size={20} className="text-green-500" />,
    description: 'Pay directly from your bank account'
  },
  { 
    id: 'cod',
    name: 'Cash on Delivery',
    icon: <Wallet size={20} className="text-gray-500" />,
    description: 'Pay with cash at the time of delivery'
  }
];

const PaymentSelector = ({ onSelectPayment, selectedPaymentId = null }) => {
  // Set default payment method if none selected
  useEffect(() => {
    if (!selectedPaymentId && paymentMethods.length > 0) {
      const defaultPayment = paymentMethods.find(method => method.popular) || paymentMethods[0];
      onSelectPayment(defaultPayment);
    }
  }, [selectedPaymentId, onSelectPayment]);
  
  const handlePaymentSelect = (payment) => {
    onSelectPayment(payment);
  };
  
  return (
    <div>
      <div className="space-y-3">
        {paymentMethods.map(payment => (
          <div 
            key={payment.id}
            onClick={() => handlePaymentSelect(payment)}
            className={`
              border rounded-lg p-3 cursor-pointer transition-all
              ${selectedPaymentId === payment.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3">
                  {payment.icon}
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{payment.name}</h3>
                    {payment.popular && (
                      <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{payment.description}</p>
                </div>
              </div>
              {selectedPaymentId === payment.id && (
                <Check size={20} className="text-green-500" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center mt-4 p-3 bg-blue-50 rounded-lg">
        <Shield size={18} className="text-blue-600 flex-shrink-0" />
        <p className="text-xs text-blue-700 ml-2">
          All payment information is encrypted and securely processed. We never store your card details.
        </p>
      </div>
      
      {selectedPaymentId === 'card' && (
        <div className="mt-4 space-y-4 border-t pt-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Cardholder Name</label>
            <input
              type="text"
              placeholder="Name on card"
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
      )}
      
      {selectedPaymentId === 'upi' && (
        <div className="mt-4 space-y-4 border-t pt-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">UPI ID</label>
            <input
              type="text"
              placeholder="username@upi"
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Enter your UPI ID linked with your bank account</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSelector;
