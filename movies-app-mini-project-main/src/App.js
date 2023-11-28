import { useState } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Login from "./components/Login";
import Home from "./components/Home";
import Popular from "./components/Popular";
import Search from "./components/Search";
import Account from "./components/Account";
import MovieDetails from "./components/MovieDetails";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

import SearchQueryContext from "./context/searchQueryContext";

import "./App.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [response, setResponse] = useState({
    apiStatus: apiStatusConstants.initial,
    data: [],
    errorMsg: "",
  });

  const updateSearchInput = (text) => setSearchInput(text);

  const getUpdatedData = (movies) =>
    movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
    }));

  const getSearchQueryResponse = async () => {
    setResponse((prevState) => ({
      ...prevState,
      apiStatus: apiStatusConstants.inProgress,
    }));
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt_token")}`,
      },
    };
    const searchResponse = await fetch(apiUrl, options);
    const data = await searchResponse.json();
    if (searchResponse.ok) {
      setResponse((prevState) => ({
        ...prevState,
        data: getUpdatedData(data.results),
        apiStatus: apiStatusConstants.success,
        errorMsg:
          data.results.length === 0
            ? `Your search for ${searchInput} did not find any matches.`
            : "",
      }));
    } else {
      setResponse((prevState) => ({
        ...prevState,
        apiStatus: apiStatusConstants.failure,
      }));
    }
  };

  const value = {
    searchInput,
    updateSearchInput,
    data: response.data,
    apiStatus: response.apiStatus,
    getSearchQueryResponse,
    errorMsg: response.errorMsg,
  };

  return (
    <SearchQueryContext.Provider value={value}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/popular" component={Popular} />
        <ProtectedRoute exact path="/search" component={Search} />
        <ProtectedRoute exact path="/account" component={Account} />
        <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </SearchQueryContext.Provider>
  );
}

export default App;
