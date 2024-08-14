import { useState, ChangeEvent, FormEvent } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import updateRequest from "./Update";
import Request from "../../Interfaces/Request";

interface UpdateRequestProps {
  request: Request;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

export default function UpdateRequest({ request, modalOpen, setModalOpen }: UpdateRequestProps) {
  const [updatedFields, setUpdatedFields] = useState({
    title: request.title,
    startDate: request.startDate,
    endDate: request.endDate,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdatedFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Request fields: ", updatedFields);
    updateRequest(request.id, updatedFields);
  };

  return (
    <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={updatedFields.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formStartDate">
            <Form.Label>Start date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={updatedFields.startDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>End date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={updatedFields.endDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Button as="input" type="submit" value="Update request"></Button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => setModalOpen(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
