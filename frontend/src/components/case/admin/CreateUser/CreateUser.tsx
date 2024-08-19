import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import { FormEvent, useState } from "react";
import postUser from "./PostUser";
import UserForm from "../UserForm";

export default function CreateUser({ closeCreateNewUser }) {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [validated, setValidated] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      console.log("Form data: ", userData);
      postUser(userData);
    }

    //Show valid/invalid feedback
    setValidated(true);
  };

  return (
    <>
      <h3 className="mt-1 mb-3">Create new user</h3>

      <UserForm
        userData={userData}
        setUserData={setUserData}
        validated={validated}
        handleSubmit={handleSubmit}
        type={"create"}
      />

      <Container>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button
              className="mt-5"
              variant="outline-danger"
              onClick={closeCreateNewUser}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
