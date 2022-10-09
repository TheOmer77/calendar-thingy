import {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useContext,
} from 'react';
import classNames from 'classnames';

import calendarContext from './context';

import classes from './index.module.css';

interface CalendarDayProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  date: Date;
  selected?: boolean;
}

const Day = ({ date, selected, className, ...props }: CalendarDayProps) => {
  const {
    value,
    onChange,
    onStartDateChange,
    onEndDateChange,
    minDate,
    maxDate,
  } = useContext(calendarContext);

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
    <button
      className={classNames(
        classes.day,
        selected && classes['day-selected'],
        className
      )}
      onClick={handleDayClick}
      disabled={(minDate && date < minDate) || (maxDate && date > maxDate)}
      {...props}
    >
      {date.getDate()}
    </button>
  );
};

export default Day;
