import React, { useState } from "react";
import { Button, notification } from "antd";
import "./SeatSelectionMap.css";

const SeatSelectionMap = ({ availableSeats, selectedSeats, onChange }) => {
  const [localSelectedSeats, setLocalSelectedSeats] = useState(
    selectedSeats || []
  );

  const toggleSeatSelection = (seatNumber) => {
    const isSelected = localSelectedSeats.includes(seatNumber);

    // If trying to select a seat and already 10 seats are selected, prevent further selection
    if (!isSelected && localSelectedSeats.length >= 10) {
      notification.warning({
        message: "Seat Limit Reached",
        description: "You can only select up to 10 seats.",
      });
      return;
    }

    let updatedSeats;

    if (isSelected) {
      updatedSeats = localSelectedSeats.filter((seat) => seat !== seatNumber);
    } else {
      updatedSeats = [...localSelectedSeats, seatNumber];
    }

    setLocalSelectedSeats(updatedSeats);
    onChange(updatedSeats);
  };

  return (
    <div className="seat-map">
      {[...Array(availableSeats)].map((_, i) => {
        const seatNumber = i + 1;
        const isSelected = localSelectedSeats.includes(seatNumber);

        return (
          <Button
            key={seatNumber}
            className={`seat ${isSelected ? "selected" : ""}`}
            onClick={() => toggleSeatSelection(seatNumber)}
          >
            {seatNumber}
          </Button>
        );
      })}
    </div>
  );
};

export default SeatSelectionMap;
