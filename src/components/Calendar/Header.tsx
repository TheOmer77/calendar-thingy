import { DetailedHTMLProps, HTMLAttributes, MouseEventHandler } from 'react';
import classNames from 'classnames';

import classes from './index.module.css';

interface CalendarHeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  viewedMonth: [year: number, month: number];
  locale?: string;
  onNextClick?: MouseEventHandler<HTMLButtonElement>;
  onPrevClick?: MouseEventHandler<HTMLButtonElement>;
}

const CalendarHeader = ({
  viewedMonth,
  locale,
  onNextClick,
  onPrevClick,
  className,
  ...props
}: CalendarHeaderProps) => {
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
