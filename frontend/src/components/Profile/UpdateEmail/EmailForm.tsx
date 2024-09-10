import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../../../App";
import { ErrorContext } from "../../../App.tsx";
import fetchData from "../../../functions/fetchData.ts";

export default function EmailForm({ email }: { email: string }) {
  const [newEmail, setNewEmail] = useState<string>(email);
  const [emailValidated, setEmailValidated] = useState<boolean>(false);
  const { user, setUser } = useContext(UserContext);
  const { setErrorMessage } = useContext(ErrorContext);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      console.log("Profile form email data: ", newEmail);
      updateAndSetUser();
    }

    async function updateAndSetUser() {
      const response = await fetchData(
        `user/${user!.id}`,
        "PATCH",
        { email: newEmail },
        "Failed to update email."
      );
      if (response.status === "error") {
        if (response.message) setErrorMessage(response.message);
      } else {
        setUser(response.data);
      }
    }

    //Show valid/invalid feedback
    setEmailValidated(true);
  };

  return (
    <>
      <Form noValidate validated={emailValidated} onSubmit={handleEmailSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="fw-bold my-3">Update your email</Form.Label>
          <Form.Control
            required
            type="email"
            name="newEmail"
            value={newEmail}
            onChange={handleEmailChange}
            isInvalid={emailValidated && !newEmail}
          />
          <Form.Control.Feedback type="invalid">
            Email cannot be empty
          </Form.Control.Feedback>
        </Form.Group>

        <Button as="input" type="submit" value="Update email"></Button>
      </Form>
    </>
  );
}
