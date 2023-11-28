import { useEffect, useState } from "react";
import { format } from "date-fns";

import Header from "../Header";
import Footer from "../Footer";
import MovieCard from "../MovieCard";

import "./index.css";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const MovieDetails = ({ match }) => {
  const { params } = match;
  const { id: movieId } = params;

  const [response, setResponse] = useState({
    apiStatus: apiStatusConstants.initial,
    data: [],
  });

  const getUpdatedData = (data) => ({
    adult: data.adult,
    backdropPath: data.backdrop_path,
    posterPath: data.poster_path,
    budget: data.budget,
    overview: data.overview,
    releaseDate: data.release_date,
    runtime: data.runtime,
    title: data.title,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
    genres: data.genres,
    spokenLanguages: data.spoken_languages.map((item) => ({
      id: item.id,
      englishName: item.english_name,
    })),
    similarMovies: data.similar_movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
    })),
  });

  const getMovieDetailsResponse = async () => {
    setResponse((prevState) => ({
      ...prevState,
      apiStatus: apiStatusConstants.inProgress,
    }));
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${movieId}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt_token")}`,
      },
    };
    const apiResponse = await fetch(apiUrl, options);
    const data = await apiResponse.json();
    if (apiResponse.ok) {
      setResponse((prevState) => ({
        ...prevState,
        data: getUpdatedData(data.movie_details),
        apiStatus: apiStatusConstants.success,
      }));
    } else {
      setResponse((prevState) => ({
        ...prevState,
        apiStatus: apiStatusConstants.failure,
      }));
    }
  };

  useEffect(() => {
    getMovieDetailsResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const renderSuccessView = () => {
    const { data } = response;
    const {
      adult,
      backdropPath,
      posterPath,
      budget,
      overview,
      releaseDate,
      runtime,
      title,
      voteAverage,
      voteCount,
      genres,
      spokenLanguages,
      similarMovies,
    } = data;

    const dateObj = new Date(releaseDate);
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return (
      <div className="success-view">
        <div
          className="movie-poster-section"
          style={{
            "--backdropPath": `url('${backdropPath}')`,
            "--posterPath": `url('${posterPath}')`,
          }}
        >
          <h1 className="movie-poster-title">{title}</h1>
          <div className="runtime-certification-release">
            <p className="runtime">{`${hours}h ${minutes}m`}</p>
            <p className="certification">{adult ? "A" : "U/A"}</p>
            <p className="release">{format(dateObj, "yyyy")}</p>
          </div>
          <p className="movie-poster-overview">{overview}</p>
          <button type="button" className="play-btn">
            Play
          </button>
        </div>

        <div className="movie-details-section">
          <div className="movie-details-sub-section">
            <h1 className="movie-details-section-heading">Genres</h1>
            <ul>
              {genres.map((genre) => (
                <li key={genre.id}>
                  <p className="movie-details-section-text">{genre.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="movie-details-sub-section">
            <h1 className="movie-details-section-heading">Audio Available</h1>
            <ul>
              {spokenLanguages.map((lang) => (
                <li key={lang.id}>
                  <p className="movie-details-section-text">
                    {lang.englishName}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="movie-details-sub-section">
            <h1 className="movie-details-section-heading">Rating Count</h1>
            <p className="movie-details-section-text">{voteCount}</p>
            <h1 className="movie-details-section-heading mt-3">
              Rating Average
            </h1>
            <p className="movie-details-section-text">{voteAverage}</p>
          </div>
          <div className="movie-details-sub-section">
            <h1 className="movie-details-section-heading">Budget</h1>
            <p className="movie-details-section-text">{budget}</p>
            <h1 className="movie-details-section-heading mt-3">Release Date</h1>
            <p className="movie-details-section-text">
              {format(dateObj, "do MMMM yyyy")}
            </p>
          </div>
        </div>

        <div className="similar-movies-section">
          <h1 className="more-heading">More like this</h1>
          <ul className="similar-movies-list">
            {similarMovies.map((movie) => (
              <MovieCard key={movie.id} movieDetails={movie} />
            ))}
          </ul>
        </div>

        <Footer />
      </div>
    );
  };

  const renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  );

  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-vew-image"
        src="https://res.cloudinary.com/dktwlx0dz/image/upload/v1698042824/Movies-app/something-went-wrong.png"
        alt="failure view"
      />
      <h1 className="failure-view-heading">
        Something went wrong. Please try again
      </h1>
      <button
        type="button"
        className="try-again-btn"
        onClick={getMovieDetailsResponse}
      >
        Try Again
      </button>
    </div>
  );

  const renderMovieDetailsViews = () => {
    const { apiStatus } = response;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();

      case apiStatusConstants.failure:
        return renderFailureView();

      default:
        return renderLoadingView();
    }
  };

  return (
    <div className="movie-details-route-container">
      <Header absolute />
      {renderMovieDetailsViews()}
    </div>
  );
};

export default MovieDetails;
