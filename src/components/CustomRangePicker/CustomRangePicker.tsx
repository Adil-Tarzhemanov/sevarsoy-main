import styles from "./styles.module.scss";
import React, { FC, JSX, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Alert, ConfigProvider, DatePicker } from "antd";
import ruRU from "antd/lib/locale/ru_RU";
import { SwapRightOutlined } from "@ant-design/icons";
import { useRoomsDaysDataByQuery } from "../../api/queries/rooms/roomsDays.get";
import RoomTypes from "./components/RoomTypes/RoomTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../../store/hooks";
import {
  endPickerDate,
  pickerDates,
  startPickerDate,
} from "../../store/slices/rangePicker.slice";
import { useWindowSize } from "../../hooks/windowSize";

// const { RangePicker } = DatePicker;

interface BookingData {
  booked_day: string;
  price: number;
  room_type: string;
}

interface BookingDay {
  day: string;
  month: string;
}

interface CustomRangePickerPropsType {
  handlePickerOpenChange: any;
}

const CustomRangePicker: FC = () => {
  const client = useQueryClient();
  const [selectedRange, setSelectedRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [isInvalidRange, setIsInvalidRange] = useState<boolean>(false);
  const [roomType, setRoomType] = useState("Standard");
  const {
    data: roomsDaysData,
    isLoading,
    isError,
  } = useRoomsDaysDataByQuery(roomType);

  const dispatch = useAppDispatch();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [dates, setDates] = useState([null, null]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    client.fetchQuery({ queryKey: ["roomsDays"] });
  }, [roomType]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const extractedDates = roomsDaysData?.map((item: BookingData) => {
    const [year, month, day] = item.booked_day.split("-");
    return { day, month };
  });

  // const handleDateChange = (value: any, dateString: any, type: any) => {
  //   if (type === "start") setDates([dateString, dates[1]]);
  //   else setDates([dates[0], dateString]);
  // };

  const handleChange = (dates: any, datesStrings: any) => {
    dispatch(pickerDates(datesStrings));
  };

  const handleStartChange = (date: any, dateStrings: any) => {
    dispatch(startPickerDate(dateStrings));
  };

  const handleEndChange = (date: any, dateStrings: any) => {
    dispatch(endPickerDate(dateStrings));
  };

  const handleCalendarChange = (dates: any) => {
    if (!dates || !dates[0] || !dates[1]) {
      setIsInvalidRange(false);
      setSelectedRange([null, null]);
      return;
    }

    const [start, end] = dates;

    if (start && end && start.isBefore(end, "day")) {
      const isRangeInvalid = Array.from(
        { length: end.diff(start, "day") + 1 },
        (_, i) => handleDisabledDate(start.add(i, "day")),
      ).some(Boolean);

      setIsInvalidRange(isRangeInvalid);
    } else {
      setIsInvalidRange(false);
    }

    setSelectedRange([start, end]);
  };

  const handleDisabledDate = (currentDate: Dayjs) => {
    const currentDateFormatted = currentDate.format("DD.MM");
    return (
      currentDate.isBefore(dayjs().subtract(1, "day")) ||
      extractedDates?.some((date: any) => {
        const formattedDate = `${date.day}.${date.month}`;
        const isSameMonth =
          currentDate.month() + 1 === parseInt(date.month, 10);
        return isSameMonth && formattedDate === currentDateFormatted;
      })
    );
  };

  return (
    // <div className={styles.container}>
    //   <div className={styles.pickerWrapper}>
    <ConfigProvider locale={ruRU}>
      {isInvalidRange && (
        <div className={styles.error}>
          <Alert
            message="Недопустимый диапазон дат"
            description="Выбранный диапазон содержит недопустимые даты."
            type="error"
            showIcon
            style={{
              width: 367,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </div>
      )}
      {windowWidth > 768 ? (
        <DatePicker.RangePicker
          style={{ width: "367px", opacity: 0 }}
          defaultValue={[null, null]}
          format="DD.MM.YY"
          onChange={handleChange}
          suffixIcon={<SwapRightOutlined />}
          renderExtraFooter={() => <RoomTypes setRoomType={setRoomType} />}
          onCalendarChange={handleCalendarChange}
          disabledDate={handleDisabledDate}
        />
      ) : (
        <div className={styles.smallWidthWrapper}>
          <DatePicker
            onChange={handleStartChange}
            format="DD.MM.YY"
            suffixIcon={<SwapRightOutlined />}
            placeholder="Начальная дата"
            style={{ width: 177.5, height: 45 }}
            disabledDate={handleDisabledDate}
            placement="bottomRight"
          />
          <DatePicker
            onChange={handleEndChange}
            format="DD.MM.YY"
            suffixIcon={<SwapRightOutlined />}
            placeholder="Конечная дата"
            style={{ width: 177.5 }}
            disabledDate={handleDisabledDate}
            placement="bottomRight"
          />
        </div>
      )}
    </ConfigProvider>
    //   </div>
    // </div>
  );
};

export default CustomRangePicker;
