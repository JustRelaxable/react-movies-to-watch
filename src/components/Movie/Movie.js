import { useContext, useEffect, useState } from "react";
import styles from "./Movie.module.css";

import { CorsURLContext } from "../../App";

const Movie = ({ movieID, selectedMovie, setMovie }) => {
  const [movieData, setMovieData] = useState(null);
  const corsUrl = useContext(CorsURLContext);
  useEffect(() => {
    async function getMovieData() {
      const fetchedData = await fetch(
        `${corsUrl}https://v3.sg.media-imdb.com/suggestion/x/${movieID}.json`
      ).then((x) => x.json());
      setMovieData(fetchedData);
    }
    getMovieData();
  }, []);

  function showMovieDetails() {
    setMovie({
      title: movieData.d[0].l,
      director: movieData.d[0].s,
      imgSrc: movieData.d[0].i.imageUrl,
      key: movieID,
      movieID: movieID,
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
