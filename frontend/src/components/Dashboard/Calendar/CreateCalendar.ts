import { SetStateAction } from "react";

export default function createCalendarMonth(year: number, month: number, setAllDays: (days: number[]) => void) {

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 0).getDay(); //Which day the 1st is on. Monday=0

  //Creates an array with 'firstDay' empty indices (empty cells before the month starts)
  const emptyCells = Array(firstDay).fill(null);

  //Creates an array with days from 1 to 'daysInMonth'
  const cellsWithNumbers = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  //Combine both arrays into one with both empty cells in the beginning and following numbered cells
  const daysWithFrontPadding = emptyCells.concat(cellsWithNumbers);

  //Calculate number of rows in the grid (5-7)
  const numRows = Math.ceil(daysWithFrontPadding.length / 7);

  //Add empty cells at the end
  const days = [
    ...daysWithFrontPadding,
    ...Array(7 * numRows - daysWithFrontPadding.length).fill(null),
  ];

  setAllDays(days);

//   console.log("All days: ", days)
}
