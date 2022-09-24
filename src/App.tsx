import { useState } from 'react';

import Calendar from './components/Calendar';

import './App.css';

const App = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <Calendar
      value={selectedDate}
      onChange={newDate => setSelectedDate(newDate)}
    />
  );
};

export default App;
