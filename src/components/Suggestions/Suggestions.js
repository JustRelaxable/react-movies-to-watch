import styles from "./Suggestions.module.css";
import SuggestionMovie from "../SuggestionMovie/SuggestionMovie";
import { useEffect, useState } from "react";
import loadingSpinner from "../../svg-loaders/rings.svg";
//https://m.media-amazon.com/images/M/MV5BNDczNjY2NGUtNzg1YS00NDVlLTkxZWUtMjg2ZDQ0OWJhZTBhXkEyXkFqcGdeQWpnYW1i._V1_QL75_UX750_CR0,0,750,422_.jpg

const Suggestions = (props) => {
  const movieCount = 6;
  const movieSlideTime = 10000;
  const timeBarRefreshTime = 100;
  const [touchStartX, setTouchStartX] = useState(0);
  const [timeBarWidth, setTimeBarWidth] = useState(0);
  const [movieIndex, setMovieIndex] = useState(0);
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const moviesReady = suggestedMovies.length > 0;
  useEffect(() => {
    async function fetchSuggestedMovies() {
      const fetchedDocument = fetch(
        "https://cors-proxy-222.herokuapp.com/https://m.imdb.com/"
      )
        .then((x) => x.text())
        .then((x) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(x, "text/html");
          return doc;
        });
      const suggestedMovieTitles = await fetchedDocument
        .then((x) => x.querySelectorAll(".sc-8f5243a8-4.cIiuVe"))
        .then((x) => Array.from(x).map((x) => x.innerText));

      const suggestedMovieSubheaders = await fetchedDocument
        .then((x) => x.querySelectorAll(".sc-8f5243a8-3.iDptvJ"))
        .then((x) => Array.from(x).map((x) => x.innerText));

      const suggestedMoviePictureSources = await fetchedDocument
        .then((x) => x.querySelectorAll(".ipc-media.sc-26c591b4-1>.ipc-image"))
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
      style={props.style}
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
