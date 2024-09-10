// seed.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

// Import the Alert model
const Alert = require("./models/Alert");

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/busTrackingDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Dummy alerts to seed the database
const dummyAlerts = [
  { message: "Bus 101 delayed by 10 minutes" },
  { message: "Bus 202 delayed by 5 minutes" },
  { message: "Route 303 maintenance scheduled for tomorrow" },
  { message: "Bus 404 added to Route 101" },
  { message: "Bus 505 rerouted due to roadwork" },
];

// Function to seed the database with dummy alerts
const seedDatabase = async () => {
  try {
    await Alert.deleteMany(); // Clear existing data
    await Alert.insertMany(dummyAlerts); // Insert dummy alerts
    console.log("Dummy alerts added");
  } catch (err) {
    console.error("Error seeding alerts:", err);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase();
