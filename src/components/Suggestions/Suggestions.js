import styles from "./Suggestions.module.css";
import SuggestionMovie from "../SuggestionMovie/SuggestionMovie";
import { useContext, useEffect, useState } from "react";
import loadingSpinner from "../../svg-loaders/rings.svg";

import { CorsURLContext } from "../../App";

const Suggestions = ({ style }) => {
  const movieCount = 6;
  const movieSlideTime = 10000;
  const timeBarRefreshTime = 100;
  const [touchStartX, setTouchStartX] = useState(0);
  const [timeBarWidth, setTimeBarWidth] = useState(0);
  const [movieIndex, setMovieIndex] = useState(0);
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const moviesReady = suggestedMovies.length > 0;
  const corsUrl = useContext(CorsURLContext);

  useEffect(() => {
    async function fetchSuggestedMovies() {
      const fetchedDocument = fetch(`${corsUrl}https://m.imdb.com/`)
        .then((x) => x.text())
        .then((x) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(x, "text/html");
          return doc;
        });
      const suggestedMovieTitles = await fetchedDocument
        .then((x) => x.querySelectorAll(".sc-84f23e63-4.gOGhjH"))
        .then((x) => Array.from(x).map((x) => x.innerText));

      const suggestedMovieSubheaders = await fetchedDocument
        .then((x) => x.querySelectorAll(".sc-84f23e63-3.cRoTpH"))
        .then((x) => Array.from(x).map((x) => x.innerText));

      const suggestedMoviePictureSources = await fetchedDocument
        .then((x) =>
          x.querySelectorAll(".sc-bffbe2eb-1>.ipc-slate>.ipc-media>.ipc-image")
        )
        .then((x) => Array.from(x).map((x) => x.src));

      const fetchedSuggestedMovies = [];
      for (let i = 0; i < movieCount; i++) {
        fetchedSuggestedMovies.push({
          title: suggestedMovieTitles[i],
          subheader: suggestedMovieSubheaders[i],
          imgSrc: suggestedMoviePictureSources[i],
        });
      }

      setSuggestedMovies(fetchedSuggestedMovies);
    }

    fetchSuggestedMovies();
  }, []);

  useEffect(() => {
    const slide = setTimeout(() => {
      setMovieIndex((previous) => {
        if (previous === movieCount - 1) return 0;
        else return previous + 1;
      });
    }, movieSlideTime);
    setTimeBarWidth(0);
    const interval = setInterval(() => {
      setTimeBarWidth((prev) => {
        return prev + 100 / (movieSlideTime / timeBarRefreshTime);
      });
    }, timeBarRefreshTime);
    return () => {
      clearTimeout(slide);
      clearInterval(interval);
    };
  }, [movieIndex]);

  function safeSetMovieIndex(change) {
    if (change > 0) {
      setMovieIndex((prev) => {
        if (prev === movieCount - 1) return 0;
        else return prev + 1;
      });
    } else if (change < 0) {
      setMovieIndex((prev) => {
        if (prev === 0) return movieCount - 1;
        else return prev - 1;
      });
    }
  }

  return (
    <div
      style={style}
      className={styles.content}
      onTouchStart={(e) => {
        setTouchStartX(e.changedTouches[0].clientX);
      }}
      onTouchEnd={(e) => {
        if (e.changedTouches[0].clientX - touchStartX > 0) {
          safeSetMovieIndex(-1);
        } else {
          safeSetMovieIndex(1);
        }
      }}
    >
      <p className={styles.header}>Suggestions</p>
      <div className={styles["movie-content"]}>
        {!moviesReady && (
          <div className={styles["loading-spinner-container"]}>
            <img
              src={loadingSpinner}
              className={styles["loading-spinner"]}
            ></img>
          </div>
        )}
        {moviesReady && (
          <>
            {suggestedMovies.map((e, i) => (
              <SuggestionMovie
                imgSrc={e.imgSrc}
                title={e.title}
                subheader={e.subheader}
                index={i - movieIndex}
                key={`suggested-movie-${i}`}
              ></SuggestionMovie>
            ))}
            <div
              className={styles["time-bar"]}
              style={{ width: `${timeBarWidth}%` }}
            ></div>
          </>
        )}
      </div>
      <div className={styles["movie-content-pagination"]}>
        {suggestedMovies.map((e, i) => {
          let selectedStyle;
          if (i === movieIndex)
            selectedStyle = styles["movie-content-pagination-tab-selection"];
          else selectedStyle = "";
          return (
            <div
              className={`${styles["movie-content-pagination-tab"]} ${selectedStyle}`}
              key={`pagination-${i}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Suggestions;
