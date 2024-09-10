import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Select,
  notification,
  DatePicker,
  Checkbox,
  Spin,
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";
import SeatSelectionMap from "./SeatSelectionMap"; // Import seat map component
import "./BookingForm.css";

const { Option } = Select;

const BookingForm = ({ busId, pricePerSeat }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bookingDate: null,
    selectedSeats: [],
    paymentMethod: "card",
    travelInsurance: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [totalPrice, setTotalPrice] = useState(pricePerSeat);
  const [step, setStep] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [insurancePrice] = useState(50);
  const [availableSeats, setAvailableSeats] = useState([]); // Define availableSeats state

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Mock data for availableSeats (Replace this with actual API call)
    setAvailableSeats([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // Example available seats
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    localStorage.setItem(e.target.name, e.target.value);
    if (e.target.name === "phone") {
      setIsValidPhone(/^[0-9]{10}$/.test(e.target.value));
    }
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, paymentMethod: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, bookingDate: date });
  };

  const handleSeatsChange = (selectedSeats) => {
    setFormData({ ...formData, selectedSeats });
    setTotalPrice(
      selectedSeats.length * pricePerSeat +
        (formData.travelInsurance ? insurancePrice : 0) -
        discount
    );
  };

  const applyPromoCode = () => {
    if (promoCode === "DISCOUNT10") {
      setDiscount(10);
      setIsPromoApplied(true);
      setTotalPrice(totalPrice - 10);
      notification.success({ message: "Promo Code Applied: ₹10 off!" });
    } else if (promoCode === "DISCOUNT20") {
      setDiscount(20);
      setIsPromoApplied(true);
      setTotalPrice(totalPrice - 20);
      notification.success({ message: "Promo Code Applied: ₹20 off!" });
    } else {
      notification.error({ message: "Invalid Promo Code!" });
    }
  };

  const handleSubmit = async () => {
    if (!termsAccepted) {
      notification.error({
        message: "Please accept the terms and conditions!",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API request (Replace with actual request)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      notification.success({ message: "Booking Successful!" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        bookingDate: null,
        selectedSeats: [],
        paymentMethod: "card",
        travelInsurance: false,
      });
      setTotalPrice(pricePerSeat);
      navigate("/confirmation"); // Redirect to the confirmation page
    } catch (error) {
      notification.error({ message: "Error during booking!" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-form">
      <div
        className="form-step"
        style={{ display: step === 0 ? "block" : "none" }}
      >
        <h3>Booking Details</h3>
        <Input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Input
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          type="tel"
        />
        {!isValidPhone && (
          <span className="error">Please enter a valid phone number.</span>
        )}
        <DatePicker
          onChange={handleDateChange}
          placeholder="Select Booking Date"
        />
        <SeatSelectionMap
          availableSeats={availableSeats}
          onSeatsChange={handleSeatsChange}
        />
        <Checkbox
          checked={formData.travelInsurance}
          onChange={() =>
            setFormData({
              ...formData,
              travelInsurance: !formData.travelInsurance,
            })
          }
        >
          Add Travel Insurance (₹{insurancePrice})
        </Checkbox>
        <Input
          name="promoCode"
          placeholder="Enter Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <Button onClick={applyPromoCode}>Apply Promo Code</Button>
        {isPromoApplied && (
          <span className="promo-applied">Promo code applied!</span>
        )}
        <Button type="primary" onClick={() => setStep(1)}>
          Next
        </Button>
      </div>

      <div
        className="form-step"
        style={{ display: step === 1 ? "block" : "none" }}
      >
        <h3>Payment Details</h3>
        <Select value={formData.paymentMethod} onChange={handleSelectChange}>
          <Option value="card">Credit/Debit Card</Option>
          <Option value="paypal">PayPal</Option>
        </Select>
        <div className="total-price">
          <h4>Total Price: ₹{totalPrice}</h4>
        </div>
        <Checkbox
          checked={termsAccepted}
          onChange={() => setTermsAccepted(!termsAccepted)}
        >
          I accept the terms and conditions
        </Checkbox>
        <Button
          type="primary"
          onClick={() => setShowConfirmModal(true)}
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spin /> : "Confirm Booking"}
        </Button>
      </div>

      <Modal
        title="Confirm Booking"
        visible={showConfirmModal}
        onOk={handleSubmit}
        onCancel={() => setShowConfirmModal(false)}
        footer={null}
      >
        <h4>Are you sure you want to confirm your booking?</h4>
        <Button onClick={handleSubmit} type="primary">
          Confirm
        </Button>
        <Button onClick={() => setShowConfirmModal(false)}>Cancel</Button>
      </Modal>
    </div>
  );
};

export default BookingForm;
