import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classNames from 'classnames';

import classes from './index.module.css';

interface CalendarDayProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  day: number;
}

const Day = ({ day, className, ...props }: CalendarDayProps) => {
  return (
    <span className={classNames(classes.day, className)} {...props}>
      {day < 1 ? '' : day}
    </span>
  );
};

export default Day;
