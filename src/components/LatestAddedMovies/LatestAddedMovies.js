import React, { useState, useRef, useEffect } from "react";
import Button from "../Button/Button";
import Movie from "../Movie/Movie";
import MovieContainer from "../MovieContainer/MovieContainer";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import SearchResultContainer from "../SearchResultContainer/SearchResultContainer";
import styles from "./LatestAddedMovies.module.css";

const LatestAddedMovies = (props) => {
  const [addedMovies, setAddedMovies] = useState([]);
  const addedMovieCount = addedMovies.length;

  useEffect(() => {
    setAddedMovies(JSON.parse(localStorage.getItem("movies")) || []);
  }, [localStorage.getItem("movies")]);

  return (
    <div className={styles.section} style={props.style}>
      <div className={styles.header}>
        <p className={styles["section-text"]}>Latest Added Movies</p>
      </div>
      {Boolean(addedMovieCount) && (
        <>
          <MovieContainer
            setAddedMovies={setAddedMovies}
            addedMovies={addedMovies}
            selectedMovie={props.selectedMovie}
            setMovie={props.setMovie}
          ></MovieContainer>
          <Pagination></Pagination>
        </>
      )}

      {!addedMovieCount && (
        <p className={styles["no-movie-warning-text"]}>
          There is no added movie, please use search bar above to add new
          movies.
        </p>
      )}
    </div>
  );
};

export default LatestAddedMovies;
