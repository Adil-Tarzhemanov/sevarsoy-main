import styles from "./styles.module.scss";
import { FC } from "react";
import classNames from "classnames";

const Quantity: FC<any> = ({ img, title, widthImg, widthTitle }) => {
  const widthImgs = classNames({
    [styles.quantityImg]: true,
    [styles.first]: widthImg === 43.7,
    [styles.second]: widthImg === 30,
    [styles.third]: widthImg === 29,
    [styles.fourth]: widthImg === 31,
  });

  const widthTitles = classNames({
    [styles.title]: true,
    [styles.title1]: widthTitle === 98,
    [styles.title2]: widthTitle === 51,
  });

  return (
    <div className={styles.quantity}>
      <div className={styles.background}></div>
      <img alt="quantity" className={widthImgs} src={img} />
      <h4 className={widthTitles}>{title}</h4>
    </div>
  );
};

export default Quantity;
