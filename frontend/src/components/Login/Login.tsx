import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginUser from "./LoginUser.ts";
import { UserContext } from "../../App.tsx";
import ErrorAlert from "../Alert/ErrorAlert.tsx";

export default function Login() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [validated, setValidated] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [networkError, setNetworkError] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError(false);
    setNetworkError(false);

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } 
    else {
      console.log("Login form data: ", loginData);
      loginUser(loginData, navigate, setUser, setLoginError, setNetworkError);
    }

    //Show valid/invalid feedback
    setValidated(true);
  };


  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="auto">
          <h2 className="mt-4">Log in</h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter username"
                name="username" 
                value={loginData.username}
                onChange={handleChange}
                isInvalid={validated && !loginData.username}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your username
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter password"
                name="password" 
                value={loginData.password}
                onChange={handleChange}
                isInvalid={validated && !loginData.password}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your password
              </Form.Control.Feedback>
            </Form.Group>

            <Button as="input" type="submit" value="Submit" />
          </Form>
        </Col>
      </Row>
      <br />
      {loginError && (
        <ErrorAlert errorMessage="Wrong email or password" />
      )}
      {networkError && (
        <ErrorAlert errorMessage="Network error" />
      )}
    </Container>
  );
}
