export type CalendarMonth = [year: number, month: number];
export type DateRange = [startDate?: Date, endDate?: Date];

export interface CalendarClasses {
  arrowSwitcher?: string;
  header?: string;
  day?: string;
  dayLabel?: string;
  daysHeader?: string;
  week?: string;
  yearButton?: string;
  yearPicker?: string;
  yearPickerRow?: string;
  /** No default styling - this class may be provided by the classes prop only;
   * Only used by the RangeCalendar component.  */
  dayEnd?: string;
  /** No default styling - this class may be provided by the classes prop only;
   * Only used by the RangeCalendar component.  */
  dayInRange?: string;
  /** No default styling - this class may be provided by the classes prop only. */
  daySelected?: string;
  /** No default styling - this class may be provided by the classes prop only;
   * Only used by the RangeCalendar component.  */
  dayStart?: string;
  /** No default styling - this class may be provided by the classes prop only. */
  headerMonth?: string;
  /** No default styling - this class may be provided by the classes prop only. */
  yearSelected?: string;
}
