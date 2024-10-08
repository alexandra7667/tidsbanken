import React, { useState, useEffect, useContext } from "react";
import Alert from "react-bootstrap/Alert";
import { ErrorContext } from "../../App.tsx";

export default function ErrorAlert() {
  const [show, setShow] = useState<boolean>(true);
  const { errorMessage, setErrorMessage} = useContext(ErrorContext);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShow(false);
      setErrorMessage('');
    }, 5000);
  
    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, []);

  return (
    <>
      {show && (
        <Alert style={{maxWidth: '50%'}} variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>{errorMessage}</p>
        </Alert>
      )}
    </>
  );
}
