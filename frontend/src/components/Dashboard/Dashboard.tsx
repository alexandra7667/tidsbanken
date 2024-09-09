import { createContext, useContext, useState } from "react";
import Calendar from "./Calendar/Calendar.tsx";
import {
  Button,
} from "react-bootstrap";
import { monthNames } from "../../assets/strings/monthNames.ts";
import YearPicker from "./Picker/YearPicker.tsx";
import MonthPicker from "./Picker/MonthPicker.tsx";
import CreateRequest from "./Calendar/CreateRequest/CreateRequest.tsx";
import CalendarContextType from "../../interfaces/CalendarContextType.ts";
import { UserContext } from "../../App.tsx";

const defaultCalendarContext: CalendarContextType = {
  darkMode: false,
  month: 0,
  setMonth: () => {},
  year: 0,
  setYear: () => {},
  selectedMonth: '',
  setSelectedMonth: () => {},
  startDate: new Date(),
  setStartDate: () => {},
  endDate: new Date(),
  setEndDate: () => {},
  startPicker: true,
  setStartPicker: () => {},
};

const CalendarContext = createContext<CalendarContextType>(defaultCalendarContext);

function Dashboard() {
  const { user } = useContext(UserContext);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); //0 = January, 1 = February, etc.
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [selectedMonth, setSelectedMonth] = useState(monthNames[currentMonth]); //Title in dropdown
  const [startDate, setStartDate] = useState(new Date);
  const [endDate, setEndDate] = useState(new Date);
  const [startPicker, setStartPicker] = useState(true);
  
  const today = () => {
    setMonth(currentMonth);
    setYear(currentYear);
    setSelectedMonth(monthNames[currentMonth]);
  };

  const calendarContextValue: CalendarContextType = {
    darkMode: user!.darkMode, //! (non-null assertion operator) guarantees user is not null
    month,
    setMonth,
    year,
    setYear,
    selectedMonth,
    setSelectedMonth,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startPicker,
    setStartPicker,
  };

  return (
    <CalendarContext.Provider value={calendarContextValue}>
      <YearPicker />

      <MonthPicker />

      <div className="d-flex justify-content-center m-2">
        <Button variant="outlined-primary" onClick={today}>Today</Button>
      </div>

      <CreateRequest type={'vacationRequest'}/>

      {user!.role === 'admin' && (
        <CreateRequest type={'ieligiblePeriod'}/>
      )}

      <Calendar />
    </CalendarContext.Provider>
  );
}

export { Dashboard, CalendarContext };