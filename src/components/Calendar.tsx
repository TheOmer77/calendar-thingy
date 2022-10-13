import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import classNames from 'classnames';

import CalendarDaysHeader from './DaysHeader';
import CalendarHeader from './Header';
import Month from './Month';
import YearPicker, { YearPickerProps } from './YearPicker';
import calendarContext from '../utils/context';
import defaults from '../utils/defaults';
import type { CalendarClasses, CalendarMonth } from '../types';

import defaultClasses from '../styles/index.module.css';

export interface CalendarProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'onChange'
  > {
  value?: Date;
  onChange?: (date: Date) => void;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  renderDay?: (date: Date, dateInCurrentMonth?: boolean) => ReactNode;
  classes?: CalendarClasses;
  yearPickerProps?: Omit<
    YearPickerProps,
    'initialFirstItem' | 'onYearClick' | 'className'
  >;
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value,
      onChange = defaults.onChange,
      locale = defaults.locale,
      minDate,
      maxDate,
      renderDay,
      classes = defaults.classes,
      yearPickerProps,
      className,
      ...props
    },
    ref
  ) => {
    const [viewedMonth, setViewedMonth] = useState<CalendarMonth>([
      new Date().getFullYear(),
      new Date().getMonth(),
    ]);
    const [yearPickerVisible, setYearPickerVisible] = useState<boolean>(false);

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

    const handleYearClick = useCallback(
      (year: number) => {
        setViewedMonth(prev => [
          year,
          minDate &&
          new Date(year, prev[1] + 1, 0).getTime() < minDate.getTime()
            ? minDate.getMonth()
            : maxDate &&
              new Date(year, prev[1], 1).getTime() > maxDate.getTime()
            ? maxDate.getMonth()
            : prev[1],
        ]);
        setYearPickerVisible(false);
      },
      [maxDate, minDate]
    );

    return (
      <calendarContext.Provider
        value={{
          locale,
          maxDate,
          minDate,
          onChange,
          value,
          viewedMonth,
          yearPickerVisible,
          renderDay: renderDay || defaults.renderDay(classes, value),
          classes,
          yearPickerProps,
        }}
      >
        <div
          className={classNames(defaultClasses.calendar, className)}
          ref={ref}
          {...props}
        >
          <CalendarHeader
            onNextClick={nextMonth}
            onPrevClick={prevMonth}
            onYearPickerClick={() => setYearPickerVisible(prev => !prev)}
            className={classNames(classes.header)}
          />
          {yearPickerVisible ? (
            <YearPicker
              initialFirstItem={viewedMonth[0]}
              onYearClick={handleYearClick}
              className={classNames(classes.yearPicker)}
              itemsPerRow={yearPickerProps?.itemsPerRow}
              height={yearPickerProps?.height}
              rowCount={yearPickerProps?.rowCount}
              rowHeight={yearPickerProps?.rowHeight}
              rowScrollOffset={yearPickerProps?.rowScrollOffset}
            />
          ) : (
            <>
              <CalendarDaysHeader className={classNames(classes.daysHeader)} />
              <Month month={viewedMonth} />
            </>
          )}
        </div>
      </calendarContext.Provider>
    );
  }
);
Calendar.displayName = 'Calendar';

export default Calendar;
