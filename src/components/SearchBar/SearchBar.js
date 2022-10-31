import React, { useState, useRef, useEffect } from "react";
import SearchResultContainer from "../SearchResultContainer/SearchResultContainer";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [firstFocus, setFirstFocus] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [searchKey, setSearchKey] = useState("Search movies to add");

  useEffect(() => {
    const searchTimer = setTimeout(sendMovieSearchRequest, 500);
    return () => {
      clearTimeout(searchTimer);
    };
  }, [searchKey]);

  useEffect(() => {
    if (!firstFocus) {
      setSearchKey("Search movies to add");
    }
  }, [props.selectedMovie]);

  useEffect(() => {
    props.setHeight(searchResult.length * 20);
  }, [searchResult]);

  const sendMovieSearchRequest = async () => {
    const response = await fetch(
      `https://cors-proxy-222.herokuapp.com/https://v3.sg.media-imdb.com/suggestion/x/${searchKey}.json?includeVideos=0`
    );
    const data = await response.json();
    const movies = data.d.filter(
      (x) => x["qid"] === "movie" && Object.hasOwn(x, "i")
    );
    setSearchResult(movies);
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
          ref={props.refValue}
          onChange={onMovieInputChangeHandler}
          onFocus={onFocusInputHandler}
          className={styles["searchbar-input"]}
          type="text"
          value={searchKey}
        ></input>
        <p>A</p>
        <SearchResultContainer
          movies={searchResult}
          setMovie={props.setMovie}
        ></SearchResultContainer>
      </div>
    </div>
  );
};

export default SearchBar;
