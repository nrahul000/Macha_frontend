import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, Circle, CheckCircle2, Clock, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceAreaMap = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [circle, setCircle] = useState(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const navigate = useNavigate();

  // Choutuppal coordinates (center)
  const centerLocation = { lat: 17.3197, lng: 78.8714 };

  // Service areas with details
  const serviceAreas = [
    {
      id: 1,
      name: 'Choutuppal',
      isMainCenter: true,
      description: 'Our headquarters and main service center with full service offerings and 24/7 support.',
      deliveryTime: '15-30 mins',
      coverage: 'Complete',
      coordinates: { lat: 17.3197, lng: 78.8714 },
    },
    {
      id: 2,
      name: 'Pedda Konduru',
      isMainCenter: false,
      description: 'Full coverage area with quick service response times.',
      deliveryTime: '30-45 mins',
      coverage: 'Complete',
      coordinates: { lat: 17.3439, lng: 78.8163 },
    },
    {
      id: 4,
      name: 'Panthangi',
      isMainCenter: false,
      description: 'All services available with scheduled delivery options.',
      deliveryTime: '45-60 mins',
      coverage: 'Scheduled',
      coordinates: { lat: 17.2624, lng: 78.9609 },
    },
    {
      id: 5,
      name: 'Mallapuram',
      isMainCenter: false,
      description: 'Essential services with standard delivery times.',
      deliveryTime: '45-60 mins',
      coverage: 'Essential',
      coordinates: { lat: 17.2379, lng: 78.7956 },
    },
    {
      id: 6,
      name: 'Yadagirigutta',
      isMainCenter: false,
      description: 'Food and grocery delivery with extended service hours.',
      deliveryTime: '60-75 mins',
      coverage: 'Limited',
      coordinates: { lat: 17.3935, lng: 78.9121 },
    },
    {
      id: 7,
      name: 'Ramojipalle',
      isMainCenter: false,
      description: 'Select services available with advance booking.',
      deliveryTime: '60-90 mins',
      coverage: 'Limited',
      coordinates: { lat: 17.2546, lng: 78.9997 },
    },
    {
      id: 8,
      name: 'Pochampally',
      isMainCenter: false,
      description: 'Scheduled services with specific delivery windows.',
      deliveryTime: '75-90 mins',
      coverage: 'Scheduled',
      coordinates: { lat: 17.4067, lng: 78.8155 },
    }
  ];

  // Function to calculate if a location is within 15km of Choutuppal
  const isWithinServiceRadius = (location) => {
    const R = 6371; // Earth's radius in km
    const lat1 = centerLocation.lat * Math.PI / 180;
    const lat2 = location.lat * Math.PI / 180;
    const deltaLat = (location.lat - centerLocation.lat) * Math.PI / 180;
    const deltaLng = (location.lng - centerLocation.lng) * Math.PI / 180;

    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance <= 15;
  };

  const getCoverageColor = (coverage) => {
    switch (coverage) {
      case 'Complete': return 'text-green-600';
      case 'Essential': return 'text-amber-500';
      case 'Limited': return 'text-orange-500';
      case 'Scheduled': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getCoverageIcon = (coverage) => {
    switch (coverage) {
      case 'Complete': return <CheckCircle2 size={16} className="text-green-600" />;
      case 'Essential': return <CheckCircle2 size={16} className="text-amber-500" />;
      case 'Limited': return <Circle size={16} className="text-orange-500" />;
      case 'Scheduled': return <Clock size={16} className="text-blue-500" />;
      default: return null;
    }
  };

  const getMarkerIconForArea = (area) => {
    if (area.isMainCenter) {
      return {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: "#17612A",
        fillOpacity: 1,
        scale: 10,
        strokeColor: "#ffffff",
        strokeWeight: 2,
      };
    }

    // Color based on coverage level
    let color;
    switch (area.coverage) {
      case 'Complete': color = "#10B981"; break; // green
      case 'Essential': color = "#F59E0B"; break; // amber
      case 'Limited': color = "#F97316"; break; // orange
      case 'Scheduled': color = "#3B82F6"; break; // blue
      default: color = "#6B7280"; break; // gray
    }

    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 0.7,
      scale: 7,
      strokeColor: "#ffffff",
      strokeWeight: 1.5,
    };
  };

  // Initialize Google Maps
  useEffect(() => {
    let googleMapScript;
    
    // Function to load Google Maps script
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        initMap();
        return;
      }
      
      // Skip if script is already being loaded
      if (document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
        // Add event listener for when maps API is loaded
        window.initGoogleMap = initMap;
        return;
      }
      
      // Load the script
      const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      if (!GOOGLE_MAPS_API_KEY) {
        console.error('Google Maps API key is missing');
        return;
      }
      
      googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&loading=async&callback=initGoogleMap`;
      googleMapScript.async = true;
      googleMapScript.defer = true;
      
      window.initGoogleMap = initMap;
      document.head.appendChild(googleMapScript);
    };
    
    // Function to initialize the map
    const initMap = () => {
      if (!mapRef.current) return;
      
      try {
        // Create the map instance
        const mapOptions = {
          center: centerLocation,
          zoom: 11,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          zoomControl: true,
          fullscreenControl: true,
          styles: [
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [{ "visibility": "off" }]
            },
            {
              "featureType": "poi",
              "stylers": [{ "visibility": "off" }]
            },
            {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [{ "visibility": "off" }]
            },
            {
              "featureType": "transit",
              "stylers": [{ "visibility": "off" }]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [{ "color": "#d1e6ff" }]
            }
          ]
        };
        
        const mapInstance = new window.google.maps.Map(mapRef.current, mapOptions);
        setMap(mapInstance);
        
        // Draw 15km radius circle around Choutuppal
        const radiusCircle = new window.google.maps.Circle({
          center: centerLocation,
          radius: 15000, // 15km in meters
          strokeColor: '#17612A',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#17612A',
          fillOpacity: 0.1,
          map: mapInstance
        });
        
        setCircle(radiusCircle);
        
        // Add markers for all service areas
        serviceAreas.forEach((area) => {
          const isWithinRadius = isWithinServiceRadius(area.coordinates);
          
          // Create marker with custom icon
          const marker = new window.google.maps.Marker({
            position: area.coordinates,
            map: mapInstance,
            title: area.name,
            icon: getMarkerIconForArea(area),
            animation: window.google.maps.Animation.DROP,
            zIndex: area.isMainCenter ? 100 : (isWithinRadius ? 10 : 1)
          });
          
          // Create info window
          const infoContent = `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="font-weight: bold; margin-bottom: 5px;">${area.name}</h3>
              <p style="font-size: 12px; margin-bottom: 5px;">${area.description}</p>
              <div style="display: flex; align-items: center; font-size: 11px; margin-top: 5px;">
                <span style="font-weight: 500; margin-right: 5px;">Delivery: </span> 
                <span>${area.deliveryTime}</span>
              </div>
            </div>
          `;
          
          const infoWindow = new window.google.maps.InfoWindow({
            content: infoContent
          });
          
          // Add click listener to marker
          marker.addListener('click', () => {
            // Close any open info windows
            markersRef.current.forEach(m => {
              if (m.infoWindow) m.infoWindow.close();
            });
            
            // Open this info window and set selected area
            infoWindow.open(mapInstance, marker);
            setSelectedArea(area);
          });
          
          // Store marker and its info window in the ref
          markersRef.current.push({ marker, infoWindow });
        });
        
        // Set initial selected area
        setSelectedArea(serviceAreas[0]);
        
        // Mark map as loaded
        setIsMapLoaded(true);
        
      } catch (error) {
        console.error("Error initializing Google Maps:", error);
      }
    };
    
    loadGoogleMapsScript();
    
    // Cleanup function
    return () => {
      markersRef.current.forEach(({ marker }) => {
        if (marker) {
          window.google?.maps?.event.clearInstanceListeners(marker);
          marker.setMap(null);
        }
      });
      markersRef.current = [];
      
      if (circle) {
        circle.setMap(null);
      }
    };
  }, []);

  // Function to fly to a location when an area is selected
  useEffect(() => {
    if (selectedArea && map) {
      map.panTo(selectedArea.coordinates);
      map.setZoom(13);
      
      // Close all info windows, find the marker for this area and open its info window
      const markerObj = markersRef.current.find(m => 
        m.marker.getPosition().lat() === selectedArea.coordinates.lat && 
        m.marker.getPosition().lng() === selectedArea.coordinates.lng
      );
      
      if (markerObj) {
        // Close all info windows
        markersRef.current.forEach(m => {
          if (m.infoWindow) m.infoWindow.close();
        });
        
        // Open this marker's info window
        markerObj.infoWindow.open(map, markerObj.marker);
        markerObj.marker.setAnimation(window.google?.maps?.Animation.BOUNCE);
        
        // Stop animation after 1.5 seconds
        setTimeout(() => {
          if (markerObj.marker) {
            markerObj.marker.setAnimation(null);
          }
        }, 1500);
      }
    }
  }, [selectedArea, map]);

  return (
    <section id="service-area" className="section-padding relative overflow-hidden">
      {/* Soft light background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#17612A]/20 opacity-40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#17612A]/10 opacity-30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-1/2 w-[300px] h-[300px] bg-[#17612A]/10 opacity-20 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fbff] to-white"></div>
      </div>
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-gradient-to-r from-[#17612A]/10 to-black/10 p-1 rounded-full mb-5">
            <span className="px-5 py-2 rounded-full bg-white text-[#17612A] text-sm font-medium inline-block">AREA COVERAGE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">
            Our Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#17612A] to-black">Locations</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#17612A] to-black mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We provide services throughout Choutuppal and nearby areas within a 15km radius. Check if we're available in your location.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-[#eaf0ff] rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="relative w-full h-[500px]">
                {!isMapLoaded ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#f8fbff]">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Loader size={40} className="animate-spin text-[#17612A]" />
                      <p className="text-sm text-slate-600">Loading interactive map...</p>
                    </div>
                  </div>
                ) : null}
                <div ref={mapRef} className="w-full h-full"></div>
              </div>

              {/* Selected Area Detail Card */}
              {selectedArea && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 border-t border-[#eaf0ff]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-[#17612A]" />
                        <h3 className="font-medium text-slate-800 text-lg">{selectedArea.name}</h3>
                        {selectedArea.isMainCenter && (
                          <span className="text-xs bg-[#17612A]/10 text-[#17612A] px-2 py-0.5 rounded-full border border-[#17612A]/20">
                            Main Center
                          </span>
                        )}
                        {isWithinServiceRadius(selectedArea.coordinates) && !selectedArea.isMainCenter && (
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full border border-green-200">
                            Within Service Radius
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mt-2 ml-6">{selectedArea.description}</p>

                      <div className="mt-3 ml-6 flex items-center flex-wrap gap-x-4 gap-y-2">
                        <div className="flex items-center gap-1">
                          <Navigation size={14} className="text-slate-400" />
                          <span className="text-xs text-slate-600">Delivery time: <span className="font-medium">{selectedArea.deliveryTime}</span></span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getCoverageIcon(selectedArea.coverage)}
                          <span className="text-xs text-slate-600">Coverage: <span className={`font-medium ${getCoverageColor(selectedArea.coverage)}`}>{selectedArea.coverage}</span></span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone size={14} className="text-slate-400" />
                          <a href="tel:+918008330905" className="text-xs text-[#17612A] hover:underline">Call for availability</a>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        // Auth check
                        const isAuthenticated = !!localStorage.getItem('token');
                        if (!isAuthenticated) {
                          navigate('/login', { state: { from: '/book', area: selectedArea.name } });
                        } else {
                          navigate('/book', { state: { area: selectedArea.name } });
                        }
                      }}
                      className="px-3 py-1.5 text-sm bg-gradient-to-r from-[#17612A] to-black text-white rounded-lg hover:from-green-800 hover:to-black transition-colors shadow-sm"
                    >
                      Book Now
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Service Areas Info Panel */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white border border-[#eaf0ff] rounded-2xl p-5 shadow-sm sticky top-24"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                <span className="border-b-2 border-[#17612A] pb-1">Service Areas</span>
              </h3>

              <div className="space-y-3 mb-5 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
                {serviceAreas.map(area => (
                  <div 
                    key={area.id}
                    onClick={() => setSelectedArea(area)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedArea?.id === area.id 
                        ? 'bg-[#17612A]/10 border border-[#17612A]/20' 
                        : 'hover:bg-gray-50 border border-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          area.isMainCenter 
                            ? 'bg-[#17612A]' 
                            : area.coverage === 'Complete' ? 'bg-green-500' 
                              : area.coverage === 'Essential' ? 'bg-amber-500'
                                : area.coverage === 'Limited' ? 'bg-orange-500'
                                  : 'bg-blue-500'
                        }`}></div>
                        <span className="font-medium text-gray-800">{area.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        isWithinServiceRadius(area.coordinates)
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {isWithinServiceRadius(area.coordinates) ? 'In Range' : 'Extended'}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">{area.deliveryTime} delivery</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-1.5">
                <h4 className="font-medium text-sm text-gray-700 mb-2">Coverage Key</h4>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#17612A]"></div>
                  <span className="text-xs text-slate-700">Main Center</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-slate-700">Complete Coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-xs text-slate-700">Essential Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-xs text-slate-700">Limited Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-slate-700">Scheduled Services</span>
                </div>
              </div>

              <div className="mt-6 bg-[#f8fbff] p-4 rounded-lg border border-[#eaf0ff]">
                <p className="text-sm text-slate-700 mb-3">
                  <strong>15 km service radius</strong> from Choutuppal covers all highlighted areas on the map.
                </p>
                <p className="text-xs text-slate-600">
                  Not sure if your area is covered? Call us at <a href="tel:+918008330905" className="text-[#17612A] font-medium hover:underline">+91 8008330905</a> to check service availability.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedArea(serviceAreas[0])}
                className="w-full mt-5 py-3 bg-gradient-to-r from-[#17612A] to-black text-white rounded-lg hover:from-green-800 hover:to-black transition-all shadow-sm"
              >
                Book Service in Choutuppal
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;