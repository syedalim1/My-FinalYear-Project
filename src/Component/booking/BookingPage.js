import React, { useState, useEffect } from "react";
import { Button, Table, Input, Select, Card, Modal, notification } from "antd";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./BookingPage.css";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const { Option } = Select;

const BookingPage = () => {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    fetchBuses();
    fetchReviews();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get("/busData.json"); // Fetching JSON data from public folder
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get("/reviews.json"); // Adjust the path as necessary
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSelectBus = (busId) => {
    setSelectedBus(busId);
    setIsBookingModalVisible(true);
  };

  const handleConfirmBooking = () => {
    notification.success({
      message: "Booking Confirmed",
      description: `Your booking for bus ${selectedBus} has been confirmed.`,
    });
    setIsBookingModalVisible(false);
  };

  const selectedBusDetails = buses.find((bus) => bus.id === selectedBus);

  return (
    <div className="booking-page">
      <Header />
      <Card title="Search for Buses" className="search-card">
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

      <Card title="Bus Route Map" className="map-card">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {buses.map((bus) => {
            if (bus.location && bus.location.lat && bus.location.lng) {
              return (
                <Marker
                  key={bus.id}
                  position={[bus.location.lat, bus.location.lng]}
                >
                  <Popup>{bus.name}</Popup>
                </Marker>
              );
            }
            return null;
          })}
        </MapContainer>
      </Card>

      <Card title="User Reviews" className="review-card">
        <Table
          dataSource={reviews}
          columns={[
            { title: "Bus", dataIndex: "busName", key: "busName" },
            { title: "Rating", dataIndex: "rating", key: "rating" },
            { title: "Review", dataIndex: "review", key: "review" },
          ]}
          pagination={false}
          scroll={{ x: true }} // Enable horizontal scrolling on mobile
        />
      </Card>

      <Modal
        title="Book Your Seat"
        visible={isBookingModalVisible}
        onOk={handleConfirmBooking}
        onCancel={() => setIsBookingModalVisible(false)}
      >
        <div className="seat-selection">
          <h3>Select Seats</h3>
          <div className="seat-layout">{/* Seat layout logic here */}</div>
          <Input
            placeholder="Enter Promo Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="promo-input"
          />
          <Button
            onClick={() => {
              /* Apply promo code logic */
            }}
            className="promo-button"
          >
            Apply
          </Button>
          <div className="booking-summary">
            <h4>Booking Summary:</h4>
            <p>Selected Bus: {selectedBusDetails?.name || "None"}</p>
            <p>Seats: {selectedSeats.join(", ")}</p>
            <p>Total Price: {selectedBusDetails?.price || "0"}</p>
            <Select
              value={paymentMethod}
              onChange={(value) => setPaymentMethod(value)}
              className="payment-method-select"
            >
              <Option value="card">Credit/Debit Card</Option>
              <Option value="wallet">E-Wallet</Option>
              <Option value="upi">UPI</Option>
            </Select>
          </div>
        </div>
      </Modal>
      <Footer />
    </div>
  );
};

export default BookingPage;
