import styles from "./styles.module.scss";
import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  dateDayFormatted,
  dateMonthFormatted,
} from "../../../../helpers/date-MMMM.helper";
import { priceForType } from "../../../../helpers/priceForType.helper";
import { resultSum } from "../../../../helpers/resultSum.helper";
import { dateForDB } from "../../../../helpers/date-YYYY-MM-DD.helper";
import { useNavigate } from "react-router-dom";
import { useRoomsDetailsByMutation } from "../../../../api/queries/rooms/secondStep.post";

const ResultReserv: FC = () => {
  const dates = useAppSelector((state) => state.rangePickerReducer.dates);
  const numbers = useAppSelector((state) => state.rangePickerReducer.numbers);
  const numbersInfo = useAppSelector(
    (state) => state.rangePickerReducer.numbersInfo,
  );
  const roomsData = useAppSelector((state) => state.rangePickerReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // console.log(numbers);

  const roomsDetailsRequest = {
    code: roomsData.code,
    date_in: dateForDB(roomsData.dates[0]),
    date_out: dateForDB(roomsData.dates[1]),
    people: roomsData.numbers.map((number: any) => ({
      adults: number.adults,
      childs: number.childs,
      food: number.nutrition,
      mattress: number.mattress,
      room_type: number.type.charAt(0).toUpperCase() + number.type.slice(1),
    })),
  };

  const { isError, mutate } = useRoomsDetailsByMutation(
    roomsDetailsRequest,
    navigate,
    dispatch,
  );
  console.log(isError);
  if (isError) return <div>{isError}</div>;

  return (
    <div className={styles.reservationResult}>
      <h3 className={styles.head}>
        Ваше <br /> бронирование
      </h3>
      <div className={styles.line}></div>
      <div className={styles.dates}>
        <h3
          className={styles.monthDays}
        >{`${dateMonthFormatted(dates[0])} - ${dateMonthFormatted(dates[1])}`}</h3>
        <div className={styles.weekDays}>
          <h4 className={styles.weekDay}>{dateDayFormatted(dates[0])}</h4>
          <h4 className={styles.weekDay}>{dateDayFormatted(dates[1])}</h4>
        </div>
      </div>
      {numbers.some((item: any) => item.type !== "none") && (
        <div className={styles.line}></div>
      )}
      {numbers.map((number: any) => {
        return (
          number.type !== "none" && (
            <div className={styles.info}>
              <div className={styles.typeAndMainSum}>
                <h3 className={styles.type}>{number.type}</h3>
                <p className={styles.mainSum}>
                  {priceForType(number.type)} сум
                </p>
              </div>
              {new Array(number.mattress)
                .fill(numbersInfo.mattress)
                .map((extra) => {
                  return (
                    <div className={styles.extraSums}>
                      <h4 className={styles.extra}>
                        Дополнительные <br /> матрасы
                      </h4>
                      <p className={styles.extraSum}>{extra} сум</p>
                    </div>
                  );
                })}
              {new Array(number.nutrition)
                .fill(numbersInfo.nutrition)
                .map((extra) => {
                  return (
                    <div className={styles.extraSums}>
                      <h4 className={styles.extra}>
                        Дополнительное <br /> питание
                      </h4>
                      <p className={styles.extraSum}>{extra} сум</p>
                    </div>
                  );
                })}
            </div>
          )
        );
      })}
      {numbers.some((item: any) => item.type !== "none") && (
        <>
          <div className={styles.line}></div>
          <h2 className={styles.resultSum}>
            {resultSum(numbers, numbersInfo, dates)}сум
          </h2>
          <button className={styles.continueBtn} onClick={() => mutate()}>
            Продолжить
          </button>
        </>
      )}
    </div>
  );
};
export default ResultReserv;
