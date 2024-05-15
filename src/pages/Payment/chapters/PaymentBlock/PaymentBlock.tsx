import styles from "./styles.module.scss";
import { FC, useState } from "react";
import QuestsInfo from "../QuestsInfo/QuestsInfo";
import { useAppSelector } from "../../../../store/hooks";
import { dateMonthFormatted } from "../../../../helpers/date-MMMM.helper";
import { allGuest } from "../../../../helpers/guest-count.helper";
import { useGuestsInfoByMutation } from "../../../../api/queries/rooms/lastStep.post";
import { useWindowSize } from "../../../../hooks/windowSize";
import classNames from "classnames";
import { Link } from "react-router-dom";

export interface GuestInput {
  name: string;
  lastName: string;
  fatherName: string;
}

const PaymentBlock: FC = () => {
  const data = useAppSelector((state) => state.rangePickerReducer);

  const [nameInput, setNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [fatherNameInput, setFatherNameInput] = useState("");
  const [mailInput, setMailInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");

  const [isAgree, setIsAgree] = useState(false);

  const [guests, setGuests] = useState<GuestInput[][]>(() =>
    data.numbers.map((number: any) =>
      Array.from({ length: number.adults + number.childs }, () => ({
        name: "",
        surname: "",
        patronym: "",
      })),
    ),
  );

  const guestsDataRequest = {
    code: data.code,
    email: mailInput,
    guests: guests.flatMap((guest) => guest),
    name: nameInput,
    patronym: fatherNameInput,
    surname: lastNameInput,
    tel: phoneNumberInput,
  };

  const { mutate } = useGuestsInfoByMutation(guestsDataRequest);

  console.log(guests.flatMap((guest) => guest));

  const windowSize = useWindowSize();

  const baseString = `m=662fefa6d8b2a6cf1b679f96;ac.code=${data.code};a=${data.totalPrice}`;

  console.log(data);

  return (
    <div className={styles.container}>
      <div className={styles.reservDetails}>
        <div className={styles.result}>
          <h4 className={styles.info}>
            {dateMonthFormatted(data.dates[0])} -{" "}
            {dateMonthFormatted(data.dates[1])},{windowSize < 430 && <br />}
            {data.numbers.length} {data.numbers.length < 2 ? "номер" : "номера"}
            , {allGuest(data.numbers)}{" "}
            {allGuest(data.numbers).length < 2
              ? "гость"
              : allGuest(data.numbers).length > 1 &&
                  allGuest(data.numbers).length < 5
                ? "гостя"
                : "гостей"}
          </h4>
          <div className={styles.resultPrice}>
            <h4 className={styles.title}>Общая стоимость:</h4>
            <h2 className={styles.price}>{data.totalPrice}</h2>
          </div>
        </div>
        <div className={styles.detailsBtn}>Детали брони</div>
      </div>
      <div className={styles.contactDetails}>
        <h2 className={styles.contactData}>Контактные данные</h2>
        <div className={styles.inputsData}>
          {/*{[1, 2, 3, 4, 5].map((input) => (*/}
          <input
            className={styles.input}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Имя"
          />
          <input
            className={styles.input}
            value={lastNameInput}
            onChange={(e) => setLastNameInput(e.target.value)}
            placeholder="Фамилия"
          />
          <input
            className={styles.input}
            value={fatherNameInput}
            onChange={(e) => setFatherNameInput(e.target.value)}
            placeholder="Отчество"
          />
          <input
            className={styles.input}
            value={mailInput}
            onChange={(e) => setMailInput(e.target.value)}
            placeholder="Почта"
          />
          <input
            className={styles.input}
            value={phoneNumberInput}
            onChange={(e) => setPhoneNumberInput(e.target.value)}
            placeholder="Номер"
          />
          {/*))}*/}
        </div>
        <div className={classNames(styles.clue, styles.hyphens)} lang="ru">
          Мы отправим детали бронирования на вашу электронную почту. При
          необходимости мы свяжемся с вами по телефону, чтобы уточнить детали.
        </div>
      </div>
      <QuestsInfo guests={guests} setGuests={setGuests} />
      <div className={styles.timeInfo}>
        <h3 className={styles.timeTitle}>Время заезда и выезда</h3>
        <h4 className={styles.timeText}>
          Стандартное время заезда - 15:00, выезда 12:00.
        </h4>
        <div className={styles.line}></div>
        <h3 className={styles.extraTitle}>Дополнительные комментарии</h3>
        <div className={styles.extraComment}>
          <p className={styles.text}>
            Если у вас есть дополнительные пожелания, пожалуйста, дайте нам
            знать. Мы постараемся учесть ваши пожелания при наличии такой
            возможности. КЛИКНИТЕ, чтобы начать печатать.
          </p>
          <textarea className={styles.extraTextArea} />
        </div>
      </div>
      <div className={styles.payment}>
        <div className={styles.leftPart}>
          <h2 className={styles.paymentTitle}>Оплата</h2>
          <div className={styles.agreeWrapper}>
            <div
              className={classNames(styles.agreeBtn, {
                [styles.isAgree]: isAgree,
              })}
              onClick={() => setIsAgree(!isAgree)}
            ></div>
            <p className={styles.agreeText}>
              Я согласен с правилами онлайн-бронирования, обработкой
              персональных данных и политикой конфиденциальности.
            </p>
          </div>
          <h4 className={styles.allSumText}>Оплачивается вся сумма брони</h4>
          <h4 className={styles.paymeText}>
            Обработка платежей осуществляется процессинговой системой Payme.
          </h4>
        </div>
        <div className={styles.rightPart}>
          <div className={styles.imgs}>
            <img
              className={styles.uzcardImg}
              src="/assets/payment/uzcard.png"
              alt="uzcard"
            />
            <img
              className={styles.uzcardImg}
              src="/assets/payment/humo.png"
              alt="humo"
            />
          </div>
          <h4 className={styles.toPayText}>К оплате</h4>
          <h3 className={styles.resultSum}>{data.totalPrice} сумм</h3>
          <button className={styles.bookBtn} onClick={() => mutate()}>
            <Link
              to={`https://test.paycom.uz/${btoa(baseString)}`}
              className={styles.link}
            >
              Забронировать
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default PaymentBlock;
