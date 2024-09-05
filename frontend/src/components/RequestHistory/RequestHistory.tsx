import { useEffect, useState } from "react";
import getRequestHistory from "./GetRequestHistory";
import RequestList from "./RequestList/RequestList";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Request from "../../interfaces/Request";

export default function RequestHistory() {
  //const { userId } = useParams<{ requestId: string }>();
  const userId = 1;
  const user = {id: 1, role: "admin"}
  const [requestHistory, setRequestHistory] = useState<Request[]>([]);
  const [hasFullView, setHasFullView] = useState(false);

  useEffect(() => {
    getRequestHistory(setRequestHistory);
  }, []);

  useEffect(() => {
    //If the viewer and the request history owner is the same person
    if ((user.id === userId) || user.role === 'admin') setHasFullView(true);
  }, [userId]);

  return (
    <>
      <p>The total number of vacation days has available to date.</p>
      <p>The total number of vacation days remaining.</p>

      {requestHistory.length > 0 ? (
        <RequestList requests={requestHistory} hasFullView={hasFullView}/>
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
