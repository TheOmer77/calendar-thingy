import {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler,
  useContext,
} from 'react';
import classNames from 'classnames';

import calendarContext from '../utils/context';

import defaultClasses from '../styles/index.module.css';

interface CalendarHeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onNextClick?: MouseEventHandler<HTMLButtonElement>;
  onPrevClick?: MouseEventHandler<HTMLButtonElement>;
  onYearPickerClick?: MouseEventHandler<HTMLButtonElement>;
}

const Header = ({
  onNextClick,
  onPrevClick,
  onYearPickerClick,
  className,
  ...props
}: CalendarHeaderProps) => {
  const { viewedMonth, locale, minDate, maxDate, yearPickerVisible, classes } =
    useContext(calendarContext);

  return (
    <div className={classNames(defaultClasses.header, className)} {...props}>
      <button
        className={classNames(classes?.headerMonth)}
        onClick={onYearPickerClick}
      >
        {Intl.DateTimeFormat(locale, {
          month: 'long',
          year: 'numeric',
        }).format(new Date(...viewedMonth))}
      </button>
      {!yearPickerVisible && (
        <div
          className={classNames(
            defaultClasses['arrow-switcher'],
            classes?.arrowSwitcher
          )}
        >
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
Header.displayName = 'Header';

export default Header;
