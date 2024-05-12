import styles from "./styles.module.scss";
import { FC, useState } from "react";
import NumberSlider from "../NumberReservation/components/number-slider/NumberSlider";
import { furniture } from "../../../../../../constants/reservation/furnitures";
import FurnitureElement from "../FurnitureElement/FurnitureElement";
import classNames from "classnames";
import ExtraInNumber from "../NumberReservation/components/extra-in-number/ExtraInNumber";
import { typeSelection } from "../../../../../../store/slices/rangePicker.slice";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";

const MobileNumberReservation: FC<any> = ({
  type,
  count,
  price,
  imgs,
  index,
}) => {
  const [activeFurniture, setActiveFurniture] = useState(false);
  const numbers = useAppSelector((state) => state.rangePickerReducer.numbers);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <NumberSlider imgs={imgs} path={type.toLowerCase()} />
      <div className={styles.info}>
        <div className={styles.titleAndFurniturs}>
          <h2 className={styles.title}>{type}</h2>
          <button
            className={classNames({
              [styles.furnitureUnactiveBtn]: !activeFurniture,
              [styles.furnitureActiveBtn]: activeFurniture,
            })}
            onClick={() => setActiveFurniture(!activeFurniture)}
          >
            <img
              src="/assets/reservation/activeFurniture.png"
              alt="arrow"
              className={styles.activeFurniture}
            />
          </button>
        </div>
        {activeFurniture && (
          <div className={styles.furniture}>
            {furniture.map((element) => (
              <FurnitureElement {...element} key={element.title} />
            ))}
          </div>
        )}
        <h4 className={styles.humansCapacity}>{count}-х местный</h4>
        <ExtraInNumber />
        <h3 className={styles.priceText}>Стоимость за одну ночь</h3>
        <div className={styles.priceAndTwoButtons}>
          <div className={styles.cancelAndBank}>
            <h4 className={styles.cancel}>Условия отмены</h4>
            <h4 className={styles.bank}>Оплата банковской картой</h4>
          </div>
          <h3 className={styles.price}>{price} сум</h3>
        </div>
        <div className={styles.chooses}>
          {numbers.map((number: any) => {
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
  );
};
export default MobileNumberReservation;
