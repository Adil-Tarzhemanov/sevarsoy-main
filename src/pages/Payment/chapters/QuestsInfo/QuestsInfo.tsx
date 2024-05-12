import styles from "./styles.module.scss";
import { FC } from "react";
import { useAppSelector } from "../../../../store/hooks";
import QuestInfo from "./QuestInfo/QuestInfo";
import { GuestInput } from "../PaymentBlock/PaymentBlock";

const QuestsInfo: FC<any> = ({ guests, setGuests }) => {
  const numbers = useAppSelector((state) => state.rangePickerReducer.numbers);

  return (
    <div className={styles.questsInfo}>
      {numbers.map((number: any, index: number) => (
        <QuestInfo
          key={index}
          {...number}
          firstInfo={index === 0}
          guestInputs={guests[index]}
          setGuestInputs={(updatedInputs: GuestInput[]) => {
            const newGuests = [...guests];
            newGuests[index] = updatedInputs;
            setGuests(newGuests);
          }}
        />
      ))}
    </div>
  );
};
export default QuestsInfo;
