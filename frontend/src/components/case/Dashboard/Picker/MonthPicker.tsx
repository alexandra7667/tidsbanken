import {
  Container,
  Row,
  Col,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { CaretLeftFill, CaretRightFill } from "react-bootstrap-icons";
import { monthNames } from "../../../../assets/strings/monthNames";

export default function MonthPicker({ month, setMonth, selectedMonth, setSelectedMonth }) {
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

  return (
    <Container>
      <Row className="align-items-center justify-content-center">
        <Col xs="auto" className="px-1">
          <Button
            variant="outlined-secondary"
            style={{ display: "flex" }}
            onClick={previousMonth}
          >
            <CaretLeftFill />
          </Button>
        </Col>
        
        <Col xs="auto" className="px-1">
          <DropdownButton
            variant="outline-dark"
            size="lg"
            id="dropdown-month"
            title={selectedMonth}
          >
            {monthNames.map((monthName, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleSelect(monthName)}
              >
                {monthName}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>

        <Col xs="auto" className="px-1">
          <Button
            variant="outlined-secondary"
            style={{ display: "flex" }}
            onClick={nextMonth}
          >
            <CaretRightFill />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
