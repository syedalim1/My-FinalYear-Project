const mongoose = require("mongoose");

const performanceMetricsSchema = new mongoose.Schema({
  onTimePerformance: {
    type: Number,
    required: true,
  },
  delays: {
    type: Number,
    required: true,
  },
  usage: {
    type: Number,
    required: true,
  },
});

const PerformanceMetrics = mongoose.model(
  "PerformanceMetrics",
  performanceMetricsSchema
);

module.exports = PerformanceMetrics;
