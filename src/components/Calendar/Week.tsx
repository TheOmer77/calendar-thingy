import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classNames from 'classnames';

import Day from './Day';
import { getDateString } from './utils';

import classes from './index.module.css';

interface CalendarWeekProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  viewedMonth: [year: number, month: number];
  week?: number[];
}

const Week = ({
  viewedMonth,
  week = [],
  className,
  ...props
}: CalendarWeekProps) => {
  return (
    <div className={classNames(classes.week, className)} {...props}>
      {week.map(day => (
        <Day
          day={day}
          key={getDateString(new Date(viewedMonth[0], viewedMonth[1], day))}
          id={getDateString(new Date(viewedMonth[0], viewedMonth[1], day))}
        />
      ))}
    </div>
  );
};

export default Week;
