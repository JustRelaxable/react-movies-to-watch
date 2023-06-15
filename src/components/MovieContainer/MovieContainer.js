import styles from "./MovieContainer.module.css";
import Movie from "../Movie/Movie";

const MovieContainer = ({
  setAddedMovies,
  addedMovies,
  selectedMovie,
  setMovie,
}) => {
  return (
    <div className={styles.container}>
      {addedMovies.map((e, i) => {
        return (
          <Movie
            key={`movie-${i}`}
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
