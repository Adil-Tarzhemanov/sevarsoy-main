import styles from "./styles.module.scss";
import { FC, useEffect } from "react";
import { furniture } from "../../../../../../constants/reservation/furnitures";
import FurnitureElement from "../FurnitureElement/FurnitureElement";
import NumberSlider from "./components/number-slider/NumberSlider";
import ExtraInNumber from "./components/extra-in-number/ExtraInNumber";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { typeSelection } from "../../../../../../store/slices/rangePicker.slice";

const NumberReservation: FC<any> = ({ type, count, price, imgs, index }) => {
  const numbers = useAppSelector((state) => state.rangePickerReducer.numbers);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.numberReservation}>
      <div className={styles.sliderAndInfo}>
        <NumberSlider imgs={imgs} path={type.toLowerCase()} />
        <div className={styles.info}>
          <h2 className={styles.title}>{type}</h2>
          <h4 className={styles.humansCapacity}>{count}-х местный</h4>
          <div className={styles.furniture}>
            {furniture.map((element) => (
              <FurnitureElement {...element} key={element.title} />
            ))}
          </div>
          <ExtraInNumber index={index} />
        </div>
      </div>
      <div className={styles.reservation}>
        <div className={styles.priceWrapper}>
          <h3 className={styles.priceText}>Стоимость за 1 ночь</h3>
          <h2 className={styles.price}>{price} сум</h2>
        </div>
        <div className={styles.completion}>
          <div className={styles.conditionsAndQuests}>
            <div className={styles.cancelAndBank}>
              <button className={styles.cancelBtn}>Условия отмены</button>
              <button className={styles.bankMapBtn}>
                Оплата банковской картой
              </button>
            </div>
          </div>
          <div className={styles.chooses}>
            {numbers &&
              numbers.map((number: any) => {
                return (
                  number.type === "none" && (
                    <div className={styles.chooseWrapper}>
                      <h4 className={styles.counts}>
                        {number.adults} взрослых, {number.childs} детей
                      </h4>
                      <button
                        className={styles.chooseBtn}
                        onClick={() =>
                          dispatch(
                            typeSelection({
                              id: number.index - 1,
                              type: type.toLowerCase(),
                            }),
                          )
                        }
                      >
                        Выбрать
                      </button>
                    </div>
                  )
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NumberReservation;
