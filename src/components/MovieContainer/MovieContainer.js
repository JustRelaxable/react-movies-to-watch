import styles from "./MovieContainer.module.css";
import Movie from "../Movie/Movie";

const MovieContainer = ({
  setAddedMovies,
  renderedMovies,
  selectedMovie,
  setMovie,
}) => {
  return (
    <div className={styles.container}>
      {renderedMovies.map((e, i) => {
        return (
          <Movie
            key={`movie-${e}`}
            movieID={e}
            selectedMovie={selectedMovie}
            setMovie={setMovie}
          ></Movie>
        );
      })}
    </div>
  );
};

export default MovieContainer;
