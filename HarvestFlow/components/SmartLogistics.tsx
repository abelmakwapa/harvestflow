import { useState, useEffect, useRef } from 'react';
import { TruckIcon, MapPin, Clock, Fuel, AlertCircle, CheckCircle, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

// Leaflet imports
declare global {
  interface Window {
    L: any;
  }
}

export function SmartLogistics() {
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [liveTracking, setLiveTracking] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const routeLinesRef = useRef<any[]>([]);

  const routes = [
    {
      id: 1,
      name: 'Route A - Downtown Loop',
      distance: '47.3 mi',
      duration: '1h 23m',
      fuel: '$12.40',
      efficiency: 95,
      traffic: 'light',
      weather: 'clear',
      stops: 5,
      status: 'optimal',
      savings: '$8.20',
      coordinates: [
        [40.7589, -73.9851],
        [40.7614, -73.9776],
        [40.7489, -73.9680],
        [40.7367, -73.9812],
        [40.7489, -73.9897],
        [40.7589, -73.9851],
      ],
      color: '#10b981',
    },
    {
      id: 2,
      name: 'Route B - Highway Express',
      distance: '52.1 mi',
      duration: '1h 15m',
      fuel: '$14.80',
      efficiency: 88,
      traffic: 'moderate',
      weather: 'clear',
      stops: 3,
      status: 'good',
      savings: '$4.50',
      coordinates: [
        [40.7589, -73.9851],
        [40.7800, -73.9600],
        [40.7300, -73.9400],
        [40.7589, -73.9851],
      ],
      color: '#3b82f6',
    },
    {
      id: 3,
      name: 'Route C - Scenic Route',
      distance: '61.5 mi',
      duration: '1h 45m',
      fuel: '$17.20',
      efficiency: 72,
      traffic: 'heavy',
      weather: 'rain',
      stops: 7,
      status: 'not-recommended',
      savings: '$0.00',
      coordinates: [
        [40.7589, -73.9851],
        [40.7700, -74.0000],
        [40.7400, -74.0100],
        [40.7200, -73.9950],
        [40.7100, -73.9700],
        [40.7300, -73.9500],
        [40.7500, -73.9600],
        [40.7589, -73.9851],
      ],
      color: '#ef4444',
    },
  ];

  const activeDeliveries = [
    { id: 'D-1047', driver: 'John Smith', status: 'in-transit', progress: 65, eta: '14 min', location: 'Highway 101' },
    { id: 'D-1048', driver: 'Sarah Jones', status: 'loading', progress: 15, eta: '52 min', location: 'Distribution Center' },
    { id: 'D-1049', driver: 'Mike Chen', status: 'delivered', progress: 100, eta: 'Completed', location: 'Downtown Market' },
    { id: 'D-1050', driver: 'Emma Wilson', status: 'in-transit', progress: 82, eta: '8 min', location: 'Main St' },
  ];

  const weatherAlerts = [
    { type: 'warning', message: 'Light rain expected in 45 minutes on Route C', severity: 'medium' },
    { type: 'info', message: 'Traffic cleared on Highway 101', severity: 'low' },
  ];

  // Initialize Leaflet map
  useEffect(() => {
    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initializeMap;
      document.body.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update route when selection changes
  useEffect(() => {
    if (mapInstanceRef.current && window.L) {
      drawRoute(selectedRoute);
    }
  }, [selectedRoute]);

  const initializeMap = () => {
    if (!mapRef.current || !window.L || mapInstanceRef.current) return;

    const L = window.L;

    // Initialize map
    const map = L.map(mapRef.current).setView([40.7489, -73.9680], 12);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    // Draw initial route
    drawRoute(0);

    // Add markers
    const startIcon = L.divIcon({
      html: '<div style="background: #10b981; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    L.marker([40.7589, -73.9851], { icon: startIcon })
      .addTo(map)
      .bindPopup('<b>Distribution Center</b><br>Starting Point');
  };

  const drawRoute = (routeIndex: number) => {
    if (!mapInstanceRef.current || !window.L) return;

    const L = window.L;
    const route = routes[routeIndex];

    // Remove existing route lines
    routeLinesRef.current.forEach(line => {
      mapInstanceRef.current.removeLayer(line);
    });
    routeLinesRef.current = [];

    // Draw all routes with different opacities
    routes.forEach((r, index) => {
      const isSelected = index === routeIndex;
      const polyline = L.polyline(r.coordinates, {
        color: r.color,
        weight: isSelected ? 5 : 3,
        opacity: isSelected ? 1 : 0.3,
        smoothFactor: 1,
      }).addTo(mapInstanceRef.current);

      if (isSelected) {
        polyline.bindPopup(`<b>${r.name}</b><br>${r.distance} • ${r.duration}`);
      }

      routeLinesRef.current.push(polyline);
    });

    // Fit map to selected route bounds
    const bounds = L.latLngBounds(route.coordinates);
    mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
  };

  return (
    <section className="py-8 md:py-12 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-emerald-600 mb-2">Smart Logistics</h1>
          <p className="text-lg md:text-xl text-gray-600">AI-powered route optimization with real-time weather and traffic monitoring</p>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-3 md:p-4 text-white shadow-lg">
            <TruckIcon className="w-6 md:w-8 h-6 md:h-8 mb-2" />
            <div className="text-xl md:text-2xl mb-1">24</div>
            <div className="text-xs md:text-sm opacity-90">Active Deliveries</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-3 md:p-4 text-white shadow-lg">
            <Navigation className="w-6 md:w-8 h-6 md:h-8 mb-2" />
            <div className="text-xl md:text-2xl mb-1">573 mi</div>
            <div className="text-xs md:text-sm opacity-90">Total Distance</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-3 md:p-4 text-white shadow-lg">
            <Fuel className="w-6 md:w-8 h-6 md:h-8 mb-2" />
            <div className="text-xl md:text-2xl mb-1">$284</div>
            <div className="text-xs md:text-sm opacity-90">Fuel Saved Today</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-3 md:p-4 text-white shadow-lg">
            <Clock className="w-6 md:w-8 h-6 md:h-8 mb-2" />
            <div className="text-xl md:text-2xl mb-1">3.2h</div>
            <div className="text-xs md:text-sm opacity-90">Time Saved</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Route Optimization */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg mb-4 md:mb-6">
              <h2 className="text-gray-900 mb-4">AI Route Optimization</h2>
              
              <div className="space-y-3 md:space-y-4">
                {routes.map((route, index) => (
                  <motion.div
                    key={route.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedRoute(index)}
                    className={`p-3 md:p-4 rounded-xl cursor-pointer transition-all border-2 ${
                      selectedRoute === index
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className={`w-8 md:w-10 h-8 md:h-10 rounded-full flex items-center justify-center ${
                          route.status === 'optimal' ? 'bg-emerald-100 text-emerald-600' :
                          route.status === 'good' ? 'bg-blue-100 text-blue-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {route.status === 'optimal' ? <CheckCircle className="w-4 md:w-5 h-4 md:h-5" /> :
                           route.status === 'good' ? <Navigation className="w-4 md:w-5 h-4 md:h-5" /> :
                           <AlertCircle className="w-4 md:w-5 h-4 md:h-5" />}
                        </div>
                        <div>
                          <h3 className="text-sm md:text-base text-gray-900">{route.name}</h3>
                          <p className="text-xs md:text-sm text-gray-500">{route.stops} stops • {route.traffic} traffic</p>
                        </div>
                      </div>
                      {route.status === 'optimal' && (
                        <span className="bg-emerald-500 text-white text-xs px-2 md:px-3 py-1 rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 text-xs md:text-sm">
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Distance</div>
                        <div className="text-gray-900">{route.distance}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Duration</div>
                        <div className="text-gray-900">{route.duration}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Fuel Cost</div>
                        <div className="text-gray-900">{route.fuel}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Savings</div>
                        <div className="text-emerald-600">{route.savings}</div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-500">Efficiency Score</span>
                        <span className="text-gray-900">{route.efficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            route.efficiency >= 90 ? 'bg-emerald-500' :
                            route.efficiency >= 80 ? 'bg-blue-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${route.efficiency}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
              <h3 className="text-gray-900 mb-4">Interactive Route Map</h3>
              <div 
                ref={mapRef} 
                className="rounded-xl h-64 md:h-80 lg:h-96 w-full"
                style={{ zIndex: 1 }}
              />
              <div className="mt-4 text-sm text-gray-600">
                <p>Click on any route above to view it on the map</p>
              </div>
            </div>
          </div>

          {/* Live Tracking & Alerts */}
          <div className="space-y-4 md:space-y-6">
            {/* Weather Alerts */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
              <h3 className="text-gray-900 mb-4">Weather Alerts</h3>
              <div className="space-y-3">
                {weatherAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.severity === 'medium' ? 'bg-orange-50 border-orange-500' : 'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle className={`w-4 md:w-5 h-4 md:h-5 flex-shrink-0 ${
                        alert.severity === 'medium' ? 'text-orange-500' : 'text-blue-500'
                      }`} />
                      <p className="text-xs md:text-sm text-gray-700">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Deliveries */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Live Tracking</h3>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${liveTracking ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`} />
                  <span className="text-xs md:text-sm text-gray-600">Live</span>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                {activeDeliveries.map((delivery, index) => (
                  <motion.div
                    key={delivery.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-xl p-3 md:p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs md:text-sm text-emerald-600">{delivery.id}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        delivery.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                        delivery.status === 'in-transit' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {delivery.status}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-900 mb-1">{delivery.driver}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <MapPin className="w-3 h-3" />
                      <span>{delivery.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-gray-900">ETA: {delivery.eta}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${delivery.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-1.5 rounded-full ${
                          delivery.status === 'delivered' ? 'bg-emerald-500' : 'bg-blue-500'
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
