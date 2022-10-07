import { createContext } from 'react';
import { DateRange } from './RangeCalendar';

interface ICalendarContext {
  value?: Date | DateRange;
  onChange?: (date: Date) => void;
  onStartDateChange?: (date?: Date) => void;
  onEndDateChange?: (date?: Date) => void;
  locale: string;
  minDate?: Date;
  maxDate?: Date;
  viewedMonth: [year: number, month: number];
  yearPickerVisible: boolean;
}

const initialState: ICalendarContext = {
  onChange: () => {
    return;
  },
  onStartDateChange: () => {
    return;
  },
  onEndDateChange: () => {
    return;
  },
  viewedMonth: [new Date().getFullYear(), new Date().getMonth()],
  locale: 'en-US',
  yearPickerVisible: false,
};

const calendarContext = createContext<ICalendarContext>(initialState);

export default calendarContext;
