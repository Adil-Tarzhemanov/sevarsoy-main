import styles from "./styles.module.scss";
import React, { FC } from "react";
import NumberData from "../ButtonNumberSelection/components/NumberData/NumberData";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addNumber } from "../../store/slices/rangePicker.slice";
import classNames from "classnames";

interface NumberSelectionProps {
  setIsNumberVisible: any;
}

const NumberSelection: FC<NumberSelectionProps> = ({ setIsNumberVisible }) => {
  const numbers = useAppSelector((state) => state.rangePickerReducer.numbers);
  const dispatch = useAppDispatch();

  const onAddNumber = () => {
    dispatch(
      addNumber({
        index: numbers.length + 1,
        adults: 2,
        childs: 0,
        isDeleteNumber: true,
        mattress: 0,
        nutrition: 0,
        type: "none",
      }),
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3 className={styles.numbersDataHead}>Количество гостей</h3>
        <div className={styles.line}></div>
        <div className={styles.numbersData}>
          {numbers.map((number: any) => (
            <NumberData {...number} />
          ))}
        </div>
        <div className={styles.saveAndAddNumber}>
          <button onClick={() => onAddNumber()} className={styles.addBtn}>
            + Добавить ещё <br /> номер
          </button>
          <button
            onClick={() => setIsNumberVisible(false)}
            className={styles.done}
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberSelection;
