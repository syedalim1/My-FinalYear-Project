// controllers/busController.js
const Bus = require("../models/Bus");

// Get all buses
const getBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch buses" });
  }
};

// Get bus by ID
const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bus details" });
  }
};

module.exports = { getBuses, getBusById };
