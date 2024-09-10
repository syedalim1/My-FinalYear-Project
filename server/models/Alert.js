// models/Alert.js

const mongoose = require("mongoose");

// Define the Alert schema
const alertSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Alert model
const Alert = mongoose.model("Alert", alertSchema);
module.exports = Alert;
