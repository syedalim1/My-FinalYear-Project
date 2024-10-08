import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        Track <span>MyBus</span>
      </Link>
      <div className="menu-toggle" onClick={handleMenuToggle}>
        <div className={menuOpen ? "open" : ""}></div>
        <div className={menuOpen ? "open" : ""}></div>
        <div className={menuOpen ? "open" : ""}></div>
      </div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/buses">View Buses</Link>
          </li>
          <li>
            <Link to="/map">Map</Link>
          </li>
          <li>
            <Link to="/bookingpage">Booking</Link>
          </li>
          <li>
            <Link to="/admindashboard">Admin</Link>
          </li>
          <li>
            <Link to="/Bookingform">BookingForm</Link>
          </li>
        </ul>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/buses" onClick={() => setMenuOpen(false)}>
              View Buses
            </Link>
          </li>
          <li>
            <Link to="/map" onClick={() => setMenuOpen(false)}>
              Map
            </Link>
          </li>
          <li>
            <Link to="/bookingpage" onClick={() => setMenuOpen(false)}>
              Booking
            </Link>
          </li>
          <li>
            <Link to="/admindashboard" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
