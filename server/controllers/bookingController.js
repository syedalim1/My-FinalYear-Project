const notificationService = require("../services/notificationService");

// After a successful booking
const createBooking = async (req, res) => {
  const { email, bookingDetails } = req.body;

  // Booking logic

  // Send notification to the user
  notificationService.sendEmailNotification(
    email,
    "Booking Confirmation",
    `Your booking has been confirmed. Details: ${JSON.stringify(
      bookingDetails
    )}`
  );

  res.status(201).json({ message: "Booking successful, notification sent" });
};
