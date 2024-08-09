// • Change email address.
// • Change profile picture.
// • Change password.
// • Add 2FA1

import { useState } from "react";
import { Container, Row, Col} from "react-bootstrap";
import EmailForm from "./Forms/EmailForm";
import PasswordForm from "./Forms/PasswordForm";


export default function Profile() {
  const [userData, setUserData] = useState({
    username: "tomas",
    email: "t@t.com",
  });
  

  return (
    <>
      <Container>
      <Row className="justify-content-center mt-4">
            Profile image
        </Row>
        
        <Row className="justify-content-center">
          <Col xs="auto">
            <h2 className="m-2">{userData.username}</h2>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col className="m-2" xs={12} sm={10} md={6} lg={4}>
            <EmailForm email={userData.email}/>
          </Col>

          <Col xs={12} sm={10} md={6} lg={4}>
            <PasswordForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}
