import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { fetchUserBookings } from "../services/bookingService";

const UserDashboard = ({ userId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      const response = await fetchUserBookings(userId);
      setBookings(response);
    };
    getBookings();
  }, [userId]);

  const columns = [
    { title: "Bus ID", dataIndex: "busId", key: "busId" },
    { title: "Seats", dataIndex: "seats", key: "seats" },
    { title: "Total Cost", dataIndex: "totalCost", key: "totalCost" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  return (
    <div className="user-dashboard">
      <h2>My Bookings</h2>
      <Table dataSource={bookings} columns={columns} rowKey="id" />
    </div>
  );
};

export default UserDashboard;
