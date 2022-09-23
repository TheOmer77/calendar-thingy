import classNames from 'classnames';
import { CalendarProps } from '.';

import { getWeekday } from './utils';

import classes from './index.module.css';

const CalendarDaysHeader = ({ locale, className, ...props }: CalendarProps) => {
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
