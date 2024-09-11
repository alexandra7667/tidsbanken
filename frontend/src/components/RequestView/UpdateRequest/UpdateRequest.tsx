import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import VacationRequest from "../../../interfaces/VacationRequest";
import fetchData from "../../../functions/fetchData";
import { ErrorContext } from "../../../App.tsx";
import { UserContext } from "../../../App.tsx";

interface UpdateRequestProps {
  request: VacationRequest;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

export default function UpdateRequest({
  request,
  modalOpen,
  setModalOpen,
}: UpdateRequestProps) {
  const [updatedFields, setUpdatedFields] = useState({
    isApproved: request.isApproved,
    startDate: request.startDate.toString(),
    endDate: request.endDate.toString(),
  });
  const { setErrorMessage } = useContext(ErrorContext);
  const { user } = useContext(UserContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdatedFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUpdatedFields((prevFields) => ({
      ...prevFields,
      isApproved: e.target.value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Request fields: ", updatedFields);
    updateRequest();
  };

  async function updateRequest() {
    const response = await fetchData(
      `request/${request.id}`,
      "PATCH",
      {approved: updatedFields.isApproved, startDate: updatedFields.startDate, endDate: updatedFields.endDate },
      "Failed to update vacation request."
    );
    if (response.status === "error" && response.message) {
      setErrorMessage(response.message);
    } else {
      setModalOpen(false);
    }
  }

  return (
    <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update request</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          {user!.role === 1 && (
            <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="isApproved"
              value={updatedFields.isApproved}
              onChange={handleStatusChange}
            >
              <option value="APPROVED">APPROVED</option>
              <option value="PENDING">PENDING</option>
              <option value="DENIED">DENIED</option>
            </Form.Select>
          </Form.Group>
          )}

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
