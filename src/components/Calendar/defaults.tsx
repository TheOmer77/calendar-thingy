import Day from './Day';
import { getDateString } from './utils';
import classes from './index.module.css';

const defaults = {
  onChange: () => {
    return;
  },
  viewedMonth: [new Date().getFullYear(), new Date().getMonth()] as [
    year: number,
    month: number
  ],
  locale: 'en-US',
  yearPickerVisible: false,
  renderDay: (value?: Date) => (date: Date, dateInCurrentMonth?: boolean) =>
    dateInCurrentMonth === true ? (
      <Day
        date={date}
        selected={value && value.getTime() === date.getTime()}
        key={getDateString(date)}
        id={getDateString(date)}
      />
    ) : (
      <span key={getDateString(date)} className={classes.day} />
    ),
};

export default defaults;
