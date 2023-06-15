import { useContext, useEffect, useMemo, useState } from "react";
import styles from "./Movie.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { CorsURLContext } from "../../App";

const Movie = ({ movieID, selectedMovie, setMovie, loadMovieData }) => {
  const [movieData, setMovieData] = useState(null);
  const [movieImgLoaded, setMovieImgLoaded] = useState(false);
  const corsUrl = useContext(CorsURLContext);

  useEffect(() => {
    if (!loadMovieData) return;
    if (movieData !== null) return;
    async function getMovieData() {
      await fetch(
        `${corsUrl}https://v3.sg.media-imdb.com/suggestion/x/${movieID}.json`
      )
        .then((x) => x.json())
        .then((x) => setMovieData(x));
    }
    getMovieData();
  }, [loadMovieData]);

  function showMovieDetails() {
    setMovie({
      title: movieData.d[0].l,
      director: movieData.d[0].s,
      imgSrc: movieData.d[0].i.imageUrl,
      key: movieID,
      movieID: movieID,
    });
  }

  const movieImageStyle = movieImgLoaded
    ? { display: "block" }
    : { display: "none" };

  const componentDisplay = loadMovieData
    ? { display: "block" }
    : { display: "none" };

  return (
    <>
      {movieData && (
        <div
          className={styles.container}
          onClick={showMovieDetails}
          style={componentDisplay}
        >
          {!movieImgLoaded && <LoadingSpinner />}
          <img
            style={movieImageStyle}
            className={styles.img}
            src={movieData.d[0].i.imageUrl}
            onLoad={() => {
              setMovieImgLoaded(true);
            }}
          />
          <div className={styles["container-text"]}>
            <p className={styles.title}>{movieData.d[0].l}</p>
            <p className={styles.director}>{movieData.d[0].s}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
