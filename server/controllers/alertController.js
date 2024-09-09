const Alert = require("../models/Alert");

const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createAlert = async (req, res) => {
  try {
    const newAlert = new Alert({ message: req.body.message });
    await newAlert.save();
    res.status(201).json(newAlert);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAlerts, createAlert };
