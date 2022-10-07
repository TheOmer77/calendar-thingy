import {
  LegacyRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { FixedSizeList, ListOnScrollProps } from 'react-window';

import classes from './index.module.css';
import calendarContext from './context';

export interface YearPickerProps {
  initialFirstItem: number;
  onYearClick: (year: number) => void;
}

const itemsPerRow = 4,
  rowCount = 120,
  rowHeight = 52,
  rowScrollOffset = 40;

const YearPicker = ({ initialFirstItem, onYearClick }: YearPickerProps) => {
  const {
    viewedMonth: [viewedYear],
    minDate,
    maxDate,
  } = useContext(calendarContext);

  const listRef = useRef<FixedSizeList>();
  const [firstItem, setFirstItem] = useState<number>(
    initialFirstItem - rowScrollOffset * itemsPerRow
  );

  const handleScroll = useCallback(
    ({ scrollDirection, scrollOffset }: ListOnScrollProps) => {
      if (
        scrollDirection === 'forward' &&
        scrollOffset >= rowCount * rowHeight - rowScrollOffset * rowHeight
      ) {
        if (
          maxDate &&
          firstItem + rowScrollOffset * itemsPerRow > maxDate.getFullYear()
        )
          return;
        setFirstItem(prev => prev + rowScrollOffset * itemsPerRow);
        listRef.current?.scrollTo(scrollOffset - rowScrollOffset * rowHeight);
      }

      if (
        scrollDirection === 'backward' &&
        scrollOffset <= rowScrollOffset * rowHeight
      ) {
        if (
          minDate &&
          firstItem - rowScrollOffset * itemsPerRow < minDate.getFullYear()
        )
          return;
        setFirstItem(prev => prev - rowScrollOffset * itemsPerRow);
        listRef.current?.scrollTo(scrollOffset + rowScrollOffset * rowHeight);
      }
    },
    [firstItem, maxDate, minDate]
  );

  useEffect(() => {
    listRef.current?.scrollTo?.(rowScrollOffset * rowHeight);
  }, []);

  return (
    <FixedSizeList
      ref={listRef as LegacyRef<FixedSizeList>}
      className={classes['year-picker']}
      itemCount={rowCount}
      itemSize={rowHeight}
      width={304}
      height={280}
      onScroll={handleScroll}
    >
      {({ index, style }) => (
        <div className={classes['year-picker-row']} style={style}>
          {[...Array(itemsPerRow).keys()].map(key => {
            const value =
              Math.floor(firstItem / itemsPerRow) * itemsPerRow +
              index * itemsPerRow +
              key;
            return (
              <button
                key={key}
                className={classNames(
                  classes['year-button'],
                  viewedYear === value && classes['year-selected']
                )}
                onClick={() => onYearClick(value)}
                disabled={
                  (minDate &&
                    new Date(value + 1, 0, 0).getTime() < minDate.getTime()) ||
                  (maxDate &&
                    new Date(value, 0, 1).getTime() > maxDate.getTime())
                }
              >
                {value}
              </button>
            );
          })}
        </div>
      )}
    </FixedSizeList>
  );
};

export default YearPicker;
