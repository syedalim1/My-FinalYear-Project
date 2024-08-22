import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const register = async (user) => {
  return axios.post(`${API_URL}/register`, user);
};

export const login = async (user) => {
  const response = await axios.post(`${API_URL}/login`, user);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return jwt_decode(token);
  }
  return null;
};
