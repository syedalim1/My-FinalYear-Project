import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import HomePage from "./Component/Homepage/Homepage";
import BusesPage from "./Component/BusesPage/BusesPage";
import MapPage from "./Component/MapPage/MapPage";
import AdminDashboard from "./Component/AdminDashboard/AdminDashboard";
import BookingPage from "./Component/BookingPage/BookingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/buses" element={<BusesPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/bookingpage" element={<BookingPage />} />
      
      </Routes>
    </Router>
  );
}

export default App;
