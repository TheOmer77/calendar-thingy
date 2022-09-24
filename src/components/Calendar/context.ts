import { createContext } from 'react';

interface ICalendarContext {
  viewedMonth: [year: number, month: number];
  locale: string;
}

const initialState: ICalendarContext = {
  viewedMonth: [new Date().getFullYear(), new Date().getMonth()],
  locale: 'en-US',
};

const calendarContext = createContext<ICalendarContext>(initialState);

export default calendarContext;
