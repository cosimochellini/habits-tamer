export const greater = (date1: Date | string, date2: Date | string) =>
  new Date(date1).getTime() >= new Date(date2).getTime()
