import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import "./MapPage.css";

const containerStyle = {
  width: "100%",
  height: "500px",
};

// Dummy route and bus data
const routes = [
  {
    id: 1,
    name: "Route 1",
    path: [
      { lat: 28.7041, lng: 77.1025 },
      { lat: 28.7041, lng: 77.2125 },
    ],
  },
  {
    id: 2,
    name: "Route 2",
    path: [
      { lat: 28.7041, lng: 77.1025 },
      { lat: 28.7941, lng: 77.1025 },
    ],
  },
  {
    id: 3,
    name: "Route 3",
    path: [
      { lat: 28.7041, lng: 77.1025 },
      { lat: 28.7041, lng: 77.3025 },
    ],
  },
];

// Dummy bus data
const busPositions = [
  {
    id: 1,
    busNumber: "Bus 101",
    position: { lat: 28.7041, lng: 77.1025 },
    state: "Running",
    eta: 5,
    driver: "John",
  },
  {
    id: 2,
    busNumber: "Bus 202",
    position: { lat: 28.7041, lng: 77.2125 },
    state: "Delayed",
    eta: 10,
    driver: "Steve",
  },
];

const MapPage = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
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

  return (
    <div className="map-page">
      <Header />
      <div className="map-container">
        <div className="route-list">
          <h3>Select a Route</h3>
          <ul>
            {routes.map((route) => (
              <li key={route.id} onClick={() => handleRouteClick(route)}>
                {route.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="map-area">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            {" "}
            {/* Add your Google Maps API key */}
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={
                selectedRoute
                  ? selectedRoute.path[0]
                  : { lat: 28.7041, lng: 77.1025 }
              }
              zoom={13}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                styles: [
                  { featureType: "poi", stylers: [{ visibility: "off" }] },
                ],
              }}
            >
              {/* Draw Routes */}
              {selectedRoute && (
                <Polyline
                  path={selectedRoute.path}
                  options={{
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                  }}
                />
              )}

              {/* Show Bus Markers */}
              {busPositions
                .filter(
                  (bus) => selectedRoute && bus.routeId === selectedRoute.id
                )
                .map((bus) => (
                  <Marker
                    key={bus.id}
                    position={bus.position}
                    icon={{
                      url: getBusIcon(bus.state),
                      scaledSize: new window.google.maps.Size(32, 32),
                    }}
                    onClick={() => setSelectedBus(bus)}
                  />
                ))}

              {/* Bus InfoWindow */}
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
