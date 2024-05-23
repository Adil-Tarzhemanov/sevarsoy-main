import styles from "./styles.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../../store/hooks";
import {
  decreaseExtraMattress,
  decreaseExtraNutrition,
  increaseExtraMattress,
  increaseExtraNutrition,
} from "../../../../../../../../store/slices/rangePicker.slice";

const ExtraInNumber: FC<any> = ({ index }) => {
  // const extraInfo = useAppSelector(
  //   (state) => state.rangePickerReducer.extraInfo,
  // );
  const numbers = useAppSelector((state) => state.rangePickerReducer.numbers);
  const dispatch = useAppDispatch();
  const [isMattresses, setIsMattresses] = useState(false);
  const [isNutrition, setIsNutrition] = useState(false);

  const mattressRef = useRef<HTMLDivElement>(null);
  const nutritionRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const json = JSON.stringify(numbers);
  //   localStorage.setItem("numbers", json);
  // }, [numbers]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (mattressRef.current && !mattressRef.current.contains(event.target)) {
        setIsMattresses(false);
      }
      if (
        nutritionRef.current &&
        !nutritionRef.current.contains(event.target)
      ) {
        setIsNutrition(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mattressRef, nutritionRef]);

  return (
    <div className={styles.extra}>
      <div
        ref={mattressRef}
        className={classNames(styles.extraElement, styles.mattresses, {
          [styles.active]: isMattresses,
        })}
        onClick={() => setIsMattresses(true)}
      >
        <h3 className={styles.extraTitle}>
          Детская <br /> оплата
        </h3>
        {isMattresses && (
          <div className={styles.extraCountWrapper}>
            <div className={styles.numbers}>
              {numbers.map((number: any) => {
                return (
                  <div className={styles.number}>
                    <h4 className={styles.numberIndex}>Номер {number.index}</h4>
                    <div className={styles.countChanges}>
                      <button
                        className={styles.minus}
                        onClick={() =>
                          dispatch(decreaseExtraMattress(number.index - 1))
                        }
                      >
                        -
                      </button>
                      <h4 className={styles.count}>{number.mattress}</h4>
                      <button
                        className={styles.plus}
                        onClick={() =>
                          dispatch(increaseExtraMattress(number.index - 1))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div
        ref={nutritionRef}
        className={classNames(styles.extraElement, styles.nutrition, {
          [styles.active]: isNutrition,
        })}
        onClick={() => setIsNutrition(true)}
      >
        Дополнительное <br /> питание
        {isNutrition && (
          <div className={styles.extraCountWrapper}>
            <div className={styles.numbers}>
              {numbers.map((number: any) => {
                return (
                  <div className={styles.number}>
                    <h4 className={styles.numberIndex}>Номер {number.index}</h4>
                    <div className={styles.countChanges}>
                      <button
                        className={styles.minus}
                        onClick={() =>
                          dispatch(decreaseExtraNutrition(number.index - 1))
                        }
                      >
                        -
                      </button>
                      <h4 className={styles.count}>{number.nutrition}</h4>
                      <button
                        className={styles.plus}
                        onClick={() =>
                          dispatch(increaseExtraNutrition(number.index - 1))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ExtraInNumber;
