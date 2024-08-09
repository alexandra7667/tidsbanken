// • The total number of vacation days has available to date.
// • The total number of vacation days remaining.
// • A list of vacation requests made by the user in reverse chronological order (most
// recent first).
// If the currently authenticated user is not an Administrator and is viewing another
// user’s vacation request history, then only the approved requests for that user should be
// shown. Otherwise, all vacation requests are shown regardless of their state.
// Each item in the list should navigate to a more detailed view of that particular request.

import { useEffect, useState } from "react";
import getRequestHistory from "./GetRequestHistory";
import RequestList from "./RequestList.tsx/RequestList";
import LoadingSpinner from "../../bootstrap/Spinner/LoadingSpinner";
import { Col, Container, Row } from "react-bootstrap";

//Definiera Request
interface Request {
  id: number;
  name: string;
  //etc....
}

export default function RequestHistory() {
  const [requestHistory, setRequestHistory] = useState<Request[]>([]);

  useEffect(() => {
    getRequestHistory(setRequestHistory);
  }, []);

  return (
    <>
      <p>The total number of vacation days has available to date.</p>
      <p>The total number of vacation days remaining.</p>
      
      {requestHistory.length > 0 ? (
        <RequestList requests={requestHistory} />
      ) : (
        <Container>
          <Row className="justify-content-center mt-4">
            <Col xs="auto">
              <LoadingSpinner />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
