// seedData.js
const mongoose = require("mongoose");
const Bus = require("./models/Bus"); // Import the Bus model

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

const seedBuses = async () => {
  try {
    // Define some sample buses
    const buses = [
      {
        name: "Luxury Bus",
        type: "Luxury",
        price: 1200,
        availableSeats: 15,
        route: "New York - Washington",
        rating: 4.5,
        departureTime: "10:00 AM",
        arrivalTime: "2:00 PM",
        amenities: ["WiFi", "AC"],
      },
      {
        name: "Sleeper Bus",
        type: "Sleeper",
        price: 1000,
        availableSeats: 5,
        route: "Los Angeles - San Francisco",
        rating: 4.8,
        departureTime: "9:00 PM",
        arrivalTime: "6:00 AM",
        amenities: ["WiFi", "AC", "Charging Ports"],
      },
      // Add more buses as needed...
    ];

    // Insert bus data into MongoDB
    await Bus.insertMany(buses);
    console.log("Bus data seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding bus data:", error);
    mongoose.connection.close();
  }
};

seedBuses();
