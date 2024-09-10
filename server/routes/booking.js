const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingSchema"); // Adjust the path to your Booking model

// Create a new booking
router.post("/create", async (req, res) => {
  console.log("Request Body:", req.body); // Log the request body

  const { user, busRoute, totalPrice } = req.body;

  // Validate input
  if (!user || !busRoute || totalPrice === undefined) {
    console.error("Validation Error: Missing required fields");
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newBooking = new Booking({ user, busRoute, totalPrice });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    console.error("Error creating booking:", err); // Log detailed error
    res.status(500).json({ error: "Failed to create booking" });
  }
});

module.exports = router;
