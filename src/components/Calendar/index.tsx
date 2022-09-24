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

import classes from './index.module.css';

export interface CalendarProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'onChange'
  > {
  value?: Date;
  onChange?: (date: Date) => void;
  locale?: string;
}

const Calendar = ({
  value,
  onChange = () => {
    return;
  },
  locale = 'en-US',
  className,
  ...props
}: CalendarProps) => {
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
    <calendarContext.Provider value={{ locale, onChange, value, viewedMonth }}>
      <div className={classNames(classes.calendar, className)} {...props}>
        <CalendarHeader onNextClick={nextMonth} onPrevClick={prevMonth} />
        <CalendarDaysHeader />
        <Month month={viewedMonth} />
      </div>
    </calendarContext.Provider>
  );
};

export default Calendar;
