import dayjs from "dayjs";

export const resultSum = (numbers: any, numbersInfo: any, dates: any) => {
  const startDate = dayjs(dates[0], "DD.MM.YY");
  const endDate = dayjs(dates[1], "DD.MM.YY");
  console.log(endDate.diff(startDate, "day")); // Проверка разницы
  console.log(dayjs(dates[1]).diff(dayjs(dates[0]), "day"));
  let daysDifference = endDate.diff(startDate, "day");
  if (daysDifference === 0) daysDifference = 1;
  const mattressesCount = numbers.reduce((sum: number, current: any) => {
    return (sum += current.mattress);
  }, 0);
  const nutritionCount = numbers.reduce((sum: number, current: any) => {
    return (sum += current.nutrition);
  }, 0);
  const matressesSum = mattressesCount * numbersInfo.mattress;
  const nutritionSum = nutritionCount * numbersInfo.nutrition;

  const standartCount = numbers.filter(
    (number: any) => number.type === "standart",
  ).length;
  const deluxeCount = numbers.filter(
    (number: any) => number.type === "deluxe",
  ).length;
  const luxeCount = numbers.filter(
    (number: any) => number.type === "luxe",
  ).length;
  const standartSum =
    standartCount * numbersInfo.data[0].price * daysDifference;
  const deluxeSum = deluxeCount * numbersInfo.data[1].price * daysDifference;
  const luxeSum = luxeCount * numbersInfo.data[2].price * daysDifference;

  return (matressesSum + nutritionSum + standartSum + deluxeSum + luxeSum)*100;
};
