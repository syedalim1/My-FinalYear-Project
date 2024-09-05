import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

function HomePage() {
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">Bus Tracker</div>
        <nav className="navbar">
          <ul>
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

      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Bus Tracker</h1>
          <p>
            Track your bus in real-time and manage your travel plans
            effortlessly.
          </p>
          <Link to="/buses" className="btn-primary">
            Explore Buses
          </Link>
        </div>
      </section>

      <main className="main-content">
        <div className="feature-container">
          <div className="feature-card">
            <i className="fas fa-bus fa-2x"></i>
            <h2>Real-Time Bus Tracking</h2>
            <p>Track your bus live and stay updated on its current status.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-ticket-alt fa-2x"></i>
            <h2>Easy Ticket Booking</h2>
            <p>
              Book your tickets quickly and easily with our user-friendly
              system.
            </p>
          </div>
          <div className="feature-card">
            <i className="fas fa-map-marker-alt fa-2x"></i>
            <h2>Find Buses Between Stops</h2>
            <p>Discover available buses between your desired stops.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-info-circle fa-2x"></i>
            <h2>Bus Information</h2>
            <p>
              Get detailed information about bus routes, schedules, and more.
            </p>
          </div>
        </div>

        <section className="testimonials">
          <h2>User Testimonials</h2>
          <div className="testimonial">
            <p>
              "Bus Tracker has made my daily commute so much easier. I love the
              real-time updates!"
            </p>
            <p>- Alex R.</p>
          </div>
          <div className="testimonial">
            <p>
              "Booking tickets has never been so straightforward. Highly
              recommend!"
            </p>
            <p>- Jamie L.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Syed Ali. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
