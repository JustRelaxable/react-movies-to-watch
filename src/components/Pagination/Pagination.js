import styles from "./Pagination.module.css";

const Pagination = () => {
  return (
    <div className={styles.pagination}>
      <p>&lt;</p>
      <div className={styles["page-selector"]}>
        <p>Page 1</p>
      </div>
      <p>&gt;</p>
    </div>
  );
};

export default Pagination;
