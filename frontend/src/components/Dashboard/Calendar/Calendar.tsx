import { useContext, useEffect, useState } from "react";
import { weekDays } from "../../../assets/strings/weekdays";
import "./Calendar.css";
import Cell from "./Cell/Cell.tsx";
import createCalendarMonth from "./functions/CreateCalendar.ts";
import setList from "./functions/SetList.ts";
import getDatesBetween from "./functions/GetDatesBetween.ts";
import matchDays from "./functions/MatchDays.ts";
// import data from "../../../assets/data/Requests.json";
import { CalendarContext } from "../Dashboard.tsx";
import { UserContext } from "../../../App.tsx";
import VacationRequest from "../../../interfaces/VacationRequest.ts";
import fetchData from "../../../functions/fetchData.ts";
import { ErrorContext } from "../../../App.tsx";

export default function Calendar() {
  const { darkMode, year, month } = useContext(CalendarContext);
  const { user } = useContext(UserContext);
  const { setErrorMessage } = useContext(ErrorContext);
  const [allDays, setAllDays] = useState<number[]>();
  const [vacationRequests, setVacationRequests] = useState<VacationRequest[]>();
  const [visibleVacationRequests, setVisibleVacationRequests] = useState<VacationRequest[]>();
  type mapType = Map<Date, string[]>;
  const vacationMapFiller: mapType = new Map();
  const [vacationMap, setVacationMap] = useState<mapType>(new Map());

  useEffect(() => {
    const days = createCalendarMonth(year, month);
    setAllDays(days);
  }, [month, year]);

  useEffect(() => {
    async function fetchVacationRequests() {
      const response = await fetchData(
        `request`,
        "GET",
        null,
        "Failed to get vacation requests."
      );
      if (response.status === "error" && response.message) {
        setErrorMessage(response.message);
      } else {
        setVacationRequests(response.data);
      }
    }

    fetchVacationRequests();
  }, []);

  useEffect(() => {
    async function setVisibleRequests() {
      if(vacationRequests && vacationRequests.length > 0) {
        const response = setList(vacationRequests, user!.id);
        setVisibleVacationRequests(response);
      }
    }

    setVisibleRequests();
  }, [vacationRequests]);

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
