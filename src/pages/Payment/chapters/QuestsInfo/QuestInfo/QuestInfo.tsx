import styles from "./styles.module.scss";
import { FC } from "react";
import { useAppSelector } from "../../../../../store/hooks";
import classNames from "classnames";
import { useWindowSize } from "../../../../../hooks/windowSize";

interface QuestInfoProps {
  index: number;
  type: string;
  adults: number;
  childs: number;
  firstInfo?: boolean;
  guestInputs: any;
  setGuestInputs: any;
}

interface GuestInput {
  name: string;
  surname: string;
  patronym: string;
}

const QuestInfo: FC<QuestInfoProps> = ({
  index,
  type,
  adults,
  childs,
  firstInfo,
  guestInputs,
  setGuestInputs,
}) => {
  const numbers = useAppSelector((state) => state.rangePickerReducer.numbers);
  const guestCount = useAppSelector(
    (state) => state.rangePickerReducer.guestsCountNumber,
  );

  const windowSize = useWindowSize();

  const handleInputChange = (
    guestIndex: number,
    field: keyof GuestInput,
    value: string,
  ) => {
    // Создаем копию состояния, чтобы не мутировать его напрямую
    const updatedGuestInputs = [...guestInputs];
    updatedGuestInputs[guestIndex] = {
      ...updatedGuestInputs[guestIndex],
      [field]: value,
      reservation_id: guestCount[index].reservation_id,
    };
    setGuestInputs(updatedGuestInputs); // Обновляем состояние
  };

  return (
    <div
      className={classNames(styles.guestInfo, { [styles.another]: !firstInfo })}
    >
      {firstInfo && (
        <h2 className={styles.guestInfoTitle}>Информация о гостях</h2>
      )}
      <h4 className={styles.numberInfo}>
        Номер {index}: {type.toUpperCase()}, {windowSize < 680 && <br />}
        {adults} взрослых, {childs} детей
      </h4>
      {guestInputs.map((guest: any, idx: any) => (
        <div key={idx} className={styles.inputsData}>
          <input
            className={styles.input}
            value={guest.name}
            onChange={(e) => handleInputChange(idx, "name", e.target.value)}
            placeholder="Имя"
          />
          <input
            className={styles.input}
            value={guest.lastName}
            onChange={(e) => handleInputChange(idx, "surname", e.target.value)}
            placeholder="Фамилия"
          />
          <input
            className={styles.input}
            value={guest.fatherName}
            onChange={(e) => handleInputChange(idx, "patronym", e.target.value)}
            placeholder="Отчество"
          />
        </div>
      ))}
      {/*{firstInfo && (*/}
      {/*  <button className={styles.nextGuestBtn}>*/}
      {/*    Указать следующего гостя <span className={styles.plus}>+</span>*/}
      {/*  </button>*/}
      {/*)}*/}
    </div>
  );
};

export default QuestInfo;
