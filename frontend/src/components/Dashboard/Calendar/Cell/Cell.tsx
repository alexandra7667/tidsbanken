import { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "../Calendar.css";
import { CalendarContext } from "../../Dashboard";
import { useNavigate } from "react-router-dom";

interface CellProps {
  day: number,
  allUserIds: string[];
}

export default function Cell({
  day, 
  allUserIds,
}: CellProps) {
  const { month, year, startPicker, startDate, setStartDate, endDate, setEndDate} = useContext(CalendarContext);
  const navigate = useNavigate();
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

    //Green color effect on click
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
                <Dropdown className="outline-dropdown">
                  <Dropdown.Toggle variant="link" size="sm">{day}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {allUserIds.map((userId, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => navigate(`/requesthistory/${userId}`)}
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
