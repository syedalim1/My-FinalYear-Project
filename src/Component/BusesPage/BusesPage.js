import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Input,
  Select,
  Slider,
  Card,
  Modal,
  notification,
  Tag,
} from "antd";
import { StarOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import busData from "./busData.json"; // Import your JSON data
import "./BusesPage.css"; // Custom CSS for colors and styling
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const { Option } = Select;

const BusesPage = () => {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [busType, setBusType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortOption, setSortOption] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    setBuses(busData);
    setFilteredBuses(busData); // Initialize the filtered buses as the entire list.
  }, []);

  const handleBusTypeChange = (value) => {
    setBusType(value);
    filterBuses(value, priceRange);
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
    filterBuses(busType, range);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    sortBuses(value);
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

  const filterBuses = (busType, priceRange) => {
    let filtered = buses;
    if (busType) {
      filtered = filtered.filter((bus) => bus.type === busType);
    }
    filtered = filtered.filter(
      (bus) => bus.price >= priceRange[0] && bus.price <= priceRange[1]
    );
    setFilteredBuses(filtered);
  };

  const toggleFavorite = (busId) => {
    if (favorites.includes(busId)) {
      setFavorites(favorites.filter((id) => id !== busId));
    } else {
      setFavorites([...favorites, busId]);
    }
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
              style={{ width: 200 }}
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
              style={{ width: "30%", marginLeft: 20 }}
            />

            <Input.Search
              placeholder="Search by route..."
              onSearch={(value) => {
                const filtered = buses.filter((bus) =>
                  bus.route.toLowerCase().includes(value.toLowerCase())
                );
                setFilteredBuses(filtered);
              }}
              style={{ width: 200, marginLeft: 20 }}
            />

            <Select
              placeholder="Sort Buses"
              style={{ width: 150, marginLeft: 20 }}
              onChange={handleSortChange}
            >
              <Option value="price">Price</Option>
              <Option value="departureTime">Departure Time</Option>
              <Option value="rating">Rating</Option>
            </Select>
          </div>
        </Card>

        <Table
          dataSource={filteredBuses}
          columns={[
            {
              title: "Bus Name",
              dataIndex: "name",
              key: "name",
            },
            { title: "Type", dataIndex: "type", key: "type" },
            {
              title: "Price",
              dataIndex: "price",
              key: "price",
              render: (price) => `₹${price}`,
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
        />
      </div>
      <Footer />
    </>
  );
};

export default BusesPage;
