import { useState, useEffect } from "react";
import io from "socket.io-client";

export const useRealTimeTracking = () => {
  const [busLocation, setBusLocation] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("busLocationUpdate", (data) => {
      setBusLocation(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return busLocation;
};
