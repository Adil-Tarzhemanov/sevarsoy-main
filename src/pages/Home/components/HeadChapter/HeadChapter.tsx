import styles from "./styles.module.scss";
import { FC } from "react";
import classNames from "classnames";

const HeadChapter: FC<any> = ({ title, color }) => {
  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.line, { [styles.whiteLine]: color })}
      ></div>
      <h2
        className={classNames(styles.numbersTitle, {
          [styles.whiteTitle]: color,
        })}
      >
        {title}
      </h2>
    </div>
  );
};
export default HeadChapter;
