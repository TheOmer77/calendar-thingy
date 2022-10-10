import {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler,
  useContext,
} from 'react';
import classNames from 'classnames';

import calendarContext from '../utils/context';

import classes from '../styles/index.module.css';

interface CalendarHeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onNextClick?: MouseEventHandler<HTMLButtonElement>;
  onPrevClick?: MouseEventHandler<HTMLButtonElement>;
  onYearPickerClick?: MouseEventHandler<HTMLButtonElement>;
}

const CalendarHeader = ({
  onNextClick,
  onPrevClick,
  onYearPickerClick,
  className,
  ...props
}: CalendarHeaderProps) => {
  const { viewedMonth, locale, minDate, maxDate, yearPickerVisible } =
    useContext(calendarContext);

  return (
    <div
      className={classNames(classes['calendar-header'], className)}
      {...props}
    >
      <button className={classes.month} onClick={onYearPickerClick}>
        {Intl.DateTimeFormat(locale, {
          month: 'long',
          year: 'numeric',
        }).format(new Date(...viewedMonth))}
      </button>
      {!yearPickerVisible && (
        <div className={classes['arrow-switcher']}>
          <button
            onClick={onPrevClick}
            disabled={minDate && new Date(...viewedMonth, 0) < minDate}
          >
            &#8249;
          </button>
          <button
            onClick={onNextClick}
            disabled={
              maxDate &&
              new Date(viewedMonth[0], viewedMonth[1] + 1, 0) > maxDate
            }
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
};

export default CalendarHeader;
