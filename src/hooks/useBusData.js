import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to manage bus-related data
const useBusData = () => {
  const [buses, setBuses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch buses data
  const fetchBuses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/buses");
      setBuses(response.data);
    } catch (err) {
      setError("Error fetching bus data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch reviews for buses
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/reviews");
      setReviews(response.data);
    } catch (err) {
      setError("Error fetching reviews");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Refresh bus and review data (can be used on user actions)
  const refreshData = () => {
    fetchBuses();
    fetchReviews();
  };

  useEffect(() => {
    // Fetch bus and review data when the component mounts
    fetchBuses();
    fetchReviews();
  }, []);

  return {
    buses,
    reviews,
    loading,
    error,
    refreshData, // Optional refresh method
  };
};

export default useBusData;
