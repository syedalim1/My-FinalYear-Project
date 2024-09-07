import React from "react";
import { Card } from "antd";

const BookingSummary = ({ bookingDetails }) => {
  return (
    <Card title="Booking Confirmation" className="booking-summary">
      <p>
        <strong>Bus ID:</strong> {bookingDetails.busId}
      </p>
      <p>
        <strong>Name:</strong> {bookingDetails.name}
      </p>
      <p>
        <strong>Email:</strong> {bookingDetails.email}
      </p>
      <p>
        <strong>Seats:</strong> {bookingDetails.seats}
      </p>
      <p>
        <strong>Payment Method:</strong> {bookingDetails.paymentMethod}
      </p>
      <p>
        <strong>Total Cost:</strong> ₹{bookingDetails.totalCost}
      </p>
    </Card>
  );
};

export default BookingSummary;
