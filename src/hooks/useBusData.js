import { useState, useEffect } from "react";
import { fetchBuses } from "../services/busService";

export const useBusData = () => {
  const [busData, setBusData] = useState([]);

  useEffect(() => {
    const getBusData = async () => {
      const data = await fetchBuses();
      setBusData(data);
    };
    getBusData();
  }, []);

  return busData;
};
