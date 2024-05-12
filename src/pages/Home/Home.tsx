import styles from "./styles.module.scss";
import React, { FC } from "react";
import "dayjs/locale/ru";
import Main from "./chapters/Main/Main";
import AboutUs from "./chapters/AboutUs/AboutUs";
import Classes from "./chapters/Classes/Classes";
import Numbers from "./chapters/ Numbers/Numbers";
import News from "./chapters/News/News";
import Footer from "./chapters/Footer/Footer";

const Home: FC = () => {
  return (
    <div className={styles.container}>
      <Main />
      <AboutUs />
      <Classes />
      <Numbers />
      <News />
      <Footer />
    </div>
  );
};
export default Home;
