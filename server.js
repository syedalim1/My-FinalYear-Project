const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
// // Sample bus data for real-time tracking
// let buses = [
//   { id: 1, routeId: 1, position: [28.7041, 77.1025], state: "Running" },
//   { id: 2, routeId: 2, position: [28.7041, 77.2125], state: "Delayed" },
// ];

// // Simulate bus movement
// setInterval(() => {
//   buses = buses.map((bus) => ({
//     ...bus,
//     position: [
//       bus.position[0] + Math.random() * 0.01,
//       bus.position[1] + Math.random() * 0.01,
//     ],
//   }));
//   io.emit("bus-data", buses);
// }, 3000);

// server.listen(4000, () => console.log("Server running on port 4000"));

// server.js (Node.js + Express)
const cors = require("cors");
app.use(cors());
app.use(express.json());

const drivers = [
  {
    id: 1,
    name: "John",
    busId: 101,
    route: [
      [28.7041, 77.1025],
      [28.7941, 77.1025],
    ],
    position: [28.7041, 77.1025],
  },
];

let busStatus = "Running";

// Fetch driver bus details (simulate authenticated driver)
app.get("/api/driver/bus-details", (req, res) => {
  // Send response
  res.json({ bus: busDetails, route: routeDetails });
});


// Update the bus status
app.post("/api/driver/update-status", (req, res) => {
  busStatus = req.body.status;
  res.json({ success: true });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let users = [
  {
    id: 1,
    username: "driver1",
    password: bcrypt.hashSync("password123", 10),
    busId: 101,
  },
];

app.post("/api/driver/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(403).send("Invalid credentials");
  }

  const token = jwt.sign({ id: user.id }, "your_jwt_secret");
  res.json({ token });
});

// Middleware to protect routes
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Access denied");
  try {
    const verified = jwt.verify(token, "your_jwt_secret");
    req.user = verified;
    next();
  } catch {
    res.status(400).send("Invalid token");
  }
};

// Protect this route with authentication
app.get("/api/driver/bus-details", (req, res) => {
  const busDetails = {
    id: 101,
    routeName: "Route A",
    position: [28.7041, 77.1025],
  };
  const route = [
    [28.7041, 77.1025],
    [28.7941, 77.1025],
  ];

  res.json({ bus: busDetails, route });
});
