import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./Calendar.css";

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
  const [request, setRequest] = useState(false);
  const [picked, setPicked] = useState(false);

  useEffect(() => {
    setRequest(false);

    if (allUserIds.length > 0) {
      setRequest(true);
    }
  }, [day, month]);

  const selection = () => {
    console.log("selected: ", day, " with user ids: ", allUserIds);

    if (day == null) return; //Clicked on empty cell

    setPicked(true);
    setTimeout(() => {
      setPicked(false);
    }, 200);

    const date = new Date(year, month, +day);

    if (startPicker && date >= endDate) {
      return;
    }
    if (!startPicker && date <= startDate) {
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
      <div className={picked ? "pickedcell" : "cell"} onClick={selection}>
        {day === null ? (
          ""
        ) : (
          <>
            {request ? (
              <>
                <Dropdown className="outlined-dropdown">
                  <Dropdown.Toggle variant="link" size="sm">{day}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {allUserIds.map((userId, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() =>
                          console.log("go to history of user id", userId)
                        }
                      >
                        {userId}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              day
            )}
          </>
        )}
      </div>
    </>
  );
}
