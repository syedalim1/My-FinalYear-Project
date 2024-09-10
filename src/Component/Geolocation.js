import React, { useState, useEffect } from "react";

const Geolocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setLocation({ error: error.message });
        }
      );
    } else {
      setLocation({ error: "Geolocation is not supported by this browser." });
    }
  }, []);

  return (
    <div className="geolocation">
      <h4>Your Location</h4>
      {location.error ? (
        <p>Error: {location.error}</p>
      ) : (
        <>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </>
      )}
    </div>
  );
};

export default Geolocation;
