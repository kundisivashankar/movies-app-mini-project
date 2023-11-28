import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import Cookies from "js-cookie";

import Footer from "../Footer";
import Header from "../Header";
import ReactSlick from "../ReactSlick";

import "./index.css";

// https://apis.ccbp.in/movies-app/popular-movies
const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Home = () => {
  const [originalsResponse, setOriginalsResponse] = useState({
    apiStatus: apiStatusConstants.initial,
    data: [],
  });
  const [TrendingResponse, setTrendingResponse] = useState({
    apiStatus: apiStatusConstants.initial,
    data: [],
  });

  const getUpdatedData = (movies) =>
    movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
      overview: movie.overview,
    }));

  const getOriginalsMoviesData = async () => {
    setOriginalsResponse((prevState) => ({
      ...prevState,
      apiStatus: apiStatusConstants.inProgress,
    }));
    const apiUrl = "https://apis.ccbp.in/movies-app/originals";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt_token")}`,
      },
    };

    const response = await fetch(apiUrl, options);
    const data = await response.json();

    if (response.ok) {
      setOriginalsResponse((prevState) => ({
        ...prevState,
        apiStatus: apiStatusConstants.success,
        data: getUpdatedData(data.results),
      }));
    } else {
      setOriginalsResponse((prevState) => ({
        ...prevState,
        apiStatus: apiStatusConstants.failure,
      }));
    }
  };
  useEffect(() => {
    getOriginalsMoviesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTrendingMoviesData = async () => {
    setTrendingResponse((prevState) => ({
      ...prevState,
      apiStatus: apiStatusConstants.inProgress,
    }));
    const apiUrl = "https://apis.ccbp.in/movies-app/trending-movies";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt_token")}`,
      },
    };

    const response = await fetch(apiUrl, options);
    const data = await response.json();

    if (response.ok) {
      setTrendingResponse((prevState) => ({
        ...prevState,
        apiStatus: apiStatusConstants.success,
        data: getUpdatedData(data.results),
      }));
    } else {
      setTrendingResponse((prevState) => ({
        ...prevState,
        apiStatus: apiStatusConstants.failure,
      }));
    }
  };

  useEffect(() => {
    getTrendingMoviesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLoadingView = () => (
    <div className="poster-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  );

  const renderFailureView = (isPosterView, isOriginals = false) => (
    <div className="home-failure-view">
      <img
        className={isPosterView ? "poster-failure-image" : "home-failure-image"}
        src="https://res.cloudinary.com/dktwlx0dz/image/upload/v1698042823/Movies-app/failure-view.png"
        alt="failure view"
      />
      <p className="home-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className={isPosterView ? "poster-try-again-btn" : "sm-try-again-btn"}
        onClick={
          isPosterView || isOriginals
            ? getOriginalsMoviesData
            : getTrendingMoviesData
        }
      >
        Try Again
      </button>
    </div>
  );

  const renderPosterSuccessView = (idx) => {
    const { data } = originalsResponse;
    const { title, overview, posterPath, backdropPath } =
      data[Math.ceil(Math.random() * data.length) - 1];

    return (
      <div
        className="poster-bg"
        style={{
          "--backdropPath": `url('${backdropPath}')`,
          "--posterPath": `url('${posterPath}')`,
        }}
      >
        <h1 className="poster-title">{title}</h1>
        <p className="poster-overview ">{overview}</p>
        <button type="button" className="play-btn">
          Play
        </button>
      </div>
    );
  };

  const renderPosterViews = () => {
    const { apiStatus } = originalsResponse;

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return renderFailureView(true);
      case apiStatusConstants.success:
        return renderPosterSuccessView();
      default:
        return renderLoadingView();
    }
  };

  const renderMoviesSlider = (movies) => <ReactSlick movies={movies} />;

  const renderTrendingViews = () => {
    const { apiStatus, data } = TrendingResponse;

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return renderFailureView(false);
      case apiStatusConstants.success:
        return renderMoviesSlider(data);
      default:
        return renderLoadingView();
    }
  };

  const renderOriginalsViews = () => {
    const { apiStatus, data } = originalsResponse;

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return renderFailureView(false, true);
      case apiStatusConstants.success:
        return renderMoviesSlider(data);
      default:
        return renderLoadingView();
    }
  };

  return (
    <div className="home-route-container">
      <Header />
      <div className="home-route-section">
        <div className="poster-container">{renderPosterViews()}</div>
        <h1 className="home-route-section-heading">Trending Now</h1>
        <div className="trending-movies">{renderTrendingViews()}</div>
        <h1 className="home-route-section-heading">Originals</h1>
        <div className="originals-movies">{renderOriginalsViews()}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
