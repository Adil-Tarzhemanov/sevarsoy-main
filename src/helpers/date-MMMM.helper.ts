import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

export const dateMonthFormatted = (date: any) => {
  return dayjs(date, "DD.MM.YY").format("D MMMM");
};

export const dateDayFormatted = (date: any) => {
  return dayjs(date, "DD.MM.YY").format("dddd");
};
