import { createContext } from 'react';

interface ICalendarContext {
  value?: Date;
  onChange?: (date: Date) => void;
  viewedMonth: [year: number, month: number];
  locale: string;
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
