import styles from "./styles.module.scss";
import { FC, useState } from "react";
import { classes } from "../../../../constants/home/сlasses";
import HeadChapter from "../../components/HeadChapter/HeadChapter";
import classNames from "classnames";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useWindowSize } from "../../../../hooks/windowSize";

const Classes: FC = () => {
  const [moreRests, setMoreRests] = useState(false);
  const [visibleRests, setVisibleRests] = useState(5);

  const windowSize = useWindowSize();

  const { ref: refClasses, inView: inViewClasses } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const onMoreRests = async () => {
    setMoreRests(true);
    setTimeout(() => {
      setVisibleRests((prevCount) => prevCount + 20);
    }, 1000);
  };

  const onFiveRests = async () => {
    // Анимируем скрытие элементов
    setVisibleRests((prevCount) => prevCount - 20);
    setTimeout(() => {
      setMoreRests(false);
    }, 1000); // Ожидаем завершения анимации перед изменением состояния
  };

  return (
    <div className={styles.container} id="classes">
      <HeadChapter title="Чем заняться на курорте" color={false} />
      <div className={styles.content} ref={refClasses}>
        <div className={styles.rests}>
          {classes.slice(0, visibleRests).map((rest, index) => (
            <motion.div
              key={rest.id}
              className={classNames(styles.restWrapper, {
                [styles.moreRestsActive]: moreRests || windowSize < 1370,
              })}
              animate={
                inViewClasses && visibleRests <= 5
                  ? { y: 0, x: 0, opacity: 1 }
                  : { opacity: 1, y: 0 }
              }
              initial={
                visibleRests <= 5 && windowSize > 1000
                  ? { y: rest.y, x: rest.x, opacity: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={
                visibleRests <= 5
                  ? { duration: 0.8 }
                  : { duration: 0.5, delay: index * 0.1 }
              }
            >
              <div className={styles.restBackground}></div>
              <h2 className={styles.restTitle}>{rest.title}</h2>
              <img
                src={rest.img}
                alt="rest"
                key={rest.id}
                className={classNames(styles.restImg)}
              />
            </motion.div>
          ))}
        </div>
        {visibleRests < classes.length ? (
          <button className={styles.moreRestsBtn} onClick={() => onMoreRests()}>
            Подробнее
            <img
              alt="arrow"
              src="assets/home/arrow.png"
              className={styles.arrow}
            />
          </button>
        ) : (
          <button className={styles.hide} onClick={() => onFiveRests()}>
            Скрыть
            <img
              alt="arrow"
              src="assets/home/arrow.png"
              className={styles.arrow}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Classes;
