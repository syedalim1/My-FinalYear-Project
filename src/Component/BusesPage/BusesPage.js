import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BusesPage.css";

// Dummy data for buses
const initialBuses = [
  { id: 1, status: "On Time", seatsAvailable: 30 },
  { id: 2, status: "Delayed", seatsAvailable: 5 },
  { id: 3, status: "On Time", seatsAvailable: 12 },
  { id: 4, status: "Cancelled", seatsAvailable: 0 },
];

const BusesPage = () => {
  const [buses, setBuses] = useState(initialBuses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBus, setSelectedBus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate fetching data
    setLoading(true);
    setTimeout(() => {
      setBuses(initialBuses); // Replace with actual data fetching logic
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBuses = buses.filter(
    (bus) =>
      bus.id.toString().includes(searchTerm) ||
      bus.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBusClick = (bus) => {
    setSelectedBus(bus);
  };

  return (
    <div className="buses-container">
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
      <main className="buses-main">
        <h1>Available Buses</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Bus ID or Status"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <div className="buses-list">
              {filteredBuses.length > 0 ? (
                filteredBuses.map((bus) => (
                  <div
                    key={bus.id}
                    className="bus-card"
                    onClick={() => handleBusClick(bus)}
                  >
                    <h2>Bus #{bus.id}</h2>
                    <p>
                      Status:{" "}
                      <span className={`status ${bus.status.toLowerCase()}`}>
                        {bus.status}
                      </span>
                    </p>
                    <p>Seats Available: {bus.seatsAvailable}</p>
                    <Link to={`/bus-details/${bus.id}`} className="btn-primary">
                      View Details
                    </Link>
                  </div>
                ))
              ) : (
                <p>No buses found.</p>
              )}
            </div>
            {selectedBus && (
              <div className="bus-modal">
                <div className="modal-content">
                  <h2>Bus #{selectedBus.id}</h2>
                  <p>
                    Status:{" "}
                    <span
                      className={`status ${selectedBus.status.toLowerCase()}`}
                    >
                      {selectedBus.status}
                    </span>
                  </p>
                  <p>Seats Available: {selectedBus.seatsAvailable}</p>
                  <button
                    onClick={() => setSelectedBus(null)}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
      <footer className="buses-footer">
        <p>© {new Date().getFullYear()} Syed Ali. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BusesPage;
