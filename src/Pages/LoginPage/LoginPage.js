import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import Header from "../../Component/Header/Header";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
  };

  return (
    <div className="login-container">
      <Header />
      <main className="login-main">
        <div className="login-form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Login
            </button>
          </form>
          <p className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </main>
      <footer className="login-footer">
        <p>© {new Date().getFullYear()} Syed Ali. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LoginPage;
