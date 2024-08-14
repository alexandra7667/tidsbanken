import { useState, ChangeEvent, FormEvent } from "react";
import { Form, Button } from "react-bootstrap";
import updateEmail from "./UpdateEmail";

export default function EmailForm({ email }: { email: string }) {
  const [newEmail, setNewEmail] = useState(email);
  const [emailValidated, setEmailValidated] = useState(false);

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
      updateEmail(newEmail);
    }

    //Show valid/invalid feedback
    setEmailValidated(true);
  };

  return (
    <Form noValidate validated={emailValidated} onSubmit={handleEmailSubmit}>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label className="fw-bold my-3">Update your email</Form.Label>
        <Form.Control
          required
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          isInvalid={emailValidated && !email}
        />
        <Form.Control.Feedback type="invalid">
          Email cannot be empty
        </Form.Control.Feedback>
      </Form.Group>

      <Button as="input" type="submit" value="Update email"></Button>
    </Form>
  );
}
