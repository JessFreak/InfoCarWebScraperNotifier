const isInRange = (dateString, startDate, endDate) => {
  const [day, month] = dateString.split('.').map(num => parseInt(num, 10));
  const date = new Date(startDate.getFullYear(), month - 1, day);
  return date >= startDate && date <= endDate;
};

export const filterDatesInRange = (datesObject, startDate, endDate) => {
  return Object.entries(datesObject)
    .filter(([date]) => isInRange(date, startDate, endDate))
    .reduce((acc, [date, times]) => {
      acc[date] = times;
      return acc;
    }, {});
};

export const getDateRange = (daysAhead = 0) => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + daysAhead);
  return { startDate: today, endDate: futureDate };
};