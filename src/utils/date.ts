function getDateDetails(dateString: Date | string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return { year, month, day };
}

function getDateWithSeparator(dateString: Date | string, separator: string = '') {
  const { year, month, day } = getDateDetails(dateString);
  return [
    String(year),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join(separator);
}

function getLocaleFormat(dateString: Date | string) {
  const { year, month, day } = getDateDetails(dateString);
  return `${year}년 ${month}월 ${day}일`;
}

function getMonthYearDetails(initialDate: Date) {
  const month = initialDate.getMonth() + 1;
  const year = initialDate.getFullYear();

  // 매달 1일이 무슨 요일부터 시작하는지
  const startDate = new Date(`${year}-${month}`);
  const firstDOW = startDate.getDay();
  const lastDateString = String(
    new Date(initialDate.getFullYear(), initialDate.getMonth() + 1, 0).getDate()
  );

  const lastDate = Number(lastDateString);

  return { month, year, startDate, firstDOW, lastDate };
}

type MonthYear = {
  month: number;
  year: number;
  startDate: Date;
  firstDOW: number;
  lastDate: number;
};
function getNewMonthYear(prevDate: MonthYear, increment: number) {
  const newMonthYear = new Date(
    prevDate.startDate.setMonth(prevDate.startDate.getMonth() + increment)
  );

  return getMonthYearDetails(newMonthYear);
}

export { getDateWithSeparator, getLocaleFormat, getMonthYearDetails, getNewMonthYear };
export type { MonthYear };
