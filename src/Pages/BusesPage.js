import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Input,
  Select,
  Slider,
  Card,
  Modal,
  Tag,
  Checkbox,
  Rate,
} from "antd";
import { StarOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import axios from "axios";
import "./BusesPage.css";
import Header from "../Component/shared/Header";
import Footer from "../Component/shared/Footer";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const { Option } = Select;

const BusesPage = () => {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [busType, setBusType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortOption, setSortOption] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [amenitiesFilter, setAmenitiesFilter] = useState([]);

  // Fetch bus data from the backend API
  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/buses");
        const data = response.data;
        setBuses(data);
        setFilteredBuses(data);
      } catch (error) {
        console.error("Error fetching bus data:", error);
      }
    };

    fetchBusData();
    const interval = setInterval(fetchBusData, 15000); // Polling every 15 seconds

    return () => clearInterval(interval);
  }, []);

  // Filter and sort buses
  const filterBuses = (busType, priceRange, amenitiesFilter) => {
    let filtered = buses;
    if (busType) {
      filtered = filtered.filter((bus) => bus.type === busType);
    }
    if (amenitiesFilter.length > 0) {
      filtered = filtered.filter((bus) =>
        amenitiesFilter.every((amenity) => bus.amenities.includes(amenity))
      );
    }
    filtered = filtered.filter(
      (bus) => bus.price >= priceRange[0] && bus.price <= priceRange[1]
    );
    setFilteredBuses(filtered);
  };

  const handleBusTypeChange = (value) => {
    setBusType(value);
    filterBuses(value, priceRange, amenitiesFilter);
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
    filterBuses(busType, range, amenitiesFilter);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    sortBuses(value);
  };

  const handleAmenityChange = (checkedValues) => {
    setAmenitiesFilter(checkedValues);
    filterBuses(busType, priceRange, checkedValues);
  };

  const sortBuses = (sortOption) => {
    let sortedBuses = [...filteredBuses];
    if (sortOption === "price") {
      sortedBuses.sort((a, b) => a.price - b.price);
    } else if (sortOption === "rating") {
      sortedBuses.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "departureTime") {
      sortedBuses.sort(
        (a, b) =>
          new Date(`1970/01/01 ${a.departureTime}`) -
          new Date(`1970/01/01 ${b.departureTime}`)
      );
    }
    setFilteredBuses(sortedBuses);
  };

  const toggleFavorite = (busId) => {
    let updatedFavorites;
    if (favorites.includes(busId)) {
      updatedFavorites = favorites.filter((id) => id !== busId);
    } else {
      updatedFavorites = [...favorites, busId];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const showBusDetails = (bus) => {
    Modal.info({
      title: `${bus.name} Details`,
      content: (
        <div>
          <p>Route: {bus.route}</p>
          <p>Amenities: {bus.amenities.join(", ")}</p>
          <p>Departure: {bus.departureTime}</p>
          <p>Arrival: {bus.arrivalTime}</p>
          <p>Available Seats: {bus.availableSeats}</p>
          <p>
            Rating: {bus.rating} <StarOutlined />
          </p>
          <div>
            <MapContainer
              center={[bus.location.lat, bus.location.lng]}
              zoom={13}
              style={{ height: "200px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[bus.location.lat, bus.location.lng]} />
            </MapContainer>
          </div>
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <>
      <Header />
      <div className="buses-page">
        <Card title="Bus Listings" className="filter-section">
          <div className="filters">
            <Select
              placeholder="Select Bus Type"
              style={{ width: "100%" }}
              onChange={handleBusTypeChange}
            >
              <Option value="Luxury">Luxury</Option>
              <Option value="Sleeper">Sleeper</Option>
              <Option value="Seater">Seater</Option>
            </Select>

            <Slider
              range
              defaultValue={priceRange}
              max={5000}
              onChange={handlePriceChange}
              style={{ width: "100%", marginTop: 20 }}
            />

            <Input.Search
              placeholder="Search by route..."
              onSearch={(value) => {
                const filtered = buses.filter((bus) =>
                  bus.route.toLowerCase().includes(value.toLowerCase())
                );
                setFilteredBuses(filtered);
              }}
              style={{ width: "100%", marginTop: 20 }}
            />

            <Select
              placeholder="Sort Buses"
              style={{ width: "100%", marginTop: 20 }}
              onChange={handleSortChange}
            >
              <Option value="price">Price</Option>
              <Option value="departureTime">Departure Time</Option>
              <Option value="rating">Rating</Option>
            </Select>

            <Checkbox.Group className="option"
              style={{ marginTop: 20, }}
              options={["WiFi", "AC", "Charging Ports"]}
              onChange={handleAmenityChange}
            />
          </div>
        </Card>

        <Table
          dataSource={filteredBuses}
          columns={[
            {
              title: "Bus Name",
              dataIndex: "name",
              key: "name",
              render: (name) => (
                <strong style={{ color: "#ff5722" }}>{name}</strong>
              ),
            },
            { title: "Type", dataIndex: "type", key: "type" },
            {
              title: "Price",
              dataIndex: "price",
              key: "price",
              render: (price) => <strong>₹{price}</strong>,
            },
            {
              title: "Available Seats",
              dataIndex: "availableSeats",
              key: "availableSeats",
              render: (seats) => (
                <Tag color={seats > 10 ? "green" : "volcano"}>
                  {seats > 0 ? `${seats} available` : "Sold Out"}
                </Tag>
              ),
            },
            { title: "Route", dataIndex: "route", key: "route" },
            {
              title: "Rating",
              dataIndex: "rating",
              key: "rating",
              render: (rating) => (
                <span>
                  {rating} <StarOutlined />
                </span>
              ),
            },
            {
              title: "Action",
              key: "action",
              render: (bus) => (
                <>
                  <Button type="primary" onClick={() => showBusDetails(bus)}>
                    View Details
                  </Button>
                  <Button
                    style={{ marginLeft: 10 }}
                    icon={
                      favorites.includes(bus.id) ? (
                        <HeartFilled style={{ color: "red" }} />
                      ) : (
                        <HeartOutlined />
                      )
                    }
                    onClick={() => toggleFavorite(bus.id)}
                  >
                    {favorites.includes(bus.id) ? "Favorited" : "Favorite"}
                  </Button>
                </>
              ),
            },
          ]}
          scroll={{ x: "100%" }}
        />
      </div>
      <Footer />
    </>
  );
};

export default BusesPage;
