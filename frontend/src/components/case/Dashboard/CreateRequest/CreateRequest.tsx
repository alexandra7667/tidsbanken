import { useState } from "react";
import { Button } from "react-bootstrap";
import postRequest from "./PostRequest";
import postIneligiblePeriod from "./PostIneligiblePeriod";

interface CreateRequestProps {
  startPicker: boolean;
  setStartPicker: (startPicker: boolean) => void;
  setStartDate: (startDate: Date) => void;
  startDate: Date;
  setEndDate: (endDate: Date) => void;
  endDate: Date;
  today: () => void;
  type: string;
}

export default function CreateRequest({
  startPicker,
  setStartPicker,
  setStartDate,
  startDate,
  setEndDate,
  endDate,
  today,
  type
}: CreateRequestProps) {
  const [showCreate, setShowCreate] = useState(true);
  const [showDates, setShowDates] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  const setStart = () => {
    setStartPicker(true);
  };

  const setEnd = () => {
    setStartPicker(false);
  };

  const createRequest = () => {
    setShowDates(true);
    setShowCreate(false);
    setShowSubmit(true);
  };

  const submitRequest = () => {
    //Send to BE
    if(type === 'vacationRequest') {
      console.log("type is vacation request")
      postRequest(startDate, endDate);
    }
    else if(type === 'ineligiblePeriod') {
      console.log("type is ineligible period")
      postIneligiblePeriod(startDate, endDate);
    }
    console.log("submitting request: " + startDate + " - " + endDate);
    blankRequest();
  };

  const blankRequest = () => {
    setShowDates(false);
    setShowSubmit(false);
    setShowCreate(true);
    setStartDate(new Date);
    setEndDate(new Date);
    setStartPicker(true);
    // today();
  };

  return (
    <>
      {showDates && (
        <div className="d-flex justify-content-center mt-2">
          <Button
            className="m-2"
            onClick={setStart}
            variant="outlined-primary"
            style={{ borderColor: startPicker ? "green" : "lightgrey" }}
          >
            Start date: {startDate.toLocaleDateString()}
          </Button>
          <Button
            className="m-2"
            onClick={setEnd}
            variant="outlined-primary"
            style={{ borderColor: startPicker ? "lightgrey" : "green" }}
          >
            End date: {endDate.toLocaleDateString()}
          </Button>
        </div>
      )}

      {showCreate && (
        <div className="d-flex justify-content-center m-4">
          <Button onClick={createRequest}>{type === 'vacationRequest' ? 'New vacation request' : 'Add Ineligible period'}</Button>
        </div>
      )}
      {showSubmit && (
        <>
          <div className="d-flex justify-content-center mb-4">
            <Button variant="success" onClick={submitRequest}>
            {type === 'vacationRequest' ? 'Submit new request' : 'Submit new period'}
            </Button>
          </div>
          <div className="d-flex justify-content-center m-4">
            <Button variant="outline-danger" onClick={blankRequest}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </>
  );
}
