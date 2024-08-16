import { Container, Row, Col, Button } from "react-bootstrap";
import { CaretLeftFill, CaretRightFill } from "react-bootstrap-icons";

export default function YearPicker({ year, setYear }) {
  const previousYear = () => {
    setYear(year - 1);
  };

  const nextYear = () => {
    setYear(year + 1);
  };
  

  return (
    <Container className="mt-4 mb-2 ">
      <Row className="align-items-center justify-content-center">
        <Col xs="auto" className="px-1">
          <Button
            variant="outlined-secondary"
            style={{ display: "flex" }}
            onClick={previousYear}
          >
            <CaretLeftFill />
          </Button>
        </Col>
        <Col xs="auto" className="px-1 pt-1">
          <h2>{`${year}`}</h2>
        </Col>
        <Col xs="auto" className="px-1">
          <Button
            variant="outlined-secondary"
            style={{ display: "flex" }}
            onClick={nextYear}
          >
            <CaretRightFill />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
