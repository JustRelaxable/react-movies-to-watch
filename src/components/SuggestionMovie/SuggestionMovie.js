import styles from "./SuggestionMovie.module.css";

const SuggestionMovie = ({ imgSrc, title, subheader, index }) => {
  return (
    <div
      className={styles["img-container"]}
      style={{ left: `${index * 100}%` }}
    >
      <img className={styles.img} src={imgSrc}></img>
      <div className={styles["movie-img-text-container"]}>
        <p className={styles["primary-text"]}>{title}</p>
        <p className={styles["secondary-text"]}>{subheader}</p>
      </div>
    </div>
  );
};

export default SuggestionMovie;
