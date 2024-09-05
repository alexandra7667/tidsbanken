import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import getVacationDays from "./GetVacationDays";
import updateVacationDays from "./UpdateVacationDays";

export default function VacationTimeSpec({ closeMaxDays }) {
  const [validated, setValidated] = useState<boolean>(false);
  const [maxDays, setMaxDays] = useState("");

  useEffect(() => {
    getVacationDays(setMaxDays);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxDays(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      //Post new max days
      updateVacationDays(maxDays);
    }

    //Show valid/invalid feedback
    setValidated(true);
  };

  return (
    <>
      <h3 className="mt-1 mb-3">Vacation days</h3>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formMaxDays">
          <Form.Label>The maximum period of time any single vacation may be (in days)</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter number of days"
            name="maxDays"
            value={maxDays}
            onChange={handleChange}
            isInvalid={validated && !maxDays}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a number
          </Form.Control.Feedback>
        </Form.Group>

        <Button as="input" type="submit" value="Update" />
      </Form>

      <Container>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button
              className="mt-5"
              variant="outline-danger"
              onClick={closeMaxDays}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
