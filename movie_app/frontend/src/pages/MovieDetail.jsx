import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import "../css/MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieData();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail">
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
    </div>
  );
}

export default MovieDetail;
