import { useMemo } from 'react';
import { getDateString } from './utils';

import Week from './Week';

interface CalendarMonthProps {
  month: [year: number, month: number];
}

const Month = ({ month }: CalendarMonthProps) => {
  const weeksInMonth = useMemo(() => {
    const monthFirstWeekday = new Date(month[0], month[1], 1).getDay();
    const daysInMonth = new Date(month[0], month[1] + 1, 0).getDate();
    return [...Array(monthFirstWeekday + daysInMonth).keys()].reduce(
      (result, item, index) => {
        const chunkIndex = Math.floor(index / 7);
        if (!result[chunkIndex]) result[chunkIndex] = [];
        result[chunkIndex].push(item - monthFirstWeekday + 1);
        return result;
      },
      [] as number[][]
    );
  }, [month]);

  return (
    <>
      {weeksInMonth.map((week, index) => (
        <Week
          key={`${getDateString(new Date(...month, 1))
            .split('-')
            .slice(0, 2)
            .join('-')}-week${index + 1}`}
          month={month}
          week={week}
        />
      ))}
    </>
  );
};

export default Month;
