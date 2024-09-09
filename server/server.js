// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// // Load environment variables
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((error) => console.error("MongoDB connection error:", error));
// app.use(express.json());
// // Import Routes
// // const alertRoutes = require("./routes/alertRoutes");
// // const bookingRoutes = require("./routes/bookingRoutes");
// const busRoutes = require("./routes/busRoutes"); // Import bus routes
// // const metricRoutes = require("./routes/metricRoutes"); // Ensure this is uncommented and correctly importing your route
// // const userRoutes = require("./routes/userRoutes");

// // Use Routes
// // app.use("/api/alerts", alertRoutes);
// // app.use("/api/bookingRoutes", bookingRoutes);
// app.use('/api', busRoutes); // Use bus routes
// // app.use("/api/metrics", metricRoutes); // Ensure this is correctly uncommented
// // app.use("/api/users", userRoutes);

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

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

// Import Routes
const busRoutes = require("./routes/busRoutes"); // Import bus routes

// Use Routes
app.use("/api/buses", busRoutes); // Ensure the route is correct

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
