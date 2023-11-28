import { useContext } from "react";
import Loader from "react-loader-spinner";

import Header from "../Header";
import MovieCard from "../MovieCard";
import Footer from "../Footer";

import SearchQueryContext from "../../context/searchQueryContext";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Search = () => {
  const { apiStatus, data, errorMsg, getSearchQueryResponse } =
    useContext(SearchQueryContext);

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
        onClick={getSearchQueryResponse}
      >
        Try Again
      </button>
    </div>
  );

  const renderEmptyView = () => (
    <div className="empty-view-container">
      <img
        className="empty-view-image"
        src="https://res.cloudinary.com/dktwlx0dz/image/upload/v1698042825/Movies-app/empty-view.png"
        alt="empty view"
      />
      <h1 className="empty-view-heading">{errorMsg}</h1>
    </div>
  );

  const renderSuccessView = () => {
    if (!data.length) return renderEmptyView();

    return (
      <>
        <ul className="search-movies-list">
          {data.map((movie) => (
            <MovieCard key={movie.id} movieDetails={movie} />
          ))}
        </ul>
        {/* <Footer /> */}
      </>
    );
  };

  const renderPopularMoviesViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();

      case apiStatusConstants.failure:
        return renderFailureView();

      case apiStatusConstants.inProgress:
        return renderLoadingView();

      default:
        return null;
    }
  };

  return (
    <div className="search-route-container">
      <Header showSearchBar />
      {renderPopularMoviesViews()}
    </div>
  );
};

export default Search;
