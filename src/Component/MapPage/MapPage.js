import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./MapPage.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Sample data for routes
const routes = [
  {
    id: 1,
    name: "Route 1",
    path: [
      [28.7041, 77.1025],
      [28.7041, 77.2125],
    ],
  },
  {
    id: 2,
    name: "Route 2",
    path: [
      [28.7041, 77.1025],
      [28.7941, 77.1025],
    ],
  },
  {
    id: 3,
    name: "Route 3",
    path: [
      [28.7041, 77.1025],
      [28.7041, 77.3025],
    ],
  },
];

// Create 50 buses with random initial states
const initialBuses = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  routeId: (i % routes.length) + 1, // Assign each bus to a route
  progress: Math.random(), // Random initial progress
  state: ["Running", "Stopped", "Delayed"][Math.floor(Math.random() * 3)], // Random state
}));

const RouteManagement = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [busPositions, setBusPositions] = useState(initialBuses);
  const intervalRef = useRef(null);

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
  };

  // Define custom icons for different bus states
  const getBusIcon = (state) => {
    let iconUrl;
    switch (state) {
      case "Running":
        iconUrl = "/bus-running-icon.png";
        break;
      case "Stopped":
        iconUrl = "/bus-stopped-icon.png";
        break;
      case "Delayed":
        iconUrl = "/bus-delayed-icon.png";
        break;
      default:
        iconUrl = "/bus-icon.png";
    }

    return new L.Icon({
      iconUrl,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  // Smoothly animate bus movement
  useEffect(() => {
    const animateBuses = () => {
      setBusPositions((prevBuses) =>
        prevBuses.map((bus) => {
          const route = routes.find((r) => r.id === bus.routeId);
          if (!route || !route.path.length) return bus;

          const routeLength = route.path.length;
          const currentPosition = Math.floor(bus.progress * routeLength);
          const nextPosition = (currentPosition + 1) % routeLength;

          // Interpolate position
          const start = route.path[currentPosition];
          const end = route.path[nextPosition];
          const lat =
            start[0] +
            (end[0] - start[0]) *
              (bus.progress * routeLength - currentPosition);
          const lng =
            start[1] +
            (end[1] - start[1]) *
              (bus.progress * routeLength - currentPosition);

          // Calculate new progress
          const newProgress = (bus.progress + 0.005) % 1;

          return {
            ...bus,
            progress: newProgress,
            position: [lat, lng],
          };
        })
      );
    };

    intervalRef.current = setInterval(animateBuses, 100); // Update every 100ms

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="route-management">
      <header className="buses-header">
        <div className="logo">Bus Tracker</div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/buses">View Buses</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="route-content">
        <div className="route-list">
          <h3>Active Routes</h3>
          <ul>
            {routes.map((route) => (
              <li key={route.id} onClick={() => handleRouteClick(route)}>
                {route.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="route-map">
          <MapContainer
            center={[28.7041, 77.1025]}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {routes.map((route) => (
              <Polyline
                key={route.id}
                positions={route.path}
                color={selectedRoute?.id === route.id ? "blue" : "gray"}
              />
            ))}
            {selectedRoute && (
              <Marker position={selectedRoute.path[0]}>
                <Popup>
                  <h3>{selectedRoute.name}</h3>
                  <p>Details about {selectedRoute.name}</p>
                </Popup>
              </Marker>
            )}
            {busPositions
              .filter((bus) => bus.routeId === selectedRoute?.id) // Filter buses based on the selected route
              .map((bus) => {
                if (!bus.position || !bus.position[0] || !bus.position[1])
                  return null;
                return (
                  <Marker
                    key={bus.id}
                    position={bus.position}
                    icon={getBusIcon(bus.state)}
                  >
                    <Popup>
                      <h3>Bus {bus.id}</h3>
                      <p>Route: Route {bus.routeId}</p>
                      <p>Status: {bus.state}</p>
                    </Popup>
                  </Marker>
                );
              })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default RouteManagement;
