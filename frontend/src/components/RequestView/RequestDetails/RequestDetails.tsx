import { Card, Button } from "react-bootstrap";
import CommentCard from "../CommentCard/CommentCard";
import { useNavigate } from "react-router-dom";
import Comment from "../../../interfaces/Comment";
import VacationRequest from "../../../interfaces/VacationRequest";

interface RequestDetailsProps {
  request: VacationRequest;
  comments: Comment[];
}

export default function RequestDetails({
  request,
  comments,
}: RequestDetailsProps) {
  const navigate = useNavigate();

  const goToRequestHistory = () => {
    navigate(`/requesthistory/${request.userId}`);
  };

  return (
    <Card style={{ width: "60%" }}>
      <Card.Body>
        <Card.Title>{request.isApproved}</Card.Title>
        <Card.Text>
          Start date: {request.startDate.toString()}
          End date: {request.endDate.toString()}
          <div style={{ border: "1px solid #ccc", borderRadius: "5px" }}>
            {comments &&
              comments.length > 0 &&
              comments.map((comment, index) => (
                <CommentCard key={index} comment={comment} />
              ))}
          </div>
        </Card.Text>
        <Button variant="outline-primary" onClick={() => goToRequestHistory}>
          Go to Request history
        </Button>
      </Card.Body>
    </Card>
  );
}
