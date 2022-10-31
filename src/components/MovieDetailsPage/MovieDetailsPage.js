import { useState, useEffect } from "react";
import Button from "../Button/Button";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = (props) => {
  const isMovieSelected = Object.keys(props.selectedMovie).length > 0;

  const [movieStoryline, setMovieStoryline] = useState(
    "Movie storyline is loading..."
  );
  const [imgSrc, setImgSrc] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [movieDirector, setMovieDirector] = useState("");
  const [firstTime, setFirstTime] = useState(true);
  const [movieInList, setMovieInList] = useState(false);

  useEffect(() => {
    async function fetchMovieStoryline() {
      const request = await fetch(
        `https://cors-proxy-222.herokuapp.com/https://caching.graphql.imdb.com/?operationName=TMD_Storyline&variables=%7B%22titleId%22%3A%22${props.selectedMovie.key}%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22sha256Hash%22%3A%2287f41463a48af95ebba3129889d17181402622bfd30c8dc9216d99ac984f0091%22%2C%22version%22%3A1%7D%7D`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const jsonData = await request.json();
      setMovieStoryline(
        stripHtml(jsonData.data.title.synopses.edges[0].node.plotText.plaidHtml)
      );
    }

    if (isMovieSelected) {
      fetchMovieStoryline();
      setFirstTime(false);
      setImgSrc(props.selectedMovie.imgSrc);
      setMovieTitle(props.selectedMovie.title);
      setMovieDirector(props.selectedMovie.director);
      setMovieInList(
        (localStorage.getItem("movies") || []).includes(props.selectedMovie.key)
      );
    }
  }, [props.selectedMovie]);

  const resetSelectedMovie = () => {
    props.setMovie({});
  };

  function stripHtml(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  function addMovie() {
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    movies.push(props.selectedMovie.key);
    localStorage.setItem("movies", JSON.stringify(movies));
    setMovieInList(true);
  }

  function removeMovie() {
    const movies = JSON.parse(localStorage.getItem("movies"));
    localStorage.setItem(
      "movies",
      JSON.stringify(movies.filter((e) => e !== props.selectedMovie.key))
    );
    setMovieInList(false);
  }
  const containerAnimationStyle = isMovieSelected
    ? styles["container-slide-in"]
    : firstTime
    ? ""
    : styles["container-slide-out"];

  if (containerAnimationStyle === styles["container-slide-in"])
    document.body.style.overflow = "hidden";
  else if (containerAnimationStyle === styles["container-slide-out"])
    document.body.style.overflow = "visible";

  const addRemoveButton = movieInList ? (
    <Button
      className={styles["first-button"]}
      color="red"
      onClick={removeMovie}
    >
      Delete the Movie
    </Button>
  ) : (
    <Button className={styles["first-button"]} color="green" onClick={addMovie}>
      Add the Movie
    </Button>
  );

  return (
    <div className={`${styles.container} ${containerAnimationStyle}`}>
      <div className={styles["img-container"]}>
        <img className={styles.img} src={imgSrc}></img>
        <div className={styles["img-text-background"]}>
          <p className={styles.title}>{movieTitle}</p>
          <p className={styles.director}>{movieDirector}</p>
        </div>
      </div>
      <div
        className={`${styles["content-padding"]} ${styles["storyline-container"]}`}
      >
        <p className={styles.storyline}>{movieStoryline}</p>
      </div>
      <div className={`${styles["button-grid"]} ${styles["content-padding"]}`}>
        {addRemoveButton}
        <Button color="gray" onClick={resetSelectedMovie}>
          Back
        </Button>
        <Button color="gray">Open in IMDB</Button>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
