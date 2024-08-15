import { useState } from "react";

interface CellProps {
  day: string;
  year: number;
  month: number;
  startPicker: boolean;
  startDate: Date;
  setStartDate: (startDate: Date) => void;
  endDate: Date;
  setEndDate: (endDate: Date) => void;
}

export default function Cell({ day, month, year, startPicker, startDate, setStartDate, endDate, setEndDate } : CellProps) {
  const [cellColor, setCellColor] = useState(false);

    const selection = () => {
    console.log("selected: ", day)

    if(day == null) return; //Clicked on empty cell

    const date = new Date(year, month, +day);
    console.log(`picked date: `, date);

    if(startPicker && date >= endDate) {
      console.log("start date is more than end date: ", date)
      return;
    }
    if(!startPicker && date <= startDate) {
      console.log("end date is less than start date", date)
      return;
    }

    setCellColor(true);

    setTimeout(() => {
      setCellColor(false);
    }, 300);

    if(startPicker) {
      setStartDate(date);
      console.log("picked start date: ", date)
    }

    else {
      setEndDate(date);
      console.log("picked end date: ", date)
    }
  }

    return (
        <>
        <div className={cellColor ? "pickedcell" : "cell"} onClick={selection} >
            {day !== null ? day : ""}
          </div>
        </>
    )
}