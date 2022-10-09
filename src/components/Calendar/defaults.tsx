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
  renderDay:
    (value?: Date) =>
    // TODO: Pass `dateInCurrentMonth` param instead of month
    (date: Date, month: [year: number, month: number]) =>
      date.getTime() < new Date(...month, 1).getTime() ? (
        <span key={getDateString(date)} className={classes.day} />
      ) : (
        <Day
          date={date}
          selected={value && value.getTime() === date.getTime()}
          key={getDateString(date)}
          id={getDateString(date)}
        />
      ),
};

export default defaults;
