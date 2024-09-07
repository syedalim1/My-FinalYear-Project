import { useState } from "react";
import axios from "axios";

const ReviewPage = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    const response = await axios.post("/api/reviews", {
      userId: "123",
      busId: "456",
      rating,
      comment,
    });
    console.log(response.data);
  };

  return (
    <div>
      <h2>Submit your review</h2>
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        min="1"
        max="5"
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave your comment"
      ></textarea>
      <button onClick={submitReview}>Submit</button>
    </div>
  );
};

export default ReviewPage;
