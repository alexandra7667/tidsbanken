import { useEffect, useState } from "react";
import { weekDays } from "../../../../assets/strings/weekdays";
import "./Calendar.css";
import Cell from "./Cell";
import createCalendarMonth from "./CreateCalendar";
import getAllVacationRequests from "./GetAllVacationRequests";

interface CalendarProps {
  year: number;
  month: number;
  startPicker: boolean;
  startDate: Date;
  setStartDate: (startDate: Date) => void;
  endDate: Date;
  setEndDate: (endDate: Date) => void;
}

export default function Calendar({ year, month, startPicker, startDate, setStartDate, endDate, setEndDate }: CalendarProps) {
  const [allDays, setAllDays] = useState([]);
  const [myVacationRequests, setMyVacationRequests] = useState([]);
  const [allApprovedRequests, setAllApprovedRequests] = useState([]);

  useEffect(() => {
    createCalendarMonth(year, month, setAllDays);
  }, [month, year])

  useEffect(() => {
    getAllVacationRequests(setMyVacationRequests, setAllApprovedRequests, 1);
  }, [])

  return (
    <div className="calendar">
        {weekDays.map((day) => (
          <div className="header" key={day}>
            {day}
          </div>
        ))}
        {allDays.map((day, index) => (
          <Cell key={index} day={day} month={month} year={year} startPicker={startPicker} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
        ))}
    </div>
  );
}
