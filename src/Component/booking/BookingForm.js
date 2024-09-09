import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  notification,
  DatePicker,
  Checkbox,
  Spin,
} from "antd";
import { bookBus } from "../../services/bookingService";
import "./BookingForm.css";

const { Option } = Select;

const BookingForm = ({ busId, pricePerSeat }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    seats: 1,
    paymentMethod: "card",
    bookingDate: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [totalPrice, setTotalPrice] = useState(pricePerSeat);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, paymentMethod: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, bookingDate: date });
  };

  const handleSeatsChange = (value) => {
    setFormData({ ...formData, seats: value });
    setTotalPrice(value * pricePerSeat);
  };

  const handleSubmit = async () => {
    if (!termsAccepted) {
      notification.error({ message: "Please accept the terms and conditions" });
      return;
    }
    setIsSubmitting(true);
    try {
      await bookBus(busId, formData);
      notification.success({ message: "Booking Successful!" });
      setIsSubmitting(false);
    } catch (error) {
      notification.error({
        message: "Booking Failed",
        description: error.message,
      });
      setIsSubmitting(false);
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
        className="input-field"
      />
      <Input
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="input-field"
      />
      <Input
        placeholder="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        className="input-field"
      />
      <DatePicker
        onChange={handleDateChange}
        className="input-field"
        placeholder="Select Booking Date"
      />
      <Select
        defaultValue={1}
        onChange={handleSeatsChange}
        className="input-field"
      >
        {[1, 2, 3, 4, 5].map((seat) => (
          <Option key={seat} value={seat}>
            {seat} Seat{seat > 1 ? "s" : ""}
          </Option>
        ))}
      </Select>
      <p>Total Price: ₹{totalPrice}</p>
      <Select
        defaultValue="card"
        onChange={handleSelectChange}
        className="input-field"
      >
        <Option value="card">Credit/Debit Card</Option>
        <Option value="wallet">E-Wallet</Option>
        <Option value="upi">UPI</Option>
      </Select>
      <Checkbox
        checked={termsAccepted}
        onChange={(e) => setTermsAccepted(e.target.checked)}
        className="input-field"
      >
        I accept the terms and conditions
      </Checkbox>
      <Button
        type="primary"
        onClick={handleSubmit}
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spin /> : "Submit Booking"}
      </Button>
    </div>
  );
};

export default BookingForm;
