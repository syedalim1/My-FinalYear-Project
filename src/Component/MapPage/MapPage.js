import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  InfoWindow,
  TrafficLayer,
} from "@react-google-maps/api";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import "./MapPage.css";

const containerStyle = {
  width: "100%",
  height: "500px",
};

// Dummy route data with stops
const routes = [
  {
    id: 1,
    name: "Route 1",
    path: [
      { lat: 28.7041, lng: 77.1025 },
      { lat: 28.7041, lng: 77.2125 },
    ],
    stops: [
      { lat: 28.7041, lng: 77.1525, stopName: "Stop A" },
      { lat: 28.7041, lng: 77.2025, stopName: "Stop B" },
    ],
    distance: "5 km",
    duration: "15 minutes",
  },
  {
    id: 2,
    name: "Route 2",
    path: [
      { lat: 28.7041, lng: 77.1025 },
      { lat: 28.7941, lng: 77.1025 },
    ],
    stops: [
      { lat: 28.7241, lng: 77.1025, stopName: "Stop C" },
      { lat: 7541, lng: 77.1025, stopName: "Stop D" },
    ],
    distance: "10 km",
    duration: "20 minutes",
  },
];

const MapPage = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [busPositions, setBusPositions] = useState([]);
  const [showTraffic, setShowTraffic] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [eta, setEta] = useState(null);

  // Fetch bus data from backend using useEffect
  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/buses");
        const data = await response.json();
        setBusPositions(data);
      } catch (error) {
        console.error("Error fetching bus data:", error);
      }
    };

    fetchBusData();
    getUserLocation(); // Fetch user location on load
  }, []);

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
    if (userLocation) {
      calculateEta(route, userLocation); // Calculate ETA based on user's location
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching user location:", error);
        }
      );
    }
  };

  const calculateEta = (route, userLocation) => {
    // Dummy logic to calculate ETA based on the user's location
    const distance = Math.sqrt(
      Math.pow(route.path[0].lat - userLocation.lat, 2) +
        Math.pow(route.path[0].lng - userLocation.lng, 2)
    );
    const etaMinutes = Math.round(distance * 15); // Assuming 15 minutes per unit distance
    setEta(etaMinutes);
  };

  const getBusIcon = (state) => {
    switch (state) {
      case "Running":
        return "/green-bus-icon.png";
      case "Delayed":
        return "/yellow-bus-icon.png";
      default:
        return "/red-bus-icon.png";
    }
  };

  const handleTrafficToggle = () => {
    setShowTraffic(!showTraffic);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: darkMode
      ? [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }],
          },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        ]
      : [],
  };

  return (
    <div className={`map-page ${darkMode ? "dark-mode" : ""}`}>
      <Header />
      <div className="map-container">
        <div className="route-list">
          <h3>Select a Route</h3>
          <ul>
            {routes.map((route) => (
              <li key={route.id} onClick={() => handleRouteClick(route)}>
                {route.name} - {route.distance}, {route.duration} - ETA:{" "}
                {eta ? `${eta} mins` : "Calculating..."}
              </li>
            ))}
          </ul>
        </div>

        <div className="map-area">
          <div className="controls">
            <button className="refresh-btn">Refresh Map</button>
            <label>
              Show Traffic:
              <input
                type="checkbox"
                checked={showTraffic}
                onChange={handleTrafficToggle}
              />
            </label>
            <label>
              Filter Buses:
              <select value={filterStatus} onChange={handleFilterChange}>
                <option value="All">All</option>
                <option value="Running">Running</option>
                <option value="Delayed">Delayed</option>
              </select>
            </label>
            <button className="dark-mode-btn" onClick={toggleDarkMode}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={
                selectedRoute
                  ? selectedRoute.path[0]
                  : { lat: 28.7041, lng: 77.1025 }
              }
              zoom={13}
              options={mapOptions}
            >
              {showTraffic && <TrafficLayer />}

              {selectedRoute && (
                <Polyline
                  path={selectedRoute.path}
                  options={{
                    strokeColor: "#00aaff",
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    icons: [
                      {
                        icon: {
                          path: window.google.maps.SymbolPath
                            .FORWARD_OPEN_ARROW,
                        },
                        offset: "100%",
                      },
                    ],
                  }}
                />
              )}

              {selectedRoute &&
                selectedRoute.stops.map((stop, index) => (
                  <Marker
                    key={index}
                    position={stop}
                    icon={{
                      url: "/stop-icon.png",
                      scaledSize: new window.google.maps.Size(24, 24),
                    }}
                    label={{
                      text: stop.stopName,
                      color: "#ffffff",
                      fontWeight: "bold",
                    }}
                  />
                ))}

              {busPositions
                .filter(
                  (bus) =>
                    selectedRoute &&
                    bus.routeId === selectedRoute.id &&
                    (filterStatus === "All" || bus.state === filterStatus)
                )
                .map((bus) => (
                  <Marker
                    key={bus.id}
                    position={bus.position}
                    icon={{
                      url: getBusIcon(bus.state),
                      scaledSize: new window.google.maps.Size(32, 32),
                    }}
                    animation={window.google.maps.Animation.BOUNCE}
                    onClick={() => setSelectedBus(bus)}
                  />
                ))}

              {selectedBus && (
                <InfoWindow
                  position={selectedBus.position}
                  onCloseClick={() => setSelectedBus(null)}
                >
                  <div>
                    <h3>{selectedBus.busNumber}</h3>
                    <p>Status: {selectedBus.state}</p>
                    <p>Driver: {selectedBus.driver}</p>
                    <p>ETA: {selectedBus.eta} minutes</p>
                    <p>Passengers: {selectedBus.passengerCount}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MapPage;
