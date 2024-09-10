const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Alert = require("./models/Alert");
const BusRoute = require("./models/busRouteSchema");
const PerformanceMetrics = require("./models/performanceMetricsSchema");
const User = require("./models/userSchema");
const BookingRoutes = require("./routes/booking"); // Booking routes

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Import and use routes
const busRoutes = require("./routes/busRoutes"); // Import bus routes
app.use("/api/buses", busRoutes); // Ensure the route is correct
app.use("/api/bookings", BookingRoutes); // Use Booking routes

// Get all alerts
app.get("/api/alerts", async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

// Get all bus routes
app.get("/api/routes", async (req, res) => {
  try {
    const busRoutes = await BusRoute.find();
    res.json(busRoutes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching bus routes" });
  }
});

// Get performance metrics
app.get("/api/metrics", async (req, res) => {
  try {
    const metrics = await PerformanceMetrics.findOne();
    res.json(metrics);
  } catch (err) {
    res.status(500).json({ error: "Error fetching performance metrics" });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
