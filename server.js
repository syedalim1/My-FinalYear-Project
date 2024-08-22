const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
const port = 5000;

// Dummy bus data
const buses = [
  { id: 1, route: "Route A", latitude: 12.9716, longitude: 77.5946 }, // Bangalore
  { id: 2, route: "Route B", latitude: 19.076, longitude: 72.8777 }, // Mumbai
  { id: 3, route: "Route C", latitude: 28.6139, longitude: 77.209 }, // Delhi
];

app.use(cors());
app.use(express.json());

// Endpoint to get all bus locations
app.get("/api/buses", (req, res) => {
  res.json(buses);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
