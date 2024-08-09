// • Change email address.
// • Change profile picture.
// • Change password.
// • Add 2FA1

import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmailForm from "./Forms/EmailForm";
import PasswordForm from "./Forms/PasswordForm";
import DeleteAccount from "./DeleteAccount/DeleteAccount.tsx";
import Picture from "./Picture/Picture.tsx";
import "./Profile.css";
import ChoosePicture from "./Picture/ChoosePicture.tsx";

export default function Profile() {
  const [userData, setUserData] = useState({
    username: "tomas",
    email: "t@t.com",
    profilePic: "",
  });

  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  return (
    <>
      <Container>
        <Row className="justify-content-center mt-4">
          <Col xs="auto">
            <Picture image={image} />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs="auto">
            <h2 className="m-2">{userData.username}</h2>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col className="mt-4 border p-2 m-2" xs={12} sm={10} md={6} lg={4}>
            <EmailForm email={userData.email} />
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
            <ChoosePicture
              userData={userData}
              setUserData={setUserData}
              setImage={setImage}
            />
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
