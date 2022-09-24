import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classNames from 'classnames';

import classes from './index.module.css';

interface CalendarDayProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  day: number;
}

const Day = ({ day, className, ...props }: CalendarDayProps) => {
  return day < 1 ? (
    <span className={classes.day} />
  ) : (
    <button className={classNames(classes.day, className)} {...props}>
      {day}
    </button>
  );
};

export default Day;
