import styles from "./styles.module.scss";
import React, { FC } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  decreaseAdults,
  decreaseChilds,
  deleteNumber,
  increaseAdults,
  increaseChilds,
} from "../../../../store/slices/rangePicker.slice";

interface NumberDataProps {
  index: number;
  adults: number;
  childs: number;
  isDeleteNumber: boolean;
}

const NumberData: FC<NumberDataProps> = ({
  index,
  adults,
  childs,
  isDeleteNumber,
}) => {
  const dispatch = useAppDispatch();
  // const numbers = useAppSelector(state => state.rangePickerReducer.numbers);

  const onDeleteNumber = () => {
    dispatch(deleteNumber(index));
  };

  const onIncreaseAdults = () => {
    dispatch(increaseAdults(index - 1));
  };

  const onDecreaseAdults = () => {
    dispatch(decreaseAdults(index - 1));
  };

  const onIncreaseChilds = () => {
    dispatch(increaseChilds(index - 1));
  };

  const onDecreaseChilds = () => {
    dispatch(decreaseChilds(index - 1));
  };

  return (
    <div className={styles.numberData}>
      <div className={styles.titleAndDelete}>
        <h4 className={styles.numberDataTitle}>Номер {index}</h4>
        {isDeleteNumber && (
          <button className={styles.deleteBtn} onClick={() => onDeleteNumber()}>
            <img src="/assets/delete.png" />
          </button>
        )}
      </div>
      <div className={styles.humansWrapper}>
        <div className={styles.adultsWrapper}>
          <h4 className={styles.adultsTitle}>Взрослые</h4>
          <div className={styles.adults}>
            <button className={styles.minus} onClick={() => onDecreaseAdults()}>
              -
            </button>
            <p className={styles.adultsQuantity}>{adults}</p>
            <button className={styles.plus} onClick={() => onIncreaseAdults()}>
              +
            </button>
          </div>
        </div>
        <div className={styles.adultsWrapper}>
          <h4 className={styles.adultsTitle}>Дети младше 12 лет</h4>
          <div className={styles.adults}>
            <button className={styles.minus} onClick={() => onDecreaseChilds()}>
              -
            </button>
            <p className={styles.adultsQuantity}>{childs}</p>
            <button className={styles.plus} onClick={() => onIncreaseChilds()}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className={classNames(styles.line, styles.numberLine)}></div>
    </div>
  );
};
export default NumberData;
