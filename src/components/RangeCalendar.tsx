import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  useCallback,
} from 'react';
import classNames from 'classnames';

import Calendar from './Calendar';
import Day from './Day';
import { getDateString } from '../utils/utils';
import type { CalendarClasses, DateRange } from '../types';
import type { YearPickerProps } from './YearPicker';

import defaultClasses from '../styles/index.module.css';

export interface RangeCalendarProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'onChange' | 'ref'
  > {
  value?: DateRange;
  onStartDateChange?: (startDate?: Date) => void;
  onEndDateChange?: (startDate?: Date) => void;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  classes?: CalendarClasses;
  yearPickerProps?: Omit<
    YearPickerProps,
    'className' | 'initialFirstItem' | 'onYearClick'
  >;
}

const isFirstWeekday = (date: Date) => date.getDay() === 0,
  isLastWeekday = (date: Date) => date.getDay() === 6;
const isFirstMonthDay = (date: Date) => date.getDate() === 1,
  isLastMonthDay = (date: Date) =>
    getDateString(date) ===
    getDateString(new Date(date.getFullYear(), date.getMonth() + 1, 0));

const RangeCalendar = forwardRef<HTMLDivElement, RangeCalendarProps>(
  (
    {
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
      classes,
      yearPickerProps,
      className,
      ...props
    },
    ref
  ) => {
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
          (isStartDate(date) &&
            (isLastWeekday(date) || isLastMonthDay(date))) ||
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
        ref={ref}
        renderDay={(date, dateInCurrentMonth) =>
          dateInCurrentMonth ? (
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
                  inDateRange(date) && classes?.dayInRange,
                  isStartDate(date) && classes?.dayStart,
                  isEndDate(date) && classes?.dayEnd,
                ]
              )}
            />
          ) : (
            <span
              key={getDateString(date)}
              className={classNames(defaultClasses.day, classes?.day)}
            />
          )
        }
        locale={locale}
        onChange={handleDayClick}
        minDate={minDate}
        maxDate={maxDate}
        classes={classes}
        yearPickerProps={yearPickerProps}
        className={className}
        {...props}
      />
    );
  }
);
RangeCalendar.displayName = 'RangeCalendar';

export default RangeCalendar;
