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
        // Convert startDate and endDate from ISO strings to Date objects with time set to midnight
        const updatedData = response.data.map((request) => {
          const startDate = new Date(request.startDate);
          startDate.setHours(0, 0, 0, 0); // Set to midnight
          const endDate = new Date(request.endDate);
          endDate.setHours(0, 0, 0, 0); // Set to midnight
  
          // Return the updated request with Date objects
          return {
            ...request,
            startDate,
            endDate,
          };
        });
  
        setVacationRequests(updatedData);
      }
    }
  
    fetchVacationRequests();
  }, []);

  useEffect(() => {
    async function setVisibleRequests() {
      if (vacationRequests && vacationRequests.length > 0) {
        const response = await setList(vacationRequests, user!.id);
        setVisibleVacationRequests(response);
      }
    }

    setVisibleRequests();
  }, [vacationRequests]);

  useEffect(() => {
    console.log(visibleVacationRequests);
    
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
      {allDays && allDays.map((day, index) => (
        <Cell key={index} day={day} allUserIds={matchDays(day, month, year, vacationMap).allUserIds} />
      ))}
    </div>
  );
}
