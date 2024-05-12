import styles from "./styles.module.scss";
import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { resultSum } from "../../../../../../helpers/resultSum.helper";
import { useNavigate } from "react-router-dom";
import { dateForDB } from "../../../../../../helpers/date-YYYY-MM-DD.helper";
import { useRoomsDetailsByMutation } from "../../../../../../api/queries/rooms/secondStep.post";
import ResultReserv from "../../../ResultReserv/ResultReserv";

const MobileResultReserv: FC = () => {
  const numbers = useAppSelector((state) => state.rangePickerReducer.numbers);
  const numbersInfo = useAppSelector(
    (state) => state.rangePickerReducer.numbersInfo,
  );
  const dates = useAppSelector((state) => state.rangePickerReducer.dates);

  const [activeResult, setActiveResult] = useState(false);

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

  const { isError, error, mutate } = useRoomsDetailsByMutation(
    roomsDetailsRequest,
    navigate,
    dispatch,
  );
  console.log(error);
  if (isError) return <div>{error.message}</div>;

  return (
    <>
      {numbers.some((item: any) => item.type !== "none") && (
        <div className={styles.container}>
          {activeResult && (
            <div className={styles.modalWindow}>
              <ResultReserv />
            </div>
          )}
          <div className={styles.left} onClick={() => setActiveResult(true)}>
            <img
              src="/assets/reservation/basket.png"
              alt="basket"
              className={styles.basketImg}
            />
            <div className={styles.content}>
              <h4 className={styles.date}>
                {numbers.length} {numbers.length < 2 ? "номер" : "номера"}
              </h4>
              <h3 className={styles.sum}>
                {resultSum(numbers, numbersInfo, dates)} сум
              </h3>
            </div>
          </div>
          <div className={styles.right}>
            <button className={styles.continueBtn} onClick={() => mutate()}>
              Продолжить
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default MobileResultReserv;
