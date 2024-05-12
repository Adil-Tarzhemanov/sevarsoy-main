import styles from "./styles.module.scss";
import { FC } from "react";
import { news } from "../../../../constants/home/news";
import OneNew from "../../../components/OneNew/OneNew";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import HeadChapter from "../../components/HeadChapter/HeadChapter";
import { useNewsDataByQuery } from "../../../../api/queries/news/news.get";

const News: FC = () => {
  const { data: newsData } = useNewsDataByQuery();
  const { ref: refNews, inView: inViewNews } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  console.log(newsData);

  return (
    <>
      {newsData && (
        <div className={styles.container} id="news" ref={refNews}>
          <HeadChapter title="Новости" color={false} />
          <div className={styles.news}>
            <motion.div
              className={styles.bigNew}
              animate={inViewNews && { y: 0, x: 0, opacity: 1 }}
              initial={{ y: 300, x: -300, opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {newsData && <OneNew {...newsData[0]} />}
            </motion.div>
            <motion.div
              className={styles.smallNews}
              animate={inViewNews && { y: 0, x: 0, opacity: 1 }}
              initial={{ y: 300, x: 300, opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {newsData && <OneNew {...newsData[1]} small />}
              {newsData && <OneNew {...newsData[2]} small />}
            </motion.div>
          </div>
          {/*<button className={styles.allNewsBtn}>Все новости</button>*/}
        </div>
      )}
    </>
  );
};
export default News;
