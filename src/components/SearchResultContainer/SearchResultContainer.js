import SearchResult from "../SearchResult/SearchResult";
import styles from "./SearchResultContainer.module.css";

const SearchResultContainer = (props) => {
  return (
    <div className={styles.container}>
      {props.movies.map((x) => (
        <SearchResult
          key={x.id}
          id={x.id}
          imgURL={x.i.imageUrl}
          movieTitle={x.l}
          movieDirector={x.s}
          setMovie={props.setMovie}
        ></SearchResult>
      ))}
    </div>
  );
};

export default SearchResultContainer;
