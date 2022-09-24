import { DetailedHTMLProps, HTMLAttributes, useContext } from 'react';
import classNames from 'classnames';

import Day from './Day';
import calendarContext from './context';
import { getDateString } from './utils';

import classes from './index.module.css';

interface CalendarWeekProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  week?: number[];
}

const Week = ({ week = [], className, ...props }: CalendarWeekProps) => {
  const { viewedMonth } = useContext(calendarContext);

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
