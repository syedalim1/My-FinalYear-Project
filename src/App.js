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
import ConfirmationDetails from "./Component/booking/ConfirmationDetails";

function App() {
  const bookingData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    bookingDate: new Date(),
    selectedSeats: [1, 2],
    paymentMethod: "card",
    travelInsurance: true,
    totalPrice: 500,
  };

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
        <Route path="/book/:busId" element={<BookingForm />} />
        <Route
          path="/confirmation"
          element={<ConfirmationDetails bookingData={bookingData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
