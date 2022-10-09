import {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useContext,
} from 'react';
import classNames from 'classnames';

import calendarContext from './context';

import classes from './index.module.css';

interface CalendarWeekProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  month: [year: number, month: number];
  days?: Date[];
}

const Week = ({
  month: [year, month],
  days = [],
  className,
  ...props
}: CalendarWeekProps) => {
  const { renderDay } = useContext(calendarContext);
  const dateInCurrentMonth = useCallback(
    (date: Date) =>
      date.getTime() >= new Date(year, month, 1).getTime() &&
      date.getTime() < new Date(year, month + 1, 1).getTime(),
    [month, year]
  );

  return (
    <div className={classNames(classes.week, className)} {...props}>
      {days.map(date => renderDay?.(date, dateInCurrentMonth(date)))}
    </div>
  );
};

export default Week;
