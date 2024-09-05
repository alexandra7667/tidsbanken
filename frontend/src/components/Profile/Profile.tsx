import { useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import EmailForm from "./UpdateEmail/EmailForm.tsx";
import PasswordForm from "./UpdatePassword/PasswordForm.tsx";
import DeleteAccount from "./DeleteAccount/DeleteAccount.tsx";
import ChoosePicture from "./ChoosePicture/ChoosePicture.tsx";
import { UserContext } from "../../App.tsx";

interface ProfileProps  {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export default function Profile({ darkMode, setDarkMode}: ProfileProps) {
  const { user } = useContext(UserContext);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    const htmlElement = document.querySelector("html");
    if(htmlElement) htmlElement.setAttribute("data-bs-theme", newMode ? "dark" : "light");
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center mt-4">
          <Col xs="auto">
            {user.profilePic && <img src={user.profilePic as string} style={{ width: "100px" }} />}
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs="auto">
            <h2 className="m-2">{user.name}</h2>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col className="mt-4 border p-2 m-2" xs={12} sm={10} md={6} lg={4}>
            <EmailForm email={user.email} />
          </Col>

          <Col className="mt-4 border p-2 m-2" xs={12} sm={10} md={6} lg={4}>
            <PasswordForm />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col className="mt-5" xs="auto">
            <p>Update profile picture</p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="mb-4" xs="auto">
            <ChoosePicture />
          </Col>
        </Row>

        <Row className="justify-content-center mt-4">
          <Col xs="auto">
            <Button variant="outline-info" onClick={toggleTheme}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs="auto">
            <DeleteAccount />
          </Col>
        </Row>
      </Container>
    </>
  );
}
