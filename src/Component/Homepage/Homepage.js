import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// Mock data for demonstration
const featuredRoutesData = [
  { id: 1, route: "Route 1", description: "From A to B", link: "/book/1" },
  { id: 2, route: "Route 2", description: "From C to D", link: "/book/2" },
  // Add more routes as needed
];

const liveUpdatesData = [
  { id: 1, title: "Update 1", description: "Bus 123 delayed by 10 mins." },
  { id: 2, title: "Update 2", description: "Bus 456 is on time." },
  // Add more updates as needed
];

function HomePage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [filteredBuses, setFilteredBuses] = useState([]);

  useEffect(() => {
    // Fetch data or perform side effects here if needed
  }, []);

  const handleSearch = () => {
    // Handle the search logic here
    alert(`Searching for buses from ${from} to ${to}`);
  };

  const handleFilter = (e) => {
    // Handle filtering logic here
    const selectedFilter = e.target.value;
    console.log(`Filter by: ${selectedFilter}`);
  };

  return (
    <div className="home-container">
      <Header/>

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
        <section className="real-time-tracking">
          <h2>Real-Time Bus Tracking</h2>
          <Link to="/track" className="tracking-btn">
            Track Nearby Buses
          </Link>
        </section>

        <section className="route-planner">
          <h2>Plan Your Route</h2>
          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </section>

        <section className="featured-routes">
          <h2>Featured Routes</h2>
          {featuredRoutesData.map((route) => (
            <div key={route.id} className="feature-card">
              <h3>{route.route}</h3>
              <p>{route.description}</p>
              <Link to={route.link} className="btn-book-now">
                Book Now
              </Link>
            </div>
          ))}
        </section>

        <section className="live-updates">
          <h2>Live Updates</h2>
          {liveUpdatesData.map((update) => (
            <div key={update.id} className="update-card">
              <h4>{update.title}</h4>
              <p>{update.description}</p>
            </div>
          ))}
        </section>

        <section className="bus-filters">
          <h2>Filter Buses</h2>
          <label htmlFor="bus-type">Bus Type</label>
          <select id="bus-type" onChange={handleFilter}>
            <option value="">Select Type</option>
            <option value="ac">AC</option>
            <option value="non-ac">Non-AC</option>
          </select>

          <label htmlFor="bus-capacity">Capacity</label>
          <select id="bus-capacity" onChange={handleFilter}>
            <option value="">Select Capacity</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>

          <label htmlFor="bus-timings">Timings</label>
          <select id="bus-timings" onChange={handleFilter}>
            <option value="">Select Timing</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </section>

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

     <Footer/>
    </div>
  );
}

export default HomePage;
