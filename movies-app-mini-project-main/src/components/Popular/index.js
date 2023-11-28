import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";

import Header from "../Header";
import MovieCard from "../MovieCard";
import Footer from "../Footer";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Popular = () => {
  const [response, setResponse] = useState({
    apiStatus: apiStatusConstants.initial,
    data: [],
  });

  const getUpdatedData = (movies) =>
    movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
    }));

  const getPopularMoviesData = async () => {
    setResponse((prevState) => ({
      ...prevState,
      apiStatus: apiStatusConstants.inProgress,
    }));
    const apiUrl = "https://apis.ccbp.in/movies-app/popular-movies";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt_token")}`,
      },
    };

    const response = await fetch(apiUrl, options);
    const data = await response.json();

    if (response.ok) {
      setResponse((prevState) => ({
        ...prevState,
        apiStatus: apiStatusConstants.success,
        data: getUpdatedData(data.results),
      }));
    } else {
      setResponse((prevState) => ({
        ...prevState,
        apiStatus: apiStatusConstants.failure,
      }));
    }
  };

  useEffect(() => {
    getPopularMoviesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        onClick={getPopularMoviesData}
      >
        Try Again
      </button>
    </div>
  );

  const renderSuccessView = () => {
    const { data } = response;

    return (
      <>
        <ul className="movies-list">
          {data.map((movie) => (
            <MovieCard key={movie.id} movieDetails={movie} />
          ))}
        </ul>
        <Footer />
      </>
    );
  };

  const renderPopularMoviesViews = () => {
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
    <div className="popular-route-container">
      <Header />
      {renderPopularMoviesViews()}
    </div>
  );
};

export default Popular;
