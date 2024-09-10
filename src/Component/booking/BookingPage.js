import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Input,
  Select,
  Card,
  Modal,
  notification,
  Checkbox,
  Rate,
  Pagination,
  Tooltip,
  Progress,
  Switch,
} from "antd";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import "./BookingPage.css"; // Assuming custom CSS for more creativity

const { Option } = Select;

const BookingPage = () => {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [progress, setProgress] = useState(50); // For progress bar
  const [darkMode, setDarkMode] = useState(false); // For Dark/Light mode toggle
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuses();
    fetchReviews();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/buses");
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get("/reviews.json");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSelectBus = (busId) => {
    setSelectedBus(busId);
    setIsBookingModalVisible(true);
    setProgress(75); // Update progress when bus is selected
  };

  const applyPromoCode = () => {
    if (promoCode === "DISCOUNT10") {
      setDiscount(10);
      notification.success({ message: "Promo code applied: 10% discount!" });
    } else {
      notification.error({ message: "Invalid promo code!" });
    }
  };

  const handleBooking = () => {
    if (!termsAccepted) {
      notification.error({
        message: "You must accept the terms and conditions.",
      });
      return;
    }
    navigate(`/Bookingform`, {
      state: {
        busId: selectedBus,
        discount: discount,
        promoCode: promoCode,
      },
    });
    setIsBookingModalVisible(false);
  };

  const selectedBusDetails = buses.find((bus) => bus.id === selectedBus);
  const filteredBuses = buses.filter(
    (bus) =>
      bus.name.toLowerCase().includes(searchText.toLowerCase()) ||
      bus.route.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedBuses = filteredBuses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className={`booking-page ${darkMode ? "dark-mode" : ""}`}>
      <Header />

      {/* Theme Toggle */}
      <div className="theme-toggle">
        <span>🌞 Light Mode</span>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          checkedChildren="🌙 Dark Mode"
          unCheckedChildren="🌞 Light Mode"
        />
      </div>

      <Card
        title="Search for Buses"
        className="search-card"
        style={{ backgroundColor: "#f0f2f5", borderRadius: "15px" }}
      >
        <Input
          placeholder="Search by name or route"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ borderRadius: "10px", marginBottom: "10px" }}
        />
        <Select
          style={{ width: "100%", borderRadius: "10px" }}
          placeholder="Select a bus"
          onChange={handleSelectBus}
        >
          {filteredBuses.map((bus) => (
            <Option key={bus.id} value={bus.id}>
              <div className="bus-option">
                <img src={bus.image} alt={bus.name} className="bus-img" />
                {bus.name}
              </div>
            </Option>
          ))}
        </Select>
        <Button
          type="primary"
          style={{ marginTop: "10px", borderRadius: "10px" }}
        >
          Search
        </Button>
      </Card>

      {/* Progress Indicator */}
      <Progress
        percent={progress}
        status="active"
        style={{ marginTop: "20px" }}
      />

      <Card
        title="Available Buses"
        className="bus-list-card"
        style={{
          marginTop: "20px",
          backgroundColor: "#e6f7ff",
          borderRadius: "15px",
        }}
      >
        <Table
          dataSource={paginatedBuses}
          columns={[
            {
              title: "Bus Name",
              dataIndex: "name",
              key: "name",
              render: (text, record) => (
                <a
                  onClick={() => handleSelectBus(record.id)}
                  style={{ color: "#1890ff" }}
                >
                  {text}
                </a>
              ),
            },
            { title: "Type", dataIndex: "type", key: "type" },
            { title: "Route", dataIndex: "route", key: "route" },
            {
              title: "Price",
              dataIndex: "price",
              key: "price",
              render: (text) => (
                <span style={{ color: "#ff4d4f" }}>₹{text}</span>
              ),
            },
            {
              title: "Available Seats",
              dataIndex: "availableSeats",
              key: "availableSeats",
            },
            {
              title: "Rating",
              dataIndex: "rating",
              key: "rating",
              render: (rating) => <Rate disabled defaultValue={rating} />,
            },
          ]}
          pagination={false}
          rowKey="id"
        />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredBuses.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: "20px", textAlign: "center" }}
        />
      </Card>

      <Card
        title="Bus Route Map"
        className="map-card"
        style={{ marginTop: "20px", borderRadius: "15px", overflow: "hidden" }}
      >
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: "400px", width: "100%", borderRadius: "15px" }}
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

      <Modal
        title="Confirm Booking"
        visible={isBookingModalVisible}
        onOk={handleBooking}
        onCancel={() => setIsBookingModalVisible(false)}
        okText="Confirm"
        cancelText="Cancel"
        style={{ borderRadius: "15px" }}
      >
        {selectedBusDetails && (
          <div>
            <p>
              <strong>Bus Name:</strong> {selectedBusDetails.name}
            </p>
            <p>
              <strong>Route:</strong> {selectedBusDetails.route}
            </p>
            <p>
              <strong>Price:</strong> ₹{selectedBusDetails.price}
            </p>
            <p>
              <strong>Available Seats:</strong>{" "}
              {selectedBusDetails.availableSeats}
            </p>
            <p>
              <strong>Rating:</strong>{" "}
              <Rate disabled defaultValue={selectedBusDetails.rating} />
            </p>
            <Tooltip title="Enter your promo code here">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{ marginTop: "10px", borderRadius: "10px" }}
              />
            </Tooltip>
            <Button
              type="primary"
              onClick={applyPromoCode}
              style={{ marginTop: "10px", borderRadius: "10px" }}
            >
              Apply Promo Code
            </Button>
            <Checkbox
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              style={{ marginTop: "10px", color: "black" }}
            >
              I accept the terms and conditions
            </Checkbox>
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
};

export default BookingPage;
