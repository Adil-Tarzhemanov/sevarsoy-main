import dayjs from "dayjs";

export const dateForDB = (date: any) => {
  return dayjs(date, "DD.MM.YY").format("YYYY-MM-DD");
};
