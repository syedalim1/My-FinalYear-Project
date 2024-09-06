import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./MapPage.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Sample data for routes and buses
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

const initialBuses = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  routeId: (i % routes.length) + 1,
  progress: Math.random(),
  state: ["Running", "Stopped", "Delayed"][Math.floor(Math.random() * 3)],
  driver: `Driver ${i + 1}`,
  busNumber: `Bus-${i + 1}`,
  contact: `123-456-${i + 1}`,
  eta: Math.floor(Math.random() * 30), // ETA in minutes
}));

const RouteManagement = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [busPositions, setBusPositions] = useState(initialBuses);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [trafficData, setTrafficData] = useState(null); // For traffic conditions
  const [notifications, setNotifications] = useState([]);
  const intervalRef = useRef(null);

  const handleRouteClick = (route) => setSelectedRoute(route);

  const getBusIcon = (state) => {
    let iconUrl;
    switch (state) {
      case "Running":
        iconUrl = "/green-bus-icon.png";
        break;
      case "Stopped":
        iconUrl = "/red-bus-icon.png";
        break;
      case "Delayed":
        iconUrl = "/yellow-bus-icon.png";
        break;
      default:
        iconUrl = "/blue-bus-icon.png";
    }
    return new L.Icon({
      iconUrl,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  useEffect(() => {
    const animateBuses = () => {
      setBusPositions((prevBuses) =>
        prevBuses.map((bus) => {
          const route = routes.find((r) => r.id === bus.routeId);
          if (!route || !route.path.length) return bus;

          const routeLength = route.path.length;
          const currentPosition = Math.floor(bus.progress * routeLength);
          const nextPosition = (currentPosition + 1) % routeLength;

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

          const newProgress = (bus.progress + 0.005) % 1;
          return { ...bus, progress: newProgress, position: [lat, lng] };
        })
      );
    };
    intervalRef.current = setInterval(animateBuses, 100);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    // Simulate fetching traffic data
    const fetchTrafficData = () => {
      // Fetch traffic data from an API or service
      // setTrafficData(data);
    };

    fetchTrafficData();
  }, []);

  useEffect(() => {
    // Simulate notifications
    const fetchNotifications = () => {
      // Fetch notifications from an API or service
      // setNotifications(notifications);
    };

    fetchNotifications();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredRoutes = routes.filter((route) =>
    route.name.toLowerCase().includes(searchQuery)
  );

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (selectedRoute) {
        map.setView(selectedRoute.path[0], 13);
      }
    }, [selectedRoute, map]);

    return null;
  };

  return (
    <div className="route-management">
      <header className="buses-header">
        <div className="logo">Bus Tracker</div>
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/buses">View Buses</Link></li>
            <li><Link to="/map">Map</Link></li>
          </ul>
        </nav>
      </header>

      <div className="route-content">
        <div className="route-list">
          <h3>Active Routes</h3>
          <input
            type="text"
            placeholder="Search Routes..."
            onChange={handleSearch}
          />
          <ul>
            {filteredRoutes.map((route) => (
              <li key={route.id} onClick={() => handleRouteClick(route)}>
                {route.name}
              </li>
            ))}
          </ul>
          <div className="filter-section">
            <label>Filter Buses by Status:</label>
            <select onChange={handleStatusChange} value={filterStatus}>
              <option value="All">All</option>
              <option value="Running">Running</option>
              <option value="Stopped">Stopped</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>
        </div>

        <div className="route-map">
          <MapContainer
            center={[28.7041, 77.1025]}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {routes.map((route) => (
              <Polyline
                key={route.id}
                positions={route.path}
                color={selectedRoute?.id === route.id ? "red" : "gray"}
              />
            ))}
            {busPositions
              .filter(
                (bus) =>
                  bus.routeId === selectedRoute?.id &&
                  (filterStatus === "All" || bus.state === filterStatus)
              )
              .map((bus) => (
                <Marker
                  key={bus.id}
                  position={bus.position}
                  icon={getBusIcon(bus.state)}
                >
                  <Popup>
                    <h3>Bus {bus.id}</h3>
                    <p>Route: Route {bus.routeId}</p>
                    <p>Status: {bus.state}</p>
                    <p>Driver: {bus.driver}</p>
                    <p>Bus Number: {bus.busNumber}</p>
                    <p>Contact: {bus.contact}</p>
                    <p>ETA: {bus.eta} minutes</p>
                  </Popup>
                </Marker>
              ))}
            <MapUpdater />
          </MapContainer>
        </div>

        {/* Notifications */}
        {/* <div className="notifications">
          <h3>Notifications</h3>
          <ul>
            {notifications.map((notif, index) => (
              <li key={index}>{notif}</li>
            ))}
          </ul>
        </div> */}

        {/* Traffic Conditions */}
        {/* <div className="traffic-conditions">
          <h3>Traffic Conditions</h3>
          <p>{trafficData ? trafficData : "Fetching traffic data..."}</p>
        </div> */}
      </div>
    </div>
  );
};

export default RouteManagement;
