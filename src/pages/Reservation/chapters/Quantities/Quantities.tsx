import styles from "./styles.module.scss";
import { FC } from "react";
import { quantities } from "../../../../constants/reservation/quantities";
import Quantity from "./components/Quantity/Quantity";
import { useInView } from "react-intersection-observer/index";

const Quantities: FC = () => {
  // const { ref: refQuantityLeft, inView: inViewQuantityLeft } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.3,
  // });

  return (
    <div className={styles.container}>
      <h1 className={styles.head}>Бронирование номеров</h1>
      <div className={styles.quantities}>
        {quantities.map((quantity: any) => (
          <Quantity {...quantity} key={quantity.title} />
        ))}
      </div>
    </div>
  );
};
export default Quantities;
