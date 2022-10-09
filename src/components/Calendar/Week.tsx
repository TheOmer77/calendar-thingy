import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classNames from 'classnames';

import Day from './Day';
import { getDateString } from './utils';

import classes from './index.module.css';

interface CalendarWeekProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  month: [year: number, month: number];
  days?: Date[];
}

const Week = ({ month, days = [], className, ...props }: CalendarWeekProps) => {
  return (
    <div className={classNames(classes.week, className)} {...props}>
      {days.map(date =>
        date.getTime() < new Date(...month, 1).getTime() ? (
          <span key={getDateString(date)} className={classes.day} />
        ) : (
          <Day date={date} key={getDateString(date)} id={getDateString(date)} />
        )
      )}
    </div>
  );
};

export default Week;
