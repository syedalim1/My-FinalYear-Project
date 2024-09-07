const { Server } = require("socket.io");

const setupRealTimeTracking = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected to bus tracking");

    // Emit bus locations every 30 seconds
    setInterval(() => {
      const busData = { id: "Bus1", lat: 12.9716, lng: 77.5946 }; // Example data
      socket.emit("busLocationUpdate", busData);
    }, 30000);

    socket.on("disconnect", () => {
      console.log("User disconnected from bus tracking");
    });
  });
};

module.exports = setupRealTimeTracking;
