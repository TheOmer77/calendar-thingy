import {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler,
  useContext,
} from 'react';
import classNames from 'classnames';

import calendarContext from './context';

import classes from './index.module.css';

interface CalendarHeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onNextClick?: MouseEventHandler<HTMLButtonElement>;
  onPrevClick?: MouseEventHandler<HTMLButtonElement>;
}

const CalendarHeader = ({
  onNextClick,
  onPrevClick,
  className,
  ...props
}: CalendarHeaderProps) => {
  const { viewedMonth, locale } = useContext(calendarContext);

  return (
    <div
      className={classNames(classes['calendar-header'], className)}
      {...props}
    >
      <h3 className={classes.month}>
        {Intl.DateTimeFormat(locale, {
          month: 'long',
          year: 'numeric',
        }).format(new Date(...viewedMonth))}
      </h3>
      <div className={classes['arrow-switcher']}>
        <button onClick={onPrevClick}>&#8249;</button>
        <button onClick={onNextClick}>&#8250;</button>
      </div>
    </div>
  );
};

export default CalendarHeader;
