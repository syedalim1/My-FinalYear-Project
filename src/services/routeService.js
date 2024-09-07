import axios from "axios";

export const fetchOptimizedRoute = async (routeData) => {
  const response = await axios.post("/api/optimizedRoute", { routeData });
  return response.data.optimizedRoute;
};
