const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

// Dummy bus data
const busData = [
  {
    _id: 1,
    busNumber: "Bus 101",
    position: [28.7041, 77.1025],
    state: "Running",
    eta: 5,
    driver: "John",
    routeId: 1,
  },
  {
    _id: 2,
    busNumber: "Bus 202",
    position: [28.7041, 77.2125],
    state: "Delayed",
    eta: 10,
    driver: "Steve",
    routeId: 1,
  },
];

// API endpoint to get bus data
app.get("/api/buses", (req, res) => {
  res.json(busData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
