import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { Form, Button } from "react-bootstrap";
// import updatePassword from "./UpdatePassword";
import Password from "../../../interfaces/Password";
import fetchData from "../../../functions/fetchData";
import { UserContext } from "../../../App";
import { ErrorContext } from "../../Main/Main";

export default function PasswordForm() {
  const [password, setPassword] = useState<Password>({
    oldPassword: "",
    newPassword: "",
  });
  const [passwordValidated, setPasswordValidated] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const { setErrorMessage } = useContext(ErrorContext);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword((prevPassword) => ({
      ...prevPassword,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      console.log("Profile form password data: ", password);
      updatePassword();
    }

    //Show valid/invalid feedback
    setPasswordValidated(true);
  };

  async function updatePassword() {
    const response = await fetchData(
      `user/${user!.id}/update_password`,
      "POST",
      { newPassword: password.newPassword, oldPassword: password.oldPassword },
      "Failed to update password."
    );
    if (response.status === "error" && response.message) {
      setErrorMessage(response.message);
    } else {
      //Toast password updated successfully
    }
  }

  return (
    <Form
      noValidate
      validated={passwordValidated}
      onSubmit={handlePasswordSubmit}
    >
      <Form.Group className="mb-3" controlId="formOldPassword">
        <Form.Label className="fw-bold my-3">Update your password</Form.Label>
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
