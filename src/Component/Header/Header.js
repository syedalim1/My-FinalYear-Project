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
      <div className="logo">Bus Tracker</div>
      <div className="menu-toggle" onClick={handleMenuToggle}>
        <div className={menuOpen ? "open" : ""}></div>
        <div className={menuOpen ? "open" : ""}></div>
        <div className={menuOpen ? "open" : ""}></div>
      </div>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/buses">View Buses</Link></li>
          <li><Link to="/map">Map</Link></li>
         
          <li><Link to="/admindashboard">Admin Dashboard</Link></li>
        </ul>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <ul>
          <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
          <li><Link to="/buses" onClick={() => setMenuOpen(false)}>View Buses</Link></li>
          <li><Link to="/map" onClick={() => setMenuOpen(false)}>Map</Link></li>
          <li><Link to="/admindashboard" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link></li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
