import { useState } from "react";
import Calendar from "./Calendar/Calendar.tsx";
import {
  Button,
} from "react-bootstrap";
import { monthNames } from "../../assets/strings/monthNames.ts";
import YearPicker from "./Picker/YearPicker.tsx";
import MonthPicker from "./Picker/MonthPicker.tsx";
import CreateRequest from "./Calendar/CreateRequest/CreateRequest.tsx";

export default function Dashboard({ darkMode }) {
  const user = {role: 'admin'}
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

  return (
    <>
      <YearPicker year={year} setYear={setYear}/>

      <MonthPicker month={month} setMonth={setMonth} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} darkMode={darkMode} />

      <div className="d-flex justify-content-center m-2">
        <Button variant="outlined-primary" onClick={today}>Today</Button>
      </div>

      <CreateRequest startPicker={startPicker} setStartPicker={setStartPicker} setStartDate={setStartDate} startDate={startDate} setEndDate={setEndDate} endDate={endDate} type={'vacationRequest'}/>

      {user.role === 'admin' && (
        <CreateRequest startPicker={startPicker} setStartPicker={setStartPicker} setStartDate={setStartDate} startDate={startDate} setEndDate={setEndDate} endDate={endDate} type={'ieligiblePeriod'}/>
      )}

      <Calendar year={year} month={month} startPicker={startPicker} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} darkMode={darkMode} />
    </>
  );
}
