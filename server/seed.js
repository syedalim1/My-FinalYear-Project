// seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Import Mongoose models
const Alert = require("./models/alertSchema");
const BusRoute = require("./models/busRouteSchema");
const PerformanceMetrics = require("./models/performanceMetricsSchema");
const User = require("./models/userSchema");
const Booking = require("./models/bookingSchema");

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

// Dummy Data
const dummyAlerts = [
  { message: "Bus 101 delayed by 15 minutes" },
  { message: "New route added: Route 22" },
  { message: "Scheduled maintenance on Route 33" },
];

const dummyBusRoutes = [
  {
    name: "Route 101",
    stops: [
      {
        name: "Stop A",
        coordinates: { latitude: 40.7128, longitude: -74.006 },
      },
      {
        name: "Stop B",
        coordinates: { latitude: 40.7308, longitude: -73.9975 },
      },
    ],
    schedule: { start: "08:00 AM", end: "08:00 PM" },
  },
  {
    name: "Route 202",
    stops: [
      {
        name: "Stop C",
        coordinates: { latitude: 40.7527, longitude: -73.9772 },
      },
      {
        name: "Stop D",
        coordinates: { latitude: 40.758, longitude: -73.9855 },
      },
    ],
    schedule: { start: "09:00 AM", end: "06:00 PM" },
  },
];

const dummyPerformanceMetrics = {
  onTimePerformance: 85,
  delays: 5,
  usage: 75,
};

const dummyUsers = [
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
  { name: "Alex Johnson", email: "alex@example.com" },
];

const createDummyBookings = async () => {
  try {
    const busRoute = await BusRoute.findOne({ name: "Route 101" });
    const user = await User.findOne({ email: "john@example.com" });

    const dummyBookings = [
      {
        busRoute: busRoute._id,
        user: user._id,
        time: new Date(),
        total: 5,
      },
      {
        busRoute: busRoute._id,
        user: user._id,
        time: new Date(),
        total: 3,
      },
    ];

    await Booking.insertMany(dummyBookings);
    console.log("Dummy bookings added");
  } catch (err) {
    console.error("Error adding dummy bookings:", err.message);
  }
};

// Seed Function
const seedDatabase = async () => {
  await connectDB();

  try {
    // Clear existing data
    await Alert.deleteMany({});
    await BusRoute.deleteMany({});
    await PerformanceMetrics.deleteMany({});
    await User.deleteMany({});
    await Booking.deleteMany({});

    console.log("Existing data cleared");

    // Insert dummy data
    await Alert.insertMany(dummyAlerts);
    console.log("Dummy alerts added");

    await BusRoute.insertMany(dummyBusRoutes);
    console.log("Dummy bus routes added");

    await PerformanceMetrics.create(dummyPerformanceMetrics);
    console.log("Dummy performance metrics added");

    await User.insertMany(dummyUsers);
    console.log("Dummy users added");

    await createDummyBookings();

    console.log("All dummy data added successfully");
  } catch (err) {
    console.error("Error seeding database:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

// Run Seed
seedDatabase();
