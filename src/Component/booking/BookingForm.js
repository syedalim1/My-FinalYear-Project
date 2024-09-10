import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Select,
  notification,
  DatePicker,
  Checkbox,
  Spin,
  Progress,
  Modal,
  Tooltip,
  Alert,
  InputNumber,
  Rate,
  Switch,
} from "antd";
import { InfoCircleOutlined, SmileOutlined } from "@ant-design/icons";
import { bookBus } from "../../services/bookingService";
import SeatSelectionMap from "./SeatSelectionMap"; // Import seat map component
import Geolocation from "../Geolocation"; // For detecting user's location
import "./BookingForm.css";
import axios from "axios";

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
  const [rating, setRating] = useState(0);
  const [estimatedArrival, setEstimatedArrival] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [insurancePrice, setInsurancePrice] = useState(50);
  const [availableSeats, setAvailableSeats] = useState([]); // Define availableSeats state

  useEffect(() => {
    if (formData.bookingDate) {
      const arrivalTime = new Date(formData.bookingDate).setHours(14, 0, 0);
      setEstimatedArrival(new Date(arrivalTime).toLocaleTimeString());
    }
  }, [formData.bookingDate]);

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
    } else if (promoCode === "SAVE20") {
      setDiscount(20);
      setIsPromoApplied(true);
      setTotalPrice(totalPrice - 20);
      notification.success({ message: "Promo Code Applied: ₹20 off!" });
    } else {
      notification.error({ message: "Invalid Promo Code" });
    }
  };

  const handleSubmit = async () => {
    if (!termsAccepted) {
      notification.error({
        message: "Please accept the terms and conditions",
      });
      return;
    }
    const bookingData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      selectedSeats: formData.selectedSeats,
      bookingDate: formData.bookingDate,
      paymentMethod: formData.paymentMethod,
      totalPrice: totalPrice,
      travelInsurance: formData.travelInsurance,
    };
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings", // Ensure this endpoint is correct
        bookingData
      );
      notification.success({ message: "Booking Successful!" });
      console.log("Booking data saved:", response.data);
      setIsSubmitting(false);
    } catch (error) {
      console.error(
        "Error submitting booking:",
        error.response || error.message
      );
      notification.error({
        message: "Booking Failed",
        description: error.response?.data?.message || "An error occurred",
      });
      setIsSubmitting(false);
    }
  };

  const showConfirmationModal = () => {
    setShowConfirmModal(true);
  };

  const confirmBooking = () => {
    setShowConfirmModal(false);
    handleSubmit();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const progressSteps = ["Personal Info", "Seat Selection", "Payment"];

  return (
    <div className={`booking-form ${darkMode ? "dark-mode" : ""}`}>
      <h3>Book your seat</h3>
      <Progress
        percent={((step + 1) / progressSteps.length) * 100}
        format={() => progressSteps[step]}
      />

      <Select
        defaultValue="en"
        onChange={(value) => setSelectedLanguage(value)}
        className="input-field language-select"
      >
        <Option value="en">English</Option>
        <Option value="es">Spanish</Option>
        <Option value="fr">French</Option>
      </Select>

      <Tooltip title="Enter your full name">
        <Input
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="input-field"
          onFocus={() => setStep(0)}
          suffix={<InfoCircleOutlined />}
        />
      </Tooltip>

      <Tooltip title="Enter your valid email address">
        <Input
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="input-field"
          onFocus={() => setStep(0)}
          suffix={<InfoCircleOutlined />}
        />
      </Tooltip>

      <Tooltip title="Enter your phone number (10 digits)">
        <Input
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={`input-field ${!isValidPhone ? "error" : ""}`}
          onFocus={() => setStep(0)}
          suffix={<InfoCircleOutlined />}
        />
        {!isValidPhone && <Alert message="Invalid phone number" type="error" />}
      </Tooltip>

      <DatePicker
        onChange={handleDateChange}
        className="input-field"
        placeholder="Select Booking Date"
        onFocus={() => setStep(1)}
      />

      <Geolocation />

      <SeatSelectionMap
        availableSeats={availableSeats} // Pass availableSeats as a prop
        selectedSeats={formData.selectedSeats}
        onChange={handleSeatsChange}
      />

      <p>
        Total Price: <span className="price">₹{totalPrice}</span>
      </p>
      <p>
        Estimated Arrival Time:{" "}
        <strong>{estimatedArrival || "Select a date"}</strong>
      </p>
      <Checkbox
        checked={formData.travelInsurance}
        onChange={(e) => {
          setFormData({ ...formData, travelInsurance: e.target.checked });
          setTotalPrice(
            e.target.checked
              ? totalPrice + insurancePrice
              : totalPrice - insurancePrice
          );
        }}
        className="input-field"
      >
        Add Travel Insurance (₹{insurancePrice})
      </Checkbox>

      <InputNumber
        placeholder="Apply Promo Code"
        onChange={(value) => setPromoCode(value)}
        className="input-field"
        disabled={isPromoApplied}
      />
      <Button onClick={applyPromoCode} disabled={isPromoApplied}>
        {isPromoApplied ? "Promo Applied" : "Apply Promo"}
      </Button>

      <Select
        defaultValue="card"
        onChange={handleSelectChange}
        className="input-field"
        onFocus={() => setStep(2)}
      >
        <Option value="card">Credit/Debit Card</Option>
        <Option value="wallet">E-Wallet</Option>
        <Option value="upi">UPI</Option>
        <Option value="paypal">PayPal</Option>
        <Option value="stripe">Stripe</Option>
      </Select>

      <Checkbox
        checked={termsAccepted}
        onChange={(e) => setTermsAccepted(e.target.checked)}
        className="input-field"
      >
        I accept the terms and conditions
      </Checkbox>

      {/* Dark Mode Toggle */}
      <div className="dark-mode-toggle">
        <span>Dark Mode</span>
        <Switch checked={darkMode} onChange={toggleDarkMode} />
      </div>

      <Button
        type="primary"
        onClick={showConfirmationModal}
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spin /> : "Submit Booking"}
      </Button>

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Booking"
        visible={showConfirmModal}
        onOk={confirmBooking}
        onCancel={() => setShowConfirmModal(false)}
      >
        <p>Review your booking:</p>
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <p>Phone: {formData.phone}</p>
        <p>Total Seats: {formData.selectedSeats.length}</p>
        <p>Travel Insurance: {formData.travelInsurance ? "Yes" : "No"}</p>
        <p>Total Price: ₹{totalPrice}</p>
        <p>Estimated Arrival Time: {estimatedArrival || "N/A"}</p>
      </Modal>

      {/* Rating System */}
      <div className="rating-section">
        <h4>Rate your Booking Experience</h4>
        <Rate
          allowHalf
          value={rating}
          onChange={(value) => setRating(value)}
          character={<SmileOutlined />}
        />
        <p>You rated: {rating} / 5</p>
      </div>
    </div>
  );
};

export default BookingForm;
