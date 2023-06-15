import styles from "./SearchResult.module.css";

const SearchResult = ({ id, imgURL, movieTitle, movieDirector, setMovie }) => {
  const onClickMovieHandler = () => {
    setMovie((a) => {
      const selectedMovie = {
        imgSrc: imgURL,
        title: movieTitle,
        director: movieDirector,
        key: id,
        movieID: id,
      };
      return selectedMovie;
    });
  };

  return (
    <div className={styles["search-result"]} onClick={onClickMovieHandler}>
      <img className={styles.img} src={imgURL}></img>
      <div className={styles["text-container"]}>
        <p className={styles.title}>{movieTitle}</p>
        <p className={styles.director}>{movieDirector}</p>
      </div>
    </div>
  );
};

export default SearchResult;
