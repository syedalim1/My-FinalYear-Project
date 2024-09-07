// notificationService.js
const nodemailer = require("nodemailer");

const sendEmailNotification = async (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use a service provider (e.g., Gmail, SendGrid, etc.)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  sendEmailNotification,
};
