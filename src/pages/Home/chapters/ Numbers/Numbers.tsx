import styles from "./styles.module.scss";
import { FC } from "react";
import { numbers } from "../../../../constants/home/numbers";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import HeadChapter from "../../components/HeadChapter/HeadChapter";

//  "homepage": "https://adil-tarzhemanov.github.io/sevarsoy",

const Numbers: FC = () => {
  const { ref: refNumbers, inView: inViewNumbers } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div className={styles.container} id="numbers">
      <div className={styles.titleWrapper}>
        <HeadChapter title="Номера" color />
      </div>
      <motion.div
        className={styles.numbers}
        ref={refNumbers}
        animate={inViewNumbers && { y: 0, x: 0, opacity: 1 }}
        initial={{ y: -300, x: 0, opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        {numbers.map((number) => {
          return (
            <div className={styles.number} key={number.title}>
              <img alt="number" src={number.img} className={styles.numberImg} />
              <div className={styles.numberDataWrapper}>
                <h3 className={styles.title}>{number.title}</h3>
                <h3 className={styles.price}>
                  <span>{number.price}</span>
                </h3>
                <p className={styles.description}>
                  Питание: включено
                  <br />
                  Вмещает: {number.capacity} взрослых
                  <br />
                  Кровать:{" "}
                  <img
                    src="assets/home/numbers/bed.png"
                    alt="bed"
                    className={styles.bedImg}
                  />{" "}
                  {number.capacity}х
                </p>
                {/*<button>Подробнее</button>*/}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

// @ts-ignore
export default Numbers;
