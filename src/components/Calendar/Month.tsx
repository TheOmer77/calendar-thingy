import { useContext, useMemo } from 'react';

import Week from './Week';
import calendarContext from './context';

const Month = () => {
  const { viewedMonth } = useContext(calendarContext);

  const weeksInMonth = useMemo(() => {
    const monthFirstWeekday = new Date(
      viewedMonth[0],
      viewedMonth[1],
      1
    ).getDay();
    const daysInMonth = new Date(
      viewedMonth[0],
      viewedMonth[1] + 1,
      0
    ).getDate();
    return [...Array(monthFirstWeekday + daysInMonth).keys()].reduce(
      (result, item, index) => {
        const chunkIndex = Math.floor(index / 7);
        if (!result[chunkIndex]) result[chunkIndex] = [];
        result[chunkIndex].push(item - monthFirstWeekday + 1);
        return result;
      },
      [] as number[][]
    );
  }, [viewedMonth]);

  return (
    <>
      {weeksInMonth.map((week, index) => (
        <Week key={`week-${index + 1}`} week={week} />
      ))}
    </>
  );
};

export default Month;
