import React, { createContext, useState } from "react";
import LatestAddedMovies from "./components/LatestAddedMovies/LatestAddedMovies";

import "./App.css";
import styles from "./App.module.css";
import Suggestions from "./components/Suggestions/Suggestions";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";

export const CorsURLContext = createContext();

function App() {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [customHeight, setCustomHeight] = useState(0);

  const displayStyle =
    customHeight !== 0
      ? window.innerWidth < 834
        ? { display: `none` }
        : {}
      : {};

  return (
    <CorsURLContext.Provider value="https://corsproxy.io/?">
      <div className={styles["section-holder"]}>
        <SearchBar
          setMovie={setSelectedMovie}
          selectedMovie={selectedMovie}
          setHeight={setCustomHeight}
        ></SearchBar>
        <Suggestions style={displayStyle}></Suggestions>
        <LatestAddedMovies
          style={displayStyle}
          selectedMovie={selectedMovie}
          setMovie={setSelectedMovie}
        ></LatestAddedMovies>
        <MovieDetailsPage
          selectedMovie={selectedMovie}
          setMovie={setSelectedMovie}
        ></MovieDetailsPage>
      </div>
    </CorsURLContext.Provider>
  );
}

export default App;
