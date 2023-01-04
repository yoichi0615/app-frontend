import dayjs from "dayjs";

export const getMonth = (month: number = dayjs().month()) => {
  const year: number = dayjs().year();
  const firstDayOfTheMonth: number = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount: number = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}
