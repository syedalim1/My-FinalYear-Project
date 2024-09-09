const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header("Authorization");

  // Check if no token is provided
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }

  // Verify the token
  try {
    // Remove the 'Bearer' part if it's there
    const actualToken = token.startsWith("Bearer ")
      ? token.slice(7, token.length).trimLeft()
      : token;

    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded; // Add the user object to the request
    next(); // Continue to the next middleware or controller
  } catch (err) {
    res.status(401).json({ success: false, message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
