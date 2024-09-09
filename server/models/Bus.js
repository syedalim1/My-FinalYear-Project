const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  availableSeats: Number,
  route: String,
  rating: Number,
  departureTime: String,
  arrivalTime: String,
  amenities: [String],
});

module.exports = mongoose.model("Bus", busSchema);
