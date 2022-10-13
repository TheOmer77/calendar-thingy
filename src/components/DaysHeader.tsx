import { DetailedHTMLProps, HTMLAttributes, useContext } from 'react';
import classNames from 'classnames';

import calendarContext from '../utils/context';
import { getWeekday } from '../utils/utils';

import defaultClasses from '../styles/index.module.css';

const CalendarDaysHeader = ({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const { locale, classes } = useContext(calendarContext);

  return (
    <div
      className={classNames(defaultClasses['days-header'], className)}
      {...props}
    >
      {[...Array(7).keys()].map(key => (
        <span
          key={key}
          className={classNames(defaultClasses['day-label'], classes?.dayLabel)}
        >
          {getWeekday(new Date(259200000 + 86400000 * key), locale)}
        </span>
      ))}
    </div>
  );
};

export default CalendarDaysHeader;
