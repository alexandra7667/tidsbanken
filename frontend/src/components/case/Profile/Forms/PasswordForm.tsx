import { useState, ChangeEvent, FormEvent } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import updatePasswordRequest from "../UpdatePasswordRequest";

export default function PasswordForm() {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [passwordValidated, setPasswordValidated] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      console.log("Profile form password data: ", password);
      updatePasswordRequest(password, navigate);
    }

    //Show valid/invalid feedback
    setPasswordValidated(true);
  };

  return (
    <Form
      noValidate
      validated={passwordValidated}
      onSubmit={handlePasswordSubmit}
    >
      <Form.Group className="mb-3" controlId="formOldPassword">
        <Form.Label>Enter your password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Old password"
          name="oldPassword"
          value={password.oldPassword}
          onChange={handlePasswordChange}
          isInvalid={passwordValidated && !password.oldPassword}
        />
        <Form.Control.Feedback type="invalid">
          Please enter your old password
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formNewPassword">
        <Form.Label>Enter new password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="New password"
          name="newPassword"
          value={password.newPassword}
          onChange={handlePasswordChange}
          isInvalid={passwordValidated && !password.newPassword}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a new password
        </Form.Control.Feedback>
      </Form.Group>

      <Button as="input" type="submit" value="Update password" />
    </Form>
  );
}
