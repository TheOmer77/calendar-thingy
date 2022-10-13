import classNames from 'classnames';

import Day from '../components/Day';
import { getDateString } from '../utils/utils';
import type { CalendarClasses, CalendarMonth } from '../types';
import defaultClasses from '../styles/index.module.css';

const defaults = {
  onChange: () => {
    return;
  },
  viewedMonth: [
    new Date().getFullYear(),
    new Date().getMonth(),
  ] as CalendarMonth,
  locale: 'en-US',
  yearPickerVisible: false,
  renderDay:
    (classes: CalendarClasses, value?: Date) =>
    (date: Date, dateInCurrentMonth?: boolean) =>
      dateInCurrentMonth === true ? (
        <Day
          date={date}
          selected={value && value.getTime() === date.getTime()}
          key={getDateString(date)}
          id={getDateString(date)}
          className={classNames(
            value && value.getTime() === date.getTime() && classes.daySelected
          )}
        />
      ) : (
        <span
          key={getDateString(date)}
          className={classNames(defaultClasses.day, classes.day)}
        />
      ),
  classes: {} as CalendarClasses,
};

export default defaults;
