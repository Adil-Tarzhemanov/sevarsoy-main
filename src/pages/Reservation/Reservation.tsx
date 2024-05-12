import styles from "./styles.module.scss";
import { FC } from "react";
import Quantities from "./chapters/Quantities/Quantities";
import ReservationBlock from "./chapters/ReservationBlock/ReservationBlock";
import Footer from "../Home/chapters/Footer/Footer";

const Reservation: FC = () => {
  return (
    <div className={styles.container}>
      <Quantities />
      <ReservationBlock />
      <Footer marginTop />
    </div>
  );
};

export default Reservation;
