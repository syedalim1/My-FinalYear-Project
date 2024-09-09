const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({
  onTimePerformance: { type: Number, default: 0 },
  delays: { type: Number, default: 0 },
  usage: { type: Number, default: 0 },
});

module.exports = mongoose.model("Metric", metricSchema);
