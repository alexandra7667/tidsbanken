import { weekDays } from "../../../../assets/strings/weekdays";
import "./Calendar.css";
import Cell from "./Cell";

interface CalendarProps {
  year: number;
  month: number;
}

export default function Calendar({ year, month }: CalendarProps) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 0).getDay(); //Which day the 1st is on. Monday=0

  console.log("daysInMonth: ", daysInMonth);
  console.log("startDay: ", startDay);

  //Creates an array with 'startDay' empty indices (empty cells before the month starts)
  const emptyCells = Array(startDay).fill(null);

  //Creates an array with days from 1 to 'daysInMonth'
  const cellsWithNumbers = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  //Combine both arrays into one with both empty cells in the beginning and following numbered cells
  const daysWithFrontPadding = emptyCells.concat(cellsWithNumbers);

  //Calculate number of rows in the grid (5-7)
  const numRows = Math.ceil(daysWithFrontPadding.length / 7);

  //Add empty cells at the end
  const allDays = [...daysWithFrontPadding, ...Array(7 * numRows - daysWithFrontPadding.length).fill(null)];

  return (
    <div className="calendar">
      <div className="grid">
        {weekDays.map((day) => (
          <div className="header" key={day}>
            {day}
          </div>
        ))}
        {allDays.map((day, index) => (
          <Cell key={index} day={day} />
        ))}
      </div>
    </div>
  );
}
