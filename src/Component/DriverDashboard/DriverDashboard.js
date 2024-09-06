// src/DriverDashboard.js
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import "./DriverDashboard.css"; // Import custom CSS

const DriverDashboard = () => {
  const [busDetails, setBusDetails] = useState(null);
  const [status, setStatus] = useState("Running");
  const [route, setRoute] = useState(null);

  useEffect(() => {
    // Fetch bus details (Assume driver is already logged in)
    axios
      .get("http://localhost:5000/api/driver/bus-details")

      .then((response) => {
        setBusDetails(response.data.bus);
        setRoute(response.data.route);
      })
      .catch((error) => {
        console.error("Error fetching bus details:", error);
      });
  }, []);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // Send status update to the backend
    axios.post("/api/driver/update-status", { status: newStatus });
  };

  return (
    <div className="dashboard-container">
      <header>
        <h1>Bus Operator Dashboard</h1>
      </header>
      {busDetails && (
        <div className="bus-info">
          <h2>Bus Details</h2>
          <p>
            <strong>Bus ID:</strong> {busDetails.id}
          </p>
          <p>
            <strong>Route Name:</strong> {busDetails.routeName}
          </p>
          <p>
            <strong>Current Status:</strong> {status}
          </p>

          <div className="status-update">
            <h3>Update Status</h3>
            <button onClick={() => handleStatusChange("Running")}>
              Running
            </button>
            <button onClick={() => handleStatusChange("Stopped")}>
              Stopped
            </button>
            <button onClick={() => handleStatusChange("Delayed")}>
              Delayed
            </button>
          </div>

          <div className="map-container">
            <h3>Route Map</h3>
            <MapContainer
              center={route ? route[0] : [28.7041, 77.1025]}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {route && <Polyline positions={route} color="blue" />}
              {busDetails.position && (
                <Marker
                  position={busDetails.position}
                  icon={
                    new L.Icon({
                      iconUrl: "/bus-icon.png",
                      iconSize: [32, 32],
                      iconAnchor: [16, 32],
                    })
                  }
                />
              )}
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
