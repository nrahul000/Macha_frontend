import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';

const LocationPicker = ({ onSelectLocation, initialLocation }) => {
  const mapContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(initialLocation || { lat: 17.3197, lng: 78.8714 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Wait for Google Maps to be available then initialize
  useEffect(() => {
    let isMounted = true;
    let checkTimer = null;
    
    const initMap = () => {
      if (!isMounted || !mapContainerRef.current || !window.google || !window.google.maps) return;
      
      try {
        setLoading(true);
        
        // Create map instance
        const mapOptions = {
          center: coordinates,
          zoom: 15,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
        };
        
        const map = new window.google.maps.Map(mapContainerRef.current, mapOptions);
        mapInstanceRef.current = map;
        
        // Create marker
        const marker = new window.google.maps.Marker({
          position: coordinates,
          map: map,
          draggable: true,
          animation: window.google.maps.Animation.DROP,
        });
        markerRef.current = marker;
        
        // Handle marker drag end to update coordinates and get address
        marker.addListener('dragend', function() {
          const newPos = marker.getPosition();
          const newLat = newPos.lat();
          const newLng = newPos.lng();
          setCoordinates({ lat: newLat, lng: newLng });
          getAddressFromCoordinates(newLat, newLng);
        });
        
        // Set up place autocomplete if searchInputRef exists
        if (searchInputRef.current && window.google.maps.places) {
          const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
            componentRestrictions: { country: ["in"] }
          });
          
          autocomplete.addListener('place_changed', function() {
            const place = autocomplete.getPlace();
            if (!place.geometry) return;
            
            // Update map and marker
            const newLat = place.geometry.location.lat();
            const newLng = place.geometry.location.lng();
            
            map.setCenter({ lat: newLat, lng: newLng });
            marker.setPosition({ lat: newLat, lng: newLng });
            
            // Update component state
            setCoordinates({ lat: newLat, lng: newLng });
            setAddress(place.formatted_address || '');
          });
        }
        
        // If there's an initial location, reverse geocode to get address
        if (initialLocation && initialLocation.lat && initialLocation.lng) {
          getAddressFromCoordinates(initialLocation.lat, initialLocation.lng);
        }
      } catch (error) {
        console.error('Error initializing map:', error);
        setError('Failed to load map. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };
    
    // If Google Maps is already loaded, initialize map immediately
    if (window.google && window.google.maps) {
      initMap();
    } else {
      // Otherwise, periodically check for Maps API to become available
      checkTimer = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkTimer);
          initMap();
        }
      }, 100);
    }
    
    return () => {
      isMounted = false;
      if (checkTimer) clearInterval(checkTimer);
    };
  }, [initialLocation]);
  
  // Get address from coordinates using reverse geocoding
  const getAddressFromCoordinates = (lat, lng) => {
    if (!window.google || !window.google.maps) return;
    
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setAddress(results[0].formatted_address || '');
      } else {
        console.error('Geocoder failed:', status);
        setAddress('Address not found');
      }
    });
  };
  
  // Handle click event for GPS button
  const handleGPSClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          // Update map, marker, and state
          if (mapInstanceRef.current && markerRef.current) {
            mapInstanceRef.current.setCenter({ lat: userLat, lng: userLng });
            markerRef.current.setPosition({ lat: userLat, lng: userLng });
            setCoordinates({ lat: userLat, lng: userLng });
            getAddressFromCoordinates(userLat, userLng);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location. Please check your browser permissions.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };
  
  // Handle select location confirmation
  const handleConfirmLocation = () => {
    if (!address) {
      alert('Please select a location first');
      return;
    }
    
    onSelectLocation(address, coordinates.lat, coordinates.lng);
  };
  
  return (
    <div className="location-picker flex flex-col h-full">
      {/* Search bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for a location"
              className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onClick={handleGPSClick} 
            className="ml-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            title="Use my current location"
          >
            <Navigation size={18} />
          </button>
        </div>
        
        {error && (
          <div className="mt-2 text-red-500 text-sm">{error}</div>
        )}
      </div>
      
      {/* Map container */}
      <div className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-60 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}
        <div ref={mapContainerRef} className="w-full h-full min-h-[400px]"></div>
        
        {/* Instructions */}
        <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <div className="text-sm text-gray-600 flex items-start gap-2 mb-2">
            <MapPin size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
            <span>Drag the pin to set your exact location, or use the search bar above.</span>
          </div>
          <button 
            onClick={handleConfirmLocation}
            className="w-full py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            Confirm This Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
