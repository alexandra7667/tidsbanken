import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import { FormEvent, useContext, useState } from "react";
import UserForm from "../UserForm";
import fetchData from "../../../functions/fetchData";
import { ErrorContext } from "../../../App.tsx";

export default function CreateUser({ closeCreateNewUser }) {
  const { setErrorMessage } = useContext(ErrorContext);
  const [userData, setUserData] = useState({
    name: "",
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
      postUser();
    }

    //Show valid/invalid feedback
    setValidated(true);
  };

  async function postUser() {
    const response = await fetchData(
      `user`,
      "POST",
      { name: userData.name, password: userData.password, email: userData.email },
      "Could not create new user."
    );
    if (response.status === "error") {
      console.error(response.message);
      if (response.message) setErrorMessage(response.message);
    } else {
      //Token success
      //Blanka input fields
      closeCreateNewUser();
    }
  }

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
