import { DetailedHTMLProps, HTMLAttributes, useContext, useMemo } from 'react';
import classNames from 'classnames';

import calendarContext from './context';
import { getDateString } from './utils';

import classes from './index.module.css';

interface CalendarDayProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  date: Date;
}

const Day = ({ date, className, ...props }: CalendarDayProps) => {
  const { value, onChange, minDate, maxDate } = useContext(calendarContext);
  const selected = useMemo(
    () => value && getDateString(value) === getDateString(date),
    [date, value]
  );

  return (
    <div
      className={classNames(
        classes.day,
        selected && classes['day-selected'],
        className
      )}
    >
      <button
        className={classes['day-button']}
        onClick={() => onChange?.(date)}
        disabled={(minDate && date < minDate) || (maxDate && date > maxDate)}
        {...props}
      >
        {date.getDate()}
      </button>
    </div>
  );
};

export default Day;
