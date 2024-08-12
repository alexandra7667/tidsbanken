import { useState } from "react";
import Calendar from "./Calendar/Calendar.tsx";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import { monthNames } from "../../../assets/strings/monthNames.ts";
import { CaretLeftFill } from 'react-bootstrap-icons';
import { CaretRightFill } from 'react-bootstrap-icons';

export default function Dashboard() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); //0 = January, 1 = February, etc.
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [selectedMonth, setSelectedMonth] = useState(monthNames[currentMonth]); //Title in dropdown

  const previousYear = () => {
    setYear(year - 1);
  };

  const nextYear = () => {
    setYear(year + 1);
  };

  const previousMonth = () => {
    //If january - set december
    if (month === 0) {
      setMonth(11);
      setSelectedMonth(monthNames[11]);
    }
    else {
      setMonth(month - 1);
      setSelectedMonth(monthNames[month - 1]);
    }
  };

  const nextMonth = () => {
    //if december - set january
    if (month === 11) {
      setMonth(0);
      setSelectedMonth(monthNames[0])
    }
    else {
      setMonth(month + 1);
      setSelectedMonth(monthNames[month + 1]);
    }
  };

  const handleSelect = (monthName: string) => {
    setSelectedMonth(monthName);
    setMonth(monthNames.indexOf(monthName));
  };

  const today = () => {
    setMonth(currentMonth);
    setYear(currentYear);
    setSelectedMonth(monthNames[currentMonth]);
  };

  return (
    <>
      <Container className="mt-4 mb-2 ">
        <Row className="align-items-center justify-content-center">
          <Col xs="auto" className="px-1">
            <Button variant="outline-secondary" style={{ display: 'flex' }} onClick={previousYear}><CaretLeftFill /></Button>
          </Col>
          <Col xs="auto" className="px-1 pt-1">
            <h2>{`${year}`}</h2>
          </Col>
          <Col xs="auto" className="px-1">
            <Button variant="outline-secondary" style={{ display: 'flex' }} onClick={nextYear}><CaretRightFill /></Button>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="align-items-center justify-content-center">
          <Col xs="auto" className="px-1">
            <Button variant="outline-secondary" style={{ display: 'flex' }} onClick={previousMonth}><CaretLeftFill /></Button>
          </Col>
          <Col xs="auto" className="px-1">
            <DropdownButton size="lg" id="dropdown-month" title={selectedMonth}>
              {monthNames.map((monthName, index) => (
                <Dropdown.Item key={index} onClick={() => handleSelect(monthName)}>
                  {monthName}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Col xs="auto" className="px-1">
            <Button variant="outline-secondary" style={{ display: 'flex' }} onClick={nextMonth}><CaretRightFill /></Button>
          </Col>
        </Row>
      </Container>

      <div className="d-flex justify-content-center m-4">
        <Button variant="outline-primary" onClick={today}>Today</Button>
      </div>

      <Calendar year={year} month={month} />
    </>
  );
}
