import styles from "./SearchResult.module.css";

const SearchResult = (props) => {
  const onClickMovieHandler = () => {
    props.setMovie((a) => {
      const selectedMovie = {
        imgSrc: props.imgURL,
        title: props.movieTitle,
        director: props.movieDirector,
        key: props.id,
      };
      return selectedMovie;
    });
  };

  return (
    <div className={styles["search-result"]} onClick={onClickMovieHandler}>
      <img className={styles.img} src={props.imgURL}></img>
      <div className={styles["text-container"]}>
        <p className={styles.title}>{props.movieTitle}</p>
        <p className={styles.director}>{props.movieDirector}</p>
      </div>
    </div>
  );
};

export default SearchResult;
