import { createContext } from 'react';

interface ICalendarContext {
  value?: Date;
  onChange?: (date: Date) => void;
  locale: string;
  minDate?: Date;
  maxDate?: Date;
  viewedMonth: [year: number, month: number];
}

const initialState: ICalendarContext = {
  onChange: () => {
    return;
  },
  viewedMonth: [new Date().getFullYear(), new Date().getMonth()],
  locale: 'en-US',
};

const calendarContext = createContext<ICalendarContext>(initialState);

export default calendarContext;
