import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.button} ${props.className} ${styles[props.color]}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
