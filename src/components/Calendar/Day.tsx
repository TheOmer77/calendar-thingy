import {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useContext,
  useMemo,
} from 'react';
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
  const {
    value,
    onChange,
    onStartDateChange,
    onEndDateChange,
    minDate,
    maxDate,
  } = useContext(calendarContext);

  const selected = useMemo(
    () =>
      value &&
      (Array.isArray(value)
        ? value
            .map(valueDate => valueDate && getDateString(valueDate))
            .includes(getDateString(date))
        : getDateString(value) === getDateString(date)),
    [date, value]
  );

  const handleDayClick = useCallback(() => {
    if (!Array.isArray(value)) return onChange?.(date);

    const [startDate, endDate] = value;
    if (!endDate)
      return !startDate || date.getTime() <= startDate?.getTime()
        ? onStartDateChange?.(date)
        : onEndDateChange?.(date);

    onStartDateChange?.(date);
    onEndDateChange?.();
  }, [date, onChange, onEndDateChange, onStartDateChange, value]);

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
        onClick={handleDayClick}
        disabled={(minDate && date < minDate) || (maxDate && date > maxDate)}
        {...props}
      >
        {date.getDate()}
      </button>
    </div>
  );
};

export default Day;
