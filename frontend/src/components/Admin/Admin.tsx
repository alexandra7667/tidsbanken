import { Button, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import CreateUser from "./CreateUser/CreateUser";
import UpdateUser from "./UpdateUser/UpdateUser";
import VacationTimeSpec from "./VacationTimeSpec/VacationTimeSpec";

export default function Admin() {
  const [firstPage, setFirstPage] = useState(true);
  const [createUser, setCreateUser] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [maxDays, setMaxDays] = useState(false);

  const openCreateUser = () => {
    setFirstPage(false);
    setCreateUser(true);
  };

  const closeCreateUser = () => {
    setFirstPage(true);
    setCreateUser(false);
  };

  const openUpdateUser = () => {
    setFirstPage(false);
    setUpdateUser(true);
  };

  const closeUpdateUser = () => {
    setFirstPage(true);
    setUpdateUser(false);
  };

  const openMaxDays = () => {
    setFirstPage(false);
    setMaxDays(true);
  };

  const closeMaxDays = () => {
    setFirstPage(true);
    setMaxDays(false);
  };

  return (
    <>
      {firstPage && (
        <Container>
          <Row className="justify-content-center mt-5">
            <Col xs="auto">
              <Button onClick={openCreateUser}>Create new user</Button>
            </Col>
          </Row>
          <Row className="justify-content-center mt-4">
            <Col xs="auto">
              <Button onClick={openUpdateUser}>Update user</Button>
            </Col>
          </Row>
          <Row className="justify-content-center mt-4 mb-5">
            <Col xs="auto">
              <Button onClick={openMaxDays}>Update max vacation days</Button>
            </Col>
          </Row>
        </Container>
      )}

      {createUser && (
        <Container>
          <Row className="justify-content-center mt-5">
            <Col xs="auto">
              <CreateUser closeCreateNewUser={closeCreateUser} />
            </Col>
          </Row>
        </Container>
      )}

      {updateUser && (
        <Container>
          <Row className="justify-content-center mt-5">
            <Col xs="auto">
              <UpdateUser closeUpdateUser={closeUpdateUser} />
            </Col>
          </Row>
        </Container>
      )}

      {maxDays && (
        <Container>
          <Row className="justify-content-center mt-5">
            <Col xs="auto">
              <VacationTimeSpec closeMaxDays={closeMaxDays} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
