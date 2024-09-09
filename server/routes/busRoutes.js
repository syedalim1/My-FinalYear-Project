const express = require("express");
const router = express.Router();
const Bus = require("../models/Bus"); // Ensure correct model import

// GET all buses
router.get("/", async (req, res) => {
  try {
    const buses = await Bus.find(); // Fetch all bus data from MongoDB
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching buses", error });
  }
});

module.exports = router;
