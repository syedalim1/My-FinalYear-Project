import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Component/LoginPage/LoginPage";
import RegisterPage from "./Component/RegisterPage/RegisterPage";
import HomePage from "./Component/Homepage/Homepage";
import BusesPage from "./Component/BusesPage/BusesPage";
import MapPage from "./Component/MapPage/MapPage";
import DriverDashboard from "./Component/DriverDashboard/DriverDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/buses" element={<BusesPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/driverdashboard" element={<DriverDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
