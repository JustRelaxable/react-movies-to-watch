import React, { useState, useRef, useEffect } from "react";
import Button from "../Button/Button";
import Movie from "../Movie/Movie";
import MovieContainer from "../MovieContainer/MovieContainer";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import SearchResultContainer from "../SearchResultContainer/SearchResultContainer";
import styles from "./LatestAddedMovies.module.css";

const LatestAddedMovies = ({ style, selectedMovie, setMovie }) => {
  const maxMoviesPerPage = 8;
  const [addedMovies, setAddedMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const addedMovieCount = addedMovies.length;
  const pageCount = Math.ceil(addedMovieCount / maxMoviesPerPage);
  const [renderedMovies, setRenderedMovies] = useState([]);

  useEffect(() => {
    setRenderedMovies(
      addedMovies.slice(
        (pageNumber - 1) * maxMoviesPerPage,
        (pageNumber - 1) * maxMoviesPerPage + 8
      )
    );
  }, [pageNumber, addedMovies]);

  useEffect(() => {
    setAddedMovies(JSON.parse(localStorage.getItem("movies")) || []);
  }, [localStorage.getItem("movies")]);

  return (
    <div className={styles.section} style={style}>
      <div className={styles.header}>
        <p className={styles["section-text"]}>Latest Added Movies</p>
      </div>
      {Boolean(addedMovieCount) && (
        <>
          <MovieContainer
            setAddedMovies={setAddedMovies}
            renderedMovies={renderedMovies}
            addedMovies={addedMovies}
            selectedMovie={selectedMovie}
            setMovie={setMovie}
          ></MovieContainer>
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pageCount={pageCount}
          ></Pagination>
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
