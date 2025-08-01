import React, { useState } from 'react';
import { MapPin, Plus, User, Phone, Check } from 'lucide-react';

// Mock saved addresses
const mockAddresses = [
  {
    id: 1,
    type: 'Home',
    name: 'John Doe',
    phone: '+91 98765 43210',
    address: '123 Main Street, Apartment 4B',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500001',
    isDefault: true
  },
  {
    id: 2,
    type: 'Work',
    name: 'John Doe',
    phone: '+91 98765 43210',
    address: '45 Tech Park, Building C, Floor 3',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500081',
    isDefault: false
  },
  {
    id: 3,
    type: 'Other',
    name: 'John Doe',
    phone: '+91 98765 43210',
    address: '78 Lake View Apartments, Phase 2',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500087',
    isDefault: false
  }
];

const AddressSelector = ({ onSelectAddress, selectedAddressId }) => {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });
  
  // Auto-select default address on component load
  React.useEffect(() => {
    if (!selectedAddressId && addresses.length > 0) {
      const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
      onSelectAddress(defaultAddress);
    }
  }, [addresses, selectedAddressId, onSelectAddress]);
  
  const handleAddressSelect = (address) => {
    onSelectAddress(address);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };
  
  const toggleDefaultAddress = () => {
    setNewAddress(prev => ({ ...prev, isDefault: !prev.isDefault }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const addressToAdd = {
      ...newAddress,
      id: addresses.length + 1
    };
    
    // If this address is set as default, update other addresses
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addressToAdd.isDefault ? false : addr.isDefault
    }));
    
    // Add the new address
    const newAddresses = [...updatedAddresses, addressToAdd];
    setAddresses(newAddresses);
    
    // Select the new address
    onSelectAddress(addressToAdd);
    
    // Reset form and close it
    setNewAddress({
      type: 'Home',
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    });
    setIsAdding(false);
  };
  
  return (
    <div>
      {/* List of saved addresses */}
      {addresses.length > 0 && (
        <div className="space-y-3 mb-4">
          {addresses.map(address => (
            <div 
              key={address.id}
              onClick={() => handleAddressSelect(address)}
              className={`
                border rounded-lg p-3 cursor-pointer
                ${selectedAddressId === address.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <span className="bg-gray-100 text-gray-700 text-xs rounded px-2 py-1">
                    {address.type}
                  </span>
                  {address.isDefault && (
                    <span className="ml-2 bg-green-100 text-green-700 text-xs rounded px-2 py-1">
                      Default
                    </span>
                  )}
                </div>
                {selectedAddressId === address.id && (
                  <Check size={18} className="text-green-500" />
                )}
              </div>
              <div className="flex items-center mt-2">
                <User size={14} className="text-gray-500 mr-1.5" />
                <span className="text-sm">{address.name}</span>
              </div>
              <div className="flex items-center mt-1">
                <Phone size={14} className="text-gray-500 mr-1.5" />
                <span className="text-sm">{address.phone}</span>
              </div>
              <div className="flex items-start mt-2">
                <MapPin size={14} className="text-gray-500 mr-1.5 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  {address.address}, {address.city}, {address.state} - {address.pincode}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Add new address button/form */}
      {!isAdding ? (
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center justify-center w-full py-2.5 border border-dashed border-gray-300 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add New Address
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Add New Address</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={newAddress.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={newAddress.phone}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Address Type</label>
              <div className="flex space-x-2">
                {['Home', 'Work', 'Other'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setNewAddress(prev => ({ ...prev, type }))}
                    className={`px-3 py-1 rounded text-sm ${
                      newAddress.type === type 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Address</label>
              <textarea
                name="address"
                value={newAddress.address}
                onChange={handleInputChange}
                required
                rows={2}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-1">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={newAddress.pincode}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="state"
                value={newAddress.state}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            
            <div className="md:col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={newAddress.isDefault}
                  onChange={toggleDefaultAddress}
                  className="w-4 h-4 text-green-500 focus:ring-green-500"
                />
                <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                  Set as default address
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Save Address
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddressSelector;
