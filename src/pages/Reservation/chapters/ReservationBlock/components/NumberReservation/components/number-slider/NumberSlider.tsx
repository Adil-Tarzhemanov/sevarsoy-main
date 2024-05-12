import styles from "./styles.module.scss";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination } from "swiper/modules";
import {} from "../../../../../../../../constants/reservation/numberImages";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

const NumberSlider: FC<any> = ({ imgs, path }) => {
  return (
    <div className={styles.swiper}>
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        pagination={true}
        modules={[EffectCube, Pagination]}
        className={styles.mySwiper}
      >
        {imgs?.map((img: any) => (
          <SwiperSlide className={styles.swiperSlide}>
            <img
              alt="number"
              src={`/assets/reservation/numbers/${path}/1.png`}
              className={styles.numberImg}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default NumberSlider;
