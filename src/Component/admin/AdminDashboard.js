import React, { useState, useEffect } from "react";
import { Button, Table, Input, Select, Modal, notification, Card } from "antd";
import axios from "axios";
import "./AdminDashboard.css";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const { Option } = Select;

const AdminDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [busRoutes, setBusRoutes] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({});
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [newAlert, setNewAlert] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    // Fetch initial data
    fetchAlerts();
    fetchBusRoutes();
    fetchPerformanceMetrics();
    fetchUsers();
    fetchBookings();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get("/api/alerts");
      setAlerts(response.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  const fetchBusRoutes = async () => {
    try {
      const response = await axios.get("/api/routes");
      setBusRoutes(response.data);
    } catch (error) {
      console.error("Error fetching bus routes:", error);
    }
  };

  const fetchPerformanceMetrics = async () => {
    try {
      const response = await axios.get("/api/metrics");
      setPerformanceMetrics(response.data);
    } catch (error) {
      console.error("Error fetching performance metrics:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get("/api/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleSendAlert = async () => {
    try {
      await axios.post("/api/alerts", { message: newAlert });
      notification.success({
        message: "Alert Sent",
        description: "The alert has been successfully sent.",
      });
      setIsAlertModalVisible(false);
      setNewAlert("");
      fetchAlerts();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to send alert.",
      });
    }
  };

  const handleReportGeneration = () => {
    // Logic for generating reports
    setIsReportModalVisible(false);
  };

  return (
    <>
      <Header />
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <Button type="primary" onClick={() => setIsAlertModalVisible(true)}>
            Send Alert
          </Button>
          <Button type="default" onClick={() => setIsReportModalVisible(true)}>
            Generate Report
          </Button>
        </div>

        <Card title="Real-time Alerts">
          <Table
            dataSource={alerts}
            columns={[
              { title: "Timestamp", dataIndex: "timestamp", key: "timestamp" },
              { title: "Alert", dataIndex: "message", key: "message" },
            ]}
          />
        </Card>

        <Card title="Bus Routes Management">
          <Select
            style={{ width: "100%" }}
            placeholder="Select a route to manage"
            onChange={(value) => setSelectedRoute(value)}
          >
            {busRoutes.map((route) => (
              <Option key={route.id} value={route.id}>
                {route.name}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            onClick={() => {
              /* Add/Update/Delete route logic */
            }}
          >
            Manage Route
          </Button>
        </Card>

        <Card title="Bus Performance Metrics">
          <div>
            <h3>Real-time Metrics:</h3>
            <p>On-time Performance: {performanceMetrics.onTimePerformance}</p>
            <p>Delays: {performanceMetrics.delays}</p>
            <p>Usage Statistics: {performanceMetrics.usage}</p>
          </div>
        </Card>

        <Card title="User Management">
          <Table
            dataSource={users}
            columns={[
              { title: "Name", dataIndex: "name", key: "name" },
              { title: "Email", dataIndex: "email", key: "email" },
              {
                title: "Actions",
                key: "actions",
                render: (text, record) => (
                  <Button
                    onClick={() => {
                      /* Block/Unblock user logic */
                    }}
                  >
                    Block/Unblock
                  </Button>
                ),
              },
            ]}
          />
        </Card>

        <Card title="Booking Analytics">
          <div>
            <h3>Booking Statistics:</h3>
            <p>Total Bookings: {bookings.length}</p>
            <p>Peak Times: {/* Calculate peak times */}</p>
          </div>
        </Card>

        {/* Modals */}
        <Modal
          title="Send Alert"
          visible={isAlertModalVisible}
          onOk={handleSendAlert}
          onCancel={() => setIsAlertModalVisible(false)}
        >
          <Input.TextArea
            rows={4}
            value={newAlert}
            onChange={(e) => setNewAlert(e.target.value)}
            placeholder="Enter the alert message"
          />
        </Modal>

        <Modal
          title="Generate Report"
          visible={isReportModalVisible}
          onOk={handleReportGeneration}
          onCancel={() => setIsReportModalVisible(false)}
        >
          <p>Report generation options here...</p>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
