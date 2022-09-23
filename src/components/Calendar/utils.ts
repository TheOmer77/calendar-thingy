export const getWeekday = (
  date?: number | Date | undefined,
  locale = 'en-US'
) => new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(date);

export const getDateString = (date: Date) =>
  new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    .toISOString()
    .split('T')[0];
