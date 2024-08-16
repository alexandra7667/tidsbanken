import { useEffect, useState } from "react";
import { weekDays } from "../../../../assets/strings/weekdays";
import "./Calendar.css";
import Cell from "./Cell";
import createCalendarMonth from "./CreateCalendar";
import getAllVacationRequests from "./GetAllVacationRequests";
import setList from "./SetList";
import getDatesBetween from "./GetDatesBetween";
import matchDays from "./MatchDays";
import data from "../../../../assets/data/Requests.json"

interface CalendarProps {
  year: number;
  month: number;
  startPicker: boolean;
  startDate: Date;
  setStartDate: (startDate: Date) => void;
  endDate: Date;
  setEndDate: (endDate: Date) => void;
}

export default function Calendar({
  year,
  month,
  startPicker,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: CalendarProps) {
  const [allDays, setAllDays] = useState([]);
  const [visibleVacationRequests, setVisibleVacationRequests] = useState([]);
  type mapType = Map<Date, string[]>;
  const vacationMapFiller: mapType = new Map();
  const [vacationMap, setVacationMap] = useState<mapType>(new Map());

  useEffect(() => {
    createCalendarMonth(year, month, setAllDays);
  }, [month, year]);

  useEffect(() => {
    const fetchVacationRequests = async () => {
      // const fetchedVacationRequests = await getAllVacationRequests();
      console.log("mock data: ", data)
      setList(
        data,
        setVisibleVacationRequests,
        1, 
      );
    };

    fetchVacationRequests();
  }, []);

  useEffect(() => {
    if(visibleVacationRequests.length > 0) {
      for (const request of visibleVacationRequests) {
        getDatesBetween(request, vacationMapFiller);
      }
      setVacationMap(vacationMapFiller);
    }
  }, [visibleVacationRequests])


  return (
    <div className="calendar">
      {weekDays.map((day) => (
        <div className="header" key={day}>
          {day}
        </div>
      ))}
      {vacationMap.size > 0 && allDays.map((day, index) => {
        const { allUserIds } = matchDays(day, month, year, vacationMap); //All user id:s that have this day approved for vacation
        return (
          <Cell
            key={index}
            day={day}
            month={month}
            year={year}
            startPicker={startPicker}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            allUserIds={allUserIds}
          />
        );
      })}
    </div>
  );
}
