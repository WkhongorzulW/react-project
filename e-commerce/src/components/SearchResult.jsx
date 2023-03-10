import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export default function SearchResult() {
  const [searchResult, setSearchResult] = useState([]);
  const SEARCH_URL = "http://localhost:8080/search";
  const location = useLocation();
  console.log(location.state);

  return (
    <div className="text-center mt-5 pt-5">
      <h1 className="mt-5 pt-5">Search Page</h1>
      <div>{searchResult.state.data}</div>
    </div>
  );
}
