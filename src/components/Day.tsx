import {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useContext,
} from 'react';
import classNames from 'classnames';

import calendarContext from '../utils/context';

import defaultClasses from '../styles/index.module.css';

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
    classes,
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
        defaultClasses.day,
        classes?.day,
        selected && classes?.daySelected,
        className
      )}
      onClick={handleDayClick}
      disabled={(minDate && date < minDate) || (maxDate && date > maxDate)}
      aria-pressed={selected}
      {...props}
    >
      {date.getDate()}
    </button>
  );
};
Day.displayName = 'Day';

export default Day;
