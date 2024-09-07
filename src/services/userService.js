import axios from "axios";

export const fetchUserProfile = async (userId) => {
  const response = await axios.get(`/api/users/${userId}`);
  return response.data;
};

export const updateUserProfile = async (userId, newProfileData) => {
  const response = await axios.put(`/api/users/${userId}`, newProfileData);
  return response.data;
};
