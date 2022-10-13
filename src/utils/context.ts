import { createContext, ReactNode } from 'react';

import type { CalendarClasses, CalendarMonth, DateRange } from '../types';
import defaults from './defaults';

interface ICalendarContext {
  value?: Date | DateRange;
  onChange?: (date: Date) => void;
  onStartDateChange?: (date?: Date) => void;
  onEndDateChange?: (date?: Date) => void;
  locale: string;
  minDate?: Date;
  maxDate?: Date;
  viewedMonth: CalendarMonth;
  yearPickerVisible: boolean;
  renderDay?: (date: Date, dateInCurrentMonth?: boolean) => ReactNode;
  classes?: CalendarClasses;
}

const initialState: ICalendarContext = {
  onChange: defaults.onChange,
  onStartDateChange: defaults.onChange,
  onEndDateChange: defaults.onChange,
  viewedMonth: defaults.viewedMonth,
  locale: defaults.locale,
  yearPickerVisible: defaults.yearPickerVisible,
  classes: {},
};

const calendarContext = createContext<ICalendarContext>(initialState);

export default calendarContext;
