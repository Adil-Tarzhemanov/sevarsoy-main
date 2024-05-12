import styles from "./styles.module.scss";
import { FC } from "react";
import AboutUsInfo from "./components/aboutUsInfo/AboutUsInfo";
import { aboutUsInfo } from "../../../../constants/home/aboutUsInfo";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useWindowSize } from "../../../../hooks/windowSize";

const AboutUs: FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const windowSize = useWindowSize();

  return (
    <div className={styles.container} id="aboutUs">
      <div className={styles.content}>
        <div className={styles.backgroundAndImg} ref={ref}>
          {windowSize > 1360 && <div className={styles.blueBack}></div>}
          <motion.img
            alt="Sevarsoy"
            src="assets/home/aboutUs/back.png"
            className={styles.aboutUsImg}
            animate={inView && { y: 0, x: 0, opacity: 1 }}
            initial={windowSize > 1000 && { y: -200, x: -200, opacity: 0 }}
            transition={{ duration: 0.7 }}
          />
        </div>
        <motion.div
          className={styles.infoWrapper}
          ref={ref}
          animate={inView && { y: 0, x: 0, opacity: 1 }}
          initial={windowSize > 1000 && { y: -200, x: 200, opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.headWrapper}>
            <h2 className={styles.head}>
              Горный курорт мирового класса в Узбекистане
            </h2>
          </div>
          {aboutUsInfo.map((element: any) => (
            <AboutUsInfo {...element} key={element.title} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
