import React, { useState } from "react";
import { Button, Input, Select, notification } from "antd";
import { bookBus } from "../services/bookingService";
import "./BookingForm.css";

const { Option } = Select;

const BookingForm = ({ busId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    seats: 1,
    paymentMethod: "card",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, paymentMethod: value });
  };

  const handleSubmit = async () => {
    try {
      await bookBus(busId, formData);
      notification.success({ message: "Booking Successful!" });
    } catch (error) {
      notification.error({
        message: "Booking Failed",
        description: error.message,
      });
    }
  };

  return (
    <div className="booking-form">
      <h3>Book your seat</h3>
      <Input
        placeholder="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <Input
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <Select
        defaultValue={1}
        onChange={(value) => setFormData({ ...formData, seats: value })}
      >
        {[1, 2, 3, 4, 5].map((seat) => (
          <Option key={seat} value={seat}>
            {seat} Seat{seat > 1 ? "s" : ""}
          </Option>
        ))}
      </Select>
      <Select defaultValue="card" onChange={handleSelectChange}>
        <Option value="card">Credit/Debit Card</Option>
        <Option value="wallet">E-Wallet</Option>
        <Option value="upi">UPI</Option>
      </Select>
      <Button type="primary" onClick={handleSubmit}>
        Submit Booking
      </Button>
    </div>
  );
};

export default BookingForm;
