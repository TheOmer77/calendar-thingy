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
  const { value, onChange } = useContext(calendarContext);
  const selected = useMemo(
    () => value && getDateString(value) === getDateString(date),
    [date, value]
  );

  return (
    <button
      className={classNames(
        classes.day,
        selected && classes['day-selected'],
        className
      )}
      onClick={() => onChange?.(date)}
      {...props}
    >
      {date.getDate()}
    </button>
  );
};

export default Day;
