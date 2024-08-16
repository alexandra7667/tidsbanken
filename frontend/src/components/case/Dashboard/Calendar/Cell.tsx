import { useEffect, useState } from "react";

interface CellProps {
  day: string;
  year: number;
  month: number;
  startPicker: boolean;
  startDate: Date;
  setStartDate: (startDate: Date) => void;
  endDate: Date;
  setEndDate: (endDate: Date) => void;
  allUserIds: string[];
}

export default function Cell({
  day,
  month,
  year,
  startPicker,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  allUserIds,
}: CellProps) {
  const [reqColor, setReqColor] = useState(false);
  const [showRequests, setShowRequests] = useState(false);

  useEffect(() => {
    setReqColor(false);

    if (allUserIds.length > 0) {
      //All user id:s that have this day approved for vacation or the current user's request (pending/approved/denied)
      //exampel: this cell will have a dot or something to indicate there are people who are on vacation this day.
      //when hovering over the dot, all user id:s are visible as pop up and when you click on the user id you go to their vacation history page
      // console.log("in cell ", day,  " user ids: ", allUserIds)
      setReqColor(true);
    }
  }, [day]);

  const selection = () => {
    console.log("selected: ", day, " with user ids: ", allUserIds);

    if (day == null) return; //Clicked on empty cell

    const date = new Date(year, month, +day);
    // console.log(`picked date: `, date);

    if (startPicker && date >= endDate) {
      // console.log("start date is more than end date: ", date);
      return;
    }
    if (!startPicker && date <= startDate) {
      // console.log("end date is less than start date", date);
      return;
    }

    if (startPicker) {
      setStartDate(date);
      console.log("picked start date: ", date);
    } else {
      setEndDate(date);
      console.log("picked end date: ", date);
    }
  };


  return (
    <>
      <div
        className={reqColor ? "reqcell" : "cell"}
        onClick={selection}
        onMouseEnter={() => setShowRequests(true)}
        onMouseLeave={() => setShowRequests(false)}
      >
        {day !== null ? day : ""}
        {showRequests && (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {allUserIds.map((userId, index) => (
              <li
                key={index}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => console.log(userId)}
              >
                {userId}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
