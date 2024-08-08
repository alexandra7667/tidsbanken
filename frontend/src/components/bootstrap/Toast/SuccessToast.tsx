import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function SuccessToast() {
  const [show, setShow] = useState(false);

  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
      </ToastContainer>
      <Button onClick={() => setShow(true)}>Show Toast</Button>
    </>
  );
}

export default SuccessToast;
