import { useMemo, useState } from 'react';

import { Calendar, RangeCalendar } from '../src';
import type { CalendarClasses } from '../src/types';
import { YearPickerProps } from '../src/components/YearPicker';

import '@fontsource/figtree/variable.css';
import './App.css';
import classes from './Calendar.module.css';

const today = new Date();
const locale = 'en-US';

const calendarClasses: CalendarClasses = {
  arrowSwitcher: classes['arrow-switcher'],
  day: classes.day,
  dayEnd: classes['day-end'],
  dayInRange: classes['day-in-range'],
  dayLabel: classes['day-label'],
  daySelected: classes['day-selected'],
  daysHeader: classes['days-header'],
  dayStart: classes['day-start'],
  header: classes.header,
  headerMonth: classes['header-month'],
  week: classes.week,
  yearButton: classes['year-button'],
  yearPicker: classes['year-picker'],
  yearPickerRow: classes['year-picker-row'],
  yearSelected: classes['year-selected'],
};

const yearPickerProps: Omit<
  YearPickerProps,
  'className' | 'initialFirstItem' | 'onYearClick'
> = {
  height: 280,
  itemsPerRow: 4,
  rowCount: 120,
  rowHeight: 52,
  rowScrollOffset: 40,
};

const App = () => {
  // Calendar state
  const [selectedDate, setSelectedDate] = useState<Date>();
  // RangeCalendar state
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(),
    [selectedEndDate, setSelectedEndDate] = useState<Date>();

  const formatDate = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: 'full',
      }).format,
    []
  );

  return (
    <>
      <div className='calendar-display'>
        <h1 className='calendar-display-title'>Calendar</h1>
        <div className='selected-date-text'>
          {selectedDate
            ? `Selected date:\n${formatDate(selectedDate)}`
            : 'Click on a date to select it.'}
        </div>
        <Calendar
          value={selectedDate}
          onChange={newDate => setSelectedDate(newDate)}
          minDate={new Date(today.getTime() - 8640000000)}
          maxDate={new Date(today.getTime() + 8640000000)}
          locale={locale}
          className={classes.calendar}
          classes={calendarClasses}
          yearPickerProps={yearPickerProps}
        />
      </div>
      <div className='calendar-display'>
        <h1 className='calendar-display-title'>Range Calendar</h1>
        <div className='selected-date-text'>
          {selectedStartDate
            ? `Start: ${formatDate(selectedStartDate)}\n${
                selectedEndDate
                  ? `End: ${formatDate(selectedEndDate)}`
                  : 'Click on an end date to select it.'
              }`
            : 'Click on a start date to select it.'}
        </div>
        <RangeCalendar
          value={[selectedStartDate, selectedEndDate]}
          onStartDateChange={newDate => setSelectedStartDate(newDate)}
          onEndDateChange={newDate => setSelectedEndDate(newDate)}
          minDate={new Date(today.getTime() - 8640000000)}
          maxDate={new Date(today.getTime() + 8640000000)}
          locale={locale}
          className={classes.calendar}
          classes={calendarClasses}
          yearPickerProps={yearPickerProps}
        />
      </div>
    </>
  );
};

export default App;
