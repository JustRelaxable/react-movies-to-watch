import React, { useState, useRef, useEffect, useContext } from "react";
import SearchResultContainer from "../SearchResultContainer/SearchResultContainer";
import styles from "./SearchBar.module.css";
import { CorsURLContext } from "../../App";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const SearchBar = ({ setMovie, selectedMovie, setHeight }) => {
  const [firstFocus, setFirstFocus] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [waitingSearchResult, setWaitingSearchResult] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const corsUrl = useContext(CorsURLContext);

  useEffect(() => {
    if (searchKey === "") {
      setSearchResult([]);
      return;
    }
    const searchTimer = setTimeout(sendMovieSearchRequest, 500);
    return () => {
      clearTimeout(searchTimer);
    };
  }, [searchKey]);

  useEffect(() => {
    if (!firstFocus) {
      setSearchKey("");
    }
  }, [selectedMovie]);

  useEffect(() => {
    setHeight(searchResult.length * 20);
  }, [searchResult]);

  const sendMovieSearchRequest = async () => {
    setWaitingSearchResult(true);
    const response = await fetch(
      `${corsUrl}https://v3.sg.media-imdb.com/suggestion/x/${searchKey}.json?includeVideos=0`
    );
    const data = await response.json();
    const movies = data.d.filter(
      (x) => x["qid"] === "movie" && Object.hasOwn(x, "i")
    );
    setSearchResult(movies);
    setWaitingSearchResult(false);
  };

  const onMovieInputChangeHandler = (e) => {
    setSearchKey(e.target.value);
  };

  const onFocusInputHandler = () => {
    if (firstFocus) {
      setFirstFocus(false);
    }
    setSearchKey("");
  };

  return (
    <div className={styles["search-container"]}>
      <p className={styles.header}>Welcome Back</p>
      <div className={styles.searchbar}>
        <input
          //ref={refValue}
          onChange={onMovieInputChangeHandler}
          onFocus={onFocusInputHandler}
          className={styles["searchbar-input"]}
          type="text"
          placeholder="Search movies to add"
          value={searchKey}
        ></input>
        {waitingSearchResult ? (
          <LoadingSpinner width={"2rem"} height={"2rem"} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={styles.magnifyingGlass}
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        )}

        <SearchResultContainer
          movies={searchResult}
          setMovie={setMovie}
        ></SearchResultContainer>
      </div>
    </div>
  );
};

export default SearchBar;
