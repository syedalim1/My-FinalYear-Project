const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  busRoute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BusRoute",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  time: {
    type: Date,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
