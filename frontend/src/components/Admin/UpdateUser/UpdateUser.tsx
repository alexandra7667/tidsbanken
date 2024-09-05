
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import { FormEvent, useState } from "react";
import patchUser from "./PatchUser";
import getUserById from "./GetUserById";
import UserForm from "../UserForm";
import SearchForm from "./SearchForm";

const user = { username: "tom", password: "password", email: "t@t.com" };

export default function UpdateUser({ closeUpdateUser }) {
  const [userData, setUserData] = useState({
    userId: "",
    username: user.username,
    password: "",
    email: user.email,
  });
  const [validated, setValidated] = useState<boolean>(false);
  const [foundUser, setFoundUser] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      console.log("Form data: ", userData);
      patchUser(userData);
    }

    //Show valid/invalid feedback
    setValidated(true);
  };

  const searchUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    getUserById(userData.userId, setUserData, setFoundUser);
  };

  return (
    <>
      <h3 className="mt-1 mb-3">Update user</h3>

      <SearchForm
        userData={userData}
        setUserData={setUserData}
        searchUser={searchUser}
      />

      {foundUser && (
        <>
          <hr />
          <UserForm
            userData={userData}
            setUserData={setUserData}
            validated={validated}
            handleSubmit={handleSubmit}
            type={"update"}
          />
        </>
      )}

      <Container>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button
              className="mt-5"
              variant="outline-danger"
              onClick={closeUpdateUser}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
