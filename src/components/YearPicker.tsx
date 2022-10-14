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

import YearButton from './YearButton';
import calendarContext from '../utils/context';
import defaults from '../utils/defaults';

import defaultClasses from '../styles/index.module.css';

export interface YearPickerProps {
  initialFirstItem: number;
  onYearClick: (year: number) => void;
  height?: number;
  itemsPerRow?: number;
  rowCount?: number;
  rowHeight?: number;
  rowScrollOffset?: number;
  className?: string;
}

const YearPicker = ({
  initialFirstItem,
  onYearClick,
  height = defaults.yearPickerProps.height,
  itemsPerRow = defaults.yearPickerProps.itemsPerRow,
  rowCount = defaults.yearPickerProps.rowCount,
  rowHeight = defaults.yearPickerProps.rowHeight,
  rowScrollOffset = defaults.yearPickerProps.rowScrollOffset,
  className,
}: YearPickerProps) => {
  const {
    viewedMonth: [viewedYear],
    minDate,
    maxDate,
    classes,
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
    [
      firstItem,
      itemsPerRow,
      maxDate,
      minDate,
      rowCount,
      rowHeight,
      rowScrollOffset,
    ]
  );

  useEffect(() => {
    listRef.current?.scrollTo?.(rowScrollOffset * rowHeight);
  }, [rowHeight, rowScrollOffset]);

  return (
    <FixedSizeList
      ref={listRef as LegacyRef<FixedSizeList>}
      className={classNames(defaultClasses['year-picker'], className)}
      itemCount={rowCount}
      itemSize={rowHeight}
      width='100%'
      height={height}
      onScroll={handleScroll}
    >
      {({ index, style }) => (
        <div
          className={classNames(
            defaultClasses['year-picker-row'],
            classes?.yearPickerRow
          )}
          style={style}
        >
          {[...Array(itemsPerRow).keys()].map(key => {
            const value =
              Math.floor(firstItem / itemsPerRow) * itemsPerRow +
              index * itemsPerRow +
              key;
            return (
              <YearButton
                key={value}
                value={value}
                className={classNames(
                  classes?.yearButton,
                  viewedYear === value && classes?.yearSelected
                )}
                onClick={() => onYearClick(value)}
                disabled={
                  (minDate &&
                    new Date(value + 1, 0, 0).getTime() < minDate.getTime()) ||
                  (maxDate &&
                    new Date(value, 0, 1).getTime() > maxDate.getTime())
                }
              />
            );
          })}
        </div>
      )}
    </FixedSizeList>
  );
};
YearPicker.displayName = 'YearPicker';

export default YearPicker;
