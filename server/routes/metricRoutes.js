const express = require("express");
const router = express.Router();

// Example route to fetch metrics
router.get("/metrics", (req, res) => {
  res.json({
    status: "success",
    data: {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    },
  });
});

module.exports = router;
