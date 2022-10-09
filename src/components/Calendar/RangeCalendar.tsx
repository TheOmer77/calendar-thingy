import { DetailedHTMLProps, HTMLAttributes, useCallback } from 'react';
import classNames from 'classnames';

import Calendar from './Calendar';
import Day from './Day';
import { getDateString } from './utils';

import classes from './index.module.css';

export type DateRange = [startDate?: Date, endDate?: Date];

export interface RangeCalendarProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'onChange'
  > {
  value?: DateRange;
  onStartDateChange?: (startDate?: Date) => void;
  onEndDateChange?: (startDate?: Date) => void;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
}

const isFirstWeekday = (date: Date) => date.getDay() === 0,
  isLastWeekday = (date: Date) => date.getDay() === 6;
const isFirstMonthDay = (date: Date) => date.getDate() === 1,
  isLastMonthDay = (date: Date) =>
    getDateString(date) ===
    getDateString(new Date(date.getFullYear(), date.getMonth() + 1, 0));

const RangeCalendar = ({
  value: [startDate, endDate] = [undefined, undefined],
  onStartDateChange = () => {
    return;
  },
  onEndDateChange = () => {
    return;
  },
  locale = 'en-US',
  minDate,
  maxDate,
  className,
  ...props
}: RangeCalendarProps) => {
  const inDateRange = useCallback(
    (date: Date) =>
      startDate &&
      endDate &&
      date.getTime() >= startDate.getTime() &&
      date.getTime() <= endDate.getTime(),
    [endDate, startDate]
  );
  const isStartDate = useCallback(
      (date: Date) => date.getTime() === startDate?.getTime(),
      [startDate]
    ),
    isEndDate = useCallback(
      (date: Date) => date.getTime() === endDate?.getTime(),
      [endDate]
    );

  const renderRangeMarker = useCallback(
    (date: Date) =>
      !(
        (isStartDate(date) && (isLastWeekday(date) || isLastMonthDay(date))) ||
        (isEndDate(date) && (isFirstWeekday(date) || isFirstMonthDay(date)))
      ),
    [isEndDate, isStartDate]
  );

  const handleDayClick = useCallback(
    (date: Date) => {
      if (!endDate)
        return !startDate || date.getTime() <= startDate?.getTime()
          ? onStartDateChange?.(date)
          : onEndDateChange?.(date);

      onStartDateChange?.(date);
      onEndDateChange?.();
    },
    [endDate, onEndDateChange, onStartDateChange, startDate]
  );

  return (
    <Calendar
      renderDay={(date, month) =>
        date.getTime() < new Date(...month, 1).getTime() ? (
          <span key={getDateString(date)} className={classes.day} />
        ) : (
          <Day
            date={date}
            selected={
              (startDate && date.getTime() === startDate.getTime()) ||
              (endDate && date.getTime() === endDate.getTime())
            }
            key={getDateString(date)}
            id={getDateString(date)}
            className={classNames(
              renderRangeMarker(date) && [
                inDateRange(date) && classes['day-in-range'],
                isStartDate(date) && classes['day-start'],
                isEndDate(date) && classes['day-end'],
              ]
            )}
          />
        )
      }
      locale={locale}
      onChange={handleDayClick}
      minDate={minDate}
      maxDate={maxDate}
      className={className}
      {...props}
    />
  );
};

export default RangeCalendar;
