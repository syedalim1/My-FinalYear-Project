import React, { useState, useEffect } from "react";
import { Button, Table, Card, Progress } from "antd";
import axios from "axios";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [busRoutes, setBusRoutes] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({});
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    fetchAlerts();
    fetchBusRoutes();
    fetchPerformanceMetrics();
    fetchUsers();
    fetchBookings();
  }, []);

  // Fetch Alerts from backend
  const fetchAlerts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/alerts");
      setAlerts(response.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  // Fetch Bus Routes from backend
  const fetchBusRoutes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/routes");
      setBusRoutes(response.data);
    } catch (error) {
      console.error("Error fetching bus routes:", error);
    }
  };

  // Fetch Performance Metrics from backend
  const fetchPerformanceMetrics = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/metrics");
      setPerformanceMetrics(response.data);
    } catch (error) {
      console.error("Error fetching performance metrics:", error);
    }
  };

  // Fetch Users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch Bookings from backend
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="admin-dashboard">
        {/* Alerts Section */}
        <Card title="Real-time Alerts">
          <Table
            dataSource={alerts}
            columns={[
              { title: "Timestamp", dataIndex: "timestamp", key: "timestamp" },
              { title: "Alert", dataIndex: "message", key: "message" },
            ]}
          />
        </Card>

        {/* Bus Routes Section */}
        <Card title="Bus Routes">
          <Table
            dataSource={busRoutes}
            columns={[
              { title: "Route Name", dataIndex: "name", key: "name" },
              {
                title: "Start Time",
                dataIndex: ["schedule", "start"],
                key: "schedule.start",
              },
              {
                title: "End Time",
                dataIndex: ["schedule", "end"],
                key: "schedule.end",
              },
            ]}
          />
        </Card>

        {/* Performance Metrics Section */}
        <Card title="Bus Performance Metrics">
          <h3>On-time Performance</h3>
          <Progress percent={performanceMetrics.onTimePerformance} />
          <h3>Delays</h3>
          <Progress percent={performanceMetrics.delays} status="exception" />
          <h3>Usage Statistics</h3>
          <Progress percent={performanceMetrics.usage} />
        </Card>

        {/* Users Section */}
        <Card title="User Management">
          <Table
            dataSource={users}
            columns={[
              { title: "Name", dataIndex: "name", key: "name" },
              { title: "Email", dataIndex: "email", key: "email" },
            ]}
          />
        </Card>

        {/* Booking Analytics Section */}
        <Card title="Booking Analytics">
          <Table
            dataSource={bookings}
            columns={[
              {
                title: "Bus Route",
                dataIndex: ["busRoute", "name"],
                key: "busRoute.name",
              },
              { title: "User", dataIndex: ["user", "name"], key: "user.name" },
              { title: "Booking Time", dataIndex: "time", key: "time" },
              { title: "Total Seats", dataIndex: "total", key: "total" },
            ]}
          />
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
