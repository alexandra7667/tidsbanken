import { ChangeEvent } from "react";
import { Form, Button } from "react-bootstrap";

export default function UserForm({
  userData,
  setUserData,
  validated,
  handleSubmit,
  type,
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter username"
          name="username"
          value={userData.name}
          onChange={handleChange}
          isInvalid={validated && !userData.name}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a username
        </Form.Control.Feedback>
      </Form.Group>

      {type === "create" && (
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            isInvalid={validated && !userData.password}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a password
          </Form.Control.Feedback>
        </Form.Group>
      )}

      {type === "update" && (
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter new password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            isInvalid={validated && !userData.password}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a new password
          </Form.Control.Feedback>
        </Form.Group>
      )}

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Enter email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          isInvalid={validated && !userData.email}
        />
        <Form.Control.Feedback type="invalid">
          Please enter an email address
        </Form.Control.Feedback>
      </Form.Group>

      {type === "create" && <Button as="input" type="submit" value="Create" />}
      {type === "update" && <Button as="input" type="submit" value="Update" />}
    </Form>
  );
}
