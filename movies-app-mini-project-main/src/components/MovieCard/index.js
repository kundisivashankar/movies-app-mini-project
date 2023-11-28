import { Link } from "react-router-dom";

import "./index.css";

const MovieCard = ({ movieDetails }) => {
  const { id, posterPath, title } = movieDetails;

  return (
    <li className="movie-card-container">
      <Link to={`/movies/${id}`}>
        <img src={posterPath} alt={title} className="movie-card-image" />
      </Link>
    </li>
  );
};

export default MovieCard;
