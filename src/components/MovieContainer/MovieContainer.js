import styles from "./MovieContainer.module.css";
import Movie from "../Movie/Movie";

const MovieContainer = (props) => {
  return (
    <div className={styles.container}>
      {props.addedMovies.map((e, i) => {
        return (
          <Movie
            key={`movie-${i}`}
            movieID={e}
            selectedMovie={props.selectedMovie}
            setMovie={props.setMovie}
          ></Movie>
        );
      })}
    </div>
  );
};

export default MovieContainer;
