import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classNames from 'classnames';

import Day from './Day';
import { getDateString } from './utils';

import classes from './index.module.css';

interface CalendarWeekProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  month: [year: number, month: number];
  week?: number[];
}

const Week = ({ month, week = [], className, ...props }: CalendarWeekProps) => {
  return (
    <div className={classNames(classes.week, className)} {...props}>
      {week.map(day =>
        day < 1 ? (
          <span
            key={getDateString(new Date(month[0], month[1], day))}
            className={classes.day}
          />
        ) : (
          <Day
            date={new Date(...month, day)}
            key={getDateString(new Date(month[0], month[1], day))}
            id={getDateString(new Date(month[0], month[1], day))}
          />
        )
      )}
    </div>
  );
};

export default Week;
