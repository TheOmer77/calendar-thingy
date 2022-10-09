import { createContext, ReactNode } from 'react';

import { DateRange } from './RangeCalendar';
import defaults from './defaults';

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
  renderDay: (date: Date, month: [year: number, month: number]) => ReactNode;
}

const initialState: ICalendarContext = {
  onChange: defaults.onChange,
  onStartDateChange: defaults.onChange,
  onEndDateChange: defaults.onChange,
  viewedMonth: defaults.viewedMonth,
  locale: defaults.locale,
  yearPickerVisible: defaults.yearPickerVisible,
  renderDay: defaults.renderDay,
};

const calendarContext = createContext<ICalendarContext>(initialState);

export default calendarContext;
