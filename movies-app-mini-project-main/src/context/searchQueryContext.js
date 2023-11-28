import { createContext } from "react";

const SearchQueryContext = createContext({
  searchInput: "",
  updateSearchInput: () => {},
  apiStatus: "INITIAL",
  data: [],
  getSearchQueryResponse: () => {},
  errorMsg: "",
});

export default SearchQueryContext;
