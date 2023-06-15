import React, { useState, useRef, useEffect, useContext } from "react";
import SearchResultContainer from "../SearchResultContainer/SearchResultContainer";
import styles from "./SearchBar.module.css";
import { CorsURLContext } from "../../App";

const SearchBar = ({ setMovie, selectedMovie, setHeight }) => {
  const [firstFocus, setFirstFocus] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
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
    const response = await fetch(
      `${corsUrl}https://v3.sg.media-imdb.com/suggestion/x/${searchKey}.json?includeVideos=0`
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
          //ref={refValue}
          onChange={onMovieInputChangeHandler}
          onFocus={onFocusInputHandler}
          className={styles["searchbar-input"]}
          type="text"
          placeholder="Search movies to add"
          value={searchKey}
        ></input>
        <p>A</p>
        <SearchResultContainer
          movies={searchResult}
          setMovie={setMovie}
        ></SearchResultContainer>
      </div>
    </div>
  );
};

export default SearchBar;
