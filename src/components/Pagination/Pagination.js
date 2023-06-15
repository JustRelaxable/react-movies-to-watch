import styles from "./Pagination.module.css";

const Pagination = ({ pageNumber, setPageNumber, pageCount }) => {
  const nextPage = () => {
    if (pageNumber + 1 <= pageCount) {
      setPageNumber(pageNumber + 1);
    }
  };

  const previousPage = () => {
    if (pageNumber - 1 > 0) {
      setPageNumber(pageNumber - 1);
    }
  };
  return (
    <div className={styles.pagination}>
      <p className={styles.paginationButton} onClick={previousPage}>
        &lt;
      </p>
      <div className={styles["page-selector"]}>
        <p>Page {pageNumber}</p>
      </div>
      <p className={styles.paginationButton} onClick={nextPage}>
        &gt;
      </p>
    </div>
  );
};

export default Pagination;
