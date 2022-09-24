import { DetailedHTMLProps, HTMLAttributes, useContext } from 'react';
import classNames from 'classnames';

import calendarContext from './context';
import { getWeekday } from './utils';

import classes from './index.module.css';

const CalendarDaysHeader = ({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const { locale } = useContext(calendarContext);

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
