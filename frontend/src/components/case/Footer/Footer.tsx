import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <>
      <Container>
        <Row className="justify-content-center mt-4">
          <Col xs="auto">
            <p>©2024 Tidsbanken</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
