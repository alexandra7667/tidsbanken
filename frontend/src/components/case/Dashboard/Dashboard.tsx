import { useState } from "react";
import Calendar from "./Calendar/Calendar.tsx";
import { Button, Col, Container, Row } from "react-bootstrap";
import { monthNames } from "../../../assets/strings/monthNames.ts";

export default function Dashboard() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); //0 = January, 1 = February, etc.
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  const previousYear = () => {
    setYear(year - 1);
  };

  const nextYear = () => {
    setYear(year + 1);
  };

  const previousMonth = () => {
    //If january - set december
    if(month === 0) setMonth(11)

    else setMonth(month - 1);
  };

  const nextMonth = () => {
    //if december - set january
    if(month === 11) setMonth(0)

    else setMonth(month + 1);
  };

  const today = () => {
    setMonth(currentMonth);
    setYear(currentYear);
  };

  return (
    <>
      <Container className="mt-4">
        <Row className="align-items-center justify-content-center">
          <Col xs="auto">
            <Button onClick={previousYear}>Prev</Button>
          </Col>
          <Col xs="auto">
            <h2>{`${year}`}</h2>
          </Col>
          <Col xs="auto">
            <Button onClick={nextYear}>Next</Button>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="align-items-center justify-content-center">
          <Col xs="auto">
            <Button onClick={previousMonth}>Prev</Button>
          </Col>
          <Col xs="auto">
            <h2>{`${monthNames[month]}`}</h2>
          </Col>
          <Col xs="auto">
            <Button onClick={nextMonth}>Next</Button>
          </Col>
        </Row>
      </Container>

      <div className="d-flex justify-content-center m-4">
        <Button onClick={today}>Today</Button>
      </div>

      <Calendar year={year} month={month} />
    </>
  );
}
