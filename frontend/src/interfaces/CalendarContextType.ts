export default interface CalendarContextType {
  darkMode: boolean;
  month: number;
  setMonth: (month: number) => void;
  year: number;
  setYear: (year: number) => void;
  selectedMonth: string;
  setSelectedMonth: (selectedMonth: string) => void;
  startPicker: boolean;
  setStartPicker: (startPicker: boolean) => void;
  startDate: Date;
  setStartDate: (startDate: Date) => void;
  endDate: Date;
  setEndDate: (endDate: Date) => void;
}
