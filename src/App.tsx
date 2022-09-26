import { useMemo, useState } from 'react';

import { Calendar } from './components/Calendar';

import '@fontsource/figtree/variable.css';
import './App.css';

const today = new Date();
const locale = 'en-US';

const App = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();

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
    </>
  );
};

export default App;
