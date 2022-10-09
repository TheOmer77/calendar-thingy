import { DetailedHTMLProps, HTMLAttributes, useContext } from 'react';
import classNames from 'classnames';

import calendarContext from './context';

import classes from './index.module.css';

interface CalendarWeekProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  month: [year: number, month: number];
  days?: Date[];
}

const Week = ({ month, days = [], className, ...props }: CalendarWeekProps) => {
  const { renderDay } = useContext(calendarContext);

  return (
    <div className={classNames(classes.week, className)} {...props}>
      {days.map(date => renderDay?.(date, month))}
    </div>
  );
};

export default Week;
