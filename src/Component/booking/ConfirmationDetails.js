import React from "react";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import "./ConfirmationDetails.css";

const ConfirmationDetails = ({ bookingData }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/bookingpage"); // Redirect back to booking form or any other page
  };

  const handleHome = () => {
    navigate("/"); // Redirect to home page
  };

  // Format the bookingDate
  const formatBookingDate = () => {
    if (bookingData.bookingDate) {
      const date = new Date(bookingData.bookingDate);
      return date.toLocaleDateString(); // or use date.toISOString().split('T')[0] for 'YYYY-MM-DD'
    }
    return "Not selected";
  };

  return (
    <div className="confirmation-details">
      <Card
        title="Booking Confirmation"
        style={{ width: 600, margin: "0 auto" }}
      >
        <p>
          <strong>Full Name:</strong> {bookingData.name}
        </p>
        <p>
          <strong>Email Address:</strong> {bookingData.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {bookingData.phone}
        </p>
        <p>
          <strong>Booking Date:</strong> {formatBookingDate()}
        </p>
        <p>
          <strong>Selected Seats:</strong>{" "}
          {bookingData.selectedSeats.join(", ")}
        </p>
        <p>
          <strong>Payment Method:</strong> {bookingData.paymentMethod}
        </p>
        <p>
          <strong>Travel Insurance:</strong>{" "}
          {bookingData.travelInsurance ? "Yes" : "No"}
        </p>
        <p>
          <strong>Total Price:</strong> ₹{bookingData.totalPrice}
        </p>
        <div className="confirmation-buttons">
          <Button type="primary" onClick={handleHome}>
            Go to Home
          </Button>
          <Button onClick={handleBack}>Back to Booking</Button>
        </div>
      </Card>
    </div>
  );
};

export default ConfirmationDetails;
