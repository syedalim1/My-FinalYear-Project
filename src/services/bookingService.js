import axios from "axios";

// Base URL for your backend API
const API_BASE_URL = "http://localhost:5000"; // Update this with your actual backend URL

// Function to book a bus seat
export const bookBus = async (busId, formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, {
      busId,
      ...formData,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Booking failed");
  }
};

// Function to get bookings (optional)
export const getBookings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch bookings"
    );
  }
};

// Function to get a specific booking by ID (optional)
export const getBookingById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch booking");
  }
};
