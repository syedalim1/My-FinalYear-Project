import React, { useState, useEffect } from "react";
import { Button, Table, Input, Select, Card, Modal, notification } from "antd";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./BookingPage.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const { Option } = Select;

const BookingPage = () => {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [seatLayout, setSeatLayout] = useState([]);
  const [bookingSummary, setBookingSummary] = useState({});
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    // Fetch initial data
    fetchBuses();
    fetchReviews();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get("/api/buses");
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get("/api/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSelectBus = (busId) => {
    // Fetch seat layout for the selected bus
    // Implement seat layout fetching logic
    setSelectedBus(busId);
    setIsBookingModalVisible(true);
  };

  const handleConfirmBooking = () => {
    // Booking confirmation logic
    // Implement booking API call
    notification.success({
      message: "Booking Confirmed",
      description: `Your booking for bus ${selectedBus} has been confirmed.`,
    });
    setIsBookingModalVisible(false);
  };

  return (
    <div className="booking-page">
        <Header/>
      <Card title="Search for Buses">
        <Select
          style={{ width: "100%" }}
          placeholder="Select a bus"
          onChange={handleSelectBus}
        >
          {buses.map((bus) => (
            <Option key={bus.id} value={bus.id}>
              {bus.name}
            </Option>
          ))}
        </Select>
        <Button
          type="primary"
          onClick={() => {
            /* Search logic */
          }}
        >
          Search
        </Button>
      </Card>

      <Card title="Bus Route Map">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Example Marker, replace with dynamic markers as needed */}
          <Marker position={[51.505, -0.09]}>
            <Popup>A bus stop.</Popup>
          </Marker>
        </MapContainer>
      </Card>

      <Card title="User Reviews">
        <Table
          dataSource={reviews}
          columns={[
            { title: "Bus", dataIndex: "busName", key: "busName" },
            { title: "Rating", dataIndex: "rating", key: "rating" },
            { title: "Review", dataIndex: "review", key: "review" },
          ]}
        />
      </Card>

      {/* Booking Modal */}
      <Modal
        title="Book Your Seat"
        visible={isBookingModalVisible}
        onOk={handleConfirmBooking}
        onCancel={() => setIsBookingModalVisible(false)}
      >
        <div className="seat-selection">
          <h3>Select Seats</h3>
          {/* Render seat layout here */}
          <div className="seat-layout">{/* Map out seats */}</div>
          <Input
            placeholder="Enter Promo Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <Button
            onClick={() => {
              /* Apply promo code logic */
            }}
          >
            Apply
          </Button>
          <div className="booking-summary">
            <h4>Booking Summary:</h4>
            <p>Selected Bus: {selectedBus}</p>
            <p>Seats: {selectedSeats.join(", ")}</p>
            <p>Total Price: {/* Calculate price */}</p>
            <Select
              value={paymentMethod}
              onChange={(value) => setPaymentMethod(value)}
            >
              <Option value="card">Credit/Debit Card</Option>
              <Option value="wallet">E-Wallet</Option>
              <Option value="upi">UPI</Option>
            </Select>
          </div>
        </div>
      </Modal>
      <Footer/>
    </div>
  );
};

export default BookingPage;
