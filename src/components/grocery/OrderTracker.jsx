import React from 'react';
import { Check, Clock, AlertCircle, MapPin, Phone } from 'lucide-react';

const OrderTracker = ({ steps, status, deliveryPerson, deliveryTime, isLive = false }) => {
  // Determine the current active step
  const getCurrentStepIndex = () => {
    if (status === 'cancelled') {
      return steps.findIndex(step => step.label.toLowerCase() === 'cancelled');
    }
    
    const lastCompletedIndex = steps.findIndex(step => !step.completed);
    return lastCompletedIndex === -1 ? steps.length - 1 : lastCompletedIndex - 1;
  };

  const currentStepIndex = getCurrentStepIndex();

  // Render the appropriate tracking view based on order status
  const renderTrackingView = () => {
    if (status === 'cancelled') {
      return (
        <div className="flex items-start bg-red-50 p-3 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red-700 font-medium">Order Cancelled</p>
            {steps.find(step => step.label.toLowerCase() === 'cancelled')?.reason && (
              <p className="text-xs text-red-600 mt-1">
                {steps.find(step => step.label.toLowerCase() === 'cancelled').reason}
              </p>
            )}
          </div>
        </div>
      );
    }

    if (isLive && status === 'out-for-delivery') {
      return (
        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 text-yellow-700 mr-2" />
            <h3 className="font-medium text-yellow-800">Delivery in Progress</h3>
          </div>
          {deliveryTime && (
            <p className="text-sm text-yellow-700">Estimated arrival in {deliveryTime}</p>
          )}
          
          {/* Delivery Person Details */}
          {deliveryPerson && (
            <div className="border border-yellow-200 bg-white rounded-lg p-3 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img 
                      src={deliveryPerson.photo} 
                      alt={deliveryPerson.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{deliveryPerson.name}</h3>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-600">Delivery Agent</span>
                    </div>
                  </div>
                </div>
                <a 
                  href={`tel:${deliveryPerson.phone}`}
                  className="bg-green-500 text-white p-2 rounded-full"
                >
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full">
      {renderTrackingView()}
      
      <div className="mt-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start mb-3 last:mb-0">
            <div className="mr-3 relative">
              <div 
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center
                  ${step.completed ? 'bg-green-500' : index === currentStepIndex + 1 ? 'bg-yellow-500' : 'bg-gray-300'}
                `}
              >
                {step.completed ? (
                  <Check className="h-4 w-4 text-white" />
                ) : index === currentStepIndex + 1 ? (
                  <Clock className="h-4 w-4 text-white" />
                ) : null}
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  absolute top-6 bottom-0 left-1/2 w-0.5 transform -translate-x-1/2 h-8
                  ${index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'}
                `}></div>
              )}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${index <= currentStepIndex ? 'text-gray-800' : 'text-gray-500'}`}>
                {step.label}
              </p>
              <p className={`text-xs ${index <= currentStepIndex ? 'text-gray-600' : 'text-gray-400'}`}>
                {step.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery address if provided */}
      {status === 'out-for-delivery' && (
        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Delivery Address</p>
              <p className="text-xs text-gray-600 mt-1">123 Main Street, Apartment 4B, Hyderabad, Telangana - 500001</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracker;
