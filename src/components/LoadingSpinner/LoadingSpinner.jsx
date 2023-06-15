import loadingSpinner from "../../svg-loaders/rings.svg";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner({ width, height }) {
  const customStyle = { width: width, height: height };
  console.log(customStyle);
  return (
    <div className={styles["loading-spinner-container"]}>
      <img
        src={loadingSpinner}
        className={`${styles["loading-spinner"]}`}
        style={customStyle}
      ></img>
    </div>
  );
}
