import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { getWeekday } from './utils';

import classes from './index.module.css';

interface CalendarDaysHeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  locale?: string;
}

const CalendarDaysHeader = ({
  locale,
  className,
  ...props
}: CalendarDaysHeaderProps) => {
  return (
    <div className={classNames(classes['days-header'], className)} {...props}>
      {[...Array(7).keys()].map(key => (
        <span key={key} className={classes.day}>
          {getWeekday(new Date(259200000 + 86400000 * key), locale)}
        </span>
      ))}
    </div>
  );
};

export default CalendarDaysHeader;
