// src/pages/Admin.jsx
import { useState, useEffect } from "react";

function Admin() {
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1) Fetch all reviews when component mounts
  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        // Replace "http://localhost:5000" with your backend URL if different
        const response = await fetch("http://localhost:5000/api/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        setAllReviews(data); // data should be an array of review objects
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAllReviews();
  }, []);

  // 2) Handle Delete
  const handleDeleteReview = async (reviewId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!shouldDelete) return;

    try {
      // Send a DELETE request to your backend
      const response = await fetch(
        `http://localhost:5000/api/reviews/${reviewId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      // Filter out the deleted review from state
      setAllReviews((prev) => prev.filter((rev) => rev._id !== reviewId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading Reviews...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Admin - Moderate Reviews</h1>
      {allReviews.length === 0 ? (
        <p>No reviews found in the database.</p>
      ) : (
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "2px solid #ccc" }}>
              <th style={{ padding: "8px" }}>Review ID</th>
              <th style={{ padding: "8px" }}>Movie ID</th>
              <th style={{ padding: "8px" }}>Author</th>
              <th style={{ padding: "8px" }}>Text</th>
              <th style={{ padding: "8px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allReviews.map((review) => (
              <tr key={review._id} style={{ borderBottom: "1px solid #333" }}>
                <td style={{ padding: "8px" }}>{review._id}</td>
                <td style={{ padding: "8px" }}>{review.movieId}</td>
                <td style={{ padding: "8px" }}>{review.author}</td>
                <td style={{ padding: "8px" }}>{review.text}</td>
                <td style={{ padding: "8px" }}>
                  <button onClick={() => handleDeleteReview(review._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admin;
