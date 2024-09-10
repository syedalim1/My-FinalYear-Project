const mongoose = require("mongoose");

const busRouteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stops: [
    {
      name: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
  ],
  schedule: {
    start: String,
    end: String,
  },
});

const BusRoute = mongoose.model("BusRoute", busRouteSchema);

module.exports = BusRoute;
