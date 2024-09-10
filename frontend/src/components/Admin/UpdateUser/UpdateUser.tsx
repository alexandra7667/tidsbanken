
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import { FormEvent, useContext, useState } from "react";
import UserForm from "../UserForm";
import SearchForm from "./SearchForm";
import fetchData from "../../../functions/fetchData";
import { UserContext } from "../../../App";
import { ErrorContext } from "../../../App.tsx";

export default function UpdateUser({ closeUpdateUser }) {
  const { user } = useContext(UserContext);
  const { setErrorMessage } = useContext(ErrorContext);
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    password: "",
    email: "",
  });
  const [validated, setValidated] = useState<boolean>(false);
  const [foundUser, setFoundUser] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      patchUser();
    }

    //Show valid/invalid feedback
    setValidated(true);
  };

  const searchUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    getUserById();
  };

    async function getUserById() {
      const response = await fetchData(
        `user/${userData.id}`,
        "GET",
        null,
        "Could not fetch user by ID."
      );
      if (response.status === "error") {
        console.error(response.message);
        if (response.message) setErrorMessage(response.message);
      } else {
        //Token success
        setUserData(response.data);
        console.log("userData= ", response.data);
        setFoundUser(true);
      }
    }

    async function patchUser() {
      //Uppdatera email eller password
      console.log("Updating user with userData: ", userData);
      const response = await fetchData(
        `user/${userData.id}`,
        "PATCH",
        { name: userData.name, email: userData.email },
        "Could not update user."
      );
      if (response.status === "error") {
        console.error(response.message);
        if (response.message) setErrorMessage(response.message);
      } else {
        //Token success
        //Blanka input fields
        setUserData(response.data);
        setFoundUser(true);
        closeUpdateUser();
      }
    }

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
