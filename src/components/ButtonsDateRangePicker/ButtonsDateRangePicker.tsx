import styles from "./styles.module.scss";
import React, { FC, useEffect } from "react";
import CustomRangePicker from "../CustomRangePicker/CustomRangePicker";
import { useAppSelector } from "../../store/hooks";

const ButtonDateRangePicker: FC = () => {
  const dates = useAppSelector((state) => state.rangePickerReducer.dates);

  return (
    <div className={styles.container}>
      <div className={styles.arrival}>
        <div className={styles.customRangePicker}>
          <CustomRangePicker />
        </div>
        <div className={styles.arrivalWrapper}>
          <img
            alt="calendar"
            src="/assets/home/main/calendar.png"
            className={styles.calendarImg}
          />
          <div className={styles.titleAndDate}>
            <p className={styles.title}>Заезд</p>
            <p className={styles.date}>{dates[0]}</p>
          </div>
        </div>
      </div>
      <div className={styles.arrival}>
        <div className={styles.arrivalWrapper}>
          <img
            alt="calendar"
            src="/assets/home/main/calendar.png"
            className={styles.calendarImg}
          />
          <div className={styles.titleAndDate}>
            <p className={styles.title}>Выезд</p>
            <p className={styles.date}>{dates[1]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ButtonDateRangePicker;
