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
  const inDateRange = useMemo(
    () =>
      Array.isArray(value) &&
      value[0] &&
      value[1] &&
      date.getTime() >= value[0]?.getTime() &&
      date.getTime() <= value[1].getTime(),
    [date, value]
  );
  const isStartDate = useMemo(
      () => Array.isArray(value) && date.getTime() === value[0]?.getTime(),
      [date, value]
    ),
    isEndDate = useMemo(
      () => Array.isArray(value) && date.getTime() === value[1]?.getTime(),
      [date, value]
    );
  const isFirstWeekday = useMemo(() => date.getDay() === 0, [date]),
    isLastWeekday = useMemo(() => date.getDay() === 6, [date]);
  const isFirstMonthDay = useMemo(() => date.getDate() === 1, [date]),
    isLastMonthDay = useMemo(
      () =>
        getDateString(date) ===
        getDateString(new Date(date.getFullYear(), date.getMonth() + 1, 0)),
      [date]
    );

  const renderRangeMarker = useMemo(
    () =>
      !(
        (isStartDate && (isLastWeekday || isLastMonthDay)) ||
        (isEndDate && (isFirstWeekday || isFirstMonthDay))
      ),
    [
      isEndDate,
      isFirstMonthDay,
      isFirstWeekday,
      isLastMonthDay,
      isLastWeekday,
      isStartDate,
    ]
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
    <button
      className={classNames(
        classes.day,
        selected && classes['day-selected'],
        renderRangeMarker && [
          inDateRange && classes['day-in-range'],
          isStartDate && classes['day-start'],
          isEndDate && classes['day-end'],
        ],
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
