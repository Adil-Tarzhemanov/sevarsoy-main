import styles from "./styles.module.scss";
import { FC } from "react";

const FurnitureElement: FC<any> = ({ title }) => {
  return <p className={styles.furnitureElement}>{title}</p>;
};
export default FurnitureElement;
