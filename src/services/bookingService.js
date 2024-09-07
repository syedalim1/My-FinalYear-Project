import axios from "axios";

export const bookBus = async (busId, formData) => {
  const response = await axios.post("/api/booking", { busId, ...formData });
  return response.data;
};

export const fetchUserBookings = async (userId) => {
  const response = await axios.get(`/api/booking/user/${userId}`);
  return response.data;
};
