import styles from "./MovieContainer.module.css";
import Movie from "../Movie/Movie";
import { useState } from "react";

const MovieContainer = ({
  setAddedMovies,
  renderedMovies,
  selectedMovie,
  setMovie,
  addedMovies,
}) => {
  return (
    <div className={styles.container}>
      {addedMovies.map((e, i) => {
        return (
          <Movie
            key={`movie-${e}`}
            movieID={e}
            selectedMovie={selectedMovie}
            setMovie={setMovie}
            loadMovieData={renderedMovies.includes(e)}
          ></Movie>
        );
      })}
    </div>
  );
};

export default MovieContainer;
