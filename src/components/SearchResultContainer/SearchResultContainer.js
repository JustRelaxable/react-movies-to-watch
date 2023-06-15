import SearchResult from "../SearchResult/SearchResult";
import styles from "./SearchResultContainer.module.css";

const SearchResultContainer = ({ movies, setMovie }) => {
  return (
    <div className={styles.container}>
      {movies.map((x) => (
        <SearchResult
          key={x.id}
          id={x.id}
          imgURL={x.i.imageUrl}
          movieTitle={x.l}
          movieDirector={x.s}
          setMovie={setMovie}
        ></SearchResult>
      ))}
    </div>
  );
};

export default SearchResultContainer;
