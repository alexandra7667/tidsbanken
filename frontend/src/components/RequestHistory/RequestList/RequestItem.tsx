import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import VacationRequest from "../../../interfaces/VacationRequest";

interface RequestItemProps {
  request: VacationRequest;
}

export default function RequestItem({ request }: RequestItemProps) {
  const navigate = useNavigate();

  const goToRequestView = () => {
    navigate(`/requestview/${request.id}`)
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{request.isApproved}</Card.Title>
        <Card.Text>
          {request.startDate.toString()} - {request.endDate.toString()}
        </Card.Text>
        <Button variant="outline-primary" onClick={goToRequestView}>View request</Button>
      </Card.Body>
    </Card>
  );
}
