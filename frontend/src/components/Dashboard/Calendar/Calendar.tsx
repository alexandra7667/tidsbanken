import { useContext, useEffect, useState } from "react";
import { weekDays } from "../../../assets/strings/weekdays";
import "./Calendar.css";
import Cell from "./Cell";
import createCalendarMonth from "./CreateCalendar";
import getAllVacationRequests from "./GetAllVacationRequests";
import setList from "./SetList";
import getDatesBetween from "./GetDatesBetween";
import matchDays from "./MatchDays";
// import data from "../../../assets/data/Requests.json";
import { CalendarContext } from "../Dashboard.tsx";
import { UserContext } from "../../../App.tsx";
import VacationRequest from "../../../interfaces/VacationRequest.ts";

export default function Calendar() {
  const { darkMode, year, month } = useContext(CalendarContext);
  const { user } = useContext(UserContext);
  const [allDays, setAllDays] = useState<number[]>();
  const [visibleVacationRequests, setVisibleVacationRequests] = useState<VacationRequest[]>();
  type mapType = Map<Date, string[]>;
  const vacationMapFiller: mapType = new Map();
  const [vacationMap, setVacationMap] = useState<mapType>(new Map());

  useEffect(() => {
    createCalendarMonth(year, month, setAllDays);
  }, [month, year]);

  useEffect(() => {
    const fetchVacationRequests = async () => {
      const fetchedVacationRequests = await getAllVacationRequests();
      // console.log("mock data: ", data);
      setList(fetchedVacationRequests, setVisibleVacationRequests, user!.id);
    };

    fetchVacationRequests();
  }, []);

  useEffect(() => {
    if (visibleVacationRequests && visibleVacationRequests.length > 0) {
      for (const request of visibleVacationRequests) {
        getDatesBetween(request, vacationMapFiller);
      }
      setVacationMap(vacationMapFiller);
    }
  }, [visibleVacationRequests]);

  return (
    <div className="calendar">
      {weekDays.map((day) => (
        <div className={darkMode ? "header-dark" : "header-light"} key={day}>
          {day}
        </div>
      ))}
      {vacationMap.size > 0 &&
        allDays!.map((day, index) => {
          const { allUserIds } = matchDays(day, month, year, vacationMap); //All user id:s that have this day approved for vacation
          return (
            <Cell
              key={index}
              day={day}
              allUserIds={allUserIds}
            />
          );
        })}
    </div>
  );
}
