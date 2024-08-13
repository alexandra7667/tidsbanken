
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function RequestItem({ request }) {
  const navigate = useNavigate();

  const goToRequestView = () => {
    navigate(`/requestview/${request.id}`)
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{request.status}</Card.Title>
        <Card.Text>
          {request.periodStart} - {request.periodEnd}
        </Card.Text>
        <Button variant="outline-primary" onClick={goToRequestView}>View request</Button>
      </Card.Body>
    </Card>
  );
}
