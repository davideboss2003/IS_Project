import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import "../css/MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  // State for reviews from the backend
  const [comments, setComments] = useState([]);

  // Form inputs
  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");

  // 1) Fetch movie data (from TMDB or your own API) & reviews (from your Node server)
  useEffect(() => {
    // Fetch the movie details
    const fetchMovieData = async () => {
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    // Fetch the reviews for this movie from your Node/Express backend
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/reviews/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        // data is an array of reviews from MongoDB
        setComments(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchMovieData();
    fetchReviews();
  }, [id]);

  // Show a loading message while the movie data is being fetched
  if (!movie) return <div>Loading...</div>;

  // 2) Handle form submission to post a new review
  const handleAddComment = async (e) => {
    e.preventDefault();

    // Basic validation for empty text
    if (!commentText.trim()) return;

    try {
      // POST the new review to your Node backend
      const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: commentAuthor || "Anonymous",
          text: commentText.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post review");
      }

      // The backend returns the newly created review object
      const newReview = await response.json();

      // Update state so it shows up immediately in the list
      setComments((prev) => [newReview, ...prev]);

      // Reset the form
      setCommentAuthor("");
      setCommentText("");
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  return (
    <div className="movie-detail">
      {/* Banner, poster, etc. */}
      <div className="movie-banner">
        <img
          className="banner-img"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />
        <div className="movie-banner-overlay">
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-text">
            <h1>
              {movie.title} ({new Date(movie.release_date).getFullYear()})
            </h1>
            <div className="movie-genres">
              {movie.genres.map((genre) => genre.name).join(", ")}
            </div>
            <p className="movie-overview">{movie.overview}</p>
            <div className="movie-details">
              <div>
                <strong>Release Date:</strong> {movie.release_date}
              </div>
              <div>
                <strong>Rating:</strong> {movie.vote_average}/10
              </div>
              <div>
                <strong>Runtime:</strong> {movie.runtime} mins
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="review-section">
        <h2>Reviews</h2>

        {/* Existing reviews from MongoDB */}
        {comments.length > 0 ? (
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment._id} className="comment-item">
                <p>
                  <strong>{comment.author}:</strong> {comment.text}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet. Be the first to leave a review!</p>
        )}

        {/* Form for adding a new review */}
        <form className="comment-form" onSubmit={handleAddComment}>
          <label>
            Your Name
            <input
              type="text"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              placeholder="Optional"
            />
          </label>
          <label>
            Your Comment
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
              placeholder="Write your review here..."
            />
          </label>
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  );
}

export default MovieDetail;
