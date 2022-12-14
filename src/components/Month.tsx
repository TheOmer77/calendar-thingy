import { useContext, useMemo } from 'react';
import classNames from 'classnames';

import Week from './Week';
import { getDateString } from '../utils/utils';
import calendarContext from '../utils/context';
import type { CalendarMonth } from '../types';

interface CalendarMonthProps {
  month: CalendarMonth;
}

const Month = ({ month: [year, month] }: CalendarMonthProps) => {
  const { classes } = useContext(calendarContext);
  const weeksInMonth = useMemo(() => {
    const firstOfMonth = new Date(year, month, 1),
      lastOfMonth = new Date(year, month + 1, 0);

    return [
      ...Array(
        Math.ceil((firstOfMonth.getDay() + lastOfMonth.getDate()) / 7)
      ).keys(),
    ].map(weekNum =>
      [...Array(7).keys()].map(
        dayNum =>
          new Date(
            year,
            month,
            dayNum + 1 + weekNum * 7 - firstOfMonth.getDay()
          )
      )
    );
  }, [month, year]);

  return (
    <>
      {weeksInMonth.map((week, index) => (
        <Week
          key={`${getDateString(new Date(year, month, 1))
            .split('-')
            .slice(0, 2)
            .join('-')}-week${index + 1}`}
          className={classNames(classes?.week)}
          month={[year, month]}
          days={week}
        />
      ))}
    </>
  );
};
Month.displayName = 'Month';

export default Month;
