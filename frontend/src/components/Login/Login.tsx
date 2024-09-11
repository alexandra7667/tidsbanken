import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App.tsx";
import { ErrorContext } from "../../App.tsx"
import fetchData from "../../functions/fetchData.ts";

export default function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { setErrorMessage } = useContext(ErrorContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      loginAndSetUser();
    }

    //Show valid/invalid feedback
    setValidated(true);
  };

  async function loginAndSetUser() {
    const response = await fetchData(
      `login`,
      "POST",
      { email: loginData.email, password: loginData.password },
      "Wrong email or password."
    );
    if (response.status === "error") {
      console.error(response.message);
      if (response.message) setErrorMessage(response.message);
    } else {
      localStorage.setItem("token", response.data.token);
      const expirationTime = Date.now() + 3600 * 1000; 
      localStorage.setItem("expirationTime", expirationTime.toString());
      setUser(response.data.userDTO);
      navigate("/dashboard");
    }
  }

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
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                isInvalid={validated && !loginData.email}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your email
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
    </Container>
  );
}
