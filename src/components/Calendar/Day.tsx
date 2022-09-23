import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { getDateString } from './utils';

import classes from './index.module.css';

interface CalendarDayProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  viewedMonth: [year: number, month: number];
  day: number;
}

const Day = ({ viewedMonth, day, className, ...props }: CalendarDayProps) => {
  return (
    <span
      key={getDateString(new Date(viewedMonth[0], viewedMonth[1], day))}
      id={getDateString(new Date(viewedMonth[0], viewedMonth[1], day))}
      className={classNames(classes.day, className)}
      {...props}
    >
      {day < 1 ? '' : day}
    </span>
  );
};

export default Day;
