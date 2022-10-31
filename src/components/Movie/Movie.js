import { useEffect, useState } from "react";
import styles from "./Movie.module.css";
// https://m.media-amazon.com/images/M/MV5BMDU2ZmM2OTYtNzIxYy00NjM5LTliNGQtN2JmOWQzYTBmZWUzXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UX380_CR0,0,380,562_.jpg

const Movie = (props) => {
  const [movieData, setMovieData] = useState(null);
  useEffect(() => {
    async function getMovieData() {
      const fetchedData = await fetch(
        `https://cors-proxy-222.herokuapp.com/https://v3.sg.media-imdb.com/suggestion/x/${props.movieID}.json`
      ).then((x) => x.json());
      setMovieData(fetchedData);
    }
    getMovieData();
  }, []);

  function showMovieDetails() {
    props.setMovie({
      title: movieData.d[0].l,
      director: movieData.d[0].s,
      imgSrc: movieData.d[0].i.imageUrl,
      key: props.movieID,
    });
  }

  return (
    movieData && (
      <div className={styles.container} onClick={showMovieDetails}>
        <img className={styles.img} src={movieData.d[0].i.imageUrl} />
        <div className={styles["container-text"]}>
          <p className={styles.title}>{movieData.d[0].l}</p>
          <p className={styles.director}>{movieData.d[0].s}</p>
        </div>
      </div>
    )
  );
};

export default Movie;
