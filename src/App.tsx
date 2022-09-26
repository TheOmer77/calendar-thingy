import { useState } from 'react';

import { Calendar } from './components/Calendar';

import './App.css';

const today = new Date();

const App = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();

  return (
    <Calendar
      value={selectedDate}
      onChange={newDate => setSelectedDate(newDate)}
      minDate={new Date(today.getTime() - 8640000000)}
      maxDate={new Date(today.getTime() + 8640000000)}
    />
  );
};

export default App;
