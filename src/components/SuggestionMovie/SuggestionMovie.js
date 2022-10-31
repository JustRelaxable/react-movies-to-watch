import styles from "./SuggestionMovie.module.css";

const SuggestionMovie = (props) => {
  return (
    <div
      className={styles["img-container"]}
      style={{ left: `${props.index * 100}%` }}
    >
      <img className={styles.img} src={props.imgSrc}></img>
      <div className={styles["movie-img-text-container"]}>
        <p className={styles["primary-text"]}>{props.title}</p>
        <p className={styles["secondary-text"]}>{props.subheader}</p>
      </div>
    </div>
  );
};

export default SuggestionMovie;
