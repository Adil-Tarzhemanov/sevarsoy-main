import styles from "./styles.module.scss";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useWindowSize } from "../../hooks/windowSize";
import { useWeatherDataByQuery } from "../../api/queries/weather/weatherData";

const WeatherWidget = () => {
  const windowSize = useWindowSize();
  const { ref: refWidget, inView: inViewText } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  // const { data } = useWeatherDataByQuery();
  // console.log(data.data_current.temperature);
  //
  // if (windowSize < 550) {
  //   return (
  //     <div className={styles.mobileMeteo}>{data.data_current.temperature}</div>
  //   );
  // }

  return (
    <motion.div
      className={styles.meteoblueWidget}
      ref={refWidget}
      animate={inViewText ? { x: 0, opacity: 1 } : {}}
      initial={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <iframe
        src="https://www.meteoblue.com/en/weather/widget/three/chimgon-cable-car-station_uzbekistan_12470125?geoloc=fixed&nocurrent=0&noforecast=0&days=4&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&layout=dark"
        frameBorder="0"
        scrolling="NO"
        // allowTransparency={true}
        sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
        style={{
          width: "460px",
          height: "593px",
        }}
      ></iframe>
    </motion.div>
  );
};

export default WeatherWidget;
