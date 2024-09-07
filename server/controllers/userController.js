const User = require("../models/User");

const updateUserProfile = async (req, res) => {
  const { userId, newProfileData } = req.body;

  await User.findByIdAndUpdate(userId, newProfileData);

  res.status(200).json({ message: "Profile updated successfully" });
};
