import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import HomePage from "./Pages/Homepage";
import BusesPage from "./Pages/BusesPage";
import MapPage from "./Component/MapPage/MapPage";
import AdminDashboard from "./Component/admin/AdminDashboard";
import BookingPage from "./Component/booking/BookingPage";
import BookingForm from "./Component/booking/BookingForm";

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
        <Route path="/Bookingform" element={<BookingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
