import {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useState,
} from 'react';
import classNames from 'classnames';

import CalendarDaysHeader from './DaysHeader';
import CalendarHeader from './Header';
import Month from './Month';
import calendarContext from './context';
import defaults from './defaults';

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
  const [viewedMonth, setViewedMonth] = useState<[year: number, month: number]>(
    [new Date().getFullYear(), new Date().getMonth()]
  );

  const nextMonth = useCallback(
      () =>
        setViewedMonth(prev => [
          prev[0] + (prev[1] > 10 ? 1 : 0),
          prev[1] > 10 ? 0 : prev[1] + 1,
        ]),
      []
    ),
    prevMonth = useCallback(
      () =>
        setViewedMonth(prev => [
          prev[0] - (prev[1] < 1 ? 1 : 0),
          prev[1] < 1 ? 11 : prev[1] - 1,
        ]),

      []
    );

  return (
    <calendarContext.Provider
      value={{
        locale,
        maxDate,
        minDate,
        onStartDateChange,
        onEndDateChange,
        value: [startDate, endDate],
        viewedMonth,
        yearPickerVisible: defaults.yearPickerVisible, // Temporary!
        renderDay: defaults.renderDay, // Temporary!
      }}
    >
      <div className={classNames(classes.calendar, className)} {...props}>
        <CalendarHeader onNextClick={nextMonth} onPrevClick={prevMonth} />
        <CalendarDaysHeader />
        <Month month={viewedMonth} />
      </div>
    </calendarContext.Provider>
  );
};

export default RangeCalendar;
