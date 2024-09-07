const Review = require("../models/Review");

const createReview = async (req, res) => {
  const { userId, busId, rating, comment } = req.body;

  const review = new Review({
    user: userId,
    bus: busId,
    rating,
    comment,
  });

  await review.save();
  res.status(201).json({ message: "Review submitted successfully" });
};
