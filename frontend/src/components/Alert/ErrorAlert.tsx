import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

interface ErrorAlertProps {
  errorMessage: string;
}

export default function ErrorAlert({ errorMessage }: ErrorAlertProps) {
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setShow(false), 5000);
  }, []);

  return (
    <>
      {show && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>{errorMessage}</p>
        </Alert>
      )}
    </>
  );
}
