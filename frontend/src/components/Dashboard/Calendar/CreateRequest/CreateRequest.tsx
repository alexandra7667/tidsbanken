import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
// import postRequest from "./PostRequest";
// import postIneligiblePeriod from "./PostIneligiblePeriod";
import { CalendarContext } from "../../Dashboard.tsx";
import { UserContext } from "../../../../App.tsx";
import VacationRequest from "../../../../interfaces/VacationRequest.ts";
import { ErrorContext } from "../../../../App.tsx";
import fetchData from "../../../../functions/fetchData.ts";

export default function CreateRequest({ type }: { type: string }) {
  const { setErrorMessage } = useContext(ErrorContext);
  const [showCreate, setShowCreate] = useState(true);
  const [showDates, setShowDates] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const {
    setStartPicker,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startPicker,
  } = useContext(CalendarContext);
  const { user } = useContext(UserContext);
  const [requestData, setRequestData] = useState<VacationRequest>({
    id: "",
    startDate: new Date(),
    endDate: new Date(),
    description: "",
    isApproved: "",
    userId: user!.id,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequestData((prevData) => ({
      ...prevData,
      description: event.target.value,
    }));
  };

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
    if (type === "vacationRequest") {
      // postRequest(requestData);
      postRequest();
    } else if (type === "ineligiblePeriod") {
      // postIneligiblePeriod(requestData);
      postIneligiblePeriod();
    }
    console.log("submitting request: " + startDate + " - " + endDate);
    blankRequest();
  };

  async function postRequest() {
    const response = await fetchData(
      `request`,
      "POST",
      {userId: requestData.userId, startDate: requestData.startDate.toString(), endDate: requestData.endDate.toString(), description: requestData.description},
      "Failed to create vacation request."
    );
    if (response.status === "error" && response.message) {
      setErrorMessage(response.message);
    } else {
      //Toast new request created successfully
    }
  }

  async function postIneligiblePeriod() {
    const response = await fetchData(
      `ineligible`,
      "POST",
      {startDate: requestData.startDate.toString(), endDate: requestData.endDate.toString()},
      "Failed to create new ineligible period."
    );
    if (response.status === "error" && response.message) {
      setErrorMessage(response.message);
    } else {
      //Toast new ineligible period created successfully
    }
  }

  const blankRequest = () => {
    setShowDates(false);
    setShowSubmit(false);
    setShowCreate(true);
    setStartDate(new Date());
    setEndDate(new Date());
    setStartPicker(true);
  };

  return (
    <>
      {showDates && (
        <div className="d-flex justify-content-center mt-1">
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
          {type === "vacationRequest" && (
            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                value={requestData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          )}
        </div>
      )}

      {showCreate && (
        <div className="d-flex justify-content-center mb-3">
          <Button onClick={createRequest}>
            {type === "vacationRequest"
              ? "New vacation request"
              : "Add Ineligible period"}
          </Button>
        </div>
      )}
      {showSubmit && (
        <>
          <div className="d-flex justify-content-center mb-4">
            <Button variant="success" onClick={submitRequest}>
              {type === "vacationRequest"
                ? "Submit new request"
                : "Submit new period"}
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
