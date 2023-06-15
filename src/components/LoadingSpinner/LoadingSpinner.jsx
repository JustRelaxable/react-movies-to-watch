import loadingSpinner from "../../svg-loaders/rings.svg";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner({}) {
  return (
    <div className={styles["loading-spinner-container"]}>
      <img src={loadingSpinner} className={styles["loading-spinner"]}></img>
    </div>
  );
}
