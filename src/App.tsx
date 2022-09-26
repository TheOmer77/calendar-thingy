import { useMemo, useState } from 'react';

import { Calendar, RangeCalendar } from './components/Calendar';

import '@fontsource/figtree/variable.css';
import './App.css';

const today = new Date();
const locale = 'en-US';

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
        />
      </div>
      <div className='calendar-display'>
        <h1 className='calendar-display-title'>Range Calendar</h1>
        <div className='selected-date-text'>
          {selectedStartDate
            ? `Start: ${formatDate(selectedStartDate)}\n${
                selectedEndDate
                  ? `End: ${formatDate(selectedStartDate)}`
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
        />
      </div>
    </>
  );
};

export default App;
