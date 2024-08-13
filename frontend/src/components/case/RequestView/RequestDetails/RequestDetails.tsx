import { Card, Button } from "react-bootstrap";
import CommentCard from "../CommentCard/CommentCard";
import { useNavigate } from "react-router-dom";
import Request from "../../Interfaces/Request";
import Comment from "../../Interfaces/Comment";

interface RequestDetailsProps {
  request: Request;
  isOwner: boolean;
  userRole: string;
  comments: Comment[];
}

export default function RequestDetails({request, isOwner, userRole, comments}: RequestDetailsProps) {
  const navigate = useNavigate();

  const goToRequestHistory = () => {
    //Go to request owner's request history
    navigate(`/requesthistory/${request.userId}`);
  };

  return (
    <Card style={{ width: "60%" }}>
      <Card.Body>
        <Card.Title>{request.title}</Card.Title>
        <Card.Text>
          Start date: {request.startDate}
          End date: {request.endDate}
          Status: {request.status}
          {comments &&
            comments.length > 0 &&
            (isOwner || userRole === "admin") &&
            [...comments]
              .reverse()
              .map((comment, index) => (
                <CommentCard key={index} comment={comment} />
              ))}
        </Card.Text>
        <Button variant="outline-primary" onClick={goToRequestHistory}>
          Go to Request history
        </Button>
      </Card.Body>
    </Card>
  );
}
