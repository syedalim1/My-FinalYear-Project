const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Bus = require("../models/Bus");
const Alert = require("../models/Alert");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Send an alert
router.post("/alerts", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const alert = new Alert({
      message: req.body.message,
    });
    await alert.save();
    res.json({ success: true, message: "Alert sent successfully", alert });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Get all users
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Block/Unblock user
router.put(
  "/users/:id/block",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      user.isBlocked = !user.isBlocked;
      await user.save();
      res.json({
        success: true,
        message: "User block/unblock status updated",
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

// Manage buses
router.post("/buses", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.json({ success: true, message: "Bus added successfully", bus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.put("/buses/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ success: false, message: "Bus not found" });
    }

    Object.assign(bus, req.body);
    await bus.save();
    res.json({ success: true, message: "Bus updated successfully", bus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
