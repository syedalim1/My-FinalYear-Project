const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/authMiddleware");

// Create a new booking
router.post("/", authMiddleware, async (req, res) => {
  try {
    const booking = new Booking({
      user: req.user.id, // assuming authenticated user's ID is stored in JWT
      bus: req.body.busId,
      seatsBooked: req.body.seatsBooked,
      totalPrice: req.body.totalPrice,
    });
    await booking.save();
    res.json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Get all bookings for a user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("bus");
    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Get a booking by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("bus");
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res.json({ success: true, booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Cancel a booking
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    await booking.remove();
    res.json({ success: true, message: "Booking canceled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
